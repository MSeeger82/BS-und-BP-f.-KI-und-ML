# Verlagsunterlagen: Berufsspezialist/in KI und ML – Der Lehrfaden für Einsteiger

Stand: November 2026. Arbeitsdatei für die Veröffentlichung (Amazon KDP o. Ä.). Keine Rechtsberatung – Punkte mit „prüfen“ vor Veröffentlichung klären.

## Metadaten

- **Titel:** Berufsspezialist/in Künstliche Intelligenz und Maschinelles Lernen
- **Untertitel:** Der Lehrfaden für Einsteiger – vom ersten Begriff bis zur bestandenen IHK-Prüfung
- **Autor:** Michael Seeger
- **Sprache:** Deutsch · **Auflage:** 1. Auflage 2026
- **Umfang:** ca. 650 Seiten, Format 17 × 24 cm (6,69 × 9,45 in)
- **Zielgruppe:** Teilnehmende an IHK-Lehrgängen und Selbstlerner ohne Vorkenntnisse, Beschäftigte in Betrieben, die KI einführen
- **Schlagwörter (7):** Künstliche Intelligenz, Maschinelles Lernen, IHK Prüfung, Berufsspezialist, DQR 5, Datenanalyse, KI Weiterbildung
- **Kategorien (Vorschlag):** Informatik/Künstliche Intelligenz; Berufliche Weiterbildung/Prüfungsvorbereitung

## Klappentext
Künstliche Intelligenz verändert Berufe – und die IHK prüft, wer sie versteht. Dieses Buch führt Sie ohne Vorkenntnisse Schritt für Schritt zum Geprüften Berufsspezialisten für KI und Maschinelles Lernen.

Jeder Abschnitt beginnt mit einem Vergleich aus dem Alltag, erklärt den Fachbegriff so, wie er in der Prüfung erwartet wird, und rechnet ein Beispiel Schritt für Schritt vor. Dazu gibt es typische Fehler, Prüfungsfragen mit Punkten und Musterlösungen, Übungen und Quizfragen am Ende jedes Kapitels sowie eine vollständige Probeprüfung.

Von Statistik, Daten, Lernverfahren und neuronalen Netzen über Generative KI und MLOps bis zu Recht, Datenschutz, Wirtschaftlichkeit und Projektarbeit: Das Buch deckt alle Themen der Prüfung ab und zeigt, wie Sie Ihre Transferarbeit planen, präsentieren und im Fachgespräch verteidigen.

Zum Buch gehört der Online-Kurs auf itundx.de mit Rechnern, Animationen und Probeprüfungen.

## Checkliste vor der Veröffentlichung

1. **Impressum ausfüllen** (Seite 2 des Buches, Platzhalter in eckigen Klammern): Name und ladungsfähige Anschrift der Herausgeberin / des Herausgebers, E-Mail oder Telefon. Bei einem gedruckten Buch gilt in Deutschland die Pflicht nach dem jeweiligen Landespressegesetz (Name und Anschrift von Verfasser/Verleger). Ein Postfach reicht dafür in der Regel nicht – **prüfen**, welche Anschrift Sie öffentlich angeben möchten (Gewerbeadresse, Impressumsservice).
2. **ISBN:** Zwei übliche Wege: (a) die kostenlose ISBN der Plattform (bei Amazon KDP; als „Verlag“ erscheint dann die Plattform, die ISBN gehört nicht Ihnen und gilt nur für diesen Vertriebsweg), (b) eigene ISBN aus der ISBN-Agentur für Deutschland (kostenpflichtig, Sie sind Verlag und können überall vertreiben; Preis dort aktuell prüfen). Die ISBN kommt auf die Impressumsseite und wird auf dem Umschlag als Strichcode gedruckt (KDP erzeugt den Strichcode selbst).
3. **Pflichtexemplar:** Gedruckte Veröffentlichungen unterliegen in Deutschland der Ablieferungspflicht an die Deutsche Nationalbibliothek (Frist und Verfahren dort **prüfen**).
4. **Gewerbe und Steuer:** Regelmäßiger Verkauf ist eine gewerbliche/freiberufliche Tätigkeit: Anmeldung, Einkommen- und Umsatzsteuer (Bücher unterliegen in der Regel dem ermäßigten Steuersatz; **mit der Steuerberatung klären**).
5. **Lizenzhinweis:** Der Hinweis auf CC BY 4.0 (Universität Stuttgart, Projekt KI B3) steht im Impressum und im Anhang C. Nicht entfernen. Namensnennung ist die einzige Bedingung der Lizenz; kommerzielle Nutzung ist erlaubt.
6. **Gegenlesen:** Fachliches und sprachliches Lektorat; AI-Act-Fristen, Gebühren der IHK und Steuerangaben auf Aktualität prüfen.
7. **Preis:** Druckkosten bei ca. 650 Seiten sind hoch (Schwarzweiß-Innenteil); die Plattform zeigt den Mindestpreis. Entscheiden, ob ein E-Book/PDF-Download auf itundx.de als günstigere Variante angeboten wird.

## Dateien

| Datei | Zweck |
| --- | --- |
| `Berufsspezialist-KI-ML-Lehrfaden.pdf` | Lese-PDF mit Titelblatt (Gratis-Leseprobe oder Download) |
| `Berufsspezialist-KI-ML-Lehrfaden-Innenteil-Druck.pdf` | Innenteil für den Druck (ohne Titelblatt, 21 mm Rand innen und außen, gerade Seitenzahl) |
| `Berufsspezialist-KI-ML-Lehrfaden-Umschlag-Druck.pdf` | Umschlag mit Rücken für die Seitenzahl des Innenteils (Strichcodefeld rechts unten freigehalten) |

Neu bauen: `node build-buch.mjs` (Lese-PDF), `node build-buch.mjs --print` (Innenteil), `node build-umschlag.mjs <Seitenzahl> [weiss|creme]` (Umschlag; Seitenzahl aus der Ausgabe von `--print`).
