/* Bachelor-Prüfungssatz 4 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s04a", satz: 4, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Regeln oder Lernen?", text: "<p>Eine Bank erkennt Kartenbetrug bisher mit festen Regeln, z. B. „Zahlung über 2.000 € im Ausland = Alarm“.</p>",
        teile: [
          w("a", "a) Worin unterscheidet sich ein ML-Modell von diesem Regelwerk?", 2, ["Es lernt Muster aus historischen Fällen statt fest programmierter Regeln", "Es braucht keine Daten", "Es ist immer genauer", "Es entscheidet zufällig"], 0),
          t("b", "b) Nennen Sie zwei Gründe, warum ML hier Vorteile gegenüber festen Regeln haben kann.", 4, "Je 2 P.: viele Merkmale/Kombinationen, Betrugsmuster ändern sich, weniger Fehlalarme durch feinere Muster, Anpassung durch Nachtraining, Wahrscheinlichkeiten statt Ja/Nein."),
          w("c", "c) Ohne gekennzeichnete Betrugsfälle sollen ungewöhnliche Zahlungen gefunden werden. Paradigma?", 2, ["unüberwachtes Lernen (Anomalieerkennung)", "überwachtes Lernen", "bestärkendes Lernen", "Regelinduktion"], 0),
          w("d", "d) Was beschreibt Overfitting?", 2, ["Das Modell lernt Trainingsdaten auswendig und verallgemeinert schlecht", "Das Modell ist zu einfach", "Die Daten sind zu groß", "Das Modell hat zu wenig Parameter"], 0)
        ],
        loesung: "<p>a) Lernen aus Beispielen · b) z. B. viele Merkmale kombinieren, sich ändernde Muster, weniger Fehlalarme · c) unüberwachte Anomalieerkennung · d) Auswendiglernen.</p>" },

      { titel: "Verteilungen und Ausreißer", text: "<p>Kartenzahlungen eines Kunden: Mittelwert 80 €, Standardabweichung 20 €. Quartile der Beträge: Q1 = 60 €, Q3 = 100 €.</p>",
        teile: [
          z("a", "a) z-Wert einer Zahlung über 140 €", 2, 3, 0.001),
          w("b", "b) Welcher Anteil liegt bei Normalverteilung etwa innerhalb von ±2 Standardabweichungen?", 2, ["etwa 95 %", "etwa 68 %", "etwa 99,7 %", "etwa 50 %"], 0),
          w("c", "c) Nach der Regel „|z| > 3 = Ausreißer“ ist 140 € …", 2, ["genau an der Grenze, nicht darüber", "eindeutig ein Ausreißer", "unter dem Mittel", "nicht berechenbar"], 0),
          z("d", "d) Obere Ausreißergrenze nach der IQR-Regel (Q3 + 1,5 · IQR)", 3, 160, 0.01, "€"),
          t("e", "e) Warum ist die IQR-Regel robuster als die z-Wert-Regel?", 3, "Quartile werden von Extremwerten kaum beeinflusst (2 P.), Mittelwert und Standardabweichung dagegen schon; funktioniert auch bei schiefen Verteilungen (1 P.).")
        ],
        loesung: "<p>a) (140 − 80) / 20 = <b>3</b> · b) etwa 95 % · c) genau an der Grenze · d) IQR = 40; 100 + 60 = <b>160 €</b> · e) Quartile sind robust gegen Ausreißer.</p>" },

      { titel: "SQL für Transaktionen", text: "<p>Tabelle <code>transaktionen(id, konto_id, betrag, zeit, land)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die alle Konten mit mehr als 5 Auslandstransaktionen (land &lt;&gt; 'DE') über 1.000 € ausgibt, mit Anzahl.", 6, "SELECT konto_id, COUNT(*) (1 P.) FROM transaktionen WHERE land <> 'DE' AND betrag > 1000 (2 P.) GROUP BY konto_id (1 P.) HAVING COUNT(*) > 5 (2 P.)."),
          w("b", "b) Was liefert COUNT(DISTINCT land)?", 2, ["die Anzahl unterschiedlicher Länder", "die Anzahl aller Zeilen", "das häufigste Land", "die Summe der Beträge"], 0),
          w("c", "c) Wozu dient ein Index auf konto_id?", 2, ["Abfragen nach Konto beschleunigen", "Daten verschlüsseln", "Dubletten löschen", "Beträge runden"], 0),
          w("d", "d) Wie prüfen Sie in SQL auf fehlende Länderangaben?", 2, ["WHERE land IS NULL", "WHERE land = NULL", "WHERE land = 0", "WHERE NOT land"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT konto_id, COUNT(*) AS anzahl\nFROM transaktionen\nWHERE land &lt;&gt; 'DE' AND betrag &gt; 1000\nGROUP BY konto_id\nHAVING COUNT(*) &gt; 5;</pre><p>b) unterschiedliche Länder · c) schnellere Abfragen · d) IS NULL.</p>" },

      { titel: "Bewertung bei seltenen Ereignissen", text: "<p>10.000 Transaktionen, davon 50 Betrug. Das Modell meldet 200 Verdachtsfälle, davon 40 tatsächlich Betrug. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Precision", 2, 20, 0.1, "%"),
          z("b", "b) Recall", 2, 80, 0.1, "%"),
          z("c", "c) Accuracy", 2, 98.3, 0.1, "%"),
          z("d", "d) Spezifität", 2, 98.39, 0.1, "%"),
          z("e", "e) F1-Score", 2, 32, 0.15, "%"),
          z("f", "f) Accuracy eines Modells, das nie Betrug meldet", 2, 99.5, 0.1, "%"),
          w("g", "g) Was folgt aus e) und f)?", 2, ["Accuracy ist bei seltenen Ereignissen irreführend; Precision, Recall und F1 betrachten", "Das triviale Modell ist besser", "Das Modell ist perfekt", "F1 ist bedeutungslos"], 0)
        ],
        loesung: "<p>TP = 40, FP = 160, FN = 10, TN = 9.790. a) 40 / 200 = <b>20 %</b> · b) 40 / 50 = <b>80 %</b> · c) 9.830 / 10.000 = <b>98,3 %</b> · d) 9.790 / 9.950 ≈ <b>98,39 %</b> · e) 2 · 0,2 · 0,8 / 1,0 = <b>32 %</b> · f) <b>99,5 %</b> · g) Accuracy taugt hier nicht.</p>" },

      { titel: "Entscheidungsbaum anwenden", text: "<p>Regeln eines Baums: Ist der Betrag über 500 € und das Land nicht DE → Verdacht. Sonst: Ist die Uhrzeit zwischen 0 und 5 Uhr und der Händler neu → Verdacht. Sonst → unauffällig.</p>",
        teile: [
          w("a", "a) 800 €, USA, 14 Uhr, bekannter Händler", 2, ["Verdacht", "unauffällig"], 0),
          w("b", "b) 300 €, DE, 3 Uhr, neuer Händler", 2, ["Verdacht", "unauffällig"], 0),
          w("c", "c) 900 €, DE, 14 Uhr, neuer Händler", 2, ["unauffällig", "Verdacht"], 0),
          t("d", "d) Nennen Sie einen Vorteil und einen Nachteil eines einzelnen Entscheidungsbaums.", 4, "Vorteil: gut nachvollziehbar/erklärbar, keine Skalierung nötig (2 P.); Nachteil: neigt zu Overfitting, instabil bei kleinen Datenänderungen (2 P.).")
        ],
        loesung: "<p>a) Verdacht · b) Verdacht · c) unauffällig · d) erklärbar, aber anfällig für Overfitting.</p>" },

      { titel: "Distanzen", text: "<p>Zwei Kunden als Punkte im Merkmalsraum: A = (2; 5), B = (6; 2).</p>",
        teile: [
          z("a", "a) Manhattan-Distanz", 2, 7, 0),
          z("b", "b) Euklidische Distanz", 2, 5, 0.001),
          w("c", "c) Warum standardisiert man Merkmale vor Distanzberechnungen?", 2, ["damit Merkmale mit großen Zahlen nicht dominieren", "um Daten zu verschlüsseln", "um Labels zu erzeugen", "weil es Pflicht nach DSGVO ist"], 0),
          t("d", "d) Wann ist die Manhattan-Distanz sinnvoller als die euklidische?", 4, "Bei vielen Dimensionen/rasterartigen Bewegungen, robuster gegen einzelne große Abweichungen (2 P.); Beispiel z. B. Wege in Lagergängen oder hochdimensionale Daten (2 P.).")
        ],
        loesung: "<p>a) |6 − 2| + |2 − 5| = <b>7</b> · b) √(16 + 9) = <b>5</b> · c) Vergleichbarkeit · d) z. B. Rasterwege, hochdimensionale Daten, Robustheit.</p>" },

      { titel: "Datenschutz und Sicherheit", text: "",
        teile: [
          w("a", "a) Auf welche Rechtsgrundlage kann eine Bank die Betrugserkennung stützen?", 2, ["rechtliche Verpflichtung bzw. berechtigtes Interesse", "nur Einwilligung", "lebenswichtige Interessen", "keine nötig"], 0),
          t("b", "b) Nennen Sie zwei technisch-organisatorische Maßnahmen für die Transaktionsdaten.", 4, "Je 2 P.: Verschlüsselung, Rollen-/Rechtekonzept, Protokollierung, Pseudonymisierung, Zwei-Faktor-Anmeldung, Löschkonzept, Schulung."),
          w("c", "c) Kontonummern werden durch Zufallskennungen ersetzt, die Zuordnung liegt getrennt. Das ist …", 2, ["Pseudonymisierung", "Anonymisierung", "Verschlüsselung der Leitung", "Löschung"], 0),
          w("d", "d) Welcher Grundsatz verlangt Löschfristen?", 2, ["Speicherbegrenzung", "Richtigkeit", "Transparenz", "Rechenschaftspflicht"], 0),
          w("e", "e) Frist zur Meldung einer Datenpanne an die Aufsicht?", 2, ["72 Stunden", "7 Tage", "unverzüglich ohne Frist", "1 Monat"], 0)
        ],
        loesung: "<p>a) rechtliche Verpflichtung (Geldwäsche, Betrugsprävention) bzw. berechtigtes Interesse · b) z. B. Verschlüsselung, Rechtekonzept · c) Pseudonymisierung · d) Speicherbegrenzung · e) 72 h.</p>" },

      { titel: "Python", text: "<pre class=\"code\">betraege = [50, 1200, 80, 3000, 20]\nverdacht = []\nfor i, b in enumerate(betraege):\n    if b &gt; 1000:\n        verdacht.append(i)\nprint(verdacht)\nprint(sum(betraege) / len(betraege))\nprint(sorted(betraege)[2])</pre>",
        teile: [
          w("a", "a) Erste Ausgabe", 3, ["[1, 3]", "[1200, 3000]", "[2, 4]", "[]"], 0),
          z("b", "b) Zweite Ausgabe", 3, 870, 0.001),
          z("c", "c) Dritte Ausgabe", 2, 80, 0),
          w("d", "d) Was liefert enumerate?", 2, ["Index und Wert", "nur Werte", "nur Indizes", "eine Summe"], 0)
        ],
        loesung: "<p>a) Indizes der Beträge über 1.000: <b>[1, 3]</b> · b) 4.350 / 5 = <b>870</b> · c) sortiert [20, 50, 80, 1200, 3000] → <b>80</b> · d) Index und Wert.</p>" },

      { titel: "KI-Recht im Finanzsektor", text: "",
        teile: [
          w("a", "a) KI zur Bewertung der Kreditwürdigkeit von Privatpersonen ist …", 2, ["Hochrisiko", "minimales Risiko", "verboten", "nur transparenzpflichtig"], 0),
          w("b", "b) KI zur Aufdeckung von Finanzbetrug ist nach Anhang III …", 2, ["ausdrücklich vom Hochrisiko-Bereich Kreditwürdigkeit ausgenommen", "immer Hochrisiko", "verboten", "eine GPAI-Pflicht"], 0),
          t("c", "c) Wie kann ein Betrugsmodell bestimmte Kundengruppen benachteiligen? Nennen Sie Ursache und Folge.", 4, "Ursache: Merkmale wie Herkunftsland/Wohnort als Stellvertreter, unausgewogene Trainingsdaten (2 P.); Folge: häufigere Kartensperren und Prüfungen für bestimmte Gruppen (2 P.)."),
          w("d", "d) Welches Recht gibt Art. 22 DSGVO bei einer automatisierten Kreditablehnung?", 2, ["Eingreifen einer Person, eigenen Standpunkt darlegen, Entscheidung anfechten", "kostenlosen Kredit", "Löschung der Bank", "keines"], 0)
        ],
        loesung: "<p>a) Hochrisiko (Anhang III Nr. 5 b) · b) Betrugserkennung ist ausgenommen · c) Stellvertretermerkmale oder unausgewogene Daten führen zu mehr Sperren für bestimmte Gruppen · d) Schutzrechte nach Art. 22 Abs. 3.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s04b", satz: 4, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Anomalieerkennung", text: "",
        teile: [
          t("a", "a) Erklären Sie die Idee des Isolation Forest.", 4, "Zufällige Bäume teilen den Datenraum zufällig (1 P.); Anomalien lassen sich mit wenigen Teilungen isolieren, kurze Pfadlänge (2 P.); Mittelung über viele Bäume ergibt Score (1 P.)."),
          t("b", "b) Wie bewerten Sie ein Anomaliemodell, wenn kaum Labels vorliegen?", 4, "Stichproben der auffälligsten Fälle durch Fachleute prüfen (Precision@k) (2 P.); bekannte Altfälle/synthetische Anomalien einspielen, Stabilität und Alarmrate beobachten (2 P.)."),
          w("c", "c) Woran erkennt ein Autoencoder Anomalien?", 2, ["an einem hohen Rekonstruktionsfehler", "an einer hohen Lernrate", "an vielen Clustern", "an einer niedrigen Accuracy"], 0),
          w("d", "d) Was legt der Parameter „contamination“ beim Isolation Forest fest?", 2, ["den erwarteten Anteil von Anomalien und damit die Schwelle", "die Baumtiefe", "die Lernrate", "die Zahl der Merkmale"], 0)
        ],
        loesung: "<p>a) Anomalien werden mit wenigen zufälligen Schnitten isoliert. b) Fachliche Stichproben, eingespielte Altfälle, Alarmrate. c) Rekonstruktionsfehler · d) erwarteter Anomalieanteil.</p>" },

      { titel: "Kosten und Ungleichgewicht", text: "<p>Ein übersehener Betrugsfall kostet im Mittel 2.000 €, die Prüfung eines Fehlalarms 10 €. Modell A: FN = 10, FP = 160. Modell B: FN = 20, FP = 40.</p>",
        teile: [
          z("a", "a) Fehlerkosten Modell A", 3, 21600, 0, "€"),
          z("b", "b) Fehlerkosten Modell B", 3, 40400, 0, "€"),
          w("c", "c) Welches Modell ist wirtschaftlich besser?", 2, ["A", "B"], 0),
          t("d", "d) Erklären Sie SMOTE.", 3, "Oversampling der Minderheitsklasse (1 P.) durch synthetische Beispiele, die zwischen benachbarten Minderheitsfällen interpoliert werden (2 P.)."),
          t("e", "e) Was ist kostensensitives Lernen?", 3, "Fehler werden im Training unterschiedlich gewichtet, z. B. FN höher (2 P.), über Klassengewichte oder Kostenmatrix (1 P.).")
        ],
        loesung: "<p>a) 10 · 2.000 + 160 · 10 = <b>21.600 €</b> · b) 20 · 2.000 + 40 · 10 = <b>40.400 €</b> · c) A · d) synthetische Minderheitsfälle · e) Gewichtung der Fehlerarten.</p>" },

      { titel: "Logistisches Modell", text: "<p>z = −4 + 0,002 · Betrag + 1,5 · Ausland (Ausland = 1, sonst 0), p = 1 / (1 + e<sup>−z</sup>). Zahlung über 1.000 € im Ausland.</p>",
        teile: [
          z("a", "a) z", 2, -0.5, 0.001),
          z("b", "b) p (drei Nachkommastellen)", 3, 0.378, 0.005),
          z("c", "c) Faktor, um den sich die Odds im Ausland ändern (zwei Nachkommastellen)", 3, 4.48, 0.01),
          t("d", "d) Was bedeutet Kalibrierung eines Modells, und warum ist sie hier wichtig?", 4, "Vorhergesagte Wahrscheinlichkeiten entsprechen den tatsächlichen Häufigkeiten, z. B. von Fällen mit p = 0,3 sind etwa 30 % Betrug (2 P.); wichtig für Schwellen und Kostenrechnung (2 P.).")
        ],
        loesung: "<p>a) −4 + 2 + 1,5 = <b>−0,5</b> · b) 1 / (1 + e<sup>0,5</sup>) ≈ <b>0,378</b> · c) e<sup>1,5</sup> ≈ <b>4,48</b> · d) Wahrscheinlichkeiten stimmen mit Häufigkeiten überein; Grundlage für Kostenentscheidungen.</p>" },

      { titel: "Sequenzen und Einbettungen", text: "",
        teile: [
          t("a", "a) Vergleichen Sie LSTM und Transformer für Folgen von Transaktionen.", 4, "LSTM: verarbeitet sequenziell, Gedächtnis über Gates, schwächer bei sehr langen Abhängigkeiten (2 P.); Transformer: Attention über alle Positionen parallel, lange Abhängigkeiten, mehr Rechenaufwand/Daten (2 P.)."),
          w("b", "b) Wozu dienen die Gates eines LSTM?", 2, ["steuern, welche Informationen gespeichert, vergessen und ausgegeben werden", "senken die Lernrate", "teilen die Daten auf", "erzeugen Labels"], 0),
          z("c", "c) 500 Händlerkategorien werden in 16-dimensionale Embeddings übersetzt. Anzahl der Parameter der Embedding-Schicht", 3, 8000, 0),
          w("d", "d) Was leistet ein Embedding?", 3, ["kategoriale Werte als dichte Vektoren, ähnliche Kategorien liegen nah beieinander", "verschlüsselt Daten", "löscht seltene Kategorien", "ersetzt das Label"], 0)
        ],
        loesung: "<p>a) LSTM sequenziell mit Gates; Transformer mit Attention, parallel · b) Informationsfluss steuern · c) 500 · 16 = <b>8.000</b> · d) dichte, lernbare Vektoren.</p>" },

      { titel: "Modellvergleich", text: "<p>5-fache Kreuzvalidierung eines Modells: AUC 0,91 · 0,93 · 0,92 · 0,90 · 0,94.</p>",
        teile: [
          t("a", "a) Warum nutzen Sie bei Betrugsdaten stratifizierte Folds?", 4, "Jeder Fold enthält denselben Anteil seltener Betrugsfälle (2 P.); sonst Folds ohne Betrug und instabile Kennzahlen (2 P.)."),
          z("b", "b) Mittlere AUC", 2, 0.92, 0.001),
          w("c", "c) Was sagt eine kleine Streuung der Fold-Ergebnisse?", 2, ["das Ergebnis ist stabil gegenüber der Datenaufteilung", "das Modell ist overfittet", "die Daten sind falsch", "die AUC ist bedeutungslos"], 0),
          w("d", "d) Wozu dient eine verschachtelte Kreuzvalidierung?", 2, ["Hyperparameterwahl und Leistungsschätzung sauber trennen", "Daten verdoppeln", "Rechenzeit sparen", "Labels erzeugen"], 0)
        ],
        loesung: "<p>a) gleiche Betrugsquote je Fold · b) 4,60 / 5 = <b>0,92</b> · c) Stabilität · d) Tuning und Bewertung trennen.</p>" },

      { titel: "Erklärbarkeit", text: "<p>SHAP-Erklärung eines Alarms: Basiswert 0,02; Beiträge: Betrag +0,30, Ausland +0,15, bekannter Händler −0,05.</p>",
        teile: [
          t("a", "a) Warum muss die Bank Betrugsalarme erklären können? Nennen Sie zwei Gründe.", 4, "Je 2 P.: Prüfung durch Analysten, Kundenkommunikation bei Sperren, Aufsicht/Revision, Fehler und Bias erkennen."),
          z("b", "b) Vorhergesagter Wert", 3, 0.42, 0.001),
          w("c", "c) Was ist eine kontrafaktische Erklärung?", 2, ["was sich ändern müsste, damit das Ergebnis anders ausfällt", "eine falsche Erklärung", "die Liste aller Merkmale", "die Modellarchitektur"], 0),
          w("d", "d) Wie erklärt LIME eine Vorhersage?", 3, ["mit einem einfachen lokalen Ersatzmodell um den Fall herum", "mit dem Quellcode", "mit der Konfusionsmatrix", "durch Neutraining"], 0)
        ],
        loesung: "<p>a) Analysten, Kunden, Aufsicht, Fehlersuche · b) 0,02 + 0,30 + 0,15 − 0,05 = <b>0,42</b> · c) „Was wäre wenn“ · d) lokales Ersatzmodell.</p>" },

      { titel: "Angriffe und Robustheit", text: "",
        teile: [
          t("a", "a) Betrüger passen ihr Verhalten an das Modell an. Welche Folge hat das, und wie nennt man es?", 4, "Adversariales Verhalten/Concept Drift (2 P.): Muster ändern sich gezielt, Modellgüte sinkt, z. B. Beträge knapp unter Schwellen (2 P.)."),
          t("b", "b) Nennen Sie zwei Gegenmaßnahmen.", 4, "Je 2 P.: häufiges Nachtraining, Monitoring der Erkennungsquote, Kombination von Regeln und Modellen, nicht alle Schwellen offenlegen, Ensemble, menschliche Analysten."),
          w("c", "c) Was ist Data Poisoning?", 2, ["Manipulation von Trainingsdaten, um das Modell zu beeinflussen", "Löschen von Daten", "ein Komprimierungsverfahren", "eine Visualisierung"], 0)
        ],
        loesung: "<p>a) adversariales Verhalten bzw. Concept Drift · b) Nachtraining, Monitoring, Regeln plus Modell, Analysten · c) manipulierte Trainingsdaten.</p>" },

      { titel: "NumPy", text: "<pre class=\"code\">import numpy as np\nx = np.array([2, 4, 6, 8])\nprint(x.mean())\nprint(x[x &gt; 4].sum())\nprint(((x - x.mean()) ** 2).mean())</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 5, 0.001),
          z("b", "b) Zweite Ausgabe", 3, 14, 0),
          z("c", "c) Dritte Ausgabe", 2, 5, 0.001),
          w("d", "d) Warum rechnet man mit NumPy-Arrays statt Python-Schleifen?", 2, ["vektorisierte Operationen sind deutlich schneller", "Schleifen sind verboten", "Arrays speichern nur Texte", "NumPy braucht keinen Speicher"], 0)
        ],
        loesung: "<p>a) <b>5</b> · b) 6 + 8 = <b>14</b> · c) (9 + 1 + 1 + 9) / 4 = <b>5</b> (Varianz) · d) Vektorisierung.</p>" },

      { titel: "Echtzeitbetrieb", text: "",
        teile: [
          t("a", "a) Die Kartenzahlung muss in unter 100 Millisekunden bewertet werden. Beschreiben Sie Anforderungen an die Architektur.", 4, "Schnelles Modell/Inferenz im Speicher, vorberechnete Merkmale (Feature Store) (2 P.); skalierbare API, Ausfallsicherheit, Monitoring der Latenz (2 P.)."),
          w("b", "b) Merkmale wie „Anzahl Zahlungen in den letzten 10 Minuten“ berechnet man am besten …", 2, ["im Datenstrom (Streaming)", "einmal im Monat per Batch", "manuell", "gar nicht"], 0),
          w("c", "c) Das Modell antwortet nicht rechtzeitig. Was ist eine sinnvolle Rückfallebene?", 2, ["einfaches Regelwerk entscheidet", "Zahlung immer ablehnen ohne Prüfung", "Server neu starten und warten", "Kunden anrufen"], 0)
        ],
        loesung: "<p>a) schnelle Inferenz, Feature Store, skalierbare und ausfallsichere API, Latenz-Monitoring · b) Streaming · c) Regelwerk als Rückfall.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s04t2", satz: 4, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI gegen Kartenbetrug und für die Kreditvorprüfung", kurz: "Bank · Betrug und Kredit", minuten: 240,
    situation: "<p>Die <b>Rheinische Volksbank eG</b> (950 Beschäftigte, Betriebsrat, Erträge 300 Mio. € im Jahr) wickelt monatlich 2 Mio. Kartenzahlungen ab. Heute erkennt ein Regelwerk 60 % der Betrugsfälle; der jährliche Schaden aus unerkannten Fällen beträgt 3,6 Mio. €.</p><p>Geplant sind zwei KI-Vorhaben: (1) eine Echtzeit-Betrugserkennung, deren Alarme von einem Fraud-Team geprüft werden, und (2) eine KI-gestützte Vorprüfung von Privatkreditanträgen, die eine Empfehlung für die Kreditsachbearbeitung erzeugt. Sie verantworten beide Vorhaben.</p>",
    aufgaben: [
      { titel: "Betrugserkennung konzipieren", text: "<p>Die Betrugsquote liegt bei 0,05 % der Zahlungen.</p>",
        teile: [
          t("a", "a) Beschreiben Sie die Architektur der Echtzeit-Betrugserkennung.", 6, "Zahlungsereignis in Echtzeit (1 P.), Merkmale aus Stream/Feature Store (1 P.), Kombination Regeln + ML-Score (1 P.), Schwelle → Freigabe/Prüfung/Ablehnung (1 P.), Fallback bei Ausfall (1 P.), Rückmeldung der Analysten für Nachtraining, Monitoring (1 P.)."),
          z("b", "b) Betrugsfälle pro Monat", 2, 1000, 0),
          z("c", "c) Bei einem Recall von 85 %: erkannte Fälle pro Monat", 2, 850, 0),
          z("d", "d) Bei einer Precision von 25 %: Anzahl Alarme pro Monat", 2, 3400, 0),
          t("e", "e) Betrugsfälle werden oft erst Wochen später bestätigt. Welche Folgen hat das für Training und Monitoring?", 4, "Verzögerte Labels (2 P.): aktuelle Güte erst spät messbar, Nachtraining hinkt, unbestätigte Fälle nicht als „kein Betrug“ werten; Ersatzkennzahlen wie Alarmrate und Analystenrückmeldungen nutzen (2 P.).")
        ],
        loesung: "<p>a) Echtzeitereignis → Merkmale → Regeln plus Score → Entscheidung nach Schwelle → Fallback → Analystenfeedback und Monitoring.</p><p>b) 2.000.000 · 0,0005 = <b>1.000</b> · c) <b>850</b> · d) 850 / 0,25 = <b>3.400</b> · e) verzögerte Labels; Ersatzkennzahlen nutzen.</p>" },

      { titel: "Alarmbearbeitung", text: "<p>Ein Alarm wird im Schnitt in 6 Minuten geprüft. Eine Vollzeitkraft hat 140 produktive Stunden im Monat.</p>",
        teile: [
          z("a", "a) Benötigte Vollzeitkräfte (aufgerundet)", 3, 3, 0),
          t("b", "b) Beschreiben Sie den Prozess der Alarmbearbeitung mit Gateways.", 5, "Start Alarm (1 P.); Analyst prüft mit Erklärung (1 P.); exklusives Gateway Betrug ja/nein/unklar (1 P.); Karte sperren und Kunde informieren bzw. freigeben, unklar → Kundenrückfrage (1 P.); Ergebnis als Label zurück (1 P.)."),
          t("c", "c) Nennen Sie zwei Kennzahlen für das Fraud-Team.", 4, "Je 2 P.: Bearbeitungszeit je Alarm, Anteil bestätigter Alarme, Rückstau, Kundenbeschwerden über Sperren, verhinderter Schaden."),
          w("d", "d) Wer sollte für die Freigabe neuer Modellversionen verantwortlich (A in RACI) sein?", 2, ["eine benannte Person, z. B. Leitung Betrugsprävention", "alle Analysten gemeinsam", "niemand", "der Anbieter allein"], 0)
        ],
        loesung: "<p>a) 3.400 · 6 / 60 = 340 h; 340 / 140 ≈ 2,4 → <b>3</b> · b) Alarm → Prüfung → Gateway → Sperre oder Freigabe oder Rückfrage → Label · c) z. B. Bearbeitungszeit, Bestätigungsquote · d) genau eine verantwortliche Person.</p>" },

      { titel: "Projektplanung", text: "<p>Vorgänge (Wochen, Vorgänger): A Anforderungen 3 (–) · B Datenaufbereitung 5 (A) · C Regelwerk anpassen 2 (A) · D Modell 4 (B) · E Integration 3 (C, D) · F Test 2 (E).</p>",
        teile: [
          z("a", "a) Projektdauer", 3, 17, 0),
          w("b", "b) Kritischer Pfad", 3, ["A–B–D–E–F", "A–C–E–F", "A–B–C–E–F", "A–D–E–F"], 0),
          z("c", "c) Gesamtpuffer von C", 2, 7, 0),
          z("d", "d) Risiko „Integration in das Kartensystem verzögert sich“: Wahrscheinlichkeit 20 %, Schaden 300.000 €. Erwartungswert", 2, 60000, 0, "€"),
          t("e", "e) Nennen Sie zwei Maßnahmen zu diesem Risiko mit Strategie.", 4, "Je 2 P.: frühe technische Machbarkeitsprüfung/Prototyp (vermindern), vertragliche Vertragsstrafe mit Dienstleister (übertragen), Puffer einplanen (akzeptieren), Integration parallelisieren.")
        ],
        loesung: "<p>A 0–3, B 3–8, C 3–5, D 8–12, E 12–15, F 15–17 → <b>17 Wochen</b>, kritischer Pfad <b>A–B–D–E–F</b>; C: SAZ 10 − FAZ 3 = <b>7</b>. d) 0,2 · 300.000 = <b>60.000 €</b> · e) z. B. Prototyp (vermindern), Vertragsstrafe (übertragen).</p>" },

      { titel: "Rechtliche Einordnung", text: "",
        teile: [
          w("a", "a) Einstufung der Betrugserkennung nach der KI-Verordnung", 2, ["kein Hochrisiko (Betrugserkennung ist im Bereich Kreditwürdigkeit ausgenommen)", "Hochrisiko", "verboten", "nur GPAI-Pflichten"], 0),
          w("b", "b) Einstufung der Kreditvorprüfung", 2, ["Hochrisiko (Anhang III Nr. 5 b)", "minimales Risiko", "verboten", "nur Transparenz"], 0),
          t("c", "c) Nennen Sie vier Pflichten der Bank als Betreiberin der Kreditvorprüfung.", 4, "Je 1 P.: Nutzung nach Gebrauchsanweisung, menschliche Aufsicht durch kompetente Personen, geeignete Eingabedaten, Überwachung und Meldung, Protokolle ≥ 6 Monate, Grundrechte-Folgenabschätzung (Art. 27), Information der Antragsteller."),
          t("d", "d) Welche Anforderungen ergeben sich aus der DSGVO für eine Kreditablehnung auf Basis des KI-Scores?", 4, "Art. 22: keine ausschließlich automatisierte Ablehnung ohne Ausnahme und Schutzmaßnahmen (2 P.); nach EuGH (SCHUFA) kann schon ein maßgeblicher Score erfasst sein; echte menschliche Prüfung, Information über die Logik, Anfechtungsmöglichkeit (2 P.)."),
          w("e", "e) Höchstbußgeld für Verstöße gegen Betreiberpflichten bei Hochrisiko-KI (kein KMU)?", 2, ["15 Mio. € oder 3 % des weltweiten Jahresumsatzes, der höhere Betrag", "35 Mio. € oder 7 %", "20 Mio. € oder 4 %", "500.000 €"], 0),
          z("f", "f) Wie hoch ist dieser Rahmen bei 300 Mio. € Jahresumsatz in Mio. €?", 2, 15, 0),
          w("g", "g) Braucht die Bank einen Datenschutzbeauftragten?", 2, ["ja", "nein"], 0)
        ],
        loesung: "<p>a) kein Hochrisiko · b) Hochrisiko · c) z. B. Gebrauchsanweisung, menschliche Aufsicht, Protokolle, Grundrechte-Folgenabschätzung · d) Art. 22 mit Schutzrechten, echte Prüfung · e) 15 Mio. € oder 3 % · f) 3 % = 9 Mio. € &lt; 15 Mio. € → <b>15</b> · g) ja (weit mehr als 20 Personen).</p>" },

      { titel: "Wirtschaftlichkeit der Betrugserkennung", text: "<p>Heute bleiben 40 % der Betrugsfälle unerkannt (Schaden 3,6 Mio. € pro Jahr), mit KI noch 15 %. Zusätzliche Personalkosten: die Vollzeitkräfte aus Aufgabe 2 zu je 70.000 €. Lizenz und Betrieb 400.000 € pro Jahr, Investition 1,5 Mio. €.</p>",
        teile: [
          z("a", "a) Eingesparter Betrugsschaden pro Jahr", 3, 2250000, 0, "€"),
          z("b", "b) Zusätzliche Personalkosten pro Jahr", 2, 210000, 0, "€"),
          z("c", "c) Jährlicher Rückfluss", 2, 1640000, 0, "€"),
          z("d", "d) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 2, 0.91, 0.01, "Jahre"),
          z("e", "e) ROI über 3 Jahre in %", 3, 228, 0.5, "%"),
          t("f", "f) Welche Annahme prüfen Sie besonders kritisch?", 2, "Z. B. dass sich die Erkennungsquote im Betrieb hält (Betrüger passen sich an), Kosten der Fehlalarme für Kundenservice/Abwanderung, Lizenzpreise (2 P.).")
        ],
        loesung: "<p>Gesamtes Betrugsvolumen 3,6 / 0,4 = 9 Mio. €; künftig 0,15 · 9 = 1,35 Mio. €. a) 3,6 − 1,35 = <b>2,25 Mio. €</b> · b) 3 · 70.000 = <b>210.000 €</b> · c) 2.250.000 − 210.000 − 400.000 = <b>1.640.000 €</b> · d) 1,5 / 1,64 ≈ <b>0,91 Jahre</b> · e) (3 · 1,64 − 1,5) / 1,5 = <b>228 %</b> · f) Stabilität der Erkennung, Folgekosten von Fehlalarmen.</p>" },

      { titel: "Personal und Arbeitsrecht", text: "",
        teile: [
          t("a", "a) Welche Kompetenzen und Rollen braucht das neue Fraud-Team?", 4, "Rollen: Analysten, Data Scientist/ML Engineer, Teamleitung, Schnittstelle Compliance (2 P.); Kompetenzen: Betrugsmuster, Umgang mit Scores und Erklärungen, Datenschutz, Kundenkommunikation (2 P.)."),
          w("b", "b) Eine Projektstelle soll ohne Sachgrund befristet werden. Höchstdauer?", 2, ["2 Jahre", "6 Monate", "5 Jahre", "unbegrenzt"], 0),
          w("c", "c) Das System misst die Bearbeitungszeit je Analyst. Welches Recht hat der Betriebsrat?", 2, ["Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG", "keines", "nur Information nach § 106", "Anhörung nach § 102"], 0),
          t("d", "d) Ein Analyst hat einen klaren Betrugsfall freigegeben. Formulieren Sie Feedback nach dem Muster Situation – Verhalten – Wirkung.", 4, "Situation konkret (1 P.), Verhalten beschreibend ohne Wertung (1 P.), Wirkung (Schaden, Kunde) (1 P.), Wunsch/Vereinbarung, z. B. Checkliste nutzen (1 P.).")
        ],
        loesung: "<p>a) Analysten, Data Science, Leitung, Compliance; Kompetenzen zu Mustern, Scores, Datenschutz · b) 2 Jahre · c) § 87 Abs. 1 Nr. 6 · d) z. B. „Gestern um 14 Uhr hast du Alarm 4711 freigegeben, obwohl drei Merkmale auffällig waren; dadurch entstand ein Schaden von 2.300 €. Lass uns die Prüf-Checkliste gemeinsam durchgehen.“</p>" },

      { titel: "Zukunftskompetenzen", text: "",
        teile: [
          t("a", "a) Analysten übernehmen fast alle hohen Scores ohne Prüfung. Benennen Sie das Risiko und zwei Gegenmaßnahmen.", 4, "Automation Bias (2 P.); Begründungspflicht, Stichproben, Erklärungen, Schulung, Abweichungen erwünscht (je 1 P.)."),
          t("b", "b) Der Kartenprozessor sitzt in einem Land mit hoher Unsicherheitsvermeidung. Wie gestalten Sie die Zusammenarbeit?", 4, "Detaillierte, schriftliche Vereinbarungen und Pläne, klare Regeln und Zuständigkeiten (2 P.); frühe Abstimmung von Änderungen, keine Improvisation erwarten (2 P.)."),
          w("c", "c) Ein Kollege bemerkt, dass Sie in Besprechungen oft unterbrechen – Sie wussten das nicht. Feld im Johari-Fenster?", 2, ["blinder Fleck", "öffentlich", "verborgen", "unbekannt"], 0),
          w("d", "d) Eine neue Betrugswelle läuft gerade. Wie ordnen Sie das nach Eisenhower ein?", 2, ["dringend und wichtig – sofort selbst handeln", "wichtig, nicht dringend", "delegieren", "weglassen"], 0)
        ],
        loesung: "<p>a) Automation Bias; Begründungspflicht, Stichproben · b) schriftliche, detaillierte Absprachen · c) blinder Fleck · d) sofort.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
