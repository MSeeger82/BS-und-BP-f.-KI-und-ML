// Erzeugt src/legacy/simulator-bp.html aus src/legacy/simulator.html (Kurs 1) für den Bachelor Professional.
import { readFileSync, writeFileSync } from "node:fs";
const root = process.argv[2];
let h = readFileSync(root + "/src/legacy/simulator.html", "utf8");
let n = 0;
function rep(a, b, all = false) {
  if (!h.includes(a)) { console.error("NICHT GEFUNDEN: " + a.slice(0, 100)); process.exitCode = 1; return; }
  h = all ? h.split(a).join(b) : h.replace(a, b);
  n++;
}
const DQR6 = "„Bachelor Professional in Künstlicher Intelligenz und Maschinellem Lernen“ (DQR 6)";

rep("<title>KI-Kurs Modul 14</title>", "<title>Bachelor-Kurs Modul 19</title>");
rep("<small>Berufsspezialist/in KI &amp; ML · Kurs</small><strong>Modul 14: Transferprojekt-Simulator</strong>", "<small>Bachelor Professional KI &amp; ML · Kurs</small><strong>Modul 19: Transfer-Simulator</strong>");
rep("Modul 14 von 14 · Simulation des transferbezogenen Prüfungsteils", "Modul 19 von 19 · Simulation der transferbezogenen Prüfung");
rep(/<p class="lead">Präsentation und Fachgespräch machen zusammen 50 % Ihrer Note aus\.[^<]*<\/p>/.exec(h)[0],
  '<p class="lead">Die transferbezogene Prüfung macht die Hälfte Ihrer Gesamtnote aus: die schriftliche Transferarbeit (20 Seiten ± 10 %, 30 Tage Bearbeitungszeit) mit 25 % sowie Präsentation und situationsbezogenes Fachgespräch (je mindestens 20 Minuten, zusammen höchstens 60 Minuten) mit weiteren 25 %. Dieser Simulator führt Sie durch den ganzen Ablauf: Fall oder eigenes Thema wählen, Themenvorschlag mit Gliederung beim KI-Prüfungsausschuss einreichen, die 30 Tage planen, Kapitel und Seitenumfang der Transferarbeit festlegen, Foliensatz und Probevortrag erstellen und ein Fachgespräch über alle Handlungsbereiche führen. Am Ende erhalten Sie Punkte, Note nach Anlage 1 und konkrete Hinweise.</p>');
rep('<span class="chip">28-Tage-Plan</span><span class="chip">Foliensatz-Editor</span><span class="chip">Probevortrag mit Stoppuhr</span><span class="chip">20 Minuten Fachgespräch</span>',
  '<span class="chip">30-Tage-Plan</span><span class="chip">Kapitelplan 20 Seiten</span><span class="chip">Foliensatz-Editor</span><span class="chip">Probevortrag 20–25 Minuten</span><span class="chip">25 Minuten Fachgespräch</span>');
rep("am IHK-Notenschlüssel. Sie ist ein Trainingswerkzeug", "am Notenschlüssel nach Anlage 1 der Rechtsvorschrift. Sie ist ein Trainingswerkzeug");
rep('var LS = "ki-kurs-m14";', 'var LS = "bp-kurs-m19";');
rep('var STEPS = ["Fall", "Themenvorschlag", "28-Tage-Plan", "Foliensatz", "Probevortrag", "Fachgespräch", "Bewertung"];',
  'var STEPS = ["Fall", "Themenvorschlag", "30-Tage-Plan", "Transferarbeit und Folien", "Probevortrag", "Fachgespräch", "Bewertung"];');
rep('var BEREICHE = ["KI-Lösung und Technik", "Daten", "Prozess- und Projektmanagement", "Recht und Ethik", "Wirtschaftlichkeit", "Zukunftskompetenzen"];',
  'var BEREICHE = ["KI-Lösung und Technik", "Daten", "Prozess- und Projektmanagement", "Recht", "Ökonomie und Nachhaltigkeit", "Personal und Führung", "Zukunftskompetenzen"];');
