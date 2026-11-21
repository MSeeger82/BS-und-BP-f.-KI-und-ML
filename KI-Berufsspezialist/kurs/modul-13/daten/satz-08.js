/* Prüfungssatz 8 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "s08t1", satz: 8, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Automatisierung und KI", text: "",
        teile: [
          t("a", "a) Grenzen Sie Robotic Process Automation (RPA) von KI ab.", 4, "RPA: Software-Roboter führen feste, regelbasierte Klickfolgen/Abläufe aus, lernen nicht (2 P.). KI: lernt aus Daten, kann mit unstrukturierten/variablen Eingaben umgehen; Kombination möglich (2 P.)."),
          w("b", "b) Welches ist ein Beispiel für schwache (enge) KI?", 2, ["Ein System, das Röntgenbilder auf Knochenbrüche prüft", "Ein System mit menschlichem Bewusstsein", "Ein Roboter, der jede Aufgabe lernt wie ein Mensch", "Keines – es gibt nur starke KI"], 0),
          t("c", "c) Was bedeutet „Human in the Loop“? Nennen Sie ein Beispiel.", 4, "Mensch ist in den Entscheidungsprozess eingebunden, prüft/bestätigt/korrigiert KI-Ergebnisse (2 P.); Beispiel: Sachbearbeiter bestätigt KI-Vorschlag zur Rechnungsfreigabe (2 P.).")
        ],
        loesung: "<p>a) RPA automatisiert feste Regeln (z. B. Daten von Formular A nach System B kopieren), ohne zu lernen; KI lernt aus Beispielen und verarbeitet auch unscharfe Eingaben. Oft werden beide kombiniert.</p><p>b) Bruch-Erkennung auf Röntgenbildern. c) Ein Mensch prüft und bestätigt die KI-Ergebnisse, z. B. die Freigabe einer Rechnung.</p>" },

      { titel: "Explorative Datenanalyse", text: "",
        teile: [
          t("a", "a) Ein Balkendiagramm zeigt Umsätze von 98 bis 102 Mio. €, die y-Achse beginnt bei 97. Was ist problematisch?", 3, "Abgeschnittene y-Achse übertreibt Unterschiede optisch; kleine Unterschiede wirken riesig; bei Balken bei 0 beginnen oder kennzeichnen (3 P.)."),
          w("b", "b) Wofür eignet sich eine Heatmap besonders?", 2, ["Eine Korrelationsmatrix vieler Merkmale darzustellen", "Einen einzelnen Wert anzuzeigen", "Eine Zeitreihe mit einem Wert", "Text zu analysieren"], 0),
          w("c", "c) Welches Diagramm zeigt Anteile weniger Kategorien an einem Ganzen?", 2, ["Gestapeltes Balkendiagramm oder Kreisdiagramm", "Streudiagramm", "Histogramm", "Liniendiagramm"], 0),
          t("d", "d) Nennen Sie drei Schritte einer explorativen Datenanalyse.", 3, "Je 1 P.: Struktur/Datentypen prüfen, fehlende Werte zählen, Verteilungen/Kennzahlen ansehen, Ausreißer suchen, Zusammenhänge/Korrelationen, Visualisierungen, Zielvariable/Klassenverteilung prüfen.")
        ],
        loesung: "<p>a) Die abgeschnittene Achse lässt 4 % Unterschied wie ein Vielfaches aussehen. b) Korrelationsmatrix. c) Gestapelter Balken oder Kreisdiagramm. d) z. B. Datentypen und fehlende Werte prüfen, Verteilungen und Ausreißer ansehen, Korrelationen und Klassenverteilung untersuchen.</p>" },

      { titel: "Korrelation und Regressionsgerade", text: "<p>Werbebudget x (in T€) und Umsatz y (in 10 T€): x = (1; 2; 3; 4; 5), y = (2; 4; 5; 4; 5).</p>",
        teile: [
          z("a", "a) Korrelationskoeffizient nach Pearson (zwei Nachkommastellen)", 4, 0.77, 0.01),
          z("b", "b) Steigung b der Regressionsgeraden", 3, 0.6, 0.001),
          z("c", "c) Achsenabschnitt a der Regressionsgeraden", 3, 2.2, 0.001)
        ],
        loesung: "<p>Mittelwerte: x̄ = 3, ȳ = 4. Abweichungsprodukte: 4 + 0 + 0 + 0 + 2 = 6; Σ(x − x̄)² = 10; Σ(y − ȳ)² = 6.</p><p>a) r = 6 / √(10 · 6) ≈ <b>0,77</b> · b) b = 6 / 10 = <b>0,6</b> · c) a = 4 − 0,6 · 3 = <b>2,2</b>.</p>" },

      { titel: "Kodierung und Klassenungleichgewicht", text: "",
        teile: [
          z("a", "a) Ein Merkmal hat 5 Kategorien. Wie viele Spalten entstehen bei One-Hot-Kodierung (ohne Weglassen einer Spalte)?", 2, 5, 0.001),
          z("b", "b) 9.500 negative und 500 positive Fälle. Wie viele Datensätze bleiben nach zufälligem Undersampling auf ein Verhältnis 1 : 1?", 2, 1000, 0.001),
          t("c", "c) Welchen Nachteil hat Undersampling, und welche Alternative gibt es?", 3, "Nachteil: Informationsverlust, viele Daten werden verworfen (1,5 P.). Alternative: Oversampling/SMOTE, Klassengewichte, Schwellenwert anpassen (1,5 P.)."),
          w("d", "d) Für welches Merkmal ist eine Kodierung mit den Zahlen 1, 2, 3 (Label Encoding) unproblematisch?", 3, ["Kleidergröße S, M, L", "Farbe rot, grün, blau", "Stadt Bremen, Hamburg, Kiel", "Zahlungsart Karte, Bar, Rechnung"], 0)
        ],
        loesung: "<p>a) <b>5</b> Spalten · b) 500 + 500 = <b>1.000</b> · c) Viele Informationen gehen verloren; Alternativen: Oversampling, Klassengewichte · d) Kleidergröße – sie hat eine natürliche Rangfolge.</p>" },

      { titel: "SQL", text: "<p>Tabelle <code>kunden(kunden_id, name, umsatz)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die zu jedem Kunden Name, Umsatz und eine Spalte „segment“ ausgibt: „Premium“ bei einem Umsatz über 5.000 €, sonst „Standard“.", 5, "SELECT name, umsatz (1 P.), CASE WHEN umsatz > 5000 THEN 'Premium' ELSE 'Standard' END AS segment (3 P.) FROM kunden (1 P.)."),
          w("b", "b) Was macht UNION?", 2, ["Es hängt die Ergebnisse zweier Abfragen untereinander und entfernt Duplikate", "Es verbindet Tabellen über Schlüssel", "Es löscht Duplikate in einer Tabelle", "Es sortiert"], 0),
          w("c", "c) Wozu dient ein Index auf einer Spalte?", 3, ["Er beschleunigt Suchen und Filtern nach dieser Spalte", "Er nummeriert die Zeilen für den Ausdruck", "Er verschlüsselt die Spalte", "Er verhindert fehlende Werte"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT name, umsatz,\n       CASE WHEN umsatz &gt; 5000 THEN 'Premium'\n            ELSE 'Standard' END AS segment\nFROM kunden;</pre><p>b) Ergebnisse untereinander zusammenführen (ohne Duplikate; UNION ALL mit). c) Schnellere Suche.</p>" },

      { titel: "Regressionsgüte", text: "",
        teile: [
          w("a", "a) Im Residuenplot zeigen die Residuen ein deutliches U-förmiges Muster. Was schließen Sie?", 2, ["Ein nichtlinearer Zusammenhang wird vom linearen Modell nicht erfasst", "Das Modell ist perfekt", "Es gibt zu wenige Merkmale mit Text", "Die Daten sind verschlüsselt"], 0),
          z("b", "b) Die Summe der quadrierten Fehler beträgt 20, die Gesamtstreuung (SST) 80. Berechnen Sie R².", 3, 0.75, 0.001),
          z("c", "c) Tatsächlich 200 Stück, vorhergesagt 180 Stück. Absoluter prozentualer Fehler?", 2, 10, 0.01, "%"),
          t("d", "d) Warum ist der MAE robuster gegenüber Ausreißern als der RMSE?", 3, "RMSE quadriert Fehler, große Fehler wirken überproportional (1,5 P.); MAE gewichtet alle Fehler linear (1,5 P.).")
        ],
        loesung: "<p>a) Das lineare Modell verfehlt einen nichtlinearen Zusammenhang (z. B. quadratischen Term oder anderes Modell nutzen). b) 1 − 20 / 80 = <b>0,75</b> · c) 20 / 200 = <b>10 %</b> · d) Durch das Quadrieren dominieren große Fehler den RMSE.</p>" },

      { titel: "Klassische Klassifikatoren", text: "",
        teile: [
          w("a", "a) Was maximiert eine Support Vector Machine?", 2, ["Den Abstand (Margin) zwischen Trennlinie und den nächsten Punkten beider Klassen", "Die Anzahl der Cluster", "Die Baumtiefe", "Die Lernrate"], 0),
          w("b", "b) Wozu dient der Kernel-Trick?", 2, ["Nichtlineare Trennungen zu ermöglichen, indem Daten implizit in einen höherdimensionalen Raum abgebildet werden", "Daten zu löschen", "Die Rechenzeit auf null zu senken", "Labels zu erzeugen"], 0),
          t("c", "c) Was gibt eine logistische Regression aus, und wie entsteht daraus eine Klassenentscheidung?", 3, "Wahrscheinlichkeit zwischen 0 und 1 über Sigmoidfunktion (1,5 P.); Klasse durch Vergleich mit Schwellenwert, z. B. 0,5 (1,5 P.)."),
          w("d", "d) Welche Annahme trifft Naive Bayes?", 3, ["Die Merkmale sind bei gegebener Klasse voneinander unabhängig", "Alle Merkmale sind normalverteilt und gleich wichtig", "Es gibt nur zwei Merkmale", "Die Klassen sind gleich groß"], 0)
        ],
        loesung: "<p>a) Den Margin. b) Nichtlineare Trennung über implizite Abbildung. c) Wahrscheinlichkeit; Entscheidung über einen Schwellenwert. d) Bedingte Unabhängigkeit der Merkmale.</p>" },

      { titel: "Python", text: "<pre class=\"code\">woerter = [\"ki\", \"daten\", \"ki\", \"modell\", \"ki\"]\nzaehler = {}\nfor w in woerter:\n    zaehler[w] = zaehler.get(w, 0) + 1\nprint(zaehler[\"ki\"])\nprint(len(zaehler))\nprint(sorted(zaehler))</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung", 3, 3, 0.001),
          z("b", "b) Ausgabe der zweiten print-Anweisung", 3, 3, 0.001),
          w("c", "c) Ausgabe der dritten print-Anweisung", 4, ["['daten', 'ki', 'modell']", "['ki', 'daten', 'modell']", "[1, 1, 3]", "{'daten': 1, 'ki': 3, 'modell': 1}"], 0)
        ],
        loesung: "<p>a) „ki“ kommt <b>3</b>-mal vor · b) <b>3</b> verschiedene Wörter · c) sorted() auf ein Dictionary sortiert die Schlüssel alphabetisch: <b>['daten', 'ki', 'modell']</b>.</p>" },

      { titel: "Sequenzmodelle", text: "",
        teile: [
          w("a", "a) Wofür wurden rekurrente Netze (RNN) entwickelt?", 2, ["Für Sequenzdaten wie Text oder Zeitreihen", "Für Tabellen ohne Reihenfolge", "Nur für Bilder", "Für Datenbanken"], 0),
          t("b", "b) Welches Problem lösen LSTMs gegenüber einfachen RNNs, und wie?", 4, "Einfache RNNs vergessen lange Abhängigkeiten (verschwindende Gradienten) (2 P.); LSTM hat Zellzustand mit Gates (Vergessen, Eingabe, Ausgabe), die steuern, was behalten wird (2 P.)."),
          w("c", "c) Welche Aufgabe ist ein typisches Sequenzproblem?", 2, ["Vorhersage des Stromverbrauchs der nächsten Stunden aus dem Verlauf", "Erkennung, ob ein einzelnes Foto eine Katze zeigt", "Clustering von Kunden nach Alter", "Sortieren einer Liste"], 0),
          w("d", "d) Warum haben Transformer RNNs in der Sprachverarbeitung weitgehend abgelöst?", 2, ["Sie verarbeiten Sequenzen parallel und erfassen lange Abhängigkeiten über Attention besser", "Sie brauchen keine Daten", "Sie sind immer kleiner", "Sie funktionieren nur ohne GPU"], 0)
        ],
        loesung: "<p>a) Sequenzen. b) LSTMs speichern über Gates und einen Zellzustand Informationen auch über lange Abstände. c) Zeitreihenprognose. d) Parallele Verarbeitung und Attention über die ganze Sequenz.</p>" },

      { titel: "Gesellschaft und Ethik", text: "",
        teile: [
          t("a", "a) Nennen und erläutern Sie zwei gesellschaftliche Risiken von KI.", 4, "Je 2 P.: Diskriminierung, Desinformation/Deepfakes, Überwachung, Arbeitsplatzwandel, Machtkonzentration, Umweltbelastung, Abhängigkeit/Verlust von Kompetenzen."),
          w("b", "b) Was beschreibt der Begriff „Filterblase“?", 2, ["Empfehlungssysteme zeigen vor allem Inhalte, die zu bisherigen Vorlieben passen, und verengen so die Sicht", "Ein Fehler beim Datenfiltern in SQL", "Ein Luftfilter in Rechenzentren", "Ein Bildfilter für Fotos"], 0),
          w("c", "c) Welches Modell gilt als von sich aus (intrinsisch) gut erklärbar?", 2, ["Ein flacher Entscheidungsbaum", "Ein tiefes neuronales Netz", "Ein großes Sprachmodell", "Ein Ensemble aus 500 Bäumen"], 0),
          w("d", "d) Was ist eine kontrafaktische Erklärung?", 2, ["Sie zeigt, welche Änderung der Eingaben zu einem anderen Ergebnis geführt hätte", "Eine Erklärung, die falsch ist", "Eine Liste aller Trainingsdaten", "Eine Erklärung nur für Fachleute"], 0)
        ],
        loesung: "<p>a) z. B. Diskriminierung durch verzerrte Daten; Desinformation durch täuschend echte Fälschungen. b) Verengung durch Personalisierung. c) Flacher Entscheidungsbaum. d) „Wenn Ihr Einkommen 300 € höher wäre, wäre der Antrag angenommen worden.“</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s08t2", satz: 8, teil: 2, titel: "Vertiefungen: Kundensegmentierung im Einzelhandel", kurz: "Handel · Clustering", minuten: 120,
    situation: "<p>Die Drogeriekette <b>Hansekauf</b> betreibt 85 Filialen und ein Kundenkartenprogramm mit 250.000 Teilnehmenden. Für jede Karte sind die Einkäufe der letzten zwei Jahre gespeichert (Datum, Filiale, Warengruppen, Betrag) sowie Alter und Postleitzahl aus der Anmeldung.</p><p>Bisher erhalten alle Karteninhaber dieselben Angebote. Das Marketing möchte Kundengruppen mit ähnlichem Einkaufsverhalten finden, um gezieltere Angebote zu machen.</p>",
    aufgaben: [
      { titel: "Ansatz", text: "",
        teile: [
          t("a", "a) Welches Lernparadigma und welches Verfahren schlagen Sie vor? Begründen Sie.", 4, "Unüberwachtes Lernen/Clustering, z. B. k-Means (2 P.), weil keine vorgegebenen Gruppen/Labels existieren und Strukturen entdeckt werden sollen (2 P.)."),
          t("b", "b) Definieren Sie RFM-Merkmale für dieses Projekt.", 6, "Recency: Tage seit letztem Einkauf (2 P.); Frequency: Anzahl Einkäufe in 12 Monaten (2 P.); Monetary: Umsatz in 12 Monaten (2 P.)."),
          w("c", "c) Das Marketing legt später fünf Segmente fest und markiert Beispielkunden. Neue Kunden sollen diesen Segmenten zugeordnet werden. Welcher Aufgabentyp ist das dann?", 2, ["Klassifikation", "Clustering", "Regression", "Dimensionsreduktion"], 0)
        ],
        loesung: "<p>a) Clustering (unüberwacht), z. B. k-Means, weil es keine vorgegebenen Gruppen gibt.</p><p>b) Recency: Tage seit dem letzten Einkauf. Frequency: Einkäufe der letzten 12 Monate. Monetary: Umsatz der letzten 12 Monate. Ergänzend Anteile je Warengruppe.</p><p>c) Klassifikation.</p>" },

      { titel: "Datenvorbereitung", text: "",
        teile: [
          z("a", "a) Jahresumsatz einer Kundin 1.200 €, Mittelwert 600 €, Standardabweichung 400 €. Standardisierter Wert?", 3, 1.5, 0.001),
          t("b", "b) Warum müssen die Merkmale vor k-Means skaliert werden?", 4, "k-Means nutzt Abstände (2 P.); Merkmale mit großen Wertebereichen (Umsatz in €) würden sonst kleine (Einkäufe/Anzahl) dominieren (2 P.)."),
          t("c", "c) Einige Karten werden von Kosmetikstudios für Großeinkäufe genutzt. Was bedeutet das, und wie gehen Sie vor?", 5, "Ausreißer verzerren Clusterzentren (2 P.); erkennen (z. B. extremer Umsatz/Mengen), gesondert behandeln/ausschließen oder eigenes Segment, robuste Skalierung/Log (3 P.)."),
          t("d", "d) Sie haben 40 Merkmale (Umsatzanteile je Warengruppe), viele davon korreliert. Wie gehen Sie vor?", 6, "Korrelationen prüfen (1 P.); Dimensionsreduktion z. B. PCA auf wenige Komponenten oder Merkmalsauswahl/Zusammenfassen zu Obergruppen (3 P.); Begründung: Abstände aussagekräftiger, weniger Rauschen, Fluch der Dimensionalität (2 P.).")
        ],
        loesung: "<p>a) (1.200 − 600) / 400 = <b>1,5</b>.</p><p>b) Sonst bestimmt der Umsatz in Euro die Abstände fast allein.</p><p>c) Großeinkäufer sind Ausreißer, die Zentren verschieben. Erkennen, gesondert betrachten oder ausschließen; Log-Transformation des Umsatzes.</p><p>d) Warengruppen zu Obergruppen zusammenfassen oder per PCA verdichten, damit Abstände aussagekräftig bleiben.</p>" },

      { titel: "Clustering", text: "<p>Vereinfachtes Beispiel mit zwei standardisierten Merkmalen: A(1; 1), B(2; 1), C(8; 9), D(9; 8), E(1; 2). Startzentren c₁ = (1; 1), c₂ = (9; 9).</p><p>Für die echten Daten ergab sich:</p><div class=\"table-wrap\"><table><thead><tr><th>k</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><th>Inertia</th><td>1.800</td><td>900</td><td>700</td><td>600</td><td>540</td></tr><tr><th>Silhouette</th><td>0,44</td><td>0,52</td><td>0,41</td><td>0,37</td><td>0,33</td></tr></tbody></table></div>",
        teile: [
          z("a", "a) x-Koordinate des neuen Zentrums c₁ nach der ersten Iteration (zwei Nachkommastellen)", 3, 1.33, 0.01),
          z("b", "b) y-Koordinate des neuen Zentrums c₁ (zwei Nachkommastellen)", 3, 1.33, 0.01),
          z("c", "c) x-Koordinate des neuen Zentrums c₂", 2, 8.5, 0.001),
          z("d", "d) y-Koordinate des neuen Zentrums c₂", 2, 8.5, 0.001),
          w("e", "e) Welche Clusteranzahl wählen Sie für die echten Daten?", 3, ["3", "2", "4", "6"], 0),
          t("f", "f) Begründen Sie Ihre Wahl aus e) mit beiden Kennzahlen.", 4, "Ellbogen bei k = 3: danach sinkt die Inertia nur noch wenig (2 P.); höchste Silhouette 0,52 bei k = 3 (2 P.)."),
          t("g", "g) Wie machen Sie die Cluster für das Marketing verständlich?", 5, "Profile je Cluster: Mittelwerte/Mediane der Merkmale, Größe, typische Warengruppen (2 P.); sprechende Namen, z. B. „Treue Vielkäufer“, „Schnäppchenjäger“ (1 P.); Visualisierung (2D-Projektion, Balken), Beispiele, Abstimmung mit Fachabteilung (2 P.).")
        ],
        loesung: "<p>Zuordnung: A, B, E zu c₁; C, D zu c₂.</p><p>a) (1 + 2 + 1) / 3 ≈ <b>1,33</b> · b) (1 + 1 + 2) / 3 ≈ <b>1,33</b> · c) (8 + 9) / 2 = <b>8,5</b> · d) (9 + 8) / 2 = <b>8,5</b>.</p><p>e) <b>k = 3</b>. f) Nach k = 3 flacht die Inertia ab (Ellbogen), und die Silhouette ist bei k = 3 am höchsten.</p><p>g) Für jedes Cluster ein Steckbrief: Größe, typische RFM-Werte, Lieblingswarengruppen, ein sprechender Name und Beispiele; mit dem Marketing abstimmen.</p>" },

      { titel: "Wirkung messen", text: "<p>Ein Segment erhält personalisierte Angebote (Testgruppe, 10.000 Kunden), eine gleich große Kontrollgruppe die Standardangebote. Einlösequote: Kontrollgruppe 4,0 %, Testgruppe 5,2 %.</p>",
        teile: [
          t("a", "a) Beschreiben Sie, wie Sie einen solchen A/B-Test sauber aufsetzen.", 6, "Zufällige Zuteilung (2 P.); gleicher Zeitraum, nur ein Unterschied, Erfolgsgröße vorab festlegen (2 P.); ausreichende Stichprobengröße/Dauer, Auswertung mit Signifikanztest (2 P.)."),
          z("b", "b) Unterschied der Einlösequoten in Prozentpunkten", 3, 1.2, 0.001, "Prozentpunkte"),
          z("c", "c) Relative Steigerung gegenüber der Kontrollgruppe", 3, 30, 0.01, "%"),
          t("d", "d) Warum reicht der beobachtete Unterschied allein nicht als Nachweis?", 4, "Unterschied kann zufällig sein (2 P.); Signifikanztest/Konfidenzintervall prüfen, ausreichende Fallzahl; andere Einflüsse ausschließen (2 P.).")
        ],
        loesung: "<p>a) Kunden zufällig auf Test- und Kontrollgruppe verteilen, gleicher Zeitraum, nur das Angebot unterscheidet sich, Erfolgsgröße (Einlösequote) vorher festlegen, genug Kunden und Laufzeit, Auswertung mit Signifikanztest.</p><p>b) 5,2 − 4,0 = <b>1,2 Prozentpunkte</b> · c) 1,2 / 4,0 = <b>30 %</b>.</p><p>d) Zufallsschwankungen: Erst ein Signifikanztest zeigt, ob der Unterschied belastbar ist.</p>" },

      { titel: "Betrieb", text: "",
        teile: [
          t("a", "a) Wie oft clustern Sie neu, und wie verhindern Sie, dass Segmente bei jedem Lauf anders heißen oder springen?", 6, "Regelmäßig, z. B. quartalsweise, oder bei Drift (2 P.); Zentren vergleichen und Clustern über Ähnlichkeit gleichbleibende Namen zuordnen, Startzentren aus Vorlauf (2 P.); Wanderungen zwischen Segmenten beobachten, Fachabteilung informieren (2 P.)."),
          t("b", "b) Wie ordnen Sie neue Kunden zwischen zwei Clusterläufen zu?", 4, "Merkmale berechnen, mit denselben Skalierungsparametern skalieren (2 P.), dem nächstgelegenen Clusterzentrum zuordnen (predict) (2 P.)."),
          t("c", "c) Was dokumentieren und versionieren Sie?", 4, "Je 1 P.: Datenstand/Zeitraum, Merkmalsdefinitionen, Skalierungsparameter, k und Zentren/Modell, Kennzahlen, Segmentprofile und Namen, Code-Version.")
        ],
        loesung: "<p>a) Quartalsweise oder wenn sich die Verteilungen deutlich ändern; neue Zentren den alten zuordnen, damit Namen stabil bleiben; Wechsel zwischen Segmenten verfolgen.</p><p>b) Merkmale berechnen, mit den gespeicherten Skalierungsparametern standardisieren und dem nächsten Zentrum zuordnen.</p><p>c) Datenstand, Merkmale, Skalierung, Modell mit Zentren, Kennzahlen, Segmentsteckbriefe, Code-Version.</p>" },

      { titel: "Datenschutz und Ethik", text: "",
        teile: [
          t("a", "a) Auf welcher Rechtsgrundlage darf Hansekauf die Kartendaten für personalisierte Werbung auswerten, und was gehört zur Transparenz?", 6, "Einwilligung bei Anmeldung zum Kartenprogramm (Art. 6 Abs. 1 lit. a) oder je nach Gestaltung berechtigtes Interesse/Vertrag – nachvollziehbar begründet (3 P.); Information über Zweck, Profiling, Speicherdauer, Rechte; Widerruf/Widerspruch (3 P.)."),
          t("b", "b) Was kann eine Kundin tun, die keine personalisierte Werbung mehr möchte?", 4, "Widerspruch gegen Direktwerbung inkl. Profiling nach Art. 21 Abs. 2/3 DSGVO – muss beachtet werden (2 P.); Widerruf der Einwilligung, Löschung/Einschränkung (2 P.)."),
          t("c", "c) Aus Drogerieeinkäufen lassen sich z. B. eine Schwangerschaft oder Krankheiten ableiten. Wie bewerten Sie das?", 6, "Rückschluss auf Gesundheitsdaten = besondere Kategorie Art. 9 DSGVO, hohe Anforderungen/ausdrückliche Einwilligung (2 P.); ethisch heikel, Vertrauensverlust, Diskriminierungsrisiko (2 P.); solche Merkmale/Segmente ausschließen, sensible Warengruppen sperren, DSFA (2 P.)."),
          w("d", "d) Risikoklasse des Segmentierungssystems nach AI Act?", 2, ["minimales Risiko", "Hochrisiko", "verboten", "allgemeines KI-Modell"], 0)
        ],
        loesung: "<p>a) Meist Einwilligung bei der Anmeldung zum Kartenprogramm; Information über Zweck, Profiling, Speicherdauer und Rechte, Widerruf jederzeit möglich.</p><p>b) Widerspruch gegen Direktwerbung und Profiling (Art. 21 DSGVO) – Hansekauf muss die Werbung dann einstellen; Widerruf der Einwilligung.</p><p>c) Solche Rückschlüsse sind Gesundheitsdaten (Art. 9 DSGVO) und ethisch heikel. Sensible Warengruppen von der Segmentierung ausschließen, keine Segmente zu Gesundheit bilden, Datenschutz-Folgenabschätzung durchführen.</p><p>d) Minimales Risiko.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
