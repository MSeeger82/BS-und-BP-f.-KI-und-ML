/* Prüfungssatz 1 */
(function (z, w, t) {
  var LP = ["überwachtes Lernen", "unüberwachtes Lernen", "bestärkendes Lernen"];
  window.PRUEFUNGEN.push({
    id: "s01t1", satz: 1, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Grundbegriffe", text: "<p>Ein Kollege sagt: „KI, maschinelles Lernen und Deep Learning – das ist doch alles dasselbe.“</p>",
        teile: [
          w("a", "a) Welche Aussage ist richtig?", 2, ["Deep Learning ist ein Teilgebiet des maschinellen Lernens, das wiederum ein Teilgebiet der KI ist", "KI ist ein Teilgebiet des Deep Learning", "Maschinelles Lernen und KI bedeuten genau dasselbe", "Deep Learning ist regelbasierte KI"], 0),
          t("b", "b) Erklären Sie den Unterschied zwischen schwacher und starker KI.", 4, "Schwache KI: löst eng begrenzte Aufgaben, heute Stand der Technik (2 P.). Starke KI: allgemeine, menschenähnliche Intelligenz über viele Aufgaben, existiert bisher nicht (2 P.)."),
          t("c", "c) Nennen Sie zwei Merkmale, an denen Sie erkennen, dass eine Aufgabe besser mit maschinellem Lernen als mit festen Regeln gelöst wird.", 4, "Je 2 P.: Regeln schwer formulierbar/zu viele Ausnahmen; Muster in vielen Beispieldaten vorhanden; Bedingungen ändern sich, System soll sich anpassen; unscharfe Eingaben wie Bilder, Sprache, Text.")
        ],
        loesung: "<p>a) Deep Learning ⊂ maschinelles Lernen ⊂ KI.</p><p>b) Schwache KI löst eine eng umrissene Aufgabe (Spamfilter, Bilderkennung) und ist heute Stand der Technik. Starke KI wäre eine allgemeine Intelligenz, die wie ein Mensch beliebige Aufgaben versteht und löst – sie existiert bisher nicht.</p><p>c) Zum Beispiel: Die Regeln lassen sich kaum vollständig aufschreiben (viele Ausnahmen); es gibt viele Beispieldaten, aus denen Muster gelernt werden können; die Eingaben sind unscharf (Bilder, Sprache); die Bedingungen ändern sich, sodass sich das System anpassen soll.</p>" },

      { titel: "Lernparadigmen", text: "<p>Ordnen Sie jedem Anwendungsfall das passende Lernparadigma zu.</p>",
        teile: [
          w("a", "1) Ein Spamfilter lernt aus 50.000 E-Mails, die als „Spam“ oder „kein Spam“ markiert sind.", 2, LP, 0),
          w("b", "2) Ein Händler will Kundengruppen finden, ohne vorher Gruppen festzulegen.", 2, LP, 1),
          w("c", "3) Ein Roboterarm lernt das Greifen durch Belohnung für erfolgreiche Versuche.", 2, LP, 2),
          w("d", "4) Aus 8.000 vergangenen Hausverkäufen soll der Preis eines neuen Hauses geschätzt werden.", 2, LP, 0),
          w("e", "5) Unter Millionen Kartenzahlungen ohne Kennzeichnung sollen ungewöhnliche Zahlungen auffallen.", 2, LP, 1)
        ],
        loesung: "<p>1) überwacht (Klassifikation, Labels vorhanden) · 2) unüberwacht (Clustering) · 3) bestärkend (Belohnung) · 4) überwacht (Regression) · 5) unüberwacht (Anomalieerkennung ohne Labels).</p>" },

      { titel: "Deskriptive Statistik", text: "<p>Lieferzeiten von neun Bestellungen in Tagen: <b>2, 3, 3, 4, 4, 5, 5, 6, 22</b></p>",
        teile: [
          z("a", "a) Arithmetisches Mittel", 2, 6, 0.01, "Tage"),
          z("b", "b) Median", 2, 4, 0.01, "Tage"),
          z("c", "c) Spannweite", 2, 20, 0.01, "Tage"),
          t("d", "d) Welcher Lageparameter beschreibt die typische Lieferzeit hier besser? Begründen Sie.", 4, "Median (2 P.), weil er robust gegenüber dem Ausreißer 22 ist; der Mittelwert wird nach oben verzerrt (2 P.).")
        ],
        loesung: "<p>a) Summe 54 / 9 = <b>6</b> Tage · b) mittlerer (5.) Wert der sortierten Reihe = <b>4</b> Tage · c) 22 − 2 = <b>20</b> Tage.</p><p>d) Der <b>Median</b>: Der Ausreißer von 22 Tagen zieht den Mittelwert nach oben; acht von neun Bestellungen liegen bei 6 Tagen oder darunter. Der Median ist robust gegen Ausreißer.</p>" },

      { titel: "Daten und Skalenniveaus", text: "<p>Ein Datensatz über Beschäftigte enthält unter anderem die folgenden Merkmale.</p>",
        teile: [
          w("a", "a) Postleitzahl", 2, ["nominal", "ordinal", "intervallskaliert", "verhältnisskaliert"], 0),
          w("b", "b) Zufriedenheit (sehr unzufrieden … sehr zufrieden)", 2, ["nominal", "ordinal", "intervallskaliert", "verhältnisskaliert"], 1),
          w("c", "c) Monatsgehalt in Euro", 2, ["nominal", "ordinal", "intervallskaliert", "verhältnisskaliert"], 3),
          t("d", "d) Nennen Sie zwei Dimensionen der Datenqualität mit je einem Beispiel für einen Mangel.", 4, "Je 2 P. (Dimension + Beispiel): Vollständigkeit (fehlende Werte), Korrektheit (Tippfehler, falsches Gehalt), Konsistenz (widersprüchliche Angaben), Aktualität (veraltete Adresse), Eindeutigkeit (Dubletten), Plausibilität.")
        ],
        loesung: "<p>a) nominal – Zahlen sind nur Namen, Rechnen ergibt keinen Sinn · b) ordinal – Rangfolge, aber keine gleichen Abstände · c) verhältnisskaliert – natürlicher Nullpunkt, Verhältnisse sinnvoll (doppelt so viel).</p><p>d) z. B. Vollständigkeit: Geburtsdatum fehlt; Korrektheit: Gehalt 45.000 statt 4.500; Konsistenz: Austrittsdatum vor Eintrittsdatum; Aktualität: alte Abteilung; Eindeutigkeit: Person doppelt erfasst.</p>" },

      { titel: "SQL", text: "<p>Tabelle <code>kunden</code> mit den Spalten <code>kunden_id, name, stadt, umsatz</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine SQL-Abfrage, die Name und Umsatz aller Kunden aus Bremen mit einem Umsatz über 10.000 € ausgibt, absteigend nach Umsatz sortiert.", 6, "SELECT name, umsatz (1 P.) FROM kunden (1 P.) WHERE stadt = 'Bremen' (1 P.) AND umsatz > 10000 (1 P.) ORDER BY umsatz DESC (2 P.). Kleine Syntaxabweichungen tolerieren."),
          w("b", "b) Mit welcher Klausel bilden Sie den Umsatz je Stadt?", 2, ["GROUP BY stadt mit SUM(umsatz)", "ORDER BY stadt", "WHERE stadt", "DISTINCT stadt"], 0),
          w("c", "c) Was liefert ein INNER JOIN zweier Tabellen?", 2, ["Nur die Zeilen, zu denen es in beiden Tabellen einen passenden Schlüssel gibt", "Alle Zeilen der linken Tabelle", "Alle Zeilen beider Tabellen", "Nur die Spaltennamen"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT name, umsatz\nFROM kunden\nWHERE stadt = 'Bremen' AND umsatz &gt; 10000\nORDER BY umsatz DESC;</pre><p>b) <code>SELECT stadt, SUM(umsatz) FROM kunden GROUP BY stadt;</code> · c) Nur Zeilen mit passendem Schlüssel in beiden Tabellen.</p>" },

      { titel: "Konfusionsmatrix", text: "<p>Ein Klassifikator erkennt fehlerhafte Bauteile. Auf 200 Testteilen ergibt sich:</p><div class=\"table-wrap\"><table><thead><tr><th></th><th>vorhergesagt: fehlerhaft</th><th>vorhergesagt: in Ordnung</th></tr></thead><tbody><tr><th>tatsächlich fehlerhaft</th><td>40</td><td>20</td></tr><tr><th>tatsächlich in Ordnung</th><td>10</td><td>130</td></tr></tbody></table></div><p>Geben Sie Prozentwerte mit zwei Nachkommastellen an.</p>",
        teile: [
          z("a", "a) Accuracy", 2, 85, 0.1, "%"),
          z("b", "b) Precision (Klasse fehlerhaft)", 2, 80, 0.1, "%"),
          z("c", "c) Recall (Klasse fehlerhaft)", 2, 66.67, 0.1, "%"),
          z("d", "d) F1-Score", 2, 72.73, 0.15, "%"),
          w("e", "e) Ein übersehenes fehlerhaftes Teil verursacht hohe Folgekosten. Welche Kennzahl ist dann besonders wichtig?", 2, ["Recall", "Precision", "Accuracy", "Spezifität"], 0)
        ],
        loesung: "<p>TP = 40, FN = 20, FP = 10, TN = 130.</p><p>a) (40 + 130) / 200 = <b>85 %</b> · b) 40 / 50 = <b>80 %</b> · c) 40 / 60 = <b>66,67 %</b> · d) 2 · 0,8 · 0,6667 / (0,8 + 0,6667) = <b>72,73 %</b> · e) <b>Recall</b>, denn er misst, wie viele der fehlerhaften Teile gefunden werden.</p>" },

      { titel: "Over- und Underfitting", text: "<p>Ein Modell erreicht auf den Trainingsdaten 99 % Genauigkeit, auf den Testdaten nur 71 %.</p>",
        teile: [
          w("a", "a) Was liegt vor?", 2, ["Overfitting", "Underfitting", "Data Drift", "ein gut generalisierendes Modell"], 0),
          t("b", "b) Nennen Sie zwei Gegenmaßnahmen.", 4, "Je 2 P.: mehr Trainingsdaten, einfacheres Modell/weniger Parameter, Regularisierung (L1/L2, Dropout), Early Stopping, weniger/bessere Merkmale, Kreuzvalidierung zur Modellauswahl, Baumtiefe begrenzen."),
          t("c", "c) Wozu teilt man Daten in Trainings-, Validierungs- und Testdaten auf?", 4, "Training: Modell lernt (1 P.). Validierung: Modellwahl/Hyperparameter abstimmen (1,5 P.). Test: einmalige, unabhängige Schätzung der Leistung auf ungesehenen Daten (1,5 P.).")
        ],
        loesung: "<p>a) <b>Overfitting</b>: Das Modell hat die Trainingsdaten auswendig gelernt und verallgemeinert schlecht.</p><p>b) z. B. mehr Daten, einfacheres Modell, Regularisierung, Early Stopping, Merkmalsauswahl.</p><p>c) Mit den Trainingsdaten lernt das Modell. Mit den Validierungsdaten werden Modelle und Hyperparameter verglichen. Die Testdaten bleiben bis zum Schluss unberührt und zeigen ehrlich, wie gut das Modell auf neuen Daten ist.</p>" },

      { titel: "Python", text: "<pre class=\"code\">werte = [4, 8, 15, 16, 23]\nsumme = 0\nfor w in werte:\n    if w % 2 == 0:\n        summe += w\nprint(summe)\nprint(werte[1:3])</pre>",
        teile: [
          z("a", "a) Welche Zahl gibt die erste print-Anweisung aus?", 3, 28, 0.001),
          w("b", "b) Was gibt die zweite print-Anweisung aus?", 3, ["[4, 8]", "[8, 15]", "[8, 15, 16]", "[15, 16]"], 1),
          t("c", "c) Nennen Sie je eine typische Aufgabe der Bibliotheken pandas und scikit-learn.", 4, "pandas: Tabellen laden, bereinigen, filtern, gruppieren (2 P.). scikit-learn: Modelle trainieren und bewerten, Train-Test-Split, Vorverarbeitung wie Skalierung (2 P.).")
        ],
        loesung: "<p>a) Die Schleife addiert die geraden Zahlen 4 + 8 + 16 = <b>28</b>.</p><p>b) Slicing von Index 1 bis ausschließlich 3: <b>[8, 15]</b>.</p><p>c) pandas: Daten als DataFrame einlesen, bereinigen, filtern, gruppieren. scikit-learn: Modelle wie Random Forest trainieren, Daten aufteilen, Kennzahlen berechnen.</p>" },

      { titel: "Künstliches Neuron", text: "<p>Ein Neuron hat die Eingaben x = (2; 1; 3), die Gewichte w = (0,5; −1; 0,2) und den Bias b = 0,4.</p>",
        teile: [
          z("a", "a) Gewichtete Summe z = w·x + b", 4, 1, 0.001),
          z("b", "b) Ausgabe mit ReLU", 2, 1, 0.001),
          z("c", "c) Ausgabe mit Sigmoid (drei Nachkommastellen)", 2, 0.731, 0.002),
          t("d", "d) Wozu dient die Aktivierungsfunktion?", 2, "Sie macht das Netz nichtlinear; ohne sie wäre ein mehrschichtiges Netz nur eine lineare Funktion und könnte keine komplexen Zusammenhänge lernen (2 P.).")
        ],
        loesung: "<p>a) 0,5 · 2 + (−1) · 1 + 0,2 · 3 + 0,4 = 1 − 1 + 0,6 + 0,4 = <b>1,0</b></p><p>b) ReLU(1) = max(0; 1) = <b>1</b> · c) 1 / (1 + e<sup>−1</sup>) ≈ <b>0,731</b></p><p>d) Sie bringt Nichtlinearität ins Netz. Ohne sie ließen sich alle Schichten zu einer einzigen linearen Funktion zusammenfassen.</p>" },

      { titel: "Verantwortungsvolle KI", text: "<p>Ihr Unternehmen plant mehrere KI-Anwendungen.</p>",
        teile: [
          t("a", "a) Erklären Sie an einem Beispiel, wie Bias in einem KI-Modell entstehen kann.", 4, "Ursache (2 P.): verzerrte/unausgewogene Trainingsdaten, historische Benachteiligung, ungeeignete Merkmale/Stellvertretermerkmale. Beispiel (2 P.): z. B. Bewerbermodell lernt aus früheren Einstellungen überwiegend Männer und benachteiligt Frauen."),
          w("b", "b) Wie stuft der AI Act ein KI-System zur Vorauswahl von Bewerbungen ein?", 2, ["minimales Risiko", "begrenztes Risiko (nur Transparenzpflicht)", "Hochrisiko-System", "verbotene Praktik"], 2),
          w("c", "c) Sind pseudonymisierte Daten personenbezogene Daten im Sinne der DSGVO?", 2, ["Ja, weil die Person mit Zusatzwissen wieder identifizierbar ist", "Nein, sie sind anonym", "Nur bei Gesundheitsdaten", "Nur wenn Namen enthalten sind"], 0),
          w("d", "d) Welches Recht gibt Art. 22 DSGVO betroffenen Personen?", 2, ["Nicht einer ausschließlich automatisierten Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung unterworfen zu werden", "Auf kostenlose KI-Nutzung", "Auf Löschung des KI-Modells", "Auf Einsicht in den Quellcode"], 0)
        ],
        loesung: "<p>a) Wenn die Trainingsdaten die Wirklichkeit verzerrt abbilden, übernimmt das Modell die Verzerrung. Beispiel: Ein Modell zur Bewerberauswahl wird mit Einstellungen der letzten zehn Jahre trainiert, in denen fast nur Männer eingestellt wurden – es bewertet Frauen schlechter.</p><p>b) Hochrisiko (Anhang III, Beschäftigung) · c) Ja – pseudonymisiert ist nicht anonym · d) Schutz vor ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s01t2", satz: 1, teil: 2, titel: "Vertiefungen: Kundenabwanderung im Onlinehandel", kurz: "Onlinehandel · Churn", minuten: 120,
    situation: "<p>Die <b>NordModa GmbH</b> (Online-Modehändler, 180 Mitarbeitende) hat 120.000 aktive Kundinnen und Kunden. Jedes Jahr kaufen rund 18 % von ihnen nicht mehr (Abwanderung, „Churn“). Ein verlorener Kunde kostet im Schnitt 150 € Deckungsbeitrag pro Jahr.</p><p>Vorhanden sind: Kundenstamm im CRM, Bestellhistorie der letzten drei Jahre, Retouren, Newsletter-Klicks und Servicekontakte. Das Marketing möchte gefährdeten Kunden einen Gutschein über 10 € schicken. Sie sollen als Berufsspezialist/in ein Prognosemodell konzipieren.</p>",
    aufgaben: [
      { titel: "Problemdefinition", text: "",
        teile: [
          t("a", "a) Formulieren Sie die ML-Aufgabe. Nennen Sie Lernparadigma, Aufgabentyp und eine konkrete Definition der Zielvariable.", 6, "Überwachtes Lernen (2 P.), binäre Klassifikation (2 P.), Zielvariable konkret, z. B. „kein Kauf in den nächsten 6 Monaten = 1“ (2 P.)."),
          t("b", "b) Nennen Sie zwei aussagekräftige Merkmale und begründen Sie kurz.", 4, "Je 2 P.: Tage seit letztem Kauf (Recency), Kaufhäufigkeit (Frequency), Umsatz (Monetary), Retourenquote, Servicebeschwerden, Newsletter-Aktivität – mit plausibler Begründung."),
          t("c", "c) Nennen Sie zwei messbare Erfolgskriterien für das Projekt.", 4, "Je 2 P.: fachlich (z. B. Abwanderungsquote sinkt von 18 % auf 15 %, gerettete Kunden) und technisch (z. B. Recall ≥ 70 % bei Precision ≥ 50 % auf Testdaten).")
        ],
        loesung: "<p>a) Überwachtes Lernen, binäre Klassifikation. Zielvariable z. B.: „Kunde hat in den 6 Monaten nach dem Stichtag nichts bestellt = 1, sonst 0“.</p><p>b) z. B. Tage seit dem letzten Kauf (lange Pause kündigt Abwanderung an), Bestellhäufigkeit und Umsatz der letzten 12 Monate (Bindung), Retourenquote und Beschwerden (Unzufriedenheit), Newsletter-Klicks (Interesse).</p><p>c) Fachlich: Abwanderungsquote sinkt im Pilot um 3 Prozentpunkte. Technisch: Recall mindestens 70 % bei einer Precision von mindestens 50 % auf zeitlich getrennten Testdaten.</p>" },

      { titel: "Daten", text: "<p>Die Bestelldaten liegen in zwei Tabellen: <code>kunden(kunden_id, plz, anmeldedatum)</code> und <code>bestellungen(bestell_id, kunden_id, datum, betrag)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine SQL-Abfrage, die je Kunde die Anzahl der Bestellungen und den Gesamtumsatz liefert – auch für Kunden ohne Bestellung.", 6, "SELECT k.kunden_id, COUNT(b.bestell_id), SUM(b.betrag) (2 P.) FROM kunden k LEFT JOIN bestellungen b ON k.kunden_id = b.kunden_id (3 P., LEFT JOIN für Kunden ohne Bestellung) GROUP BY k.kunden_id (1 P.). INNER JOIN nur 1 P. für den Join-Teil."),
          t("b", "b) Beschreiben Sie drei Schritte der Datenvorverarbeitung für dieses Projekt.", 6, "Je 2 P.: Daten zusammenführen und auf Kundenebene aggregieren (Merkmale bilden); fehlende Werte behandeln; Ausreißer/Fehlbuchungen prüfen; Kategorien kodieren (One-Hot); Skalieren; Dubletten entfernen; Labels zum Stichtag erzeugen."),
          t("c", "c) Nur 18 % der Kunden wandern ab. Welches Problem entsteht beim Training, und wie gehen Sie damit um?", 3, "Klassenungleichgewicht, Modell bevorzugt Mehrheitsklasse (1 P.). Maßnahmen (2 P.): Klassengewichte, Oversampling/SMOTE, Undersampling, Schwellenwert anpassen, passende Kennzahlen (Recall/F1 statt Accuracy)."),
          w("d", "d) Das Marketing schlägt das Merkmal „Kündigungsgrund aus der Abschiedsumfrage“ vor. Wie bewerten Sie das?", 3, ["Nicht verwenden – Data Leakage, die Information gibt es erst nach der Abwanderung", "Sehr gut – es ist das stärkste Merkmal", "Nur bei Kunden aus Bremen verwenden", "Unproblematisch, wenn es skaliert wird"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT k.kunden_id,\n       COUNT(b.bestell_id) AS anzahl,\n       COALESCE(SUM(b.betrag), 0) AS umsatz\nFROM kunden k\nLEFT JOIN bestellungen b ON k.kunden_id = b.kunden_id\nGROUP BY k.kunden_id;</pre><p>b) z. B. Bestellungen je Kunde zu Merkmalen zusammenfassen (Recency, Frequency, Monetary, Retourenquote); fehlende Werte ergänzen oder kennzeichnen; Fehlbuchungen und Testbestellungen entfernen; Kategorien wie Region kodieren; numerische Merkmale skalieren; Label zum Stichtag bilden.</p><p>c) Klassenungleichgewicht: Ein Modell, das immer „bleibt“ sagt, hat schon 82 % Accuracy. Abhilfe: Klassengewichte, Oversampling, Schwellenwert senken, mit Recall/F1 bewerten.</p><p>d) Data Leakage – der Kündigungsgrund ist zum Prognosezeitpunkt nicht bekannt.</p>" },

      { titel: "Modell und Bewertung", text: "<p>Auf 10.000 zeitlich getrennten Testkunden (davon 1.800 tatsächlich abgewandert) ergibt sich: TP = 1.260, FN = 540, FP = 1.040, TN = 7.160. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Accuracy", 3, 84.2, 0.1, "%"),
          z("b", "b) Precision", 3, 54.78, 0.1, "%"),
          z("c", "c) Recall", 3, 70, 0.1, "%"),
          z("d", "d) F1-Score", 3, 61.46, 0.15, "%"),
          z("e", "e) Accuracy eines Modells, das immer „wandert nicht ab“ vorhersagt", 2, 82, 0.1, "%"),
          t("f", "f) Bewerten Sie das Ergebnis unter Einbezug von e).", 4, "Accuracy kaum besser als die triviale Baseline, daher wenig aussagekräftig (2 P.). Recall 70 %: 7 von 10 Abwanderern werden erkannt; Precision 55 %: knapp jeder zweite Gutschein geht an tatsächlich Gefährdete – bei 10-€-Gutschein vertretbar (2 P.)."),
          t("g", "g) Schlagen Sie ein Verfahren vor und begründen Sie die Wahl.", 4, "Verfahren (1 P.): z. B. Gradient Boosting, Random Forest oder logistische Regression. Begründung (3 P.): gut für Tabellendaten, liefert Wahrscheinlichkeiten für Schwellenwert, Feature Importance/Erklärbarkeit, Baseline mit logistischer Regression."),
          w("h", "h) Wie lässt sich der Recall am einfachsten erhöhen?", 2, ["Schwellenwert für „gefährdet“ senken", "Schwellenwert erhöhen", "Testdaten verkleinern", "Accuracy maximieren"], 0)
        ],
        loesung: "<p>a) (1.260 + 7.160) / 10.000 = <b>84,20 %</b> · b) 1.260 / 2.300 = <b>54,78 %</b> · c) 1.260 / 1.800 = <b>70,00 %</b> · d) 2 · 0,5478 · 0,7 / 1,2478 = <b>61,46 %</b> · e) 8.200 / 10.000 = <b>82,00 %</b>.</p><p>f) Die Accuracy liegt nur 2,2 Punkte über der trivialen Lösung und taugt nicht zur Bewertung. Entscheidend: 70 % der Abwanderer werden erkannt; etwa jeder zweite Gutschein trifft einen Gefährdeten. Da ein Gutschein nur 10 € kostet, sind Fehlalarme billig.</p><p>g) z. B. Gradient Boosting: stark bei Tabellendaten, liefert Wahrscheinlichkeiten, Feature Importance erklärt die Treiber. Als Vergleich eine logistische Regression (Baseline, gut erklärbar).</p><p>h) Schwellenwert senken – dafür sinkt die Precision.</p>" },

      { titel: "Wirtschaftlichkeit der Gutscheinaktion", text: "<p>Betrachten Sie die 10.000 Testkunden aus Aufgabe 3. Jeder als gefährdet vorhergesagte Kunde (TP + FP) erhält einen Gutschein über 10 €. Annahme: 25 % der richtig erkannten Abwanderer bleiben dank Gutschein. Ein geretteter Kunde bringt 150 € Deckungsbeitrag.</p>",
        teile: [
          z("a", "a) Kosten der Gutscheine", 3, 23000, 1, "€"),
          z("b", "b) Anzahl geretteter Kunden", 3, 315, 0.5),
          z("c", "c) Nutzen durch gerettete Kunden", 3, 47250, 1, "€"),
          z("d", "d) Nettonutzen", 3, 24250, 1, "€"),
          t("e", "e) Nennen Sie eine Annahme dieser Rechnung, die Sie kritisch prüfen würden.", 2, "Z. B. 25 % Haltequote unbelegt (A/B-Test nötig); Gutschein wird auch von Kunden eingelöst, die ohnehin geblieben wären (Mitnahmeeffekt); 150 € DB nur für ein Jahr; Projektkosten fehlen (2 P.).")
        ],
        loesung: "<p>a) (1.260 + 1.040) · 10 € = <b>23.000 €</b> · b) 1.260 · 0,25 = <b>315</b> · c) 315 · 150 € = <b>47.250 €</b> · d) 47.250 − 23.000 = <b>24.250 €</b>.</p><p>e) Die Haltequote von 25 % ist geschätzt und sollte per A/B-Test mit Kontrollgruppe belegt werden; Mitnahmeeffekte bei Kunden, die ohnehin bleiben; Entwicklungs- und Betriebskosten fehlen.</p>" },

      { titel: "Erklärbarkeit und Betrieb", text: "",
        teile: [
          t("a", "a) Das Marketing möchte wissen, warum ein bestimmter Kunde als gefährdet gilt. Welche Methode nutzen Sie, und was zeigt sie?", 4, "SHAP oder LIME (2 P.): zeigt den Beitrag jedes Merkmals zur einzelnen Vorhersage (lokale Erklärung), z. B. „lange keine Bestellung, viele Retouren“ (2 P.). Globale Feature Importance allein: 2 P."),
          t("b", "b) Schlagen Sie eine Deployment-Variante vor und begründen Sie sie.", 4, "Batch-Vorhersage z. B. wöchentlich (2 P.), da keine Echtzeit nötig ist; Ergebnisliste ins CRM/Marketing-Tool (2 P.)."),
          t("c", "c) Ein halbes Jahr nach dem Start führt NordModa kostenlosen Versand ein. Welches Risiko entsteht, woran erkennen Sie es, und wie reagieren Sie?", 6, "Data/Concept Drift: Kaufverhalten ändert sich (2 P.). Erkennen: Monitoring der Eingangsverteilungen (z. B. PSI) und der Modellgüte mit nachlaufenden Labels (2 P.). Reaktion: neue Daten sammeln, nachtrainieren, Vergleich alt/neu (Shadow/Champion-Challenger), Versionierung (2 P.).")
        ],
        loesung: "<p>a) SHAP-Werte zeigen für jeden Kunden, welche Merkmale die Vorhersage nach oben oder unten treiben, z. B. „92 Tage ohne Bestellung +0,25, drei Retouren +0,1“.</p><p>b) Wöchentliche Batch-Vorhersage für alle Kunden, Ergebnis als Liste oder Feld im CRM; Echtzeit ist nicht nötig.</p><p>c) Drift: Das Kaufverhalten ändert sich, das Modell wurde mit altem Verhalten trainiert. Erkennen über Monitoring der Merkmalsverteilungen und der Trefferquote, sobald die echten Ergebnisse vorliegen. Reaktion: nachtrainieren mit neuen Daten, neues Modell erst im Schattenbetrieb vergleichen, Modellversionen dokumentieren.</p>" },

      { titel: "Datenschutz und Recht", text: "",
        teile: [
          t("a", "a) Auf welche Rechtsgrundlage kann NordModa die Analyse der Kaufdaten stützen, und was ist dabei zu beachten?", 6, "Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse (2 P.), Interessenabwägung dokumentieren (1 P.), Information in der Datenschutzerklärung/Transparenz (1 P.), Widerspruchsrecht Art. 21, insbesondere gegen Direktwerbung (2 P.). Alternativ Einwilligung mit Begründung: max. 4 P."),
          t("b", "b) Handelt es sich um Profiling? Ist Art. 22 DSGVO einschlägig? Begründen Sie.", 4, "Ja, Profiling: automatisierte Bewertung persönlicher Aspekte/Verhalten (2 P.). Art. 22 eher nicht, da ein Gutschein keine rechtliche oder ähnlich erhebliche Wirkung hat (2 P.)."),
          t("c", "c) Nennen Sie zwei technisch-organisatorische Maßnahmen für die Trainingsdaten.", 4, "Je 2 P.: Pseudonymisierung, Zugriffskonzept/Rollen, Verschlüsselung, Datenminimierung, Löschfristen, Protokollierung."),
          w("d", "d) In welche Risikoklasse des AI Act fällt das System voraussichtlich?", 2, ["minimales Risiko", "Hochrisiko", "verbotene Praktik", "allgemeines KI-Modell mit systemischem Risiko"], 0)
        ],
        loesung: "<p>a) Berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO (Kundenbindung, Direktwerbung). Die Interessenabwägung ist zu dokumentieren, die Kunden sind zu informieren und haben ein Widerspruchsrecht nach Art. 21 – gegen Direktwerbung jederzeit.</p><p>b) Profiling ja, weil Verhalten automatisiert bewertet wird. Art. 22 greift nicht, weil ein Gutschein keine rechtliche oder ähnlich erhebliche Wirkung hat.</p><p>c) z. B. Pseudonymisierung der Kundennummern, Zugriff nur für das Projektteam, Datenminimierung, Löschfristen.</p><p>d) Minimales Risiko.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
