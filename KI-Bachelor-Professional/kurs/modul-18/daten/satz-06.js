/* Bachelor-Prüfungssatz 6 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s06a", satz: 6, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Anwendungsfelder", text: "",
        teile: [
          w("a", "a) Welche Aufgabe gehört zu Computer Vision?", 2, ["Kratzer auf Bauteilen in Kamerabildern erkennen", "Kundenmails beantworten", "Umsatz prognostizieren", "Texte übersetzen"], 0),
          t("b", "b) Unterscheiden Sie Bildklassifikation, Objekterkennung und Segmentierung.", 4, "Klassifikation: ein Label je Bild (1 P.); Objekterkennung: Objekte mit Klasse und Begrenzungsrahmen (1,5 P.); Segmentierung: Klasse je Pixel, genaue Umrisse (1,5 P.)."),
          w("c", "c) Was bedeutet Edge-KI?", 2, ["das Modell läuft direkt am Gerät oder an der Maschine statt in der Cloud", "KI am Bildrand", "nur Training in der Cloud", "KI ohne Strom"], 0),
          w("d", "d) Welche Aufgabe gehört zur Verarbeitung natürlicher Sprache?", 2, ["Wartungsberichte automatisch zusammenfassen", "Bauteile vermessen", "Roboter steuern", "Lager optimieren"], 0)
        ],
        loesung: "<p>a) Kratzererkennung · b) Label je Bild, Rahmen je Objekt, Klasse je Pixel · c) Ausführung vor Ort · d) Berichte zusammenfassen.</p>" },

      { titel: "Bilddaten", text: "<p>Ein Farbbild hat 224 × 224 Pixel mit drei Kanälen (RGB), je 1 Byte pro Wert.</p>",
        teile: [
          z("a", "a) Anzahl der Werte", 2, 150528, 0),
          z("b", "b) Speicherbedarf in KB (1 KB = 1.024 Byte, auf ganze KB)", 2, 147, 0.5, "KB"),
          t("c", "c) Warum ist die Qualität der Labels bei Bilddaten entscheidend, und wie sichern Sie sie?", 4, "Fehlerhafte Labels lernt das Modell mit (2 P.); klare Labelrichtlinien, Mehrfach-Labeling mit Abgleich, Stichprobenprüfung durch Experten (2 P.)."),
          w("d", "d) Was prüfen Sie vor dem Training zuerst?", 2, ["die Verteilung der Klassen (z. B. Anteil defekter Teile)", "die Bildschirmauflösung", "die Dateinamen", "die Farbe des Logos"], 0)
        ],
        loesung: "<p>a) 224 · 224 · 3 = <b>150.528</b> · b) 150.528 / 1.024 ≈ <b>147 KB</b> · c) Richtlinien, Mehrfachlabeling, Stichproben · d) Klassenverteilung.</p>" },

      { titel: "Qualitätsregelkarte", text: "<p>Durchmesser von fünf Bauteilen in mm: <b>10,0 · 10,2 · 9,8 · 10,1 · 9,9</b>.</p>",
        teile: [
          z("a", "a) Mittelwert", 2, 10, 0.001, "mm"),
          z("b", "b) Standardabweichung (Division durch n, vier Nachkommastellen)", 3, 0.1414, 0.002, "mm"),
          z("c", "c) Obere Eingriffsgrenze bei ±3σ (drei Nachkommastellen)", 2, 10.424, 0.005, "mm"),
          w("d", "d) Ein Teil misst 10,5 mm. Wie bewerten Sie das?", 2, ["außerhalb der Eingriffsgrenze – eingreifen und Ursache suchen", "unauffällig", "unter dem Mittel", "nicht bewertbar"], 0),
          t("e", "e) Was zeigt eine Regelkarte, auch wenn alle Punkte innerhalb der Grenzen liegen?", 3, "Muster wie Trends oder Läufe auf einer Seite des Mittelwerts deuten auf systematische Ursachen hin (2 P.); Prozessstabilität beurteilen (1 P.).")
        ],
        loesung: "<p>a) <b>10,0</b> · b) Varianz (0 + 0,04 + 0,04 + 0,01 + 0,01) / 5 = 0,02; √0,02 ≈ <b>0,1414</b> · c) 10,0 + 3 · 0,1414 ≈ <b>10,424</b> · d) außerhalb – eingreifen · e) Trends und Läufe.</p>" },

      { titel: "Mehrklassen-Konfusionsmatrix", text: "<div class=\"table-wrap\"><table><thead><tr><th>tatsächlich ↓ / vorhergesagt →</th><th>ok</th><th>Kratzer</th><th>Riss</th></tr></thead><tbody><tr><th>ok</th><td>180</td><td>15</td><td>5</td></tr><tr><th>Kratzer</th><td>10</td><td>70</td><td>0</td></tr><tr><th>Riss</th><td>5</td><td>5</td><td>10</td></tr></tbody></table></div><p>Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Accuracy", 3, 86.67, 0.1, "%"),
          z("b", "b) Recall der Klasse Riss", 3, 50, 0.1, "%"),
          z("c", "c) Precision der Klasse Kratzer", 3, 77.78, 0.1, "%"),
          w("d", "d) Was ist ein Makro-Durchschnitt?", 3, ["Mittelwert der Kennzahl über alle Klassen, jede Klasse gleich gewichtet", "Kennzahl der größten Klasse", "gewichteter Mittelwert nach Klassengröße", "Summe aller Fehler"], 0)
        ],
        loesung: "<p>a) (180 + 70 + 10) / 300 ≈ <b>86,67 %</b> · b) 10 / 20 = <b>50 %</b> · c) 70 / 90 ≈ <b>77,78 %</b> · d) gleich gewichteter Klassenmittelwert.</p>" },

      { titel: "Fehlerkosten", text: "<p>Ein Riss, der als „ok“ durchgeht, kostet beim Kunden 1.000 €. Ein ok-Teil, das als fehlerhaft aussortiert wird, kostet 20 €. Verwenden Sie die Matrix aus Aufgabe 4.</p>",
        teile: [
          w("a", "a) Welche Kennzahl ist für die Klasse Riss am wichtigsten?", 2, ["Recall", "Precision", "Accuracy", "Spezifität der Klasse ok"], 0),
          t("b", "b) Wie können Sie den Recall für Risse erhöhen, ohne das Modell neu zu trainieren?", 4, "Schwellenwert für die Klasse Riss senken bzw. Teile mit erhöhter Riss-Wahrscheinlichkeit zur Nachprüfung (2 P.); Folge: mehr Fehlalarme, Kosten abwägen (2 P.)."),
          z("c", "c) Fehlerkosten aus übersehenen Rissen (als ok erkannt) und aussortierten ok-Teilen", 4, 5400, 0, "€")
        ],
        loesung: "<p>a) Recall · b) Schwelle senken, Nachprüfung · c) 5 · 1.000 + (15 + 5) · 20 = <b>5.400 €</b>.</p>" },

      { titel: "Mathematische Grundlagen", text: "",
        teile: [
          z("a", "a) Skalarprodukt von w = (0,2; −0,5; 1) und x = (10; 4; 3)", 3, 3, 0.001),
          z("b", "b) Länge des Vektors (3; 4)", 2, 5, 0.001),
          z("c", "c) Erste Komponente von [[1, 2], [0, 1]] · (3; 1)", 3, 5, 0),
          z("d", "d) Ableitung von f(x) = x² an der Stelle x = 3", 2, 6, 0)
        ],
        loesung: "<p>a) 2 − 2 + 3 = <b>3</b> · b) √(9 + 16) = <b>5</b> · c) 1 · 3 + 2 · 1 = <b>5</b> · d) f′(x) = 2x → <b>6</b>.</p>" },

      { titel: "Python", text: "<pre class=\"code\">werte = [0.91, 0.42, 0.77, 0.15, 0.66]\nlabels = [\"defekt\" if p &gt;= 0.5 else \"ok\" for p in werte]\nprint(labels.count(\"defekt\"))\nprint(labels[1])\nprint(round(sum(werte[:3]), 2))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 3, 0),
          w("b", "b) Zweite Ausgabe", 3, ["ok", "defekt", "0.42", "Fehler"], 0),
          z("c", "c) Dritte Ausgabe", 2, 2.1, 0.001),
          w("d", "d) Was liefert werte[:3]?", 2, ["die ersten drei Elemente", "das dritte Element", "die letzten drei Elemente", "alle außer dem dritten"], 0)
        ],
        loesung: "<p>a) 0,91; 0,77; 0,66 → <b>3</b> · b) <b>ok</b> · c) 0,91 + 0,42 + 0,77 = <b>2,1</b> · d) erste drei.</p>" },

      { titel: "Informationssicherheit", text: "",
        teile: [
          w("a", "a) Welche drei Schutzziele gelten klassisch?", 2, ["Vertraulichkeit, Integrität, Verfügbarkeit", "Schnelligkeit, Preis, Design", "Genauigkeit, Recall, Precision", "Planung, Steuerung, Kontrolle"], 0),
          t("b", "b) Nennen Sie zwei Maßnahmen gegen die Manipulation von Kamerabildern oder Modellen an der Produktionslinie.", 4, "Je 2 P.: Netzwerksegmentierung, Zugriffsschutz, signierte Modelldateien/Integritätsprüfung, Protokollierung, physischer Schutz der Kamera, Plausibilitätsprüfungen."),
          w("c", "c) Welche Norm beschreibt ein zertifizierbares Informationssicherheits-Managementsystem?", 2, ["ISO/IEC 27001", "ISO 9001", "ISO 14001", "ISO 56002"], 0),
          w("d", "d) Welche EU-Regel verpflichtet wichtige Einrichtungen zu Cybersicherheitsmaßnahmen und Vorfallmeldungen?", 2, ["NIS-2-Richtlinie", "DSGVO Art. 9", "Data Act", "Produkthaftungsrichtlinie"], 0),
          w("e", "e) Wofür sorgen Backups vor allem?", 2, ["Verfügbarkeit", "Vertraulichkeit", "Anonymität", "Fairness"], 0)
        ],
        loesung: "<p>a) Vertraulichkeit, Integrität, Verfügbarkeit · b) Segmentierung, Signaturen, Zugriffsschutz · c) ISO/IEC 27001 · d) NIS-2 · e) Verfügbarkeit.</p>" },

      { titel: "Recht in der Produktion", text: "",
        teile: [
          w("a", "a) KI als Sicherheitsbauteil einer Maschine ist …", 2, ["Hochrisiko über Anhang I (Produktrecht)", "minimales Risiko", "verboten", "nur transparenzpflichtig"], 0),
          w("b", "b) Eine KI zur optischen Qualitätsprüfung ohne Sicherheitsfunktion ist in der Regel …", 2, ["minimales Risiko", "Hochrisiko", "verboten", "GPAI mit systemischem Risiko"], 0),
          t("c", "c) Die Prüfkamera erfasst auch Hände und Gesichter der Beschäftigten. Was ist zu beachten?", 4, "DSGVO: personenbezogene Daten, Datenminimierung – Bildausschnitt begrenzen, verpixeln (2 P.); Mitbestimmung § 87 Abs. 1 Nr. 6 BetrVG, Betriebsvereinbarung (2 P.)."),
          w("d", "d) Ein neues KI-Verfahren zur Risserkennung mit technischem Effekt kann geschützt werden als …", 2, ["Patent (computerimplementierte Erfindung)", "Marke", "Urheberrecht am Algorithmus als solchem", "gar nicht"], 0),
          w("e", "e) Trainierte Modellgewichte sind als Geschäftsgeheimnis nur geschützt, wenn …", 2, ["angemessene Geheimhaltungsmaßnahmen getroffen wurden", "sie veröffentlicht werden", "sie größer als 1 GB sind", "sie verschlüsselt verkauft werden"], 0),
          w("f", "f) Was ändert die neue EU-Produkthaftungsrichtlinie?", 2, ["Software einschließlich KI gilt ausdrücklich als Produkt", "Haftung für Software entfällt", "nur Lebensmittel sind betroffen", "nichts"], 0)
        ],
        loesung: "<p>a) Hochrisiko über Anhang I · b) minimales Risiko · c) Datenminimierung, Betriebsrat · d) Patent · e) angemessene Geheimhaltung · f) Software ist Produkt.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s06b", satz: 6, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "CNN-Architektur", text: "<p>Graustufenbild 64 × 64 × 1. Schicht 1: 8 Filter 5 × 5, Schrittweite 1, Padding 2. Danach Max-Pooling 2 × 2 (Schrittweite 2). Schicht 2: 16 Filter 3 × 3, kein Padding.</p>",
        teile: [
          z("a", "a) Breite nach Schicht 1", 3, 64, 0),
          z("b", "b) Parameter der Schicht 1 (mit Bias)", 3, 208, 0),
          z("c", "c) Breite nach dem Pooling", 2, 32, 0),
          z("d", "d) Parameter der Schicht 2 (mit Bias)", 3, 1168, 0),
          t("e", "e) Warum stapelt man mehrere kleine Faltungsschichten?", 3, "Rezeptives Feld wächst mit jeder Schicht (1 P.); hierarchische Merkmale von Kanten zu Formen (1 P.); weniger Parameter als große Filter (1 P.).")
        ],
        loesung: "<p>a) (64 − 5 + 2 · 2) / 1 + 1 = <b>64</b> · b) (5 · 5 · 1 + 1) · 8 = <b>208</b> · c) <b>32</b> · d) (3 · 3 · 8 + 1) · 16 = <b>1.168</b> · e) wachsendes rezeptives Feld, Hierarchie, weniger Parameter.</p>" },

      { titel: "Objekterkennung", text: "<p>Vorhergesagter Rahmen A von (0; 0) bis (4; 4), tatsächlicher Rahmen B von (2; 2) bis (6; 6).</p>",
        teile: [
          z("a", "a) Intersection over Union (IoU, vier Nachkommastellen)", 4, 0.1429, 0.005),
          w("b", "b) Gilt die Erkennung bei einer IoU-Schwelle von 0,5 als Treffer?", 2, ["nein", "ja"], 0),
          t("c", "c) Wozu dienen Non-Maximum Suppression und mAP?", 4, "NMS: entfernt überlappende Mehrfachrahmen desselben Objekts, behält den sichersten (2 P.); mAP: mittlere Präzision über Klassen und Schwellen als Gütemaß (2 P.)."),
          w("d", "d) Was kennzeichnet einen einstufigen Detektor wie YOLO?", 2, ["Rahmen und Klassen in einem Durchlauf, sehr schnell", "zwei getrennte Netze für Regionen und Klassen", "kein neuronales Netz", "nur Segmentierung"], 0)
        ],
        loesung: "<p>a) Schnitt 2 · 2 = 4; Vereinigung 16 + 16 − 4 = 28; IoU = 4 / 28 ≈ <b>0,1429</b> · b) nein · c) Mehrfachrahmen entfernen; Gütemaß · d) ein Durchlauf.</p>" },

      { titel: "Anomalieerkennung bei Bildern", text: "<p>Es gibt 50.000 Bilder fehlerfreier Teile, aber nur 80 Bilder mit Defekten.</p>",
        teile: [
          t("a", "a) Warum eignet sich hier ein Autoencoder, der nur auf fehlerfreien Teilen trainiert wird?", 4, "Er lernt, normale Teile gut zu rekonstruieren (2 P.); unbekannte Defekte führen zu hohem Rekonstruktionsfehler, keine großen Defektdatensätze nötig (2 P.)."),
          w("b", "b) Wie legen Sie die Schwelle für „Anomalie“ fest?", 2, ["über die Verteilung des Rekonstruktionsfehlers auf Validierungsdaten, z. B. ein hohes Perzentil", "zufällig", "immer bei 0,5", "nach der Bildgröße"], 0),
          t("c", "c) Wie bewerten Sie das Verfahren trotz weniger Defektbilder?", 4, "Die 80 Defektbilder nur zum Testen nutzen (Recall) (2 P.); Fehlalarmrate auf normalen Teilen messen, Ergebnisse mit Prüfern nachkontrollieren (2 P.).")
        ],
        loesung: "<p>a) Normalität lernen, Abweichung erkennen · b) Perzentil des Fehlers · c) Defektbilder als Testmenge, Fehlalarmrate, Prüferabgleich.</p>" },

      { titel: "Trainingsdetails", text: "",
        teile: [
          z("a", "a) 12.000 Trainingsbilder, Batchgröße 64. Wie viele Schritte hat eine Epoche (aufgerundet)?", 3, 188, 0),
          w("b", "b) Was bewirkt Batch Normalization?", 2, ["normiert Zwischenwerte je Batch, stabilisiert und beschleunigt das Training", "löscht Ausreißer", "erhöht die Bildauflösung", "ersetzt die Aktivierungsfunktion"], 0),
          t("c", "c) Warum senkt man die Lernrate im Verlauf des Trainings (Lernraten-Schedule)?", 3, "Anfangs große Schritte für schnelle Annäherung (1 P.), später kleine Schritte für feine Konvergenz ohne Springen (2 P.)."),
          w("d", "d) Was bedeutet „Patience = 5“ beim Early Stopping?", 2, ["Abbruch, wenn sich der Validierungswert 5 Epochen lang nicht verbessert", "5 Minuten warten", "5 Neuronen deaktivieren", "Lernrate 5"], 0),
          w("e", "e) Was ist Adam?", 2, ["ein Optimierungsverfahren mit adaptiven Lernraten", "eine Aktivierungsfunktion", "ein Datensatz", "ein Clusterverfahren"], 0)
        ],
        loesung: "<p>a) 12.000 / 64 = 187,5 → <b>188</b> · b) Normierung je Batch · c) grob, dann fein · d) 5 Epochen ohne Verbesserung · e) Optimierer.</p>" },

      { titel: "Betrieb an der Maschine", text: "",
        teile: [
          t("a", "a) Was ist Quantisierung, und warum nutzt man sie auf Edge-Geräten?", 4, "Gewichte mit geringerer Genauigkeit speichern, z. B. 8-Bit statt 32-Bit (2 P.); weniger Speicher, schnellere Inferenz, geringerer Energiebedarf bei kleinem Genauigkeitsverlust (2 P.)."),
          z("b", "b) Ein Modell mit 25 Mio. Parametern zu je 4 Byte wird auf 1 Byte quantisiert. Größe danach in MB (1 MB = 10⁶ Byte)", 2, 25, 0, "MB"),
          w("c", "c) Wann ist die Inferenz an der Maschine statt in der Cloud besonders sinnvoll?", 2, ["bei harter Echtzeit und unsicherer Netzverbindung", "bei monatlichen Berichten", "bei sehr seltenen Abfragen", "nie"], 0),
          w("d", "d) Was ist Pruning?", 2, ["unwichtige Gewichte oder Neuronen entfernen, um das Modell zu verkleinern", "Daten bereinigen", "Labels prüfen", "Server abschalten"], 0)
        ],
        loesung: "<p>a) geringere Bitbreite, kleiner und schneller · b) 25 Mio. · 1 Byte = <b>25 MB</b> (vorher 100 MB) · c) Echtzeit, unsichere Verbindung · d) Verkleinern durch Entfernen.</p>" },

      { titel: "Robustheit in der Produktion", text: "",
        teile: [
          t("a", "a) Nach dem Tausch der Hallenbeleuchtung steigen die Fehlalarme. Erklären Sie die Ursache und zwei Gegenmaßnahmen.", 4, "Data Drift: andere Helligkeit/Farbe als im Training (2 P.); Beleuchtung standardisieren/abschirmen, Augmentation mit Helligkeitsvariation, Nachtraining mit neuen Bildern (2 P.)."),
          w("b", "b) Was ist ein Domain Shift?", 2, ["Training und Einsatz stammen aus unterschiedlichen Bedingungen", "ein Wechsel des Webservers", "ein neuer Domainname", "ein Wechsel der Programmiersprache"], 0),
          t("c", "c) Wie überwachen Sie ein Modell, wenn die echten Labels erst später vorliegen?", 4, "Verteilung der vorhergesagten Klassen und Konfidenzen beobachten (2 P.); Eingangsstatistiken (Helligkeit), Stichproben durch Prüfer, Alarme bei Abweichungen (2 P.).")
        ],
        loesung: "<p>a) Drift durch Beleuchtung; Beleuchtung standardisieren, Augmentation, Nachtraining · b) andere Einsatzbedingungen · c) Vorhersageverteilung, Eingangsstatistik, Stichproben.</p>" },

      { titel: "Erklärbarkeit", text: "",
        teile: [
          w("a", "a) Welches Verfahren zeigt eine Heatmap der für die Klasse relevanten Bildbereiche?", 2, ["Grad-CAM", "TF-IDF", "k-Means", "ARIMA"], 0),
          t("b", "b) Was ist der Clever-Hans-Effekt, und wie decken Sie ihn auf?", 4, "Modell nutzt Scheinmerkmale, z. B. Markierung oder Hintergrund statt Defekt (2 P.); Erklärungen/Heatmaps prüfen, Tests mit veränderten Hintergründen (2 P.)."),
          w("c", "c) Was ist eine Saliency Map?", 2, ["Darstellung, wie stark jedes Pixel die Ausgabe beeinflusst", "eine Landkarte", "ein Netzplan", "eine Konfusionsmatrix"], 0)
        ],
        loesung: "<p>a) Grad-CAM · b) Scheinmerkmale; Heatmaps und Gegentests · c) Pixel-Einflusskarte.</p>" },

      { titel: "Faltung von Hand", text: "<p>Eingabe 3 × 3: [[1, 2, 0], [0, 1, 3], [2, 1, 0]]. Kern 2 × 2: [[1, 0], [0, −1]]. Schrittweite 1, kein Padding (Kreuzkorrelation wie in CNN üblich).</p>",
        teile: [
          z("a", "a) Ausgabewert oben links", 3, 0, 0),
          z("b", "b) Ausgabewert oben rechts", 3, -1, 0),
          z("c", "c) Summe aller Ausgabewerte nach ReLU", 3, 1, 0),
          w("d", "d) Welche Formel gibt die Ausgabebreite an?", 3, ["(Eingabebreite − Kernbreite + 2 · Padding) / Schrittweite + 1", "Eingabebreite · Kernbreite", "Eingabebreite + Kernbreite", "Kernbreite / Schrittweite"], 0)
        ],
        loesung: "<p>Ausgabe 2 × 2: oben links 1 · 1 + 1 · (−1) = <b>0</b>; oben rechts 2 · 1 + 3 · (−1) = <b>−1</b>; unten links 0 · 1 + 1 · (−1) = −1; unten rechts 1 · 1 + 0 · (−1) = 1. c) Nach ReLU 0 + 0 + 0 + 1 = <b>1</b> · d) (W − K + 2P) / S + 1.</p>" },

      { titel: "MLOps in der Fertigung", text: "",
        teile: [
          t("a", "a) Beschreiben Sie eine Datenpipeline für kontinuierliche Verbesserung.", 4, "Bilder und Vorhersagen speichern (1 P.); unsichere/strittige Fälle durch Prüfer labeln (1 P.); Datensatz versionieren, Nachtraining (1 P.); Test gegen aktuelles Modell, Freigabe, Rollout (1 P.)."),
          w("b", "b) Was bedeutet Human-in-the-Loop hier?", 2, ["Prüfer bewerten unsichere Fälle und liefern Labels zurück", "ein Mensch startet den Server", "kein Mensch beteiligt", "Kunden labeln Bilder"], 0),
          t("c", "c) Wie testen Sie ein neues Modell an der laufenden Linie risikoarm?", 4, "Schattenbetrieb parallel zum alten Modell (2 P.); Vergleich der Entscheidungen und Kennzahlen, schrittweise Umschaltung, Rollback-Plan (2 P.)."),
          w("d", "d) Wozu dient eine Modellregistrierung?", 2, ["Versionen, Metadaten und Freigaben von Modellen verwalten", "Rechnungen buchen", "Mitarbeitende registrieren", "Daten löschen"], 0)
        ],
        loesung: "<p>a) speichern, labeln, versionieren, nachtrainieren, testen, ausrollen · b) Prüfer liefern Labels · c) Schattenbetrieb, Vergleich, schrittweise Umschaltung · d) Versionsverwaltung.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s06t2", satz: 6, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – Optische KI-Prüfung in der Teilefertigung", kurz: "Automobilzulieferer · Qualitätsprüfung", minuten: 240,
    situation: "<p>Die <b>Präzisionsteile Müller GmbH &amp; Co. KG</b> (650 Beschäftigte, Betriebsrat, Dreischichtbetrieb) fertigt jährlich 1,2 Mio. Gehäuseteile für die Automobilindustrie. 2 % der Teile haben Oberflächenfehler. Sechs Prüfkräfte prüfen heute per Sichtkontrolle und erkennen 85 % der fehlerhaften Teile; die übrigen gehen als Reklamation zum Kunden.</p><p>Geplant ist eine optische KI-Prüfung direkt an der Linie mit Kamera, Beleuchtung und Edge-Rechner. Die Taktzeit beträgt 2 Sekunden je Teil. Der Kunde verlangt im Audit einen Nachweis der Prüfqualität. Sie leiten das Projekt.</p>",
    aufgaben: [
      { titel: "Prüfsystem konzipieren", text: "",
        teile: [
          t("a", "a) Beschreiben Sie das Konzept der KI-Prüfung (Hardware, Modell, Ablauf, Anbindung).", 6, "Kamera und Beleuchtung standardisiert (1 P.); Edge-Rechner für Inferenz im Takt (1 P.); Modell: CNN-Klassifikation/Objekterkennung bzw. Anomalieerkennung bei wenigen Defekten (2 P.); Ausschleusung fehlerhafter Teile, unsichere Fälle zur Nachprüfung (1 P.); Speicherung von Bildern/Ergebnissen für Nachweis und Nachtraining (1 P.)."),
          w("b", "b) Bildaufnahme 300 ms, Inferenz 120 ms. Reicht das für die Taktzeit?", 2, ["ja", "nein"], 0),
          z("c", "c) Test mit 2.000 Teilen (100 fehlerhaft): 96 Fehler erkannt, 30 Fehlalarme. Recall in %", 2, 96, 0.1, "%"),
          z("d", "d) Precision in % (zwei Nachkommastellen)", 2, 76.19, 0.1, "%"),
          t("e", "e) Wie gewinnen Sie verlässliche Labels für das Training?", 4, "Erfahrene Prüfkräfte labeln nach einheitlicher Fehlerklassen-Richtlinie (2 P.); strittige Fälle im Vier-Augen-Prinzip, Grenzmuster/Referenzkatalog, Stichprobenkontrolle (2 P.).")
        ],
        loesung: "<p>a) Kamera und Beleuchtung, Edge-Inferenz, CNN bzw. Anomalieerkennung, Ausschleusung und Nachprüfung, Speicherung für Nachweis.</p><p>b) 420 ms &lt; 2 s → ja · c) 96 / 100 = <b>96 %</b> · d) 96 / 126 ≈ <b>76,19 %</b> · e) Richtlinie, Vier-Augen-Prinzip, Grenzmusterkatalog.</p>" },

      { titel: "Prozess und Qualität", text: "",
        teile: [
          z("a", "a) Wie viele fehlerhafte Teile gehen heute pro Jahr zum Kunden?", 3, 3600, 0),
          z("b", "b) Wie viele wären es bei einem Recall von 96 %?", 3, 960, 0),
          t("c", "c) Beschreiben Sie den Soll-Prozess an der Linie mit Nachprüfung.", 4, "Bildaufnahme und KI-Bewertung im Takt (1 P.); ok → weiter; fehlerhaft → Ausschleusung (1 P.); unsicher → Nachprüfstation mit Prüfkraft (1 P.); Ergebnis zurück ins Labeling, Kennzahlen ins Qualitätsdashboard (1 P.)."),
          t("d", "d) Nennen Sie zwei Kennzahlen mit Zielwert.", 4, "Je 2 P.: Schlupf/ppm beim Kunden, Recall, Fehlalarmrate, Nachprüfquote, Reklamationskosten, Durchsatz.")
        ],
        loesung: "<p>Fehlerhafte Teile: 1,2 Mio. · 2 % = 24.000. a) 15 % übersehen → <b>3.600</b> · b) 4 % übersehen → <b>960</b> · c) KI-Bewertung, Ausschleusung, Nachprüfstation, Rückmeldung · d) z. B. Schlupf unter 1.000 ppm, Fehlalarmrate unter 2 %.</p>" },

      { titel: "Projekt", text: "<p>Vorgänge (Wochen, Vorgänger): A Lastenheft 2 (–) · B Kamera beschaffen 3 (A) · C Bilddaten sammeln und labeln 4 (A) · D Modell trainieren und integrieren 2 (B, C) · E Abnahme 1 (D).</p>",
        teile: [
          t("a", "a) Unterscheiden Sie Lastenheft und Pflichtenheft.", 4, "Lastenheft: Anforderungen des Auftraggebers – was und wofür (2 P.); Pflichtenheft: Umsetzungskonzept des Auftragnehmers – wie (2 P.)."),
          z("b", "b) Projektdauer in Wochen", 3, 9, 0),
          w("c", "c) Kritischer Pfad", 3, ["A–C–D–E", "A–B–D–E", "A–B–C–E", "A–D–E"], 0),
          z("d", "d) Gesamtpuffer von B", 2, 1, 0),
          t("e", "e) Die Lieferzeit der Kamera ist unsicher. Was tun Sie?", 2, "Früh bestellen, Alternativlieferant, Puffer nutzen, Lieferung vertraglich absichern (2 P.).")
        ],
        loesung: "<p>a) Was (Auftraggeber) vs. Wie (Auftragnehmer) · b) A 0–2, B 2–5, C 2–6, D 6–8, E 8–9 → <b>9</b> · c) <b>A–C–D–E</b> · d) B: SAZ 3 − FAZ 2 = <b>1</b> · e) früh bestellen, Alternative.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Wie ist die KI-Prüfung ohne Sicherheitsfunktion nach der KI-Verordnung einzustufen?", 2, ["minimales Risiko – Hochrisiko erst, wenn sie Sicherheitsbauteil eines Produkts nach Anhang I ist", "immer Hochrisiko", "verboten", "nur transparenzpflichtig"], 0),
          t("b", "b) Die Kamera erfasst auch Hände und Gesichter von Beschäftigten. Welche rechtlichen Anforderungen ergeben sich, und wie lösen Sie das technisch?", 6, "DSGVO: personenbezogene Daten, Rechtsgrundlage, Datenminimierung (2 P.); Mitbestimmung § 87 Abs. 1 Nr. 6 BetrVG, Betriebsvereinbarung (2 P.); technisch: Bildausschnitt auf Teil begrenzen, Personen ausblenden/verpixeln, kurze Speicherfristen, keine Leistungsauswertung (2 P.)."),
          w("c", "c) Wer haftet in einer GmbH &amp; Co. KG unbeschränkt?", 2, ["die Komplementär-GmbH mit ihrem Gesellschaftsvermögen", "alle Kommanditisten persönlich", "die Beschäftigten", "niemand"], 0),
          w("d", "d) Der Systemintegrator soll das Prüfsystem betriebsbereit mit vereinbarter Erkennungsquote übergeben. Vertragsart?", 2, ["Werkvertrag mit Abnahme", "Dienstvertrag", "Mietvertrag", "Leasingvertrag"], 0),
          t("e", "e) Ein übersehenes fehlerhaftes Teil führt beim Kunden zu einem Rückruf. Wie ist die Haftungslage?", 4, "Müller haftet gegenüber dem Kunden aus Vertrag/Qualitätssicherungsvereinbarung und ggf. Produkthaftung (2 P.); KI entlastet nicht; Regress gegen Integrator nur bei Mangel; Nachweis der Prüfqualität und Dokumentation wichtig (2 P.).")
        ],
        loesung: "<p>a) minimales Risiko · b) Datenminimierung, Betriebsrat, technische Ausblendung · c) Komplementär-GmbH · d) Werkvertrag · e) Müller haftet gegenüber dem Kunden; Dokumentation und Qualitätsvereinbarung entscheidend.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Eine Reklamation kostet 150 € je fehlerhaftem Teil beim Kunden. Künftig werden nur noch 2 statt 6 Prüfkräfte benötigt (je 48.000 € pro Jahr). Laufende Kosten 60.000 € pro Jahr, Investition 450.000 €, Nutzungsdauer 5 Jahre, Zins 7 % (Rentenbarwertfaktor 4,1002).</p>",
        teile: [
          z("a", "a) Einsparung an Reklamationskosten pro Jahr", 3, 396000, 0, "€"),
          z("b", "b) Einsparung an Personalkosten pro Jahr", 2, 192000, 0, "€"),
          z("c", "c) Jährlicher Rückfluss", 2, 528000, 0, "€"),
          z("d", "d) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 2, 0.85, 0.01, "Jahre"),
          z("e", "e) Kapitalwert", 4, 1714906, 20, "€"),
          t("f", "f) Kauf oder Leasing des Kamerasystems? Nennen Sie je ein Argument.", 3, "Kauf: günstiger über die Laufzeit, Eigentum (1,5 P.); Leasing: schont Liquidität, Technikwechsel leichter (1,5 P.).")
        ],
        loesung: "<p>a) (3.600 − 960) · 150 = <b>396.000 €</b> · b) 4 · 48.000 = <b>192.000 €</b> · c) 396.000 + 192.000 − 60.000 = <b>528.000 €</b> · d) 450.000 / 528.000 ≈ <b>0,85 Jahre</b> · e) 528.000 · 4,1002 − 450.000 ≈ <b>1.714.906 €</b> · f) Kauf günstiger, Leasing liquiditätsschonend.</p>" },

      { titel: "Personal und Arbeitsrecht", text: "<p>Von den sechs Prüfkräften geht eine in Rente; benötigt werden künftig zwei.</p>",
        teile: [
          z("a", "a) Nettopersonalbedarf (negativ = Überdeckung)", 2, -3, 0),
          t("b", "b) Welche neuen Aufgaben können die übrigen Prüfkräfte übernehmen? Wie qualifizieren Sie sie?", 4, "Aufgaben: Nachprüfstation, Labeling und Grenzmusterpflege, Anlagenbetreuung/Bedienung der KI-Prüfung (2 P.); Qualifizierung: Schulung, Einarbeitung durch Integrator, Key-User-Rolle (2 P.)."),
          w("c", "c) Was gilt, wenn die Einführung eine Betriebsänderung darstellt?", 2, ["Interessenausgleich ist zu versuchen, ein Sozialplan kann über die Einigungsstelle erzwungen werden", "der Betriebsrat hat keine Rechte", "Kündigungen sind sofort ohne Anhörung möglich", "nur die Gewerkschaft entscheidet"], 0),
          w("d", "d) Eine Schicht endet um 22 Uhr. Wann darf die nächste frühestens beginnen?", 2, ["um 9 Uhr", "um 6 Uhr", "um 7 Uhr", "um 8 Uhr"], 0),
          w("e", "e) Welche Pflicht hat der Arbeitgeber beim neuen Arbeitsplatz an der Nachprüfstation?", 2, ["Gefährdungsbeurteilung einschließlich psychischer Belastung", "keine", "nur Gehaltserhöhung", "Kameraüberwachung der Beschäftigten"], 0)
        ],
        loesung: "<p>a) 2 − (6 − 1 + 0) = <b>−3</b> · b) Nachprüfung, Labeling, Anlagenbetreuung; Schulung · c) Interessenausgleich und Sozialplan · d) 11 h Ruhezeit → 9 Uhr · e) Gefährdungsbeurteilung.</p>" },

      { titel: "Problemlösen und Kommunikation", text: "<p>Drei Monate nach dem Start steigt die Fehlalarmrate in der Nachtschicht deutlich.</p>",
        teile: [
          t("a", "a) Sammeln Sie mögliche Ursachen in einem Ishikawa-Diagramm (mindestens vier Kategorien).", 4, "Je 1 P.: Mensch (andere Bediener, Reinigung), Maschine (Kamera verschmutzt, Erwärmung), Methode (andere Rüstabläufe), Material (anderer Lieferant/Oberfläche), Mitwelt (Licht/Tageslicht, Temperatur), Messung (Kalibrierung)."),
          t("b", "b) Der Kunde kommt zum Audit. Wie präsentieren Sie die Prüfqualität überzeugend?", 4, "Kernaussage mit Kennzahlen (Recall, Schlupf) (1 P.); Validierungsmethode und Testdaten (1 P.); Prozess mit Nachprüfung und Rückverfolgbarkeit (1 P.); Grenzen und Maßnahmen offen benennen (1 P.)."),
          w("c", "c) Eine Kollegin kennt die Kameratechnik am besten und bringt tiefes Fachwissen ein. Belbin-Rolle?", 2, ["Spezialist", "Koordinator", "Teamarbeiter", "Macher"], 0),
          w("d", "d) Ein erfahrener, motivierter Schichtleiter soll die Nachprüfung eigenständig organisieren. Welcher Führungsstil passt?", 2, ["delegieren", "unterweisen", "verkaufen", "autoritär"], 0)
        ],
        loesung: "<p>a) z. B. Mitwelt (Licht), Maschine (Verschmutzung), Material (neuer Lieferant), Methode (Reinigung) · b) Kennzahlen, Methode, Prozess, Grenzen · c) Spezialist · d) delegieren.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
