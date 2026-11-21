/* Prüfungssatz 4 */
(function (z, w, t) {
  var GEB = ["Computer Vision", "Verarbeitung natürlicher Sprache (NLP)", "Empfehlungssystem", "Robotik"];
  var DT = ["strukturiert", "semistrukturiert", "unstrukturiert"];
  window.PRUEFUNGEN.push({
    id: "s04t1", satz: 4, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Teilgebiete der KI", text: "<p>Ordnen Sie die Anwendungen dem passenden Teilgebiet zu.</p>",
        teile: [
          w("a", "1) Automatisches Lesen von Kfz-Kennzeichen an der Schranke", 2, GEB, 0),
          w("b", "2) Zusammenfassen von Kundenmails", 2, GEB, 1),
          w("c", "3) „Kunden, die das kauften, kauften auch …“", 2, GEB, 2),
          w("d", "4) Ein fahrerloses Transportfahrzeug weicht Hindernissen aus", 2, GEB, 3),
          t("e", "e) Nennen Sie eine Grenze heutiger KI-Systeme.", 2, "Z. B. kein echtes Verständnis/kein gesunder Menschenverstand, abhängig von Datenqualität, schlechte Übertragbarkeit auf neue Situationen, Halluzinationen, fehlende Erklärbarkeit (2 P.).")
        ],
        loesung: "<p>1) Computer Vision · 2) NLP · 3) Empfehlungssystem · 4) Robotik.</p><p>e) z. B.: KI versteht nicht im menschlichen Sinn, versagt bei Situationen außerhalb der Trainingsdaten und kann überzeugend falsche Antworten geben.</p>" },

      { titel: "Datenarten", text: "<p>Ordnen Sie zu.</p>",
        teile: [
          w("a", "1) Kundentabelle in einer SQL-Datenbank", 2, DT, 0),
          w("b", "2) Bestellung im JSON-Format", 2, DT, 1),
          w("c", "3) Text einer Kundenbeschwerde", 2, DT, 2),
          w("d", "4) Foto eines Bauteils", 2, DT, 2),
          w("e", "e) Was ist ein Data Lake?", 2, ["Ein Speicher für große Mengen roher Daten in beliebigem Format", "Eine einzelne Excel-Tabelle", "Ein Verfahren zur Datenlöschung", "Ein Kühlsystem für Rechenzentren"], 0)
        ],
        loesung: "<p>1) strukturiert · 2) semistrukturiert (Felder mit Namen, aber flexible Struktur) · 3) unstrukturiert · 4) unstrukturiert · e) Zentraler Speicher für Rohdaten aller Formate, die erst bei der Nutzung strukturiert werden (im Gegensatz zum Data Warehouse mit festem Schema).</p>" },

      { titel: "Normalverteilung", text: "<p>Die Füllmenge einer Abfüllanlage ist normalverteilt mit Mittelwert 100 ml und Standardabweichung 15 ml.</p>",
        teile: [
          z("a", "a) z-Wert einer Flasche mit 130 ml", 2, 2, 0.001),
          w("b", "b) Etwa welcher Anteil liegt zwischen 85 und 115 ml?", 3, ["rund 68 %", "rund 50 %", "rund 95 %", "rund 99,7 %"], 0),
          w("c", "c) Etwa welcher Anteil liegt über 130 ml?", 2, ["rund 2,3 %", "rund 16 %", "rund 5 %", "rund 0,1 %"], 0),
          t("d", "d) Beschreiben Sie zwei Methoden, Ausreißer zu erkennen.", 3, "Je 1,5 P.: z-Wert (|z| > 3); IQR-Regel (außerhalb Q1 − 1,5·IQR bzw. Q3 + 1,5·IQR); Boxplot/Visualisierung; fachliche Plausibilitätsgrenzen; Isolation Forest.")
        ],
        loesung: "<p>a) (130 − 100) / 15 = <b>2</b> · b) ±1 σ: rund <b>68 %</b> · c) ±2 σ umfassen rund 95 %, oberhalb also rund 2,5 % (genau 2,3 %).</p><p>d) z-Wert-Regel (Abstand von mehr als drei Standardabweichungen), IQR-Regel bzw. Boxplot, fachliche Grenzen.</p>" },

      { titel: "Datenaufteilung und Leakage", text: "",
        teile: [
          t("a", "a) Was ist Data Leakage? Geben Sie ein Beispiel.", 4, "Informationen gelangen ins Training, die zum Vorhersagezeitpunkt nicht verfügbar sind oder aus den Testdaten stammen; Güte wird überschätzt (2 P.). Beispiel (2 P.): Merkmal „Mahnung verschickt“ zur Zahlungsausfallprognose; Skalierung auf allen Daten; Dubletten in Training und Test."),
          w("b", "b) Wie wenden Sie einen StandardScaler korrekt an?", 3, ["fit nur auf den Trainingsdaten, transform auf Training und Test", "fit auf allen Daten vor der Aufteilung", "fit nur auf den Testdaten", "Skalierung ist bei Testdaten verboten"], 0),
          w("c", "c) Was bedeutet eine stratifizierte Aufteilung?", 3, ["Die Klassenanteile bleiben in Training und Test gleich", "Die Daten werden nach Datum sortiert", "Jede Klasse kommt nur im Test vor", "Es werden nur gleich große Klassen verwendet"], 0)
        ],
        loesung: "<p>a) Information „aus der Zukunft“ oder aus den Testdaten gelangt ins Training; das Modell wirkt im Test besser, als es im Einsatz ist. Beispiel: „Mahnung verschickt“ als Merkmal für Zahlungsausfall.</p><p>b) Mittelwert und Standardabweichung nur aus den Trainingsdaten lernen, dann beide Datensätze damit transformieren. c) Klassenanteile bleiben in allen Teilen gleich – wichtig bei seltenen Klassen.</p>" },

      { titel: "SQL mit JOIN", text: "<p>Tabellen <code>produkte(produkt_id, name, kategorie)</code> und <code>verkaeufe(verkauf_id, produkt_id, menge, datum)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die für das Jahr 2025 die verkaufte Menge je Kategorie ermittelt, absteigend sortiert.", 6, "SELECT p.kategorie, SUM(v.menge) (1 P.) FROM verkaeufe v JOIN produkte p ON v.produkt_id = p.produkt_id (2 P.) WHERE datum zwischen 2025-01-01 und 2025-12-31 bzw. YEAR(datum) = 2025 (1 P.) GROUP BY p.kategorie (1 P.) ORDER BY SUM DESC (1 P.)."),
          w("b", "b) Mit welchem JOIN finden Sie Produkte, die nie verkauft wurden?", 2, ["LEFT JOIN von produkte auf verkaeufe und WHERE verkauf_id IS NULL", "INNER JOIN", "CROSS JOIN", "Das geht in SQL nicht"], 0),
          w("c", "c) Wie prüft man in SQL auf einen fehlenden Wert?", 2, ["spalte IS NULL", "spalte = NULL", "spalte == ''", "NULL(spalte)"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT p.kategorie, SUM(v.menge) AS menge\nFROM verkaeufe v\nJOIN produkte p ON v.produkt_id = p.produkt_id\nWHERE v.datum &gt;= '2025-01-01' AND v.datum &lt; '2026-01-01'\nGROUP BY p.kategorie\nORDER BY menge DESC;</pre><p>b) LEFT JOIN, dann Zeilen ohne Verkauf mit <code>IS NULL</code> filtern. c) <code>IS NULL</code> – ein Vergleich mit = NULL ist nie wahr.</p>" },

      { titel: "Weitere Kennzahlen", text: "",
        teile: [
          z("a", "a) Ein Modell mit drei Klassen hat die Recall-Werte 0,9; 0,6 und 0,75. Wie hoch ist der Macro-Recall?", 3, 0.75, 0.001),
          z("b", "b) Spezifität bei TN = 90 und FP = 10 (in %)", 3, 90, 0.1, "%"),
          w("c", "c) Ein Modell hat eine ROC-AUC von 0,5. Was bedeutet das?", 2, ["Es trennt die Klassen nicht besser als Zufall", "Es ist perfekt", "Es ist zu 50 % schneller", "Die Hälfte der Daten fehlt"], 0),
          t("d", "d) Wann ist eine Macro-Mittelung sinnvoller als eine Micro-Mittelung?", 2, "Wenn seltene Klassen gleich wichtig sind wie häufige; Macro gewichtet jede Klasse gleich, Micro wird von großen Klassen dominiert (2 P.).")
        ],
        loesung: "<p>a) (0,9 + 0,6 + 0,75) / 3 = <b>0,75</b> · b) TN / (TN + FP) = 90 / 100 = <b>90 %</b> · c) Kein Trennvermögen – wie Münzwurf.</p><p>d) Bei unausgewogenen Klassen, wenn die Leistung auf seltenen Klassen genauso zählt.</p>" },

      { titel: "Bias und Varianz", text: "",
        teile: [
          w("a", "a) Ein Modell mit hohem Bias …", 2, ["ist zu einfach und unterangepasst (Underfitting)", "ist überangepasst", "ist immer fair", "hat zu viele Parameter"], 0),
          t("b", "b) In der Lernkurve sind Trainings- und Validierungsfehler beide hoch und liegen nah beieinander. Was schließen Sie, und was tun Sie?", 4, "Underfitting/hoher Bias (2 P.); komplexeres Modell, mehr/bessere Merkmale, weniger Regularisierung, länger trainieren (2 P.). Mehr Daten allein helfen kaum."),
          w("c", "c) Was bewirkt L2-Regularisierung?", 2, ["Sie bestraft große Gewichte und verringert so Overfitting", "Sie erhöht die Zahl der Merkmale", "Sie entfernt fehlende Werte", "Sie beschleunigt die Datenbank"], 0),
          w("d", "d) Welches ist ein Hyperparameter?", 2, ["Die maximale Tiefe eines Entscheidungsbaums", "Ein gelerntes Gewicht", "Ein Wert im Datensatz", "Die Vorhersage"], 0)
        ],
        loesung: "<p>a) Underfitting. b) Underfitting: Das Modell ist zu einfach. Abhilfe: komplexeres Modell, bessere Merkmale, weniger Regularisierung. c) Große Gewichte werden bestraft, das Modell wird glatter. d) Maximale Baumtiefe (wird vor dem Training festgelegt).</p>" },

      { titel: "Python", text: "<pre class=\"code\">s = \"KI-Kurs\"\nprint(len(s))\nprint(s.lower().replace(\"-\", \" \"))\n\nn = 0\nwhile n &lt; 10:\n    n += 3\nprint(n)</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung", 3, 7, 0.001),
          w("b", "b) Ausgabe der zweiten print-Anweisung", 3, ["ki kurs", "KI Kurs", "ki-kurs", "kikurs"], 0),
          z("c", "c) Ausgabe der dritten print-Anweisung", 4, 12, 0.001)
        ],
        loesung: "<p>a) 7 Zeichen · b) <b>ki kurs</b> · c) n durchläuft 3, 6, 9, 12; bei 12 endet die Schleife → <b>12</b>.</p>" },

      { titel: "Training neuronaler Netze", text: "<p>Ein Netz wird mit 12.000 Trainingsbeispielen und einer Batchgröße von 100 trainiert.</p>",
        teile: [
          z("a", "a) Gewichtsaktualisierungen pro Epoche", 3, 120, 0.001),
          z("b", "b) Aktualisierungen in 10 Epochen", 2, 1200, 0.001),
          w("c", "c) Was liefert eine Softmax-Ausgabeschicht?", 2, ["Wahrscheinlichkeiten für alle Klassen, die sich zu 1 addieren", "Nur 0 oder 1", "Eine einzige Zahl ohne Bedeutung", "Die Lernrate"], 0),
          t("d", "d) Erklären Sie Dropout.", 3, "Während des Trainings werden zufällig Neuronen vorübergehend abgeschaltet (1,5 P.); das Netz kann sich nicht auf einzelne Neuronen verlassen, Overfitting sinkt (1,5 P.).")
        ],
        loesung: "<p>a) 12.000 / 100 = <b>120</b> · b) 120 · 10 = <b>1.200</b> · c) Wahrscheinlichkeitsverteilung über die Klassen · d) Zufälliges Abschalten von Neuronen im Training als Regularisierung gegen Overfitting.</p>" },

      { titel: "Vertrauenswürdige KI", text: "",
        teile: [
          t("a", "a) Nennen und erläutern Sie zwei Anforderungen der EU-Leitlinien für vertrauenswürdige KI.", 4, "Je 2 P.: menschliches Handeln und Aufsicht; technische Robustheit und Sicherheit; Datenschutz und Datenqualität; Transparenz; Vielfalt, Nichtdiskriminierung, Fairness; gesellschaftliches und ökologisches Wohlergehen; Rechenschaftspflicht."),
          w("b", "b) Was ist „Automation Bias“?", 2, ["Menschen vertrauen automatischen Vorschlägen zu sehr und prüfen sie nicht mehr kritisch", "Ein Fehler im Trainingsdatensatz", "Eine Verzerrung durch zu wenig Rechenleistung", "Ein Begriff aus der Robotik für Kalibrierfehler"], 0),
          w("c", "c) Wofür wird SHAP verwendet?", 2, ["Um den Beitrag einzelner Merkmale zu einer Vorhersage zu erklären", "Um Daten zu verschlüsseln", "Um neuronale Netze schneller zu trainieren", "Um Bilder zu vergrößern"], 0),
          w("d", "d) Welche Aussage zum Energiebedarf trifft zu?", 2, ["Das Training großer Modelle verbraucht viel Energie; kleinere, passende Modelle sind oft nachhaltiger", "KI verbraucht keine Energie", "Nur die Inferenz verbraucht Energie", "Energiebedarf ist für die Bewertung von KI irrelevant"], 0)
        ],
        loesung: "<p>a) z. B. Menschliche Aufsicht: Menschen können eingreifen und Entscheidungen übersteuern. Transparenz: Nachvollziehbarkeit von Daten und Entscheidungen, Kennzeichnung von KI.</p><p>b) Übermäßiges Vertrauen in Automatik · c) Erklärbarkeit von Vorhersagen · d) Großes Training ist energieintensiv; angemessene Modellgröße wählen.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s04t2", satz: 4, teil: 2, titel: "Vertiefungen: Bildprüfung in der Lebensmittelproduktion", kurz: "Lebensmittel · Bildprüfung", minuten: 120,
    situation: "<p>Die <b>Sommer Backwaren GmbH</b> verpackt 3 Millionen Kekspackungen pro Monat. Rund 0,8 % der Packungen sind fehlerhaft: undichte Siegelnaht oder schief aufgeklebtes Etikett. Bisher prüfen zwei Beschäftigte je Schicht stichprobenartig per Sichtkontrolle; trotzdem gibt es Reklamationen.</p><p>Über dem Förderband soll eine Kamera 20 Bilder pro Sekunde aufnehmen. Ein KI-System soll fehlerhafte Packungen erkennen und ausschleusen. Die Halle hat nur eine instabile Netzwerkverbindung.</p>",
    aufgaben: [
      { titel: "Lösungsansatz", text: "",
        teile: [
          t("a", "a) Beschreiben Sie die ML-Aufgabe und einen geeigneten Modellansatz. Begründen Sie.", 6, "Überwachte Bildklassifikation mit drei Klassen in Ordnung/Siegelnaht/Etikett (oder Objekterkennung/Segmentierung) (2 P.); CNN (1 P.) mit Transfer Learning eines vortrainierten Netzes, weil nur wenige gelabelte Fehlerbilder vorliegen (3 P.)."),
          t("b", "b) Wie organisieren Sie das Labeling der Bilder?", 4, "Fachkundige Beschäftigte labeln mit klaren Kriterien/Beispielkatalog (2 P.); Mehrfachlabeling einer Stichprobe/Übereinstimmung prüfen, Werkzeug, Vier-Augen-Prinzip bei Grenzfällen (2 P.)."),
          t("c", "c) Nennen Sie zwei sinnvolle Augmentierungen und eine, die hier schaden könnte.", 4, "Sinnvoll je 1 P.: Helligkeit/Kontrast, leichte Verschiebung, Rauschen, Unschärfe, horizontales Spiegeln (falls symmetrisch). Schädlich (2 P.): starke Rotation, weil ein schiefes Etikett gerade der Fehler ist (künstlich erzeugte Fehler mit falschem Label).")
        ],
        loesung: "<p>a) Überwachte Bildklassifikation (in Ordnung / Siegelnaht defekt / Etikett schief) mit einem CNN. Transfer Learning: ein vortrainiertes Netz (z. B. ResNet, EfficientNet) mit eigenen Bildern feinjustieren, weil Fehlerbilder knapp sind.</p><p>b) Erfahrene Beschäftigte labeln nach einem Fehlerkatalog mit Beispielbildern; Teile doppelt labeln und Übereinstimmung messen; Grenzfälle gemeinsam klären.</p><p>c) Sinnvoll: Helligkeit, Kontrast, leichte Verschiebung, Rauschen. Schädlich: Drehen – ein gedrehtes Bild sieht aus wie ein schiefes Etikett und würde mit „in Ordnung“ gelabelt.</p>" },

      { titel: "Datenbasis", text: "",
        teile: [
          z("a", "a) Wie viele fehlerhafte Packungen erwarten Sie unter 20.000 aufgenommenen Bildern?", 3, 160, 0.5),
          t("b", "b) Warum ist das für das Training ein Problem, und wie lösen Sie es?", 5, "Zu wenige Fehlerbeispiele, Klassenungleichgewicht (2 P.). Lösungen (3 P.): gezielt Fehlerbilder sammeln/erzeugen, länger aufnehmen, Augmentierung, Klassengewichte/Oversampling, ggf. Anomalieerkennung auf guten Teilen."),
          t("c", "c) Bilder aus derselben Produktionscharge sehen sehr ähnlich aus. Wie teilen Sie in Training und Test auf, und warum?", 6, "Gruppiert nach Charge/Produktionstag aufteilen (3 P.); sonst fast identische Bilder in Training und Test, Güte wird überschätzt (Leakage) (3 P.).")
        ],
        loesung: "<p>a) 20.000 · 0,008 = <b>160</b>.</p><p>b) Zu wenige Fehlerbeispiele, das Modell lernt vor allem „in Ordnung“. Abhilfe: gezielt fehlerhafte Packungen fotografieren, Augmentierung, Klassengewichte, notfalls Anomalieerkennung, die nur gute Packungen lernt.</p><p>c) Nach Charge oder Produktionstag trennen (Group Split). Sonst stehen nahezu gleiche Bilder in Training und Test und das Ergebnis ist zu optimistisch.</p>" },

      { titel: "Bewertung", text: "<p>Konfusionsmatrix auf 2.000 Testbildern (Zeilen: tatsächlich, Spalten: vorhergesagt). Prozentwerte mit zwei Nachkommastellen.</p><div class=\"table-wrap\"><table><thead><tr><th></th><th>in Ordnung</th><th>Siegelnaht</th><th>Etikett</th></tr></thead><tbody><tr><th>in Ordnung (1.800)</th><td>1.770</td><td>20</td><td>10</td></tr><tr><th>Siegelnaht (120)</th><td>12</td><td>105</td><td>3</td></tr><tr><th>Etikett (80)</th><td>8</td><td>2</td><td>70</td></tr></tbody></table></div>",
        teile: [
          z("a", "a) Accuracy", 3, 97.25, 0.1, "%"),
          z("b", "b) Recall der Klasse Siegelnaht", 3, 87.5, 0.1, "%"),
          z("c", "c) Precision der Klasse Siegelnaht", 3, 82.68, 0.15, "%"),
          z("d", "d) Recall der Klasse Etikett", 3, 87.5, 0.1, "%"),
          z("e", "e) Anteil aller fehlerhaften Packungen, die als „fehlerhaft“ (egal welcher Fehler) erkannt und ausgeschleust werden", 4, 90, 0.1, "%"),
          z("f", "f) Anteil der guten Packungen, die fälschlich ausgeschleust werden", 2, 1.67, 0.05, "%"),
          t("g", "g) Bewerten Sie das Ergebnis aus Sicht der Produktion.", 4, "20 von 200 Fehlern (10 %) gelangen zum Kunden – Reklamationsrisiko, ggf. Lebensmittelsicherheit bei undichter Naht (2 P.); 1,67 % gute Packungen werden aussortiert – Kosten/Ausschuss, aber nachprüfbar (2 P.). Schwelle/Prioritäten abwägen."),
          t("h", "h) Warum ist die Accuracy hier wenig aussagekräftig?", 2, "90 % der Bilder sind in Ordnung; selbst ein Modell ohne Fehlererkennung hätte 90 % Accuracy; Recall/Precision je Fehlerklasse oder Macro-F1 aussagekräftiger (2 P.).")
        ],
        loesung: "<p>a) (1.770 + 105 + 70) / 2.000 = <b>97,25 %</b> · b) 105 / 120 = <b>87,50 %</b> · c) 105 / (20 + 105 + 2) = 105 / 127 = <b>82,68 %</b> · d) 70 / 80 = <b>87,50 %</b>.</p><p>e) Als fehlerhaft erkannt: 105 + 3 + 2 + 70 = 180 von 200 = <b>90 %</b> · f) (20 + 10) / 1.800 = <b>1,67 %</b>.</p><p>g) 20 fehlerhafte Packungen von 200 rutschen durch – bei undichten Nähten ein Qualitäts- und Reklamationsrisiko. 30 gute Packungen werden aussortiert; das kostet wenig, weil sie nachgeprüft werden können. Eher die Schwelle für „fehlerhaft“ senken.</p><p>h) 90 % der Bilder sind fehlerfrei; die Accuracy wird von dieser Klasse dominiert.</p>" },

      { titel: "Bereitstellung", text: "",
        teile: [
          t("a", "a) Betreiben Sie das Modell in der Cloud oder direkt an der Linie (Edge)? Begründen Sie mit zwei Argumenten.", 6, "Edge (2 P.): instabiles Netz, Echtzeit/geringe Latenz für Ausschleusung, große Bilddatenmengen müssen nicht übertragen werden, Datenhoheit (je 2 P., max. 4)."),
          t("b", "b) Wie können Sie ein Modell für ein kleines Edge-Gerät verkleinern?", 4, "Je 2 P.: Quantisierung (z. B. 8 Bit statt 32 Bit), Pruning, Wissensdestillation in kleineres Modell, kleinere Architektur (MobileNet)."),
          z("c", "c) Eine Vorhersage dauert 30 ms je Bild. Wie viele Bilder pro Sekunde schafft das Gerät höchstens (eine Nachkommastelle)?", 3, 33.3, 0.1, "Bilder/s"),
          w("d", "d) Reicht das für die Kamera mit 20 Bildern pro Sekunde?", 3, ["Ja, mit Reserve", "Nein, es ist zu langsam", "Nur nachts", "Das lässt sich nicht sagen"], 0)
        ],
        loesung: "<p>a) Edge: Die Netzverbindung ist instabil, das Ausschleusen muss in Millisekunden erfolgen, und 20 Bilder pro Sekunde müssen nicht übertragen werden.</p><p>b) Quantisierung, Pruning, Wissensdestillation oder eine kompakte Architektur wie MobileNet.</p><p>c) 1.000 / 30 ≈ <b>33,3</b> Bilder/s · d) Ja, mit Reserve.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Die manuelle Sichtkontrolle kostet 180.000 € pro Jahr. Mit dem System bleibt eine Person zur Kontrolle der ausgeschleusten Packungen (60.000 € pro Jahr). Das System kostet einmalig 120.000 € und laufend 1.500 € pro Monat. Reklamationskosten sinken um 40.000 € pro Jahr.</p>",
        teile: [
          z("a", "a) Laufende Systemkosten pro Jahr", 3, 18000, 1, "€"),
          z("b", "b) Jährlicher Nettonutzen", 5, 142000, 1, "€"),
          z("c", "c) Amortisationszeit in Monaten (eine Nachkommastelle)", 4, 10.1, 0.15, "Monate"),
          t("d", "d) Nennen Sie einen qualitativen Nutzen und ein Risiko.", 4, "Nutzen (2 P.): gleichbleibende, lückenlose Prüfung statt Stichprobe, Daten zur Prozessverbesserung, Image, Entlastung von monotoner Arbeit. Risiko (2 P.): unerkannte neue Fehlerarten, Drift, Ausfall, Akzeptanz/Ängste der Beschäftigten.")
        ],
        loesung: "<p>a) 12 · 1.500 = <b>18.000 €</b> · b) 180.000 − 60.000 + 40.000 − 18.000 = <b>142.000 €</b> · c) 120.000 / 142.000 · 12 ≈ <b>10,1 Monate</b>.</p><p>d) Nutzen: jede Packung wird geprüft, Fehlerdaten helfen, die Ursachen an der Maschine zu finden. Risiko: neue, unbekannte Fehlerarten werden nicht erkannt.</p>" },

      { titel: "Betrieb und Recht", text: "",
        teile: [
          t("a", "a) Die Firma stellt auf eine neue, glänzende Verpackungsfolie um. Was kann passieren, und wie bemerken und lösen Sie das?", 6, "Data Drift: Bilder sehen anders aus (Reflexionen), mehr Fehlalarme/übersehene Fehler (2 P.). Bemerken: Monitoring der Ausschleusquote, Konfidenzen, Stichproben (2 P.). Lösung: neue Bilder sammeln/labeln, nachtrainieren, vor Umstellung testen, Beleuchtung anpassen (2 P.)."),
          t("b", "b) Die Beschäftigten der Sichtkontrolle befürchten, ersetzt zu werden. Wie gehen Sie damit um?", 4, "Früh und offen informieren, Beteiligung beim Labeling/Testen (2 P.); neue Aufgaben (Kontrolle, Ursachenanalyse), Qualifizierung, Betriebsrat einbinden (2 P.)."),
          w("c", "c) Wie ist das System nach AI Act voraussichtlich einzuordnen, solange es kein Sicherheitsbauteil eines regulierten Produkts ist?", 2, ["minimales Risiko", "Hochrisiko", "verboten", "begrenztes Risiko mit Kennzeichnungspflicht"], 0),
          t("d", "d) Auf manchen Bildern sind Hände von Beschäftigten zu sehen. Was folgt daraus, und was tun Sie?", 4, "Mögliche personenbezogene Daten/Überwachungseignung (1 P.); Bildausschnitt auf Band begrenzen, Maskierung, keine Speicherung bzw. kurze Löschfristen (2 P.); Betriebsrat (§ 87 Abs. 1 Nr. 6 BetrVG) einbinden (1 P.).")
        ],
        loesung: "<p>a) Data Drift durch neue Optik: mehr Fehlalarme oder übersehene Fehler. Erkennen über die Ausschleusquote und Stichproben; Lösung: Bilder mit neuer Folie labeln, nachtrainieren, vor der Umstellung testen.</p><p>b) Offen informieren, Beschäftigte am Projekt beteiligen (ihr Wissen ist für das Labeling wichtig), neue Aufgaben und Qualifizierung anbieten, Betriebsrat einbinden.</p><p>c) Minimales Risiko.</p><p>d) Kamera so ausrichten, dass nur das Band erfasst wird, Personen maskieren, Bilder nur kurz speichern; Betriebsrat beteiligen, weil die Kamera zur Überwachung geeignet sein kann.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
