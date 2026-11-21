// Baut das Buch „Berufsspezialist KI und ML – Der Lehrfaden zur IHK-Prüfung“ als PDF.
//   node build-buch.mjs            → book.html + PDF (zwei Durchläufe fürs Inhaltsverzeichnis)
//   node build-buch.mjs --html     → nur book.html
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("d:/IT Konsultant/VS Studio/itundx/package.json");
const { parse } = require("node-html-parser");
const { marked } = require("marked");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const KURS = path.resolve(HERE, "..", "kurs");
const LEHRPLAN = path.resolve(HERE, "..", "lehrplan", "lehrplan.md");
const FONTDIR = pathToFileURL("d:/IT Konsultant/VS Studio/itundx/node_modules/@fontsource-variable").href;
const OUT_PDF = path.join(HERE, "Berufsspezialist-KI-ML-Lehrfaden.pdf");
const ONLY_HTML = process.argv.includes("--html");
const PRINT = process.argv.includes("--print");

const TITEL = [
  "", "Grundlagen der Künstlichen Intelligenz", "Mathematik und Statistik für Maschinelles Lernen", "Daten: Qualität, Vorverarbeitung, Feature Engineering",
  "Überwachtes Lernen", "Unüberwachtes Lernen und Reinforcement Learning", "Modellbewertung, Overfitting und Regularisierung", "Neuronale Netze und Deep Learning",
  "Generative KI und große Sprachmodelle", "Projektvorgehen und MLOps", "Recht, Ethik und Datenschutz", "Wirtschaftlichkeit, Kommunikation und Prüfungsvorbereitung",
  "Ergänzungen: Robustheit, Prozesse, Recht, Betriebswirtschaft, Zukunftskompetenzen",
];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9äöüß]/g, "");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const toc = []; // {level, id, text}
let secCounter = 0;
const nid = (p) => `${p}${++secCounter}`;

// ---------- Texte angleichen (Online-Kurs → Buch)
function buchsprache(html) {
  return html
    .replace(/\bModule(?=\s\d)/g, "Kapitel").replace(/\bModulen\b/g, "Kapiteln").replace(/\bModuls\b/g, "Kapitels").replace(/\bModul(?=\s\d)/g, "Kapitel").replace(/\bdieses Modul\b/g, "dieses Kapitel").replace(/\bDieses Modul\b/g, "Dieses Kapitel")
    .replace(/\bLektionen\b/g, "Abschnitte").replace(/\bLektion(?=\s\d)/g, "Abschnitt")
    .replace(/Rechner oben/g, "Rechner im Online-Kurs").replace(/im Rechner/g, "im Online-Rechner");
}

// ---------- Quiz aus dem Skript der Modulseite
function extractBracket(src, marker) {
  const i = src.indexOf(marker); if (i < 0) return null;
  const start = i + marker.length - 1; let depth = 0, inStr = null;
  for (let j = start; j < src.length; j++) {
    const c = src[j];
    if (inStr) { if (c === "\\") { j++; continue; } if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === "[" || c === "{") depth++;
    if (c === "]" || c === "}") { depth--; if (depth === 0) return src.slice(start, j + 1); }
  }
  return null;
}
function quizOf(root) {
  const qd = root.querySelector("script#quiz-data");
  if (qd) { try { return JSON.parse(qd.innerHTML).map((x) => (Array.isArray(x) ? x : [x.q, x.options, x.right, x.explain])); } catch { /* weiter */ } }
  for (const s of root.querySelectorAll("script")) {
    const t = s.innerHTML; const arr = extractBracket(t, "var Q = [");
    if (arr) { const ctx = vm.createContext({ Q: null }); vm.runInContext(`Q = ${arr};`, ctx, { timeout: 2000 }); return ctx.Q; }
  }
  return [];
}

