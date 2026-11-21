/* Bachelor-Prüfungssatz 3 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s03a", satz: 3, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Lernen aus Daten", text: "",
        teile: [
          w("a", "a) Was zeichnet maschinelles Lernen aus?", 2, ["Regeln werden aus Beispieldaten gelernt statt von Hand programmiert", "Es braucht keine Daten", "Es arbeitet nur mit Bildern", "Es ist immer erklärbar"], 0),
          t("b", "b) Unterscheiden Sie Training und Inferenz.", 4, "Training: Modell lernt Parameter aus Daten, rechenintensiv, einmalig/periodisch (2 P.); Inferenz: trainiertes Modell wendet Gelerntes auf neue Daten an, im Betrieb (2 P.)."),
          w("c", "c) In einem Datensatz zur Kündigungsprognose ist „gekündigt ja/nein“ …", 2, ["das Label (Zielvariable)", "ein Merkmal", "ein Hyperparameter", "ein Cluster"], 0),
          w("d", "d) Welches Beispiel ist bestärkendes Lernen?", 2, ["Ein Agent lernt eine Lagerstrategie durch Belohnungen", "Ein Modell sortiert E-Mails nach Labels", "Ein Verfahren gruppiert Kunden", "Eine Regression schätzt Preise"], 0)
        ],
        loesung: "<p>a) Lernen aus Beispielen · b) Training = Parameter lernen; Inferenz = Anwendung auf neue Daten · c) Label · d) Lernen über Belohnungen.</p>" },

      { titel: "Daten erheben", text: "",
        teile: [
          w("a", "a) Kunden-E-Mails sind …", 2, ["unstrukturierte Daten", "strukturierte Daten", "Metadaten", "Stammdaten"], 0),
          w("b", "b) Welche Daten sind Primärdaten?", 2, ["eine eigens durchgeführte Kundenbefragung", "eine veröffentlichte Branchenstatistik", "ein Open-Data-Datensatz", "ein Zeitungsartikel"], 0),
          t("c", "c) Erklären Sie Stichprobenverzerrung an einem Beispiel und nennen Sie eine Folge für ein Modell.", 4, "Stichprobe bildet die Grundgesamtheit nicht ab, z. B. nur Onlinebefragte/nur Stammkunden (2 P.); Modell verallgemeinert schlecht oder benachteiligt Gruppen (2 P.)."),
          w("d", "d) Welche Daten sind eine Zeitreihe?", 2, ["tägliche Verkaufszahlen über zwei Jahre", "eine Liste von Kundennamen", "Fotos von Bauteilen", "eine Produktbeschreibung"], 0)
        ],
        loesung: "<p>a) unstrukturiert · b) eigene Befragung · c) z. B. nur Kunden aus Großstädten befragt – das Modell passt nicht für ländliche Filialen · d) tägliche Verkäufe.</p>" },

      { titel: "Häufigkeiten", text: "<p>20 Kundenbewertungen (1 bis 5 Sterne): 1 Stern: 2-mal · 2 Sterne: 3-mal · 3 Sterne: 5-mal · 4 Sterne: 6-mal · 5 Sterne: 4-mal.</p>",
        teile: [
          z("a", "a) Arithmetisches Mittel", 3, 3.35, 0.01),
          z("b", "b) Median", 3, 3.5, 0.01),
          z("c", "c) Modus", 2, 4, 0),
          z("d", "d) Relative Häufigkeit von 5 Sternen in %", 2, 20, 0.1, "%"),
          w("e", "e) Welche Darstellung passt am besten?", 2, ["Säulendiagramm", "Streudiagramm", "Liniendiagramm über die Zeit", "Netzdiagramm"], 0)
        ],
        loesung: "<p>a) (1·2 + 2·3 + 3·5 + 4·6 + 5·4) / 20 = 67 / 20 = <b>3,35</b> · b) 10. Wert = 3, 11. Wert = 4 → <b>3,5</b> · c) <b>4</b> · d) 4 / 20 = <b>20 %</b> · e) Säulendiagramm.</p>" },

      { titel: "Bedingte Wahrscheinlichkeit", text: "<p>4 % der Bauteile sind fehlerhaft. Eine KI-Prüfung schlägt bei 90 % der fehlerhaften Teile Alarm und bei 5 % der fehlerfreien Teile fälschlich ebenfalls.</p>",
        teile: [
          z("a", "a) Wahrscheinlichkeit eines Alarms in %", 3, 8.4, 0.05, "%"),
          z("b", "b) Wahrscheinlichkeit, dass ein Teil mit Alarm tatsächlich fehlerhaft ist, in % (zwei Nachkommastellen)", 4, 42.86, 0.1, "%"),
          t("c", "c) Deuten Sie das Ergebnis für die Praxis.", 3, "Mehr als die Hälfte der Alarme sind Fehlalarme (1 P.), wegen der niedrigen Basisrate (1 P.); Alarme daher nachprüfen, Schwelle/Kosten abwägen (1 P.)."),
          w("d", "d) Welcher Effekt erklärt das Ergebnis?", 2, ["niedrige Basisrate (Prävalenz)", "Overfitting", "Data Leakage", "zu hohe Lernrate"], 0)
        ],
        loesung: "<p>a) 0,04 · 0,9 + 0,96 · 0,05 = 0,036 + 0,048 = <b>8,4 %</b> · b) 0,036 / 0,084 ≈ <b>42,86 %</b> (Satz von Bayes) · c) Über die Hälfte der Alarme sind falsch; Nachprüfung nötig · d) Basisrate.</p>" },

      { titel: "Regression nach der Methode der kleinsten Quadrate", text: "<p>Werbebudget x (in T€) und Absatz y (in T Stück): (1; 2), (2; 4), (3; 5), (4; 7).</p>",
        teile: [
          z("a", "a) Steigung b", 3, 1.6, 0.001),
          z("b", "b) Achsenabschnitt a", 3, 0.5, 0.001),
          z("c", "c) Prognose für x = 6", 2, 10.1, 0.01),
          t("d", "d) Warum ist die Prognose für x = 6 mit Vorsicht zu genießen?", 2, "Extrapolation außerhalb des beobachteten Bereichs (1 bis 4); Zusammenhang muss dort nicht linear gelten (2 P.)."),
          w("e", "e) Womit prüfen Sie, ob ein lineares Modell passt?", 2, ["Residuenplot", "Konfusionsmatrix", "Dendrogramm", "ROC-Kurve"], 0)
        ],
        loesung: "<p>x̄ = 2,5; ȳ = 4,5. Σ(x − x̄)(y − ȳ) = 3,75 + 0,25 + 0,25 + 3,75 = 8; Σ(x − x̄)² = 5. a) b = 8 / 5 = <b>1,6</b> · b) a = 4,5 − 1,6 · 2,5 = <b>0,5</b> · c) 0,5 + 1,6 · 6 = <b>10,1</b> · d) Extrapolation · e) Residuenplot.</p>" },

      { titel: "Spamfilter bewerten", text: "<p>Von 500 E-Mails sind 100 Spam. Der Filter erkennt 85 Spam-Mails richtig und markiert 10 normale Mails fälschlich als Spam. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Precision", 2, 89.47, 0.1, "%"),
          z("b", "b) Recall", 2, 85, 0.1, "%"),
          z("c", "c) Accuracy", 2, 95, 0.1, "%"),
          z("d", "d) F1-Score", 2, 87.18, 0.15, "%"),
          w("e", "e) Welche Fehlerart ist bei einem Spamfilter meist schlimmer?", 2, ["falsch positiv – eine wichtige Mail landet im Spam", "falsch negativ – Spam im Posteingang", "beide gleich", "keine"], 0),
          t("f", "f) Erklären Sie den Zielkonflikt zwischen Precision und Recall.", 2, "Strengere Schwelle erhöht Precision, senkt Recall und umgekehrt; Abwägung nach Kosten der Fehlerarten (2 P.).")
        ],
        loesung: "<p>TP = 85, FP = 10, FN = 15, TN = 390. a) 85 / 95 ≈ <b>89,47 %</b> · b) 85 / 100 = <b>85 %</b> · c) 475 / 500 = <b>95 %</b> · d) ≈ <b>87,18 %</b> · e) falsch positiv · f) Schwelle verschiebt das Verhältnis.</p>" },

      { titel: "Clustering", text: "",
        teile: [
          w("a", "a) Was muss bei k-Means vorgegeben werden?", 2, ["die Anzahl der Cluster k", "die Labels", "die Lernrate", "die Zahl der Schichten"], 0),
          t("b", "b) Beschreiben Sie den Ablauf von k-Means.", 4, "Startzentren wählen (1 P.); Punkte dem nächsten Zentrum zuordnen (1 P.); Zentren als Mittelwert neu berechnen (1 P.); wiederholen bis keine Änderung (1 P.)."),
          z("c", "c) Ein Cluster enthält die Punkte (1; 2), (3; 4), (5; 6). x-Koordinate des neuen Zentrums", 2, 3, 0),
          w("d", "d) Wer deutet die gefundenen Cluster sinnvoll?", 2, ["Fachleute mit Domänenwissen anhand der Merkmale", "der Algorithmus selbst", "niemand", "der Zufall"], 0)
        ],
        loesung: "<p>a) k · b) Zentren wählen, zuordnen, neu berechnen, wiederholen · c) (1 + 3 + 5) / 3 = <b>3</b> · d) Fachleute.</p>" },

      { titel: "Python", text: "<pre class=\"code\">umsatz = {\"Mo\": 120, \"Di\": 90, \"Mi\": 150}\ngesamt = 0\nfor tag, wert in umsatz.items():\n    if wert &gt;= 100:\n        gesamt += wert\nprint(gesamt)\nprint(max(umsatz, key=umsatz.get))\nprint(len([w for w in umsatz.values() if w &lt; 100]))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 270, 0),
          w("b", "b) Zweite Ausgabe", 3, ["Mi", "Mo", "150", "Di"], 0),
          z("c", "c) Dritte Ausgabe", 2, 1, 0),
          w("d", "d) Was liefert umsatz.items()?", 2, ["Paare aus Schlüssel und Wert", "nur die Schlüssel", "nur die Werte", "die Länge"], 0)
        ],
        loesung: "<p>a) 120 + 150 = <b>270</b> · b) Schlüssel mit größtem Wert: <b>Mi</b> · c) nur 90 → <b>1</b> · d) Schlüssel-Wert-Paare.</p>" },

      { titel: "Recht und Gesellschaft", text: "",
        teile: [
          w("a", "a) Biometrische Echtzeit-Fernidentifizierung im öffentlichen Raum zur Strafverfolgung ist …", 2, ["grundsätzlich verboten, mit eng begrenzten Ausnahmen", "frei erlaubt", "minimales Risiko", "nur transparenzpflichtig"], 0),
          w("b", "b) Rechtsgrundlage für einen Werbe-Newsletter an Neukunden ist in der Regel …", 2, ["Einwilligung", "lebenswichtige Interessen", "öffentliche Aufgabe", "keine nötig"], 0),
          t("c", "c) Nennen Sie zwei Pflichten beim Einsatz eines Chatbots im Kundenservice.", 4, "Je 2 P.: Hinweis, dass es sich um KI handelt (Art. 50 KI-VO); Datenschutzinformation; Rechtsgrundlage; AV-Vertrag mit Anbieter; Weiterleitung an Menschen ermöglichen; KI-Kompetenz der Beschäftigten."),
          w("d", "d) Welche Anwendung ist nach Anhang III ein Hochrisiko-Bereich?", 2, ["KI zur Bewertung von Prüfungsleistungen in der Bildung", "Empfehlung von Kochrezepten", "Spamfilter", "Übersetzung von Speisekarten"], 0),
          w("e", "e) Was verursacht bei häufig genutzten Sprachmodellen über die Zeit oft den größten Energiebedarf?", 2, ["die Inferenz durch sehr viele Anfragen", "der Kauf des Monitors", "die Datenschutzerklärung", "das Löschen von Daten"], 0)
        ],
        loesung: "<p>a) grundsätzlich verboten · b) Einwilligung · c) KI-Hinweis, Datenschutzinformation, AV-Vertrag, menschliche Ansprechperson · d) Bildung/Prüfungsbewertung · e) Inferenz bei vielen Anfragen.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s03b", satz: 3, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Zeitreihenprognose", text: "<p>Monatlicher Absatz eines Artikels: Jan 120 · Feb 130 · Mär 140 · Apr 150.</p>",
        teile: [
          t("a", "a) Nennen Sie die drei Komponenten einer Zeitreihe.", 3, "Trend (1 P.), Saison (1 P.), Rest/Zufall (1 P.)."),
          z("b", "b) Prognose für Mai als gleitender Durchschnitt der letzten drei Monate", 2, 140, 0.01),
          z("c", "c) Exponentielle Glättung mit α = 0,3: Vorprognose für April 100, Ist 150. Prognose für Mai", 3, 115, 0.01),
          t("d", "d) Warum validieren Sie Zeitreihenmodelle mit einer rollierenden zeitlichen Aufteilung?", 4, "Zufallsaufteilung lässt Zukunft ins Training (Leakage) (2 P.); rollierend bildet den echten Einsatz nach und prüft Stabilität über mehrere Zeitpunkte (2 P.)."),
          z("e", "e) Ist 200, Prognose 180. Absoluter prozentualer Fehler in %", 2, 10, 0.01, "%")
        ],
        loesung: "<p>a) Trend, Saison, Rest · b) (130 + 140 + 150) / 3 = <b>140</b> · c) 100 + 0,3 · (150 − 100) = <b>115</b> · d) keine Zukunft im Training, realistische Prüfung · e) 20 / 200 = <b>10 %</b>.</p><p>Hinweis zu b) und c): Der gleitende Durchschnitt hinkt einem Trend hinterher; beide Verfahren unterschätzen hier den steigenden Absatz.</p>" },

      { titel: "Merkmale entwickeln", text: "<p>Für eine tägliche Absatzprognose je Filiale und Artikel.</p>",
        teile: [
          t("a", "a) Nennen Sie drei aussagekräftige Merkmale.", 3, "Je 1 P.: Wochentag, Feiertage/Ferien, Wetter, Aktionen/Preise, Vortagesabsatz/Lags, Saison, Filialgröße, Veranstaltungen."),
          w("b", "b) Was ist ein Lag-Merkmal?", 2, ["ein Wert aus einem früheren Zeitpunkt, z. B. Absatz vor 7 Tagen", "ein fehlender Wert", "ein Hyperparameter", "ein Ausreißer"], 0),
          t("c", "c) Wie kodieren Sie den Wochentag, und warum nicht als Zahl 1 bis 7?", 3, "One-Hot oder zyklische Kodierung (Sinus/Kosinus) (2 P.); als Zahl würde eine falsche Ordnung/Abstand unterstellt, Sonntag weit weg von Montag (1 P.)."),
          w("d", "d) Welches Merkmal wäre Target Leakage?", 2, ["der tatsächliche Tagesumsatz des Prognosetags", "der Wochentag", "das Wetter laut Vorhersage", "der Absatz der Vorwoche"], 0)
        ],
        loesung: "<p>a) z. B. Wochentag, Aktionen, Wetter, Lags · b) Wert aus der Vergangenheit · c) One-Hot oder zyklisch · d) Umsatz des Prognosetags.</p>" },

      { titel: "Ensemble-Verfahren", text: "",
        teile: [
          t("a", "a) Unterscheiden Sie Bagging und Boosting.", 4, "Bagging: viele Modelle parallel auf Bootstrap-Stichproben, Mittelung, senkt Varianz, z. B. Random Forest (2 P.); Boosting: Modelle nacheinander, jedes korrigiert Fehler der vorigen, senkt Bias, z. B. Gradient Boosting (2 P.)."),
          w("b", "b) Was reduziert ein Random Forest vor allem gegenüber einem einzelnen tiefen Baum?", 2, ["die Varianz", "den Speicherbedarf", "die Anzahl der Merkmale", "die Datenmenge"], 0),
          w("c", "c) Was ist bei der eingebauten Feature Importance von Bäumen zu beachten?", 2, ["sie kann Merkmale mit vielen Ausprägungen überschätzen; Permutation Importance prüfen", "sie ist immer exakt kausal", "sie zeigt die Datenqualität", "sie gilt nur für Bilder"], 0),
          t("d", "d) Nennen Sie zwei wichtige Hyperparameter beim Gradient Boosting und ihre Wirkung.", 4, "Je 2 P.: Lernrate (kleinere Schritte, stabiler, mehr Bäume nötig), Anzahl Bäume (zu viele → Overfitting), maximale Tiefe (Komplexität), Subsampling (Regularisierung)."),
        ],
        loesung: "<p>a) Bagging parallel und mittelnd (Varianz), Boosting sequenziell und fehlerkorrigierend (Bias) · b) Varianz · c) Verzerrung zugunsten vieler Ausprägungen · d) z. B. Lernrate, Anzahl Bäume, Tiefe.</p>" },

      { titel: "Vorwärtsrechnung im Netz", text: "<p>Netz mit Eingaben x₁ = 1, x₂ = 2. Verdeckte Neuronen mit ReLU: h₁ = ReLU(0,5·x₁ + 1,0·x₂ − 1), h₂ = ReLU(−1,0·x₁ + 0,5·x₂). Ausgabe linear: y = 2·h₁ − 1·h₂ + 0,5.</p>",
        teile: [
          z("a", "a) h₁", 3, 1.5, 0.001),
          z("b", "b) h₂", 3, 0, 0.001),
          z("c", "c) y", 3, 3.5, 0.001),
          z("d", "d) Quadratischer Fehler bei Zielwert 3", 2, 0.25, 0.001),
          t("e", "e) Was ist das Problem verschwindender Gradienten, und wie hilft ReLU?", 3, "In tiefen Netzen werden Gradienten beim Rückwärtsrechnen sehr klein, vordere Schichten lernen kaum (2 P.); ReLU hat im positiven Bereich Ableitung 1 statt kleiner Sigmoid-Ableitungen (1 P.).")
        ],
        loesung: "<p>a) 0,5 + 2 − 1 = <b>1,5</b> · b) −1 + 1 = 0 → ReLU <b>0</b> · c) 2 · 1,5 − 0 + 0,5 = <b>3,5</b> · d) (3,5 − 3)² = <b>0,25</b> · e) kleine Gradienten in frühen Schichten; ReLU hält sie im positiven Bereich bei 1.</p>" },

      { titel: "Regressionsgüte", text: "",
        teile: [
          z("a", "a) Summe der quadrierten Residuen 20, Gesamtquadratsumme 100. R²", 3, 0.8, 0.001),
          t("b", "b) Warum vergleichen Sie ein Prognosemodell immer mit einer einfachen Baseline?", 3, "Baseline wie „Vorwoche“ oder Mittelwert zeigt, ob das Modell echten Mehrwert bringt (2 P.); komplexes Modell nur rechtfertigen, wenn deutlich besser (1 P.)."),
          w("c", "c) Was bedeutet ein negatives R² auf Testdaten?", 2, ["das Modell ist schlechter als der Mittelwert als Prognose", "perfekte Anpassung", "Rechenfehler unmöglich", "starke Korrelation"], 0),
          w("d", "d) Welches Problem hat der MAPE?", 2, ["er ist bei Ist-Werten nahe null nicht definiert bzw. extrem groß", "er ist immer negativ", "er misst nur Klassifikation", "er braucht keine Ist-Werte"], 0)
        ],
        loesung: "<p>a) 1 − 20 / 100 = <b>0,8</b> · b) Mehrwert gegenüber einfacher Lösung belegen · c) schlechter als der Mittelwert · d) Division durch kleine Ist-Werte.</p>" },

      { titel: "Verzerrungen und Robustheit", text: "",
        teile: [
          t("a", "a) Bei ausverkauften Artikeln werden nur die tatsächlichen Verkäufe gespeichert. Welches Problem entsteht für die Absatzprognose, und wie gehen Sie damit um?", 4, "Zensierte Nachfrage: wahre Nachfrage höher als Verkäufe, Modell unterschätzt und verstärkt Fehlbestände (Feedback-Loop) (2 P.); Out-of-Stock-Tage kennzeichnen/ausschließen, Nachfrage schätzen (2 P.)."),
          w("b", "b) Welches Ereignis erzeugt typischerweise eine Situation außerhalb der Trainingsverteilung?", 2, ["eine Pandemie mit Lockdowns", "ein normaler Montag", "ein üblicher Feiertag", "eine bekannte Preisaktion"], 0),
          t("c", "c) Nennen Sie zwei Tests zur Robustheit eines Prognosemodells.", 4, "Je 2 P.: Backtesting über mehrere Zeiträume, Stresstests mit extremen Werten, Ausfall einzelner Datenquellen simulieren, Rauschen hinzufügen, Vergleich mit Baseline in Sondersituationen.")
        ],
        loesung: "<p>a) Zensierte Nachfrage → Unterschätzung und Teufelskreis; OOS-Tage markieren und Nachfrage schätzen · b) Pandemie · c) Backtesting, Stresstests, Datenausfall simulieren.</p>" },

      { titel: "Erklärbarkeit", text: "",
        teile: [
          t("a", "a) Was zeigt ein Partial-Dependence-Plot?", 4, "Durchschnittliche Wirkung eines Merkmals auf die Vorhersage über dessen Wertebereich (2 P.), andere Merkmale gemittelt; zeigt z. B., wie Absatz mit Temperatur steigt (2 P.)."),
          w("b", "b) Welche Eigenschaft haben SHAP-Werte?", 2, ["sie summieren sich mit dem Basiswert zur Vorhersage", "sie sind immer positiv", "sie gelten nur für lineare Modelle", "sie messen die Datenqualität"], 0),
          w("c", "c) Wie misst Permutation Importance die Bedeutung eines Merkmals?", 2, ["durch Vergleich der Modellgüte vor und nach zufälligem Vertauschen seiner Werte", "durch Zählen seiner Ausprägungen", "durch Korrelation mit dem Index", "durch Löschen aller Zeilen"], 0)
        ],
        loesung: "<p>a) mittlere Wirkung eines Merkmals · b) additiv · c) Güteverlust nach Permutation.</p>" },

      { titel: "Zeitreihen in pandas", text: "<pre class=\"code\">import pandas as pd\ns = pd.Series([10, 12, 14, 13, 15])\nprint(s.rolling(3).mean().iloc[-1])\nprint(s.shift(1).iloc[1])\nprint(s.pct_change().iloc[1])</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 14, 0.001),
          z("b", "b) Zweite Ausgabe", 3, 10, 0.001),
          z("c", "c) Dritte Ausgabe", 2, 0.2, 0.001),
          w("d", "d) Welchen Wert hat s.rolling(3).mean() an den ersten beiden Positionen?", 2, ["NaN", "0", "10", "11"], 0)
        ],
        loesung: "<p>a) (14 + 13 + 15) / 3 = <b>14</b> · b) verschobener Wert = <b>10</b> · c) (12 − 10) / 10 = <b>0,2</b> · d) NaN, zu wenige Werte.</p>" },

      { titel: "Betrieb und Nachtraining", text: "",
        teile: [
          t("a", "a) Vergleichen Sie zeitgesteuertes und ereignisgesteuertes Nachtraining.", 4, "Zeitgesteuert: fester Rhythmus, planbar, evtl. unnötig oder zu spät (2 P.); ereignisgesteuert: bei Drift/Güteverlust, reaktiv, braucht Monitoring (2 P.)."),
          w("b", "b) Was ist ein Champion-Challenger-Vergleich?", 2, ["das neue Modell muss das laufende auf aktuellen Daten nachweislich übertreffen", "zwei Teams spielen gegeneinander", "ein Wettbewerb um Budget", "eine Hyperparametersuche"], 0),
          t("c", "c) Welche automatischen Tests gehören in eine CI/CD-Pipeline für ML? Nennen Sie zwei.", 4, "Je 2 P.: Datenvalidierung (Schema, Verteilungen), Modellgüte über Mindestwert/gegen Baseline, Fairness-Prüfung, Unit-Tests für Code, Latenz-/Lasttests."),
          w("d", "d) Wozu dient Datenversionierung?", 2, ["Trainingsläufe reproduzierbar machen", "Daten löschen", "Speicher sparen", "Datenschutzerklärung erstellen"], 0)
        ],
        loesung: "<p>a) planbar vs. bedarfsgesteuert · b) neues Modell muss das alte schlagen · c) Datenvalidierung, Gütetests, Fairness, Unit-Tests · d) Reproduzierbarkeit.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s03t2", satz: 3, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI-Absatzprognose im Lebensmittelhandel", kurz: "Einzelhandel · Absatzprognose", minuten: 240,
    situation: "<p>Die <b>Grünmarkt Lebensmittel GmbH</b> betreibt 85 Filialen mit 2.400 Beschäftigten (Betriebsrat vorhanden) und erzielt 520 Mio. € Umsatz, davon 40 Mio. € mit Frischware (Obst, Gemüse, Backwaren). Bei Frischware werden 4,5 % des Umsatzes abgeschrieben, gleichzeitig sind beliebte Artikel nachmittags oft ausverkauft.</p><p>Heute bestellen die Filialleitungen täglich nach Erfahrung. Geplant ist eine KI-Absatzprognose je Filiale und Artikel mit automatischen Bestellvorschlägen, die von den Filialleitungen bestätigt oder angepasst werden. Daten: Kassendaten aus drei Jahren, Aktionen, Wetter, Feiertage; Kundenkarten-Daten von 600.000 Kunden. Sie leiten das Vorhaben.</p>",
    aufgaben: [
      { titel: "KI-Lösung konzipieren", text: "",
        teile: [
          t("a", "a) Beschreiben Sie Ziel, Datengrundlage, Granularität und Modellansatz der Prognose.", 6, "Ziel: Abschriften und Fehlbestände senken (1 P.); Daten: Kassen, Aktionen, Wetter, Feiertage, Bestände (2 P.); Granularität: Tag × Filiale × Artikel (1 P.); Modell: Regression/Zeitreihe, z. B. Gradient Boosting mit Lags, Baseline Vorwoche (2 P.)."),
          z("b", "b) Ist 100, 80, 50 · Prognose 90, 88, 50. MAPE in % (zwei Nachkommastellen)", 3, 6.67, 0.05, "%"),
          z("c", "c) Mittlerer Fehler (Prognose − Ist) als Maß für systematische Verzerrung (drei Nachkommastellen)", 3, -0.667, 0.005),
          t("d", "d) Eine neue Filiale eröffnet ohne Verkaufshistorie. Wie erstellen Sie Prognosen?", 4, "Kaltstart: Daten ähnlicher Filialen nutzen (Standort, Größe, Kaufkraft) (2 P.); globales Modell über alle Filialen mit Filialmerkmalen, schnelles Nachlernen mit ersten Wochen (2 P.).")
        ],
        loesung: "<p>a) Ziel Abschriften und Fehlbestände senken; Daten: Kassen, Aktionen, Wetter, Feiertage, Bestände; je Tag, Filiale und Artikel; globales Gradient-Boosting-Modell mit Lag-Merkmalen, Baseline „gleicher Wochentag der Vorwoche“.</p><p>b) (10 % + 10 % + 0 %) / 3 ≈ <b>6,67 %</b> · c) (−10 + 8 + 0) / 3 ≈ <b>−0,667</b> – leichte Unterschätzung · d) Ähnliche Filialen und globales Modell nutzen.</p>" },

      { titel: "Prozess", text: "<p>Heute benötigt jede Filialleitung 45 Minuten pro Tag für die Frischedisposition, mit Bestellvorschlägen noch 15 Minuten. 85 Filialen, 300 Verkaufstage.</p>",
        teile: [
          z("a", "a) Eingesparte Stunden pro Jahr", 3, 12750, 0, "h"),
          t("b", "b) Beschreiben Sie den Soll-Prozess der Bestellung mit KI.", 5, "Nachts Prognose und Bestellvorschlag (1 P.); Filialleitung prüft morgens, passt bei lokalem Wissen an (1 P.); Ausnahmen (Feste, Baustelle) melden (1 P.); Bestellung an Zentrallager (1 P.); Abweichungen und Gründe fließen ins Lernen zurück (1 P.)."),
          t("c", "c) Nennen Sie zwei Kennzahlen mit Zielwert.", 4, "Je 2 P.: Abschriftenquote Frische (z. B. von 4,5 % auf 3,5 %), Out-of-Stock-Quote, Prognosefehler, Anteil unveränderter Vorschläge, Dispositionszeit."),
          z("d", "d) Abschriften 1,8 Mio. € bei 40 Mio. € Frischeumsatz. Abschriftenquote in %", 2, 4.5, 0.01, "%")
        ],
        loesung: "<p>a) (45 − 15) · 85 · 300 / 60 = <b>12.750 h</b> · b) Prognose nachts, Prüfung durch Filialleitung, Anpassung bei lokalem Wissen, Bestellung, Rückmeldung · c) z. B. Abschriftenquote 3,5 %, Out-of-Stock unter 2 % · d) <b>4,5 %</b>.</p>" },

      { titel: "Projekt", text: "",
        teile: [
          t("a", "a) Beschreiben Sie einen Stufenplan vom Proof of Concept bis zum Rollout mit Entscheidungstoren.", 4, "PoC auf historischen Daten gegen Baseline (1 P.); Pilot in 5 Filialen mit Kennzahlen (1 P.); Rollout in Wellen (1 P.); Gates mit Kriterien wie Abschriften −15 %, Akzeptanz, Kosten (1 P.)."),
          w("b", "b) In der RACI-Matrix ist für „Freigabe Rollout“ niemand mit A eingetragen. Was ist falsch?", 2, ["Es fehlt die eine verantwortliche Person (A)", "Es dürfen keine Freigaben in der Matrix stehen", "Es müssen zwei A eingetragen sein", "Nichts"], 0),
          z("c", "c) BAC 500 T€, PV 300 T€, EV 270 T€, AC 330 T€. CPI (drei Nachkommastellen)", 2, 0.818, 0.003),
          z("d", "d) SPI", 2, 0.9, 0.003),
          z("e", "e) EAC = BAC / CPI in T€ (eine Nachkommastelle)", 2, 611.1, 1),
          t("f", "f) Nennen Sie eine Steuerungsmaßnahme.", 2, "Z. B. Ursachen der Mehrkosten klären, Umfang der Welle reduzieren, Lenkungsausschuss/Change Request, Ressourcen umplanen (2 P.).")
        ],
        loesung: "<p>a) PoC → Pilot → Rollout in Wellen, je mit Gate. b) genau ein A je Aufgabe · c) 270 / 330 ≈ <b>0,818</b> · d) 270 / 300 = <b>0,9</b> · e) 500 / 0,818 ≈ <b>611,1 T€</b> · f) z. B. Lenkungsausschuss einbinden.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Wie ist die Absatzprognose nach der KI-Verordnung einzustufen?", 2, ["minimales Risiko", "Hochrisiko", "verboten", "System mit systemischem Risiko"], 0),
          t("b", "b) Was ist bei Nutzung der Kundenkarten-Daten datenschutzrechtlich zu beachten?", 4, "Personenbezogene Daten (1 P.); Zweckbindung/Vereinbarkeit mit Kundenkartenvertrag prüfen, Rechtsgrundlage (1 P.); Datenminimierung: aggregieren oder pseudonymisieren, für Absatz meist keine Einzelkunden nötig (1 P.); Information/Transparenz (1 P.)."),
          w("c", "c) Ein Dienstleister entwickelt das Modell mit vereinbarter Zielgenauigkeit und Abnahme. Vertragsart?", 2, ["Werkvertrag", "Dienstvertrag", "Kaufvertrag", "Mietvertrag"], 0),
          w("d", "d) Das Modell verfehlt bei der Abnahme die vereinbarte Genauigkeit. Was kann Grünmarkt zuerst verlangen?", 2, ["Nacherfüllung", "sofortigen Schadensersatz", "Rücktritt ohne Frist", "nichts"], 0),
          w("e", "e) Die Bestellvorschläge zeigen auch, wie oft Filialleitungen abweichen. Welches Recht hat der Betriebsrat?", 2, ["Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG", "keines", "nur Anhörung nach § 102", "Zustimmung nach § 99"], 0),
          w("f", "f) Unterliegt Grünmarkt nach Omnibus I der CSRD-Berichtspflicht?", 2, ["ja, über 1.000 Beschäftigte und über 450 Mio. € Umsatz", "nein, nur Banken", "nein, zu klein", "nur bei Börsennotierung"], 0)
        ],
        loesung: "<p>a) minimales Risiko · b) Zweckbindung, Rechtsgrundlage, Aggregation oder Pseudonymisierung, Information · c) Werkvertrag · d) Nacherfüllung · e) § 87 Abs. 1 Nr. 6 · f) ja (2.400 Beschäftigte, 520 Mio. €).</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Ziel: Abschriftenquote Frische von 4,5 % auf 3,5 %. Eingesparte Dispositionszeit (12.750 h) wird für Kundenberatung genutzt, bewertet mit 22 € je Stunde. Investition 600.000 €, laufende Kosten 150.000 € je Jahr, Nutzungsdauer 3 Jahre, Zins 8 % (Rentenbarwertfaktor 2,5771).</p>",
        teile: [
          z("a", "a) Einsparung an Abschriften pro Jahr", 3, 400000, 0, "€"),
          z("b", "b) Bewerteter Zeitgewinn pro Jahr", 3, 280500, 0, "€"),
          z("c", "c) Jährlicher Rückfluss", 2, 530500, 0, "€"),
          z("d", "d) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 2, 1.13, 0.01, "Jahre"),
          z("e", "e) Kapitalwert", 4, 767152, 10, "€"),
          t("f", "f) Wie verändert sich das Ergebnis, wenn der Zeitgewinn nicht in Geld wirksam wird? Bewerten Sie.", 4, "Rückfluss nur 250.000 € (1 P.); Kapitalwert ≈ 250.000 · 2,5771 − 600.000 ≈ 44.275 € – noch positiv, aber knapp (2 P.); Ergebnis hängt stark von der Annahme ab, Pilot messen (1 P.).")
        ],
        loesung: "<p>a) 1 % von 40 Mio. € = <b>400.000 €</b> · b) 12.750 · 22 = <b>280.500 €</b> · c) 400.000 + 280.500 − 150.000 = <b>530.500 €</b> · d) 600.000 / 530.500 ≈ <b>1,13 Jahre</b> · e) 530.500 · 2,5771 − 600.000 ≈ <b>767.152 €</b> · f) Ohne Zeitgewinn: 250.000 € Rückfluss, Kapitalwert ≈ 44.275 € – positiv, aber deutlich weniger robust.</p>" },

      { titel: "Personal und Führung", text: "<p>Viele Filialleitungen sagen: „Ich kenne meine Kunden seit 20 Jahren, ich brauche keinen Computer.“</p>",
        teile: [
          t("a", "a) Wie gestalten Sie den Wandel? Nennen Sie vier Schritte nach Kotter mit konkreter Maßnahme.", 4, "Je 1 P.: Dringlichkeit (Abschriftenzahlen), Führungskoalition (erfahrene Filialleitungen als Paten), Vision kommunizieren, Hindernisse beseitigen (Schulung), schnelle Erfolge aus Pilotfilialen zeigen, verankern."),
          w("b", "b) Eine erfahrene, motivierte Filialleiterin arbeitet bereits souverän mit den Vorschlägen. Welcher Stil passt?", 2, ["delegieren", "unterweisen", "verkaufen", "autoritär"], 0),
          t("c", "c) Skizzieren Sie ein Schulungskonzept für 85 Filialleitungen.", 4, "Inhalte: Funktionsweise, Grenzen, wann anpassen, Rückmeldung (2 P.); Form: kurze Präsenz-/Onlineschulung, Key User je Region, Lernvideos, Begleitung im Pilot (2 P.)."),
          w("d", "d) Zwei Regionalleiter streiten öffentlich mit Polemik über den Rollout. Welche Glasl-Stufe?", 2, ["Stufe 2 Debatte, Polemik", "Stufe 1", "Stufe 6", "Stufe 9"], 0)
        ],
        loesung: "<p>a) z. B. Dringlichkeit durch Abschriftenzahlen, Paten, Vision, Schulung, Erfolge zeigen · b) delegieren · c) Inhalte plus Key User und Begleitung · d) Stufe 2.</p>" },

      { titel: "Zukunftskompetenzen", text: "",
        teile: [
          t("a", "a) Die Prognose sagt für Dezember einen Rekordabsatz frischer Erdbeeren voraus. Wie prüfen Sie das kritisch?", 4, "Plausibilität mit Saison und Vorjahren (1 P.); Ursache suchen, z. B. Aktion, Datenfehler, falscher Artikelschlüssel (2 P.); Erklärung (SHAP) ansehen, Fachbereich fragen, ggf. korrigieren (1 P.)."),
          t("b", "b) Formulieren Sie die Kernaussage Ihrer Präsentation für die Geschäftsführung in zwei Sätzen.", 4, "Empfehlung mit Zahl, z. B. Rollout in drei Wellen, Abschriften −1 Prozentpunkt = 400.000 € pro Jahr (2 P.); Bedingung/Risiko und Entscheidungsbedarf (2 P.)."),
          w("c", "c) Fehlbestellungen wiederholen sich in einer Filiale. Welche Methode hilft, die Grundursache zu finden?", 2, ["5-Why", "Pomodoro", "Johari-Fenster", "Pareto-Prinzip allein"], 0),
          w("d", "d) Ein Teammitglied prüft alle Zahlen akribisch und hält Termine ein. Belbin-Rolle?", 2, ["Perfektionist", "Neuerer", "Wegbereiter", "Macher"], 0)
        ],
        loesung: "<p>a) Plausibilität, Ursachen, Erklärung, Fachbereich · b) z. B. „Wir empfehlen den Rollout in drei Wellen: Er senkt die Abschriften um 400.000 € pro Jahr. Voraussetzung ist die Betriebsvereinbarung bis März.“ · c) 5-Why · d) Perfektionist.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
