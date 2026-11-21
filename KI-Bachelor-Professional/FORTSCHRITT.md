# Fortschritt – Kurs „Bachelor Professional in KI und ML (IHK)“

Plan: `C:\Users\losti\.claude\plans\sprightly-wishing-unicorn.md`. Grundlage: `quellen/rechtsvorschrift-bachelor-ki-ihk-stuttgart.txt`.
Vorlage aus Kurs 1: `..\KI-Berufsspezialist\kurs\shared\template.html`, Beispielmodul `..\KI-Berufsspezialist\kurs\modul-1\ki-kurs-modul-1.html`.

## Teil A – Plattform (itundx)
- [x] Schema + Migration 0001_mehrere_kurse (course, product, exam.course) – lokal angewendet
- [x] courses.ts, Zugriff je Kurs (getAccess → {bs,bp}), Preise (seller.prices), Kauf/Upgrade (/app/kaufen?produkt=), Rechnung, Dashboard ?kurs=, Konto
- [x] Kursseiten als gemeinsame Komponenten (src/components/kurs/pages.tsx), Routen /kurs/* und /bachelor/kurs/*
- [x] Frame/State/KI-Endpunkte je Kurs (scope pruefungen:bp, sim:bp; Dateien src/legacy/pruefungen-bp.html, simulator-bp.html noch anzulegen)
- [x] Kurs-Auswahl /, /berufsspezialist, /bachelor, /bachelor/pruefung, /bachelor/lehrplan, /preise (3 Angebote + Upgrade-Banner), /faq (nach Kurs), Header/Footer, OG-Bilder je Kurs, Sitemap (2026-11-20; tsc, vitest 26, next build ok; Desktop + 375 px angesehen)
- [x] Import --kurs bp (Quelle itundx/content/bachelor, Medien public/media/bp/modul-N, FAQs aus `<script id="faq-data">` je Lektions-ID, fehlende Module werden übersprungen)
- [x] pruefungen-bp.html / simulator-bp.html (mit Modul 18/19)
- [x] Admin: Preise je Produkt, Produkt in Käufen, manuelle Freischaltung je Produkt, Kurskennzeichnung in Inhalte; KI-Prompts kursabhängig
- [x] sitemap/llms.txt beide Kurse; Tests tests/courses.test.ts (26 grün); App-Navigation gekürzt
- [x] Rechtstexte: Vorlage AGB/Widerruf in legal-defaults.ts auf drei Produkte + Upgrade umgestellt. **Live-Texte liegen in der DB → nach Deploy im Admin unter Rechtstexte übernehmen** (rechtliche Prüfung durch Michael)
- Achtung: PowerShell Get-Content ohne -Encoding utf8 zerstört Umlaute (siehe Memory powershell-utf8)

## Teil B – Inhalte
- [x] Lehrplan (lehrplan/lehrplan.md, 67 KB; legt Lektionen je Modul fest – beim Schreiben der Module daran halten)
- [x] Module 1–17 (je: HTML, GIFs, Übungen, Quiz, FAQs, pruefe_seite, Import; Sichtprüfung im Browser nur für 1–3 – Rest bei gemeinsamer Sichtung)
  - [x] Modul 1 (17 Lektionen, 7 GIFs, 12 Aufgaben, 20 Quiz, 51 FAQs) – importiert, im Browser geprüft
  - [x] Modul 2 (16 Lektionen, 8 GIFs, Rechner Lage/Streuung, 12 Aufgaben, 20 Quiz, 37 FAQs) – importiert, Rechner im Browser geprüft
  - [x] Modul 3 (16 Lektionen, 8 GIFs, Rechner Bayes + lineare Regression, 12 Aufgaben, 20 Quiz, 34 FAQs) – importiert, Rechner geprüft
  - [x] Modul 4 (16 Lektionen, 8 GIFs, Rechner Konfusionsmatrix mit Kosten, 12 Aufgaben, 20 Quiz, 26 FAQs) – importiert
  - [x] Modul 5 (17 Lektionen, 8 GIFs, Neuron-Rechner, 12 Aufgaben, 20 Quiz, 32 FAQs) – importiert
  - [x] Modul 6 (16 Lektionen, 6 GIFs, Fairness-Rechner, 12 Aufgaben, 20 Quiz, 23 FAQs) – importiert
  - [x] Modul 7 (17 Lektionen, 7 GIFs, kein Rechner, 12 Aufgaben, 20 Quiz, 21 FAQs) – importiert; Quiz danach neu gemischt → **am Ende `npm run import -- --kurs bp --neu` ausführen**, damit alle Änderungen drin sind
  - [x] Modul 8 (15 Lektionen, 7 GIFs, Rechner Prozesskennzahlen, 12 Aufgaben, 20 Quiz, 19 FAQs) – importiert
  - [x] Modul 9 (17 Lektionen, 9 GIFs, Earned-Value-Rechner, 12 Aufgaben, 20 Quiz, 28 FAQs) – importiert
  - [x] Modul 10 (15 Lektionen, 8 GIFs, Use-Case-Rechner, 12 Aufgaben, 20 Quiz, 21 FAQs) – importiert
  - [x] Modul 11 (15 Lektionen, 6 GIFs, Rechner Angebotsvergleich + Ertragsteuer, 12 Aufgaben, 20 Quiz, 20 FAQs) – importiert
  - [x] Modul 12 (15 Lektionen, 6 GIFs, Bußgeldrechner, 12 Aufgaben, 20 Quiz, 22 FAQs) – importiert; KI-VO-Stand mit Digital Omnibus (VO (EU) 2026/1744: Anhang III ab 2.12.2027, Anhang I ab 2.8.2028, Art. 4 umformuliert) per Websuche geprüft, Lehrplan angepasst
  - Hinweis Endkontrolle: Modul 6 nennt Art. 4 als „sorgen müssen seit 2.2.2025“ – passt noch, ggf. Omnibus-Umformulierung ergänzen
  - [x] Modul 13 (15 Lektionen, 7 GIFs, Rechner Nutzwert mit kritischem Gewicht + ROI/Amortisation, 12 Aufgaben, 20 Quiz, 16 FAQs) – importiert
  - [x] Modul 14 (15 Lektionen, 6 GIFs, Rechner Break-even + Kapitalwert/IZF, 12 Aufgaben, 20 Quiz, 17 FAQs) – importiert; CSRD-Stand (Omnibus I, RL (EU) 2026/470) per Websuche geprüft, Lehrplan angepasst
  - [x] Modul 15 (16 Lektionen, 7 GIFs, Personalbedarfsrechner, 12 Aufgaben, 20 Quiz, 17 FAQs) – importiert
  - [x] Modul 16 (15 Lektionen, 6 GIFs, Rechner Urlaub/Minijob, 12 Aufgaben, 20 Quiz, 17 FAQs) – importiert; Werte Mindestlohn 13,90 €/Minijob 603 € (2026) nicht per Websuche geprüft – bei Endkontrolle bestätigen
  - [x] Modul 17 (16 Lektionen, 6 GIFs, Resilienz-Selbstcheck, 12 Aufgaben, 20 Quiz, 17 FAQs) – importiert
  - [x] **Alle 17 Lernmodule fertig; `npm run import -- --kurs bp --neu` am 2026-11-20 ausgeführt** (Modul 1 und 7 ohne Rechner, alle anderen mit)
  - Hinweis: Rechner-Skript wird nur erkannt mit Kommentar `/* Rechner in Modul N */`
  - mische_quiz.py mischt jetzt, bis keine Position > 40 % hat
  - Kürzerer Weg: Teile dürfen auch 3 Dateien sein (Lektionen A/B, Lektionen C + Übungen/Quiz/Zusammenfassung, Skripte)
  - Hinweis: Kapitel-Slugs entstehen aus data-title (z. B. „Kleinste Quadrate und R²“ → …-r2)
  - Hinweis: Importskript hatte Sonderfall „nr === 2“ für Kurs 1 – jetzt auf KURS === "bs" begrenzt

### Ablauf je Modul (bewährt mit Modul 1)
1. `tools/gifs_modulN.py` (Basis `tools/gifbase.py`, Klasse `Anim`), `python tools/gifs_modulN.py`, Kontaktbogen `python tools/kontaktbogen.py kurs/modul-N/gifs <png>` ansehen und Fehler beheben
2. Inhalt in `kurs/modul-N/teile/01-….html` … `05-skripte.html` (erste Datei beginnt mit `<!--META {"nr":N,"titel":"…","lektionen":X,"pass":14}-->`; die Zeile `<!--SCRIPTS-->` steht am Ende des letzten Inhaltsteils, danach nur noch Skripte)
   - Lektionen: `<section class="lesson" id="lK" data-title="…" data-part="Teil …">`, Bausteine box alltag/fach/merk/tipp/falle, figure.board mit `gifs/…`, check, aside.notes
   - Übungen `<section id="uebungen">` mit `<div class="task">`; Spezifikation `window.UEBUNGEN = { modul: N, aufgaben: { a1: { teile: [...] } } }` – Anzahl muss passen
   - Quiz `<script type="application/json" id="quiz-data">` (20 Fragen, [frage, optionen, index, erklärung]) am Zeilenanfang; FAQs `<script type="application/json" id="faq-data">` mit Schlüsseln intro, l1 … lN
3. `python tools/mische_quiz.py N` → `python tools/build_kurs.py` → `python tools/pruefe_seite.py N` (muss OK sein)
4. Kopieren nach `itundx/content/bachelor/kurs/modul-N/` (HTML + gifs/), dann in itundx `npm run import -- --kurs bp`; Seite im Browser ansehen
5. Bereits importierte Module ändern: `npm run import -- --kurs bp --neu` (löscht nur Bachelor-Inhalte)
- [x] 10 Prüfungssätze (30 Bögen) – Format: kurs/modul-18/daten/satz-NN.js, IDs bp-sNNa (teil 1, 60 min, Bereich A), bp-sNNb (teil 2, 120 min, Bereich B), bp-sNNt2 (teil 3, 240 min, mit situation, kurz); Prüfung `node tools/pruefe_pruefungen.js`; nach itundx/content/bachelor/kurs/modul-18/daten kopieren, import
  - [x] **Alle 10 Sätze (30 Bögen) fertig, geprüft (pruefe_pruefungen OK) und importiert** (2026-11-20)
  - Lokale Dienste: `node tools/pg.mjs` (Postgres 5546) und `npx next dev -p 3000` in itundx starten, falls nicht laufend
  - [x] itundx/src/legacy/pruefungen-bp.html erzeugt (Skript tools/mk-pruefungen-bp.mjs: Kopie von pruefungen.html mit TEILNAME, Anlage-1-Notenschlüssel, Gewichtung 10/10/30) – Deckblatt im Browser geprüft
  - Themenplan Rest: 3 Einzelhandel Absatzprognose · 4 Bank Betrugserkennung (Ausnahme Anhang III) · 5 Krankenhaus Dokumentation/Bettenplanung · 6 Produktion visuelle Prüfung · 7 Stadtverwaltung Bürgerchatbot (öffentlich, FRIA) · 8 Personaldienstleister Recruiting (AGG, Hochrisiko) · 9 Energieversorger Lastprognose (NIS-2) · 10 Onlinehandel Empfehlungen + GenAI-Texte (Art. 50, Urheberrecht)
- [x] Simulator-Fälle (kurs/modul-19/faelle.js, 6 Fälle) und itundx/src/legacy/simulator-bp.html (Ableitungsskript tools/mk-simulator-bp.mjs, Aufruf: node tools/mk-simulator-bp.mjs <itundx-Pfad>: 30 Tage, Kapitelplan 18–22 Seiten, Präsentation 20–25 min, Fachgespräch 25 min, 7 Bereiche, DQR 6, Anlage 1) – importiert, Startseite im Browser geprüft; Schritte 2–7 bei gemeinsamer Sichtung durchspielen
- [x] Landingpages (siehe Teil A)
- Offen für die gemeinsame Sichtung: Simulator Schritte 2–7 durchspielen, Art.-4-Formulierung Modul 6, Mindestlohn/Minijob Modul 16 bestätigen; GIF modul-9/earned-value: Achsenbeschriftung „T€“ ragt in den Titel

## Teil C – Abschluss
- [x] Freigabe durch Michael, **live deployt 2026-11-20 15:16** (Sicherung /opt/itundx/backups/*-vor-bachelor-20261120-1516: DB-Dump, .env, alter src; Migration 0001 angewendet, `import --kurs bp` auf dem Server; alle Routen 200)
- [ ] Nach Deploy: AGB/Widerruf im Admin unter Rechtstexte übernehmen (rechtliche Prüfung); offene Sichtungspunkte siehe oben

## Notizen