rep("var GESPRAECH_MIN = 20, MAX_FRAGEN = 12;", "var GESPRAECH_MIN = 25, MAX_FRAGEN = 15;\n  var KAPITEL_DEFAULT = \"1 Ausgangslage und Zielsetzung | 2\\n2 Ist-Analyse von Prozess und Daten | 3\\n3 KI-Lösungskonzept und Modellbewertung | 5\\n4 Projekt- und Einführungsplanung | 2\\n5 Rechtliche Rahmenbedingungen | 2\\n6 Wirtschaftlichkeit und Nachhaltigkeit | 3\\n7 Personal, Führung und Veränderung | 1,5\\n8 Fazit, Reflexion und Ausblick | 1,5\";\n  var GRADE = [[100,\"1,0\"],[98,\"1,1\"],[96,\"1,2\"],[94,\"1,3\"],[92,\"1,4\"],[91,\"1,5\"],[90,\"1,6\"],[89,\"1,7\"],[88,\"1,8\"],[87,\"1,9\"],[85,\"2,0\"],[84,\"2,1\"],[83,\"2,2\"],[82,\"2,3\"],[81,\"2,4\"],[79,\"2,5\"],[78,\"2,6\"],[77,\"2,7\"],[75,\"2,8\"],[74,\"2,9\"],[72,\"3,0\"],[71,\"3,1\"],[70,\"3,2\"],[68,\"3,3\"],[67,\"3,4\"],[65,\"3,5\"],[63,\"3,6\"],[62,\"3,7\"],[60,\"3,8\"],[58,\"3,9\"],[56,\"4,0\"],[55,\"4,1\"],[53,\"4,2\"],[51,\"4,3\"],[50,\"4,4\"],[48,\"4,5\"],[46,\"4,6\"],[44,\"4,7\"],[42,\"4,8\"],[40,\"4,9\"],[38,\"5,0\"],[36,\"5,1\"],[34,\"5,2\"],[32,\"5,3\"],[30,\"5,4\"],[25,\"5,5\"],[20,\"5,6\"],[15,\"5,7\"],[10,\"5,8\"],[5,\"5,9\"],[0,\"6,0\"]];");
rep('  function note(p) {\n    if (p >= 92) return "1 – sehr gut"; if (p >= 81) return "2 – gut"; if (p >= 67) return "3 – befriedigend";\n    if (p >= 50) return "4 – ausreichend"; if (p >= 30) return "5 – mangelhaft"; return "6 – ungenügend";\n  }',
  '  function note(p) {\n    var r = Math.max(0, Math.min(100, Math.round(p)));\n    var d = GRADE.filter(function (g) { return r >= g[0]; })[0][1];\n    return d + " – " + (r >= 92 ? "sehr gut" : r >= 81 ? "gut" : r >= 67 ? "befriedigend" : r >= 50 ? "ausreichend" : r >= 30 ? "mangelhaft" : "ungenügend");\n  }');

// Themenvorschlag
rep("<li>Schwerpunkt auf der KI-Lösung (§ 4), dazu Prozess/Projekt, Recht, Wirtschaftlichkeit und Zukunftskompetenzen (§§ 5–8)</li>", "<li>Schwerpunkt auf der Implementierung datenbasierter KI-Modelle (§ 4), dazu Prozesse und Projekte (§ 5), Recht (§ 6), Ökonomie (§ 7), Personal und Führung (§ 8) und Zukunftskompetenzen (§ 9)</li>");
rep("<li>In 28 Tagen leistbar</li>", "<li>Als Transferarbeit mit 20 Seiten (± 10 %) in 30 Tagen leistbar, auf Bachelor-Niveau (DQR 6)</li>");
rep('"Prozess/Projekt, Recht, Wirtschaftlichkeit und Zukunftskompetenzen kommen in der Gliederung vor."', '"Prozess/Projekt, Recht, Ökonomie, Personal/Führung und Zukunftskompetenzen kommen in der Gliederung vor."');
rep('"Der Umfang ist in 28 Tagen leistbar."', '"Der Umfang ist mit 20 Seiten in 30 Tagen leistbar."');
rep("Du bist der IHK-Prüfungsausschuss für die Fortbildungsprüfung „Geprüfte/r Berufsspezialist/in für Künstliche Intelligenz und Maschinelles Lernen“ (DQR 5). Du prüfst einen Themenvorschlag für die Transferarbeit (visualisierter Foliensatz, 28 Tage Bearbeitungszeit, danach 10–15 Minuten Präsentation und ca. 20 Minuten Fachgespräch).",
  "Du bist der IHK-Prüfungsausschuss für die Fortbildungsprüfung " + DQR6 + ". Du prüfst einen Themenvorschlag mit Gliederung für die praxisbezogene Transferarbeit (20 Seiten ± 10 %, 30 Tage Bearbeitungszeit ab Freigabe, danach Präsentation und situationsbezogenes Fachgespräch von je mindestens 20 Minuten).");
