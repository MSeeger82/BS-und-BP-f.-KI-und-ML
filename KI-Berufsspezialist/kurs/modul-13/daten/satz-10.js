/* Prüfungssatz 10 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "s10t1", satz: 10, teil: 1, titel: "Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Modellarten", text: "",
        teile: [
          w("a", "a) Was unterscheidet ein generatives von einem diskriminativen Modell?", 2, ["Ein generatives Modell lernt die Verteilung der Daten und kann neue Beispiele erzeugen; ein diskriminatives lernt die Grenze zwischen Klassen", "Generative Modelle sind immer kleiner", "Diskriminative Modelle erzeugen Bilder", "Es gibt keinen Unterschied"], 0),
          t("b", "b) Nennen Sie je ein Anwendungsbeispiel für ein generatives und ein diskriminatives Modell im Unternehmen.", 4, "Generativ (2 P.): Texte/Antwortentwürfe, Bilder, synthetische Daten. Diskriminativ (2 P.): Spamfilter, Betrugserkennung, Qualitätsprüfung."),
          w("c", "c) Was ist ein multimodales Modell?", 2, ["Ein Modell, das mehrere Datenarten wie Text und Bild gemeinsam verarbeitet", "Ein Modell mit mehreren Lernraten", "Ein Modell auf mehreren Servern", "Ein Modell mit mehreren Ausgabeklassen"], 0),
          w("d", "d) Was zeichnet ein agentisches KI-System aus?", 2, ["Es plant mehrschrittig und führt mit Werkzeugen selbstständig Aktionen aus", "Es gibt nur Text aus", "Es wird von einer Agentur entwickelt", "Es arbeitet ohne Daten"], 0)
        ],
        loesung: "<p>a) Generativ: Datenverteilung lernen und Neues erzeugen; diskriminativ: Klassengrenze lernen. b) Generativ: Antwortentwürfe für den Kundenservice; diskriminativ: Betrugserkennung. c) Mehrere Modalitäten (Text, Bild, Ton). d) Planung und eigenständige Aktionen mit Werkzeugen.</p>" },

      { titel: "Zeitreihen aufbereiten", text: "<p>Stündliche Messwerte: <b>10, 12, 14, 18</b>.</p>",
        teile: [
          z("a", "a) Gleitender Mittelwert über die letzten drei Werte (zwei Nachkommastellen)", 3, 14.67, 0.01),
          z("b", "b) Prozentuale Veränderung vom dritten zum vierten Wert (zwei Nachkommastellen)", 3, 28.57, 0.02, "%"),
          t("c", "c) Sensoren liefern Werte in unregelmäßigen Abständen. Wie bereiten Sie die Daten für ein Modell auf?", 4, "Resampling auf festes Raster, z. B. 10 Minuten, mit Aggregation (Mittelwert, Max) (2 P.); Lücken behandeln (Interpolation/Markierung), Zeitzonen vereinheitlichen (2 P.).")
        ],
        loesung: "<p>a) (12 + 14 + 18) / 3 ≈ <b>14,67</b> · b) (18 − 14) / 14 ≈ <b>28,57 %</b> · c) Auf ein festes Zeitraster bringen (Resampling mit Mittelwert/Maximum), Lücken interpolieren oder kennzeichnen, einheitliche Zeitzone.</p>" },

      { titel: "Wahrscheinlichkeiten", text: "<p>Sensor A fällt in einem Jahr mit 2 % Wahrscheinlichkeit aus, Sensor B mit 5 %. Die Ausfälle sind unabhängig. Antworten als Dezimalzahl.</p>",
        teile: [
          z("a", "a) Wahrscheinlichkeit, dass beide ausfallen", 3, 0.001, 0.00001),
          z("b", "b) Wahrscheinlichkeit, dass mindestens einer ausfällt", 3, 0.069, 0.0005),
          t("c", "c) Wann wäre die Unabhängigkeitsannahme unrealistisch?", 2, "Wenn gemeinsame Ursachen bestehen, z. B. gleiche Stromversorgung, Blitzschlag, gleicher Hersteller/Charge, gleiche Umgebung (2 P.)."),
          w("d", "d) Welche Aussage beschreibt eine bedingte Wahrscheinlichkeit?", 2, ["Die Wahrscheinlichkeit eines Ausfalls, wenn bereits eine Überhitzung gemessen wurde", "Die Wahrscheinlichkeit, dass morgen Montag ist", "Die Summe aller Wahrscheinlichkeiten", "Eine Wahrscheinlichkeit über 100 %"], 0)
        ],
        loesung: "<p>a) 0,02 · 0,05 = <b>0,001</b> · b) 1 − 0,98 · 0,95 = <b>0,069</b> · c) Bei gemeinsamen Ursachen (gleiche Stromversorgung, gleiche Bauserie) · d) P(Ausfall | Überhitzung).</p>" },

      { titel: "Merkmalsbedeutung", text: "",
        teile: [
          w("a", "a) Wie funktioniert Permutation Importance?", 2, ["Ein Merkmal wird zufällig vertauscht; je stärker die Modellgüte sinkt, desto wichtiger ist es", "Merkmale werden alphabetisch sortiert", "Merkmale werden quadriert", "Man zählt, wie oft ein Merkmal fehlt"], 0),
          t("b", "b) Worin unterscheiden sich globale Feature Importance und SHAP-Werte für einen Einzelfall?", 4, "Globale Importance: welche Merkmale über alle Daten insgesamt wichtig sind (2 P.); SHAP lokal: Beitrag jedes Merkmals zu einer einzelnen Vorhersage mit Richtung, aufsummierbar (2 P.)."),
          w("c", "c) Was zeigt ein Partial Dependence Plot?", 2, ["Wie sich die Vorhersage im Mittel ändert, wenn ein Merkmal variiert wird", "Die Verteilung der Zielvariable", "Die Trainingsdauer", "Die Konfusionsmatrix"], 0),
          w("d", "d) Ein Merkmal ist für das Modell sehr wichtig. Was folgt daraus?", 2, ["Nur, dass das Modell es stark nutzt – nicht, dass es die Ursache des Ergebnisses ist", "Es ist die Ursache des Ergebnisses", "Es muss entfernt werden", "Das Modell ist fehlerhaft"], 0)
        ],
        loesung: "<p>a) Merkmal vertauschen und Güteverlust messen. b) Global: Bedeutung insgesamt; SHAP: Beitrag je Merkmal zu einer konkreten Vorhersage. c) Mittlere Wirkung eines Merkmals auf die Vorhersage. d) Wichtigkeit im Modell ist keine Kausalität.</p>" },

      { titel: "SQL für Sensordaten", text: "<p>Tabelle <code>messwerte(sensor_id, zeit, wert)</code>.</p>",
        teile: [
          t("a", "a) Schreiben Sie eine Abfrage, die je Sensor und Tag den Durchschnittswert ausgibt.", 5, "SELECT sensor_id, DATE(zeit), AVG(wert) (2 P.) FROM messwerte (1 P.) GROUP BY sensor_id, DATE(zeit) (2 P.). Funktionsnamen je nach Datenbank tolerieren."),
          w("b", "b) Was liefert SELECT wert FROM messwerte WHERE sensor_id = 7 ORDER BY zeit DESC LIMIT 1?", 2, ["Den neuesten Messwert von Sensor 7", "Den ältesten Messwert von Sensor 7", "Den größten Messwert", "Alle Messwerte von Sensor 7"], 0),
          w("c", "c) Welcher Primärschlüssel passt zur Tabelle messwerte?", 3, ["Zusammengesetzt aus sensor_id und zeit", "Nur wert", "Nur sensor_id", "Keiner ist möglich"], 0)
        ],
        loesung: "<pre class=\"code\">SELECT sensor_id, DATE(zeit) AS tag, AVG(wert) AS mittel\nFROM messwerte\nGROUP BY sensor_id, DATE(zeit);</pre><p>b) Den neuesten Wert. c) (sensor_id, zeit) – ein Sensor hat zu jedem Zeitpunkt genau einen Wert.</p>" },

      { titel: "Anomalien bewerten", text: "<p>Ein Anomalieerkennungssystem meldet die 20 auffälligsten Fälle. 12 davon sind echte Probleme. Insgesamt gab es im Zeitraum 15 echte Probleme.</p>",
        teile: [
          z("a", "a) Precision@20", 3, 60, 0.1, "%"),
          z("b", "b) Recall", 3, 80, 0.1, "%"),
          t("c", "c) Warum ist Accuracy für die Bewertung von Anomalieerkennung kaum geeignet?", 2, "Anomalien sind sehr selten; „alles normal“ erreicht fast 100 % Accuracy, findet aber nichts (2 P.)."),
          w("d", "d) Was legt der Parameter „contamination“ eines Isolation Forest fest?", 2, ["Den erwarteten Anteil an Ausreißern und damit die Schwelle", "Die Anzahl der Bäume", "Die Lernrate", "Die Zahl der Merkmale"], 0)
        ],
        loesung: "<p>a) 12 / 20 = <b>60 %</b> · b) 12 / 15 = <b>80 %</b> · c) Wegen extremer Seltenheit · d) Erwarteter Ausreißeranteil.</p>" },

      { titel: "Modellauswahl", text: "",
        teile: [
          w("a", "a) Was besagt das „No-Free-Lunch“-Theorem?", 2, ["Kein Verfahren ist für alle Probleme das beste", "KI-Modelle sind immer kostenlos", "Training braucht keine Daten", "Einfache Modelle sind immer schlechter"], 0),
          t("b", "b) Nennen Sie vier Kriterien für die Modellwahl außer der Genauigkeit.", 4, "Je 1 P.: Erklärbarkeit, Rechen-/Antwortzeit, Daten- und Trainingsbedarf, Robustheit/Stabilität, Wartbarkeit, Kosten, rechtliche Anforderungen, Fairness, Betrieb auf Zielhardware."),
          w("c", "c) Zwei Modelle sind gleich gut. Welches wählen Sie nach dem Prinzip von Ockhams Rasiermesser?", 2, ["Das einfachere", "Das komplexere", "Das neuere", "Das teurere"], 0),
          w("d", "d) Wozu dient eine Baseline?", 2, ["Als Vergleichsmaßstab, um den Mehrwert eines Modells zu messen", "Als Ersatz für Testdaten", "Zum Speichern der Daten", "Als Lernrate"], 0)
        ],
        loesung: "<p>a) Kein Verfahren ist universell das beste. b) z. B. Erklärbarkeit, Geschwindigkeit, Datenbedarf, Wartbarkeit. c) Das einfachere. d) Vergleichsmaßstab.</p>" },

      { titel: "Python", text: "<pre class=\"code\">daten = [3, 8, 1, 9, 4]\nprint(max(daten) - min(daten))\nprint(sorted(daten, reverse=True)[:2])\nquadrat = lambda x: x * x\nprint(sum(map(quadrat, [1, 2, 3])))</pre>",
        teile: [
          z("a", "a) Ausgabe der ersten print-Anweisung", 3, 8, 0.001),
          w("b", "b) Ausgabe der zweiten print-Anweisung", 3, ["[9, 8]", "[1, 3]", "[3, 8]", "[9, 8, 4]"], 0),
          z("c", "c) Ausgabe der dritten print-Anweisung", 4, 14, 0.001)
        ],
        loesung: "<p>a) 9 − 1 = <b>8</b> · b) absteigend sortiert, die ersten zwei: <b>[9, 8]</b> · c) 1 + 4 + 9 = <b>14</b>.</p>" },

      { titel: "MLOps-Grundlagen", text: "",
        teile: [
          w("a", "a) Was ist eine Model Registry?", 2, ["Ein zentrales Verzeichnis für Modellversionen mit Metadaten und Status", "Ein Handelsregister für KI-Firmen", "Eine Liste aller Mitarbeitenden", "Ein Datenbankindex"], 0),
          w("b", "b) Wozu werden Container (z. B. Docker) beim Deployment genutzt?", 2, ["Um ein Modell mit allen Abhängigkeiten reproduzierbar und portabel auszuliefern", "Um Daten zu verschlüsseln", "Um das Modell zu trainieren", "Um Labels zu erzeugen"], 0),
          t("c", "c) Was bedeutet CI/CD im ML-Umfeld?", 3, "Continuous Integration: Code/Daten/Modelle automatisch testen und zusammenführen (1,5 P.); Continuous Delivery/Deployment: geprüfte Modelle automatisiert ausliefern (1,5 P.)."),
          w("d", "d) Wozu dient ein Feature Store?", 3, ["Merkmale zentral, einheitlich und wiederverwendbar für Training und Betrieb bereitzustellen", "Um Hardware zu lagern", "Um Software zu kaufen", "Um Modelle zu löschen"], 0)
        ],
        loesung: "<p>a) Verzeichnis versionierter Modelle. b) Reproduzierbare, portable Auslieferung. c) Automatisiertes Testen, Integrieren und Ausliefern von Code, Daten und Modellen. d) Einheitliche Merkmale für Training und Betrieb.</p>" },

      { titel: "Verantwortung und Nachhaltigkeit", text: "",
        teile: [
          t("a", "a) Nennen Sie zwei Maßnahmen, um den Energieverbrauch von KI-Projekten zu senken.", 4, "Je 2 P.: kleinere/passende Modelle, Transfer Learning statt Training von null, effiziente Hardware, Rechenzentren mit Ökostrom, weniger Hyperparameter-Läufe, Quantisierung, Inferenz bündeln."),
          w("b", "b) Was bedeutet Rechenschaftspflicht (Accountability) bei KI?", 2, ["Es ist klar geregelt, wer für ein KI-System und seine Folgen verantwortlich ist, und dies ist nachweisbar", "Die KI zahlt selbst Steuern", "Die Rechenzeit wird abgerechnet", "Nur der Hersteller haftet immer"], 0),
          w("c", "c) Was ist eine Model Card?", 2, ["Eine Dokumentation zu Zweck, Daten, Leistung, Grenzen und Risiken eines Modells", "Eine Grafikkarte", "Ein Zugangsausweis", "Eine Visitenkarte des Entwicklers"], 0),
          w("d", "d) Was ist Red Teaming?", 2, ["Gezieltes Angreifen eines Systems, um Schwachstellen zu finden", "Die Arbeit eines Vertriebsteams", "Ein Farbschema", "Eine Datenbankfunktion"], 0)
        ],
        loesung: "<p>a) z. B. vortrainierte Modelle anpassen statt neu trainieren; kleinere, quantisierte Modelle einsetzen. b) Klare, nachweisbare Verantwortung. c) Steckbrief eines Modells. d) Gezielte Angriffstests.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "s10t2", satz: 10, teil: 2, titel: "Vertiefungen: Anomalieerkennung im Windpark", kurz: "Energie · Anomalien und MLOps", minuten: 120,
    situation: "<p>Die <b>Nordwind Energie GmbH</b> betreibt 40 Windenergieanlagen. Jede Anlage liefert alle 10 Minuten rund 60 Messwerte (Windgeschwindigkeit, Leistung, Drehzahl, Temperaturen von Getriebe und Generator, Vibrationen). Getriebeschäden sind selten – in drei Jahren gab es 5 dokumentierte Fälle –, kosten aber je 250.000 € plus Stillstand.</p><p>Ziel ist ein System, das auffälliges Verhalten früh erkennt, damit Inspektionen geplant werden können. Es soll dauerhaft betrieben, überwacht und aktualisiert werden.</p>",
    aufgaben: [
      { titel: "Ansatz", text: "",
        teile: [
          t("a", "a) Warum ist eine rein überwachte Klassifikation hier schwierig? Welchen Ansatz wählen Sie stattdessen?", 6, "Nur 5 Schadensfälle → viel zu wenige Labels, extrem unbalanciert (2 P.); unüberwachte/semi-überwachte Anomalieerkennung: Normalverhalten lernen und Abweichungen melden (2 P.); die 5 Fälle zur Validierung nutzen (2 P.)."),
          t("b", "b) Beschreiben Sie ein Normalverhaltensmodell für die Getriebetemperatur.", 6, "Regressionsmodell sagt Getriebetemperatur aus Leistung, Wind, Drehzahl, Außentemperatur im Normalbetrieb vorher (3 P.); Residuum = gemessen − erwartet; anhaltend große Residuen deuten auf Schaden (3 P.)."),
          w("c", "c) Welches Verfahren eignet sich für unüberwachte Anomalieerkennung auf vielen Merkmalen?", 2, ["Isolation Forest", "Lineare Regression ohne Merkmale", "k-nächste Nachbarn mit Labels", "Naive Bayes"], 0)
        ],
        loesung: "<p>a) Fünf Schadensfälle reichen nicht zum Training eines Klassifikators. Besser: Normalverhalten lernen und Abweichungen melden; die bekannten Schäden dienen zur Überprüfung.</p><p>b) Ein Regressionsmodell sagt im Normalbetrieb die Getriebetemperatur aus Leistung, Wind, Drehzahl und Außentemperatur vorher. Liegt die gemessene Temperatur dauerhaft deutlich darüber, deutet das auf einen Schaden hin.</p><p>c) Isolation Forest (alternativ Autoencoder).</p>" },

      { titel: "Datenmenge und -qualität", text: "",
        teile: [
          z("a", "a) Wie viele Zeitpunkte liefert eine Anlage pro Jahr (365 Tage)?", 3, 52560, 0.5),
          z("b", "b) Wie viele Zeitpunkte liegen für alle Anlagen über drei Jahre vor?", 3, 6307200, 1),
          t("c", "c) Welche Betriebszustände filtern Sie vor dem Training des Normalverhaltens heraus, und warum?", 4, "Stillstand, Wartung, Abregelung/Curtailment, Vereisung, Sensorfehler (2 P.); sonst lernt das Modell Sonderzustände als normal bzw. erzeugt Fehlalarme (2 P.)."),
          t("d", "d) Die Anlagen stammen von zwei Herstellern und stehen an der Küste und im Binnenland. Was folgt daraus?", 4, "Unterschiedliches Normalverhalten (2 P.); Modell je Anlagentyp/Anlage oder Typ/Standort als Merkmal, Residuen je Anlage normieren (2 P.).")
        ],
        loesung: "<p>a) 6 · 24 · 365 = <b>52.560</b> · b) 52.560 · 40 · 3 = <b>6.307.200</b>.</p><p>c) Stillstand, Wartung, Abregelung, Vereisung und Sensorstörungen – das sind keine normalen Betriebszustände.</p><p>d) Normalverhalten unterscheidet sich; Modelle je Typ oder Anlage bzw. Typ und Standort als Merkmale, Schwellen je Anlage.</p>" },

      { titel: "Alarmlogik und Bewertung", text: "<p>Im Normalbetrieb haben die Residuen der Getriebetemperatur eine Standardabweichung von 1,5 °C (Mittelwert 0). Alarm gibt es ab einem Residuum über 3 Standardabweichungen. Im Rückblick hätte das System 4 der 5 Schäden im Mittel 12 Tage vorher erkannt und in drei Jahren insgesamt 30 Alarme ausgelöst.</p>",
        teile: [
          z("a", "a) Alarmschwelle für das Residuum", 3, 4.5, 0.001, "°C"),
          z("b", "b) Gemessen 78 °C, vom Modell erwartet 72 °C. Residuum?", 2, 6, 0.001, "°C"),
          w("c", "c) Löst dieser Messwert einen Alarm aus?", 2, ["Ja", "Nein"], 0),
          t("d", "d) Warum lösen Sie den Alarm erst aus, wenn die Schwelle über eine Stunde (6 Messungen) überschritten ist?", 4, "Einzelne Ausreißer/Messrauschen erzeugen sonst viele Fehlalarme (2 P.); Schäden entwickeln sich langsam, anhaltende Abweichung ist aussagekräftiger (2 P.)."),
          z("e", "e) Precision der Alarme (zwei Nachkommastellen)", 3, 13.33, 0.1, "%"),
          z("f", "f) Recall bezogen auf die Schäden", 3, 80, 0.1, "%"),
          t("g", "g) Bewerten Sie das Ergebnis. Eine Inspektion kostet 1.500 €.", 5, "Precision niedrig, 26 Fehlalarme (1 P.); Kosten Fehlalarme 26 · 1.500 = 39.000 € bzw. alle Inspektionen 45.000 € gegenüber bis zu 4 · 250.000 € vermiedenen Schäden – lohnt deutlich (2 P.); 12 Tage Vorlauf erlauben Planung; ein Schaden übersehen, kleine Datenbasis, Ergebnis unsicher (2 P.).")
        ],
        loesung: "<p>a) 3 · 1,5 = <b>4,5 °C</b> · b) 78 − 72 = <b>6 °C</b> · c) Ja.</p><p>d) Einzelne Spitzen sind oft Rauschen; ein Schaden zeigt sich als anhaltende Abweichung.</p><p>e) 4 / 30 = <b>13,33 %</b> · f) 4 / 5 = <b>80 %</b>.</p><p>g) Viele Fehlalarme, aber 30 Inspektionen kosten 45.000 €, während vier verhinderte Schäden bis zu 1 Mio. € sparen. 12 Tage Vorlauf erlauben geplante Reparaturen. Einschränkung: nur fünf Schadensfälle – das Ergebnis ist statistisch unsicher.</p>" },

      { titel: "MLOps-Pipeline", text: "",
        teile: [
          t("a", "a) Beschreiben Sie eine automatisierte ML-Pipeline für dieses System von den Rohdaten bis zum Betrieb.", 8, "Je 1 P., max. 8: Datenaufnahme; Datenvalidierung (Schema, Plausibilität); Vorverarbeitung/Merkmale; Training; Evaluation gegen Baseline/Abnahmekriterien; Registrierung in Model Registry; Deployment; Monitoring mit Alarmen und Rückkopplung zum Retraining."),
          t("b", "b) Was versionieren Sie, und warum?", 4, "Daten(stand), Code, Merkmalsdefinitionen, Modell und Hyperparameter, Umgebung (2 P.); Reproduzierbarkeit, Nachvollziehbarkeit bei Fehlalarmen, Rollback möglich (2 P.)."),
          t("c", "c) Betreiben Sie das Modell zentral oder auf Rechnern in den Anlagen (Edge)? Begründen Sie.", 4, "Begründete Entscheidung (2 P.): zentral – 10-Minuten-Takt reicht, einfache Wartung, alle Anlagen vergleichbar; Edge – bei schlechter Anbindung oder schneller Reaktion; Argument zur Netzanbindung/Wartbarkeit (2 P.)."),
          t("d", "d) Wie führen Sie ein neues Modell risikoarm ein?", 4, "Champion-Challenger/Shadow Mode: neues Modell läuft parallel ohne Alarme (2 P.); Vergleich über festgelegten Zeitraum, Umschalten nur bei Verbesserung, Rollback (2 P.).")
        ],
        loesung: "<p>a) Daten aus dem Leitsystem laden → Schema- und Plausibilitätsprüfung → Merkmale bilden, Sonderzustände filtern → Training je Anlagentyp → Evaluation gegen Abnahmekriterien → Registrierung in der Model Registry → Deployment → Monitoring von Daten, Residuen und Alarmen mit Rückkopplung zum Nachtraining.</p><p>b) Daten, Code, Merkmale, Modell, Parameter und Umgebung – für Reproduzierbarkeit, Ursachenanalyse und Rollback.</p><p>c) z. B. zentral: Der 10-Minuten-Takt verlangt keine Echtzeit, Wartung und Vergleich aller Anlagen sind einfacher.</p><p>d) Das neue Modell zunächst im Schattenbetrieb laufen lassen, Ergebnisse vergleichen, erst dann umschalten.</p>" },

      { titel: "Monitoring und Nachtraining", text: "",
        teile: [
          t("a", "a) Im ersten Sommer steigen die Fehlalarme stark an. Welche Ursache vermuten Sie, und wie beheben Sie sie?", 4, "Saisonaler Effekt: Trainingsdaten deckten Sommer nicht/ungenügend ab bzw. Außentemperatur fehlt (2 P.); Außentemperatur/Jahreszeit als Merkmal, Training über mindestens ein volles Jahr, Schwellen anpassen (2 P.)."),
          t("b", "b) Nach einem Getriebetausch meldet eine Anlage dauerhaft Abweichungen. Was tun Sie?", 5, "Neues Bauteil verändert Normalverhalten (2 P.); Wartungsereignisse aus Instandhaltungssystem einbeziehen, Modell/Referenz für die Anlage neu kalibrieren, Übergangsphase ohne Alarm bzw. mit Kennzeichnung (3 P.)."),
          t("c", "c) Nennen Sie Auslöser, bei denen Sie ein Nachtraining starten.", 5, "Je 1 P. (max. 5): festgelegter Zeitplan; Data Drift in Eingangsdaten; steigende Residuen/Fehlalarmquote; neue Schadensfälle/Labels; Hardware-/Anlagenänderungen; neue Anlagen.")
        ],
        loesung: "<p>a) Saisonalität: Das Modell kennt Sommertemperaturen zu wenig. Außentemperatur einbeziehen, über ein ganzes Jahr trainieren, Schwellen prüfen.</p><p>b) Nach dem Tausch gilt ein neues Normalverhalten. Wartungsereignisse aus dem Instandhaltungssystem übernehmen, die Anlage neu kalibrieren und in der Übergangszeit Alarme kennzeichnen.</p><p>c) Zeitplan, Drift, steigende Fehlalarme, neue Schadensfälle, Umbauten oder neue Anlagen.</p>" },

      { titel: "Sicherheit und Recht", text: "",
        teile: [
          t("a", "a) Welche Cyberrisiken bestehen, und welche Pflichten können für einen Energieerzeuger gelten?", 6, "Manipulation von Sensordaten/Modell, Zugriff auf Leitsystem, Ausfall (2 P.); Energie ist kritische Infrastruktur, Pflichten nach IT-Sicherheitsrecht (NIS2-Umsetzung/BSI-Gesetz) je nach Größe: Risikomanagement, Meldepflichten (2 P.); Maßnahmen: Netztrennung, Zugriffsschutz, Integritätsprüfung, Monitoring (2 P.)."),
          w("b", "b) Wie ist das Überwachungssystem (nur Hinweise zur Inspektionsplanung) nach AI Act voraussichtlich einzustufen?", 2, ["Nicht als Hochrisiko-System, da es kein Sicherheitsbauteil für den Betrieb kritischer Infrastruktur ist", "Als verbotene Praktik", "Immer als Hochrisiko, da Energie", "Als allgemeines KI-Modell"], 0),
          t("c", "c) Sollte das System Anlagen bei einem Alarm automatisch abschalten? Wägen Sie ab.", 4, "Pro: schneller Schutz vor Folgeschäden (1 P.); contra: Fehlalarmquote hoch → Ertragsausfall, Haftung; Abschaltung würde Sicherheitsfunktion → strengere Anforderungen (2 P.); Empfehlung: Mensch entscheidet, Automatik nur bei klaren Grenzwerten der Anlagensteuerung (1 P.)."),
          t("d", "d) Was dokumentieren Sie, um im Schadensfall nachweisen zu können, dass sorgfältig gearbeitet wurde?", 4, "Je 1 P.: Modellversion und Schwellen, Alarme mit Zeitpunkt und Reaktion, Datenqualität/Validierung, Evaluationsergebnisse und Grenzen, Zuständigkeiten/Freigaben, Änderungen.")
        ],
        loesung: "<p>a) Manipulierte Sensordaten oder Modelle, Zugriff auf das Leitsystem. Energieerzeuger können als kritische Infrastruktur unter das IT-Sicherheitsrecht fallen (Risikomanagement, Meldepflichten). Maßnahmen: Netzsegmentierung, Zugriffsschutz, Integritätsprüfungen, Monitoring.</p><p>b) Voraussichtlich kein Hochrisiko-System.</p><p>c) Automatische Abschaltung schützt schnell, führt aber bei 26 von 30 Fehlalarmen zu unnötigen Ertragsausfällen und würde das System zur Sicherheitsfunktion machen. Empfehlung: Mensch entscheidet; harte Grenzwerte bleiben in der Anlagensteuerung.</p><p>d) Modellversion, Schwellen, Alarme und Reaktionen, Datenprüfungen, Evaluationsergebnisse, Zuständigkeiten und Änderungen.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
