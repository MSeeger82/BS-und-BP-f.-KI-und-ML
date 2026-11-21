// Erzeugt src/legacy/pruefungen-bp.html aus src/legacy/pruefungen.html (Kurs 1).
import { readFileSync, writeFileSync } from "node:fs";
const root = process.argv[2];
let h = readFileSync(root + "/src/legacy/pruefungen.html", "utf8");
let n = 0;
function rep(a, b, all = false) {
  if (!h.includes(a)) { console.error("NICHT GEFUNDEN: " + a.slice(0, 90)); process.exitCode = 1; return; }
  h = all ? h.split(a).join(b) : h.replace(a, b);
  n++;
}
rep("<title>KI-Kurs Modul 13</title>", "<title>Bachelor-Kurs Modul 18</title>");
rep("<small>Berufsspezialist/in KI &amp; ML · Kurs</small>", "<small>Bachelor Professional KI &amp; ML · Kurs</small>");
rep("Modul 13: Schriftliche Probeprüfungen", "Modul 18: Schriftliche Probeprüfungen", true);
rep("Modul 13 von 14 · Prüfungstraining", "Modul 18 von 19 · Prüfungstraining");
rep("<h1>Zehn schriftliche Probeprüfungen unter echten Bedingungen</h1>", "<h1>Zehn schriftliche Probeprüfungen zum Bachelor Professional</h1>");
rep(/<p class="lead">Jeder Prüfungssatz besteht wie die echte IHK-Prüfung aus zwei Teilen:[^<]*<\/p>/.exec(h)[0],
  '<p class="lead">Jeder Prüfungssatz besteht wie die echte IHK-Prüfung aus drei Bögen: Teil 1 „Implementierung und Anwendungsmöglichkeiten datenbasierter KI-Modelle“ mit Bereich A „Grundlagen“ (60 Minuten) und Bereich B „Vertiefung“ (120 Minuten) sowie Teil 2, der situationsbezogenen Prüfung über alle Handlungsbereiche (240 Minuten). Jeder Bogen hat 100 Punkte. Die Zeit läuft ab dem Start, auch wenn Sie die Seite schließen. Nach der Abgabe werden Zahlen und Auswahlantworten sofort geprüft, Freitexte bewertet die KI anhand des Erwartungshorizonts wie ein IHK-Prüfer.</p>');
rep('<span class="chip">20 Prüfungsbögen</span><span class="chip">60 + 120 Minuten</span>', '<span class="chip">30 Prüfungsbögen</span><span class="chip">60 + 120 + 240 Minuten</span>');
rep("<p>Jeder Prüfungsteil braucht mindestens 50 von 100 Punkten. Für die Gesamtnote zählt Teil 1 mit 15 %, Teil 2 mit 35 %; der schriftliche Teil insgesamt muss mindestens „ausreichend“ sein.</p>",
  "<p>Jeder Prüfungsteil braucht mindestens 50 von 100 Punkten (§ 11). In die Gesamtnote gehen Bereich A und Bereich B mit je 10 %, Teil 2 mit 30 % ein; die übrigen 50 % entfallen auf Transferarbeit, Präsentation und Fachgespräch (Modul 19).</p>");
rep("<h2>Notenschlüssel der IHK</h2>", "<h2>Notenschlüssel nach Anlage 1 der Rechtsvorschrift</h2>");
rep('<thead><tr><th>Punkte</th><th>100–92</th><th>91–81</th><th>80–67</th><th>66–50</th><th>49–30</th><th>29–0</th></tr></thead>\n        <tbody><tr><th>Note</th><td>1 sehr gut</td><td>2 gut</td><td>3 befriedigend</td><td>4 ausreichend</td><td>5 mangelhaft</td><td>6 ungenügend</td></tr></tbody>',
  '<thead><tr><th>Punkte</th><th>100–92</th><th>91–81</th><th>80–67</th><th>66–50</th><th>49–30</th><th>29–0</th></tr></thead>\n        <tbody><tr><th>Note</th><td>1,0–1,4 sehr gut</td><td>1,5–2,4 gut</td><td>2,5–3,4 befriedigend</td><td>3,5–4,4 ausreichend</td><td>4,5–5,4 mangelhaft</td><td>5,5–6,0 ungenügend</td></tr></tbody>');
