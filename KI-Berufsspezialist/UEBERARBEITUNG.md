# Überarbeitung KI-Berufsspezialist (seit 2026-11-21)

Auftrag von Michael: Kapitel zu kurz gefasst, Erklärungen ausführlicher und verständlicher, mehr Beispiele. Ziel: 1.000–1.300 Wörter je Lektion (ohne Sprechertext), vorher ca. 230–340.

Vorgehen je Modul:
1. Bestehende Lektionen lesen (kurs/modul-N/quelle.html; Modul 1 und 2: ki-kurs-modul-N.html).
2. Neue Lektionen als `kurs/modul-N/neu/NN-….html` schreiben (je Datei mehrere `<section class="lesson" id="lK">`), Ergänzungen als `NN-…-extra.html` (`<!--EXTRA lK-->…<!--/EXTRA-->`, wird vor dem Merksatz eingefügt).
3. `python tools/merge_lektionen.py N`, dann `python tools/build_kurs.py`, `python tools/pruefe_seite.py N`.
4. Stil: Im Alltag (länger) → Erklärung Schritt für Schritt (Begriffe beim ersten Auftreten erklären) → 2–3 durchgerechnete Beispiele (`box situation`) → Fachlich → Häufige Missverständnisse (`box falle`) → Merksatz → Prüfungsfrage mit Musterlösung → Was heißt das für Ihren Betrieb? → Kurz geprüft → Sprechertext.
5. Rechner, GIFs, Übungen, Quiz, Zusammenfassung bleiben unverändert (nur wenn nötig anpassen).

Stand:
- [x] Modul 1 (14 Lektionen, Schnitt 940 Wörter, pruefe_seite OK) – ggf. Lektion 13/14/8/9 später noch etwas verlängern
- [x] Modul 2 Mathematik und Statistik (18 Lektionen, nur Ergänzungen vor dem Merksatz: je 2–3 weitere Beispiele, typische Fehler, Prüfungsfrage mit Musterlösung; Schnitt 690 Wörter, pruefe_seite OK; Rechner/Formeln unverändert)
- [x] Modul 3 Daten (16 Lektionen, Ergänzungen mit Zahlenbeispielen, SQL/pandas-Beispielen, Prüfungsfrage; Schnitt 551 Wörter, pruefe_seite OK)
- [x] Modul 4 Überwachtes Lernen (15 Lektionen, Ergänzungen, Schnitt 560 Wörter, pruefe_seite OK)
- [x] Modul 5 Unüberwachtes Lernen und RL (14 Lektionen, Ergänzungen, Schnitt 515 Wörter, pruefe_seite OK)
- [x] Modul 6 Modellbewertung (15 Lektionen, Ergänzungen, Schnitt 480 Wörter, pruefe_seite OK)
- [x] Modul 7 Neuronale Netze (16 Lektionen, Ergänzungen, Schnitt 485 Wörter, pruefe_seite OK)
- [x] Modul 8 Generative KI und LLM (15 Lektionen, Ergänzungen mit Token-/Kosten-/RAG-Rechnungen, Prüfungsfragen, pruefe_seite OK)
- [x] Modul 9 Projektvorgehen und MLOps (14 Lektionen, Ergänzungen, pruefe_seite OK)
- [x] Modul 10 Recht, Ethik, Datenschutz (15 Lektionen, Ergänzungen, pruefe_seite OK; Fristen des AI Act in den Ergänzungen bewusst nicht wiederholt – Zeitplan/„Digital Omnibus“ in Lektion 1 noch gegenprüfen)
- [x] Modul 11 Wirtschaftlichkeit, Kommunikation, Prüfungsvorbereitung (14 Lektionen, Ergänzungen mit Rechnungen, pruefe_seite OK)
- [x] Modul 12 Ergänzungen laut Rechtsvorschrift (14 Lektionen, Ergänzungen, pruefe_seite OK)

Wortzahlen je Lektion (ohne Sprechertext), Stand 2026-11-21 nach Durchgang 1: M1 939 · M2 686 · M3 551 · M4 560 · M5 515 · M6 480 · M7 485 · M8 542 · M9 567 · M10 578 · M11 531 · M12 636. Vorher ca. 230–340. Ziel 1.000–1.300 NICHT erreicht (außer teils M1) → Durchgang 2 nur auf Wunsch.

OFFEN (Fachlich): Modul 10, Lektion 1 (quelle.html Zeilen 33–34, ggf. Zusammenfassung Zeile ~1105) nennt „ab 2. August 2026 Hochrisiko Anhang III / 2027 Anhang I“. Laut Recherche (Sekundärquellen) hat das „Digital Omnibus on AI“ (VO (EU) 2026/1744, in Kraft Juli 2026) Anhang III auf 2. Dezember 2027 und Anhang I auf 2. August 2028 verschoben; Art. 50 nicht verschoben. Vor Korrektur Originaltext auf EUR-Lex prüfen; bs ist LIVE, Korrektur braucht Deploy-Freigabe.

Danach: sync nach itundx/content/kurs, lokal neu importieren und prüfen; Deploy nur nach Freigabe. ACHTUNG Import: upsertChapter überspringt vorhandene Kapitel – für den Server neue chapterVersion statt `--neu` (Lernfortschritt!).
