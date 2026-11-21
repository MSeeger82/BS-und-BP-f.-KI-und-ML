/* Bachelor-Prüfungssatz 10 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s10a", satz: 10, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Generative KI", text: "",
        teile: [
          w("a", "a) Was zeichnet generative KI aus?", 2, ["sie erzeugt neue Inhalte wie Texte oder Bilder", "sie sortiert nur Daten", "sie arbeitet ohne Modell", "sie ist immer regelbasiert"], 0),
          t("b", "b) Unterscheiden Sie diskriminative und generative Modelle mit je einem Beispiel.", 4, "Diskriminativ: lernt Grenze zwischen Klassen/Vorhersage eines Labels, z. B. Retourenprognose (2 P.); generativ: lernt Verteilung der Daten und erzeugt neue Beispiele, z. B. Produkttext, Bild (2 P.)."),
          w("c", "c) Welches Verfahren ist typisch für die Bildgenerierung?", 2, ["Diffusionsmodell", "k-Means", "lineare Regression", "Entscheidungsbaum"], 0),
          w("d", "d) Was ist ein Token?", 2, ["eine Texteinheit, z. B. ein Wort oder Wortteil, die das Modell verarbeitet", "ein Passwort", "ein Bild", "eine Datenbank"], 0)
        ],
        loesung: "<p>a) erzeugt Inhalte · b) Label vorhersagen vs. Inhalte erzeugen · c) Diffusionsmodell · d) Texteinheit.</p>" },

      { titel: "Bestellwerte", text: "<p>Bestellwerte in €: <b>20, 35, 35, 40, 60, 90</b>.</p>",
        teile: [
          z("a", "a) Mittelwert (zwei Nachkommastellen)", 2, 46.67, 0.01, "€"),
          z("b", "b) Median", 2, 37.5, 0.01, "€"),
          z("c", "c) Modus", 2, 35, 0, "€"),
          z("d", "d) Anteil der Bestellungen über 50 € in % (zwei Nachkommastellen)", 2, 33.33, 0.05, "%"),
          t("e", "e) Das Marketing will den „typischen Warenkorb“ berichten. Welche Kennzahl empfehlen Sie, und welche ergänzen Sie?", 4, "Median als robust gegen große Bestellungen (2 P.); ergänzend Mittelwert für Umsatzplanung bzw. Verteilung/Quartile (2 P.).")
        ],
        loesung: "<p>a) 280 / 6 ≈ <b>46,67 €</b> · b) (35 + 40) / 2 = <b>37,5 €</b> · c) <b>35 €</b> · d) 2 / 6 ≈ <b>33,33 %</b> · e) Median plus Mittelwert bzw. Quartile.</p>" },

      { titel: "Assoziationsregeln", text: "<p>Von 100 Warenkörben enthalten 30 eine Kamera, 40 eine Speicherkarte und 20 beides.</p>",
        teile: [
          z("a", "a) Support von {Kamera, Speicherkarte} in %", 3, 20, 0.1, "%"),
          z("b", "b) Konfidenz der Regel Kamera → Speicherkarte in % (zwei Nachkommastellen)", 3, 66.67, 0.1, "%"),
          z("c", "c) Lift der Regel (drei Nachkommastellen)", 3, 1.667, 0.005),
          w("d", "d) Was bedeutet ein Lift größer als 1?", 3, ["die Artikel werden häufiger zusammen gekauft als bei Unabhängigkeit zu erwarten", "die Regel ist falsch", "Kamera verursacht den Kauf der Speicherkarte sicher", "beide werden nie zusammen gekauft"], 0)
        ],
        loesung: "<p>a) 20 / 100 = <b>20 %</b> · b) 20 / 30 ≈ <b>66,67 %</b> · c) 0,6667 / 0,4 ≈ <b>1,667</b> · d) überzufällig häufig zusammen (keine Kausalität).</p>" },

      { titel: "Kollaboratives Filtern", text: "<p>Nutzer A hat zwei Artikel mit 5 und 3 Sternen bewertet, Nutzer B dieselben mit 4 und 2. B hat einen dritten Artikel mit 5 Sternen bewertet, A noch nicht.</p>",
        teile: [
          z("a", "a) Kosinusähnlichkeit von A und B auf den gemeinsamen Artikeln (vier Nachkommastellen)", 4, 0.9971, 0.002),
          w("b", "b) Wie schätzt nutzerbasiertes kollaboratives Filtern A's Bewertung des dritten Artikels?", 3, ["aus den Bewertungen ähnlicher Nutzer wie B, gewichtet mit der Ähnlichkeit", "aus dem Preis", "zufällig", "aus der Produktbeschreibung allein"], 0),
          w("c", "c) Welches Problem hat das Verfahren bei neuen Artikeln?", 3, ["Kaltstart – es fehlen Bewertungen", "Overfitting", "zu viele Daten", "Halluzinationen"], 0)
        ],
        loesung: "<p>a) (20 + 6) / (√34 · √20) ≈ 26 / 26,08 ≈ <b>0,9971</b> · b) Bewertungen ähnlicher Nutzer · c) Kaltstart.</p>" },

      { titel: "Retouren vorhersagen", text: "<p>1.000 Bestellungen, davon 250 Retouren. Das Modell sagt 250 Retouren voraus, davon 175 richtig. Prozentwerte.</p>",
        teile: [
          z("a", "a) Precision", 2, 70, 0.1, "%"),
          z("b", "b) Recall", 2, 70, 0.1, "%"),
          z("c", "c) Accuracy", 2, 85, 0.1, "%"),
          z("d", "d) F1-Score", 2, 70, 0.1, "%"),
          t("e", "e) Nennen Sie zwei Maßnahmen bei hoher Retourenwahrscheinlichkeit, die Kunden nicht benachteiligen.", 4, "Je 2 P.: Größenberatung/Passformhinweise, bessere Produktbilder/Beschreibung, Hinweis bei Mehrfachbestellung gleicher Artikel in mehreren Größen, Bewertungen anderer Kunden anzeigen."),
        ],
        loesung: "<p>TP = 175, FP = 75, FN = 75, TN = 675. a) <b>70 %</b> · b) <b>70 %</b> · c) 850 / 1.000 = <b>85 %</b> · d) <b>70 %</b> · e) Größenberatung, bessere Beschreibung.</p>" },

      { titel: "Python", text: "<pre class=\"code\">preise = {\"A\": 19.99, \"B\": 5.50, \"C\": 12.00}\nkorb = [\"A\", \"C\", \"C\"]\nsumme = sum(preise[p] for p in korb)\nprint(round(summe, 2))\nprint(round(summe * 1.19, 2))\nprint(min(preise, key=preise.get))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 43.99, 0.001),
          z("b", "b) Zweite Ausgabe", 3, 52.35, 0.001),
          w("c", "c) Dritte Ausgabe", 2, ["B", "A", "C", "5.5"], 0),
          w("d", "d) Was ist (preise[p] for p in korb)?", 2, ["ein Generatorausdruck, der die Preise der Artikel im Korb liefert", "eine Funktion", "ein Dictionary", "ein Fehler"], 0)
        ],
        loesung: "<p>a) 19,99 + 12 + 12 = <b>43.99</b> · b) · 1,19 = <b>52.35</b> · c) günstigster Artikel <b>B</b> · d) Generatorausdruck.</p>" },

      { titel: "Datenschutz im Onlinehandel", text: "",
        teile: [
          w("a", "a) Was gilt für nicht notwendige Tracking-Cookies?", 2, ["sie brauchen eine Einwilligung (TDDDG)", "sie sind immer erlaubt", "sie sind immer verboten", "nur bei Neukunden"], 0),
          t("b", "b) Auf welche Rechtsgrundlage stützen Sie personalisierte Empfehlungen, und was ist zu beachten?", 4, "Berechtigtes Interesse oder Einwilligung je nach Datenumfang/Tracking (2 P.); Interessenabwägung, Transparenz in der Datenschutzerklärung, Widerspruchsmöglichkeit (2 P.)."),
          w("c", "c) Ein Kunde widerspricht der Nutzung seiner Daten für Werbung. Was gilt?", 2, ["die Daten dürfen für Direktwerbung nicht mehr genutzt werden", "nichts", "nur nach einem Jahr", "nur mit Zustimmung des Händlers"], 0),
          w("d", "d) Welcher Grundsatz spricht gegen das Speichern aller Klicks für unbegrenzte Zeit?", 2, ["Speicherbegrenzung", "Richtigkeit", "Integrität", "Rechtmäßigkeit allein"], 0),
          w("e", "e) Ein externer Dienst wertet Shopdaten im Auftrag aus. Was ist nötig?", 2, ["Auftragsverarbeitungsvertrag nach Art. 28 DSGVO", "nichts", "eine Gewerbeanmeldung", "eine Patentlizenz"], 0)
        ],
        loesung: "<p>a) Einwilligung · b) berechtigtes Interesse oder Einwilligung mit Transparenz und Widerspruch · c) keine Direktwerbung mehr · d) Speicherbegrenzung · e) AV-Vertrag.</p>" },

      { titel: "Empfehlungen messen", text: "<p>Ein Empfehlungsfeld wurde 50.000-mal angezeigt und 1.500-mal angeklickt; 120 Klicks führten zum Kauf.</p>",
        teile: [
          w("a", "a) Was unterscheidet Offline- und Online-Evaluation?", 2, ["offline mit historischen Daten, online mit echten Nutzern im Betrieb", "es gibt keinen Unterschied", "offline ist immer genauer", "online braucht keine Daten"], 0),
          z("b", "b) Klickrate (CTR) in %", 2, 3, 0.01, "%"),
          z("c", "c) Konversionsrate vom Klick zum Kauf in %", 2, 8, 0.01, "%"),
          t("d", "d) Warum testen Sie ein neues Empfehlungsmodell in einem A/B-Test?", 4, "Offline-Kennzahlen bilden echtes Verhalten nur begrenzt ab (2 P.); zufällige Aufteilung zeigt den kausalen Effekt auf Umsatz/Klicks (2 P.).")
        ],
        loesung: "<p>a) historisch vs. live · b) 1.500 / 50.000 = <b>3 %</b> · c) 120 / 1.500 = <b>8 %</b> · d) echter, kausaler Effekt.</p>" },

      { titel: "Recht und generative KI", text: "",
        teile: [
          w("a", "a) Was verlangt Art. 50 der KI-Verordnung für KI-erzeugte Bilder?", 2, ["Anbieter von Generatoren kennzeichnen Ausgaben maschinenlesbar; Deepfakes muss der Betreiber offenlegen", "keine Pflichten", "Verbot aller KI-Bilder", "nur Schutz durch Patente"], 0),
          w("b", "b) Ist ein vollständig KI-generierter Produkttext urheberrechtlich geschützt?", 2, ["ohne prägende menschliche Gestaltung nach herrschender Auffassung nicht", "ja, immer", "nur nach Anmeldung", "nur bei mehr als 1.000 Wörtern"], 0),
          t("c", "c) Nennen Sie zwei rechtliche Risiken KI-generierter Produktbeschreibungen.", 4, "Je 2 P.: falsche/irreführende Angaben (Wettbewerbsrecht, Gewährleistung), Übernahme geschützter Texte Dritter, fremde Marken, fehlende Pflichtangaben."),
          w("d", "d) Ein Fotograf hat in der robots.txt einen Nutzungsvorbehalt gegen Text- und Data-Mining erklärt. Folge?", 2, ["seine Bilder dürfen nicht für das Training genutzt werden (§ 44b UrhG)", "keine Folge", "nur für Forschung verboten", "nur Videos betroffen"], 0),
          w("e", "e) Was gilt für einen KI-Chatbot im Kundenservice?", 2, ["Kunden müssen erkennen können, dass sie mit KI kommunizieren", "keine Pflicht", "Verbot", "Hochrisiko"], 0)
        ],
        loesung: "<p>a) maschinenlesbare Kennzeichnung durch Anbieter, Offenlegung von Deepfakes · b) kein Schutz · c) Irreführung, fremde Rechte · d) kein Training · e) KI-Hinweis.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s10b", satz: 10, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Matrixfaktorisierung", text: "<p>Nutzerfaktor p = (1,2; 0,5), Artikelfaktor q = (2,0; 1,0). Die Vorhersage ist das Skalarprodukt.</p>",
        teile: [
          z("a", "a) Vorhergesagte Bewertung", 4, 2.9, 0.001),
          t("b", "b) Was bedeuten latente Faktoren?", 4, "Verborgene Eigenschaften, die aus Bewertungsmustern gelernt werden (2 P.), z. B. Vorliebe für Profi- vs. Freizeitausrüstung, ohne dass sie vorgegeben sind (2 P.)."),
          w("c", "c) Mit welchem Verfahren lernt man die Faktoren typischerweise?", 2, ["stochastischer Gradientenabstieg oder Alternating Least Squares", "k-Means", "Entscheidungsbaum", "Apriori"], 0),
          w("d", "d) Warum regularisiert man bei dünn besetzten Bewertungsmatrizen?", 2, ["um Overfitting auf wenige Bewertungen zu vermeiden", "um mehr Nutzer zu gewinnen", "um Daten zu löschen", "um schneller zu speichern"], 0)
        ],
        loesung: "<p>a) 1,2 · 2,0 + 0,5 · 1,0 = <b>2,9</b> · b) verborgene, gelernte Eigenschaften · c) SGD oder ALS · d) Overfitting vermeiden.</p>" },

      { titel: "Ranking-Kennzahlen", text: "<p>Ein Nutzer hat 4 relevante Artikel; 2 davon erscheinen in den Top 10. Der erste relevante Artikel steht auf Rang 3.</p>",
        teile: [
          z("a", "a) Recall@10", 3, 0.5, 0.001),
          z("b", "b) Reciprocal Rank (drei Nachkommastellen)", 3, 0.333, 0.002),
          t("c", "c) Was ist der Beliebtheits-Bias von Empfehlungssystemen, und warum ist er problematisch?", 4, "Populäre Artikel werden überproportional empfohlen und dadurch noch beliebter (2 P.); Nischenartikel und neue Produkte werden kaum gezeigt, Vielfalt und Umsatzpotenzial sinken (2 P.)."),
          w("d", "d) Welche Eigenschaften neben der Treffergenauigkeit sollte man messen?", 2, ["Diversität und Neuheit (Serendipität)", "nur die Rechenzeit", "nur die Anzahl der Nutzer", "keine"], 0)
        ],
        loesung: "<p>a) 2 / 4 = <b>0,5</b> · b) 1 / 3 ≈ <b>0,333</b> · c) Selbstverstärkung des Beliebten · d) Diversität und Neuheit.</p>" },

      { titel: "Produkttexte mit Sprachmodellen", text: "<p>20.000 Produkttexte sollen erzeugt werden, je etwa 1.500 Ausgabetokens. Preis: 8 € je 1 Mio. Ausgabetokens.</p>",
        teile: [
          t("a", "a) Beschreiben Sie eine Pipeline zur Erzeugung der Texte.", 4, "Strukturierte Stammdaten als Eingabe (1 P.); Prompt mit Stil- und Pflichtangaben (1 P.); Generierung im Batch (1 P.); automatische Prüfung und redaktionelle Freigabe (1 P.)."),
          z("b", "b) Kosten der Ausgabetokens in €", 3, 240, 0.01, "€"),
          t("c", "c) Wie prüfen Sie die Texte automatisch auf sachliche Fehler?", 4, "Abgleich genannter Werte (Maße, Material, Gewicht) mit den Stammdaten (2 P.); Verbotsliste für Aussagen (z. B. Gesundheitsversprechen), Stichproben durch Redaktion (2 P.)."),
          w("d", "d) Welche Temperatur wählen Sie für faktentreue Produkttexte?", 3, ["niedrig", "sehr hoch", "zufällig", "egal"], 0)
        ],
        loesung: "<p>a) Stammdaten → Prompt → Batch → Prüfung und Freigabe · b) 20.000 · 1.500 = 30 Mio. Tokens · 8 € / 1 Mio. = <b>240 €</b> · c) Abgleich mit Stammdaten, Verbotsliste, Stichproben · d) niedrig.</p>" },

      { titel: "Bilder erzeugen", text: "",
        teile: [
          t("a", "a) Erklären Sie das Prinzip eines Diffusionsmodells.", 4, "Training: Bilder schrittweise verrauschen, Modell lernt das Rauschen zu entfernen (2 P.); Erzeugung: aus reinem Rauschen schrittweise ein Bild passend zum Text-Prompt (2 P.)."),
          w("b", "b) Was ist Inpainting?", 2, ["einen Bildbereich gezielt neu erzeugen oder ersetzen", "Bilder drucken", "Bilder komprimieren", "Farben zählen"], 0),
          t("c", "c) Nennen Sie zwei Risiken KI-generierter Produktbilder.", 4, "Je 2 P.: Produkt wird anders dargestellt als geliefert (Irreführung, Retouren), fremde Marken/Logos, Abbildung realer Personen, Kennzeichnungspflichten."),
        ],
        loesung: "<p>a) Rauschen lernen zu entfernen, aus Rauschen erzeugen · b) Bildbereich ersetzen · c) Irreführung, fremde Rechte.</p>" },

      { titel: "A/B-Test des Empfehlungsfelds", text: "<p>Variante A: 20.000 Besuche, 600 Käufe. Variante B: 20.000 Besuche, 700 Käufe. Durchschnittlicher Warenkorb 60 €.</p>",
        teile: [
          z("a", "a) Relativer Anstieg der Konversionsrate in % (zwei Nachkommastellen)", 3, 16.67, 0.05, "%"),
          z("b", "b) Zusätzlicher Umsatz im Testzeitraum in €", 3, 6000, 0, "€"),
          t("c", "c) Nennen Sie zwei typische Fehler bei A/B-Tests.", 4, "Je 2 P.: vorzeitiges Abbrechen beim ersten Signifikanzblick (Peeking), Neuheitseffekt, zu kleine Stichprobe, mehrere Kennzahlen ohne Korrektur, unsaubere Randomisierung."),
          w("d", "d) Warum werden Besucher zufällig auf A und B verteilt?", 2, ["damit sich die Gruppen nur in der Variante unterscheiden", "um Kosten zu sparen", "weil es schneller lädt", "aus Datenschutzgründen"], 0)
        ],
        loesung: "<p>a) (3,5 % − 3,0 %) / 3,0 % ≈ <b>16,67 %</b> · b) 100 · 60 = <b>6.000 €</b> · c) Peeking, Neuheitseffekt · d) vergleichbare Gruppen.</p>" },

      { titel: "Schwellen und Kosten", text: "<p>Aus Aufgabe 5 in Bereich A: Das Retourenmodell markiert 250 Bestellungen, 175 davon wären Retouren. Ein Größenhinweis kostet 1 € je markierter Bestellung und verhindert 30 % der richtig erkannten Retouren. Eine Retoure kostet 12 €.</p>",
        teile: [
          t("a", "a) Was zeigen ROC-Kurve und AUC?", 4, "ROC: True-Positive-Rate gegen False-Positive-Rate über alle Schwellen (2 P.); AUC: Fläche darunter, Trennfähigkeit unabhängig von einer Schwelle (2 P.)."),
          w("b", "b) Wie wählen Sie die Schwelle im Betrieb?", 2, ["nach den Kosten der Fehlerarten und dem Nutzen der Maßnahme", "immer 0,5", "nach der Uhrzeit", "zufällig"], 0),
          z("c", "c) Nettoersparnis der Maßnahme in €", 4, 380, 0.01, "€")
        ],
        loesung: "<p>a) TPR gegen FPR; Fläche als Trennmaß · b) nach Kosten und Nutzen · c) 0,3 · 175 · 12 = 630 €; minus 250 € → <b>380 €</b>.</p>" },

      { titel: "Transparenz von Empfehlungen", text: "",
        teile: [
          t("a", "a) Wie erklären Sie Kunden „Warum sehe ich diese Empfehlung?“", 4, "Verständlicher Grund, z. B. „weil Sie X angesehen haben“ (2 P.); Möglichkeit, Personalisierung abzuschalten oder Interessen anzupassen (2 P.)."),
          w("b", "b) Welche Erklärung passt zu einer artikelbasierten Empfehlung?", 2, ["„Kunden, die dieses Zelt kauften, kauften auch …“", "„Zufällig ausgewählt“", "„Weil das Wetter gut ist“", "„Weil der Preis hoch ist“"], 0),
          w("c", "c) Was ist eine Filterblase?", 2, ["Nutzer sehen fast nur noch Ähnliches zu bisherigen Interessen", "ein Spamfilter", "ein Datenbankfehler", "ein Cookie"], 0)
        ],
        loesung: "<p>a) Grund nennen, Steuerung ermöglichen · b) „Kunden, die … kauften“ · c) einseitige Empfehlungen.</p>" },

      { titel: "Python mit scikit-learn", text: "<pre class=\"code\">from sklearn.metrics import precision_score, recall_score\ny_true = [1, 1, 0, 1, 0, 0, 1, 0, 0, 1]\ny_pred = [1, 0, 0, 1, 1, 0, 1, 0, 0, 0]\nprint(precision_score(y_true, y_pred))\nprint(recall_score(y_true, y_pred))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 0.75, 0.001),
          z("b", "b) Zweite Ausgabe", 3, 0.6, 0.001),
          z("c", "c) F1-Score (vier Nachkommastellen)", 2, 0.6667, 0.002),
          w("d", "d) Welcher Parameter steuert bei mehreren Klassen die Mittelung der Kennzahl?", 2, ["average (z. B. macro, weighted)", "random_state", "test_size", "n_jobs"], 0)
        ],
        loesung: "<p>TP = 3, FP = 1, FN = 2. a) 3 / 4 = <b>0,75</b> · b) 3 / 5 = <b>0,6</b> · c) 2 · 0,75 · 0,6 / 1,35 ≈ <b>0,6667</b> · d) average.</p>" },

      { titel: "Betrieb und Kosten generativer KI", text: "",
        teile: [
          t("a", "a) Nennen Sie zwei Wege, die laufenden Kosten generativer KI zu senken.", 4, "Je 2 P.: kleinere Modelle für einfache Aufgaben, Caching wiederkehrender Antworten, kürzere Prompts, Batch-Verarbeitung, nur bei Änderungen neu erzeugen."),
          w("b", "b) Produkttexte werden nur bei Stammdatenänderungen neu benötigt. Welche Verarbeitung passt?", 2, ["Batch, z. B. nachts", "Echtzeit bei jedem Seitenaufruf", "manuell", "gar nicht"], 0),
          t("c", "c) Wie überwachen Sie die Qualität der generierten Inhalte im Betrieb?", 4, "Stichproben und Fehlerquote durch Redaktion (2 P.); Kundenfeedback/Retourengründe und Beschwerden auswerten, Alarme bei Auffälligkeiten (2 P.)."),
          w("d", "d) Warum versioniert man Prompts?", 2, ["damit Änderungen nachvollziehbar und Ergebnisse reproduzierbar sind", "um Speicher zu sparen", "aus Steuergründen", "um Tokens zu zählen"], 0)
        ],
        loesung: "<p>a) kleinere Modelle, Caching, Batch · b) Batch · c) Stichproben, Feedback, Alarme · d) Nachvollziehbarkeit.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s10t2", satz: 10, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – Personalisierung und generative KI im Onlinehandel", kurz: "Onlinehandel · Empfehlungen und GenAI", minuten: 240,
    situation: "<p>Die <b>Nordlicht Outdoor GmbH</b> (320 Beschäftigte, Betriebsrat, Umsatz 140 Mio. €) verkauft 25.000 Artikel über den eigenen Onlineshop. Jährlich gehen 1,2 Mio. Bestellungen ein; die Retourenquote liegt bei 28 %. Jedes Jahr kommen 6.000 neue Artikel hinzu, deren Texte das Content-Team schreibt (40 Minuten je Artikel).</p><p>Die Geschäftsführung möchte drei Vorhaben umsetzen: (1) personalisierte Produktempfehlungen, (2) generative KI für Produkttexte und Produktbilder und (3) einen KI-Chatbot im Kundenservice. Das Budget reicht zunächst für zwei Vorhaben. Sie verantworten die Umsetzung.</p>",
    aufgaben: [
      { titel: "Lösungen konzipieren", text: "",
        teile: [
          t("a", "a) Beschreiben Sie das Empfehlungssystem (Daten, Verfahren, Ausspielung, Messung).", 6, "Daten: Käufe, Klicks, Artikelmerkmale (1 P.); Verfahren: Kombination kollaborativ und inhaltsbasiert, Kaltstart über Merkmale (2 P.); Ausspielung auf Produkt- und Warenkorbseite (1 P.); Einwilligung/Transparenz (1 P.); A/B-Test, CTR, Konversion, Umsatz (1 P.)."),
          z("b", "b) Die Empfehlungen sollen den Umsatz um 2 % steigern. Mehrumsatz pro Jahr", 2, 2800000, 0, "€"),
          t("c", "c) Beschreiben Sie den Arbeitsablauf für KI-Produkttexte mit Qualitätssicherung.", 4, "Stammdaten als Grundlage (1 P.); Generierung nach Stilvorgaben (1 P.); automatische Prüfung gegen Stammdaten (1 P.); redaktionelle Freigabe vor Veröffentlichung (1 P.)."),
          z("d", "d) Mit KI sinkt der Aufwand je Text von 40 auf 15 Minuten. Eingesparte Stunden pro Jahr", 2, 2500, 0, "h"),
          w("e", "e) Welche Maßnahme hilft gegen die hohe Retourenquote am direktesten?", 2, ["Größen- und Passformberatung auf Basis von Retourendaten", "mehr Werbung", "höhere Preise", "weniger Produktbilder"], 0)
        ],
        loesung: "<p>a) Hybrides Empfehlungssystem mit Kaltstartlösung, Ausspielung, Einwilligung, A/B-Test · b) 2 % von 140 Mio. € = <b>2,8 Mio. €</b> · c) Stammdaten → Generierung → Prüfung → Freigabe · d) 6.000 · 25 / 60 = <b>2.500 h</b> · e) Größenberatung.</p>" },

      { titel: "Retourenprozess", text: "<p>Ziel ist eine Retourenquote von 24 %. Eine Retoure kostet im Mittel 12 €.</p>",
        teile: [
          z("a", "a) Vermiedene Retouren pro Jahr", 3, 48000, 0),
          z("b", "b) Eingesparte Retourenkosten pro Jahr", 3, 576000, 0, "€"),
          t("c", "c) Beschreiben Sie einen Prozess zur Retourenvermeidung mit KI.", 3, "Retourengründe auswerten (Text-Mining) (1 P.); Größenempfehlung im Shop/Hinweis bei Mehrfachgrößen (1 P.); Rückmeldung an Einkauf und Produktdaten (1 P.)."),
          t("d", "d) Nennen Sie zwei Kennzahlen zur Steuerung.", 3, "Retourenquote je Kategorie, Anteil Retouren wegen Größe, Nutzung der Größenberatung, Kundenzufriedenheit (je 1,5 P.).")
        ],
        loesung: "<p>a) 1,2 Mio. · 4 % = <b>48.000</b> · b) 48.000 · 12 € = <b>576.000 €</b> · c) Gründe auswerten, beraten, rückmelden · d) z. B. Retourenquote je Kategorie.</p>" },

      { titel: "Priorisierung und Vorgehen", text: "<p>Nutzwertanalyse mit Nutzen 50 %, Machbarkeit 30 %, geringes Risiko 20 %. Empfehlungen: 9 / 7 / 7 · Generative Texte und Bilder: 7 / 8 / 5 · Chatbot: 6 / 8 / 6.</p>",
        teile: [
          z("a", "a) Nutzwert Empfehlungen", 2, 8, 0.01),
          z("b", "b) Nutzwert generative Texte und Bilder", 2, 6.9, 0.01),
          z("c", "c) Nutzwert Chatbot", 2, 6.6, 0.01),
          w("d", "d) Welche zwei Vorhaben setzen Sie zuerst um?", 2, ["Empfehlungen und generative Texte/Bilder", "Chatbot und Empfehlungen", "generative Texte und Chatbot", "nur der Chatbot"], 0),
          t("e", "e) Wie starten Sie den Chatbot später mit einem minimalen Produkt (MVP)?", 4, "Begrenzte Themen, z. B. Lieferstatus und Rücksendungen (1 P.); kleine Nutzergruppe/Pilotzeit (1 P.); klare Hypothese und Kennzahl (1 P.); Übergabe an Menschen, danach weiter, schwenken oder stoppen (1 P.)."),
          w("f", "f) In welchem Scrum-Ereignis prüfen Sie das Ergebnis mit dem Marketing?", 2, ["Sprint Review", "Daily Scrum", "Sprint Retrospective", "Sprint Planning"], 0)
        ],
        loesung: "<p>a) 4,5 + 2,1 + 1,4 = <b>8,0</b> · b) 3,5 + 2,4 + 1,0 = <b>6,9</b> · c) 3,0 + 2,4 + 1,2 = <b>6,6</b> · d) Empfehlungen und generative Inhalte · e) begrenzter Pilot mit Hypothese · f) Sprint Review.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Wie sind Produktempfehlungen nach der KI-Verordnung einzustufen?", 2, ["minimales Risiko", "Hochrisiko", "verboten", "GPAI mit systemischem Risiko"], 0),
          w("b", "b) Welche Pflicht gilt für den Kundenservice-Chatbot?", 2, ["Hinweis, dass Kunden mit einer KI kommunizieren", "keine", "Konformitätsbewertung", "Verbot"], 0),
          t("c", "c) Welche rechtlichen Punkte prüfen Sie bei KI-generierten Texten und Bildern?", 6, "Irreführung/Wettbewerbsrecht: Bilder und Texte müssen dem Produkt entsprechen (2 P.); Urheberrecht: kein eigener Schutz, Rechte Dritter (Trainingsdaten, Vorlagen) beachten (2 P.); Marken und Kennzeichnung, Anbieterbedingungen des Generators (2 P.)."),
          t("d", "d) Welche datenschutzrechtlichen Anforderungen gelten für die Personalisierung?", 4, "Einwilligung für Tracking-Cookies nach TDDDG (1 P.); Rechtsgrundlage für Profiling, Interessenabwägung (1 P.); Transparenz in der Datenschutzerklärung (1 P.); Widerspruch gegen Werbung, Löschfristen (1 P.)."),
          w("e", "e) Muss Nordlicht nach Omnibus I einen CSRD-Nachhaltigkeitsbericht erstellen?", 2, ["nein, unter 1.000 Beschäftigten", "ja", "nur bei Börsengang", "nur bei Export"], 0),
          w("f", "f) Gelten die Transparenzpflichten für Empfehlungssysteme nach Art. 27 Digital Services Act für den eigenen Onlineshop?", 2, ["nein, sie gelten für Online-Plattformen, die Inhalte Dritter verbreiten; Transparenz bleibt sinnvoll", "ja, immer", "nur für Bücher", "nur in den USA"], 0)
        ],
        loesung: "<p>a) minimales Risiko · b) KI-Hinweis · c) Irreführung, Urheberrecht, Marken · d) Einwilligung, Rechtsgrundlage, Transparenz, Widerspruch · e) nein · f) nein, Plattformpflicht.</p>" },

      { titel: "Wirtschaftlichkeit der Empfehlungen", text: "<p>Deckungsbeitragsquote 30 % auf den Mehrumsatz aus Aufgabe 1. Laufende Kosten 200.000 € pro Jahr, Investition 500.000 €, Nutzungsdauer 3 Jahre, Zins 8 % (Rentenbarwertfaktor 2,5771).</p>",
        teile: [
          z("a", "a) Zusätzlicher Deckungsbeitrag pro Jahr", 3, 840000, 0, "€"),
          z("b", "b) Jährlicher Rückfluss", 2, 640000, 0, "€"),
          z("c", "c) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 2, 0.78, 0.01, "Jahre"),
          z("d", "d) Kapitalwert", 4, 1149344, 10, "€"),
          t("e", "e) Warum rechnen Sie mit dem Deckungsbeitrag statt mit dem Umsatz?", 3, "Mehrumsatz verursacht variable Kosten wie Wareneinsatz, Versand, Retouren (2 P.); nur der Deckungsbeitrag trägt zur Deckung der Fixkosten und zum Gewinn bei (1 P.).")
        ],
        loesung: "<p>a) 2,8 Mio. · 30 % = <b>840.000 €</b> · b) 840.000 − 200.000 = <b>640.000 €</b> · c) 500.000 / 640.000 ≈ <b>0,78 Jahre</b> · d) 640.000 · 2,5771 − 500.000 ≈ <b>1.149.344 €</b> · e) variable Kosten berücksichtigen.</p>" },

      { titel: "Personal und Führung", text: "",
        teile: [
          t("a", "a) Wie verändert sich die Arbeit des Content-Teams, und wie qualifizieren Sie es?", 4, "Weniger Schreiben, mehr Prompting, Prüfen, Redigieren, Stil und Markenführung (2 P.); Schulung zu GenAI, Prüfroutinen, Rechtsfragen, Lernzeit (2 P.)."),
          w("b", "b) Der Chatbot soll auch auswerten, wie schnell Servicemitarbeitende Übergaben bearbeiten. Was ist nötig?", 2, ["Mitbestimmung des Betriebsrats nach § 87 Abs. 1 Nr. 6 BetrVG", "nichts", "nur eine E-Mail an alle", "Zustimmung des Kunden"], 0),
          t("c", "c) Marketing will schnell starten, die IT pocht auf Sicherheit. Wie lösen Sie den Konflikt nach dem Harvard-Konzept?", 4, "Interessen klären: Tempo vs. Stabilität/Sicherheit (1 P.); gemeinsame Kriterien vereinbaren (1 P.); Optionen wie Pilot mit begrenztem Umfang und Sicherheitscheck (1 P.); Entscheidung dokumentieren (1 P.)."),
          w("d", "d) Eine neue, motivierte Texterin hat noch keine Erfahrung mit KI-Werkzeugen. Welcher Führungsstil passt?", 2, ["verkaufen/trainieren", "delegieren", "laissez-faire", "beteiligen ohne Anleitung"], 0)
        ],
        loesung: "<p>a) Prüfen und Redigieren statt Schreiben; Schulung · b) § 87 Abs. 1 Nr. 6 · c) Interessen, Kriterien, Pilot · d) verkaufen/trainieren.</p>" },

      { titel: "Zukunftskompetenzen", text: "",
        teile: [
          t("a", "a) Reflektieren Sie ethisch: Wo endet sinnvolle Personalisierung, wo beginnt Manipulation?", 4, "Hilfreich: passende Produkte, Zeitersparnis (1 P.); Manipulation: künstliche Knappheit, Druck, Ausnutzen von Schwächen (Dark Patterns) (2 P.); Leitlinie: Transparenz, Wahlfreiheit, Kundennutzen (1 P.)."),
          t("b", "b) Skizzieren Sie die Präsentation Ihrer Empfehlung an die Geschäftsführung.", 4, "Empfehlung zuerst (1 P.); Nutzwert und Wirtschaftlichkeit (1 P.); Risiken und Recht (1 P.); Zeitplan und Entscheidungsbedarf (1 P.)."),
          w("c", "c) Ein Lieferant sitzt in einem Land mit hoher Machtdistanz. Was erwarten Sie eher?", 2, ["Entscheidungen werden von oben getroffen und erwartet", "alle entscheiden gemeinsam", "Hierarchie spielt keine Rolle", "Kritik am Chef ist üblich"], 0),
          w("d", "d) Das Team will nach dem Projektabschnitt seine Zusammenarbeit verbessern. Format?", 2, ["Retrospektive", "Lenkungsausschuss", "Audit", "Kündigungsgespräch"], 0),
          w("e", "e) Kunden mit Empfehlungen kaufen mehr. Was beweist das allein?", 2, ["nichts über die Ursache – es kann an anderen Faktoren liegen; A/B-Test nötig", "dass Empfehlungen den Umsatz steigern", "dass Kunden manipuliert werden", "dass das Modell perfekt ist"], 0)
        ],
        loesung: "<p>a) Nutzen vs. Dark Patterns; Transparenz und Wahlfreiheit · b) Empfehlung, Zahlen, Risiken, Entscheidung · c) Entscheidungen von oben · d) Retrospektive · e) Korrelation ist keine Kausalität.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