rep('var LS = "ki-kurs-m13";', 'var LS = "bp-kurs-m18";\n  var TEILNAME = { 1: "Teil 1 · Bereich A", 2: "Teil 1 · Bereich B", 3: "Teil 2" };\n  function tn(b) { return TEILNAME[b.teil] || ("Teil " + b.teil); }\n  var GRADE = [[100,"1,0"],[98,"1,1"],[96,"1,2"],[94,"1,3"],[92,"1,4"],[91,"1,5"],[90,"1,6"],[89,"1,7"],[88,"1,8"],[87,"1,9"],[85,"2,0"],[84,"2,1"],[83,"2,2"],[82,"2,3"],[81,"2,4"],[79,"2,5"],[78,"2,6"],[77,"2,7"],[75,"2,8"],[74,"2,9"],[72,"3,0"],[71,"3,1"],[70,"3,2"],[68,"3,3"],[67,"3,4"],[65,"3,5"],[63,"3,6"],[62,"3,7"],[60,"3,8"],[58,"3,9"],[56,"4,0"],[55,"4,1"],[53,"4,2"],[51,"4,3"],[50,"4,4"],[48,"4,5"],[46,"4,6"],[44,"4,7"],[42,"4,8"],[40,"4,9"],[38,"5,0"],[36,"5,1"],[34,"5,2"],[32,"5,3"],[30,"5,4"],[25,"5,5"],[20,"5,6"],[15,"5,7"],[10,"5,8"],[5,"5,9"],[0,"6,0"]];');
rep('  function note(p) {\n    if (p >= 92) return [1, "sehr gut"]; if (p >= 81) return [2, "gut"]; if (p >= 67) return [3, "befriedigend"];\n    if (p >= 50) return [4, "ausreichend"]; if (p >= 30) return [5, "mangelhaft"]; return [6, "ungenügend"];\n  }',
  '  function note(p) {\n    var r = Math.max(0, Math.min(100, Math.round(p)));\n    var d = GRADE.filter(function (g) { return r >= g[0]; })[0][1];\n    var wort = r >= 92 ? "sehr gut" : r >= 81 ? "gut" : r >= 67 ? "befriedigend" : r >= 50 ? "ausreichend" : r >= 30 ? "mangelhaft" : "ungenügend";\n    return [d, wort];\n  }');
rep('var t2 = satzNr[nr].filter(function (b) { return b.teil === 2; })[0];', 'var t2 = satzNr[nr].filter(function (b) { return b.teil === 3; })[0];');
rep('row.appendChild(el("b", "", "Teil " + b.teil + " · " + b.minuten + " min"));', 'row.appendChild(el("b", "", tn(b) + " · " + b.minuten + " min"));');
rep('      if (results[1] !== undefined && results[2] !== undefined) {\n        var g = (results[1] * 15 + results[2] * 35) / 50;\n        var both = results[1] >= 50 && results[2] >= 50;',
  '      if (results[1] !== undefined && results[2] !== undefined && results[3] !== undefined) {\n        var g = (results[1] * 10 + results[2] * 10 + results[3] * 30) / 50;\n        var both = results[1] >= 50 && results[2] >= 50 && results[3] >= 50;');
rep('c.appendChild(el("span", "eyebrow", "Prüfungssatz " + b.satz + " · Teil " + b.teil));', 'c.appendChild(el("span", "eyebrow", "Prüfungssatz " + b.satz + " · " + tn(b)));');
rep('"Satz " + b.satz + " · Teil " + b.teil + ": " + b.titel', '"Satz " + b.satz + " · " + tn(b)');
rep('"Prüfungssatz " + b.satz + " · Teil " + b.teil + " · " + b.minuten + " Minuten · "', '"Prüfungssatz " + b.satz + " · " + tn(b) + " · " + b.minuten + " Minuten · "');
rep("Du bist Prüfer bei der IHK-Fortbildungsprüfung „Geprüfte/r Berufsspezialist/in für Künstliche Intelligenz und Maschinelles Lernen“ (DQR 5).",
  "Du bist Prüfer bei der IHK-Fortbildungsprüfung „Bachelor Professional in Künstlicher Intelligenz und Maschinellem Lernen“ (DQR 6). Bewerte auf Bachelor-Niveau: Begründungen, Bezüge zu Recht, Wirtschaftlichkeit und Führung zählen.");
rep('"Ergebnis · Prüfungssatz " + b.satz + " · Teil " + b.teil', '"Ergebnis · Prüfungssatz " + b.satz + " · " + tn(b)');
rep('"Satz " + b.satz + " · Teil " + b.teil + ": " + fmt(sc.punkte)', '"Satz " + b.satz + " · " + tn(b) + ": " + fmt(sc.punkte)');
writeFileSync(root + "/src/legacy/pruefungen-bp.html", h);
console.log(n + " Ersetzungen");
