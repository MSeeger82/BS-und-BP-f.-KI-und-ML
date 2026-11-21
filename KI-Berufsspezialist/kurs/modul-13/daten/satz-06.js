/* Prüfungssatz 6 */
(function (z, w, t) {
  var NN = ["Faltungsnetz (CNN)", "Transformer", "Diffusionsmodell", "Autoencoder"];
  window.PRUEFUNGEN.push({
    id: "s06t1", satz: 6, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Weitere Lernformen", text: "",
        teile: [
          t("a", "a) Was ist selbstüberwachtes Lernen? Nennen Sie ein Beispiel.", 4, "Das Modell erzeugt sich die Labels aus den Daten selbst, z. B. verdeckte Teile vorhersagen (2 P.); Beispiel: Sprachmodell sagt das nächste Wort/maskierte Wörter voraus (2 P.)."),
          w("b", "b) Was ist teilüberwachtes (semi-supervised) Lernen?", 2, ["Training mit wenigen gelabelten und vielen ungelabelten Daten", "Training ohne jegliche Daten", "Lernen nur durch Belohnung", "Training, bei dem ein Mensch jede Vorhersage freigibt"], 0),
          w("c", "c) Was ist beim bestärkenden Lernen eine Policy?", 2, ["Die Strategie, die festlegt, welche Aktion der Agent in welchem Zustand wählt", "Eine Datenschutzrichtlinie", "Die Belohnungsfunktion", "Der Trainingsdatensatz"], 0),
          w("d", "d) Was beschreibt der Konflikt „Exploration vs. Exploitation“?", 2, ["Abwägung zwischen Neues ausprobieren und bekannte gute Aktionen nutzen", "Datensammlung gegen Datenschutz", "Training gegen Test", "CPU gegen GPU"], 0)
        ],
        loesung: "<p>a) Die Labels entstehen aus den Daten selbst, z. B. sagt ein Sprachmodell das nächste Wort vorher. b) Wenige Labels plus viele ungelabelte Daten. c) Die Handlungsstrategie des Agenten. d) Neues erkunden oder Bewährtes ausnutzen.</p>" },

      { titel: "Datenbereinigung", text: "<p>Auszug aus einer Kundentabelle:</p><div class=\"table-wrap\"><table><thead><tr><th>ID</th><th>Name</th><th>PLZ</th><th>Alter</th><th>E-Mail</th></tr></thead><tbody><tr><td>1</td><td>Anna Meyer</td><td>28195</td><td>34</td><td>a.meyer@mail.de</td></tr><tr><td>2</td><td>Jan Brandt</td><td>2819</td><td>41</td><td>jan@web.de</td></tr><tr><td>3</td><td>Anna Meier</td><td>28195</td><td>34</td><td>a.meyer@mail.de</td></tr><tr><td>4</td><td>Ole Kruse</td><td>28203</td><td>230</td><td></td></tr></tbody></table></div>",
        teile: [
          t("a", "a) Beschreiben Sie drei Datenqualitätsprobleme in der Tabelle und wie Sie sie behandeln.", 6, "Je 2 P.: wahrscheinliche Dublette ID 1/3 (Schreibvariante, gleiche Mail) → zusammenführen; PLZ 2819 nur 4-stellig → ungültig, prüfen/korrigieren (führende Null? Bremen 5-stellig); Alter 230 unplausibel → als fehlend markieren/nachfragen; fehlende E-Mail → kennzeichnen."),
          w("b", "b) Welche Validierungsregel hätte den PLZ-Fehler verhindert?", 2, ["Genau fünf Ziffern", "Wert größer als 0", "Feld darf Buchstaben enthalten", "Keine Regel möglich"], 0),
          w("c", "c) Wofür steht ETL?", 2, ["Extract, Transform, Load", "Evaluate, Test, Launch", "Encode, Train, Learn", "Error, Trace, Log"], 0)
        ],
        loesung: "<p>a) ID 1 und 3 sind vermutlich dieselbe Person (Meyer/Meier, gleiche E-Mail) → Dublette zusammenführen. PLZ 2819 hat nur vier Stellen → ungültig, korrigieren oder als fehlend markieren. Alter 230 ist unplausibel → als fehlend behandeln. ID 4 fehlt die E-Mail → kennzeichnen, je nach Zweck ergänzen lassen.</p><p>b) Format: genau fünf Ziffern. c) Extract, Transform, Load.</p>" },

      { titel: "Bedingte Häufigkeiten", text: "<p>Von 200 Kunden haben 60 gekündigt. 80 Kunden sind unter 30 Jahre alt; von ihnen haben 30 gekündigt.</p>",
        teile: [
          z("a", "a) Kündigungsquote insgesamt", 3, 30, 0.01, "%"),
          z("b", "b) Kündigungsquote der unter 30-Jährigen (eine Nachkommastelle)", 3, 37.5, 0.01, "%"),
          z("c", "c) Kündigungsquote der übrigen Kunden", 2, 25, 0.01, "%"),
          t("d", "d) Folgt daraus, dass das junge Alter die Kündigung verursacht? Begründen Sie.", 2, "Nein, nur ein Zusammenhang; andere Ursachen möglich, z. B. Vertragsart, Preis, Umzug (Störvariable) (2 P.).")
        ],
        loesung: "<p>a) 60 / 200 = <b>30 %</b> · b) 30 / 80 = <b>37,5 %</b> · c) 30 / 120 = <b>25 %</b> · d) Nein – Korrelation ist keine Kausalität; z. B. könnten Jüngere häufiger günstige, kurz laufende Tarife haben.</p>" },

      { titel: "Dimensionsreduktion", text: "",
        teile: [
          w("a", "a) Wozu dient die Hauptkomponentenanalyse (PCA)?", 2, ["Viele korrelierte Merkmale zu wenigen Komponenten mit möglichst viel Varianz zu verdichten", "Klassen vorherzusagen", "Fehlende Werte zu löschen", "Daten zu verschlüsseln"], 0),
          z("b", "b) Die erste Komponente erklärt 45 %, die zweite 25 % der Varianz. Wie viel erklären beide zusammen?", 2, 70, 0.01, "%"),
          t("c", "c) Was versteht man unter dem „Fluch der Dimensionalität“?", 3, "Bei vielen Merkmalen werden Daten im Raum dünn, Abstände verlieren Aussagekraft (2 P.); man braucht exponentiell mehr Daten, Overfitting-Gefahr (1 P.)."),
          w("d", "d) Wofür wird t-SNE (oder UMAP) typischerweise genutzt?", 3, ["Hochdimensionale Daten in 2D/3D zu visualisieren", "Zeitreihen vorherzusagen", "Texte zu übersetzen", "Bilder zu komprimieren"], 0)
        ],
        loesung: "<p>a) Verdichtung korrelierter Merkmale. b) <b>70 %</b>. c) Mit vielen Dimensionen liegen die Punkte weit auseinander, Abstände werden ähnlich, und man bräuchte enorm viele Daten. d) Visualisierung in 2D/3D.</p>" },

      { titel: "SQL", text: "<p>Tabelle <code>kunden(kunden_id, name, umsatz)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die alle Kunden ausgibt, deren Umsatz über dem Durchschnittsumsatz aller Kunden liegt.", 5, "SELECT name, umsatz FROM kunden (1 P.) WHERE umsatz > (2 P.) (SELECT AVG(umsatz) FROM kunden) als Unterabfrage (2 P.)."),
          w("b", "b) Was liefert COUNT(DISTINCT kunden_id) in einer Bestelltabelle?", 2, ["Die Anzahl verschiedener Kunden", "Die Anzahl aller Bestellungen", "Die höchste Kunden-ID", "Die Summe der Kunden-IDs"], 0),
          w("c", "c) Mit welchem Befehl ändert man bestehende Datensätze?", 3, ["UPDATE", "INSERT", "SELECT", "CREATE"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT name, umsatz\nFROM kunden\nWHERE umsatz &gt; (SELECT AVG(umsatz) FROM kunden);</pre><p>b) Anzahl unterschiedlicher Kunden. c) UPDATE.</p>" },

      { titel: "Schwellenwert und ROC", text: "<p>Ein Modell gibt für sechs Fälle Wahrscheinlichkeiten aus (in Klammern das tatsächliche Label): <b>0,9 (1) · 0,8 (0) · 0,7 (1) · 0,4 (1) · 0,3 (0) · 0,1 (0)</b>.</p>",
        teile: [
          z("a", "a) True Positives bei Schwelle 0,5", 2, 2, 0.001),
          z("b", "b) Recall bei Schwelle 0,5 (zwei Nachkommastellen)", 2, 66.67, 0.1, "%"),
          z("c", "c) False-Positive-Rate bei Schwelle 0,5 (zwei Nachkommastellen)", 2, 33.33, 0.1, "%"),
          z("d", "d) Recall bei Schwelle 0,35", 2, 100, 0.1, "%"),
          w("e", "e) Was trägt eine ROC-Kurve gegeneinander auf?", 2, ["True-Positive-Rate gegen False-Positive-Rate über alle Schwellen", "Precision gegen Accuracy", "Fehler gegen Epochen", "Merkmale gegen Wichtigkeit"], 0)
        ],
        loesung: "<p>Schwelle 0,5: positiv sind 0,9 (1), 0,8 (0), 0,7 (1) → TP = <b>2</b>, FP = 1, FN = 1 (0,4), TN = 2.</p><p>b) 2 / 3 = <b>66,67 %</b> · c) FP / (FP + TN) = 1 / 3 = <b>33,33 %</b> · d) Bei 0,35 kommt 0,4 (1) hinzu → 3 / 3 = <b>100 %</b> · e) TPR gegen FPR.</p>" },

      { titel: "Unüberwachte Verfahren", text: "",
        teile: [
          w("a", "a) Nach welchem Prinzip arbeitet ein Isolation Forest?", 2, ["Ausreißer lassen sich mit wenigen zufälligen Schnitten isolieren", "Er zählt Nachbarn im Radius", "Er minimiert Abstände zu Zentren", "Er braucht Labels für jede Anomalie"], 0),
          t("b", "b) Nennen Sie zwei Unterschiede zwischen DBSCAN und k-Means.", 4, "Je 2 P.: DBSCAN braucht keine vorgegebene Clusterzahl; findet beliebig geformte Cluster; kennzeichnet Ausreißer als Rauschen; k-Means bildet kugelförmige Cluster und ordnet jeden Punkt zu."),
          w("c", "c) Ein Silhouettenkoeffizient nahe 1 bedeutet …", 2, ["Punkte passen gut zu ihrem Cluster und sind von anderen klar getrennt", "Die Cluster überlappen stark", "Es gibt nur einen Cluster", "Die Daten sind fehlerhaft"], 0),
          w("d", "d) Was zeigt ein Dendrogramm?", 2, ["Die schrittweise Zusammenfassung von Clustern beim hierarchischen Clustering", "Die Lernkurve eines Netzes", "Eine Konfusionsmatrix", "Die Verteilung eines Merkmals"], 0)
        ],
        loesung: "<p>a) Ausreißer sind schnell isoliert. b) DBSCAN: keine Clusterzahl vorgeben, beliebige Formen, Rauschpunkte; k-Means: k vorgeben, runde Cluster, jeder Punkt gehört zu einem Cluster. c) Gute Trennung. d) Verschmelzungsbaum des hierarchischen Clusterings.</p>" },

      { titel: "Python mit Fehlerbehandlung", text: "<pre class=\"code\">def teile(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(teile(9, 3))\nprint(teile(1, 0))\nwerte = [teile(x, 2) for x in [4, 7]]\nprint(werte)</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung (als Zahl)", 3, 3, 0.001),
          w("b", "b) Ausgabe der zweiten print-Anweisung", 3, ["None", "0", "eine Fehlermeldung mit Programmabbruch", "inf"], 0),
          w("c", "c) Ausgabe der dritten print-Anweisung", 4, ["[2.0, 3.5]", "[2, 3]", "[4, 7]", "[2.0, 3]"], 0)
        ],
        loesung: "<p>a) 9 / 3 = <b>3.0</b> · b) Die Division durch null wird abgefangen → <b>None</b> · c) <b>[2.0, 3.5]</b>.</p>" },

      { titel: "Netzarchitekturen", text: "<p>Welche Architektur passt am besten?</p>",
        teile: [
          w("a", "1) Erkennen von Fehlern auf Fotos", 2, NN, 0),
          w("b", "2) Übersetzen und Zusammenfassen von Texten", 2, NN, 1),
          w("c", "3) Erzeugen realistischer Bilder aus einer Textbeschreibung", 2, NN, 2),
          w("d", "4) Daten komprimieren und Abweichungen über den Rekonstruktionsfehler erkennen", 2, NN, 3),
          t("e", "e) Erklären Sie den Attention-Mechanismus in einem Satz.", 2, "Für jedes Element wird gewichtet, wie stark es andere Elemente der Sequenz berücksichtigt, um den Kontext zu erfassen (2 P.).")
        ],
        loesung: "<p>1) CNN · 2) Transformer · 3) Diffusionsmodell · 4) Autoencoder · e) Attention berechnet für jedes Wort, auf welche anderen Wörter es wie stark „achten“ soll, und bildet daraus eine kontextabhängige Darstellung.</p>" },

      { titel: "Rollen im AI Act", text: "",
        teile: [
          w("a", "a) Ein Unternehmen kauft ein KI-System ein und nutzt es in eigener Verantwortung. Welche Rolle hat es?", 2, ["Betreiber", "Anbieter", "Einführer", "Notifizierte Stelle"], 0),
          w("b", "b) Was verlangt Art. 4 AI Act von Anbietern und Betreibern?", 2, ["Maßnahmen für ausreichende KI-Kompetenz des Personals", "Eine Zertifizierung jedes Mitarbeiters durch die IHK", "Die Veröffentlichung des Quellcodes", "Den Verzicht auf Cloud-Dienste"], 0),
          t("c", "c) Nennen Sie zwei Pflichten eines Betreibers von Hochrisiko-KI-Systemen.", 4, "Je 2 P.: Verwendung gemäß Betriebsanleitung; menschliche Aufsicht durch kompetente Personen; Eingabedaten relevant/repräsentativ halten; Betrieb überwachen und Vorfälle melden; Protokolle aufbewahren; Betroffene/Beschäftigte informieren; ggf. Grundrechte-Folgenabschätzung."),
          w("d", "d) Was ist ein KI-Modell mit allgemeinem Verwendungszweck (GPAI)?", 2, ["Ein breit einsetzbares Modell wie ein großes Sprachmodell, das viele Aufgaben erfüllen kann", "Jedes Modell in Behörden", "Ein Modell nur für Bilder", "Ein Modell ohne Trainingsdaten"], 0)
        ],
        loesung: "<p>a) Betreiber. b) KI-Kompetenz sicherstellen (Schulung). c) z. B. bestimmungsgemäße Verwendung, menschliche Aufsicht, Überwachung und Meldung schwerwiegender Vorfälle, Aufbewahrung der Protokolle. d) Universell einsetzbares Modell (z. B. großes Sprachmodell).</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s06t2", satz: 6, teil: 2, titel: "Vertiefungen: Kreditentscheidungen bei einer Bank", kurz: "Bank · Kreditwürdigkeit", minuten: 120,
    situation: "<p>Die <b>Nordsee Bank eG</b> vergibt Konsumentenkredite bis 25.000 € an Privatpersonen und erhält rund 30.000 Anträge pro Jahr. 4 % der vergebenen Kredite fallen aus. Im Schnitt beträgt ein Kredit 10.000 €; fällt er aus, verliert die Bank 6.000 €. Ein ordnungsgemäß zurückgezahlter Kredit bringt 800 € Ertrag.</p><p>Die Bank will ein selbst entwickeltes ML-Modell zur Kreditwürdigkeitsprüfung einsetzen. Vorhanden sind Antragsdaten (Einkommen, Ausgaben, Beschäftigungsdauer, Kredithöhe, Laufzeit), Kontodaten bestehender Kunden und Auskunfteidaten. Für abgelehnte Anträge gibt es kein Rückzahlungsergebnis.</p>",
    aufgaben: [
      { titel: "Einordnung", text: "",
        teile: [
          t("a", "a) Beschreiben Sie die ML-Aufgabe und eine konkrete Definition des Labels.", 4, "Überwachte binäre Klassifikation bzw. Ausfallwahrscheinlichkeit (2 P.); Label z. B. „90 Tage im Zahlungsverzug innerhalb von 12 Monaten nach Auszahlung = 1“ (2 P.)."),
          t("b", "b) Wie stuft der AI Act das System ein, und welche Pflichten folgen daraus? Nennen Sie mindestens vier.", 6, "Hochrisiko nach Anhang III (Kreditwürdigkeit natürlicher Personen) (2 P.). Je 1 P. (max. 4): Risikomanagement, Daten-Governance/Datenqualität, technische Dokumentation, automatische Protokollierung, Transparenz/Gebrauchsanweisung, menschliche Aufsicht, Genauigkeit/Robustheit/Cybersicherheit, Konformitätsbewertung/CE/Registrierung, Qualitätsmanagement."),
          w("c", "c) Welche Rolle hat die Bank nach AI Act, wenn sie das System selbst entwickelt und einsetzt?", 4, ["Anbieter und Betreiber zugleich", "nur Betreiber", "nur Händler", "keine Rolle, weil es intern ist"], 0)
        ],
        loesung: "<p>a) Binäre Klassifikation mit Wahrscheinlichkeit; Label z. B. „mindestens 90 Tage Zahlungsverzug innerhalb der ersten 12 Monate“.</p><p>b) Hochrisiko-System (Anhang III Nr. 5 b). Pflichten u. a.: Risikomanagementsystem, Datenqualität und -Governance, technische Dokumentation, Protokollierung, Transparenz, menschliche Aufsicht, Genauigkeit und Robustheit, Konformitätsbewertung und Registrierung.</p><p>c) Anbieter (entwickelt und bringt in Betrieb) und Betreiber (nutzt es).</p>" },

      { titel: "Daten und Fairness", text: "",
        teile: [
          t("a", "a) Welche Merkmale dürfen bzw. sollten Sie nicht verwenden, und welches Risiko besteht trotzdem?", 6, "Geschlecht, ethnische Herkunft, Religion, Behinderung, Alter nur sehr eingeschränkt (AGG, Art. 9 DSGVO) (3 P.); Proxy-Risiko: andere Merkmale (PLZ, Vorname, Teilzeit) bilden geschützte Merkmale indirekt ab (3 P.)."),
          t("b", "b) Für abgelehnte Anträge gibt es kein Label. Welches Problem entsteht, und wie gehen Sie damit um?", 6, "Selektionsverzerrung/„Reject Inference“: Modell lernt nur aus angenommenen Kunden, Risiko der Abgelehnten unbekannt (3 P.); Maßnahmen: Reject-Inference-Verfahren, externe Daten (Auskunftei-Verlauf), kontrollierte Annahme einer kleinen Stichprobe, Vorsicht bei Grenzfällen (3 P.)."),
          z("c", "c) Im Test werden 55 % der Frauen und 70 % der Männer angenommen. Berechnen Sie das Verhältnis der Annahmequoten (drei Nachkommastellen).", 3, 0.786, 0.002),
          t("d", "d) Interpretieren Sie das Ergebnis aus c).", 3, "Unter 0,8 (Vier-Fünftel-Regel) → Hinweis auf mögliche Benachteiligung (2 P.); Ursachen prüfen (Einkommen, Teilzeit als Proxy), ggf. gegensteuern, dokumentieren (1 P.).")
        ],
        loesung: "<p>a) Geschützte Merkmale wie Geschlecht, Herkunft, Religion nicht verwenden. Trotzdem können andere Merkmale (Wohnort, Teilzeit, Vorname) sie indirekt abbilden – Fairness muss gemessen werden.</p><p>b) Nur angenommene Kredite haben ein Rückzahlungsergebnis; das Modell kennt die Abgelehnten nicht (Selektionsverzerrung). Abhilfe: Reject Inference, externe Verlaufsdaten, kontrollierte Annahme einer kleinen Stichprobe.</p><p>c) 0,55 / 0,70 ≈ <b>0,786</b>.</p><p>d) Liegt unter der üblichen Schwelle von 0,8 – Warnsignal für mögliche Diskriminierung. Ursachen analysieren, bevor das Modell eingesetzt wird.</p>" },

      { titel: "Modell", text: "<p>Eine logistische Regression liefert für einen Antrag den Wert z = −1,2 (lineare Kombination der Merkmale).</p>",
        teile: [
          z("a", "a) Ausfallwahrscheinlichkeit p = 1 / (1 + e^(−z)) in % (zwei Nachkommastellen)", 4, 23.15, 0.05, "%"),
          z("b", "b) Chance (Odds) p / (1 − p) (drei Nachkommastellen)", 2, 0.301, 0.003),
          t("c", "c) Warum setzen Banken häufig logistische Regression bzw. Scorecards ein?", 4, "Gut erklärbar/nachvollziehbar (Koeffizienten), aufsichtsrechtlich anerkannt, stabil, liefert kalibrierte Wahrscheinlichkeiten (je 2 P., max. 4)."),
          t("d", "d) Ein Gradient-Boosting-Modell ist 3 Prozentpunkte besser (AUC). Was müssen Sie abwägen, wenn Sie es einsetzen wollen?", 4, "Mehr Genauigkeit vs. geringere Erklärbarkeit (2 P.); Erklärbarkeit mit SHAP herstellen, Stabilität, Fairness, Dokumentation, Aufsicht/Betroffenenrechte (2 P.)."),
          w("e", "e) Die AUC beträgt 0,78. Was bedeutet das?", 2, ["Mit 78 % Wahrscheinlichkeit bekommt ein zufälliger Ausfall einen höheren Score als ein zufälliger guter Kredit", "78 % aller Vorhersagen sind richtig", "78 % der Kredite fallen aus", "Die Precision beträgt 78 %"], 0),
          t("f", "f) Was bedeutet Kalibrierung, und warum ist sie hier wichtig?", 4, "Vorhergesagte Wahrscheinlichkeiten entsprechen den tatsächlichen Häufigkeiten (z. B. von Fällen mit 10 % fallen 10 % aus) (2 P.); wichtig, weil Zins/Entscheidung/erwarteter Verlust direkt mit p gerechnet werden (2 P.).")
        ],
        loesung: "<p>a) 1 / (1 + e<sup>1,2</sup>) = 1 / 4,320 ≈ <b>23,15 %</b> · b) e<sup>−1,2</sup> ≈ <b>0,301</b>.</p><p>c) Gut erklärbar, stabil, von der Aufsicht akzeptiert, liefert Wahrscheinlichkeiten.</p><p>d) Bessere Trennschärfe gegen schlechtere Nachvollziehbarkeit; einsetzbar nur mit Erklärungen (SHAP), Fairnessprüfung und Dokumentation.</p><p>e) Rangordnungsgüte: Ein Ausfall erhält mit 78 % Wahrscheinlichkeit einen höheren Risikoscore als ein guter Kredit.</p><p>f) Vorhergesagte und beobachtete Ausfallquoten stimmen überein; nötig, weil mit p erwartete Verluste und Konditionen berechnet werden.</p>" },

      { titel: "Entscheidungsregel", text: "<p>Erwarteter Ertrag eines Kredits bei Ausfallwahrscheinlichkeit p: <b>E = (1 − p) · 800 € − p · 6.000 €</b>.</p>",
        teile: [
          z("a", "a) Erwarteter Ertrag bei p = 5 %", 4, 460, 0.5, "€"),
          z("b", "b) Erwarteter Ertrag bei p = 15 %", 4, -220, 0.5, "€"),
          z("c", "c) Ab welcher Ausfallwahrscheinlichkeit ist der erwartete Ertrag null? (in %, zwei Nachkommastellen)", 4, 11.76, 0.05, "%"),
          t("d", "d) Leiten Sie eine Entscheidungsregel ab, die auch die Anforderungen an menschliche Aufsicht erfüllt.", 6, "Annahme deutlich unter ~11,8 %, Ablehnung deutlich darüber (2 P.); Grauzone um die Schwelle an Sachbearbeitung zur Einzelfallprüfung (2 P.); Ablehnungen durch Menschen bestätigt/übersteuerbar, Begründung dokumentiert (2 P.).")
        ],
        loesung: "<p>a) 0,95 · 800 − 0,05 · 6.000 = 760 − 300 = <b>460 €</b> · b) 0,85 · 800 − 0,15 · 6.000 = 680 − 900 = <b>−220 €</b> · c) 800 / (800 + 6.000) ≈ <b>11,76 %</b>.</p><p>d) z. B. p &lt; 8 %: Annahme empfehlen; p &gt; 16 %: Ablehnung empfehlen; dazwischen Einzelfallprüfung durch Kreditsachbearbeitung. Jede Ablehnung wird von einem Menschen geprüft und kann übersteuert werden.</p>" },

      { titel: "Erklärbarkeit und Betroffenenrechte", text: "",
        teile: [
          t("a", "a) Ein abgelehnter Antragsteller fragt nach dem Grund. Wie erklären Sie die Entscheidung verständlich?", 6, "Wichtigste Gründe je Fall (SHAP/Koeffizienten) in Alltagssprache (2 P.); kontrafaktische Erklärung: „Bei 300 € geringerer Kreditrate wäre der Antrag angenommen worden“ (2 P.); keine Fachbegriffe, Hinweis auf Prüfung durch Menschen/Widerspruch (2 P.)."),
          t("b", "b) Erläutern Sie, was Art. 22 DSGVO hier bedeutet. Beziehen Sie die EuGH-Rechtsprechung zum Scoring ein.", 6, "Verbot ausschließlich automatisierter Entscheidungen mit rechtlicher/erheblicher Wirkung, Ausnahmen mit Schutzmaßnahmen (2 P.). EuGH (SCHUFA, 2023): Schon die Erstellung eines Scores ist eine automatisierte Entscheidung, wenn er maßgeblich für die Kreditentscheidung ist (2 P.). Folge: echte menschliche Prüfung, Recht auf Darlegung, Anfechtung, Information über die Logik (2 P.)."),
          w("c", "c) Welches Recht gewährt Art. 86 AI Act Betroffenen bei Entscheidungen auf Grundlage bestimmter Hochrisiko-Systeme?", 4, ["Recht auf eine klare und aussagekräftige Erklärung der Rolle des KI-Systems bei der Entscheidung", "Recht auf einen kostenlosen Kredit", "Recht auf Herausgabe des Modells", "Recht auf Löschung aller Bankdaten"], 0)
        ],
        loesung: "<p>a) Die zwei, drei wichtigsten Gründe in einfacher Sprache nennen und zeigen, was sich ändern müsste („Mit einer Laufzeit von 60 statt 36 Monaten wäre die Rate tragbar gewesen“). Hinweis auf menschliche Überprüfung.</p><p>b) Art. 22 DSGVO verbietet grundsätzlich ausschließlich automatisierte Entscheidungen mit erheblicher Wirkung. Nach dem EuGH-Urteil zur SCHUFA (2023) gilt schon der Score als solche Entscheidung, wenn er maßgeblich ist. Daher: echte menschliche Prüfung, Recht auf Standpunkt und Anfechtung, Information über die Logik.</p><p>c) Recht auf Erklärung (Art. 86 AI Act).</p>" },

      { titel: "Betrieb", text: "",
        teile: [
          t("a", "a) Ob ein Kredit ausfällt, zeigt sich erst nach Monaten. Wie überwachen Sie das Modell trotzdem frühzeitig?", 6, "Eingangsdrift überwachen (PSI, Verteilungen) (2 P.); Frühindikatoren wie Zahlungsverzug 30 Tage, Score-Verteilung, Annahmequote (2 P.); verzögert die echte Ausfallquote je Scoreklasse mit Prognose vergleichen (Backtesting), Fairness laufend (2 P.)."),
          t("b", "b) Die Zinsen steigen stark, eine Rezession droht. Was bedeutet das für das Modell?", 4, "Concept Drift: Zusammenhang zwischen Merkmalen und Ausfall ändert sich, höhere Ausfälle (2 P.); Stresstests/Szenarien, Schwellen anpassen, nachkalibrieren/nachtrainieren, enger überwachen (2 P.)."),
          t("c", "c) Was muss das System nach AI Act protokollieren, und wozu?", 4, "Automatische Protokolle über Nutzung/Entscheidungen: Zeitpunkt, Eingabedaten-Bezug, Ergebnis, beteiligte Personen (2 P.); für Rückverfolgbarkeit, Überwachung, Aufklärung von Vorfällen und Betroffenenanfragen (2 P.).")
        ],
        loesung: "<p>a) Verteilungen der Eingangsdaten und Scores überwachen, Frühindikatoren (erste Zahlungsverzüge) auswerten und später die echten Ausfallquoten je Scoreklasse mit den vorhergesagten vergleichen; Fairnesskennzahlen laufend prüfen.</p><p>b) Der Zusammenhang zwischen Merkmalen und Ausfall verschiebt sich. Szenarien rechnen, Schwellen vorsichtiger setzen, nachkalibrieren, enger überwachen.</p><p>c) Nutzungszeiträume, Eingaben bzw. Referenzen, Ergebnisse und prüfende Personen – damit Entscheidungen nachvollziehbar und Fehler aufklärbar sind.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
