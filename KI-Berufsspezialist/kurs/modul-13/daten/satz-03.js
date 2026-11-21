/* Prüfungssatz 3 */
(function (z, w, t) {
  var CR = ["Business Understanding", "Data Understanding", "Data Preparation", "Modeling", "Evaluation", "Deployment"];
  var CH = ["Histogramm", "Streudiagramm", "Liniendiagramm", "Balkendiagramm"];
  window.PRUEFUNGEN.push({
    id: "s03t1", satz: 3, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Vorgehensmodell CRISP-DM", text: "<p>Ordnen Sie jede Tätigkeit der passenden CRISP-DM-Phase zu.</p>",
        teile: [
          w("a", "1) Mit der Fachabteilung ein messbares Projektziel festlegen", 2, CR, 0),
          w("b", "2) Häufigkeitsverteilungen und fehlende Werte erstmals sichten", 2, CR, 1),
          w("c", "3) Merkmale skalieren und kategoriale Werte kodieren", 2, CR, 2),
          w("d", "4) Prüfen, ob das Modell das Geschäftsziel aus Phase 1 erfüllt", 2, CR, 4),
          w("e", "5) Das Modell als Schnittstelle bereitstellen und überwachen", 2, CR, 5)
        ],
        loesung: "<p>1) Business Understanding · 2) Data Understanding · 3) Data Preparation · 4) Evaluation · 5) Deployment. (Modeling: Verfahren wählen und trainieren.)</p>" },

      { titel: "Wahrscheinlichkeit", text: "<p>2 % aller Bauteile sind defekt. Eine Prüfanlage erkennt 95 % der defekten Teile. Bei einwandfreien Teilen schlägt sie in 5 % der Fälle fälschlich Alarm. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Wahrscheinlichkeit, dass bei einem zufälligen Teil Alarm ausgelöst wird", 3, 6.8, 0.05, "%"),
          z("b", "b) Wahrscheinlichkeit, dass ein Teil mit Alarm tatsächlich defekt ist", 4, 27.94, 0.1, "%"),
          t("c", "c) Erklären Sie, warum der Wert aus b) trotz 95 % Trefferquote so niedrig ist.", 3, "Defekte sind selten (Basisrate 2 %) (1,5 P.); die vielen einwandfreien Teile erzeugen trotz nur 5 % Fehlalarmquote mehr Fehlalarme als echte Treffer (1,5 P.).")
        ],
        loesung: "<p>a) 0,02 · 0,95 + 0,98 · 0,05 = 0,019 + 0,049 = 0,068 = <b>6,80 %</b></p><p>b) Satz von Bayes: 0,019 / 0,068 ≈ <b>27,94 %</b></p><p>c) Weil defekte Teile selten sind: Von 1.000 Teilen sind 20 defekt (19 Alarme), aber 980 in Ordnung (49 Fehlalarme). Die Basisrate bestimmt das Ergebnis stark.</p>" },

      { titel: "Visualisierung", text: "<p>Welches Diagramm eignet sich am besten?</p>",
        teile: [
          w("a", "1) Verteilung der Lieferzeiten von 5.000 Bestellungen", 2, CH, 0),
          w("b", "2) Zusammenhang zwischen Temperatur und Stromverbrauch", 2, CH, 1),
          w("c", "3) Entwicklung des Monatsumsatzes über drei Jahre", 2, CH, 2),
          w("d", "4) Vergleich der Reklamationen in fünf Filialen", 2, CH, 3),
          t("e", "e) Was zeigt ein Boxplot?", 2, "Median, Quartile/Interquartilsabstand (Box), Spannweite bzw. Whisker und Ausreißer (2 P., mindestens drei Elemente).")
        ],
        loesung: "<p>1) Histogramm · 2) Streudiagramm · 3) Liniendiagramm · 4) Balkendiagramm.</p><p>e) Median (Strich), mittlere 50 % der Daten (Box vom 1. zum 3. Quartil), Whisker und einzelne Ausreißerpunkte.</p>" },

      { titel: "k-Means", text: "<p>Eindimensionale Daten: <b>1, 2, 3, 10, 11, 12</b>. k = 2, Startzentren c₁ = 1 und c₂ = 12.</p>",
        teile: [
          z("a", "a) Neues Zentrum c₁ nach der ersten Iteration", 2, 2, 0.001),
          z("b", "b) Neues Zentrum c₂ nach der ersten Iteration", 2, 11, 0.001),
          t("c", "c) Wie bestimmen Sie mit der Ellbogenmethode eine sinnvolle Clusteranzahl?", 3, "k-Means für mehrere k rechnen, Summe der quadrierten Abstände (Inertia/WCSS) über k auftragen (1,5 P.); k am Knick wählen, ab dem die Verbesserung deutlich abflacht (1,5 P.)."),
          w("d", "d) Warum sollten Merkmale vor k-Means skaliert werden?", 3, ["Weil k-Means mit Abständen rechnet und große Wertebereiche sonst dominieren", "Weil k-Means nur ganze Zahlen verarbeitet", "Weil sonst Labels fehlen", "Es ist nicht nötig"], 0)
        ],
        loesung: "<p>Zuordnung: 1, 2, 3 zu c₁; 10, 11, 12 zu c₂. a) (1 + 2 + 3) / 3 = <b>2</b> · b) (10 + 11 + 12) / 3 = <b>11</b>.</p><p>c) Inertia für k = 1, 2, 3 … berechnen und plotten; am „Ellbogen“ lohnt ein weiterer Cluster kaum noch.</p><p>d) Weil Abstände sonst vom Merkmal mit dem größten Wertebereich (z. B. Einkommen in Euro gegenüber Alter) dominiert werden.</p>" },

      { titel: "Abstände und k-nächste Nachbarn", text: "<p>Punkte A(1; 2) und B(4; 6).</p>",
        teile: [
          z("a", "a) Euklidischer Abstand", 2, 5, 0.001),
          z("b", "b) Manhattan-Abstand", 2, 7, 0.001),
          w("c", "c) Die drei nächsten Nachbarn eines neuen Punkts haben die Klassen „ja“, „nein“, „ja“. Was sagt kNN mit k = 3 vorher?", 2, ["ja", "nein", "unentschieden", "keine Vorhersage möglich"], 0),
          t("d", "d) Nennen Sie zwei Dinge, die Sie bei kNN beachten müssen.", 4, "Je 2 P.: Skalierung der Merkmale; Wahl von k (ungerade bei zwei Klassen, Kreuzvalidierung); Vorhersage langsam bei vielen Daten; Fluch der Dimensionalität.")
        ],
        loesung: "<p>a) √(3² + 4²) = <b>5</b> · b) 3 + 4 = <b>7</b> · c) Mehrheit: <b>ja</b>.</p><p>d) Merkmale skalieren, k sinnvoll wählen (ungerade, per Kreuzvalidierung), bei vielen Daten wird die Vorhersage langsam, bei vielen Merkmalen verlieren Abstände an Aussagekraft.</p>" },

      { titel: "Kreuzvalidierung", text: "<p>Sie bewerten ein Modell auf 1.000 Datensätzen mit 5-facher Kreuzvalidierung.</p>",
        teile: [
          z("a", "a) Wie viele Datensätze umfasst ein Validierungsblock?", 2, 200, 0.001),
          z("b", "b) Mit wie vielen Datensätzen wird in jedem Durchgang trainiert?", 2, 800, 0.001),
          z("c", "c) Wie oft wird das Modell insgesamt trainiert?", 2, 5, 0.001),
          t("d", "d) Welchen Vorteil hat die Kreuzvalidierung gegenüber einer einzigen Aufteilung?", 4, "Jeder Datensatz wird einmal zur Validierung genutzt (1 P.); stabilere, weniger zufallsabhängige Schätzung der Güte (2 P.); Streuung über die Folds sichtbar, besonders wichtig bei wenigen Daten (1 P.).")
        ],
        loesung: "<p>a) 1.000 / 5 = <b>200</b> · b) <b>800</b> · c) <b>5</b>-mal.</p><p>d) Jeder Datensatz dient einmal der Validierung; das Ergebnis hängt weniger vom Zufall einer Aufteilung ab, und die Streuung über die fünf Durchgänge zeigt, wie stabil das Modell ist.</p>" },

      { titel: "Lineare Regression", text: "<p>Ein Modell schätzt die Heizkosten: <b>ŷ = 50 + 3 · x</b> (x = Außentemperatur unter 15 °C in Grad, ŷ in Euro pro Woche).</p>",
        teile: [
          z("a", "a) Vorhersage für x = 20", 3, 110, 0.001, "€"),
          t("b", "b) Interpretieren Sie die Steigung 3.", 3, "Pro zusätzlichem Grad (unter 15 °C) steigen die Heizkosten im Mittel um 3 € pro Woche (3 P.)."),
          z("c", "c) Tatsächlich fielen bei x = 20 Kosten von 104 € an. Wie groß ist das Residuum (y − ŷ)?", 2, -6, 0.001, "€"),
          w("d", "d) Was minimiert die Methode der kleinsten Quadrate?", 2, ["Die Summe der quadrierten Residuen", "Die Anzahl der Merkmale", "Den größten Einzelfehler", "Die Rechenzeit"], 0)
        ],
        loesung: "<p>a) 50 + 3 · 20 = <b>110 €</b> · b) Je Grad mehr steigen die Kosten um durchschnittlich 3 € pro Woche · c) 104 − 110 = <b>−6 €</b> · d) Die Summe der quadrierten Abweichungen zwischen Beobachtung und Vorhersage.</p>" },

      { titel: "Python", text: "<pre class=\"code\">def rabatt(preis, prozent=10):\n    return preis * (1 - prozent / 100)\n\nprint(rabatt(200))\nprint(rabatt(200, 25))</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung", 3, 180, 0.001),
          z("b", "b) Ausgabe der zweiten print-Anweisung", 3, 150, 0.001),
          t("c", "c) Erklären Sie den Unterschied zwischen einer Liste und einem Dictionary in Python mit je einem Beispiel.", 4, "Liste: geordnete Folge, Zugriff über Index, z. B. [3, 5, 7] (2 P.). Dictionary: Schlüssel-Wert-Paare, Zugriff über Schlüssel, z. B. {\"name\": \"Anna\"} (2 P.).")
        ],
        loesung: "<p>a) Standardwert 10 %: 200 · 0,9 = <b>180</b> (Ausgabe 180.0) · b) 200 · 0,75 = <b>150</b> (150.0).</p><p>c) Liste: geordnet, Zugriff per Position, z. B. <code>preise = [3, 5, 7]; preise[0]</code>. Dictionary: Zuordnung Schlüssel → Wert, z. B. <code>kunde = {\"name\": \"Anna\", \"plz\": \"28195\"}; kunde[\"name\"]</code>.</p>" },

      { titel: "Bildverarbeitung mit CNNs", text: "<p>Ein Graustufenbild hat 28 × 28 Pixel.</p>",
        teile: [
          z("a", "a) Ausgabegröße (Seitenlänge) nach einer Faltung mit 3 × 3-Filter, Schrittweite 1, ohne Padding", 3, 26, 0.001, "Pixel"),
          z("b", "b) Seitenlänge danach nach 2 × 2-Max-Pooling (Schrittweite 2)", 2, 13, 0.001, "Pixel"),
          t("c", "c) Warum eignen sich CNNs für Bilder besser als ein vollständig verbundenes Netz?", 3, "Gemeinsame Filtergewichte → viel weniger Parameter (1 P.); erkennen lokale Muster wie Kanten unabhängig von der Position (1 P.); hierarchische Merkmale von einfach bis komplex (1 P.)."),
          w("d", "d) Was bedeutet Transfer Learning?", 2, ["Ein vortrainiertes Modell wird für eine neue, ähnliche Aufgabe weitertrainiert", "Daten werden in die Cloud übertragen", "Ein Modell wird auf ein anderes Gerät kopiert", "Zwei Modelle tauschen Daten aus"], 0)
        ],
        loesung: "<p>a) 28 − 3 + 1 = <b>26</b> · b) 26 / 2 = <b>13</b>.</p><p>c) Filter werden über das ganze Bild geschoben (geteilte Gewichte, wenige Parameter), erkennen lokale Muster an jeder Stelle und bauen Schicht für Schicht komplexere Merkmale auf.</p><p>d) Ein auf großen Datenmengen vortrainiertes Modell wird mit wenigen eigenen Daten angepasst.</p>" },

      { titel: "Generative KI", text: "",
        teile: [
          w("a", "a) Was ist ein Token bei einem Sprachmodell?", 2, ["Ein Textbaustein (Wort oder Wortteil), den das Modell verarbeitet", "Ein Passwort", "Ein ganzer Absatz", "Eine Lizenzgebühr"], 0),
          t("b", "b) Was versteht man unter Halluzination? Nennen Sie eine Gegenmaßnahme.", 4, "Plausibel klingende, aber falsche/erfundene Aussagen (2 P.). Gegenmaßnahme (2 P.): RAG mit geprüften Quellen und Quellenangabe, menschliche Prüfung, niedrigere Temperatur, klare Anweisung „nur aus dem Kontext antworten“."),
          w("c", "c) Was ist Retrieval-Augmented Generation (RAG)?", 2, ["Passende Dokumente werden gesucht und dem Sprachmodell als Kontext mitgegeben", "Das Modell wird komplett neu trainiert", "Ein Verfahren zur Bildkompression", "Eine Methode zur Datenlöschung"], 0),
          w("d", "d) Was bewirkt eine höhere Temperatur bei der Textgenerierung?", 2, ["Vielfältigere, zufälligere Antworten", "Schnellere Antworten", "Kürzere Antworten", "Immer dieselbe Antwort"], 0)
        ],
        loesung: "<p>a) Ein Wort oder Wortteil. b) Halluzination: Das Modell erfindet überzeugend klingende Fakten. Gegenmaßnahme: RAG mit Quellenangaben, Anweisung nur aus Quellen zu antworten, menschliche Kontrolle. c) Abruf passender Dokumente + Generierung auf dieser Grundlage. d) Mehr Zufall und Vielfalt.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s03t2", satz: 3, teil: 2, titel: "Vertiefungen: Betrugserkennung bei einer Versicherung", kurz: "Versicherung · Betrug", minuten: 120,
    situation: "<p>Die <b>Weser Versicherung AG</b> bearbeitet jährlich 50.000 Kfz-Schadensmeldungen. Schätzungsweise 2 % sind betrügerisch; ein unentdeckter Betrug kostet im Schnitt 4.000 €. Eine manuelle Prüfung durch Sachverständige kostet 80 € je Fall. Bisher werden 5 % der Fälle zufällig geprüft.</p><p>Vorhanden: Schadensdaten der letzten fünf Jahre (Schadenhöhe, Zeitpunkt, Ort, Fahrzeug, Werkstatt, Vorschäden, Zeit zwischen Vertragsbeginn und Schaden, Freitext-Schadensbeschreibung) sowie die Ergebnisse aller bisherigen Prüfungen. Sie sollen ein System konzipieren, das verdächtige Fälle zur Prüfung vorschlägt.</p>",
    aufgaben: [
      { titel: "Problemdefinition", text: "",
        teile: [
          t("a", "a) Formulieren Sie die ML-Aufgabe. Welches Problem gibt es bei den Labels, wenn nur geprüfte Fälle ein gesichertes Ergebnis haben?", 6, "Überwachte binäre Klassifikation Betrug ja/nein bzw. Betrugswahrscheinlichkeit (2 P.). Label-Problem: Nur 5 % geprüft, ungeprüfte Fälle unklar – nicht automatisch „kein Betrug“; Stichprobe/Selektionsverzerrung (4 P.)."),
          t("b", "b) Nennen Sie ein fachliches Erfolgskriterium.", 3, "Z. B. mehr entdeckter Betrug bei gleicher Prüfkapazität, Trefferquote der Prüfungen steigt, Gesamtkosten sinken (3 P.)."),
          w("c", "c) Wann wäre zusätzlich ein unüberwachtes Verfahren (Anomalieerkennung) sinnvoll?", 3, ["Um neue, bisher unbekannte Betrugsmuster ohne Labels aufzuspüren", "Um die Schadenhöhe exakt vorherzusagen", "Nie, wenn Labels vorhanden sind", "Nur bei Bilddaten"], 0)
        ],
        loesung: "<p>a) Überwachte binäre Klassifikation: Wahrscheinlichkeit für Betrug je Schadensfall. Labels gibt es gesichert nur für die geprüften 5 %; ungeprüfte Fälle als „kein Betrug“ zu behandeln, verzerrt das Training. Lösung: nur geprüfte Fälle als Trainingsbasis, Zufallsstichprobe beibehalten.</p><p>b) z. B. Bei gleicher Prüfkapazität wird doppelt so viel Betrug gefunden.</p><p>c) Anomalieerkennung findet neue Muster, für die es noch keine Labels gibt.</p>" },

      { titel: "Daten", text: "",
        teile: [
          t("a", "a) Nennen Sie drei Merkmale, die auf Betrug hindeuten können, und begründen Sie kurz.", 6, "Je 2 P.: kurze Zeit zwischen Vertragsbeginn und Schaden; Häufung von Vorschäden; Schaden nachts/ohne Zeugen; auffällige Werkstatt oder Gutachter; Schadenhöhe knapp unter Prüfgrenze; Widersprüche in der Beschreibung."),
          t("b", "b) Warum ist Accuracy hier als Kennzahl ungeeignet? Nennen Sie eine Maßnahme gegen das Klassenungleichgewicht.", 4, "Bei 2 % Betrug erreicht „nie Betrug“ 98 % Accuracy (2 P.). Maßnahme (2 P.): Klassengewichte, Oversampling/SMOTE, Undersampling; bewerten mit Precision, Recall, PR-AUC, Kosten."),
          z("c", "c) Welche Accuracy erreicht ein Modell, das immer „kein Betrug“ vorhersagt?", 2, 98, 0.01, "%"),
          t("d", "d) Wie können Sie die Freitext-Schadensbeschreibung nutzbar machen?", 4, "NLP (1 P.): Text bereinigen, in Zahlen umwandeln – TF-IDF, Embeddings/Sprachmodell (2 P.); daraus Merkmale wie Themen, Länge, Widersprüche, Ähnlichkeit zu bekannten Betrugsfällen (1 P.).")
        ],
        loesung: "<p>a) z. B. Schaden kurz nach Vertragsbeginn, mehrere Vorschäden, auffällige Werkstatt-Gutachter-Kombination, Schadenhöhe knapp unter einer Prüfgrenze, nächtlicher Schaden ohne Zeugen.</p><p>b) Ein Modell, das immer „kein Betrug“ sagt, hätte 98 % Accuracy und fände nichts. Maßnahmen: Klassengewichte, Oversampling; bewerten mit Precision, Recall und Kosten.</p><p>c) <b>98 %</b>.</p><p>d) Text mit TF-IDF oder Embeddings in Zahlen übersetzen und als Merkmale nutzen, z. B. Ähnlichkeit zu bekannten Betrugsbeschreibungen.</p>" },

      { titel: "Bewertung und Schwellenwert", text: "<p>Testdaten: 10.000 geprüfte Fälle, davon 200 Betrug. Zwei Schwellenwerte im Vergleich:</p><div class=\"table-wrap\"><table><thead><tr><th>Schwelle</th><th>TP</th><th>FN</th><th>FP</th><th>TN</th></tr></thead><tbody><tr><td>0,5</td><td>120</td><td>80</td><td>180</td><td>9.620</td></tr><tr><td>0,3</td><td>160</td><td>40</td><td>640</td><td>9.160</td></tr></tbody></table></div><p>Kosten: Jeder vorgeschlagene Fall (TP + FP) wird geprüft (80 €). Jeder übersehene Betrug (FN) kostet 4.000 €. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Precision bei Schwelle 0,5", 3, 40, 0.1, "%"),
          z("b", "b) Recall bei Schwelle 0,5", 3, 60, 0.1, "%"),
          z("c", "c) Precision bei Schwelle 0,3", 3, 20, 0.1, "%"),
          z("d", "d) Recall bei Schwelle 0,3", 3, 80, 0.1, "%"),
          z("e", "e) Gesamtkosten (Prüfung + übersehener Betrug) bei Schwelle 0,5", 4, 344000, 1, "€"),
          z("f", "f) Gesamtkosten bei Schwelle 0,3", 4, 224000, 1, "€"),
          w("g", "g) Welche Schwelle empfehlen Sie?", 2, ["0,3", "0,5"], 0),
          t("h", "h) Erläutern Sie den Zielkonflikt zwischen Precision und Recall in diesem Fall.", 4, "Niedrigere Schwelle → mehr Betrug gefunden (Recall ↑), aber mehr unnötige Prüfungen (Precision ↓) (2 P.). Da übersehener Betrug (4.000 €) viel teurer ist als eine Prüfung (80 €), lohnt höherer Recall; Grenze ist die Prüfkapazität (2 P.)."),
          w("i", "i) Welche Darstellung zeigt Precision und Recall über alle Schwellenwerte?", 2, ["Precision-Recall-Kurve", "Boxplot", "Kreisdiagramm", "Lernkurve der Trainingsdauer"], 0)
        ],
        loesung: "<p>a) 120 / 300 = <b>40 %</b> · b) 120 / 200 = <b>60 %</b> · c) 160 / 800 = <b>20 %</b> · d) 160 / 200 = <b>80 %</b>.</p><p>e) 300 · 80 + 80 · 4.000 = 24.000 + 320.000 = <b>344.000 €</b> · f) 800 · 80 + 40 · 4.000 = 64.000 + 160.000 = <b>224.000 €</b> · g) <b>0,3</b>.</p><p>h) Eine niedrigere Schwelle findet mehr Betrug, erzeugt aber mehr Fehlalarme. Weil ein übersehener Betrug 50-mal so teuer ist wie eine Prüfung, lohnt sich der höhere Recall – solange genug Prüfer verfügbar sind (800 statt 300 Prüfungen).</p><p>i) Precision-Recall-Kurve.</p>" },

      { titel: "Erklärbarkeit und Fairness", text: "",
        teile: [
          t("a", "a) Die Sachverständigen wollen wissen, warum ein Fall vorgeschlagen wird. Wie setzen Sie das um?", 4, "Lokale Erklärung, z. B. SHAP/LIME, die wichtigsten Gründe je Fall anzeigen (2 P.); verständlich formuliert in der Prüfoberfläche, z. B. „Schaden 12 Tage nach Vertragsbeginn“ (2 P.)."),
          t("b", "b) Ein Kollege schlägt vor, Postleitzahl und Staatsangehörigkeit als Merkmale zu nutzen. Nehmen Sie Stellung.", 6, "Staatsangehörigkeit: Diskriminierungsrisiko, AGG/Art. 9-Nähe, nicht verwenden (2 P.). Postleitzahl kann als Stellvertretermerkmal (Proxy) für Herkunft/sozialen Status wirken (2 P.). Prüfen ob nötig, ggf. weglassen oder vergröbern, Fairness messen (2 P.)."),
          t("c", "c) Wie prüfen Sie, ob das Modell bestimmte Kundengruppen benachteiligt?", 6, "Kennzahlen je Gruppe vergleichen, z. B. Fehlalarmquote (FPR), Vorschlagsquote, Recall (3 P.); Fairness-Metrik nennen (Equalized Odds, Demographic Parity) (1 P.); bei Unterschieden Ursachen analysieren, Merkmale/Schwellen anpassen, dokumentieren (2 P.).")
        ],
        loesung: "<p>a) Für jeden vorgeschlagenen Fall die drei wichtigsten Gründe per SHAP anzeigen, in Fachsprache der Sachverständigen.</p><p>b) Staatsangehörigkeit ist ein Diskriminierungsmerkmal und gehört nicht ins Modell. Auch die Postleitzahl kann indirekt Herkunft oder Einkommen abbilden (Proxy). Nur verwenden, wenn fachlich nötig, und Fairness messen.</p><p>c) Fehlalarmquote, Vorschlagsquote und Recall für Gruppen (z. B. Alter, Region) vergleichen; bei deutlichen Unterschieden Ursachen suchen und gegensteuern.</p>" },

      { titel: "Einsatz im Prozess", text: "",
        teile: [
          t("a", "a) Wie binden Sie das Modell so in den Prozess ein, dass Menschen die Entscheidung behalten?", 4, "Modell priorisiert/schlägt vor, Sachverständige prüfen und entscheiden (Human in the Loop) (2 P.); keine automatische Ablehnung, Begründung dokumentieren, Übersteuern möglich (2 P.)."),
          t("b", "b) Nach der Einführung werden fast nur noch vom Modell vorgeschlagene Fälle geprüft. Welches Problem entsteht für künftige Trainingsdaten, und wie lösen Sie es?", 4, "Rückkopplung/Selektionsverzerrung: neue Labels nur für Fälle, die das Modell ohnehin verdächtig fand; neue Muster bleiben unentdeckt (2 P.). Lösung: weiterhin zufällige Stichprobe prüfen (2 P.)."),
          t("c", "c) Betrüger passen ihr Verhalten an. Was bedeutet das für den Betrieb?", 4, "Concept Drift/adversariales Verhalten (2 P.); regelmäßiges Monitoring der Trefferquote, Nachtraining, Anomalieerkennung ergänzen (2 P.).")
        ],
        loesung: "<p>a) Das Modell erstellt eine Prioritätenliste; Sachverständige prüfen und entscheiden, das Modell lehnt nichts selbst ab.</p><p>b) Feedback-Schleife: Gelernt wird nur noch aus Fällen, die das Modell selbst ausgewählt hat. Lösung: dauerhaft einen Teil zufällig prüfen.</p><p>c) Die Muster ändern sich (Concept Drift). Trefferquote laufend überwachen, regelmäßig nachtrainieren, Anomalieerkennung für neue Muster ergänzen.</p>" },

      { titel: "Recht", text: "",
        teile: [
          t("a", "a) Dürfte das System Zahlungen automatisch verweigern? Begründen Sie mit der DSGVO.", 6, "Art. 22 DSGVO: ausschließlich automatisierte Entscheidung mit rechtlicher/erheblicher Wirkung grundsätzlich unzulässig (2 P.); Ausnahmen nur bei Vertragserforderlichkeit/Gesetz/Einwilligung mit Schutzmaßnahmen: menschliches Eingreifen, Darlegung des Standpunkts, Anfechtung (2 P.); Empfehlung: Mensch entscheidet (2 P.)."),
          t("b", "b) Welche Informations- und Auskunftsrechte haben die Versicherten?", 4, "Information über Verarbeitung/Profiling nach Art. 13/14 (2 P.); Auskunft nach Art. 15 inkl. aussagekräftiger Informationen über die Logik bei automatisierten Entscheidungen (2 P.)."),
          w("c", "c) Wie ist ein Betrugserkennungssystem für Kfz-Schäden nach AI Act voraussichtlich einzuordnen?", 2, ["kein Hochrisiko-System (Betrugserkennung ist bei Kreditwürdigkeit ausdrücklich ausgenommen, Kfz-Versicherung nicht in Anhang III)", "verbotene Praktik", "Hochrisiko wie jede Versicherungsanwendung", "allgemeines KI-Modell"], 0),
          t("d", "d) Ist eine Datenschutz-Folgenabschätzung nötig? Begründen Sie.", 4, "Ja, wahrscheinlich (1 P.): systematische, umfangreiche Bewertung persönlicher Aspekte/Profiling mit erheblichen Folgen, viele Betroffene, neue Technologie (Art. 35 DSGVO) (3 P.).")
        ],
        loesung: "<p>a) Nein, nicht ohne Weiteres: Art. 22 DSGVO schützt vor ausschließlich automatisierten Entscheidungen mit erheblicher Wirkung. Selbst bei einer Ausnahme braucht es menschliches Eingreifen und Anfechtungsmöglichkeiten. Empfehlung: Das Modell schlägt vor, ein Mensch entscheidet.</p><p>b) Information über das Profiling (Art. 13/14), Auskunft inklusive aussagekräftiger Informationen über die Logik (Art. 15).</p><p>c) Voraussichtlich kein Hochrisiko-System. Anhang III nennt bei Versicherungen nur Risikobewertung und Preisgestaltung in der Lebens- und Krankenversicherung; die Prüfung ist im Einzelfall zu dokumentieren.</p><p>d) Ja: umfangreiches Profiling mit möglichen erheblichen Folgen für viele Versicherte erfordert eine DSFA nach Art. 35 DSGVO.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