const k1 = /"Kriterien laut Rechtsvorschrift: [^"]*",/.exec(h)[0];
rep(k1, '"Kriterien laut Rechtsvorschrift: Thema aus der betrieblichen Praxis; Schwerpunkt auf der Implementierung und Anwendung datenbasierter KI-Modelle (§ 4) unter Einbeziehung der Handlungsbereiche Prozess- und Projektmanagement (§ 5), rechtliche Rahmenbedingungen (§ 6), ökonomische Aspekte (§ 7), Personalmanagement und Führung (§ 8) sowie Zukunftskompetenzen (§ 9); komplexe Problemstellung analysieren, Lösung entwickeln, bewerten und vertreten; Kurzbeschreibung und Gliederung mit aussagekräftigen Unterpunkten; DQR-6-Niveau (strategische und führungsbezogene Perspektive); als 20-seitige Arbeit in 30 Tagen leistbar.",');

// Plan
rep(/  var PLAN_DEFAULT = \[[\s\S]*?\n  \];/.exec(h)[0],
  '  var PLAN_DEFAULT = [\n    ["Ist-Analyse und Daten sichten", 1, 5], ["Lösungskonzept und Prototyp", 4, 13], ["Wirtschaftlichkeit berechnen", 11, 16],\n    ["Recht, Datenschutz und Risiken", 13, 18], ["Einführung, Personal und Change", 15, 19], ["Transferarbeit schreiben", 8, 25],\n    ["Korrektur und Abgabe", 26, 28], ["Puffer", 29, 30]\n  ];');
rep('kopf(2, "Die 28 Tage planen",', 'kopf(2, "Die 30 Tage planen",');
rep('["1", "7", "14", "21", "28"]', '["1", "8", "15", "22", "30"]');
rep("var s = Math.max(1, Math.min(28, p.start)), e = Math.max(s, Math.min(28, p.ende));", "var s = Math.max(1, Math.min(30, p.start)), e = Math.max(s, Math.min(30, p.ende));");
rep('bar.style.left = ((s - 1) / 28 * 100) + "%"; bar.style.width = ((e - s + 1) / 28 * 100) + "%";', 'bar.style.left = ((s - 1) / 30 * 100) + "%"; bar.style.width = ((e - s + 1) / 30 * 100) + "%";');
rep("return !(p.start >= 1 && p.ende <= 28 && p.start <= p.ende);", "return !(p.start >= 1 && p.ende <= 30 && p.start <= p.ende);");
rep('" (erlaubt: Tag 1 bis 28, Beginn vor Ende)" : "Alle Arbeitspakete liegen in den 28 Tagen."', '" (erlaubt: Tag 1 bis 30, Beginn vor Ende)" : "Alle Arbeitspakete liegen in den 30 Tagen."');
rep('["einführ|projekt|stakeholder|change", "Einführung/Projektplan"], ["folie", "Folien erstellen"], ["probe|vortrag|präsentation", "Probevortrag"]',
  '["einführ|projekt|stakeholder|change|personal", "Einführung, Personal und Change"], ["schreib|transferarbeit|text", "Transferarbeit schreiben"], ["korrektur|abgabe|lektorat", "Korrektur und Abgabe"]');
