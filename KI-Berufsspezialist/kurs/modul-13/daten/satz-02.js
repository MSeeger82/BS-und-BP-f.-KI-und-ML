/* Prüfungssatz 2 */
(function (z, w, t) {
  var TYP = ["Klassifikation", "Regression", "Clustering", "Dimensionsreduktion"];
  window.PRUEFUNGEN.push({
    id: "s02t1", satz: 2, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Symbolische und lernende KI", text: "<p>Ein Versicherer prüft Schadensmeldungen bisher mit einem Regelwerk aus 400 Wenn-dann-Regeln. Nun soll ein lernendes System ergänzt werden.</p>",
        teile: [
          t("a", "a) Grenzen Sie symbolische (regelbasierte) KI und subsymbolische (lernende) KI voneinander ab.", 4, "Symbolisch: Wissen explizit als Regeln/Logik von Menschen formuliert, nachvollziehbar (2 P.). Subsymbolisch: lernt Muster aus Daten, Wissen steckt in Parametern, schwerer erklärbar (2 P.)."),
          t("b", "b) Nennen Sie je einen Vorteil beider Ansätze für den Versicherer.", 4, "Regelbasiert: transparent, prüfbar, rechtssicher, ohne Trainingsdaten (2 P.). Lernend: erkennt neue/komplexe Muster, passt sich an, weniger Pflegeaufwand für Regeln (2 P.)."),
          w("c", "c) Was prüft der Turing-Test?", 2, ["Ob ein Mensch im Textdialog Maschine und Mensch nicht unterscheiden kann", "Wie schnell ein Rechner rechnet", "Ob ein Modell überfittet", "Ob Daten personenbezogen sind"], 0)
        ],
        loesung: "<p>a) Symbolische KI arbeitet mit von Menschen formulierten Regeln und Logik – nachvollziehbar, aber starr. Subsymbolische KI (maschinelles Lernen, neuronale Netze) lernt Muster aus Beispielen; das Wissen steckt in Gewichten und ist schwerer erklärbar.</p><p>b) Regeln: transparent und prüfbar, brauchen keine Trainingsdaten. Lernendes System: erkennt auch neue, komplexe Betrugsmuster und passt sich mit neuen Daten an.</p><p>c) Ob ein menschlicher Fragesteller im schriftlichen Dialog nicht sicher erkennt, ob er mit Maschine oder Mensch spricht.</p>" },

      { titel: "Aufgabentypen", text: "<p>Ordnen Sie den passenden Aufgabentyp zu.</p>",
        teile: [
          w("a", "1) Vorhersage des Stromverbrauchs morgen in kWh", 2, TYP, 1),
          w("b", "2) Erkennen, ob ein Foto einen Riss im Bauteil zeigt", 2, TYP, 0),
          w("c", "3) 300 Sensormerkmale auf 10 aussagekräftige Komponenten verdichten", 2, TYP, 3),
          w("d", "4) Kunden ohne Vorgaben in ähnliche Gruppen einteilen", 2, TYP, 2),
          w("e", "5) Einordnen von Support-Tickets in die Kategorien Rechnung, Technik oder Versand", 2, TYP, 0)
        ],
        loesung: "<p>1) Regression (Zahlenwert) · 2) Klassifikation (Riss ja/nein) · 3) Dimensionsreduktion (z. B. PCA) · 4) Clustering · 5) Klassifikation (mehrere Klassen).</p>" },

      { titel: "Streuung", text: "<p>Bearbeitungszeiten von fünf Anträgen in Minuten: <b>4, 6, 8, 10, 12</b>. Verwenden Sie die Stichprobenformel (Division durch n − 1).</p>",
        teile: [
          z("a", "a) Mittelwert", 2, 8, 0.01, "min"),
          z("b", "b) Varianz (Stichprobe)", 3, 10, 0.01, "min²"),
          z("c", "c) Standardabweichung (zwei Nachkommastellen)", 3, 3.16, 0.01, "min"),
          w("d", "d) Zwischen Werbeausgaben und Umsatz besteht ein Korrelationskoeffizient von r = 0,85. Was folgt daraus?", 2, ["Ein starker positiver Zusammenhang – aber nicht zwingend Ursache und Wirkung", "Werbung verursacht sicher 85 % des Umsatzes", "Ein schwacher negativer Zusammenhang", "Kein Zusammenhang"], 0)
        ],
        loesung: "<p>a) 40 / 5 = <b>8</b> · b) Abweichungsquadrate 16 + 4 + 0 + 4 + 16 = 40; 40 / 4 = <b>10</b> · c) √10 ≈ <b>3,16</b> Minuten.</p><p>d) Starker positiver linearer Zusammenhang. Korrelation ist keine Kausalität – beide Größen könnten z. B. von der Saison abhängen.</p>" },

      { titel: "Vorverarbeitung", text: "<p>Ein Merkmal „Alter“ liegt zwischen 40 und 100 Jahren, Mittelwert 70, Standardabweichung 10.</p>",
        teile: [
          z("a", "a) Min-Max-Normierung des Werts 70 auf [0; 1]", 2, 0.5, 0.001),
          z("b", "b) Standardisierung (z-Wert) des Werts 85", 2, 1.5, 0.001),
          w("c", "c) Wie kodiert man das Merkmal „Farbe“ (rot, grün, blau) für die meisten ML-Verfahren?", 2, ["One-Hot-Kodierung: eine 0/1-Spalte je Farbe", "rot = 1, grün = 2, blau = 3 als Zahl", "Farbe einfach weglassen", "Als Text unverändert lassen"], 0),
          t("d", "d) In 8 % der Datensätze fehlt das Einkommen. Nennen Sie zwei Möglichkeiten, damit umzugehen, mit je einem Nachteil.", 4, "Je 2 P. (Möglichkeit + Nachteil): Zeilen löschen (Datenverlust, Verzerrung); Mittelwert/Median ergänzen (Streuung sinkt, Zusammenhänge verwischen); Modellbasierte Imputation (aufwendig); Fehlend-Indikator plus Ersatzwert (mehr Merkmale).")
        ],
        loesung: "<p>a) (70 − 40) / (100 − 40) = <b>0,5</b> · b) (85 − 70) / 10 = <b>1,5</b> · c) One-Hot-Kodierung, weil eine Zahlenfolge eine falsche Rangfolge vortäuschen würde.</p><p>d) z. B. Datensätze löschen – Nachteil: Datenverlust und mögliche Verzerrung; Median einsetzen – Nachteil: künstlich geringere Streuung; mit einem Modell schätzen – Nachteil: Aufwand, Fehler pflanzen sich fort.</p>" },

      { titel: "SQL mit Gruppierung", text: "<p>Tabelle <code>bestellungen(bestell_id, kunden_id, datum, betrag)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die für jeden Kunden mit mehr als 5 Bestellungen die Kunden-ID, die Anzahl der Bestellungen und den durchschnittlichen Betrag ausgibt.", 6, "SELECT kunden_id, COUNT(*), AVG(betrag) (2 P.) FROM bestellungen GROUP BY kunden_id (2 P.) HAVING COUNT(*) > 5 (2 P.). Bedingung in WHERE statt HAVING: 0 P. für diesen Teil."),
          w("b", "b) Worin unterscheiden sich WHERE und HAVING?", 2, ["WHERE filtert Zeilen vor der Gruppierung, HAVING filtert Gruppen danach", "Es gibt keinen Unterschied", "HAVING filtert vor der Gruppierung", "WHERE funktioniert nur mit Zahlen"], 0),
          w("c", "c) Was ist ein Primärschlüssel?", 2, ["Ein Attribut, das jeden Datensatz eindeutig identifiziert", "Der wichtigste Wert einer Tabelle", "Ein Passwort für die Datenbank", "Eine Spalte mit Text"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT kunden_id, COUNT(*) AS anzahl, AVG(betrag) AS durchschnitt\nFROM bestellungen\nGROUP BY kunden_id\nHAVING COUNT(*) &gt; 5;</pre><p>b) WHERE filtert einzelne Zeilen vor dem Gruppieren, HAVING filtert die gebildeten Gruppen. c) Eindeutige Kennung je Datensatz.</p>" },

      { titel: "Fehlermaße der Regression", text: "<p>Tatsächliche Werte y = (10; 12; 8; 14), Vorhersagen ŷ = (11; 10; 8; 17).</p>",
        teile: [
          z("a", "a) MAE", 3, 1.5, 0.01),
          z("b", "b) MSE", 3, 3.5, 0.01),
          z("c", "c) RMSE (zwei Nachkommastellen)", 2, 1.87, 0.01),
          w("d", "d) Ein Modell hat R² = 0,92. Was bedeutet das?", 2, ["Es erklärt rund 92 % der Streuung der Zielgröße", "92 % der Vorhersagen sind exakt richtig", "Der Fehler beträgt 0,92", "Das Modell ist überangepasst"], 0)
        ],
        loesung: "<p>Fehler: 1; −2; 0; 3. a) (1 + 2 + 0 + 3) / 4 = <b>1,5</b> · b) (1 + 4 + 0 + 9) / 4 = <b>3,5</b> · c) √3,5 ≈ <b>1,87</b> · d) Das Modell erklärt etwa 92 % der Varianz der Zielgröße.</p>" },

      { titel: "Entscheidungsbäume", text: "<p>Ein Knoten enthält 6 Kunden, die gekündigt haben, und 4, die geblieben sind.</p>",
        teile: [
          z("a", "a) Gini-Unreinheit des Knotens", 3, 0.48, 0.005),
          z("b", "b) Gini-Unreinheit eines Knotens, in dem alle 10 Kunden gekündigt haben", 1, 0, 0.001),
          w("c", "c) Was ist ein Random Forest?", 2, ["Viele Entscheidungsbäume auf Zufallsstichproben, deren Ergebnisse zusammengefasst werden", "Ein einzelner sehr tiefer Baum", "Ein neuronales Netz", "Ein Clustering-Verfahren"], 0),
          t("d", "d) Nennen Sie einen Vorteil und einen Nachteil eines einzelnen Entscheidungsbaums.", 4, "Vorteil (2 P.): leicht verständlich/erklärbar, keine Skalierung nötig, kategoriale Daten. Nachteil (2 P.): neigt zu Overfitting, instabil bei kleinen Datenänderungen.")
        ],
        loesung: "<p>a) 1 − (0,6² + 0,4²) = 1 − 0,52 = <b>0,48</b> · b) <b>0</b> (rein) · c) Ensemble vieler Bäume (Bagging + zufällige Merkmalsauswahl), Mehrheitsentscheid bzw. Mittelwert.</p><p>d) Vorteil: als Regelwerk lesbar und erklärbar. Nachteil: Ein tiefer Baum überfittet leicht und reagiert empfindlich auf kleine Datenänderungen.</p>" },

      { titel: "Python", text: "<pre class=\"code\">a = [x ** 2 for x in range(1, 5) if x % 2 == 1]\nprint(a)\n\nd = {\"rot\": 3, \"blau\": 5}\nd[\"rot\"] += 2\nprint(sum(d.values()))</pre>",
        teile: [
          w("a", "a) Ausgabe der ersten print-Anweisung", 3, ["[1, 9]", "[1, 4, 9, 16]", "[1, 3]", "[4, 16]"], 0),
          z("b", "b) Ausgabe der zweiten print-Anweisung", 3, 10, 0.001),
          t("c", "c) Was liefert in pandas der Ausdruck df.isna().sum() und wofür nutzen Sie ihn?", 4, "Anzahl fehlender Werte je Spalte (2 P.); zur Prüfung der Datenqualität/Vollständigkeit vor der Vorverarbeitung (2 P.).")
        ],
        loesung: "<p>a) range(1, 5) = 1, 2, 3, 4; ungerade sind 1 und 3; Quadrate: <b>[1, 9]</b> · b) rot wird 5, 5 + 5 = <b>10</b>.</p><p>c) Die Zahl fehlender Werte in jeder Spalte – ein schneller Check der Vollständigkeit vor dem Training.</p>" },

      { titel: "Neuronale Netze", text: "<p>Ein vollständig verbundenes Netz hat 4 Eingaben, eine verdeckte Schicht mit 5 Neuronen und 2 Ausgabeneuronen. Jedes Neuron der verdeckten und der Ausgabeschicht hat einen Bias.</p>",
        teile: [
          z("a", "a) Anzahl der Gewichte (ohne Bias)", 2, 30, 0.001),
          z("b", "b) Anzahl aller trainierbaren Parameter (mit Bias)", 2, 37, 0.001),
          w("c", "c) Wozu dient Backpropagation?", 2, ["Den Fehler rückwärts durchs Netz zu verteilen, um die Gradienten für die Gewichtsanpassung zu berechnen", "Daten zu bereinigen", "Die Eingaben zu normieren", "Neue Neuronen hinzuzufügen"], 0),
          t("d", "d) Was passiert, wenn die Lernrate zu groß oder zu klein gewählt ist?", 4, "Zu groß: Training springt über das Minimum, schwankt oder divergiert (2 P.). Zu klein: sehr langsames Training, bleibt evtl. in schlechtem Bereich stecken (2 P.).")
        ],
        loesung: "<p>a) 4 · 5 + 5 · 2 = <b>30</b> · b) 30 + 5 + 2 = <b>37</b> · c) Backpropagation berechnet mit der Kettenregel, wie stark jedes Gewicht zum Fehler beiträgt; danach passt das Gradientenverfahren die Gewichte an.</p><p>d) Zu groß: Der Fehler springt hin und her oder wächst. Zu klein: Das Training dauert sehr lange.</p>" },

      { titel: "Datenschutz und AI Act", text: "",
        teile: [
          t("a", "a) Nennen Sie zwei Grundsätze der Datenverarbeitung nach Art. 5 DSGVO und erläutern Sie sie kurz für ein KI-Projekt.", 4, "Je 2 P.: Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit, Rechtmäßigkeit/Transparenz, Rechenschaftspflicht – jeweils mit KI-Bezug."),
          w("b", "b) Welche Aussage trifft auf anonymisierte Daten zu?", 2, ["Ein Personenbezug ist nicht mehr herstellbar; die DSGVO gilt nicht mehr", "Sie sind pseudonymisiert", "Sie dürfen nicht für KI genutzt werden", "Sie enthalten den Namen in verschlüsselter Form"], 0),
          w("c", "c) Welche Praxis ist nach AI Act verboten?", 2, ["Social Scoring, das zu ungerechtfertigter Benachteiligung von Personen führt", "Ein Spamfilter", "Eine Absatzprognose", "Ein Chatbot im Kundenservice"], 0),
          w("d", "d) Welche Pflicht gilt für einen Chatbot im Kundenservice?", 2, ["Nutzer müssen erkennen können, dass sie mit einer KI interagieren", "Er muss vom TÜV zertifiziert werden", "Er ist verboten", "Keine Pflichten"], 0)
        ],
        loesung: "<p>a) z. B. Zweckbindung: Kundendaten aus dem Vertrag nicht ohne Weiteres für ein neues Modell nutzen. Datenminimierung: nur die Merkmale verwenden, die für die Vorhersage nötig sind.</p><p>b) Bei echter Anonymisierung gilt die DSGVO nicht mehr. c) Social Scoring. d) Transparenzpflicht (Art. 50 AI Act): Die Person muss wissen, dass sie mit einer KI spricht.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s02t2", satz: 2, teil: 2, titel: "Vertiefungen: Ankunftszeiten in der Logistik", kurz: "Logistik · Regression", minuten: 120,
    situation: "<p>Die <b>HanseLog GmbH</b> betreibt 60 Lkw und beliefert täglich rund 400 Geschäftskunden. Kunden beschweren sich über ungenaue Lieferfenster: Die bisherige Navi-Schätzung liegt im Schnitt 7,5 Minuten daneben (MAE).</p><p>Vorhanden sind: GPS-Telematik der letzten zwei Jahre (Position, Geschwindigkeit, Zeitstempel), Auftragsdaten (Kunde, Gewicht, Anzahl Pakete), Wetterdaten und eine Verkehrsdaten-Schnittstelle. Sie sollen ein Modell entwickeln, das die Fahrzeit bis zum nächsten Stopp in Minuten vorhersagt.</p>",
    aufgaben: [
      { titel: "Problemdefinition", text: "",
        teile: [
          t("a", "a) Beschreiben Sie die ML-Aufgabe: Lernparadigma, Aufgabentyp, Zielgröße und Vorhersagezeitpunkt.", 6, "Überwacht (1,5 P.), Regression (1,5 P.), Zielgröße Fahrzeit in Minuten bis zum nächsten Stopp (1,5 P.), Vorhersage bei Abfahrt vom vorigen Stopp bzw. laufend (1,5 P.)."),
          t("b", "b) Was ist eine Baseline, und welche Baseline bietet sich hier an?", 3, "Einfaches Vergleichsmodell, das das ML-Modell schlagen muss (1,5 P.); hier die bisherige Navi-Schätzung oder Durchschnittsfahrzeit je Strecke/Uhrzeit (1,5 P.)."),
          w("c", "c) Die Disposition möchte zusätzlich wissen, ob ein Stopp „pünktlich“ oder „verspätet“ sein wird. Welcher Aufgabentyp ist das?", 3, ["Binäre Klassifikation", "Regression", "Clustering", "Bestärkendes Lernen"], 0)
        ],
        loesung: "<p>a) Überwachtes Lernen, Regression. Zielgröße: Fahrzeit in Minuten vom aktuellen Standort bzw. vorigen Stopp bis zum nächsten Stopp, vorhergesagt bei Abfahrt und laufend aktualisiert.</p><p>b) Eine einfache Referenz, an der der Mehrwert gemessen wird – hier die Navi-Schätzung (MAE 7,5 min) oder die mittlere Fahrzeit je Strecke und Tageszeit.</p><p>c) Binäre Klassifikation.</p>" },

      { titel: "Daten und Merkmale", text: "",
        teile: [
          t("a", "a) Welche Merkmale leiten Sie aus dem Zeitstempel und den Zusatzdaten ab? Nennen Sie drei und begründen Sie kurz.", 6, "Je 2 P.: Stunde/Tageszeit (Berufsverkehr), Wochentag, Feiertag/Ferien, Wetter (Regen, Schnee), aktuelle Verkehrslage, Strecke/Entfernung, Anzahl Pakete (Entladezeit)."),
          t("b", "b) Die GPS-Daten enthalten Sprünge von mehreren Kilometern innerhalb einer Sekunde und Fahrten mit 0 km. Wie gehen Sie vor?", 4, "Als Messfehler erkennen (Plausibilitätsregeln: maximale Geschwindigkeit) (2 P.); entfernen, glätten oder interpolieren, dokumentieren (2 P.)."),
          z("c", "c) Eine Strecke ist 42 km lang; im Datensatz beträgt der Mittelwert 30 km, die Standardabweichung 8 km. Standardisierter Wert?", 4, 1.5, 0.001),
          t("d", "d) Wie teilen Sie die Daten in Training und Test auf? Begründen Sie.", 4, "Zeitlich: z. B. erste 20 Monate Training, letzte 4 Monate Test (2 P.), da zufällige Aufteilung Zukunftsinformation (gleiche Tage/Staus) ins Training bringt und die Güte überschätzt (2 P.).")
        ],
        loesung: "<p>a) z. B. Stunde (Berufsverkehr), Wochentag (Montagsverkehr), Feiertag/Schulferien, Niederschlag, aktuelle Verkehrsdichte, Entfernung, Anzahl Pakete (Entladezeit am vorigen Stopp).</p><p>b) Sprünge und 0-km-Fahrten sind Messfehler. Mit Plausibilitätsregeln (z. B. Geschwindigkeit &gt; 130 km/h unmöglich) erkennen, entfernen oder interpolieren und das Vorgehen dokumentieren.</p><p>c) (42 − 30) / 8 = <b>1,5</b>.</p><p>d) Zeitliche Aufteilung – das Modell soll die Zukunft vorhersagen. Bei zufälliger Aufteilung lägen Fahrten desselben Staus in Training und Test.</p>" },

      { titel: "Bewertung", text: "<p>Für fünf Stopps liegen tatsächliche und vorhergesagte Fahrzeiten vor (Minuten):</p><div class=\"table-wrap\"><table><thead><tr><th>Stopp</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th>tatsächlich</th><td>30</td><td>45</td><td>20</td><td>60</td><td>35</td></tr><tr><th>vorhergesagt</th><td>34</td><td>40</td><td>22</td><td>52</td><td>37</td></tr></tbody></table></div>",
        teile: [
          z("a", "a) MAE", 4, 4.2, 0.01, "min"),
          z("b", "b) MSE", 3, 22.6, 0.01, "min²"),
          z("c", "c) RMSE (zwei Nachkommastellen)", 3, 4.75, 0.01, "min"),
          t("d", "d) Warum ist der RMSE größer als der MAE, und was sagt das aus?", 4, "RMSE quadriert die Fehler und gewichtet große Fehler stärker (2 P.); der Abstand zeigt einzelne größere Ausreißer, hier Stopp 4 mit 8 min (2 P.)."),
          z("e", "e) Um wie viel Prozent sinkt der MAE gegenüber der Navi-Schätzung (7,5 min)?", 4, 44, 0.2, "%"),
          t("f", "f) Schlagen Sie ein Verfahren für das finale Modell vor und begründen Sie.", 4, "Z. B. Gradient Boosting/Random Forest Regressor (1 P.): Tabellendaten, nichtlineare Effekte (Berufsverkehr), robust, Feature Importance (3 P.)."),
          w("g", "g) Welche Aussage über R² ist richtig?", 2, ["R² = 1 bedeutet perfekte Vorhersage, R² = 0 nicht besser als der Mittelwert", "R² wird in Minuten gemessen", "R² ist immer negativ", "R² misst nur die Rechenzeit"], 0)
        ],
        loesung: "<p>Fehler: 4; −5; 2; −8; 2.</p><p>a) (4 + 5 + 2 + 8 + 2) / 5 = <b>4,2</b> min · b) (16 + 25 + 4 + 64 + 4) / 5 = <b>22,6</b> · c) √22,6 ≈ <b>4,75</b> min.</p><p>d) Durch das Quadrieren wiegen große Fehler stärker; der größere RMSE zeigt einen Ausreißer (Stopp 4: 8 Minuten).</p><p>e) (7,5 − 4,2) / 7,5 = <b>44 %</b> besser.</p><p>f) z. B. Gradient Boosting: sehr gut für Tabellendaten, bildet nichtlineare Effekte wie Berufsverkehr ab, zeigt die wichtigsten Einflussgrößen.</p><p>g) R² = 1 perfekt, R² = 0 nicht besser als der Mittelwert.</p>" },

      { titel: "Python", text: "<pre class=\"code\">df[\"stunde\"] = df[\"abfahrt\"].dt.hour\nmittel = df.groupby(\"stunde\")[\"fahrzeit\"].mean()\nprint(mittel.idxmax())</pre>",
        teile: [
          t("a", "a) Erklären Sie, was der Code Zeile für Zeile macht.", 4, "Zeile 1: Stunde aus dem Abfahrtszeitpunkt als neue Spalte (1,5 P.). Zeile 2: mittlere Fahrzeit je Stunde (1,5 P.). Zeile 3: gibt die Stunde mit der höchsten mittleren Fahrzeit aus (1 P.)."),
          w("b", "b) Was gibt idxmax() hier zurück?", 2, ["Die Stunde mit der höchsten mittleren Fahrzeit", "Die höchste Fahrzeit in Minuten", "Die Anzahl der Fahrten", "Den Index der ersten Zeile"], 0),
          t("c", "c) Schreiben Sie Python-Code (scikit-learn), der ein Modell RandomForestRegressor mit X_train, y_train trainiert, für X_test vorhersagt und den MAE ausgibt.", 6, "Import RandomForestRegressor und mean_absolute_error (1 P.); modell = RandomForestRegressor() (1 P.); modell.fit(X_train, y_train) (1,5 P.); pred = modell.predict(X_test) (1,5 P.); print(mean_absolute_error(y_test, pred)) (1 P.)."),
          w("d", "d) Warum verwenden Sie bei train_test_split hier shuffle=False?", 2, ["Damit die zeitliche Reihenfolge erhalten bleibt und der Test in der Zukunft liegt", "Damit das Training schneller ist", "Weil Zufall in Python verboten ist", "Damit mehr Daten im Test landen"], 0)
        ],
        loesung: "<p>a) Spalte „stunde“ aus dem Abfahrtszeitpunkt bilden; mittlere Fahrzeit je Stunde berechnen; die Stunde mit dem höchsten Mittelwert ausgeben. b) Die Stunde (den Index) mit der höchsten mittleren Fahrzeit.</p><pre class=\"code\">from sklearn.ensemble import RandomForestRegressor\nfrom sklearn.metrics import mean_absolute_error\n\nmodell = RandomForestRegressor(random_state=42)\nmodell.fit(X_train, y_train)\npred = modell.predict(X_test)\nprint(mean_absolute_error(y_test, pred))</pre><p>d) Damit der Testzeitraum nach dem Trainingszeitraum liegt.</p>" },

      { titel: "Betrieb", text: "",
        teile: [
          t("a", "a) Die Vorhersage soll in der Fahrer-App und im Kundenportal laufend aktualisiert erscheinen. Welche Deployment-Form wählen Sie, und worauf achten Sie?", 4, "Online-/Echtzeit-Inferenz über API/Microservice (2 P.); geringe Latenz, Skalierung, Ausfallsicherheit/Fallback auf Navi-Schätzung (2 P.)."),
          t("b", "b) Nennen Sie drei Größen, die Sie im Betrieb überwachen.", 6, "Je 2 P.: MAE laufend mit echten Ankunftszeiten, Verteilung der Eingangsdaten (Drift), Latenz/Verfügbarkeit der API, Anteil fehlender Verkehrsdaten, Fehler nach Region/Tageszeit."),
          t("c", "c) Wegen einer Großbaustelle auf der A1 steigen die Fehler für Touren im Süden deutlich. Wie reagieren Sie kurzfristig und langfristig?", 6, "Kurzfristig (3 P.): Abweichung erkennen/Alarm, Verkehrsdaten stärker gewichten oder Regel/Korrektur, Kunden größeres Zeitfenster, ggf. Fallback. Langfristig (3 P.): Concept Drift – neue Daten sammeln, regelmäßig nachtrainieren, Merkmal Baustelle/Verkehr ergänzen, Modell versioniert ausrollen.")
        ],
        loesung: "<p>a) Echtzeit-Inferenz über eine API. Wichtig: kurze Antwortzeiten, Skalierung bei 400 Stopps, Fallback auf die Navi-Schätzung bei Ausfall.</p><p>b) z. B. MAE mit den echten Ankunftszeiten, Verteilung der Eingangsdaten, Latenz und Verfügbarkeit der API, Fehler je Region und Uhrzeit.</p><p>c) Kurzfristig: Alarm aus dem Monitoring, Lieferfenster im Süden vergrößern, Echtzeit-Verkehrsdaten stärker berücksichtigen. Langfristig: Concept Drift – mit aktuellen Daten nachtrainieren, Verkehrsmerkmale verbessern, neues Modell erst im Schattenbetrieb prüfen.</p>" },

      { titel: "Recht", text: "",
        teile: [
          t("a", "a) Sind die GPS-Daten personenbezogen? Worauf stützt sich die Verarbeitung, und was ist zu beachten?", 6, "Ja, über Fahrzeug/Schicht auf Fahrer beziehbar (2 P.). Beschäftigtendatenschutz: Art. 6/88 DSGVO, § 26 BDSG bzw. Erforderlichkeit für Tourenplanung (2 P.). Zweckbindung, Datenminimierung, Pseudonymisierung, Information der Fahrer (2 P.)."),
          t("b", "b) Muss der Betriebsrat beteiligt werden? Begründen Sie.", 4, "Ja (1 P.): § 87 Abs. 1 Nr. 6 BetrVG – technische Einrichtung, die geeignet ist, Verhalten oder Leistung zu überwachen; Eignung genügt (3 P.)."),
          t("c", "c) Die Geschäftsführung möchte das Modell zusätzlich nutzen, um eine Rangliste der „langsamsten Fahrer“ zu erstellen. Nehmen Sie Stellung.", 4, "Zweckänderung, neue Rechtsgrundlage nötig (1 P.); Leistungsbewertung von Beschäftigten = Hochrisiko nach AI Act Anhang III (1 P.); Mitbestimmung (1 P.); fachlich unfair, da Verkehr/Baustellen nicht vom Fahrer abhängen – abraten (1 P.)."),
          w("d", "d) Risikoklasse des Fahrzeit-Prognosesystems nach AI Act (ohne Fahrerbewertung)?", 2, ["minimales Risiko", "Hochrisiko", "verboten", "begrenztes Risiko wegen Chatbot"], 0)
        ],
        loesung: "<p>a) Ja – über Fahrzeug und Dienstplan lassen sich die Daten Fahrern zuordnen. Rechtsgrundlage im Beschäftigtenkontext (Erforderlichkeit für die Tourenplanung, ggf. Betriebsvereinbarung); Zweckbindung, Datenminimierung, Pseudonymisierung und Information der Fahrer.</p><p>b) Ja, § 87 Abs. 1 Nr. 6 BetrVG: Das System ist objektiv geeignet, Leistung zu überwachen.</p><p>c) Neuer Zweck mit eigener Rechtsgrundlage, Hochrisiko-Anwendung (Leistungsbewertung), mitbestimmungspflichtig und fachlich fragwürdig, weil die Fahrzeit vor allem vom Verkehr abhängt. Empfehlung: nicht umsetzen.</p><p>d) Minimales Risiko.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
