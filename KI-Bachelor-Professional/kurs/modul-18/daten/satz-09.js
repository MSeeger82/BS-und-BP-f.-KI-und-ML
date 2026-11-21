/* Bachelor-Prüfungssatz 9 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s09a", satz: 9, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Prognose und Steuerung", text: "",
        teile: [
          w("a", "a) Die stündliche Stromlast für morgen vorherzusagen ist …", 2, ["eine Regression bzw. Zeitreihenprognose", "eine Klassifikation", "ein Clustering", "eine Bilderkennung"], 0),
          t("b", "b) Unterscheiden Sie Prognose und Optimierung an einem Beispiel aus der Energiewirtschaft.", 4, "Prognose schätzt eine künftige Größe, z. B. Last morgen (2 P.); Optimierung wählt die beste Entscheidung unter Nebenbedingungen, z. B. Einsatzplan für Speicher und Einkauf (2 P.)."),
          w("c", "c) Welches Lernparadigma passt zur Steuerung eines Batteriespeichers über Belohnungen?", 2, ["bestärkendes Lernen", "unüberwachtes Lernen", "Clustering", "Assoziationsregeln"], 0),
          w("d", "d) Die Außentemperatur ist in einem Lastmodell …", 2, ["ein Merkmal (Eingangsgröße)", "die Zielgröße", "ein Hyperparameter", "ein Cluster"], 0)
        ],
        loesung: "<p>a) Regression/Zeitreihe · b) Prognose = schätzen, Optimierung = entscheiden · c) bestärkendes Lernen · d) Merkmal.</p>" },

      { titel: "Lastdaten beschreiben", text: "<p>Stündliche Last in MW: <b>40, 42, 45, 50, 48, 45</b>.</p>",
        teile: [
          z("a", "a) Mittelwert", 2, 45, 0.001, "MW"),
          z("b", "b) Median", 2, 45, 0.001, "MW"),
          z("c", "c) Varianz (Division durch n, drei Nachkommastellen)", 3, 11.333, 0.01, "MW²"),
          w("d", "d) Im Winter steigt die Last, wenn die Temperatur sinkt. Die Korrelation ist …", 2, ["negativ", "positiv", "null", "nicht berechenbar"], 0),
          t("e", "e) Welche Saisonmuster erwarten Sie in Stromlastdaten?", 3, "Tagesgang (1 P.), Wochenmuster Werktag/Wochenende (1 P.), Jahresgang/Feiertage (1 P.).")
        ],
        loesung: "<p>a) 270 / 6 = <b>45</b> · b) (45 + 45) / 2 = <b>45</b> · c) (25 + 9 + 0 + 25 + 9 + 0) / 6 ≈ <b>11,333</b> · d) negativ · e) Tag, Woche, Jahr.</p>" },

      { titel: "Temperaturabhängigkeit", text: "<p>Ein Modell schätzt die Tagesspitzenlast: ŷ = 80 − 1,5 · Temperatur (°C), R² = 0,64.</p>",
        teile: [
          z("a", "a) Prognose bei 10 °C", 2, 65, 0.001, "MW"),
          z("b", "b) Prognose bei −4 °C", 2, 86, 0.001, "MW"),
          t("c", "c) Interpretieren Sie die Steigung.", 2, "Je Grad wärmer sinkt die erwartete Spitzenlast um 1,5 MW (2 P.)."),
          z("d", "d) Korrelationskoeffizient r (mit Vorzeichen)", 3, -0.8, 0.001),
          w("e", "e) Welches Problem prüfen Sie bei Zeitreihenresiduen besonders?", 3, ["Autokorrelation der Residuen", "Klassenungleichgewicht", "Multiklassenfehler", "fehlende Labels"], 0)
        ],
        loesung: "<p>a) 80 − 15 = <b>65</b> · b) 80 + 6 = <b>86</b> · c) −1,5 MW je Grad · d) √0,64 = 0,8, Steigung negativ → <b>−0,8</b> · e) Autokorrelation.</p>" },

      { titel: "Prognosefehler", text: "<p>Ist: 100, 110, 90 · Prognose: 95, 115, 99 (MW).</p>",
        teile: [
          z("a", "a) MAE (zwei Nachkommastellen)", 3, 6.33, 0.01),
          z("b", "b) MAPE in % (zwei Nachkommastellen)", 3, 6.52, 0.03, "%"),
          z("c", "c) Mittlerer Fehler (Prognose − Ist)", 2, 3, 0.001),
          w("d", "d) Was zeigt c)?", 2, ["die Prognose liegt im Mittel zu hoch", "die Prognose liegt zu niedrig", "keine Verzerrung", "einen Rechenfehler"], 0)
        ],
        loesung: "<p>Fehler −5, +5, +9. a) 19 / 3 ≈ <b>6,33</b> · b) (5 % + 4,55 % + 10 %) / 3 ≈ <b>6,52 %</b> · c) 9 / 3 = <b>3</b> · d) Überschätzung.</p>" },

      { titel: "Zeitreihen aufbereiten", text: "",
        teile: [
          t("a", "a) Zwei Stunden Messwerte fehlen. Wie gehen Sie vor?", 4, "Lücke kennzeichnen (1 P.); kurze Lücken interpolieren oder mit Vorwochenwert gleicher Stunde füllen (2 P.); lange Lücken nicht künstlich füllen/aus Training ausschließen (1 P.)."),
          w("b", "b) Welches Problem verursacht die Zeitumstellung?", 2, ["doppelte bzw. fehlende Stunden; Zeitstempel einheitlich in UTC führen", "keines", "höhere Last", "falsche Temperaturen"], 0),
          w("c", "c) Was bedeutet Resampling?", 2, ["Daten auf ein anderes Zeitraster bringen, z. B. Viertelstunden zu Stunden", "Daten mischen", "Daten löschen", "Daten verschlüsseln"], 0),
          w("d", "d) Ein Zähler meldet für eine Stunde den hundertfachen Wert. Das ist wahrscheinlich …", 2, ["ein Messfehler (Ausreißer), zu prüfen und zu korrigieren", "eine echte Lastspitze", "Saisonalität", "ein Trend"], 0)
        ],
        loesung: "<p>a) kennzeichnen, kurze Lücken füllen, lange ausschließen · b) UTC verwenden · c) Zeitraster ändern · d) Messfehler.</p>" },

      { titel: "Ensemble-Verfahren", text: "",
        teile: [
          t("a", "a) Wie funktioniert ein Random Forest?", 4, "Viele Entscheidungsbäume auf Bootstrap-Stichproben (1,5 P.), je Split zufällige Merkmalsauswahl (1,5 P.), Mittelung der Vorhersagen (1 P.)."),
          w("b", "b) Was ist der Out-of-Bag-Fehler?", 2, ["Fehler auf den Fällen, die ein Baum beim Training nicht gesehen hat", "Fehler auf den Trainingsfällen", "Fehler der Lernrate", "Speicherfehler"], 0),
          w("c", "c) Welcher Parameter ist ein Hyperparameter eines Random Forest?", 2, ["Anzahl der Bäume", "die Lastwerte", "die Zielvariable", "das Datum"], 0),
          w("d", "d) Was reduzieren Ensembles durch Mittelung vor allem?", 2, ["die Varianz", "die Datenmenge", "die Anzahl der Merkmale", "den Bias auf null"], 0)
        ],
        loesung: "<p>a) Bootstrap, zufällige Merkmale, Mittelung · b) Fehler auf nicht genutzten Fällen · c) Anzahl Bäume · d) Varianz.</p>" },

      { titel: "Python", text: "<pre class=\"code\">last = [40, 42, 45, 50, 48, 45]\nspitze = max(last)\nprint(last.index(spitze))\ndiff = [b - a for a, b in zip(last, last[1:])]\nprint(diff)\nprint(sum(1 for d in diff if d &lt; 0))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 3, 0),
          w("b", "b) Zweite Ausgabe", 3, ["[2, 3, 5, -2, -3]", "[40, 42, 45, 50, 48]", "[2, 3, 5, 2, 3]", "[-2, -3]"], 0),
          z("c", "c) Dritte Ausgabe", 3, 2, 0),
          w("d", "d) Was liefert zip(last, last[1:])?", 3, ["Paare aufeinanderfolgender Werte", "die Summe", "eine sortierte Liste", "den Maximalwert"], 0)
        ],
        loesung: "<p>a) Index von 50 = <b>3</b> · b) Differenzen <b>[2, 3, 5, −2, −3]</b> · c) zwei negative → <b>2</b> · d) Nachbarpaare.</p>" },

      { titel: "Kritische Infrastruktur und Sicherheit", text: "",
        teile: [
          w("a", "a) Innerhalb welcher Frist ist nach NIS-2 eine Frühwarnung zu einem erheblichen Sicherheitsvorfall abzugeben?", 2, ["24 Stunden", "7 Tage", "1 Monat", "keine Frist"], 0),
          t("b", "b) Nennen Sie zwei technische und organisatorische Maßnahmen für ein KI-System in der Netzleitstelle.", 4, "Je 2 P.: Netzsegmentierung, strenge Zugriffsrechte, Zwei-Faktor-Anmeldung, Protokollierung/Überwachung, Notfallplan und manuelle Rückfallebene, Schulung, Updates."),
          w("c", "c) Warum werden Leitsysteme vom Büronetz getrennt?", 2, ["damit Angriffe sich nicht vom Büronetz ins Leitsystem ausbreiten", "um Strom zu sparen", "aus Lizenzgründen", "für schnellere E-Mails"], 0),
          w("d", "d) Welche Bundesbehörde ist in Deutschland zentral für Informationssicherheit zuständig?", 2, ["BSI", "Bundeskartellamt", "BaFin", "DPMA"], 0),
          w("e", "e) Was regelt der Cyber Resilience Act?", 2, ["Sicherheitsanforderungen an Produkte mit digitalen Elementen", "Stromsteuer", "Arbeitszeit", "Urheberrecht"], 0)
        ],
        loesung: "<p>a) 24 h · b) Segmentierung, Zugriffsschutz, Protokollierung, Notfallplan · c) Ausbreitung verhindern · d) BSI · e) Produktsicherheit digitaler Produkte.</p>" },

      { titel: "Recht und Nachhaltigkeit", text: "",
        teile: [
          w("a", "a) Eine KI als Sicherheitsbauteil im Betrieb des Stromnetzes ist …", 2, ["Hochrisiko (Anhang III Nr. 2, kritische Infrastruktur)", "minimales Risiko", "verboten", "nur transparenzpflichtig"], 0),
          w("b", "b) Eine KI-Lastprognose für den Energieeinkauf ist in der Regel …", 2, ["kein Hochrisiko-System", "verboten", "immer Hochrisiko", "GPAI mit systemischem Risiko"], 0),
          t("c", "c) Sind viertelstündliche Smart-Meter-Daten eines Haushalts personenbezogen? Begründen Sie und nennen Sie eine Schutzmaßnahme.", 4, "Ja, sie sind einem Anschluss/Haushalt zuordenbar und lassen Rückschlüsse auf Verhalten zu (2 P.); Aggregation, Pseudonymisierung, Zweckbindung, kurze Speicherfristen (2 P.)."),
          w("d", "d) Was gibt der Data Act Nutzern vernetzter Produkte?", 2, ["Zugang zu den Daten, die ihre Produkte erzeugen", "kostenlosen Strom", "ein Widerrufsrecht für Verträge", "keine Rechte"], 0),
          w("e", "e) Wie trägt KI zur Nachhaltigkeit in der Energiewirtschaft bei?", 2, ["bessere Prognosen helfen, schwankende erneuerbare Energien ins Netz zu integrieren", "KI verbraucht keine Energie", "KI ersetzt Kraftwerke", "gar nicht"], 0)
        ],
        loesung: "<p>a) Hochrisiko · b) kein Hochrisiko · c) ja, personenbezogen; Aggregation, Pseudonymisierung · d) Datenzugang · e) Integration erneuerbarer Energien.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s09b", satz: 9, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Klassische Zeitreihenmodelle", text: "<p>Ein AR(1)-Modell lautet y<sub>t</sub> = 10 + 0,8 · y<sub>t−1</sub>.</p>",
        teile: [
          t("a", "a) Erklären Sie die Bestandteile eines ARIMA-Modells.", 4, "AR: Abhängigkeit von eigenen Vergangenheitswerten (1,5 P.); I: Differenzieren zur Herstellung von Stationarität (1 P.); MA: Abhängigkeit von vergangenen Fehlern (1,5 P.)."),
          w("b", "b) Die Reihe 100, 104, 109, 115 hat erste Differenzen 4, 5, 6 und zweite Differenzen 1, 1. Welcher Differenzierungsgrad macht sie hier annähernd stationär?", 2, ["2", "0", "1", "3"], 0),
          z("c", "c) Prognose für y<sub>t</sub>, wenn y<sub>t−1</sub> = 60", 3, 58, 0.001),
          z("d", "d) Langfristiger Mittelwert der Reihe", 3, 50, 0.001),
          w("e", "e) Womit bestimmt man die Ordnung von AR- und MA-Teil?", 2, ["Autokorrelations- und partielle Autokorrelationsfunktion (ACF/PACF)", "Konfusionsmatrix", "Dendrogramm", "ROC-Kurve"], 0)
        ],
        loesung: "<p>a) AR, I, MA · b) 2 · c) 10 + 0,8 · 60 = <b>58</b> · d) 10 / (1 − 0,8) = <b>50</b> · e) ACF/PACF.</p>" },

      { titel: "Lastprognose mit Gradient Boosting", text: "",
        teile: [
          t("a", "a) Nennen Sie vier Merkmale für eine stündliche Lastprognose.", 4, "Je 1 P.: Last vor 24 h, Last vor 168 h, Temperatur(prognose), Stunde, Wochentag, Feiertag/Ferien, Sonneneinstrahlung (Eigenerzeugung)."),
          w("b", "b) Warum sind Lags von 24 und 168 Stunden besonders hilfreich?", 2, ["sie bilden Tages- und Wochenmuster ab", "sie verringern die Datenmenge", "sie ersetzen die Temperatur", "sie sind gesetzlich vorgeschrieben"], 0),
          t("c", "c) Wie erzeugen Sie Prognoseintervalle statt einzelner Werte, und wozu dienen sie?", 4, "Quantilregression, z. B. 10-%- und 90-%-Quantil (2 P.); Risiko und Reserve planen, Unsicherheit sichtbar machen (2 P.)."),
          w("d", "d) Welche Verlustfunktion nutzt die Quantilregression?", 2, ["Pinball-Loss (Quantilverlust)", "Kreuzentropie", "Hinge-Loss", "Gini"], 0)
        ],
        loesung: "<p>a) z. B. Lag 24, Lag 168, Temperatur, Stunde, Feiertag · b) Tages- und Wochenmuster · c) Quantile, für Reserveplanung · d) Pinball-Loss.</p>" },

      { titel: "Rekurrente Netze", text: "<p>Ein LSTM hat 16 Einheiten und erhält je Zeitschritt 4 Eingangsmerkmale.</p>",
        teile: [
          z("a", "a) Anzahl Parameter der LSTM-Schicht (4 · (h · (h + x) + h))", 4, 1344, 0),
          t("b", "b) Wie bereiten Sie eine Zeitreihe für das Training eines LSTM vor?", 4, "Gleitende Fenster aus Vergangenheitswerten als Eingabe, nächste Werte als Ziel (2 P.); zeitliche Aufteilung, Skalierung auf Trainingsdaten (2 P.)."),
          w("c", "c) Wie begegnet man explodierenden Gradienten?", 2, ["Gradient Clipping", "höhere Lernrate", "mehr Schichten", "weniger Daten"], 0),
          w("d", "d) Welche Architektur nutzt Attention, um sehr lange Abhängigkeiten zu erfassen?", 2, ["Transformer", "k-Means", "Entscheidungsbaum", "lineare Regression"], 0)
        ],
        loesung: "<p>a) 4 · (16 · 20 + 16) = <b>1.344</b> · b) Fenster bilden, zeitlich teilen, skalieren · c) Clipping · d) Transformer.</p>" },

      { titel: "Prognosen bewerten", text: "",
        teile: [
          t("a", "a) Beschreiben Sie eine Rolling-Origin-Evaluation.", 4, "Modell mit Daten bis Zeitpunkt t trainieren, Folgezeitraum prognostizieren (2 P.); Ursprung schrittweise verschieben und Fehler über viele Zeitpunkte mitteln (2 P.)."),
          z("b", "b) MAE des Modells 6 MW, MAE der naiven Prognose (Vortag) 8 MW. MASE", 3, 0.75, 0.001),
          w("c", "c) Was bedeutet MASE &lt; 1?", 3, ["das Modell ist besser als die naive Vergleichsprognose", "das Modell ist schlechter", "das Modell ist perfekt", "nicht interpretierbar"], 0)
        ],
        loesung: "<p>a) wiederholtes Training und Prognostizieren mit verschobenem Ursprung · b) 6 / 8 = <b>0,75</b> · c) besser als naiv.</p>" },

      { titel: "Bestärkendes Lernen für einen Batteriespeicher", text: "<p>Q-Learning-Update: Q(s, a) ← Q(s, a) + α · (r + γ · max Q(s′, a′) − Q(s, a)). Gegeben: Q(s, a) = 5, Belohnung r = 2, γ = 0,9, max Q(s′, a′) = 10, α = 0,5.</p>",
        teile: [
          t("a", "a) Beschreiben Sie Agent, Zustand, Aktion und Belohnung für die Speichersteuerung.", 4, "Agent: Steuerung (1 P.); Zustand: Ladestand, Preis, Lastprognose, Uhrzeit (1 P.); Aktion: laden, entladen, halten (1 P.); Belohnung: Erlös/Kostenersparnis abzüglich Verschleiß, Strafe bei Grenzverletzung (1 P.)."),
          z("b", "b) Neuer Q-Wert", 4, 8, 0.001),
          w("c", "c) Was beschreibt der Zielkonflikt Exploration vs. Exploitation?", 2, ["Neues ausprobieren vs. bekanntes Gutes nutzen", "Training vs. Test", "Kosten vs. Nutzen", "Speicher vs. Rechenzeit"], 0),
          w("d", "d) Warum trainiert man den Agenten zuerst in einer Simulation?", 2, ["um Schäden und Kosten durch Fehlversuche im echten Netz zu vermeiden", "weil Simulationen genauer sind", "aus Lizenzgründen", "weil es schneller ist, echte Daten zu löschen"], 0)
        ],
        loesung: "<p>a) Agent Steuerung, Zustand Ladestand/Preis, Aktionen laden/entladen, Belohnung Erlös · b) 5 + 0,5 · (2 + 9 − 5) = <b>8</b> · c) erkunden vs. ausnutzen · d) Fehlversuche ohne Schaden.</p>" },

      { titel: "Robustheit in kritischer Infrastruktur", text: "",
        teile: [
          t("a", "a) Was geschieht, wenn das Prognosemodell ausfällt oder unplausible Werte liefert? Beschreiben Sie eine Rückfallebene.", 4, "Plausibilitätsprüfung der Ausgaben (1 P.); automatische Umschaltung auf einfache Prognose (Vorwoche/Standardlastprofil) (2 P.); Alarm an Leitstelle, manuelle Freigabe (1 P.)."),
          t("b", "b) Wie schützen Sie das Modell vor manipulierten Sensordaten?", 4, "Integrität der Datenübertragung (Signaturen/Verschlüsselung) (2 P.); Plausibilitätsprüfungen, Vergleich redundanter Messungen, Anomalieerkennung auf Eingaben (2 P.)."),
          w("c", "c) Was verlangt die KI-Verordnung für Hochrisiko-Systeme in der Netzsteuerung zusätzlich?", 2, ["wirksame menschliche Aufsicht mit Eingriffsmöglichkeit", "vollautomatischen Betrieb ohne Menschen", "Veröffentlichung des Quellcodes", "nichts"], 0)
        ],
        loesung: "<p>a) Plausibilitätsprüfung, Rückfallprognose, Alarm · b) Integritätsschutz, Plausibilität, Redundanz · c) menschliche Aufsicht.</p>" },

      { titel: "Erklärbarkeit", text: "",
        teile: [
          t("a", "a) Wie erklären Sie der Netzleitwarte eine ungewöhnlich hohe Lastprognose?", 4, "Treiber der Prognose zeigen, z. B. Kälteeinbruch, Feiertagseffekt, Vorwochenwert (2 P.); Vergleich mit ähnlichen Tagen und Prognoseintervall (2 P.)."),
          w("b", "b) Welche Darstellung zeigt, wie die Prognose im Mittel von der Temperatur abhängt?", 2, ["Partial-Dependence-Plot", "Konfusionsmatrix", "Dendrogramm", "Wortwolke"], 0),
          w("c", "c) Welche Methode zerlegt eine einzelne Prognose in Merkmalsbeiträge?", 2, ["SHAP", "k-Means", "ARIMA", "Resampling"], 0)
        ],
        loesung: "<p>a) Treiber und Vergleichstage zeigen · b) Partial Dependence · c) SHAP.</p>" },

      { titel: "Zeitreihen in pandas", text: "<pre class=\"code\">import pandas as pd\nidx = pd.date_range(\"2026-01-01\", periods=48, freq=\"h\")\ns = pd.Series(range(48), index=idx)\nprint(s.resample(\"D\").mean().iloc[1])\nprint(s.shift(24).iloc[30])\nprint(s.index[25].hour)</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 35.5, 0.001),
          z("b", "b) Zweite Ausgabe", 3, 6, 0.001),
          z("c", "c) Dritte Ausgabe", 2, 1, 0),
          w("d", "d) Was macht resample(\"D\").mean()?", 2, ["bildet Tagesmittelwerte aus Stundenwerten", "mischt die Werte", "löscht Tage", "verschiebt um einen Tag"], 0)
        ],
        loesung: "<p>a) Mittel von 24 … 47 = <b>35,5</b> · b) Wert von vor 24 Stunden an Position 30 → <b>6</b> · c) 2. Januar 01:00 → <b>1</b> · d) Tagesmittel.</p>" },

      { titel: "Betrieb und Nachweise", text: "",
        teile: [
          t("a", "a) Beschreiben Sie ein tägliches automatisches Nachtraining mit Sicherungen.", 4, "Neue Daten validieren (1 P.); Training und Vergleich mit aktuellem Modell auf Holdout (1 P.); nur bei Verbesserung freigeben (Champion-Challenger) (1 P.); Monitoring und Rollback (1 P.)."),
          w("b", "b) Wetterprognosen fließen als Merkmale ein. Wie stellen Sie sicher, dass Training und Betrieb dieselben Merkmale nutzen?", 2, ["über einen Feature Store mit versionierten Merkmalen", "durch manuelles Kopieren", "gar nicht", "durch Löschen alter Daten"], 0),
          t("c", "c) Was dokumentieren Sie für Audits als Betreiber kritischer Infrastruktur?", 4, "Modellversionen, Trainingsdaten, Kennzahlen (1 P.); Freigaben und Verantwortliche (1 P.); Vorfälle, Ausfälle, Rückfallnutzung (1 P.); Sicherheitsmaßnahmen und Tests (1 P.)."),
          w("d", "d) Was ist ein Canary-Release?", 2, ["neue Version zunächst für einen kleinen Teil des Betriebs freigeben", "Release am Wochenende", "Rückkehr zur alten Version", "Release ohne Tests"], 0)
        ],
        loesung: "<p>a) validieren, trainieren, vergleichen, freigeben, überwachen · b) Feature Store · c) Versionen, Freigaben, Vorfälle, Sicherheit · d) schrittweise Freigabe.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s09t2", satz: 9, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI bei den Stadtwerken", kurz: "Energieversorger · Lastprognose und Netz", minuten: 240,
    situation: "<p>Die <b>Stadtwerke Talheim GmbH</b> (1.100 Beschäftigte, Betriebsrat) versorgen 120.000 Kunden mit Strom und betreiben das örtliche Verteilnetz. Als Betreiber kritischer Infrastruktur unterliegen sie den Pflichten der NIS-2-Umsetzung. Jährlich werden 1.200 GWh Strom abgesetzt. Die Lastprognose erstellt heute ein Händler täglich in drei Stunden mit Tabellen; Abweichungen müssen teuer als Ausgleichsenergie bezahlt werden. Der mittlere Prognosefehler (MAPE) liegt bei 4 %.</p><p>Geplant sind (1) eine KI-Lastprognose für den Energieeinkauf und (2) eine selbst entwickelte KI, die einen großen Batteriespeicher steuert und bei Netzengpässen automatisch eingreift, um Überlastungen zu vermeiden. Sie leiten beide Vorhaben.</p>",
    aufgaben: [
      { titel: "Lastprognose konzipieren", text: "<p>Vereinfachung: Die auszugleichende Energiemenge entspricht dem MAPE mal Jahresabsatz. Ziel-MAPE 2,5 %, Ausgleichsenergie kostet 60 € je MWh.</p>",
        teile: [
          t("a", "a) Beschreiben Sie das Konzept der KI-Lastprognose.", 6, "Ziel: Viertelstunden-/Stundenlast für den Folgetag (1 P.); Daten: historische Last, Wetterprognosen, Kalender, Eigenerzeugung (2 P.); Modell: Gradient Boosting/LSTM mit Lags, Baseline Vortag (2 P.); Ausgabe mit Prognoseintervall an Händler (1 P.)."),
          z("b", "b) Verringerung der Ausgleichsenergiemenge in GWh pro Jahr", 3, 18, 0.01, "GWh"),
          z("c", "c) Eingesparte Kosten pro Jahr", 3, 1080000, 0, "€"),
          t("d", "d) Warum geben Sie Prognoseintervalle an, und wie nutzt der Handel sie?", 4, "Unsicherheit sichtbar machen (2 P.); Reserve und Absicherung nach Risiko planen, bei breiten Intervallen vorsichtiger einkaufen (2 P.).")
        ],
        loesung: "<p>a) Folgetagsprognose aus Last, Wetter, Kalender, Eigenerzeugung mit Intervallen · b) 1.200 GWh · (4 % − 2,5 %) = <b>18 GWh</b> · c) 18.000 MWh · 60 € = <b>1.080.000 €</b> · d) Unsicherheit für Risikoentscheidungen.</p>" },

      { titel: "Prozess", text: "",
        teile: [
          t("a", "a) Beschreiben Sie den Day-ahead-Prozess mit KI-Prognose und Freigabe.", 5, "Nachts automatischer Datenimport und Prognose (1 P.); Plausibilitätsprüfung (1 P.); Händler prüft, passt bei Sondereffekten an, gibt frei (1 P.); Beschaffung am Markt (1 P.); Abweichungsanalyse am Folgetag, Rückkopplung (1 P.)."),
          t("b", "b) Nennen Sie drei Kennzahlen.", 3, "Je 1 P.: MAPE/MASE, Ausgleichsenergiekosten, Anteil manueller Anpassungen, Pünktlichkeit der Prognose, Häufigkeit der Rückfallebene."),
          z("c", "c) Die manuelle Prognose dauert heute 3 Stunden täglich, künftig 0,5 Stunden. Eingesparte Stunden pro Jahr (365 Tage)", 2, 912.5, 0.5, "h"),
          w("d", "d) Mit welchem BPMN-Element bilden Sie „Prognose plausibel? ja/nein“ ab?", 2, ["exklusives Gateway", "Startereignis", "Datenobjekt", "Pool"], 0)
        ],
        loesung: "<p>a) Import → Prognose → Prüfung → Freigabe → Beschaffung → Abweichungsanalyse · b) z. B. MAPE, Ausgleichskosten, Anpassungsquote · c) 2,5 · 365 = <b>912,5 h</b> · d) exklusives Gateway.</p>" },

      { titel: "Projekt", text: "<p>Vorgänge für die Speichersteuerung (Wochen, Vorgänger): A Anforderungen und Risikoanalyse 4 (–) · B Simulation und Training 6 (A) · C Sicherheitskonzept 3 (A) · D Konformitätsbewertung 5 (B) · E Integration Leitsystem 4 (C) · F Probebetrieb 2 (D, E).</p>",
        teile: [
          t("a", "a) Warum eignet sich für die Speichersteuerung ein Vorgehen mit festen Entscheidungstoren?", 4, "Hochrisiko- und Sicherheitsanforderungen verlangen dokumentierte Prüfungen vor jedem Schritt (2 P.); Gates z. B. nach Simulation, Konformitätsbewertung, Probebetrieb; agile Entwicklung innerhalb der Phasen möglich (2 P.)."),
          z("b", "b) Projektdauer in Wochen", 3, 17, 0),
          w("c", "c) Kritischer Pfad", 3, ["A–B–D–F", "A–C–E–F", "A–B–E–F", "A–C–D–F"], 0),
          z("d", "d) Gesamtpuffer von E", 2, 4, 0),
          t("e", "e) Welche zwei Risiken stufen Sie in der Risikomatrix am höchsten ein?", 2, "Z. B. Fehlsteuerung mit Netzschaden/Versorgungsausfall, Cyberangriff auf die Steuerung, Verzögerung der Konformitätsbewertung (2 P.).")
        ],
        loesung: "<p>a) Hochrisiko verlangt geprüfte Freigaben · b) A 0–4, B 4–10, C 4–7, D 10–15, E 7–11, F 15–17 → <b>17</b> · c) <b>A–B–D–F</b> · d) E: SAZ 11 − FAZ 7 = <b>4</b> · e) Fehlsteuerung, Cyberangriff.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Einstufung der Lastprognose für den Einkauf", 2, ["kein Hochrisiko-System", "Hochrisiko", "verboten", "nur Transparenz"], 0),
          w("b", "b) Einstufung der automatischen Speichersteuerung bei Netzengpässen", 2, ["Hochrisiko als Sicherheitsbauteil kritischer Infrastruktur (Anhang III Nr. 2)", "minimales Risiko", "verboten", "nur Transparenz"], 0),
          t("c", "c) Die Stadtwerke entwickeln die Steuerung selbst. Welche Rolle haben sie, und welche Pflichten folgen daraus?", 6, "Anbieter (und Betreiber) (1 P.); Pflichten je 1 P.: Risikomanagement, Daten-Governance, technische Dokumentation, Protokollierung, menschliche Aufsicht ermöglichen, Robustheit/Cybersicherheit, Konformitätsbewertung, Registrierung (max. 5 P.)."),
          t("d", "d) Welche Pflichten ergeben sich aus der NIS-2-Umsetzung?", 4, "Risikomanagementmaßnahmen zur Cybersicherheit (1 P.); Meldung erheblicher Vorfälle: Frühwarnung 24 h, Meldung 72 h, Abschlussbericht 1 Monat (1 P.); Registrierung beim BSI (1 P.); Verantwortung und Schulungspflicht der Geschäftsleitung (1 P.)."),
          w("e", "e) Viertelstundenwerte von Haushalts-Smart-Metern sind …", 2, ["personenbezogene Daten", "anonyme Daten", "keine Daten", "Geschäftsgeheimnisse des Kunden"], 0),
          w("f", "f) Ab wann gelten die Hochrisiko-Pflichten nach Anhang III gemäß Digital Omnibus?", 2, ["2.12.2027", "2.2.2025", "2.8.2025", "1.1.2030"], 0),
          w("g", "g) Wer trägt nach NIS-2 die Verantwortung für die Umsetzung der Risikomaßnahmen?", 2, ["die Geschäftsleitung", "nur die IT-Abteilung", "der Betriebsrat", "das BSI"], 0)
        ],
        loesung: "<p>a) kein Hochrisiko · b) Hochrisiko · c) Anbieterpflichten · d) Risikomanagement, Meldefristen, Registrierung, Leitungsverantwortung · e) personenbezogen · f) 2.12.2027 · g) Geschäftsleitung.</p>" },

      { titel: "Wirtschaftlichkeit der Lastprognose", text: "<p>Investition 900.000 €, laufende Kosten 180.000 € pro Jahr. Einsparung an Ausgleichsenergie aus Aufgabe 1. Nutzungsdauer 5 Jahre, Zins 6 % (Rentenbarwertfaktor 4,2124).</p>",
        teile: [
          z("a", "a) Jährlicher Rückfluss", 3, 900000, 0, "€"),
          z("b", "b) Statische Amortisationszeit in Jahren", 2, 1, 0.01, "Jahre"),
          z("c", "c) Kapitalwert", 4, 2891160, 50, "€"),
          t("d", "d) Welche Annahme ist am unsichersten? Wie prüfen Sie die Robustheit?", 3, "Preise für Ausgleichsenergie und erreichbarer MAPE schwanken (1 P.); Sensitivitätsanalyse/Szenarien, kritischen Wert berechnen (2 P.)."),
          w("e", "e) Die Stadtwerke finanzieren die Investition aus einbehaltenen Gewinnen. Das ist …", 2, ["Innen- bzw. Selbstfinanzierung", "Kreditfinanzierung", "Beteiligungsfinanzierung", "Leasing"], 0)
        ],
        loesung: "<p>a) 1.080.000 − 180.000 = <b>900.000 €</b> · b) <b>1 Jahr</b> · c) 900.000 · 4,2124 − 900.000 ≈ <b>2.891.160 €</b> · d) Preise und Prognosegüte; Sensitivität · e) Selbstfinanzierung.</p>" },

      { titel: "Personal und Führung", text: "",
        teile: [
          t("a", "a) Wie bauen Sie Data-Science-Kompetenz für den Energiehandel auf? Make or Buy?", 4, "Mix: wenige Spezialisten einstellen (Buy) (1 P.), Händler zu Datenkompetenz weiterbilden (Make) (1 P.), externe Unterstützung für den Start (1 P.); Begründung: Fachwissen Energiehandel intern entscheidend (1 P.)."),
          z("b", "b) Benötigt werden 5 Data Scientists, vorhanden ist einer, eine Einstellung ist zugesagt, Abgänge gibt es keine. Nettopersonalbedarf", 2, 3, 0),
          w("c", "c) Nach einem nächtlichen Störungseinsatz bis 2 Uhr: Wann darf die Arbeit frühestens wieder beginnen?", 2, ["13 Uhr", "8 Uhr", "6 Uhr", "sofort"], 0),
          t("d", "d) Das neue Team aus Händlern, Netztechnikern und Data Scientists streitet über Prioritäten. Wie führen Sie es durch die Teamphasen?", 4, "Storming erkennen (1 P.); Konflikte moderieren, gemeinsame Ziele und Regeln vereinbaren (Norming) (2 P.); später mehr Verantwortung delegieren (Performing) (1 P.).")
        ],
        loesung: "<p>a) Mix aus Einstellung, Weiterbildung, externer Hilfe · b) 5 − (1 + 1) = <b>3</b> · c) 11 h Ruhezeit → 13 Uhr · d) moderieren, Regeln vereinbaren, delegieren.</p>" },

      { titel: "Zukunftskompetenzen", text: "",
        teile: [
          t("a", "a) Formulieren Sie drei Kernaussagen Ihrer Präsentation vor dem Aufsichtsrat.", 4, "Nutzen mit Zahl (z. B. 0,9 Mio. € pro Jahr) (1 P.); Risiken und Recht (Hochrisiko, NIS-2) mit Maßnahmen (1,5 P.); konkreter Entscheidungsbedarf und Zeitplan (1,5 P.)."),
          t("b", "b) Für einen Feiertag sagt das Modell eine ungewöhnlich niedrige Last voraus. Wie prüfen Sie kritisch?", 4, "Mit vergangenen Feiertagen und Brückentagen vergleichen (1 P.); Treiber/SHAP ansehen, Kalendermerkmal korrekt? (2 P.); Händlerwissen einbeziehen, ggf. anpassen und dokumentieren (1 P.)."),
          w("c", "c) Welcher Resilienzfaktor hilft nach einem Fehlschlag im Probebetrieb am meisten weiter?", 2, ["Lösungsorientierung", "Schuldzuweisung", "Rückzug", "Perfektionismus"], 0),
          w("d", "d) Welche Methode plant einen Tag mit Aufgaben, Zeitschätzung und Puffer?", 2, ["ALPEN", "Eisenhower", "Ishikawa", "Johari"], 0)
        ],
        loesung: "<p>a) Nutzen, Risiken mit Maßnahmen, Entscheidungsbedarf · b) Vergleich, Treiber, Fachwissen · c) Lösungsorientierung · d) ALPEN.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