// ---------- Stichwortverzeichnis: fett gesetzte Fachbegriffe sammeln
const STOP = new Set(["beispiel","lösung","merksatz","frage","musterlösung","antwort","ja","nein","vorteile","nachteile","typische fehler","prüfungsfalle","prüfungstipp","wichtig","achtung","ergebnis","rechnung","hinweis","ziel","idee","folge","fazit","schritt","aufgabe","tipp","formel","kapitel","abschnitt","fachlich","im alltag","ablauf","ursache","wirkung","vorgehen","beispiele","gegenmaßnahmen","gegenmaßnahme","maßnahmen","kriterium","kriterien","vorher","nachher","dann","oder","und","nicht","immer","nie","alle","jede","jeder","keine","kein","wer","was","wie","warum","wann","wo","hier","dort","punkte","punkt","rolle","zweck","inhalt","grund","gründe","problem","lösungen","fehler","regel","regeln","kosten","nutzen","risiko","risiken","daten","modell","modelle","besser","beobachten","benennen","begriffe","begründung","bewertung","beispiele sammeln","dagegen spricht","dafür spricht","das kind","das kochrezept","code","complete","text","thema","trend","tief","üblich","umgebung","update","überwachen","übersehen","test","besser","schlecht","gut","technik","schwach","stark","pilot","erklärung","vorhersagen","häufigkeit","kategorien","größe","einheiten","binär","ziel festlegen","daten vorbereiten"]);
const termMap = new Map();
function collectTerms(node, secLabel) {
  for (const b of node.querySelectorAll("b, strong")) {
    if (b.closest?.(".task")) continue;
    let t = b.text.replace(/\s+/g, " ").trim().replace(/[:;.,!?)(„“"]+$/g, "").replace(/^[„“"(]+/, "").trim();
    if (t.length < 4 || t.length > 42 || t.split(" ").length > 4) continue;
    if ((t.match(/\(/g) || []).length !== (t.match(/\)/g) || []).length || /„/.test(t) !== /“/.test(t) || /-$/.test(t) || /\bund$/.test(t)) continue;
    if (!/^[A-ZÄÖÜ]/.test(t) || /[=%€→<>]/.test(t) || /^\d/.test(t) || /\d{3,}/.test(t)) continue;
    const key = t.toLowerCase(); if (STOP.has(key)) continue;
    const e = termMap.get(key) ?? { label: t, secs: new Set(), n: 0 }; e.secs.add(secLabel); e.n++; termMap.set(key, e);
  }
}
function indexHtml() {
  const tech = (e) => e.secs.size >= 2 || e.n >= 2 || /[a-z][A-Z]|-|\d/.test(e.label) || /(?:ing|ation|ics|ity|ment|ator|set|tree|forest|net|score|rate|loss|gate|bias|drift|leakage|learning|mining)$/i.test(e.label);
  const list = [...termMap.values()].filter(tech).sort((a, b) => a.label.localeCompare(b.label, "de"));
  const secKey = (s) => s.split(".").map(Number);
  const cmp = (a, b) => { const [a1, a2] = secKey(a), [b1, b2] = secKey(b); return a1 - b1 || a2 - b2; };
  let cur = "";
  const rows = list.map((e) => {
    const letter = e.label[0].toUpperCase(); const head = letter !== cur ? ((cur = letter), `<div class="ixl">${letter}</div>`) : "";
    return `${head}<div class="ixr"><span class="ixt">${esc(e.label)}</span> <span class="ixn">${[...e.secs].sort(cmp).slice(0, 6).join(", ")}</span></div>`;
  });
  toc.push({ level: 1, id: "stichwort", text: "Stichwortverzeichnis" });
  return `<h1 class="app" id="stichwort">Stichwortverzeichnis</h1><p class="sec-meta">Auswahl wichtiger Fachbegriffe. Die Zahlen verweisen auf Abschnitte („6.3“ = Kapitel 6, Abschnitt 3).</p><div class="ix">${rows.join("")}</div>`;
}

// ---------- Abschnitte aufbereiten
function strip(sec, n, { exercises = false } = {}) {
  sec.querySelectorAll("aside.notes, script, style, .legend, svg.hidden").forEach((e) => e.remove());
  sec.querySelectorAll("input, textarea, select, label").forEach((e) => e.remove());
  if (!exercises) {
    sec.querySelectorAll(".calc").forEach((c) => c.replaceWith(parse(`<p class="online"><b>Interaktiver Rechner:</b> Zu dieser Stelle gibt es im Online-Kurs auf itundx.de (Kapitel ${n}) einen Rechner zum Ausprobieren mit eigenen Zahlen.</p>`)));
    for (const b of sec.querySelectorAll("button")) {
      let el = b; while (el.parentNode && el.parentNode !== sec) el = el.parentNode;
      if (el.parentNode === sec) el.remove();
    }
  } else sec.querySelectorAll("button").forEach((b) => b.remove());
  for (const img of sec.querySelectorAll("figure img")) {
    const src = img.getAttribute("src") || ""; const m = src.match(/gifs\/([^/]+)\.gif$/);
    if (m && existsSync(path.join(HERE, "img", `modul-${n}`, `${m[1]}.png`))) {
      img.setAttribute("src", `img/modul-${n}/${m[1]}.png`); img.removeAttribute("loading"); img.removeAttribute("width"); img.removeAttribute("height");
    } else { const fig = img.parentNode; img.remove(); if (fig && !fig.querySelector("figcaption")) fig.remove(); }
  }
  sec.querySelectorAll(".box, .task").forEach((b) => { if (b.text.length > 700) b.setAttribute("class", `${b.getAttribute("class")} long`); });
  let html = sec.innerHTML;
  html = html.replace(/<details class="solution"><summary>[^<]*<\/summary>/g, '<div class="sol"><span class="sol-label">Musterlösung</span>').replace(/<\/details>/g, "</div>");
  return html;
}

function renderModule(n) {
  const file = path.join(KURS, `modul-${n}`, `ki-kurs-modul-${n}.html`);
  const root = parse(readFileSync(file, "utf8"), { blockTextElements: { script: true, noscript: true, style: true, pre: true } });
  const intro = root.querySelector("section.intro");
  const chap = `kap${n}`; toc.push({ level: 1, id: chap, text: `Kapitel ${n}: ${TITEL[n]}` });
  let introP = intro?.querySelector("p")?.innerHTML ?? "";
  const stunden = (intro?.querySelector(".eyebrow")?.text.match(/ca\. (\d+) Lernstunden/) ?? [])[1];
  let out = `<section class="chapter" id="${chap}"><div class="chopen"><h1><span class="chno">Kapitel ${n}</span> ${esc(TITEL[n])}</h1>${stunden ? `<div class="eyebrow">Lernzeit im Online-Kurs: etwa ${stunden} Stunden</div>` : ""}<p>${introP}</p></div>`;
  const first = root.querySelector("section.lesson"); const container = first.parentNode;
  let secNo = 0;
  for (const node of container.childNodes) {
    if (!node.tagName) continue;
    const cls = node.getAttribute?.("class") ?? "";
    if (node.tagName === "DIV" && /part-head/.test(cls)) {
      const t = node.text.replace(/\s+/g, " ").trim(); out += `<h2 class="part">${esc(t.replace(/^(Teil [A-Z] · Lektionen [0-9–]+)\s*/, "$1: "))}</h2>`; continue;
    }
    if (node.tagName !== "SECTION" || !/lesson/.test(cls)) continue;
    const id = node.getAttribute("id") || "";
    if (/^l\d+$/.test(id)) {
      secNo++; const h2 = node.querySelector(".lesson-head h2"); const meta = node.querySelector(".lesson-head .meta")?.text ?? "";
      const min = (meta.match(/(\d+) Minuten/) ?? [])[1]; const title = `${n}.${secNo} ${h2?.text.trim() ?? ""}`; const hid = nid("s");
      toc.push({ level: 2, id: hid, text: title });
      node.querySelector(".lesson-head")?.remove();
      collectTerms(node, `${n}.${secNo}`);
      out += `<h2 class="sec" id="${hid}">${esc(title)}</h2>${min ? `<p class="sec-meta">Lernzeit im Online-Kurs: etwa ${min} Minuten</p>` : ""}${strip(node, n)}`;
    } else if (id === "uebungen") {
      const hid = nid("u"); toc.push({ level: 2, id: hid, text: `Übungen zu Kapitel ${n}` });
      node.querySelector(".lesson-head")?.remove();
      out += `<h2 class="sec" id="${hid}">Übungen zu Kapitel ${n}</h2><p class="sec-meta">Lösen Sie die Aufgaben zuerst selbst; die Musterlösung steht jeweils darunter. Im Online-Kurs bewertet eine KI Ihre Freitext-Antworten.</p>${strip(node, n, { exercises: true })}`;
    } else if (id === "quiz") {
      const q = quizOf(root); const hid = nid("q"); toc.push({ level: 2, id: hid, text: `Abschlussquiz Kapitel ${n}` });
      if (q.length) {
        const letters = "ABCDEFG";
        out += `<h2 class="sec" id="${hid}">Abschlussquiz Kapitel ${n}</h2><p class="sec-meta">${q.length} Fragen, jeweils genau eine Antwort richtig. Den Antwortschlüssel finden Sie direkt darunter.</p><div class="quiz"><ol>${q.map(([qq, opts]) => `<li>${qq}${opts.map((o, i) => `<span class="opt">${letters[i]}) ${o}</span>`).join("")}</li>`).join("")}</ol></div>`;
        out += `<div class="box"><span class="box-label">Antwortschlüssel</span><ol class="quiz-ans">${q.map(([, opts, right, ex]) => `<li><b>${letters[right]}</b> – ${esc(opts[right])}. ${ex ?? ""}</li>`).join("")}</ol></div>`;
      }
    } else if (id === "summary") {
      const hid = nid("z"); toc.push({ level: 2, id: hid, text: `Zusammenfassung Kapitel ${n}` });
      node.querySelector(".lesson-head")?.remove();
      out += `<h2 class="sec" id="${hid}">Zusammenfassung Kapitel ${n}</h2>${strip(node, n)}`;
    }
  }
  return buchsprache(out + "</section>");
}

// ---------- Vorder- und Rückteil
function mdSection(md, from, to) {
  const lines = md.split(/\r?\n/); const part = lines.slice(from - 1, to ? to - 1 : undefined).join("\n");
  return marked.parse(part).replace(/<h2/g, "<h1 class=\"app\"").replace(/<\/h2>/g, "</h1>");
}
function lineOf(md, startsWith) { return md.split(/\r?\n/).findIndex((l) => l.startsWith(startsWith)) + 1; }

function front(md) {
  const pruefStart = lineOf(md, "## Hinweise zur Prüfung"); const mod1 = lineOf(md, "## Modul 1:");
  const pruef = marked.parse(md.split(/\r?\n/).slice(pruefStart, mod1 - 1).join("\n")).replace(/<h3/g, "<h2").replace(/<\/h3>/g, "</h2>");
  const forewordToc = (t) => { toc.push({ level: 1, id: t.id, text: t.text }); return `<h1 class="fm" id="${t.id}">${t.text}</h1>`; };
  return `
<div class="titlepage"><h1>Berufsspezialist/in<br>Künstliche Intelligenz<br>und Maschinelles Lernen</h1><div class="sub">Der Lehrfaden für Einsteiger zur IHK-Prüfung<br>(DQR-Niveau 5)</div><div class="au">Michael Seeger</div><div class="sub" style="margin-top:6mm">mit Übungen, Rechenwegen, Prüfungsfragen und Musterlösungen</div></div>
<div class="impressum">
<h2>Impressum und Hinweise</h2>
<p><b>Berufsspezialist/in KI und ML – Der Lehrfaden für Einsteiger zur IHK-Prüfung.</b> 1. Auflage, Stand November 2026.</p>
<p>© 2026 Michael Seeger. Alle Rechte vorbehalten. Kein Teil dieses Buches darf ohne schriftliche Genehmigung vervielfältigt oder verbreitet werden, soweit nicht unten anders angegeben.</p>
<p>[Anschrift und Kontaktdaten der Herausgeberin / des Herausgebers gemäß Impressumspflicht – vor Veröffentlichung ergänzen] · [ISBN – bei Veröffentlichung ergänzen]</p>
<h2>Quellen und Lizenzhinweis</h2>
<p>Einzelne Begriffe, Definitionen, Beispiele und Rechenwege folgen den frei lizenzierten Lehrmaterialien „KI und Maschinelles Lernen“ (Projekt KI B3 – KI in die berufliche Bildung bringen, Universität Stuttgart, Autorin u. a. Dr. Antje Schweitzer; gefördert als InnoVET-Projekt aus Mitteln des Bundesministeriums für Bildung und Forschung), lizenziert unter <b>CC BY 4.0</b> (https://creativecommons.org/licenses/by/4.0/deed.de). Die Texte dieses Buches sind eigenständig formuliert, erweitert und angepasst; Fehler gehen zu Lasten des Herausgebers. Die Rechtsgrundlage der Prüfung ist die Besondere Rechtsvorschrift der IHK Region Stuttgart (Fassung vom 01.09.2024) bzw. die entsprechende Regelung Ihrer IHK.</p>
<h2>Haftungsausschluss</h2>
<p>Dieses Buch vermittelt Prüfungswissen und ersetzt keine Rechts-, Steuer- oder Anlageberatung. Gesetze, Fristen, Gebühren und Preise ändern sich; prüfen Sie den aktuellen Stand bei der zuständigen IHK und in den amtlichen Quellen. Dieses Buch wird nicht von einer Industrie- und Handelskammer herausgegeben oder geprüft. Alle Beispielunternehmen, Zahlen und Preise sind frei erfunden, soweit nicht ausdrücklich anders angegeben. Produkt- und Firmennamen sind Eigentum ihrer Inhaber.</p>
<h2>Online-Begleitung</h2>
<p>Zu diesem Buch gehört der Online-Kurs auf <b>itundx.de</b> mit interaktiven Rechnern, Animationen, Übungen mit KI-Korrektur, zwanzig Probeprüfungsbögen und einem Transfer-Simulator. Das erste Kapitel ist dort kostenlos.</p>
</div>
<!--TOC-->
${forewordToc({ id: "vorwort", text: "Vorwort" })}
<div class="preface">
<p>Dieses Buch ist für Sie geschrieben, wenn Sie die IHK-Prüfung zum <b>Geprüften Berufsspezialisten für Künstliche Intelligenz und Maschinelles Lernen</b> ablegen möchten und bisher wenig oder gar nicht mit Statistik, Programmieren oder KI zu tun hatten. Vorkenntnisse in Mathematik über die Schulzeit hinaus brauchen Sie nicht. Alles, was Sie für die Prüfung wissen müssen, wird Schritt für Schritt erklärt: erst mit einem Beispiel aus dem Alltag, dann fachlich korrekt, dann an einer durchgerechneten Aufgabe.</p>
<p>Die Prüfung verlangt dreierlei: <b>Wissen</b> (Begriffe und Zusammenhänge), <b>Rechnen</b> (Kennzahlen, Wahrscheinlichkeiten, Wirtschaftlichkeit) und <b>Anwenden</b> (eine betriebliche Situation analysieren und eine Lösung begründen). Das Buch trainiert alle drei. Jedes Kapitel endet mit Übungen samt Musterlösung und einem Quiz; viele Abschnitte enthalten Prüfungsfragen mit Punkteverteilung, damit Sie sehen, wie Antworten bewertet werden.</p>
<p>Ich wünsche Ihnen Freude beim Lernen – und eine bestandene Prüfung.</p>
<p><i>Michael Seeger</i></p>
</div>
${forewordToc({ id: "lesen", text: "So arbeiten Sie mit diesem Buch" })}
<div class="preface">
<p><b>Der Aufbau.</b> Zwölf Kapitel führen von den Grundbegriffen über Mathematik, Daten, Lernverfahren, Bewertung und neuronale Netze bis zu Generativer KI, Projektarbeit, Recht, Wirtschaftlichkeit und den übrigen Prüfungsthemen. Im Anhang finden Sie eine vollständige Beispiel-Prüfungsaufgabe, die Formelsammlung mit Glossar und die Quellen.</p>
<div class="box alltag"><span class="box-label">Im Alltag</span><p>Jeder Abschnitt beginnt mit einem Vergleich aus dem Alltag. Er soll den Gedanken greifbar machen, bevor Fachbegriffe kommen.</p></div>
<div class="box"><span class="box-label">Fachlich</span><p>Hier steht die Erklärung so, wie sie in der Prüfung erwartet wird: mit den richtigen Fachwörtern.</p></div>
<div class="box situation"><span class="box-label">Beispiel</span><p>Durchgerechnete Beispiele mit Zahlen. Rechnen Sie jedes einmal mit Stift und Taschenrechner nach.</p></div>
<div class="box falle"><span class="box-label">Typische Fehler und Prüfungsfallen</span><p>Fehler, die in Prüfungen häufig vorkommen.</p></div>
<div class="box tipp"><span class="box-label">Prüfungsfrage mit Musterlösung</span><p>Üben Sie, die Antwort zuerst abzudecken und selbst zu formulieren.</p></div>
<div class="box merk"><span class="box-label">Merksatz</span><p>Der eine Satz, der hängen bleiben muss.</p></div>
<p><b>Online-Rechner und Animationen.</b> Im Buch sehen Sie die Abbildungen als Standbild und finden Hinweise, wo es im Online-Kurs auf <b>itundx.de</b> Rechner und Animationen gibt. Zum Üben unter Prüfungsbedingungen eignen sich die Probeprüfungen im Online-Kurs.</p>
<p><b>Zwei Wege durch das Buch.</b> Wenn Sie viel Zeit haben, lesen Sie die Kapitel der Reihe nach. Wenn die Prüfung nah ist, lesen Sie die Zusammenfassungen am Ende jedes Kapitels, lösen die Übungen und wiederholen gezielt, wo Sie unsicher sind.</p>
</div>
${forewordToc({ id: "pruefung", text: "Die Prüfung im Überblick" })}
<div class="md">${pruef}</div>
`;
}

function back(md) {
  const pb = lineOf(md, "## Probeprüfung"); const fm = lineOf(md, "## Formelsammlung"); const qu = lineOf(md, "## Quellen");
  const sect = (from, to, id, title) => { toc.push({ level: 1, id, text: title }); return `<div class="md">${mdSection(md, from, to).replace(/<h1 class="app">[\s\S]*?<\/h1>/, `<h1 class="app" id="${id}">${title}</h1>`)}</div>`; };
  return sect(pb, fm, "anh-a", "Anhang A: Probeprüfung mit Musterlösung") + sect(fm, qu, "anh-b", "Anhang B: Formelsammlung und Glossar") + sect(qu, 0, "anh-c", "Anhang C: Quellen");
}

function cover() {
  return `<div class="cover"><div><div class="kicker">IHK-Prüfung · DQR 5</div><h1>Berufsspezialist/in<br>Künstliche Intelligenz<br>und Maschinelles Lernen</h1><div class="sub">Der Lehrfaden für Einsteiger – vom ersten Begriff bis zur bestandenen Prüfung</div><div class="bars"><i style="background:#0f766e"></i><i style="background:#b45f06"></i><i style="background:#5a4bb0"></i><i style="background:#c33f4b"></i></div></div><div class="foot">Michael Seeger · mit Online-Kurs, Rechnern und Probeprüfungen auf itundx.de</div></div>`;
}

function page(bodyHtml, css) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Berufsspezialist KI und ML – Lehrfaden</title><style>${css}</style></head><body>${bodyHtml}</body></html>`;
}

function tocHtml(pages) {
  return `<h1 class="fm first" style="break-before:page">Inhaltsverzeichnis</h1><div class="toc">${toc.map((t) => `<div class="row l${t.level}"><span class="t">${esc(t.text)}</span><span class="d"></span><span class="n">${pages?.[norm(t.text)] ?? "000"}</span></div>`).join("")}</div>`;
}

// ---------- Hauptablauf
const md = readFileSync(LEHRPLAN, "utf8");
const css = readFileSync(path.join(HERE, "book.css"), "utf8").replace(/FONTDIR/g, FONTDIR);
const frontHtml = front(md);
let bodyChapters = ""; for (let n = 1; n <= 12; n++) bodyChapters += renderModule(n);
const backHtml = back(md) + indexHtml();
if (process.argv.includes("--index")) { console.log([...termMap.values()].length, "Stichwörter; gesamt", termMap.size); console.log([...termMap.values()].slice(300, 400).map((e) => e.label).join(" | ")); process.exit(0); }
const assemble = (pages) => buchsprache(frontHtml.replace("<!--TOC-->", tocHtml(pages))) + bodyChapters + backHtml;

writeFileSync(path.join(HERE, "book.html"), page(assemble(null), css));
console.log(`Abschnitte im Inhaltsverzeichnis: ${toc.length}`);
if (ONLY_HTML) process.exit(0);

const { chromium } = require("playwright-core");
async function render(html, outPdf, { coverOnly = false } = {}) {
  const browser = await chromium.launch({ channel: "msedge" }).catch(() => chromium.launch({ channel: "chrome" }));
  const ctx = await browser.newContext(); const pg = await ctx.newPage();
  const f = path.join(HERE, coverOnly ? "cover.html" : "book.html"); writeFileSync(f, html);
  await pg.goto(pathToFileURL(f).href, { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: outPdf, width: "170mm", height: "240mm", printBackground: true, preferCSSPageSize: false, displayHeaderFooter: !coverOnly, outline: !coverOnly, tagged: true,
    margin: coverOnly ? { top: 0, bottom: 0, left: 0, right: 0 } : PRINT ? { top: "18mm", bottom: "20mm", left: "21mm", right: "21mm" } : { top: "18mm", bottom: "20mm", left: "19mm", right: "16mm" },
    headerTemplate: "<div></div>", footerTemplate: `<div style="width:100%;font-size:8px;font-family:Arial,sans-serif;color:#667;text-align:center;padding-top:2mm"><span class="pageNumber"></span></div>` });
  await browser.close();
}
const bodyPdf = path.join(HERE, PRINT ? "body-druck.pdf" : "body.pdf"); const coverPdf = path.join(HERE, "cover.pdf");
await render(page(assemble(null), css), bodyPdf);
const pagesJson = execFileSync("python", ["-I", path.join(HERE, "outline.py"), bodyPdf], { encoding: "utf8", maxBuffer: 1 << 26 });
const pages = JSON.parse(pagesJson);
await render(page(assemble(pages), css), bodyPdf);
if (PRINT) {
  // Innenteil für den Druck: ohne Titelblatt, gerade Seitenzahl (leere Schlussseite falls nötig)
  const out = path.join(HERE, "Berufsspezialist-KI-ML-Lehrfaden-Innenteil-Druck.pdf");
  console.log(execFileSync("python", ["-I", path.join(HERE, "pad.py"), bodyPdf, out], { encoding: "utf8" }));
  console.log("Druck-Innenteil fertig:", out);
} else {
  await render(page(cover(), css.replace(/@page[^}]*}/, "@page { size: 170mm 240mm; margin: 0 }") + "body{margin:0}"), coverPdf, { coverOnly: true });
  execFileSync("python", ["-I", path.join(HERE, "merge.py"), coverPdf, bodyPdf, OUT_PDF], { encoding: "utf8" });
  console.log("PDF fertig:", OUT_PDF);
}



