/* Prüfungssatz 5 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "s05t1", satz: 5, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Begriffe", text: "",
        teile: [
          w("a", "a) Was ist ein Expertensystem?", 2, ["Ein regelbasiertes System, das Fachwissen in Form von Regeln und einer Wissensbasis abbildet", "Ein neuronales Netz mit vielen Schichten", "Ein Chatbot mit Internetzugang", "Eine Datenbank mit Experten-Adressen"], 0),
          t("b", "b) Was ist ein KI-Agent? Nennen Sie ein Beispiel.", 3, "System, das seine Umgebung wahrnimmt, selbstständig Entscheidungen trifft/Aktionen ausführt, um ein Ziel zu erreichen, ggf. mit Werkzeugen (2 P.); Beispiel (1 P.): Staubsaugerroboter, Sprachmodell-Agent, der Termine bucht."),
          t("c", "c) Unterscheiden Sie Training und Inferenz.", 3, "Training: Modell lernt Parameter aus Daten, rechenintensiv, einmalig/periodisch (1,5 P.). Inferenz: trainiertes Modell erstellt Vorhersagen für neue Daten im Einsatz (1,5 P.)."),
          w("d", "d) Was ist ein Foundation Model?", 2, ["Ein großes, auf breiten Daten vortrainiertes Modell, das für viele Aufgaben angepasst werden kann", "Das erste Modell eines Projekts", "Ein Modell nur für Bauwesen", "Ein Entscheidungsbaum mit Wurzelknoten"], 0)
        ],
        loesung: "<p>a) Regelbasiertes System mit Wissensbasis und Inferenzmaschine. b) Ein Agent nimmt seine Umgebung wahr und handelt selbstständig auf ein Ziel hin, z. B. ein Sprachmodell, das per Werkzeug Termine im Kalender bucht. c) Training: Das Modell lernt aus Daten. Inferenz: Das fertige Modell wird für Vorhersagen genutzt. d) Großes vortrainiertes Basismodell (z. B. ein großes Sprachmodell).</p>" },

      { titel: "Feature Engineering", text: "",
        teile: [
          t("a", "a) Nennen Sie drei Merkmale, die Sie aus einem Zeitstempel ableiten können.", 3, "Je 1 P.: Stunde, Wochentag, Monat, Quartal, Wochenende ja/nein, Feiertag, Ferien, Jahreszeit."),
          w("b", "b) Wofür nutzt man eine Log-Transformation?", 2, ["Um stark rechtsschiefe Werte (z. B. Einkommen) zu stauchen", "Um Text in Zahlen umzuwandeln", "Um fehlende Werte zu löschen", "Um Klassen zu balancieren"], 0),
          z("c", "c) Ein Shop hat 12.000 € Umsatz bei 400 Besuchen. Wert des Merkmals „Umsatz je Besuch“?", 2, 30, 0.001, "€"),
          t("d", "d) Was ist Merkmalsauswahl (Feature Selection), und warum macht man sie?", 3, "Auswahl der relevanten Merkmale (1 P.); weniger Overfitting, schnelleres Training, bessere Erklärbarkeit, weniger Datenerhebung (2 P.).")
        ],
        loesung: "<p>a) z. B. Stunde, Wochentag, Monat, Feiertag. b) Rechtsschiefe Verteilungen stauchen. c) 12.000 / 400 = <b>30 €</b>. d) Nur die aussagekräftigen Merkmale behalten – das senkt Overfitting und Aufwand und verbessert die Erklärbarkeit.</p>" },

      { titel: "Statistik und Prozentrechnung", text: "<p>Wartezeiten an einer Hotline in Minuten: <b>3, 5, 7, 8, 9, 12</b>.</p>",
        teile: [
          z("a", "a) Median", 2, 7.5, 0.001, "min"),
          z("b", "b) Mittelwert (zwei Nachkommastellen)", 2, 7.33, 0.01, "min"),
          z("c", "c) Die Zahl der Anrufe stieg von 80 auf 92 pro Tag. Um wie viel Prozent?", 3, 15, 0.01, "%"),
          t("d", "d) Erklären Sie Grundgesamtheit und Stichprobe am Beispiel einer Kundenbefragung.", 3, "Grundgesamtheit: alle Kunden (1,5 P.); Stichprobe: befragte Teilmenge, sollte repräsentativ/zufällig sein (1,5 P.).")
        ],
        loesung: "<p>a) (7 + 8) / 2 = <b>7,5</b> · b) 44 / 6 ≈ <b>7,33</b> · c) 12 / 80 = <b>15 %</b> · d) Grundgesamtheit: alle 20.000 Kunden. Stichprobe: z. B. 500 zufällig ausgewählte Kunden, aus deren Antworten auf alle geschlossen wird.</p>" },

      { titel: "Daten schützen", text: "",
        teile: [
          w("a", "a) Welche Daten gehören zu den besonderen Kategorien nach Art. 9 DSGVO?", 2, ["Gesundheitsdaten", "Postleitzahl", "Bestellhistorie", "Kundennummer"], 0),
          w("b", "b) Ist eine IP-Adresse ein personenbezogenes Datum?", 2, ["In der Regel ja, weil sie mit Zusatzwissen einer Person zugeordnet werden kann", "Nie", "Nur bei Firmen", "Nur wenn sie mit 192 beginnt"], 0),
          t("c", "c) Wie setzen Sie Datenminimierung in einem ML-Projekt praktisch um?", 3, "Nur benötigte Merkmale erheben/verwenden, Zweck vorher festlegen (1,5 P.); vergröbern, aggregieren, pseudonymisieren, nicht benötigte Daten löschen (1,5 P.)."),
          t("d", "d) Nennen Sie zwei Maßnahmen der Datensicherheit für einen Trainingsdatensatz.", 3, "Je 1,5 P.: Zugriffsrechte/Rollen, Verschlüsselung, Protokollierung, Backups, sichere Umgebung, Löschkonzept, Pseudonymisierung.")
        ],
        loesung: "<p>a) Gesundheitsdaten (außerdem z. B. biometrische Daten, Religion, ethnische Herkunft). b) In der Regel ja. c) Vorab festlegen, welche Merkmale wirklich nötig sind; Namen und Adressen weglassen, Alter in Gruppen, Daten pseudonymisieren, nach Projektende löschen. d) z. B. Zugriff nur für das Projektteam, Verschlüsselung, Protokollierung der Zugriffe.</p>" },

      { titel: "SQL", text: "<p>Tabellen <code>produkte(produkt_id, name, preis)</code> und <code>positionen(position_id, produkt_id, menge)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die die fünf umsatzstärksten Produkte (Umsatz = Menge · Preis) mit Namen und Umsatz ausgibt.", 6, "JOIN über produkt_id (2 P.); SUM(menge * preis) (1 P.); GROUP BY Produkt (1 P.); ORDER BY Umsatz DESC (1 P.); LIMIT 5 bzw. TOP 5 (1 P.)."),
          w("b", "b) Was bewirkt SELECT DISTINCT?", 2, ["Doppelte Ergebniszeilen werden entfernt", "Es werden nur Zahlen ausgegeben", "Die Tabelle wird gelöscht", "Es wird sortiert"], 0),
          w("c", "c) Was ist ein Fremdschlüssel?", 2, ["Eine Spalte, die auf den Primärschlüssel einer anderen Tabelle verweist", "Ein geheimer Schlüssel zur Verschlüsselung", "Ein Schlüssel ohne Werte", "Der Primärschlüssel einer fremden Datenbank"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT p.name, SUM(pos.menge * p.preis) AS umsatz\nFROM positionen pos\nJOIN produkte p ON pos.produkt_id = p.produkt_id\nGROUP BY p.produkt_id, p.name\nORDER BY umsatz DESC\nLIMIT 5;</pre><p>b) Entfernt doppelte Zeilen. c) Verweis auf den Primärschlüssel einer anderen Tabelle (hier positionen.produkt_id → produkte.produkt_id).</p>" },

      { titel: "Konfusionsmatrix rückwärts", text: "<p>Ein Spamfilter wird auf 500 E-Mails getestet, davon sind 100 Spam. Er erreicht einen Recall von 0,8 und eine Precision von 0,5.</p>",
        teile: [
          z("a", "a) True Positives", 2, 80, 0.001),
          z("b", "b) False Positives", 3, 80, 0.001),
          z("c", "c) True Negatives", 3, 320, 0.001),
          z("d", "d) Accuracy", 2, 80, 0.1, "%")
        ],
        loesung: "<p>a) TP = 0,8 · 100 = <b>80</b> · b) Precision 0,5 → 160 als Spam markiert → FP = <b>80</b> · c) 400 − 80 = <b>320</b> · d) (80 + 320) / 500 = <b>80 %</b>.</p>" },

      { titel: "Ensemble-Verfahren", text: "",
        teile: [
          w("a", "a) Was unterscheidet Boosting von Bagging?", 2, ["Boosting trainiert Modelle nacheinander, jedes korrigiert die Fehler der vorigen; Bagging trainiert unabhängig auf Zufallsstichproben", "Es gibt keinen Unterschied", "Bagging ist nur für Bilder", "Boosting nutzt keine Entscheidungsbäume"], 0),
          t("b", "b) Erklären Sie das Grundprinzip von Gradient Boosting.", 4, "Viele kleine Bäume nacheinander (1 P.); jeder neue Baum lernt die Restfehler/Residuen bzw. den Gradienten des Fehlers der bisherigen Modelle (2 P.); Summe mit Lernrate gewichtet (1 P.)."),
          w("c", "c) Welches Verfahren gilt bei Tabellendaten oft als besonders leistungsfähig?", 2, ["Gradient Boosting (z. B. XGBoost, LightGBM)", "k-Means", "Faltungsnetz", "Lineare Regression ohne Merkmale"], 0),
          w("d", "d) Was ist Early Stopping?", 2, ["Training wird beendet, wenn sich der Validierungsfehler nicht mehr verbessert", "Das Modell bricht bei Fehlern ab", "Man trainiert nur eine Epoche", "Daten werden früh gelöscht"], 0)
        ],
        loesung: "<p>a) Boosting sequenziell und fehlerkorrigierend, Bagging parallel auf Bootstrap-Stichproben. b) Ein Baum nach dem anderen lernt jeweils die verbliebenen Fehler; die Vorhersagen werden mit einer Lernrate aufsummiert. c) Gradient Boosting. d) Abbruch, sobald der Validierungsfehler nicht mehr sinkt – gegen Overfitting.</p>" },

      { titel: "Python mit pandas", text: "<pre class=\"code\">import pandas as pd\ndf = pd.DataFrame({\"stadt\": [\"HB\", \"HB\", \"HH\", \"HH\", \"HH\"],\n                   \"umsatz\": [10, 20, 5, 15, 40]})\nprint(df.groupby(\"stadt\")[\"umsatz\"].sum()[\"HH\"])\nprint(df[df[\"umsatz\"] &gt; 12].shape[0])\nprint(df[\"umsatz\"].mean())</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung", 3, 60, 0.001),
          z("b", "b) Ausgabe der zweiten print-Anweisung", 3, 3, 0.001),
          z("c", "c) Ausgabe der dritten print-Anweisung", 4, 18, 0.001)
        ],
        loesung: "<p>a) 5 + 15 + 40 = <b>60</b> · b) Werte über 12: 20, 15, 40 → <b>3</b> Zeilen · c) 90 / 5 = <b>18</b> (18.0).</p>" },

      { titel: "Aktivierung und Verlust", text: "",
        teile: [
          z("a", "a) Sigmoid(0)", 2, 0.5, 0.001),
          z("b", "b) ReLU(−3)", 2, 0, 0.001),
          z("c", "c) Kreuzentropie-Verlust −ln(p), wenn das Modell der richtigen Klasse p = 0,8 gibt (drei Nachkommastellen)", 3, 0.223, 0.002),
          w("d", "d) Was beschreibt das Problem verschwindender Gradienten?", 3, ["In tiefen Netzen werden die Gradienten zu den vorderen Schichten hin so klein, dass diese kaum noch lernen", "Die Daten verschwinden aus dem Speicher", "Die Lernrate wird automatisch null", "Das Netz vergisst alte Daten"], 0)
        ],
        loesung: "<p>a) <b>0,5</b> · b) <b>0</b> · c) −ln(0,8) ≈ <b>0,223</b> · d) Gradienten werden beim Zurückrechnen immer kleiner; abhilfe z. B. ReLU, Residualverbindungen, Normalisierung.</p>" },

      { titel: "Arbeiten mit Sprachmodellen", text: "",
        teile: [
          t("a", "a) Nennen Sie drei Bestandteile eines guten Prompts.", 3, "Je 1 P.: Rolle, klare Aufgabe/Ziel, Kontext/Daten, gewünschtes Format, Beispiele, Einschränkungen/Qualitätskriterien, Zielgruppe."),
          w("b", "b) Was ist Few-Shot-Prompting?", 2, ["Dem Modell werden im Prompt einige Beispiele für Eingabe und gewünschte Ausgabe gegeben", "Das Modell wird mit wenigen Daten neu trainiert", "Es werden nur kurze Prompts genutzt", "Das Modell antwortet nur wenige Male"], 0),
          w("c", "c) Was ist das Kontextfenster?", 2, ["Die maximale Menge an Tokens, die das Modell in einer Anfrage berücksichtigen kann", "Ein Fenster im Browser", "Die Trainingsdauer", "Die Zahl der Nutzer"], 0),
          t("d", "d) Eine Kollegin kopiert Kundendaten in einen öffentlichen Chatbot, um Mails zu formulieren. Bewerten Sie das.", 3, "Datenschutzverstoß möglich: Übermittlung personenbezogener Daten an Dritte ohne Rechtsgrundlage/AVV, ggf. Nutzung zum Training, Drittland (2 P.); Abhilfe: anonymisieren, freigegebenes Unternehmenstool mit AVV, Richtlinie/Schulung (1 P.).")
        ],
        loesung: "<p>a) z. B. Rolle („Du bist …“), Aufgabe, Kontext, Ausgabeformat, Beispiele. b) Beispiele im Prompt. c) Maximale Tokenmenge pro Anfrage. d) Problematisch: Personenbezogene Daten gehen ohne Auftragsverarbeitungsvertrag an einen Dritten, eventuell ins Ausland und ins Training. Besser: Daten anonymisieren oder ein freigegebenes Firmentool nutzen.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s05t2", satz: 5, teil: 2, titel: "Vertiefungen: Lastprognose bei Stadtwerken", kurz: "Energie · Zeitreihe", minuten: 120,
    situation: "<p>Die <b>Stadtwerke Moorstadt</b> versorgen 45.000 Haushalte und Betriebe mit Strom. Sie kaufen den Strom für den Folgetag bis 12 Uhr ein. Jede Megawattstunde (MWh), um die die Prognose von der tatsächlichen Last abweicht, kostet im Schnitt 60 € Ausgleichsenergie. Das bisherige Verfahren liegt im Mittel 4,0 MW pro Stunde daneben.</p><p>Vorhanden: Lastmessungen im Viertelstundentakt seit vier Jahren, Wettermessungen und -vorhersagen (Temperatur, Sonnenstunden, Wind), Kalender mit Feiertagen und Schulferien. Sie sollen ein neues Prognosemodell für die 24 Stundenwerte des Folgetags entwickeln.</p>",
    aufgaben: [
      { titel: "Problemdefinition", text: "",
        teile: [
          t("a", "a) Beschreiben Sie die ML-Aufgabe. Gehen Sie auf Aufgabentyp, Zielgröße und den Zeitpunkt ein, zu dem die Prognose erstellt wird.", 6, "Überwachte Regression auf Zeitreihe (2 P.); Zielgröße: stündliche Last in MW für 24 Stunden des Folgetags, Mehrschritt-Prognose (2 P.); Prognose am Vortag vor 12 Uhr – nur bis dahin verfügbare Daten dürfen verwendet werden (2 P.)."),
          t("b", "b) Welche einfache Baseline schlagen Sie vor?", 3, "Saisonal-naive Prognose: Last derselben Stunde vor einer Woche (bzw. am Vortag) oder Mittel der letzten gleichen Wochentage (3 P.)."),
          w("c", "c) Was ist ein Lag-Merkmal?", 3, ["Ein vergangener Wert der Zielgröße, z. B. die Last vor 7 Tagen zur gleichen Stunde", "Ein Merkmal mit Verzögerung beim Laden", "Ein fehlerhafter Messwert", "Die Rechenzeit des Modells"], 0)
        ],
        loesung: "<p>a) Regression auf einer Zeitreihe, Mehrschritt-Prognose: 24 Stundenwerte in MW für den Folgetag, erstellt bis 12 Uhr am Vortag. Alle Merkmale müssen zu diesem Zeitpunkt bekannt sein.</p><p>b) Last derselben Stunde am gleichen Wochentag der Vorwoche.</p><p>c) Vergangener Wert der Zielgröße als Merkmal.</p>" },

      { titel: "Daten und Merkmale", text: "",
        teile: [
          t("a", "a) Welche Saisonalitäten hat die Stromlast, und mit welchen Merkmalen bilden Sie sie ab?", 6, "Tagesgang → Stunde (2 P.); Wochenzyklus → Wochentag, Wochenende, Feiertag (2 P.); Jahresgang → Monat/Temperatur/Tageslicht, Ferien (2 P.)."),
          t("b", "b) Bei der Zeitumstellung fehlen bzw. verdoppeln sich Viertelstundenwerte. Außerdem fehlen einzelne Messungen. Wie gehen Sie vor?", 4, "Einheitliche Zeitbasis (UTC) (2 P.); Lücken kurz interpolieren, längere markieren/ausschließen, Plausibilitätsprüfung (2 P.)."),
          t("c", "c) Warum verwenden Sie im Training Wettervorhersagen und nicht die tatsächlich gemessenen Wetterwerte?", 6, "Zum Prognosezeitpunkt kennt man nur die Vorhersage (2 P.); Training mit Messwerten wäre Leakage und überschätzt die Güte (2 P.); Modell lernt so auch mit der Unsicherheit der Vorhersage umzugehen (2 P.).")
        ],
        loesung: "<p>a) Tagesgang (Stunde), Wochengang (Wochentag, Wochenende, Feiertage), Jahresgang (Monat, Temperatur, Tageslicht, Schulferien).</p><p>b) Zeitstempel in UTC führen, kurze Lücken interpolieren, längere Ausfälle kennzeichnen oder ausschließen, unplausible Werte prüfen.</p><p>c) Im Einsatz gibt es um 12 Uhr nur die Wettervorhersage für morgen. Mit gemessenem Wetter zu trainieren wäre Leakage – das Modell wäre im Test besser als im Betrieb.</p>" },

      { titel: "Bewertung", text: "<p>Ausschnitt (MW): tatsächlich y = (50; 80; 60; 40), Prognose ŷ = (48; 86; 57; 42). Fehler e = y − ŷ.</p>",
        teile: [
          z("a", "a) MAE", 4, 3.25, 0.01, "MW"),
          z("b", "b) MAPE (zwei Nachkommastellen)", 4, 5.38, 0.05, "%"),
          z("c", "c) RMSE (zwei Nachkommastellen)", 3, 3.64, 0.01, "MW"),
          z("d", "d) Mittlerer Fehler (Bias) = Mittelwert von e", 3, -0.75, 0.001, "MW"),
          t("e", "e) Was bedeutet das Vorzeichen des Bias aus d)?", 3, "Negativ: Prognose liegt im Mittel über der tatsächlichen Last, das Modell überschätzt systematisch leicht (3 P.)."),
          t("f", "f) Wie testen Sie ein Zeitreihenmodell zuverlässig? Beschreiben Sie das Verfahren.", 5, "Backtesting/Walk-forward-Validierung (2 P.): mit Daten bis Zeitpunkt t trainieren, Folgezeitraum vorhersagen, Fenster weiterschieben und wiederholen (2 P.); keine zufällige Aufteilung, über verschiedene Jahreszeiten (1 P.)."),
          w("g", "g) Welches Problem hat der MAPE?", 2, ["Er wird bei tatsächlichen Werten nahe null sehr groß oder undefiniert", "Er ist nie in Prozent", "Er bestraft große Fehler stärker als der RMSE", "Er braucht keine echten Werte"], 0)
        ],
        loesung: "<p>Fehler: 2; −6; 3; −2.</p><p>a) 13 / 4 = <b>3,25 MW</b> · b) (2/50 + 6/80 + 3/60 + 2/40) / 4 = 0,215 / 4 = <b>5,38 %</b> · c) √((4 + 36 + 9 + 4) / 4) = √13,25 ≈ <b>3,64 MW</b> · d) (2 − 6 + 3 − 2) / 4 = <b>−0,75 MW</b>.</p><p>e) Die Prognose liegt im Schnitt etwas zu hoch.</p><p>f) Walk-forward: Training bis zu einem Stichtag, Prognose der folgenden Tage, Stichtag verschieben, wiederholen – über mindestens ein ganzes Jahr, damit alle Jahreszeiten vorkommen.</p><p>g) Bei Werten nahe null explodiert der MAPE.</p>" },

      { titel: "Modellwahl", text: "",
        teile: [
          t("a", "a) Vergleichen Sie Gradient Boosting mit Lag- und Kalendermerkmalen und ein LSTM-Netz für diese Aufgabe. Welches würden Sie zuerst einsetzen?", 6, "GBM: stark bei Tabellendaten, schnell, wenig Daten nötig, erklärbar per Feature Importance, braucht manuelle Merkmale (2 P.). LSTM: lernt Sequenzmuster selbst, braucht mehr Daten/Rechenaufwand, schwerer erklärbar und zu tunen (2 P.). Empfehlung mit Begründung, meist GBM zuerst (2 P.)."),
          t("b", "b) Feiertage kommen nur wenige Male pro Jahr vor. Wie sorgen Sie trotzdem für gute Prognosen an Feiertagen?", 4, "Feiertagsmerkmal/Kategorie (Feiertag wie Sonntag behandeln), Brückentage (2 P.); alle Jahre nutzen, eigene Auswertung der Feiertagsfehler, ggf. Korrektur/Expertenregel (2 P.)."),
          t("c", "c) Wie optimieren Sie Hyperparameter, ohne dass Information aus der Zukunft ins Training gelangt?", 4, "Zeitreihen-Kreuzvalidierung (TimeSeriesSplit/Walk-forward) innerhalb der Trainingsdaten (2 P.); finaler Test auf einem späteren, unberührten Zeitraum (2 P.).")
        ],
        loesung: "<p>a) Gradient Boosting ist schnell, robust, mit vier Jahren Daten gut trainierbar und über Feature Importance erklärbar. Ein LSTM lernt zeitliche Muster selbst, braucht aber mehr Daten, Rechenzeit und Erfahrung. Empfehlung: GBM als erstes Produktivmodell, LSTM als Vergleich.</p><p>b) Merkmal Feiertag/Brückentag (Feiertag ähnlich wie Sonntag), Fehler an Feiertagen gesondert auswerten, notfalls manuelle Korrektur.</p><p>c) Zeitreihen-Kreuzvalidierung nur auf den Trainingsjahren; der letzte Zeitraum bleibt als echter Test unberührt.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Das neue Modell senkt den mittleren Fehler von 4,0 MW auf 3,25 MW pro Stunde. Jede MWh Abweichung kostet 60 €. Ein Jahr hat 8.760 Stunden. Das Projekt kostet einmalig 150.000 € und laufend 3.000 € pro Monat.</p>",
        teile: [
          z("a", "a) Ersparnis pro Stunde", 3, 45, 0.01, "€"),
          z("b", "b) Ersparnis pro Jahr", 4, 394200, 1, "€"),
          z("c", "c) Nettonutzen im ersten Jahr (nach Einmal- und laufenden Kosten)", 4, 208200, 1, "€"),
          t("d", "d) Welche Annahme dieser Rechnung ist vereinfacht?", 3, "Z. B. Kosten je MWh nicht konstant (Preise schwanken stark), Fehler über- und unterhalb kosten unterschiedlich, MAE-Verbesserung im Test gilt nicht automatisch im Betrieb (3 P.)."),
          z("e", "e) Amortisationszeit in Monaten (zwei Nachkommastellen)", 2, 5.03, 0.05, "Monate")
        ],
        loesung: "<p>a) 0,75 MWh · 60 € = <b>45 €</b> · b) 45 · 8.760 = <b>394.200 €</b> · c) 394.200 − 36.000 − 150.000 = <b>208.200 €</b>.</p><p>d) Die Kosten der Ausgleichsenergie schwanken stark; Über- und Unterdeckung kosten unterschiedlich; die Testverbesserung muss sich im Betrieb erst bestätigen.</p><p>e) Monatlicher Nettonutzen: (394.200 − 36.000) / 12 = 29.850 €; 150.000 / 29.850 ≈ <b>5,03 Monate</b>.</p>" },

      { titel: "Betrieb und Recht", text: "",
        teile: [
          t("a", "a) Beschreiben Sie einen täglichen automatisierten Ablauf bis zum Einkauf um 12 Uhr, inklusive Absicherung.", 6, "Daten abrufen (Last, Wettervorhersage) und prüfen (2 P.); Merkmale bilden, Prognose rechnen, Plausibilitätsprüfung gegen Baseline/Grenzen (2 P.); Fallback auf Baseline bei Fehlern, Alarm, Freigabe durch Disponenten, Protokollierung/Monitoring (2 P.)."),
          w("b", "b) Ist die Lastprognose für den Stromeinkauf nach AI Act ein Hochrisiko-System?", 3, ["Voraussichtlich nein – Hochrisiko wäre sie als Sicherheitsbauteil für den Betrieb kritischer Infrastruktur, nicht für den Einkauf", "Ja, alles im Energiesektor ist Hochrisiko", "Sie ist verboten", "Ja, weil Wetterdaten verwendet werden"], 0),
          t("c", "c) Die Stadtwerke wollen künftig Smart-Meter-Daten einzelner Haushalte nutzen. Was ist zu beachten?", 5, "Personenbezogen, lassen Rückschlüsse auf Lebensgewohnheiten zu (2 P.); Rechtsgrundlage/Messstellenbetriebsgesetz, Zweckbindung, Transparenz (1 P.); Aggregation/Pseudonymisierung, nur nötige Auflösung, Löschfristen (2 P.)."),
          t("d", "d) Wie schützen Sie die Prognose gegen fehlerhafte oder manipulierte Wetterdaten?", 4, "Plausibilitätsgrenzen und Abgleich mehrerer Quellen (2 P.); gesicherte Schnittstelle/Authentifizierung, Monitoring von Ausreißern, Fallback (2 P.).")
        ],
        loesung: "<p>a) 9 Uhr Daten laden und prüfen → Merkmale bilden → Prognose → Plausibilitätsprüfung (Vergleich mit Baseline, Grenzen) → Freigabe durch Disposition bis 11:30 → Einkauf. Bei Fehlern automatisch Baseline nutzen und Alarm auslösen; alles protokollieren.</p><p>b) Voraussichtlich nein. Hochrisiko nach Anhang III Nr. 2 betrifft KI als Sicherheitsbauteil für den Betrieb kritischer Infrastruktur.</p><p>c) Smart-Meter-Daten verraten Tagesabläufe und sind personenbezogen. Nur auf gesetzlicher Grundlage und zweckgebunden nutzen, möglichst aggregiert oder pseudonymisiert, mit Löschfristen.</p><p>d) Mehrere Wetterquellen vergleichen, Plausibilitätsgrenzen, gesicherte Schnittstellen, Ausreißer-Monitoring und Fallback.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