rep('chk(letzte <= 26, letzte <= 26 ? "Puffer am Ende: " + (28 - letzte) + " Tag(e)."', 'chk(letzte <= 28, letzte <= 28 ? "Puffer am Ende: " + (30 - letzte) + " Tag(e)."');
rep('var folie = st.plan.filter(function (p) { return /folie/i.test(p.name); })[0], probe = st.plan.filter(function (p) { return /probe|vortrag/i.test(p.name); })[0];\n      if (folie && probe) chk(probe.start >= folie.start + 3, probe.start >= folie.start + 3 ? "Der Probevortrag liegt sinnvoll nach dem Beginn der Folienarbeit." : "Der Probevortrag beginnt sehr früh – erst Folien, dann Probe.", true);',
  'var folie = st.plan.filter(function (p) { return /schreib|transferarbeit/i.test(p.name); })[0], probe = st.plan.filter(function (p) { return /korrektur|abgabe/i.test(p.name); })[0];\n      if (folie && probe) chk(probe.start >= folie.ende - 1, probe.start >= folie.ende - 1 ? "Korrektur und Abgabe folgen auf das Schreiben." : "Die Korrektur beginnt, bevor die Arbeit geschrieben ist – planen Sie sie ans Ende.", true);\n      chk(true, "Hinweis: Den Foliensatz für die Präsentation erstellen Sie nach der Abgabe bis zum Prüfungstermin.", true);');

// Transferarbeit und Folien
rep('["Recht und Ethik", "AI Act, DSGVO, Betriebsrat, Fairness"], ["Einführung", "Projektplan, Stakeholder, Schulung"],',
  '["Recht und Ethik", "KI-Verordnung, DSGVO, Betriebsrat, Fairness"], ["Einführung", "Projektplan, Stakeholder, Skalierung"], ["Personal und Führung", "Team, Qualifizierung, Veränderung begleiten"],');
rep('var c = kopf(3, "Den Foliensatz erstellen", "Die Transferarbeit ist ein visualisierter Foliensatz, der auch ohne Vortrag verständlich sein soll. Schreiben Sie die Überschrift jeder Folie als Kernaussage (ganzer Satz), darunter wenige Stichpunkte und eine Idee für die Visualisierung.");',
  'var c = kopf(3, "Transferarbeit planen und Foliensatz erstellen", "Die Transferarbeit umfasst 20 Seiten (± 10 %). Legen Sie zuerst Kapitel und Seitenumfang fest. Für die Präsentation (mindestens 20 Minuten) erstellen Sie danach einen Foliensatz: Überschrift jeder Folie als Kernaussage (ganzer Satz), darunter wenige Stichpunkte und eine Idee für die Visualisierung.");\n    if (!st.kapitel) st.kapitel = KAPITEL_DEFAULT;\n    var sp = el("p", "muted");\n    function seiten() { var s = 0; String(st.kapitel || "").split("\\n").forEach(function (z) { var m = z.split("|")[1]; if (m) s += parseFloat(m.replace(",", ".")) || 0; }); sp.textContent = "Geplanter Umfang: " + fmt(s) + " Seiten – " + (s < 18 ? "zu knapp, mindestens 18 Seiten." : s > 22 ? "zu umfangreich, höchstens 22 Seiten." : "im erlaubten Rahmen von 18 bis 22 Seiten."); }\n    c.appendChild(field("Kapitelplan der Transferarbeit (Kapitel | Seiten)", st.kapitel, function (x) { st.kapitel = x; seiten(); save(); }, { area: true, rows: 9, max: 3000, hint: "Eine Zeile je Kapitel, z. B. „3 KI-Lösungskonzept | 5“. Laut Rechtsvorschrift 20 Seiten ± 10 %." }));\n    c.appendChild(sp); seiten();');
rep("Du bist erfahrene/r Prüfer/in im IHK-Prüfungsausschuss „Berufsspezialist/in KI und ML“. Beurteile einen Foliensatz (Transferarbeit), der auch ohne Vortrag verständlich sein soll.",
  "Du bist erfahrene/r Prüfer/in im IHK-Prüfungsausschuss " + DQR6 + ". Beurteile den Kapitelplan der Transferarbeit (20 Seiten ± 10 %) und den Foliensatz für die Präsentation (mindestens 20 Minuten).");
rep("Recht (AI Act, DSGVO, Mitbestimmung), Wirtschaftlichkeit (Kosten, Nutzen, Amortisation, Annahmen) und Zukunftskompetenzen; sinnvolle Visualisierung; Umsetzung der Auflagen des Ausschusses.",
  "Recht (KI-Verordnung, DSGVO, Mitbestimmung), Ökonomie (Kosten, Nutzen, Investitionsrechnung, Nachhaltigkeit), Personal und Führung sowie Zukunftskompetenzen; Bachelor-Niveau mit strategischer Perspektive (Skalierung, Organisation); Seitenumfang und Gewichtung der Kapitel; sinnvolle Visualisierung; Umsetzung der Auflagen des Ausschusses.");
