# KI-Berufsspezialist – Kursprojekt

Vorbereitungskurs auf die IHK-Fortbildungsprüfung **Geprüfte/r Berufsspezialist/in für Künstliche Intelligenz und Maschinelles Lernen** (DQR 5). Zielgruppe: Laien ohne Vorkenntnisse.

## Online

| Inhalt | Link |
| --- | --- |
| Lehrplan (bearbeitbares Dokument) | https://claude.ai/artifact/MKCkQ1AHfx2yQeGxoyvE7P |
| Kurs Modul 1 – Grundlagen der KI | https://claude.ai/artifact/EJzDwMqXQqq4b6pPmzi8zA |
| Kurs Modul 2 – Mathematik und Statistik | https://claude.ai/artifact/Dfy3McLV8mVJge6Vf7tTjR |
| Kurs Modul 3 – Daten | https://claude.ai/artifact/VdxJYsoU52zUq47ZCmAQAM |
| Kurs Modul 4 – Überwachtes Lernen | https://claude.ai/artifact/Wyfqm2fepfj9J6qn5s4cXN |
| Kurs Modul 5 – Unüberwachtes Lernen und RL | https://claude.ai/artifact/NCpsa8e12ZRH5tKhe62G5K |
| Kurs Modul 6 – Modellbewertung | https://claude.ai/artifact/CvHXCuKBfUVpLUTi8GWGCC |
| Kurs Modul 7 – Neuronale Netze und Deep Learning | https://claude.ai/artifact/ND2dPpRmVkVzgNsi33xfgc |
| Kurs Modul 8 – Generative KI und Sprachmodelle | https://claude.ai/artifact/MgUJhkwNCCLF3aRHE7upWa |
| Kurs Modul 9 – Projektvorgehen und MLOps | https://claude.ai/artifact/QPitsEswRbWwrYhxHz3EHi |
| Kurs Modul 10 – Recht, Ethik und Datenschutz | https://claude.ai/artifact/YWexfwwmCJikKrstukvFPK |
| Kurs Modul 11 – Wirtschaftlichkeit, Kommunikation, Prüfungsvorbereitung | https://claude.ai/artifact/1Q2QZcHjDQCdX8LqHH5Sdu |
| Kurs Modul 12 – Ergänzungen: Robustheit, Prozesse, Recht, BWL, Zukunftskompetenzen | https://claude.ai/artifact/LvfeUeEdjSDmKNJp5m56e6 |
| Modul 13 – Zehn schriftliche Probeprüfungen (Teil 1 + Teil 2, Timer) | https://claude.ai/artifact/JZ367ujrkyXxU1XJmWDHJ8 |
| Modul 14 – Transferprojekt-Simulator | https://claude.ai/artifact/SfbQBjJWFMTqY1bZh9woDV |

Modul 13 und 14 sind eigene Seiten (nicht aus `template.html` erzeugt). Prüfungsbögen: `kurs/modul-13/daten/satz-NN.js`,
Prüfung der Punktsummen mit `node tools/pruefe_pruefungen.js`. Fallbeispiele des Simulators: `kurs/modul-14/faelle.js`.
Modul 14 nutzt zusätzlich die Fähigkeiten `dictation` (Antworten diktieren) und `tts` (Fragen vorlesen).

Die Online-Seiten sind privat, bis sie über „Teilen“ freigegeben werden.

## Ordner

```
lehrplan/   lehrplan.md – Markdown-Kopie des Online-Lehrplans (Stand der letzten Ausfuhr)
kurs/       modul-N/ki-kurs-modul-N.html + gifs/ – eine interaktive Kursseite pro Modul
tools/      Python-Skripte, die die GIF-Animationen erzeugen
quellen/    Prüfungsrechtsvorschriften (PDF)
```

## Übungen mit Antwortfeldern

Die Antwortfelder, die automatische Prüfung, die KI-Korrektur und die Dozentenansicht stecken in
`kurs/shared/uebungen.js` und `kurs/shared/uebungen.css`. Jede Modulseite enthält nur ihre
Aufgabenbeschreibung (`window.UEBUNGEN`). Nach einer Änderung an den Shared-Dateien:

```powershell
python tools\build_kurs.py   # fügt die Engine zwischen den BEGIN/END-Markierungen in alle Modulseiten ein
```

Veröffentlicht werden die Seiten mit den Fähigkeiten `db` (Regeln: `antworten` lesen nur Admin/Eigentümer,
`antworten/{self}` schreibt jede Person selbst), `user` (Scope `profile`) und `sample` (KI-Korrektur).

## GIFs neu erzeugen

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r tools\requirements.txt
.\.venv\Scripts\python.exe tools\gifs_modul1.py
.\.venv\Scripts\python.exe tools\gifs_modul2.py
# Vorschau aller GIFs als Kontaktbogen:
.\.venv\Scripts\python.exe tools\kontaktbogen.py kurs\modul-2\gifs vorschau.png
```

Die Skripte nutzen die Windows-Schrift Segoe UI (`C:\Windows\Fonts\segoeui.ttf`).

## Aufbau jeder Kursseite

- Lektionen mit den Bausteinen *Im Alltag* (Analogie), *Fachlich*, *Merksatz*, *Prüfungstipp*
- Sprechertext für Dozierende (oben einschaltbar)
- Vortragsmodus: eine Lektion pro Bildschirm, Pfeiltasten blättern, Esc beendet
- Übungen mit aufklappbaren Musterlösungen, Abschlussquiz mit Auswertung

## Prüfungsgrundlage

- Besondere Rechtsvorschrift IHK Region Stuttgart, Fassung 01.09.2024
- Besondere Rechtsvorschrift Handelskammer Bremen, 23.06.2026 (`quellen/`)
