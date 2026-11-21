/* Bachelor-Prüfungssatz 1 */
(function (z, w, t) {
  var LP = ["Klassifikation (überwacht)", "Regression (überwacht)", "Clustering (unüberwacht)", "bestärkendes Lernen"];
  var SK = ["nominal", "ordinal", "intervallskaliert", "verhältnisskaliert"];

  window.PRUEFUNGEN.push({
    id: "bp-s01a", satz: 1, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Grundbegriffe", text: "<p>In einem Workshop werden Begriffe rund um KI gesammelt.</p>",
        teile: [
          w("a", "a) Welche Aussage ist richtig?", 2, ["Deep Learning ist ein Teilgebiet des maschinellen Lernens, das ein Teilgebiet der KI ist", "KI ist ein Teilgebiet des Deep Learning", "Maschinelles Lernen kommt ohne Daten aus", "Deep Learning ist regelbasierte KI"], 0),
          t("b", "b) Erklären Sie den Unterschied zwischen Regression und Klassifikation mit je einem betrieblichen Beispiel.", 4, "Regression: Vorhersage eines Zahlenwerts, z. B. Umsatz, Lieferzeit (2 P.). Klassifikation: Zuordnung zu Klassen, z. B. Spam/kein Spam, Bauteil fehlerhaft/in Ordnung (2 P.)."),
          w("c", "c) Welche Aufgabe ist eine Regression?", 2, ["Umsatz der nächsten Woche in Euro schätzen", "E-Mails in Spam und kein Spam einteilen", "Kundengruppen ohne Vorgaben finden", "Ein Bild als Katze oder Hund erkennen"], 0),
          w("d", "d) Welches Lernparadigma nutzt man, um Kundensegmente ohne vorgegebene Gruppen zu bilden?", 2, ["unüberwachtes Lernen", "überwachtes Lernen", "bestärkendes Lernen", "regelbasierte Expertensysteme"], 0)
        ],
        loesung: "<p>a) Deep Learning ⊂ maschinelles Lernen ⊂ KI.</p><p>b) Regression sagt einen Zahlenwert voraus (Umsatz, Lieferzeit, Energiebedarf). Klassifikation ordnet einer Klasse zu (Spam ja/nein, Bauteil in Ordnung/fehlerhaft).</p><p>c) Umsatzprognose · d) unüberwachtes Lernen (Clustering).</p>" },

      { titel: "Verfahren zuordnen", text: "<p>Ordnen Sie jedem Verfahren bzw. Anwendungsfall die passende Aufgabe zu.</p>",
        teile: [
          w("a", "1) k-nächste Nachbarn sagt voraus, ob ein Kunde kündigt.", 2, LP, 0),
          w("b", "2) k-Means bildet Gruppen ähnlicher Filialen.", 2, LP, 2),
          w("c", "3) Lineare Regression schätzt den Stromverbrauch in kWh.", 2, LP, 1),
          w("d", "4) Ein Lagerroboter lernt über Belohnungen den kürzesten Weg.", 2, LP, 3),
          w("e", "5) Ein Entscheidungsbaum entscheidet, ob ein Kreditantrag genehmigt wird.", 2, LP, 0)
        ],
        loesung: "<p>1) Klassifikation · 2) Clustering · 3) Regression · 4) bestärkendes Lernen · 5) Klassifikation.</p>" },

      { titel: "Deskriptive Statistik", text: "<p>Bearbeitungszeiten von sieben Serviceanfragen in Minuten: <b>4, 6, 6, 7, 8, 9, 30</b></p>",
        teile: [
          z("a", "a) Arithmetisches Mittel", 2, 10, 0.01, "min"),
          z("b", "b) Median", 2, 7, 0.01, "min"),
          z("c", "c) Modus", 2, 6, 0.01, "min"),
          z("d", "d) Spannweite", 2, 26, 0.01, "min"),
          z("e", "e) Varianz (Division durch n, zwei Nachkommastellen)", 3, 68.86, 0.05, "min²"),
          t("f", "f) Welcher Lageparameter beschreibt die typische Bearbeitungszeit besser? Begründen Sie.", 3, "Median (1 P.), weil er robust gegenüber dem Ausreißer 30 ist; der Mittelwert wird nach oben gezogen (2 P.).")
        ],
        loesung: "<p>a) 70 / 7 = <b>10</b> · b) mittlerer Wert der sortierten Reihe = <b>7</b> · c) häufigster Wert <b>6</b> · d) 30 − 4 = <b>26</b>.</p><p>e) Abweichungsquadrate 36 + 16 + 16 + 9 + 4 + 1 + 400 = 482; 482 / 7 ≈ <b>68,86</b>.</p><p>f) Der <b>Median</b>, denn der Ausreißer von 30 Minuten verzerrt den Mittelwert; sechs von sieben Anfragen liegen unter 10 Minuten.</p>" },

      { titel: "Skalen und Datenqualität", text: "<p>Ein Datensatz über Auszubildende enthält verschiedene Merkmale.</p>",
        teile: [
          w("a", "a) Schulnote (1 bis 6)", 2, SK, 1),
          w("b", "b) Temperatur am Arbeitsplatz in °C", 2, SK, 2),
          w("c", "c) Personalnummer", 2, SK, 0),
          t("d", "d) Nennen Sie zwei Dimensionen der Datenqualität mit je einem Beispiel für einen Mangel.", 4, "Je 2 P. (Dimension + Beispiel): Vollständigkeit (fehlender Wert), Korrektheit (Tippfehler), Konsistenz (Widerspruch), Aktualität (veraltet), Eindeutigkeit (Dublette), Plausibilität.")
        ],
        loesung: "<p>a) ordinal (Rangfolge, ungleiche Abstände) · b) intervallskaliert (kein natürlicher Nullpunkt) · c) nominal (nur Bezeichnung).</p><p>d) z. B. Vollständigkeit: Ausbildungsbeginn fehlt; Konsistenz: Prüfungsdatum vor Ausbildungsbeginn; Eindeutigkeit: Person doppelt erfasst.</p>" },

      { titel: "SQL", text: "<p>Tabelle <code>bestellungen(id, kunde_id, datum, betrag, status)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die je Kunde die Summe der Beträge aller Bestellungen mit Status 'geliefert' ausgibt – nur Kunden mit einer Summe über 1.000 €, absteigend sortiert.", 6, "SELECT kunde_id, SUM(betrag) (1 P.) FROM bestellungen WHERE status = 'geliefert' (1 P.) GROUP BY kunde_id (1 P.) HAVING SUM(betrag) > 1000 (2 P.) ORDER BY SUM(betrag) DESC (1 P.)."),
          w("b", "b) Worin unterscheiden sich WHERE und HAVING?", 2, ["WHERE filtert Zeilen vor der Gruppierung, HAVING filtert Gruppen danach", "Es gibt keinen Unterschied", "HAVING filtert vor der Gruppierung", "WHERE funktioniert nur mit Zahlen"], 0),
          w("c", "c) Was liefert ein LEFT JOIN von kunden mit bestellungen?", 2, ["Alle Kunden, auch ohne Bestellung; fehlende Werte als NULL", "Nur Kunden mit Bestellung", "Nur Bestellungen ohne Kunde", "Das kartesische Produkt"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT kunde_id, SUM(betrag) AS summe\nFROM bestellungen\nWHERE status = 'geliefert'\nGROUP BY kunde_id\nHAVING SUM(betrag) &gt; 1000\nORDER BY summe DESC;</pre><p>b) WHERE filtert einzelne Zeilen vor der Gruppierung, HAVING filtert die gebildeten Gruppen. · c) Alle Kunden, auch ohne Bestellung.</p>" },

      { titel: "Konfusionsmatrix", text: "<p>Ein Modell erkennt betrügerische Zahlungen. Auf 200 Testfällen: TP = 45, FN = 15, FP = 5, TN = 135. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Accuracy", 2, 90, 0.1, "%"),
          z("b", "b) Precision", 2, 90, 0.1, "%"),
          z("c", "c) Recall", 2, 75, 0.1, "%"),
          z("d", "d) F1-Score", 2, 81.82, 0.15, "%"),
          z("e", "e) Spezifität", 2, 96.43, 0.1, "%"),
          z("f", "f) Accuracy eines Modells, das nie „Betrug“ meldet", 2, 70, 0.1, "%"),
          w("g", "g) Übersehene Betrugsfälle sind teuer. Welche Kennzahl ist besonders wichtig?", 2, ["Recall", "Spezifität", "Accuracy", "Precision"], 0)
        ],
        loesung: "<p>a) (45 + 135) / 200 = <b>90 %</b> · b) 45 / 50 = <b>90 %</b> · c) 45 / 60 = <b>75 %</b> · d) 2 · 0,9 · 0,75 / 1,65 = <b>81,82 %</b> · e) 135 / 140 = <b>96,43 %</b> · f) 140 / 200 = <b>70 %</b> · g) <b>Recall</b>.</p>" },

      { titel: "Generalisierung", text: "<p>Ein Entscheidungsbaum ohne Tiefenbegrenzung erreicht 100 % auf den Trainingsdaten und 68 % auf den Testdaten.</p>",
        teile: [
          w("a", "a) Was liegt vor?", 2, ["Overfitting", "Underfitting", "Data Drift", "gute Generalisierung"], 0),
          t("b", "b) Erklären Sie die k-fache Kreuzvalidierung.", 4, "Daten in k gleich große Teile teilen (1 P.); k-mal trainieren, jeweils ein anderer Teil zum Validieren (2 P.); Ergebnisse mitteln, stabilere Schätzung (1 P.)."),
          t("c", "c) Nennen Sie zwei Gegenmaßnahmen für dieses Modell.", 4, "Je 2 P.: Baumtiefe begrenzen, Mindestanzahl je Blatt, Pruning, mehr Daten, Ensemble (Random Forest), weniger Merkmale.")
        ],
        loesung: "<p>a) <b>Overfitting</b>. b) Die Daten werden in k Teile geteilt; das Modell wird k-mal trainiert, jedes Mal mit einem anderen Teil als Validierung; der Mittelwert ist eine stabile Gütebeurteilung. c) z. B. maximale Tiefe begrenzen, Mindestanzahl Fälle je Blatt, Pruning, Random Forest.</p>" },

      { titel: "Lineare Regression", text: "<p>Ein Modell schätzt die Lieferzeit y (in Stunden) aus der Entfernung x (in 10 km): <b>ŷ = 2,5 + 1,5 · x</b>. Auf Testdaten gilt R² = 0,81.</p>",
        teile: [
          z("a", "a) Prognose für x = 10", 2, 17.5, 0.01, "h"),
          t("b", "b) Interpretieren Sie die Steigung 1,5.", 2, "Je 10 km mehr Entfernung steigt die erwartete Lieferzeit um 1,5 Stunden (2 P.)."),
          w("c", "c) Was bedeutet R² = 0,81?", 2, ["81 % der Streuung der Lieferzeit werden durch das Modell erklärt", "81 % der Prognosen sind exakt richtig", "Die Steigung beträgt 0,81", "Der Fehler beträgt 0,81 Stunden"], 0),
          z("d", "d) Eine Lieferung mit x = 4 dauerte 9 Stunden. Wie groß ist das Residuum y − ŷ?", 2, 0.5, 0.01, "h"),
          w("e", "e) Was misst der mittlere absolute Fehler (MAE)?", 2, ["den Durchschnitt der absoluten Abweichungen zwischen Prognose und Wert", "den Anteil richtig klassifizierter Fälle", "die Steigung der Geraden", "die Varianz der Merkmale"], 0)
        ],
        loesung: "<p>a) 2,5 + 1,5 · 10 = <b>17,5 h</b> · b) Pro 10 km mehr 1,5 h längere Lieferzeit. · c) 81 % der Varianz werden erklärt. · d) ŷ = 8,5; 9 − 8,5 = <b>0,5 h</b> · e) mittlere absolute Abweichung.</p>" },

      { titel: "Verantwortungsvolle KI", text: "<p>Die Geschäftsführung fragt nach rechtlichen und ethischen Grundlagen.</p>",
        teile: [
          w("a", "a) Welche Pflicht gilt nach der EU-KI-Verordnung für einen Kundenservice-Chatbot?", 2, ["Nutzer müssen erkennen können, dass sie mit einer KI interagieren", "Er ist verboten", "Er braucht eine CE-Kennzeichnung als Hochrisiko-System", "Keine Pflichten"], 0),
          w("b", "b) Welche Praxis ist verboten?", 2, ["Social Scoring durch Bewertung des sozialen Verhaltens mit nachteiligen Folgen", "Spamfilter", "Absatzprognose", "Übersetzungsprogramm"], 0),
          w("c", "c) Sind pseudonymisierte Daten personenbezogen im Sinne der DSGVO?", 2, ["Ja", "Nein", "Nur bei Namen", "Nur in Deutschland"], 0),
          t("d", "d) Erklären Sie an einem Beispiel, wie Bias in einem Modell entsteht.", 4, "Ursache (2 P.): verzerrte/unausgewogene Daten, historische Benachteiligung, Stellvertretermerkmale. Beispiel (2 P.)."),
          w("e", "e) Wen verpflichtet Art. 4 der KI-Verordnung, für KI-Kompetenz zu sorgen bzw. Maßnahmen dafür zu ergreifen?", 2, ["Anbieter und Betreiber von KI-Systemen", "Nur die EU-Kommission", "Nur Hersteller von Hochrisiko-Systemen", "Nur Privatpersonen"], 0)
        ],
        loesung: "<p>a) Transparenzpflicht · b) Social Scoring · c) Ja · d) z. B. ein Kreditmodell lernt aus historischen Entscheidungen, in denen eine Gruppe benachteiligt wurde, und übernimmt dieses Muster; oder ein Merkmal wie die Postleitzahl wirkt als Stellvertreter für die Herkunft. · e) Anbieter und Betreiber.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s01b", satz: 1, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Modellierung: vorausschauende Wartung", text: "<p>Ein Hersteller will Ausfälle von Lagern in Pumpen 7 Tage vorher erkennen. Vorhanden: Sensordaten (Vibration, Temperatur, Drehzahl) im Minutentakt von 400 Pumpen über drei Jahre; 2 % der Wochen enden mit einem Ausfall.</p>",
        teile: [
          t("a", "a) Formulieren Sie die ML-Aufgabe mit Lernparadigma, Aufgabentyp und Zielvariable.", 4, "Überwachtes Lernen (1 P.), binäre Klassifikation (1 P.), Zielvariable z. B. Ausfall in den nächsten 7 Tagen = 1 (2 P.)."),
          t("b", "b) Beschreiben Sie zwei Maßnahmen gegen das Klassenungleichgewicht.", 4, "Je 2 P.: Klassengewichte, Oversampling/SMOTE, Undersampling, Schwellenwert anpassen, geeignete Metriken."),
          w("c", "c) Welche Kennzahl eignet sich zur Modellbewertung am besten?", 2, ["Recall und Precision bzw. PR-AUC", "Accuracy", "R²", "Anzahl der Merkmale"], 0),
          t("d", "d) Warum teilen Sie die Daten zeitlich statt zufällig in Training und Test?", 4, "Zeitreihen: zufällige Aufteilung lässt Informationen aus der Zukunft ins Training (Leakage) (2 P.); zeitliche Aufteilung entspricht dem späteren Einsatz und schätzt die Güte realistisch (2 P.).")
        ],
        loesung: "<p>a) Überwachtes Lernen, binäre Klassifikation; Ziel z. B. „Ausfall innerhalb der nächsten 7 Tage = 1“, Merkmale aus Zeitfenstern (Mittelwerte, Trends, Spitzen der Vibration).</p><p>b) Klassengewichte, Oversampling der Ausfälle, Schwellenwert senken. c) Recall/Precision bzw. PR-AUC – Accuracy wäre mit 98 % schon bei „nie Ausfall“ hoch. d) Sonst lernt das Modell aus zeitlich späteren Daten (Leakage); die zeitliche Aufteilung bildet den echten Einsatz ab.</p>" },

      { titel: "Logistische Regression", text: "<p>Ein Modell berechnet z = −3 + 0,8 · x₁ + 1,2 · x₂ und p = 1 / (1 + e<sup>−z</sup>). Für eine Pumpe gilt x₁ = 2 und x₂ = 1.</p>",
        teile: [
          z("a", "a) z", 3, -0.2, 0.001),
          z("b", "b) Wahrscheinlichkeit p (drei Nachkommastellen)", 3, 0.450, 0.005),
          w("c", "c) Welche Klasse wird bei einem Schwellenwert von 0,5 vorhergesagt?", 2, ["0 (kein Ausfall)", "1 (Ausfall)", "keine Aussage möglich", "beide"], 0),
          z("d", "d) Um welchen Faktor ändern sich die Odds, wenn x₂ um 1 steigt (zwei Nachkommastellen)?", 2, 3.32, 0.01),
          t("e", "e) Wie würden Sie den Schwellenwert wählen, wenn ein übersehener Ausfall sehr teuer ist?", 2, "Schwellenwert senken (z. B. 0,3), um den Recall zu erhöhen; dafür mehr Fehlalarme in Kauf nehmen; Kosten von FN und FP abwägen (2 P.).")
        ],
        loesung: "<p>a) −3 + 1,6 + 1,2 = <b>−0,2</b> · b) 1 / (1 + e<sup>0,2</sup>) = 1 / 2,2214 ≈ <b>0,450</b> · c) unter 0,5 → Klasse 0 · d) e<sup>1,2</sup> ≈ <b>3,32</b> · e) Schwellenwert senken, Kosten von übersehenen Ausfällen und Fehlalarmen abwägen.</p>" },

      { titel: "Kreuzvalidierung und Hyperparameter", text: "<p>Eine 5-fache Kreuzvalidierung liefert die F1-Werte 0,82 · 0,85 · 0,80 · 0,84 · 0,84.</p>",
        teile: [
          z("a", "a) Mittlerer F1-Wert", 2, 0.83, 0.001),
          t("b", "b) Ein Kollege skaliert alle Daten, bevor er sie in Folds aufteilt. Welches Problem entsteht, und wie lösen Sie es?", 4, "Data Leakage: Statistik der Validierungsdaten fließt ins Training (2 P.); Skalierung innerhalb der Folds nur auf Trainingsdaten anpassen, z. B. mit Pipeline (2 P.)."),
          w("c", "c) Wofür werden Testdaten verwendet?", 2, ["für eine einmalige, unabhängige Schätzung der Güte am Ende", "zum Abstimmen der Hyperparameter", "zum Training", "zum Skalieren"], 0),
          w("d", "d) Was ist Grid Search?", 2, ["systematisches Ausprobieren von Hyperparameter-Kombinationen mit Validierung", "ein Clustering-Verfahren", "eine Aktivierungsfunktion", "eine Datenbankabfrage"], 0)
        ],
        loesung: "<p>a) 4,15 / 5 = <b>0,83</b> · b) Data Leakage; Lösung: Skalierer nur auf den Trainingsfolds anpassen (Pipeline) · c) einmalige Endschätzung · d) systematische Suche über Hyperparameter-Kombinationen.</p>" },

      { titel: "Neuronales Netz", text: "<p>Ein vollständig verbundenes Netz hat 4 Eingaben, eine verdeckte Schicht mit 5 Neuronen und 3 Ausgabeneuronen (Softmax).</p>",
        teile: [
          z("a", "a) Anzahl der lernbaren Parameter (Gewichte und Biases)", 3, 43, 0),
          z("b", "b) Die Ausgabeschicht liefert die Werte (2; 1; 0). Softmax-Wahrscheinlichkeit der ersten Klasse (drei Nachkommastellen)", 3, 0.665, 0.003),
          z("c", "c) Kreuzentropie-Verlust, wenn die erste Klasse richtig ist (drei Nachkommastellen)", 3, 0.408, 0.003),
          t("d", "d) Erklären Sie die Rolle der Lernrate beim Gradientenabstieg.", 3, "Schrittweite der Gewichtsänderung (1 P.); zu groß: Training springt/divergiert (1 P.); zu klein: sehr langsames Lernen, lokale Minima (1 P.)."),
          w("e", "e) Welcher Netztyp eignet sich besonders für Bilddaten?", 2, ["Convolutional Neural Network", "lineare Regression", "k-Means", "Entscheidungsbaum"], 0)
        ],
        loesung: "<p>a) 4 · 5 + 5 = 25 und 5 · 3 + 3 = 18 → <b>43</b> · b) e² / (e² + e¹ + e⁰) = 7,389 / 11,107 ≈ <b>0,665</b> · c) −ln(0,665) ≈ <b>0,408</b> · d) Die Lernrate bestimmt die Schrittweite; zu groß springt das Training, zu klein ist es langsam. · e) CNN.</p>" },

      { titel: "k-Means", text: "<p>Zwei Clusterzentren: C₁ = (1; 1) und C₂ = (5; 4). Neuer Punkt P = (3; 2). Euklidische Distanz.</p>",
        teile: [
          z("a", "a) Distanz von P zu C₁ (drei Nachkommastellen)", 2, 2.236, 0.005),
          w("b", "b) Welchem Cluster wird P zugeordnet?", 2, ["C₁", "C₂", "beiden", "keinem"], 0),
          t("c", "c) Wie bestimmen Sie mit der Ellbogenmethode ein geeignetes k?", 4, "k-Means für mehrere k rechnen (1 P.), Summe der quadrierten Abstände (Inertia) über k auftragen (1 P.), Knick suchen, ab dem zusätzliche Cluster kaum Verbesserung bringen (2 P.).")
        ],
        loesung: "<p>a) √((3−1)² + (2−1)²) = √5 ≈ <b>2,236</b>; zu C₂: √8 ≈ 2,828 · b) C₁ · c) Inertia für k = 1, 2, … berechnen und den Knick („Ellbogen“) wählen.</p>" },

      { titel: "Fairness und Erklärbarkeit", text: "<p>Ein Vorauswahlmodell lädt 60 von 200 Bewerbenden der Gruppe A und 27 von 150 Bewerbenden der Gruppe B zum Gespräch ein.</p>",
        teile: [
          z("a", "a) Einladungsquote Gruppe A", 2, 30, 0.1, "%"),
          z("b", "b) Einladungsquote Gruppe B", 2, 18, 0.1, "%"),
          z("c", "c) Verhältnis der Quoten B / A", 2, 0.6, 0.01),
          w("d", "d) Wie bewerten Sie das Ergebnis nach der 80-%-Regel?", 2, ["Hinweis auf Benachteiligung von B, da unter 0,8", "unauffällig, da über 0,5", "Benachteiligung von A", "nicht bewertbar"], 0),
          t("e", "e) Nennen Sie zwei Maßnahmen gegen den festgestellten Bias.", 4, "Je 2 P.: Daten ausbalancieren/neu gewichten, Stellvertretermerkmale entfernen, Fairness-Constraints/Schwellen je Gruppe prüfen, menschliche Prüfung, regelmäßiges Fairness-Monitoring, Ursachenanalyse."),
          w("f", "f) Welche Methode erklärt eine einzelne Vorhersage mit Merkmalsbeiträgen?", 2, ["SHAP", "k-Means", "PCA", "Grid Search"], 0)
        ],
        loesung: "<p>a) 60 / 200 = <b>30 %</b> · b) 27 / 150 = <b>18 %</b> · c) 18 / 30 = <b>0,6</b> · d) unter 0,8 → deutlicher Hinweis auf Benachteiligung · e) z. B. Stellvertretermerkmale entfernen, Daten neu gewichten, menschliche Prüfung, Monitoring · f) SHAP.</p>" },

      { titel: "Robustheit und Drift", text: "<p>Das Wartungsmodell läuft seit einem Jahr. Nach dem Einbau neuer Sensoren steigen die Fehlalarme.</p>",
        teile: [
          t("a", "a) Unterscheiden Sie Data Drift und Concept Drift und ordnen Sie den Fall ein.", 4, "Data Drift: Verteilung der Eingaben ändert sich (1,5 P.); Concept Drift: Zusammenhang zwischen Eingaben und Ziel ändert sich (1,5 P.); hier Data Drift durch neue Sensoren (1 P.)."),
          t("b", "b) Beschreiben Sie ein Monitoring-Konzept für das Modell.", 4, "Eingangsverteilungen überwachen (z. B. PSI) (1 P.), Modellgüte mit nachlaufenden Labels (1 P.), Schwellen und Alarme (1 P.), Nachtraining und Versionierung/Champion-Challenger (1 P.)."),
          w("c", "c) Was ist ein Adversarial Example?", 2, ["eine gezielt minimal veränderte Eingabe, die das Modell täuscht", "ein besonders typischer Trainingsfall", "ein fehlender Wert", "ein Hyperparameter"], 0)
        ],
        loesung: "<p>a) Data Drift: Eingabeverteilung ändert sich; Concept Drift: der Zusammenhang ändert sich. Neue Sensoren → Data Drift. b) Verteilungen und Güte überwachen, Alarme, Nachtraining mit Versionierung, neues Modell erst im Schattenbetrieb. c) Gezielt manipulierte Eingabe.</p>" },

      { titel: "Python und pandas", text: "<pre class=\"code\">import pandas as pd\ndf = pd.DataFrame({\"filiale\": [\"A\", \"B\", \"A\", \"C\", \"B\", \"A\"],\n                   \"umsatz\": [100, 80, 120, 50, 70, 110]})\nprint(df.groupby(\"filiale\")[\"umsatz\"].mean()[\"A\"])\nprint(len(df[df[\"umsatz\"] &gt; 75]))</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung", 3, 110, 0.01),
          z("b", "b) Ausgabe der zweiten print-Anweisung", 3, 4, 0),
          t("c", "c) Wie teilen Sie Daten mit scikit-learn in 80 % Training und 20 % Test? Nennen Sie Funktion und wichtige Parameter.", 4, "train_test_split (2 P.) mit test_size=0.2 (1 P.) und random_state bzw. stratify für reproduzierbare/ausgewogene Aufteilung (1 P.).")
        ],
        loesung: "<p>a) (100 + 120 + 110) / 3 = <b>110</b> · b) Werte über 75: 100, 80, 120, 110 → <b>4</b> · c) <code>train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)</code>.</p>" },

      { titel: "Systementwicklung und MLOps", text: "<p>Das Modell soll dauerhaft betrieben werden.</p>",
        teile: [
          t("a", "a) Nennen Sie drei Bausteine einer MLOps-Pipeline.", 4, "Z. B. Datenversionierung, automatisiertes Training, Tests/Validierung, Modellregistrierung/Versionierung, Deployment (CI/CD), Monitoring, Nachtraining (3 Bausteine, 4 P.)."),
          w("b", "b) Die Ausfallprognose wird einmal täglich für alle Pumpen benötigt. Welche Bereitstellung passt?", 2, ["Batch-Vorhersage", "Echtzeit-API mit Millisekunden-Latenz", "manuell in Excel", "Edge-Training"], 0),
          w("c", "c) Wozu dient eine Modellregistrierung (Model Registry)?", 2, ["Modellversionen mit Metadaten verwalten und freigeben", "Daten löschen", "Hardware kaufen", "Mitarbeitende einplanen"], 0)
        ],
        loesung: "<p>a) z. B. Datenversionierung, automatisiertes Training mit Tests, Model Registry, automatisiertes Deployment, Monitoring mit Nachtraining. b) Batch · c) Versionen verwalten, nachvollziehen und freigeben.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s01t2", satz: 1, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI in Einsatz- und Ersatzteilplanung", kurz: "Haustechnik · Einsatzplanung", minuten: 240,
    situation: "<p>Die <b>Nordsee Haustechnik GmbH</b> (260 Beschäftigte, davon 140 Servicetechniker, Betriebsrat vorhanden) wartet Heizungs- und Lüftungsanlagen bei 18.000 Kunden. Aufträge kommen per Telefon, E-Mail und Kundenportal; vier Disponenten planen die Einsätze. Häufig fehlen Ersatzteile beim ersten Termin, sodass 22 % der Einsätze wiederholt werden müssen.</p><p>Die Geschäftsführung möchte ein KI-System eines US-Anbieters (Cloud) einführen, das Ersatzteilbedarfe prognostiziert und den Technikern Aufträge nach Qualifikation, Fahrzeit und bisheriger Bearbeitungsdauer zuweist. Sie leiten das Vorhaben als Bachelor Professional.</p>",
    aufgaben: [
      { titel: "KI-Lösung konzipieren", text: "<p>Für die Ersatzteilprognose liegen fünf Jahre Auftragsdaten, Anlagenstammdaten und Lagerbewegungen vor.</p>",
        teile: [
          t("a", "a) Formulieren Sie die ML-Aufgabe für die Ersatzteilprognose und nennen Sie vier sinnvolle Merkmale.", 6, "Überwachtes Lernen, Regression bzw. Zeitreihenprognose der Teilemenge je Woche/Region (2 P.); vier Merkmale wie Anlagentyp/Alter, Saison/Temperatur, bisherige Störungen, Wartungsintervall, Region (je 1 P.)."),
          t("b", "b) Nennen Sie zwei Risiken der Datenqualität und je eine Maßnahme.", 4, "Je 2 P.: z. B. uneinheitliche Teilenummern → Stammdatenbereinigung; fehlende Angaben in Aufträgen → Pflichtfelder; Dubletten → Abgleich."),
          z("c", "c) Prognose und Ist für vier Wochen: Ist 10, 12, 8, 15 · Prognose 11, 10, 9, 15. Berechnen Sie den MAE.", 3, 1, 0.01),
          z("d", "d) Berechnen Sie den RMSE (drei Nachkommastellen).", 3, 1.225, 0.005)
        ],
        loesung: "<p>a) Überwachtes Lernen, Regression bzw. Zeitreihenprognose: Bedarf je Teil, Woche und Region. Merkmale z. B. Anlagentyp und -alter, Saison und Außentemperatur, Störungshistorie, Wartungsintervall, Region.</p><p>b) Uneinheitliche Teilenummern → Stammdaten bereinigen; fehlende Angaben → Pflichtfelder im Auftrag.</p><p>c) Abweichungen 1, 2, 1, 0 → MAE = 4 / 4 = <b>1,0</b> · d) √((1 + 4 + 1 + 0) / 4) = √1,5 ≈ <b>1,225</b>.</p>" },

      { titel: "Prozess analysieren und gestalten", text: "<p>Ein Auftrag wird heute im Schnitt 15 Minuten aktiv bearbeitet (Erfassung, Teileprüfung, Disposition), liegt aber insgesamt 300 Minuten bis zur Einplanung.</p>",
        teile: [
          z("a", "a) Wartezeit in Minuten", 2, 285, 0),
          z("b", "b) Prozesseffizienz", 2, 5, 0.05, "%"),
          t("c", "c) Beschreiben Sie den Soll-Prozess mit KI in BPMN-Elementen (Ereignis, Aktivitäten, Gateway, Lanes).", 6, "Startereignis Auftrag eingegangen (1 P.); Lanes Kundenportal/KI, Disposition, Technik (1 P.); Aktivitäten KI erfasst und klassifiziert, Teilebedarf prognostizieren, Teile reservieren, Einsatz vorschlagen (2 P.); exklusives Gateway Standard/Ausnahme mit Prüfung durch Disposition (1 P.); Endereignis Einsatz geplant (1 P.)."),
          t("d", "d) Nennen Sie zwei Kennzahlen zur Steuerung des neuen Prozesses mit Zielwert.", 4, "Je 2 P.: Erstlösungsquote (z. B. Wiederholungseinsätze von 22 % auf 10 %), Durchlaufzeit bis Einplanung, Prognosefehler, Teileverfügbarkeit, Kundenzufriedenheit.")
        ],
        loesung: "<p>a) 300 − 15 = <b>285 min</b> · b) 15 / 300 = <b>5 %</b>.</p><p>c) Start „Auftrag eingegangen“ → KI erfasst und klassifiziert → Teilebedarf prognostizieren → Gateway „Standardfall?“ → ja: Einsatzvorschlag automatisch, Freigabe durch Disposition; nein: manuelle Disposition → Teile reservieren → Ende „Einsatz geplant“; Lanes für KI-System, Disposition, Lager, Technik.</p><p>d) z. B. Anteil Wiederholungseinsätze (Ziel 10 %), Zeit bis zur Einplanung (Ziel 60 min).</p>" },

      { titel: "Projekt planen und steuern", text: "<p>Vorgänge (Dauer in Wochen, Vorgänger): A Analyse 2 (–) · B Datenaufbereitung 4 (A) · C Betriebsvereinbarung 3 (A) · D Modell und Integration 5 (B) · E Schulung 2 (C) · F Pilot 3 (D, E).</p>",
        teile: [
          z("a", "a) Projektdauer in Wochen", 3, 14, 0),
          w("b", "b) Kritischer Pfad", 3, ["A–B–D–F", "A–C–E–F", "A–B–E–F", "A–C–D–F"], 0),
          z("c", "c) Gesamtpuffer von C in Wochen", 2, 4, 0),
          z("d", "d) Nach 8 Wochen: BAC 240 T€, PV 120 T€, EV 96 T€, AC 110 T€. CPI (drei Nachkommastellen)", 2, 0.873, 0.003),
          z("e", "e) SPI", 2, 0.8, 0.003),
          z("f", "f) Kostenprognose EAC = BAC / CPI in T€", 2, 275, 1),
          t("g", "g) Nennen Sie eine Steuerungsmaßnahme.", 2, "Z. B. Ursachen analysieren, Umfang priorisieren (MVP), Ressourcen auf kritischen Pfad, Change Request/Lenkungsausschuss informieren (2 P.).")
        ],
        loesung: "<p>Vorwärts: A 0–2, B 2–6, C 2–5, D 6–11, E 5–7, F 11–14 → <b>14 Wochen</b>; kritischer Pfad <b>A–B–D–F</b>; C: SAZ 6 − FAZ 2 = <b>4</b>.</p><p>d) 96 / 110 ≈ <b>0,873</b> · e) 96 / 120 = <b>0,8</b> · f) 240 / 0,873 ≈ <b>275 T€</b> · g) z. B. Lenkungsausschuss informieren, Umfang des Pilots priorisieren, Ursachen der Mehrkosten klären.</p>" },

      { titel: "Rechtliche Einordnung", text: "<p>Das System weist Technikern Aufträge zu und nutzt dabei auch ihre bisherige Bearbeitungsdauer.</p>",
        teile: [
          t("a", "a) Was ist datenschutzrechtlich beim US-Cloud-Anbieter zu regeln?", 5, "AV-Vertrag nach Art. 28 (1 P.), Drittlandtransfer: Angemessenheitsbeschluss/DPF oder Standardvertragsklauseln (1 P.), kein Training mit Unternehmensdaten (1 P.), TOM/Speicherort/Löschung (1 P.), Rechtsgrundlage und Information der Beschäftigten bzw. Kunden (1 P.)."),
          w("b", "b) Wie ist die Auftragszuweisung nach der EU-KI-Verordnung einzustufen?", 2, ["Hochrisiko (Anhang III: Zuweisung von Aufgaben und Leistungsbewertung im Beschäftigungsverhältnis)", "minimales Risiko", "verbotene Praxis", "nur Transparenzpflicht"], 0),
          t("c", "c) Nennen Sie drei Pflichten der GmbH als Betreiberin.", 3, "Je 1 P.: Nutzung nach Gebrauchsanweisung, menschliche Aufsicht durch geschulte Personen, geeignete Eingabedaten, Überwachung/Meldung, Protokolle ≥ 6 Monate, Information der Beschäftigten und ihrer Vertretung."),
          t("d", "d) Welche Rechte hat der Betriebsrat?", 4, "Mitbestimmung § 87 Abs. 1 Nr. 6 (Überwachungseignung) (2 P.), Unterrichtung/Beratung § 90 (1 P.), Sachverständiger § 80 Abs. 3 (1 P.)."),
          w("e", "e) Der US-Anbieter stellt die Leistung ohne Umsatzsteuer in Rechnung. Was gilt?", 2, ["Reverse Charge: Die GmbH schuldet die Umsatzsteuer und zieht sie als Vorsteuer ab", "Es fällt keinerlei Umsatzsteuer an", "Der Anbieter muss deutsche Gewerbesteuer zahlen", "Die GmbH zahlt 19 % ohne Vorsteuerabzug"], 0)
        ],
        loesung: "<p>a) AV-Vertrag, Drittlandtransfer (DPF oder Standardvertragsklauseln), kein Training mit eigenen Daten, Speicherort und Löschung, Rechtsgrundlage und Information.</p><p>b) Hochrisiko nach Anhang III (Beschäftigung: Zuweisung von Aufgaben, Leistungsbewertung), Pflichten ab 2.12.2027.</p><p>c) z. B. Gebrauchsanweisung befolgen, menschliche Aufsicht, Protokolle aufbewahren, Beschäftigte informieren.</p><p>d) § 87 Abs. 1 Nr. 6, § 90, § 80 Abs. 3 BetrVG. · e) Reverse Charge nach § 13b UStG.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Investition 150.000 €. Jährliche Einsparung (weniger Wiederholungseinsätze, weniger Lagerbestand) 70.000 €, laufende Kosten 20.000 €. Nutzungsdauer 4 Jahre, Kalkulationszins 8 % (Rentenbarwertfaktor 3,3121).</p>",
        teile: [
          z("a", "a) Jährlicher Rückfluss", 2, 50000, 0, "€"),
          z("b", "b) Statische Amortisationszeit", 3, 3, 0.01, "Jahre"),
          z("c", "c) Kapitalwert", 4, 15606, 5, "€"),
          w("d", "d) Lohnt sich die Investition bei 8 %?", 2, ["ja", "nein"], 0),
          z("e", "e) Kritischer jährlicher Rückfluss, bei dem der Kapitalwert null ist", 3, 45288, 5, "€"),
          t("f", "f) Nennen Sie einen Nachhaltigkeitsaspekt, den Sie in die Bewertung aufnehmen.", 2, "Z. B. weniger Fahrten durch weniger Wiederholungseinsätze (CO₂), Energiebedarf der Cloud, Arbeitsbedingungen der Techniker (2 P.).")
        ],
        loesung: "<p>a) 70.000 − 20.000 = <b>50.000 €</b> · b) 150.000 / 50.000 = <b>3 Jahre</b> · c) 50.000 · 3,3121 − 150.000 ≈ <b>+15.606 €</b> · d) ja · e) 150.000 / 3,3121 ≈ <b>45.288 €</b> – der Rückfluss darf um gut 9 % sinken. · f) z. B. eingesparte Fahrten und CO₂.</p>" },

      { titel: "Personal und Führung", text: "<p>Zwei Disponenten befürchten, überflüssig zu werden; ein erfahrener Techniker verweigert die Nutzung der App.</p>",
        teile: [
          z("a", "a) Nach Einführung werden 3 Disponenten benötigt. Heute sind es 4, einer geht planmäßig in Rente, Zugänge gibt es keine. Wie hoch ist der Nettopersonalbedarf (negativ = Überdeckung)?", 2, 0, 0),
          t("b", "b) Wie begegnen Sie den Befürchtungen der Disponenten?", 4, "Offene Kommunikation, Beteiligung am Projekt (2 P.), Qualifizierung für neue Aufgaben wie Ausnahmesteuerung/Kundenkontakt, Betriebsrat einbinden, Beschäftigungssicherung (2 P.)."),
          w("c", "c) Der Techniker ist fachlich sehr erfahren, aber nicht bereit. Welcher Stil nach Hersey/Blanchard passt?", 2, ["beteiligen/unterstützen", "unterweisen", "delegieren", "laissez-faire"], 0),
          t("d", "d) Wie lösen Sie den Konflikt zwischen Disposition und Technik nach dem Harvard-Konzept?", 4, "Menschen und Problem trennen (1 P.), Interessen klären, z. B. Planbarkeit vs. Handlungsspielraum (1 P.), Optionen entwickeln, z. B. Vorschläge mit Änderungsmöglichkeit (1 P.), neutrale Kriterien wie Fahrzeit, Erstlösungsquote (1 P.).")
        ],
        loesung: "<p>a) 3 − (4 − 1 + 0) = <b>0</b> – die Rente gleicht den Rückgang aus. b) informieren, beteiligen, qualifizieren, Beschäftigung sichern. c) beteiligen/unterstützen (R3). d) Interessen hinter den Positionen klären, Optionen wie „Vorschlag mit Änderungsrecht“, Kriterien vereinbaren.</p>" },

      { titel: "Zukunftskompetenzen", text: "<p>Nach dem Pilot übernehmen Disponenten 97 % der KI-Vorschläge unverändert.</p>",
        teile: [
          t("a", "a) Welches Risiko sehen Sie, und mit welchen zwei Maßnahmen begegnen Sie ihm?", 4, "Automation Bias (2 P.); Maßnahmen je 1 P.: Begründungspflicht, Stichproben, Erklärungen/Unsicherheit anzeigen, Schulung, Abweichungen erwünscht."),
          t("b", "b) Skizzieren Sie die Gliederung einer 10-minütigen Präsentation der Pilotergebnisse für die Geschäftsführung.", 4, "Empfehlung/Kernaussage zuerst, Ausgangslage und Ziel, Vorgehen, Ergebnisse mit Kennzahlen, Wirtschaftlichkeit, Risiken/Recht, Entscheidungsbedarf und nächste Schritte (4 P.)."),
          w("c", "c) Das Projektteam streitet nach dem Start über Zuständigkeiten. Welche Phase nach Tuckman ist das?", 2, ["Storming", "Forming", "Norming", "Performing"], 0)
        ],
        loesung: "<p>a) Automation Bias – Vorschläge werden durchgewunken. Gegenmaßnahmen: Begründungspflicht, Stichproben, Erklärungen anzeigen, Schulung. b) Empfehlung, Ausgangslage, Vorgehen, Ergebnisse, Wirtschaftlichkeit, Risiken, Entscheidungsbedarf. c) Storming.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