rep('"Genehmigtes Thema: " + ein(st.vorschlag.thema, 300),', '"Genehmigtes Thema: " + ein(st.vorschlag.thema, 300),\n        "Kapitelplan der Transferarbeit: " + ein(st.kapitel || "", 2000),');
rep("Prüfen Sie Ihre Folien selbst mit der Gliederung aus Modul 11, Lektion 12.", "Prüfen Sie Kapitelplan und Folien selbst mit Modul 17, Lektion 13.");

// Vortrag
rep("In der Prüfung stellen Sie Ihre Ergebnisse in 10 bis 15 Minuten vor.", "In der Prüfung präsentieren Sie Ihre Transferarbeit mindestens 20 Minuten lang; planen Sie 20 bis 25 Minuten.");
rep('(s < 600 ? "zu kurz, Ziel sind 10 bis 15 Minuten." : s > 900 ? "zu lang, kürzen Sie auf höchstens 15 Minuten." : "im Zielkorridor von 10 bis 15 Minuten.")',
  '(s < 1200 ? "zu kurz, die Präsentation muss mindestens 20 Minuten dauern." : s > 1500 ? "zu lang, kürzen Sie auf etwa 25 Minuten – Präsentation und Fachgespräch dürfen zusammen 60 Minuten nicht überschreiten." : "im Zielkorridor von 20 bis 25 Minuten.")');
rep("Du bist Prüfer/in im IHK-Prüfungsausschuss „Berufsspezialist/in KI und ML“ und bewertest das Manuskript eines Probevortrags (Ziel: 10–15 Minuten, freie Rede, adressatengerecht für Prüfende aus der Praxis).",
  "Du bist Prüfer/in im IHK-Prüfungsausschuss " + DQR6 + " und bewertest das Manuskript eines Probevortrags (Ziel: 20–25 Minuten, freie Rede, adressatengerecht für Prüfende aus der Praxis, Bachelor-Niveau).");

// Fachgespräch
rep("fragt der Prüfungsausschuss etwa 20 Minuten nach – über alle Handlungsbereiche.", "führt der Prüfungsausschuss ein situationsbezogenes Fachgespräch von mindestens 20 Minuten (hier 25) – über alle Handlungsbereiche.");
rep("Die Uhr läuft 20 Minuten.", "Die Uhr läuft 25 Minuten.");
rep("Du bist Mitglied des IHK-Prüfungsausschusses „Geprüfte/r Berufsspezialist/in für KI und ML“ (DQR 5) und führst das transferbezogene Fachgespräch (ca. 20 Minuten).",
  "Du bist Mitglied des IHK-Prüfungsausschusses " + DQR6 + " und führst das situationsbezogene Fachgespräch (mindestens 20 Minuten). Stelle auch Fragen zu Führung, Skalierung und strategischen Entscheidungen, wie es dem Bachelor-Niveau entspricht.");
rep("Üben Sie mit den Fragen aus Modul 11, Lektion 14, und lassen Sie sich von einer zweiten Person befragen.", "Üben Sie mit den Situationsaufgaben aus Modul 18 und lassen Sie sich von einer zweiten Person befragen.");

// Bewertung
rep("Beide Teile zählen in der echten Prüfung je 25 % der Gesamtnote.", "In der echten Prüfung zählen Präsentation und Fachgespräch zusammen 25 % der Gesamtnote (je zur Hälfte), die Transferarbeit selbst weitere 25 %.");
rep("Du bist Mitglied des IHK-Prüfungsausschusses „Geprüfte/r Berufsspezialist/in für KI und ML“ (DQR 5). Bewerte streng",
  "Du bist Mitglied des IHK-Prüfungsausschusses " + DQR6 + ". Bewerte streng");
rep("Wörter (Ziel 10–15 Minuten).", "Wörter (Ziel 20–25 Minuten, mindestens 20).");
rep("(KI-Lösung, Prozess/Projekt, Recht, Betriebswirtschaft, Zukunftskompetenzen)", "(KI-Lösung, Prozess/Projekt, Recht, Ökonomie, Personal und Führung, Zukunftskompetenzen)");

writeFileSync(root + "/src/legacy/simulator-bp.html", h);
console.log(n + " Ersetzungen");
