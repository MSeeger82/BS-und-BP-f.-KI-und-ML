/* Bachelor-Prüfungssatz 2 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s02a", satz: 2, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Was ist ein KI-System?", text: "",
        teile: [
          w("a", "a) Welches Merkmal ist nach der EU-KI-Verordnung zentral für ein KI-System?", 2, ["Es leitet aus Eingaben ab, wie es Ausgaben wie Vorhersagen oder Entscheidungen erzeugt", "Es läuft in der Cloud", "Es enthält ein neuronales Netz", "Es ist teurer als 10.000 €"], 0),
          t("b", "b) Unterscheiden Sie schwache und starke KI.", 4, "Schwache KI löst eng begrenzte Aufgaben, Stand der Technik (2 P.); starke KI wäre allgemeine, menschenähnliche Intelligenz, existiert bisher nicht (2 P.)."),
          w("c", "c) Was prüft der Turing-Test?", 2, ["ob ein Mensch im Gespräch eine Maschine von einem Menschen unterscheiden kann", "die Rechengeschwindigkeit", "die Genauigkeit eines Klassifikators", "die Datenqualität"], 0),
          w("d", "d) Welche Anwendung ist generative KI?", 2, ["ein Sprachmodell erstellt einen Angebotsentwurf", "ein Spamfilter sortiert E-Mails", "eine Regression schätzt Umsätze", "k-Means bildet Kundengruppen"], 0)
        ],
        loesung: "<p>a) Ableiten aus Eingaben (Art. 3 Nr. 1). b) Schwache KI: spezialisiert, heute Realität; starke KI: allgemein, bisher nicht vorhanden. c) Unterscheidbarkeit im Gespräch. d) Textgenerierung.</p>" },

      { titel: "Datenvorverarbeitung", text: "<p>Merkmal Alter in Jahren: <b>20, 30, 40, 50, 60</b>.</p>",
        teile: [
          z("a", "a) Min-Max-normierter Wert für 40 (Bereich 0 bis 1)", 2, 0.5, 0.001),
          z("b", "b) z-Wert für 60 (Standardabweichung mit Division durch n, drei Nachkommastellen)", 3, 1.414, 0.005),
          w("c", "c) Das Merkmal Farbe hat die Werte rot, grün, blau. Wie viele Spalten entstehen bei One-Hot-Kodierung?", 2, ["3", "1", "2", "6"], 0),
          t("d", "d) Nennen Sie zwei Verfahren für fehlende Werte mit je einem Nachteil.", 3, "Je 1,5 P.: Zeilen löschen (Datenverlust, Verzerrung); Mittelwert/Median einsetzen (unterschätzt Streuung); Modellbasierte Imputation (Aufwand); Indikatorvariable."),
          w("e", "e) Für welches Verfahren ist Skalierung besonders wichtig?", 2, ["k-nächste Nachbarn", "Entscheidungsbaum", "Random Forest", "Regelbasierte Systeme"], 0)
        ],
        loesung: "<p>a) (40 − 20) / (60 − 20) = <b>0,5</b> · b) Mittel 40, Varianz (400 + 100 + 0 + 100 + 400) / 5 = 200, σ ≈ 14,142; z = 20 / 14,142 ≈ <b>1,414</b> · c) <b>3</b> · d) z. B. Löschen (Datenverlust), Median einsetzen (Streuung sinkt). · e) kNN (distanzbasiert).</p>" },

      { titel: "Statistik", text: "<p>Anzahl der Reklamationen an acht Tagen: <b>2, 4, 4, 5, 7, 8, 9, 11</b>. Die Korrelation zwischen Tagesumsatz und Reklamationen beträgt r = 0,92.</p>",
        teile: [
          z("a", "a) Arithmetisches Mittel", 2, 6.25, 0.01),
          z("b", "b) Median", 2, 6, 0.01),
          w("c", "c) Was sagt r = 0,92?", 2, ["starker positiver linearer Zusammenhang", "kein Zusammenhang", "starker negativer Zusammenhang", "92 % der Reklamationen entstehen durch Umsatz"], 0),
          w("d", "d) Welche Aussage ist korrekt?", 2, ["Korrelation beweist keine Ursache – mehr Umsatz bedeutet einfach mehr Bestellungen", "Mehr Umsatz verursacht sicher mehr Fehler", "Reklamationen verursachen Umsatz", "r = 0,92 heißt Kausalität"], 0),
          t("e", "e) Was zeigt ein Boxplot?", 4, "Median (1 P.), Quartile/Box mit mittleren 50 % (1 P.), Whisker/Spannweite (1 P.), Ausreißer (1 P.).")
        ],
        loesung: "<p>a) 50 / 8 = <b>6,25</b> · b) (5 + 7) / 2 = <b>6</b> · c) starker positiver Zusammenhang · d) Korrelation ist keine Kausalität · e) Median, Quartile, Whisker, Ausreißer.</p>" },

      { titel: "k-nächste Nachbarn", text: "<p>Trainingspunkte: P₁ (1; 1) Klasse A · P₂ (2; 3) Klasse A · P₃ (3; 2) Klasse B · P₄ (4; 4) Klasse B · P₅ (2; 1) Klasse B. Neuer Punkt Q (2; 2), euklidische Distanz.</p>",
        teile: [
          z("a", "a) Distanz von Q zu P₁ (drei Nachkommastellen)", 2, 1.414, 0.005),
          w("b", "b) Welche Klasse sagt kNN mit k = 3 voraus?", 3, ["B", "A", "unentscheidbar", "keine"], 0),
          t("c", "c) Warum müssen Merkmale bei kNN skaliert werden?", 3, "Distanzen werden sonst vom Merkmal mit dem größten Wertebereich dominiert (2 P.), z. B. Einkommen in Euro gegenüber Alter (1 P.)."),
          w("d", "d) Was bewirkt ein sehr großes k?", 2, ["glattere Entscheidungsgrenze, Gefahr von Underfitting", "Overfitting", "schnelleres Training", "keine Wirkung"], 0)
        ],
        loesung: "<p>a) √2 ≈ <b>1,414</b>. Die drei nächsten Nachbarn P₂, P₃, P₅ haben Distanz 1: einmal A, zweimal B → <b>B</b>. c) Sonst dominiert das Merkmal mit dem größten Wertebereich. d) Glattere Grenze, Underfitting.</p>" },

      { titel: "Entscheidungsbaum", text: "<p>Ein Knoten enthält 10 Fälle: 6 „ja“, 4 „nein“. Ein Split teilt ihn in links (4 ja, 0 nein) und rechts (2 ja, 4 nein).</p>",
        teile: [
          z("a", "a) Gini-Unreinheit des Ausgangsknotens", 3, 0.48, 0.005),
          z("b", "b) Gini-Unreinheit des rechten Knotens (drei Nachkommastellen)", 3, 0.444, 0.005),
          z("c", "c) Gewichtete Gini-Unreinheit nach dem Split (drei Nachkommastellen)", 2, 0.267, 0.005),
          w("d", "d) Lohnt sich der Split?", 2, ["ja, die Unreinheit sinkt deutlich", "nein, sie steigt", "nein, Gini ist irrelevant", "nur bei Regression"], 0)
        ],
        loesung: "<p>a) 1 − (0,6² + 0,4²) = <b>0,48</b> · b) 1 − ((2/6)² + (4/6)²) = 1 − 5/9 ≈ <b>0,444</b> · c) links Gini 0; 0,4 · 0 + 0,6 · 0,444 ≈ <b>0,267</b> · d) ja.</p>" },

      { titel: "Fehlermaße der Regression", text: "<p>Ist-Werte: 100, 120, 80, 100 · Prognosen: 110, 115, 90, 95.</p>",
        teile: [
          z("a", "a) MAE", 3, 7.5, 0.01),
          z("b", "b) MSE", 3, 62.5, 0.01),
          z("c", "c) RMSE (drei Nachkommastellen)", 2, 7.906, 0.005),
          w("d", "d) Was unterscheidet RMSE von MAE?", 2, ["RMSE gewichtet große Fehler stärker", "RMSE ist immer kleiner", "MAE quadriert die Fehler", "Es gibt keinen Unterschied"], 0)
        ],
        loesung: "<p>Fehler 10, −5, 10, −5. a) (10 + 5 + 10 + 5) / 4 = <b>7,5</b> · b) (100 + 25 + 100 + 25) / 4 = <b>62,5</b> · c) √62,5 ≈ <b>7,906</b> · d) Quadrieren gewichtet große Fehler stärker.</p>" },

      { titel: "Python", text: "<pre class=\"code\">preise = [12.5, 8.0, 20.0, 15.5]\nteuer = [p for p in preise if p &gt; 10]\nprint(len(teuer))\nprint(round(sum(teuer) / len(teuer), 2))\nd = {\"a\": 1, \"b\": 2}\nd[\"c\"] = d[\"a\"] + d[\"b\"]\nprint(d[\"c\"] * 2)</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 3, 0),
          z("b", "b) Zweite Ausgabe", 3, 16, 0.001),
          z("c", "c) Dritte Ausgabe", 2, 6, 0),
          w("d", "d) Was erzeugt die zweite Zeile?", 2, ["eine neue Liste mit allen Preisen über 10", "eine Zahl", "ein Dictionary", "einen Fehler"], 0)
        ],
        loesung: "<p>a) teuer = [12.5, 20.0, 15.5] → <b>3</b> · b) 48 / 3 = <b>16.0</b> · c) 3 · 2 = <b>6</b> · d) List Comprehension mit Filter.</p>" },

      { titel: "Datenbanken", text: "<p>Ein Unternehmen modelliert Projekte und Mitarbeitende. Eine Person arbeitet in mehreren Projekten, ein Projekt hat mehrere Personen.</p>",
        teile: [
          w("a", "a) Wie bilden Sie diese n:m-Beziehung relational ab?", 2, ["mit einer Zwischentabelle mit beiden Fremdschlüsseln", "mit einem Fremdschlüssel in der Projekttabelle", "gar nicht", "mit einer einzigen Tabelle für alles"], 0),
          w("b", "b) Was ist ein Primärschlüssel?", 2, ["ein Attribut, das jede Zeile eindeutig identifiziert", "der erste Spaltenname", "ein Passwort", "ein Index für Texte"], 0),
          t("c", "c) Wozu dient die Normalisierung einer Datenbank?", 4, "Redundanzen vermeiden (2 P.), Anomalien bei Einfügen, Ändern, Löschen verhindern (2 P.)."),
          w("d", "d) Was unterscheidet einen Data Lake von einem Data Warehouse?", 2, ["Der Data Lake speichert Rohdaten in vielen Formaten, das Warehouse strukturierte, aufbereitete Daten", "Es gibt keinen Unterschied", "Ein Data Warehouse speichert nur Bilder", "Ein Data Lake ist immer kleiner"], 0),
          w("e", "e) Was liefert SELECT abteilung, COUNT(*) FROM personal GROUP BY abteilung?", 2, ["die Anzahl der Personen je Abteilung", "alle Personen", "die Summe der Gehälter", "nur eine Zahl"], 0)
        ],
        loesung: "<p>a) Zwischentabelle (z. B. mitarbeit(person_id, projekt_id)) · b) eindeutige Identifikation · c) Redundanzen und Anomalien vermeiden · d) Rohdaten vs. aufbereitete Daten · e) Personen je Abteilung.</p>" },

      { titel: "Recht und Ethik", text: "",
        teile: [
          w("a", "a) Wie ist ein KI-System zur Prüfung der Kreditwürdigkeit von Verbrauchern eingestuft?", 2, ["Hochrisiko", "verboten", "minimales Risiko", "nur Transparenz"], 0),
          w("b", "b) Wie ist Emotionserkennung von Schülerinnen und Schülern im Unterricht eingestuft?", 2, ["verboten (außer aus medizinischen oder Sicherheitsgründen)", "minimales Risiko", "Hochrisiko", "nur Transparenz"], 0),
          w("c", "c) Welche Daten gehören zu den besonderen Kategorien nach Art. 9 DSGVO?", 2, ["Gesundheitsdaten", "Postleitzahl", "Kundennummer", "Bestellwert"], 0),
          t("d", "d) Nennen Sie zwei Gründe, warum Erklärbarkeit bei KI-Entscheidungen wichtig ist.", 4, "Je 2 P.: Vertrauen/Akzeptanz, Fehler und Bias erkennen, rechtliche Anforderungen (DSGVO, KI-VO), menschliche Aufsicht ermöglichen, Verbesserung des Modells."),
          w("e", "e) Was gilt für Deepfakes nach der KI-Verordnung?", 2, ["Sie müssen als künstlich erzeugt offengelegt werden", "Sie sind immer verboten", "Keine Pflichten", "Nur Hochrisiko-Regeln"], 0),
          w("f", "f) Was bedeutet Datenminimierung?", 2, ["nur so viele Daten wie für den Zweck nötig verarbeiten", "Daten komprimieren", "Daten löschen nach einem Tag", "nur Zahlen speichern"], 0)
        ],
        loesung: "<p>a) Hochrisiko (Anhang III) · b) verboten (Art. 5) · c) Gesundheitsdaten · d) z. B. Fehler und Bias erkennen, Vertrauen, rechtliche Pflichten, wirksame menschliche Aufsicht · e) Offenlegungspflicht · f) so wenig wie nötig.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s02b", satz: 2, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Gradientenabstieg", text: "<p>Verlustfunktion L(w) = (w − 3)², Startwert w₀ = 0, Lernrate η = 0,1. Update: w ← w − η · L′(w).</p>",
        teile: [
          z("a", "a) w nach dem ersten Schritt", 3, 0.6, 0.001),
          z("b", "b) w nach dem zweiten Schritt", 3, 1.08, 0.001),
          t("c", "c) Was passiert mit η = 1,0? Rechnen Sie zwei Schritte und deuten Sie das Ergebnis.", 4, "w₁ = 0 − 1 · (−6) = 6 (1 P.); w₂ = 6 − 1 · 6 = 0 (1 P.); das Verfahren springt hin und her und konvergiert nicht – Lernrate zu groß (2 P.)."),
          w("d", "d) Was ist Mini-Batch-Gradientenabstieg?", 2, ["Gradient wird je Schritt aus einer kleinen Teilmenge der Daten berechnet", "Training ohne Gradienten", "Training nur mit einem Datenpunkt pro Epoche", "eine Aktivierungsfunktion"], 0)
        ],
        loesung: "<p>L′(w) = 2(w − 3). a) L′(0) = −6 → w₁ = 0 + 0,6 = <b>0,6</b> · b) L′(0,6) = −4,8 → w₂ = 0,6 + 0,48 = <b>1,08</b> · c) w₁ = 6, w₂ = 0, w₃ = 6 … – Oszillation, keine Konvergenz. d) Gradient aus kleinen Teilmengen.</p>" },

      { titel: "Regularisierung", text: "",
        teile: [
          t("a", "a) Unterscheiden Sie L1- und L2-Regularisierung in Wirkung und Einsatz.", 4, "L1: Strafe auf Beträge, setzt Gewichte auf null, Merkmalsauswahl (2 P.); L2: Strafe auf Quadrate, verkleinert Gewichte gleichmäßig (2 P.)."),
          w("b", "b) Training sehr gut, Validierung deutlich schlechter. Was liegt vor?", 2, ["hohe Varianz (Overfitting)", "hoher Bias (Underfitting)", "Data Drift", "Datenleck im Test"], 0),
          w("c", "c) Was macht Dropout?", 2, ["deaktiviert beim Training zufällig Neuronen", "löscht Datensätze", "senkt die Lernrate", "entfernt Merkmale endgültig"], 0),
          w("d", "d) Was ist Early Stopping?", 2, ["Training beenden, wenn der Validierungsfehler nicht mehr sinkt", "Training nach einer Epoche abbrechen", "Testdaten früh ansehen", "kleineres Netz wählen"], 0)
        ],
        loesung: "<p>a) L1 (Lasso) erzeugt Nullgewichte und wählt Merkmale aus; L2 (Ridge) verkleinert alle Gewichte. b) Overfitting · c) zufälliges Abschalten von Neuronen · d) Abbruch bei steigendem Validierungsfehler.</p>" },

      { titel: "Schwellenwert und Kosten", text: "<p>Ein Screening-Modell prüft 1.000 Fälle (100 positiv, 900 negativ). Bei Schwelle 0,5: Recall 80 %, Falsch-positiv-Rate 20 %. Bei Schwelle 0,3: Recall 95 %, Falsch-positiv-Rate 40 %. Ein übersehener Fall kostet 500 €, ein Fehlalarm 50 €.</p>",
        teile: [
          w("a", "a) Was bedeutet eine AUC von 0,5?", 2, ["das Modell trennt nicht besser als Zufall", "perfekte Trennung", "50 % Accuracy", "50 % Precision"], 0),
          z("b", "b) Fehlerkosten bei Schwelle 0,5", 2, 19000, 0, "€"),
          z("c", "c) Fehlerkosten bei Schwelle 0,3", 2, 20500, 0, "€"),
          w("d", "d) Welche Schwelle ist hier kostengünstiger?", 2, ["0,5", "0,3", "beide gleich", "keine Aussage möglich"], 0),
          t("e", "e) In einem medizinischen Screening wären übersehene Fälle viel teurer. Wie verändert sich die Entscheidung, und warum?", 4, "Bei höheren FN-Kosten lohnt die niedrigere Schwelle (höherer Recall) (2 P.); Abwägung über Kosten je Fehlerart, nicht über Accuracy (2 P.).")
        ],
        loesung: "<p>a) Zufallsniveau. b) FN = 20, FP = 180 → 20 · 500 + 180 · 50 = <b>19.000 €</b> · c) FN = 5, FP = 360 → 2.500 + 18.000 = <b>20.500 €</b> · d) 0,5 · e) Steigen die Kosten übersehener Fälle, wird die niedrigere Schwelle günstiger.</p>" },

      { titel: "Convolutional Neural Network", text: "<p>Eingabebild 32 × 32 Pixel mit 3 Farbkanälen. Faltungsschicht: 16 Filter der Größe 3 × 3, Schrittweite 1, kein Padding.</p>",
        teile: [
          z("a", "a) Breite der Ausgabe", 3, 30, 0),
          z("b", "b) Anzahl lernbarer Parameter der Faltungsschicht (mit Bias)", 3, 448, 0),
          z("c", "c) Breite nach anschließendem Max-Pooling 2 × 2 mit Schrittweite 2", 2, 15, 0),
          t("d", "d) Warum eignen sich CNN besser für Bilder als vollständig verbundene Netze?", 4, "Gemeinsame Gewichte/wenige Parameter (1 P.), lokale Muster werden erkannt (1 P.), Verschiebungsinvarianz (1 P.), hierarchische Merkmale von Kanten zu Objekten (1 P.).")
        ],
        loesung: "<p>a) (32 − 3) / 1 + 1 = <b>30</b> · b) (3 · 3 · 3 + 1) · 16 = <b>448</b> · c) <b>15</b> · d) gemeinsame Filtergewichte, lokale Muster, Verschiebungsinvarianz, hierarchische Merkmale.</p>" },

      { titel: "Sprachmodelle", text: "",
        teile: [
          t("a", "a) Erklären Sie das Prinzip der Self-Attention im Transformer.", 4, "Jedes Token gewichtet alle anderen Tokens nach Relevanz (2 P.), über Query, Key, Value bzw. Ähnlichkeit (1 P.), erfasst Kontext über lange Abstände parallel (1 P.)."),
          w("b", "b) Was ist Tokenisierung?", 2, ["Zerlegung von Text in Einheiten wie Wortteile", "Verschlüsselung", "Löschen von Stoppwörtern", "Übersetzung"], 0),
          w("c", "c) Was bewirkt eine höhere Temperatur bei der Textgenerierung?", 2, ["vielfältigere, zufälligere Ausgaben", "kürzere Antworten", "weniger Halluzinationen", "schnellere Berechnung"], 0),
          t("d", "d) Was ist Retrieval-Augmented Generation (RAG), und warum hilft es gegen Halluzinationen?", 4, "Relevante Dokumente werden gesucht und dem Modell als Kontext gegeben (2 P.); Antwort stützt sich auf Quellen, Quellenangabe ermöglicht Prüfung, aktuelles Firmenwissen (2 P.).")
        ],
        loesung: "<p>a) Jedes Token berechnet Gewichte für alle anderen (Query/Key/Value) und kombiniert deren Informationen – Kontext über lange Abstände. b) Zerlegung in Tokens · c) mehr Zufall · d) Suche passender Dokumente plus Generierung auf deren Basis – überprüfbar und aktuell.</p>" },

      { titel: "Dichtebasiertes Clustering", text: "",
        teile: [
          w("a", "a) Ein Vorteil von DBSCAN gegenüber k-Means ist …", 2, ["Cluster beliebiger Form und Erkennung von Ausreißern ohne Vorgabe von k", "es braucht keine Parameter", "es ist immer schneller", "es liefert Wahrscheinlichkeiten"], 0),
          w("b", "b) Welche Parameter steuern DBSCAN?", 2, ["Radius ε und Mindestanzahl Punkte (minPts)", "k und Lernrate", "Baumtiefe", "Anzahl Epochen"], 0),
          t("c", "c) Was misst der Silhouettenkoeffizient?", 4, "Wie ähnlich ein Punkt seinem Cluster im Vergleich zum nächsten Cluster ist (2 P.); Werte von −1 bis 1, nahe 1 gut getrennt (2 P.).")
        ],
        loesung: "<p>a) beliebige Formen, Ausreißer als Rauschen · b) ε und minPts · c) Vergleich der Distanz zum eigenen und zum nächsten Cluster, −1 bis 1.</p>" },

      { titel: "Erklärbarkeit", text: "<p>Ein lineares Modell zur Kündigungswahrscheinlichkeit hat die Gewichte 0,4 (Monate ohne Kauf) und −1,2 (Servicekontakte). Ein Kunde liegt 10 Monate und 2 Kontakte über dem Durchschnitt.</p>",
        teile: [
          z("a", "a) Beitrag „Monate ohne Kauf“", 2, 4, 0.001),
          z("b", "b) Beitrag „Servicekontakte“", 2, -2.4, 0.001),
          z("c", "c) Summe der Beiträge", 2, 1.6, 0.001),
          t("d", "d) Unterscheiden Sie globale und lokale Erklärungen mit je einem Verfahren.", 4, "Global: Verhalten des Modells insgesamt, z. B. Feature Importance, Partial Dependence (2 P.); lokal: einzelne Vorhersage, z. B. SHAP, LIME (2 P.).")
        ],
        loesung: "<p>a) 0,4 · 10 = <b>4</b> · b) −1,2 · 2 = <b>−2,4</b> · c) <b>1,6</b> · d) global (Feature Importance) vs. lokal (SHAP, LIME).</p>" },

      { titel: "Python mit scikit-learn", text: "<pre class=\"code\">from sklearn.metrics import confusion_matrix\ny_true = [1, 0, 1, 1, 0, 0, 1, 0]\ny_pred = [1, 0, 0, 1, 0, 1, 1, 0]\nprint(confusion_matrix(y_true, y_pred))</pre><p>Die Matrix hat die Form [[TN, FP], [FN, TP]].</p>",
        teile: [
          z("a", "a) TN", 2, 3, 0),
          z("b", "b) FN", 2, 1, 0),
          z("c", "c) Precision", 2, 0.75, 0.001),
          t("d", "d) Erklären Sie fit und predict und warum ein Skalierer nicht mit Testdaten gefittet werden darf.", 4, "fit lernt Parameter aus Daten, predict wendet das Modell an (2 P.); Fitten auf Testdaten führt zu Data Leakage und zu optimistischer Bewertung (2 P.).")
        ],
        loesung: "<p>TN = 3 (Positionen 2, 5, 8), FP = 1 (Position 6), FN = 1 (Position 3), TP = 3. c) 3 / 4 = <b>0,75</b>. d) fit lernt, predict wendet an; Testdaten dürfen nicht ins Lernen einfließen.</p>" },

      { titel: "Systementwicklung", text: "",
        teile: [
          t("a", "a) Wozu dienen Container wie Docker beim Betrieb von KI-Modellen?", 4, "Gleiche Laufzeitumgebung überall/Reproduzierbarkeit (2 P.), einfaches Deployment und Skalierung, Isolation von Abhängigkeiten (2 P.)."),
          w("b", "b) Was ist ein Schattenbetrieb (Shadow Deployment)?", 2, ["das neue Modell rechnet parallel mit, ohne dass seine Ergebnisse genutzt werden", "das Modell läuft nur nachts", "ein Test ohne Daten", "das alte Modell wird gelöscht"], 0),
          t("c", "c) Nennen Sie drei nicht-funktionale Anforderungen an ein KI-System im Kundenservice.", 6, "Je 2 P.: Antwortzeit/Latenz, Verfügbarkeit, Skalierbarkeit, Sicherheit/Datenschutz, Nachvollziehbarkeit/Protokollierung, Kosten je Anfrage, Barrierefreiheit."),
          w("d", "d) Wozu dient ein Feature Store?", 2, ["Merkmale zentral, versioniert und für Training und Betrieb gleich bereitstellen", "Modelle verkaufen", "Rechnungen speichern", "Passwörter verwalten"], 0)
        ],
        loesung: "<p>a) Reproduzierbare Umgebung, Deployment, Skalierung · b) paralleler Testbetrieb ohne Wirkung · c) z. B. Latenz, Verfügbarkeit, Datenschutz, Protokollierung, Kosten · d) einheitliche Merkmale für Training und Betrieb.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s02t2", satz: 2, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – Generative KI in der Schadenbearbeitung", kurz: "Versicherung · Schadenmeldungen", minuten: 240,
    situation: "<p>Die <b>Hanseatische Sachversicherung AG</b> (1.200 Beschäftigte, Betriebsrat) erhält jährlich 60.000 Schadenmeldungen zu Hausrat- und Haftpflichtschäden per E-Mail, Formular und PDF – oft mit Fotos, Rechnungen und Arztberichten bei Personenschäden. Die Sachbearbeitung erfasst die Daten heute manuell.</p><p>Geplant ist ein Assistent auf Basis eines großen Sprachmodells: Er liest Meldungen aus, fasst sie zusammen, gleicht sie mit den Versicherungsbedingungen ab (RAG) und schlägt nächste Schritte vor. Die Entscheidung über die Regulierung trifft weiterhin die Sachbearbeitung. Sie verantworten die Einführung.</p>",
    aufgaben: [
      { titel: "Lösung konzipieren und bewerten", text: "",
        teile: [
          t("a", "a) Beschreiben Sie die Architektur des Assistenten (Eingang, Extraktion, Wissensbasis, Modell, Ausgabe, Mensch).", 6, "Eingangskanäle und Dokumentenerkennung/OCR (1 P.); Extraktion strukturierter Felder (1 P.); Wissensbasis mit Bedingungen, Vektorsuche/RAG (1 P.); Sprachmodell erzeugt Zusammenfassung und Vorschlag mit Quellen (1 P.); Ausgabe ins Schadensystem (1 P.); Prüfung und Freigabe durch Sachbearbeitung, Feedback (1 P.)."),
          z("b", "b) Im Test wurden 500 Felder geprüft, 460 waren korrekt. Feldgenauigkeit in %", 2, 92, 0.1, "%"),
          z("c", "c) Von 200 Zusammenfassungen enthielten 14 erfundene Angaben. Halluzinationsrate in %", 2, 7, 0.1, "%"),
          t("d", "d) Nennen Sie zwei Maßnahmen, um die Halluzinationsrate zu senken.", 4, "Je 2 P.: RAG mit Quellenpflicht, Antwort nur aus Dokumenten, Plausibilitätsprüfungen/Abgleich mit extrahierten Feldern, niedrige Temperatur, Prompt-Vorgaben, Stichproben und Feedback, Evaluationsdatensatz."),
          w("e", "e) Arztberichte bei Personenschäden enthalten …", 2, ["Gesundheitsdaten nach Art. 9 DSGVO", "nur Stammdaten", "keine personenbezogenen Daten", "anonyme Daten"], 0)
        ],
        loesung: "<p>a) Eingang (E-Mail, PDF, Formular) → OCR und Extraktion → Abgleich mit Bedingungen über RAG → Sprachmodell erstellt Zusammenfassung und Vorschlag mit Quellen → Übergabe ins Schadensystem → Prüfung und Entscheidung durch Sachbearbeitung, Rückmeldung zur Verbesserung.</p><p>b) 460 / 500 = <b>92 %</b> · c) 14 / 200 = <b>7 %</b> · d) Quellenpflicht, Abgleich mit Feldern, niedrige Temperatur, Stichproben · e) Gesundheitsdaten.</p>" },

      { titel: "Prozess und Personalbedarf", text: "<p>60.000 Meldungen im Jahr, 220 Arbeitstage, 6,5 produktive Stunden je Person und Tag. Bearbeitungszeit heute 18 Minuten je Meldung, mit Assistent 10 Minuten.</p>",
        teile: [
          z("a", "a) Benötigte Personen heute (aufgerundet)", 3, 13, 0),
          z("b", "b) Benötigte Personen mit Assistent (aufgerundet)", 3, 7, 0),
          t("c", "c) Beschreiben Sie den Soll-Prozess mit dem Menschen in der Entscheidung.", 4, "Assistent bereitet vor (Extraktion, Zusammenfassung, Vorschlag) (1 P.); Sachbearbeitung prüft, entscheidet und gibt frei (1 P.); Sonderfälle/Personenschäden an Fachexperten (1 P.); Feedback und Stichprobenkontrolle (1 P.)."),
          t("d", "d) Nennen Sie zwei Kennzahlen mit Zielwert.", 4, "Je 2 P.: Durchlaufzeit je Meldung, Bearbeitungszeit, Feldgenauigkeit, Halluzinationsrate, Kundenzufriedenheit, Nacharbeitsquote.")
        ],
        loesung: "<p>Verfügbare Zeit je Person: 220 · 6,5 = 1.430 h. a) 60.000 · 18 / 60 = 18.000 h; 18.000 / 1.430 ≈ 12,6 → <b>13</b> · b) 10.000 h / 1.430 ≈ 7,0 → <b>7</b>.</p><p>c) Assistent bereitet vor, Mensch entscheidet, Sonderfälle an Experten, Stichproben. d) z. B. Durchlaufzeit unter 2 Tage, Halluzinationsrate unter 2 %.</p>" },

      { titel: "Projektvorgehen und Risiken", text: "",
        teile: [
          t("a", "a) Begründen Sie ein hybrides Vorgehen für dieses Vorhaben.", 4, "Klassischer Rahmen mit Budget, Meilensteinen, Verträgen, Betriebsvereinbarung (2 P.); agile Sprints für Prompt-/Modellentwicklung und Evaluation, da Ergebnisse unsicher (2 P.)."),
          w("b", "b) Wer priorisiert in Scrum das Product Backlog?", 2, ["Product Owner", "Scrum Master", "Developers", "Lenkungsausschuss"], 0),
          z("c", "c) Risiko „Datenschutzaufsicht beanstandet Lösung“: Wahrscheinlichkeit 30 %, Schaden 80.000 €. Erwartungswert", 2, 24000, 0, "€"),
          z("d", "d) Eine externe Datenschutzprüfung für 10.000 € senkt die Wahrscheinlichkeit auf 10 %. Nettovorteil der Maßnahme", 2, 6000, 0, "€"),
          w("e", "e) Lohnt sich die Maßnahme?", 2, ["ja", "nein"], 0),
          z("f", "f) Im Kanban-Board sind 12 Aufgaben in Arbeit, der Durchsatz beträgt 3 je Tag. Mittlere Durchlaufzeit in Tagen", 2, 4, 0)
        ],
        loesung: "<p>a) Rahmen klassisch (Vertrag, Budget, Meilensteine, Betriebsvereinbarung), Entwicklung agil. b) Product Owner · c) 0,3 · 80.000 = <b>24.000 €</b> · d) 24.000 − 8.000 − 10.000 = <b>6.000 €</b> · e) ja · f) 12 / 3 = <b>4 Tage</b>.</p>" },

      { titel: "Rechtliche Prüfung", text: "",
        teile: [
          w("a", "a) Wie ist der Assistent nach der KI-Verordnung voraussichtlich einzustufen?", 2, ["kein Hochrisiko-System (Sachversicherung, Mensch entscheidet); KI-Kompetenz und ggf. Transparenz beachten", "Hochrisiko nach Anhang III wie Lebens- und Krankenversicherung", "verbotene Praxis", "System mit systemischem Risiko"], 0),
          t("b", "b) Wann wäre Art. 22 DSGVO berührt, und wie stellen Sie die Einhaltung sicher?", 4, "Wenn Ablehnungen oder Kürzungen ausschließlich automatisiert erfolgten (2 P.); echte menschliche Prüfung mit Befugnis, Dokumentation, Information der Betroffenen (2 P.)."),
          t("c", "c) Welche Vertragsart liegt bei der Nutzung des Sprachmodells als Cloud-Dienst nahe, und welche zwei Klauseln sind besonders wichtig?", 4, "SaaS mit mietvertraglichem Leitbild (1 P.); z. B. AV-Vertrag/kein Training mit Kundendaten, Speicherort EU, SLA, Haftung, Exit (je 1,5 P.)."),
          w("d", "d) Eine Fehlkonfiguration macht Meldungen kurzzeitig öffentlich. Innerhalb welcher Frist ist die Aufsicht zu informieren?", 2, ["72 Stunden", "24 Stunden", "2 Wochen", "1 Monat"], 0),
          w("e", "e) Was verlangt Art. 4 der KI-Verordnung von der Versicherung?", 2, ["Maßnahmen für ausreichende KI-Kompetenz der Beschäftigten, die das System nutzen", "eine CE-Kennzeichnung", "die Veröffentlichung des Quellcodes", "nichts"], 0),
          w("f", "f) Welches Recht des Betriebsrats ist zentral?", 2, ["Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG", "kein Recht", "nur Information nach § 106", "Zustimmung nach § 99"], 0)
        ],
        loesung: "<p>a) Sachversicherung ist nicht in Anhang III genannt (anders als Risikobewertung in Lebens- und Krankenversicherung); da Menschen entscheiden, kein Hochrisiko – KI-Kompetenz und Transparenz gegenüber Kunden bei KI-Texten beachten.</p><p>b) Bei vollautomatischer Ablehnung; daher echte menschliche Entscheidung. c) SaaS (Miete); AV-Vertrag, kein Training mit Daten, EU-Speicherort, SLA, Haftung. d) 72 h · e) KI-Kompetenz · f) § 87 Abs. 1 Nr. 6.</p>" },

      { titel: "Wirtschaftlichkeit und Auswahl", text: "<p>Option API: 0,04 € je verarbeiteter Meldung. Option eigener Betrieb eines offenen Modells: 40.000 € fix im Jahr plus 0,01 € je Meldung. Zur Auswahl stehen außerdem zwei Anbieter X und Y.</p>",
        teile: [
          z("a", "a) Ab wie vielen Meldungen pro Jahr ist der eigene Betrieb günstiger? (gerundet)", 4, 1333333, 2),
          w("b", "b) Welche Option empfehlen Sie bei 60.000 Meldungen?", 2, ["API", "eigener Betrieb"], 0),
          z("c", "c) Jährliche API-Kosten bei 60.000 Meldungen", 2, 2400, 0, "€"),
          z("d", "d) Nutzwertanalyse: Kosten 30 %, Genauigkeit 40 %, Datenschutz 30 %. X: 8 / 6 / 5 Punkte. Nutzwert X", 2, 6.3, 0.01),
          z("e", "e) Y: 5 / 8 / 9 Punkte. Nutzwert Y", 2, 7.4, 0.01),
          w("f", "f) Welcher Anbieter gewinnt?", 2, ["Y", "X"], 0),
          t("g", "g) Welche Annahme der Rechnung würden Sie kritisch prüfen?", 2, "Z. B. Tokenkosten je Meldung bei langen Dokumenten, Preisänderungen, Personalkosten des Eigenbetriebs, Mengenwachstum (2 P.).")
        ],
        loesung: "<p>a) 40.000 / (0,04 − 0,01) ≈ <b>1.333.333</b> · b) API · c) 60.000 · 0,04 = <b>2.400 €</b> · d) 2,4 + 2,4 + 1,5 = <b>6,3</b> · e) 1,5 + 3,2 + 2,7 = <b>7,4</b> · f) Y · g) z. B. Tokenkosten bei langen PDFs, Preisentwicklung.</p>" },

      { titel: "Personal und Arbeitsrecht", text: "<p>Statt 13 werden künftig 7 Personen für die Erfassung benötigt.</p>",
        teile: [
          t("a", "a) Wie gestalten Sie den Personalabbau sozialverträglich?", 4, "Natürliche Fluktuation und Renteneintritte nutzen (1 P.), Versetzung in andere Aufgaben (1 P.), Qualifizierung (1 P.), frühzeitige Einbindung des Betriebsrats/Betriebsvereinbarung (1 P.)."),
          w("b", "b) Eine betroffene Mitarbeiterin ist seit 12 Jahren im Unternehmen. Kündigungsfrist des Arbeitgebers?", 2, ["5 Monate zum Monatsende", "3 Monate", "4 Wochen", "7 Monate"], 0),
          t("c", "c) Skizzieren Sie ein Qualifizierungsangebot für die verbleibende Sachbearbeitung.", 4, "Inhalte: Umgang mit dem Assistenten, Grenzen und Halluzinationen, Prüfroutinen, Datenschutz (2 P.); Form: Schulung, Key User, Lernzeit, Praxisbegleitung (2 P.)."),
          w("d", "d) Welcher Faktor ist nach Herzberg ein Motivator für die neue Rolle?", 2, ["mehr Verantwortung für komplexe Fälle", "höheres Gehalt", "bessere Kantine", "sicherer Parkplatz"], 0)
        ],
        loesung: "<p>a) Fluktuation, Versetzung, Qualifizierung, Betriebsrat einbinden. b) 5 Monate zum Monatsende · c) Schulung zu Prüfroutinen, Grenzen, Datenschutz mit Key Usern und Lernzeit · d) Verantwortung.</p>" },

      { titel: "Kommunikation und kritisches Denken", text: "<p>Eine Teamleiterin sagt im Workshop: „Die KI macht das doch eh alles besser als wir.“</p>",
        teile: [
          t("a", "a) Analysieren Sie die Aussage mit dem Vier-Seiten-Modell.", 4, "Sache: KI arbeitet besser; Selbstkundgabe: Verunsicherung/Resignation; Beziehung: Zweifel an Wert des Teams bzw. an Projektleitung; Appell: Erklärt, wofür wir noch gebraucht werden (je 1 P.)."),
          t("b", "b) Entwickeln Sie eine Prüfroutine für KI-Zusammenfassungen mit drei Schritten.", 4, "Z. B. Quellen öffnen und Kernangaben abgleichen, Zahlen/Beträge mit Belegen prüfen, Plausibilität und Vollständigkeit, Abweichungen dokumentieren (4 P.)."),
          w("c", "c) Welcher Schritt gehört in der gewaltfreien Kommunikation an den Anfang?", 2, ["Beobachtung ohne Bewertung", "Bitte", "Bedürfnis", "Gefühl"], 0),
          w("d", "d) Im Ishikawa-Diagramm zur Ursache „falsche Beträge“ gehört „unleserliche Rechnungsscans“ zu …", 2, ["Material (Daten)", "Mensch", "Mitwelt", "Messung"], 0)
        ],
        loesung: "<p>a) Sache, Selbstkundgabe (Sorge), Beziehung (Abwertung des Teams), Appell (Klärung der Rolle). b) Quellen abgleichen, Beträge prüfen, Plausibilität, dokumentieren. c) Beobachtung · d) Material/Daten.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
