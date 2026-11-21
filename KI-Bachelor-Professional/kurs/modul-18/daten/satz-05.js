/* Bachelor-Prüfungssatz 5 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s05a", satz: 5, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Formen der KI", text: "",
        teile: [
          w("a", "a) Was ist ein klassisches Expertensystem?", 2, ["ein regelbasiertes System mit Wissensbasis und Schlussfolgerungskomponente", "ein neuronales Netz", "ein Clustering-Verfahren", "ein Sprachmodell"], 0),
          t("b", "b) Unterscheiden Sie symbolische und subsymbolische KI.", 4, "Symbolisch: Wissen in Regeln/Symbolen, nachvollziehbar, aufwendig zu pflegen (2 P.); subsymbolisch: Wissen in Gewichten gelernt aus Daten, z. B. neuronale Netze, leistungsfähig, schwerer erklärbar (2 P.)."),
          w("c", "c) Welches Verfahren ist subsymbolisch?", 2, ["neuronales Netz", "Entscheidungstabelle", "Wenn-dann-Regelwerk", "Ontologie"], 0),
          w("d", "d) Was ist ein Beispiel für ein KI-Modell mit allgemeinem Verwendungszweck?", 2, ["ein großes Sprachmodell, das viele Aufgaben erledigen kann", "ein Spamfilter einer Firma", "ein Entscheidungsbaum für Kredite", "eine Ampelsteuerung"], 0)
        ],
        loesung: "<p>a) Regeln plus Wissensbasis · b) symbolisch: explizite Regeln; subsymbolisch: gelernte Gewichte · c) neuronales Netz · d) großes Sprachmodell.</p>" },

      { titel: "Streuung", text: "<p>Liegedauer von fünf Patienten in Tagen: <b>3, 5, 7, 9, 11</b>.</p>",
        teile: [
          z("a", "a) Mittelwert", 2, 7, 0.001),
          z("b", "b) Stichprobenvarianz (Division durch n − 1)", 3, 10, 0.001),
          z("c", "c) Stichprobenstandardabweichung (drei Nachkommastellen)", 3, 3.162, 0.005),
          z("d", "d) Variationskoeffizient in % (zwei Nachkommastellen)", 2, 45.18, 0.1, "%"),
          w("e", "e) Warum teilt man bei der Stichprobenvarianz durch n − 1?", 2, ["um die Varianz der Grundgesamtheit unverzerrt zu schätzen", "weil n zu groß ist", "um Ausreißer zu entfernen", "aus Rundungsgründen"], 0)
        ],
        loesung: "<p>a) 35 / 5 = <b>7</b> · b) (16 + 4 + 0 + 4 + 16) / 4 = <b>10</b> · c) √10 ≈ <b>3,162</b> · d) 3,162 / 7 ≈ <b>45,18 %</b> · e) unverzerrte Schätzung.</p>" },

      { titel: "Naive Bayes", text: "<p>Nachrichten an eine Station werden als „dringend“ oder „normal“ eingestuft. P(dringend) = 0,2 · P(normal) = 0,8. P(„Schmerz“ | dringend) = 0,6 · P(„Schmerz“ | normal) = 0,1 · P(„Fieber“ | dringend) = 0,5 · P(„Fieber“ | normal) = 0,2. Eine Nachricht enthält beide Wörter.</p>",
        teile: [
          z("a", "a) Unnormierter Wert für „dringend“", 2, 0.06, 0.0005),
          z("b", "b) Unnormierter Wert für „normal“", 2, 0.016, 0.0005),
          z("c", "c) Wahrscheinlichkeit „dringend“ in % (zwei Nachkommastellen)", 4, 78.95, 0.1, "%"),
          w("d", "d) Welche Annahme macht Naive Bayes?", 2, ["Merkmale sind bei gegebener Klasse unabhängig", "alle Klassen sind gleich häufig", "die Daten sind normalverteilt", "es gibt nur ein Merkmal"], 0),
          w("e", "e) Welche Klasse wird vorhergesagt?", 2, ["dringend", "normal"], 0)
        ],
        loesung: "<p>a) 0,2 · 0,6 · 0,5 = <b>0,06</b> · b) 0,8 · 0,1 · 0,2 = <b>0,016</b> · c) 0,06 / 0,076 ≈ <b>78,95 %</b> · d) bedingte Unabhängigkeit · e) dringend.</p>" },

      { titel: "Datenaufbereitung", text: "",
        teile: [
          t("a", "a) In den Daten taucht eine Körpertemperatur von 98 auf. Wie gehen Sie vor?", 4, "Ursache prüfen: vermutlich Fahrenheit statt Celsius (2 P.); Einheit vereinheitlichen bzw. umrechnen (36,7 °C) oder als fehlerhaft markieren, Plausibilitätsregel einführen (2 P.)."),
          w("b", "b) Welche Imputation ist bei schiefer Verteilung robuster?", 2, ["Median", "Mittelwert", "Maximum", "Null"], 0),
          w("c", "c) Was ist Data Augmentation?", 2, ["künstliches Erweitern der Trainingsdaten, z. B. durch Drehen von Bildern", "Löschen von Ausreißern", "Verschlüsseln", "Komprimieren"], 0),
          w("d", "d) Wann passt man einen Skalierer an?", 2, ["nach der Aufteilung, nur auf den Trainingsdaten", "vor der Aufteilung auf allen Daten", "nur auf den Testdaten", "nie"], 0)
        ],
        loesung: "<p>a) Einheitenfehler (Fahrenheit) erkennen, umrechnen oder markieren, Plausibilitätsprüfung · b) Median · c) künstliche Erweiterung · d) nur auf Trainingsdaten.</p>" },

      { titel: "SQL mit Join", text: "<p>Tabellen <code>patienten(pid, geburtsjahr, station)</code> und <code>aufenthalte(aid, pid, aufnahme, entlassung, diagnose)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die die Anzahl der Aufenthalte je Station mit Aufnahme im Jahr 2026 liefert.", 6, "SELECT p.station, COUNT(*) (1 P.) FROM aufenthalte a JOIN patienten p ON a.pid = p.pid (2 P.) WHERE a.aufnahme >= '2026-01-01' AND a.aufnahme < '2027-01-01' bzw. YEAR(...) = 2026 (2 P.) GROUP BY p.station (1 P.)."),
          w("b", "b) Welcher Join liefert auch Patienten ohne Aufenthalt?", 2, ["LEFT JOIN von patienten auf aufenthalte", "INNER JOIN", "CROSS JOIN", "SELF JOIN"], 0),
          w("c", "c) Welche Rolle hat pid in der Tabelle aufenthalte?", 2, ["Fremdschlüssel auf patienten", "Primärschlüssel von aufenthalte", "Index ohne Bedeutung", "berechnetes Feld"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT p.station, COUNT(*) AS anzahl\nFROM aufenthalte a\nJOIN patienten p ON a.pid = p.pid\nWHERE a.aufnahme &gt;= '2026-01-01' AND a.aufnahme &lt; '2027-01-01'\nGROUP BY p.station;</pre><p>b) LEFT JOIN · c) Fremdschlüssel.</p>" },

      { titel: "Diagnostische Kennzahlen", text: "<p>Ein KI-Screening an 1.000 Personen, davon 100 erkrankt: TP = 90, FN = 10, FP = 45, TN = 855. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Sensitivität", 2, 90, 0.1, "%"),
          z("b", "b) Spezifität", 2, 95, 0.1, "%"),
          z("c", "c) Positiver Vorhersagewert", 2, 66.67, 0.1, "%"),
          z("d", "d) Negativer Vorhersagewert", 2, 98.84, 0.1, "%"),
          w("e", "e) Welche Kennzahl ist bei einem Screening auf eine schwere Erkrankung meist vorrangig?", 2, ["Sensitivität", "Spezifität", "Accuracy", "Precision allein"], 0),
          t("f", "f) Wovon hängt der positive Vorhersagewert zusätzlich ab?", 2, "Von der Prävalenz/Basisrate der Erkrankung in der untersuchten Gruppe (2 P.).")
        ],
        loesung: "<p>a) 90 / 100 = <b>90 %</b> · b) 855 / 900 = <b>95 %</b> · c) 90 / 135 ≈ <b>66,67 %</b> · d) 855 / 865 ≈ <b>98,84 %</b> · e) Sensitivität · f) Prävalenz.</p>" },

      { titel: "Generalisierung", text: "",
        teile: [
          w("a", "a) Die Lernkurve zeigt: Trainingsfehler niedrig, Validierungsfehler hoch, der Abstand sinkt mit mehr Daten. Was hilft vermutlich?", 2, ["mehr Trainingsdaten", "weniger Daten", "höhere Lernrate", "mehr Merkmale ohne Prüfung"], 0),
          t("b", "b) Erklären Sie das Bias-Varianz-Dilemma.", 4, "Bias: Fehler durch zu einfache Annahmen, Underfitting (1,5 P.); Varianz: Empfindlichkeit gegenüber Trainingsdaten, Overfitting (1,5 P.); mehr Komplexität senkt Bias, erhöht Varianz – Optimum suchen (1 P.)."),
          w("c", "c) Wofür nutzt man die Validierungsdaten?", 2, ["Modelle und Hyperparameter vergleichen", "die endgültige Güte berichten", "das Modell trainieren", "Daten bereinigen"], 0),
          w("d", "d) Training und Validierung sind beide schlecht. Was liegt vor?", 2, ["Underfitting", "Overfitting", "Data Leakage", "perfektes Modell"], 0)
        ],
        loesung: "<p>a) mehr Daten · b) Zielkonflikt zwischen zu einfachen und zu flexiblen Modellen · c) Modellwahl · d) Underfitting.</p>" },

      { titel: "Python mit Texten", text: "<pre class=\"code\">diagnosen = [\"Grippe\", \"Fraktur\", \"grippe\", \"Migräne\", \"Grippe\"]\nnorm = [d.lower() for d in diagnosen]\nprint(norm.count(\"grippe\"))\nprint(len(set(norm)))\nprint(sorted(set(norm))[0])</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 3, 0),
          z("b", "b) Zweite Ausgabe", 3, 3, 0),
          w("c", "c) Dritte Ausgabe", 2, ["fraktur", "grippe", "migräne", "Fraktur"], 0),
          w("d", "d) Wozu dient set() hier?", 2, ["doppelte Einträge entfernen", "sortieren", "zählen", "in Großbuchstaben umwandeln"], 0)
        ],
        loesung: "<p>a) <b>3</b> · b) {grippe, fraktur, migräne} → <b>3</b> · c) alphabetisch zuerst: <b>fraktur</b> · d) Dubletten entfernen.</p>" },

      { titel: "Recht im Gesundheitswesen", text: "",
        teile: [
          w("a", "a) Diagnosen sind …", 2, ["Gesundheitsdaten nach Art. 9 DSGVO", "Stammdaten ohne Schutz", "anonyme Daten", "öffentliche Daten"], 0),
          w("b", "b) Auf welche Ausnahme stützt ein Krankenhaus die Verarbeitung zur Behandlung?", 2, ["Gesundheitsversorgung und Behandlung (Art. 9 Abs. 2 lit. h)", "berechtigtes Interesse allein", "Direktwerbung", "keine nötig"], 0),
          w("c", "c) KI-Software, die Diagnosen stellt, ist in der Regel …", 2, ["ein Medizinprodukt und damit Hochrisiko-KI über Anhang I", "minimales Risiko", "verboten", "kein Produkt"], 0),
          t("d", "d) Nennen Sie zwei Gründe, warum eine Datenschutz-Folgenabschätzung für ein KI-Projekt mit Patientendaten nötig ist.", 4, "Je 2 P.: umfangreiche Verarbeitung besonderer Kategorien, neue Technologie/KI, systematische Bewertung von Personen, hohes Risiko für Betroffene."),
          w("e", "e) Welche Vorschrift ist bei der Einbindung externer IT-Dienstleister zusätzlich zu beachten?", 2, ["die ärztliche Schweigepflicht (§ 203 StGB) mit Verpflichtung der Dienstleister", "das Ladenschlussgesetz", "das Mindestlohngesetz allein", "keine"], 0),
          w("f", "f) Ein Patient verlangt Auskunft über seine Daten. Regelfrist?", 2, ["ein Monat", "eine Woche", "drei Monate", "ein Jahr"], 0)
        ],
        loesung: "<p>a) Gesundheitsdaten · b) Art. 9 Abs. 2 lit. h · c) Medizinprodukt, Hochrisiko über Anhang I · d) besondere Kategorien in großem Umfang, neue Technologie · e) Schweigepflicht · f) ein Monat.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s05b", satz: 5, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Vorhersagewerte und Prävalenz", text: "<p>Ein KI-Test hat eine Sensitivität von 95 % und eine Spezifität von 90 %. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Positiver Vorhersagewert bei einer Prävalenz von 2 %", 4, 16.24, 0.1, "%"),
          z("b", "b) Positiver Vorhersagewert bei einer Prävalenz von 20 %", 4, 70.37, 0.1, "%"),
          t("c", "c) Was folgt daraus für den Einsatz des Tests?", 4, "Bei niedriger Prävalenz sind die meisten positiven Ergebnisse falsch (2 P.); Einsatz in vorselektierten Gruppen oder mit Bestätigungstest, Ergebnisse vorsichtig kommunizieren (2 P.).")
        ],
        loesung: "<p>a) 0,95 · 0,02 / (0,019 + 0,1 · 0,98) = 0,019 / 0,117 ≈ <b>16,24 %</b> · b) 0,19 / (0,19 + 0,08) ≈ <b>70,37 %</b> · c) In der Breite viele Fehlalarme; Vorselektion oder Bestätigung nötig.</p>" },

      { titel: "Transfer Learning für Röntgenbilder", text: "<p>Für eine Klassifikation in drei Klassen liegen nur 2.000 gekennzeichnete Röntgenbilder vor.</p>",
        teile: [
          t("a", "a) Erklären Sie, wie Transfer Learning hier hilft.", 4, "Vortrainiertes Netz (z. B. auf großen Bilddatensätzen) liefert allgemeine Bildmerkmale (2 P.); nur obere Schichten neu trainieren bzw. feinjustieren, weniger Daten nötig (2 P.)."),
          w("b", "b) Was bedeutet „Schichten einfrieren“?", 2, ["ihre Gewichte werden beim Training nicht verändert", "sie werden gelöscht", "sie werden verdoppelt", "ihre Lernrate wird erhöht"], 0),
          z("c", "c) Die neue Ausgabeschicht verbindet 2.048 Merkmale vollständig mit 3 Klassen. Anzahl Parameter", 3, 6147, 0),
          w("d", "d) Welche Datenerweiterung ist bei Röntgenbildern sinnvoll?", 3, ["kleine Drehungen und Helligkeitsänderungen; keine Spiegelung, wenn links/rechts medizinisch bedeutsam ist", "beliebige Farbänderungen", "Spiegelung aller Bilder ohne Prüfung", "Bilder zufällig löschen"], 0)
        ],
        loesung: "<p>a) Vortrainierte Merkmale nutzen, nur Kopf trainieren · b) Gewichte fixiert · c) 2.048 · 3 + 3 = <b>6.147</b> · d) medizinisch plausible Erweiterungen.</p>" },

      { titel: "Texte auswerten", text: "<p>Ein Arztbrief hat 100 Wörter, „Pneumonie“ kommt 4-mal vor. Im Korpus von 1.000 Briefen enthalten 10 das Wort. IDF = log₁₀(N / df).</p>",
        teile: [
          z("a", "a) Termhäufigkeit TF", 2, 0.04, 0.0005),
          z("b", "b) IDF", 2, 2, 0.001),
          z("c", "c) TF-IDF", 2, 0.08, 0.0005),
          t("d", "d) Nennen Sie zwei Grenzen von TF-IDF gegenüber Embeddings.", 4, "Je 2 P.: keine Wortreihenfolge/Kontext, keine Bedeutungsähnlichkeit (Synonyme), Verneinungen („keine Pneumonie“) nicht erkannt, sehr viele dünn besetzte Merkmale."),
          w("e", "e) Was leistet Named Entity Recognition?", 2, ["erkennt Einheiten wie Medikamente, Diagnosen oder Personen im Text", "übersetzt Texte", "zählt Wörter", "verschlüsselt Texte"], 0)
        ],
        loesung: "<p>a) 4 / 100 = <b>0,04</b> · b) log₁₀(100) = <b>2</b> · c) <b>0,08</b> · d) kein Kontext, keine Synonyme, Verneinung · e) Erkennung benannter Einheiten.</p>" },

      { titel: "Hierarchisches Clustering", text: "",
        teile: [
          t("a", "a) Wie lesen Sie ein Dendrogramm, und wie bestimmen Sie die Clusterzahl?", 4, "Zeigt schrittweise Verschmelzung, Höhe = Distanz (2 P.); horizontaler Schnitt an großer Lücke ergibt Clusterzahl (2 P.)."),
          w("b", "b) Was bestimmt das Linkage-Verfahren?", 2, ["wie der Abstand zwischen zwei Clustern berechnet wird", "die Anzahl der Merkmale", "die Lernrate", "die Labels"], 0),
          w("c", "c) Patientendaten enthalten Zahlen und Kategorien. Welches Distanzmaß passt?", 2, ["Gower-Distanz", "nur euklidische Distanz auf Rohdaten", "Kosinus auf Text", "keine Distanz nötig"], 0),
          w("d", "d) Wie prüfen Sie, ob Patientencluster sinnvoll sind?", 2, ["mit Fachleuten auf medizinische Plausibilität und Nutzen", "nur über die Anzahl", "gar nicht", "über die Rechenzeit"], 0)
        ],
        loesung: "<p>a) Verschmelzungshöhe lesen, Schnitt an großer Lücke · b) Clusterabstand · c) Gower · d) fachliche Prüfung.</p>" },

      { titel: "Fairness in der Medizin", text: "<p>Ein Modell erkennt eine Erkrankung bei Männern mit einer Sensitivität von 0,90, bei Frauen von 0,78.</p>",
        teile: [
          z("a", "a) Differenz der Sensitivitäten", 2, 0.12, 0.001),
          w("b", "b) Welches Fairnesskriterium ist verletzt?", 2, ["Equal Opportunity (gleiche Trefferquote unter den tatsächlich Kranken)", "Demographic Parity", "Kalibrierung", "keines"], 0),
          t("c", "c) Nennen Sie zwei mögliche Ursachen.", 4, "Je 2 P.: weniger Frauen in den Trainingsdaten, andere Symptomausprägung, Messverfahren auf Männer kalibriert, Labels aus Diagnosen mit Verzerrung."),
          w("d", "d) Welche Maßnahme ist geeignet?", 2, ["Daten ergänzen bzw. gewichten und Leistung je Gruppe überwachen", "Geschlecht einfach löschen und nicht mehr prüfen", "Modell nur bei Männern testen", "nichts tun"], 0)
        ],
        loesung: "<p>a) <b>0,12</b> · b) Equal Opportunity · c) Unterrepräsentation, andere Symptomatik, verzerrte Labels · d) Daten ergänzen, gruppenweise überwachen.</p>" },

      { titel: "Erklärungen für Ärztinnen und Ärzte", text: "",
        teile: [
          t("a", "a) Welche Anforderungen stellen Ärztinnen an Erklärungen einer KI-Empfehlung?", 4, "Bezug zu medizinischen Befunden statt technischer Merkmale (1 P.), Unsicherheit/Konfidenz (1 P.), schnelle Erfassbarkeit im Alltag (1 P.), Hinweis auf Grenzen und Datenbasis (1 P.)."),
          w("b", "b) Welches Verfahren zeigt, welche Bildbereiche eine Vorhersage beeinflusst haben?", 2, ["Grad-CAM (Heatmap)", "k-Means", "TF-IDF", "Lineare Regression"], 0),
          w("c", "c) Warum sollte die Software ihre Unsicherheit anzeigen?", 2, ["damit Menschen unsichere Fälle besonders prüfen", "weil es schöner aussieht", "um Speicher zu sparen", "weil es das Training verkürzt"], 0)
        ],
        loesung: "<p>a) medizinischer Bezug, Unsicherheit, Kürze, Grenzen · b) Grad-CAM · c) unsichere Fälle prüfen.</p>" },

      { titel: "Datenschutzfreundliches Lernen", text: "<p>Drei Kliniken wollen gemeinsam ein Modell trainieren, ohne Patientendaten auszutauschen.</p>",
        teile: [
          t("a", "a) Erklären Sie Federated Learning.", 4, "Modell wird lokal in jeder Klinik trainiert (1,5 P.); nur Modellparameter/Updates werden zentral zusammengeführt (1,5 P.); Rohdaten verlassen das Haus nicht (1 P.)."),
          t("b", "b) Was leistet Differential Privacy?", 4, "Gezieltes Rauschen schützt einzelne Personen (2 P.); Ergebnisse ändern sich kaum, ob eine Person enthalten ist, Datenschutzbudget ε (2 P.)."),
          w("c", "c) Welches Risiko haben synthetische Daten?", 2, ["sie können reale Personen wiedergeben oder Verzerrungen übernehmen", "sie sind immer anonym und perfekt", "sie sind verboten", "sie sind zu klein"], 0),
          w("d", "d) Was bedeutet k-Anonymität?", 2, ["jede Person ist in den Quasi-Identifikatoren von mindestens k−1 anderen nicht unterscheidbar", "k Personen werden gelöscht", "Daten werden k-mal verschlüsselt", "es gibt k Labels"], 0)
        ],
        loesung: "<p>a) Lokales Training, nur Updates werden geteilt · b) Rauschen schützt Einzelne · c) Re-Identifikation, übernommene Verzerrungen · d) Ununterscheidbarkeit in Gruppen ≥ k.</p>" },

      { titel: "Pipelines in scikit-learn", text: "<pre class=\"code\">from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\npipe = Pipeline([(\"scale\", StandardScaler()), (\"clf\", LogisticRegression(C=0.5))])\npipe.fit(X_train, y_train)\nprint(pipe.score(X_test, y_test))</pre>",
        teile: [
          w("a", "a) Was gibt pipe.score für einen Klassifikator standardmäßig aus?", 3, ["Accuracy", "F1-Score", "AUC", "MSE"], 0),
          w("b", "b) Warum verhindert die Pipeline Data Leakage?", 3, ["der Skalierer wird nur beim fit auf den Trainingsdaten angepasst", "sie löscht Testdaten", "sie verschlüsselt Daten", "sie benötigt keine Daten"], 0),
          w("c", "c) Was bewirkt ein kleineres C in der logistischen Regression von scikit-learn?", 3, ["stärkere Regularisierung", "schwächere Regularisierung", "mehr Klassen", "höhere Lernrate"], 0),
          t("d", "d) Wie ergänzen Sie den Code um eine 5-fache Kreuzvalidierung?", 3, "cross_val_score(pipe, X_train, y_train, cv=5, scoring=...) (2 P.), Mittelwert und Streuung der Scores berichten (1 P.).")
        ],
        loesung: "<p>a) Accuracy · b) Skalierer lernt nur auf Trainingsdaten · c) stärkere Regularisierung · d) <code>cross_val_score(pipe, X_train, y_train, cv=5, scoring=\"recall\")</code>.</p>" },

      { titel: "Validierung und Überwachung", text: "",
        teile: [
          t("a", "a) Warum ist eine externe Validierung in einer anderen Klinik wichtig?", 4, "Andere Patienten, Geräte, Abläufe – prüft Übertragbarkeit (2 P.); deckt Overfitting auf Hausbesonderheiten und Bias auf (2 P.)."),
          w("b", "b) Nach dem Austausch der Röntgengeräte sinkt die Modellgüte. Wahrscheinliche Ursache?", 2, ["Data Drift durch andere Bildeigenschaften", "zu viele Ärzte", "zu wenig Speicher", "Datenschutz"], 0),
          t("c", "c) Was gehört zur Überwachung nach Inbetriebnahme (Post-Market-Überwachung)?", 4, "Leistung im Betrieb messen, Fehler und Vorfälle erfassen und melden (2 P.); Rückmeldungen der Anwender, Drift-Monitoring, Korrekturmaßnahmen und Dokumentation (2 P.)."),
          w("d", "d) Was ist ein Rollback?", 2, ["Rückkehr zur vorherigen, bewährten Modellversion", "Löschen aller Daten", "Neustart des Servers", "Verdopplung der Trainingsdaten"], 0)
        ],
        loesung: "<p>a) Übertragbarkeit prüfen · b) Data Drift · c) Leistungsmessung, Vorfälle, Rückmeldungen, Drift, Korrekturen · d) zurück zur Vorversion.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s05t2", satz: 5, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI für Bettenplanung und Arztbriefe", kurz: "Krankenhaus · Planung und Dokumentation", minuten: 240,
    situation: "<p>Das <b>Klinikum Weserbergland gGmbH</b> hat 520 Betten und 1.800 Beschäftigte (Betriebsrat vorhanden). Notaufnahme und Stationen sind häufig überbelegt, Entlassungen werden kurzfristig geplant. Ärztinnen und Ärzte verbringen viel Zeit mit Dokumentation: Jährlich entstehen 25.000 Arztbriefe, die heute diktiert und vom Schreibdienst (12 Kräfte) geschrieben werden.</p><p>Geplant sind (1) eine KI-Prognose der Bettenbelegung für die nächsten sieben Tage und (2) ein Assistent, der aus Diktat und Akte einen Entwurf des Arztbriefs erstellt, den die Ärztin prüft und freigibt. Der Anbieter des Sprachmodells betreibt seine Server in der EU. Sie leiten das Programm.</p>",
    aufgaben: [
      { titel: "Lösungen konzipieren", text: "",
        teile: [
          t("a", "a) Beschreiben Sie das Konzept der Belegungsprognose (Ziel, Daten, Modell, Nutzung).", 6, "Ziel: Belegung je Station für 7 Tage (1 P.); Daten: Aufnahmen, Entlassungen, Liegedauer, OP-Plan, Saison/Grippewellen, Wochentag (2 P.); Modell: Zeitreihen-/Regressionsmodell mit Unsicherheitsband, Baseline (2 P.); Nutzung: Bettenmanagement, Entlassplanung, Personalplanung (1 P.)."),
          z("b", "b) Ist 480, 495, 510 · Prognose 470, 500, 500. MAE (zwei Nachkommastellen)", 3, 8.33, 0.01),
          z("c", "c) Auslastung bei 495 belegten von 520 Betten in % (zwei Nachkommastellen)", 3, 95.19, 0.05, "%"),
          t("d", "d) Nennen Sie zwei Risiken des Arztbrief-Assistenten und je eine Kontrolle.", 4, "Je 2 P.: Halluzinierte Befunde/Medikamente → Abgleich mit Akte, Pflichtfreigabe; falsche Dosierungen → Hervorhebung zur Prüfung; Datenschutz → EU-Server, AV-Vertrag; Automation Bias → Stichproben.")
        ],
        loesung: "<p>a) Belegung je Station für 7 Tage aus Aufnahmen, Entlassungen, OP-Plan, Saison; Modell mit Unsicherheitsband; Nutzung im Bettenmanagement.</p><p>b) (10 + 5 + 10) / 3 ≈ <b>8,33</b> · c) 495 / 520 ≈ <b>95,19 %</b> · d) Halluzinationen → Abgleich und Freigabe; Dosierungen → Hervorhebung.</p>" },

      { titel: "Prozess Arztbrief", text: "<p>Heute 30 Minuten ärztliche Zeit je Brief (Diktat und Korrektur), mit Assistent 12 Minuten. Ärztliche Stunde: 85 €.</p>",
        teile: [
          z("a", "a) Eingesparte ärztliche Stunden pro Jahr", 3, 7500, 0, "h"),
          z("b", "b) Wert dieser Zeit pro Jahr", 2, 637500, 0, "€"),
          t("c", "c) Beschreiben Sie den Soll-Prozess für den Arztbrief.", 5, "Diktat/Spracherkennung und Aktendaten (1 P.); Assistent erstellt Entwurf mit Quellenbezug (1 P.); Ärztin prüft, korrigiert, gibt frei – ohne Freigabe kein Versand (1 P.); Versand an Hausarzt (1 P.); Rückmeldungen zur Verbesserung, Stichprobenaudit (1 P.)."),
          t("d", "d) Nennen Sie zwei Kennzahlen mit Zielwert.", 4, "Je 2 P.: Zeit vom Entlassungstag bis Briefversand, Korrekturaufwand je Brief, Fehlerquote in Audits, ärztliche Dokumentationszeit, Zufriedenheit.")
        ],
        loesung: "<p>a) 25.000 · 18 / 60 = <b>7.500 h</b> · b) 7.500 · 85 = <b>637.500 €</b> · c) Diktat → Entwurf → ärztliche Prüfung und Freigabe → Versand → Audit · d) z. B. Brief am Entlassungstag, Fehlerquote unter 1 %.</p>" },

      { titel: "Projektsteuerung", text: "",
        teile: [
          w("a", "a) Wie lang ist ein Sprint nach dem Scrum Guide höchstens?", 2, ["ein Monat", "eine Woche", "drei Monate", "ein Jahr"], 0),
          t("b", "b) Formulieren Sie eine Definition of Done für ein Inkrement des Arztbrief-Assistenten.", 4, "Je 1 P.: funktional getestet mit Testbriefen, Fehlerquote unter Schwellenwert, Datenschutzprüfung/Freigabe DSB, Dokumentation/Gebrauchsanweisung, Feedback von Ärzten eingeholt."),
          z("c", "c) BAC 800 T€, PV 400 T€, EV 360 T€, AC 420 T€. CPI (drei Nachkommastellen)", 2, 0.857, 0.003),
          z("d", "d) SPI", 2, 0.9, 0.003),
          t("e", "e) Nennen Sie vier Stakeholder mit Einfluss-/Interessen-Einschätzung.", 4, "Je 1 P.: Chefärzte (hoch/hoch), Pflege (mittel/hoch), Datenschutzbeauftragter (hoch/hoch), Betriebsrat (hoch/hoch), Schreibdienst (gering/hoch), Patienten (gering/hoch), Geschäftsführung (hoch/mittel).")
        ],
        loesung: "<p>a) ein Monat · b) Tests, Fehlerquote, Datenschutzfreigabe, Dokumentation, Anwenderfeedback · c) 360 / 420 ≈ <b>0,857</b> · d) 0,9 · e) z. B. Chefärzte, DSB, Betriebsrat eng einbinden; Schreibdienst informieren und beteiligen.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Einstufung der Belegungsprognose nach der KI-Verordnung", 2, ["kein Hochrisiko (keine Anhang-III-Anwendung, kein Medizinprodukt)", "Hochrisiko", "verboten", "nur GPAI"], 0),
          w("b", "b) Ist der Arztbrief-Assistent ein Medizinprodukt?", 2, ["in der Regel nein, solange er nur dokumentiert und keine Diagnose- oder Therapieentscheidung trifft", "immer ja", "nur bei mehr als 100 Betten", "ja, weil er im Krankenhaus läuft"], 0),
          t("c", "c) Welche datenschutz- und berufsrechtlichen Punkte sind beim Arztbrief-Assistenten zu klären?", 6, "Art. 9 Abs. 2 lit. h (1 P.); AV-Vertrag, EU-Server, kein Training mit Patientendaten (2 P.); Schweigepflicht § 203 StGB: Dienstleister verpflichten (1 P.); DSFA (1 P.); TOM, Löschung, Protokollierung (1 P.)."),
          t("d", "d) Wer trägt die Verantwortung für den Inhalt des Arztbriefs, und was folgt daraus?", 4, "Die freigebende Ärztin bzw. der Arzt (2 P.); Pflicht zur sorgfältigen Prüfung, Freigabe dokumentieren, Schulung zu Grenzen der KI (2 P.)."),
          w("e", "e) Welches Recht hat der Betriebsrat bei Einführung des Assistenten?", 2, ["Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG", "keines", "nur bei Kündigungen", "Zustimmung nach § 99"], 0),
          w("f", "f) Wie haften die Gesellschafter einer gGmbH für deren Schulden?", 2, ["nicht persönlich, nur das Gesellschaftsvermögen haftet", "unbeschränkt persönlich", "bis zur doppelten Einlage", "wie Kommanditisten"], 0)
        ],
        loesung: "<p>a) kein Hochrisiko · b) in der Regel kein Medizinprodukt · c) Art. 9, AV-Vertrag, EU-Server, Schweigepflicht, DSFA, TOM · d) die freigebende Ärztin; sorgfältige Prüfung · e) § 87 Abs. 1 Nr. 6 · f) beschränkte Haftung.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Vorsichtige Annahme: Nur 50 % der eingesparten ärztlichen Zeit werden wirtschaftlich wirksam. Laufende Kosten 120.000 € pro Jahr, Investition 400.000 €, Nutzungsdauer 4 Jahre, Zins 6 % (Rentenbarwertfaktor 3,4651).</p>",
        teile: [
          z("a", "a) Jährlicher Rückfluss", 3, 198750, 0, "€"),
          z("b", "b) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 3, 2.01, 0.01, "Jahre"),
          z("c", "c) Kapitalwert", 4, 288690, 10, "€"),
          t("d", "d) Nennen Sie zwei nicht-monetäre Nutzen.", 2, "Z. B. schnellere Briefe für Weiterbehandlung/Patientensicherheit, Entlastung und Zufriedenheit der Ärzte, weniger Überstunden (2 P.)."),
          w("e", "e) Welches Verfahren eignet sich, wenn Patientensicherheit mitbewertet werden soll?", 2, ["Nutzwertanalyse bzw. Kosten-Wirksamkeits-Analyse", "nur Kostenvergleich", "nur Amortisationsrechnung", "keines"], 0)
        ],
        loesung: "<p>a) 0,5 · 637.500 − 120.000 = <b>198.750 €</b> · b) 400.000 / 198.750 ≈ <b>2,01 Jahre</b> · c) 198.750 · 3,4651 − 400.000 ≈ <b>288.690 €</b> · d) Patientensicherheit, Entlastung · e) Nutzwert- bzw. Kosten-Wirksamkeits-Analyse.</p>" },

      { titel: "Personal", text: "<p>Für den Schreibdienst werden künftig 7 statt 12 Kräfte gebraucht; 2 gehen im nächsten Jahr in Rente, Zugänge gibt es keine.</p>",
        teile: [
          z("a", "a) Nettopersonalbedarf (negativ = Überdeckung)", 2, -3, 0),
          t("b", "b) Wie gehen Sie mit der Überdeckung um?", 4, "Weiterqualifizierung z. B. zur medizinischen Dokumentation/Kodierung, Qualitätskontrolle der KI-Briefe (2 P.); interne Versetzung, Teilzeit/Altersteilzeit freiwillig, Betriebsrat einbinden, Kündigung nur als letztes Mittel (2 P.)."),
          w("c", "c) Was gilt für die Kündigung schwerbehinderter Beschäftigter?", 2, ["vorherige Zustimmung des Integrationsamts nötig", "keine Besonderheit", "nur mündlich möglich", "nur in der Probezeit"], 0),
          t("d", "d) Wie motivieren Sie Ärztinnen zur Nutzung des Assistenten im Sinne von Herzberg?", 4, "Motivatoren: mehr Zeit für Patienten, Mitgestaltung, Anerkennung, Verantwortung (2 P.); Hygienefaktoren sichern: funktionierende Technik, kein Mehraufwand, keine Leistungskontrolle (2 P.).")
        ],
        loesung: "<p>a) 7 − (12 − 2 + 0) = <b>−3</b> · b) Qualifizierung, Versetzung, freiwillige Lösungen, Betriebsrat · c) Zustimmung des Integrationsamts · d) Sinn und Mitgestaltung betonen, Hygienefaktoren sichern.</p>" },

      { titel: "Zukunftskompetenzen", text: "<p>Im Projektteam arbeiten Ärzte, Pflege, IT und Datenschutz zusammen. Eine Oberärztin schreibt verärgert: „Die IT versteht unseren Alltag nicht!“</p>",
        teile: [
          t("a", "a) Wie fördern Sie die Zusammenarbeit in diesem interdisziplinären Team?", 4, "Gemeinsames Ziel und Patientennutzen (1 P.), Glossar der Fachbegriffe (1 P.), Hospitation der IT auf Station (1 P.), Übersetzer-Rolle/Product Owner aus Medizin (1 P.)."),
          t("b", "b) Antworten Sie der Oberärztin nach den Schritten der gewaltfreien Kommunikation.", 4, "Beobachtung (1 P.), Gefühl (1 P.), Bedürfnis (1 P.), Bitte z. B. um gemeinsame Hospitation (1 P.)."),
          w("c", "c) Das Team diskutiert erstmals offen über Zuständigkeiten und Konflikte. Phase nach Tuckman?", 2, ["Storming", "Forming", "Performing", "Adjourning"], 0),
          w("d", "d) 20 % der Briefarten verursachen 80 % der Korrekturen. Welches Prinzip nutzen Sie zur Priorisierung?", 2, ["Pareto-Prinzip", "Johari-Fenster", "Lewin", "Hofstede"], 0)
        ],
        loesung: "<p>a) gemeinsames Ziel, Glossar, Hospitation, Übersetzerrolle · b) z. B. „Sie schreiben, dass die Vorschläge nicht zum Stationsalltag passen. Das beunruhigt mich, weil uns Ihre Praxis wichtig ist. Würden Sie uns nächste Woche zwei Stunden Hospitation ermöglichen?“ · c) Storming · d) Pareto.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
