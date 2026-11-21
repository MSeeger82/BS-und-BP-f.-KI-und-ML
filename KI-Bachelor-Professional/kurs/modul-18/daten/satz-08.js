/* Bachelor-Prüfungssatz 8 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s08a", satz: 8, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Matching und Empfehlungen", text: "",
        teile: [
          w("a", "a) Ein System sortiert Bewerbungen nach Eignung für eine Stelle. Das ist vor allem …", 2, ["eine Rangfolgebildung (Ranking)", "Clustering", "bestärkendes Lernen", "Bilderkennung"], 0),
          t("b", "b) Unterscheiden Sie inhaltsbasierte Empfehlungen und kollaboratives Filtern.", 4, "Inhaltsbasiert: Ähnlichkeit von Merkmalen (Skills der Person und Anforderungen der Stelle) (2 P.); kollaborativ: Muster aus Verhalten vieler Nutzer, „wer X mochte, mochte auch Y“ (2 P.)."),
          w("c", "c) Welches Maß eignet sich für die Ähnlichkeit von Textvektoren?", 2, ["Kosinusähnlichkeit", "Median", "Varianz", "Accuracy"], 0),
          w("d", "d) Welche Aufgabe ist unüberwachtes Lernen?", 2, ["Bewerberprofile ohne Vorgaben in Gruppen ähnlicher Profile einteilen", "Eignung aus gekennzeichneten Fällen vorhersagen", "Gehalt aus Berufsjahren schätzen", "Lebensläufe nach Labels klassifizieren"], 0)
        ],
        loesung: "<p>a) Ranking · b) Merkmalsähnlichkeit vs. Verhaltensmuster · c) Kosinus · d) Clustering von Profilen.</p>" },

      { titel: "Gehaltsdaten", text: "<p>Jahresgehälter in T€: <b>38, 42, 45, 48, 52, 55, 120</b>.</p>",
        teile: [
          z("a", "a) Mittelwert (zwei Nachkommastellen)", 2, 57.14, 0.01, "T€"),
          z("b", "b) Median", 2, 48, 0.001, "T€"),
          z("c", "c) Getrimmter Mittelwert ohne kleinsten und größten Wert", 3, 48.4, 0.01, "T€"),
          w("d", "d) Welche Maße sind robust gegenüber dem Wert 120?", 2, ["Median und getrimmter Mittelwert", "nur der Mittelwert", "Spannweite", "Maximum"], 0),
          t("e", "e) Was zeigt ein Boxplot dieser Daten?", 3, "Box mit mittleren 50 % um den Median (1 P.), Whisker (1 P.), 120 als Ausreißer erkennbar (1 P.).")
        ],
        loesung: "<p>a) 400 / 7 ≈ <b>57,14</b> · b) <b>48</b> · c) (42 + 45 + 48 + 52 + 55) / 5 = <b>48,4</b> · d) Median, getrimmter Mittelwert · e) Box, Whisker, Ausreißer 120.</p>" },

      { titel: "Kombinatorik", text: "<p>Aus 10 Kandidatinnen und Kandidaten werden 3 zum Gespräch eingeladen.</p>",
        teile: [
          z("a", "a) Anzahl möglicher Auswahlen", 3, 120, 0),
          z("b", "b) Wahrscheinlichkeit, dass zwei bestimmte Personen bei rein zufälliger Auswahl beide dabei sind, in % (zwei Nachkommastellen)", 3, 6.67, 0.05, "%"),
          w("c", "c) Wann sind zwei Ereignisse stochastisch unabhängig?", 2, ["wenn P(A und B) = P(A) · P(B)", "wenn sie gleich wahrscheinlich sind", "wenn sie sich ausschließen", "immer"], 0),
          w("d", "d) Was ist eine Zufallsstichprobe?", 2, ["jedes Element hat dieselbe bekannte Chance, ausgewählt zu werden", "die ersten 100 Datensätze", "die besten Fälle", "selbst ausgewählte Freiwillige"], 0)
        ],
        loesung: "<p>a) (10 über 3) = <b>120</b> · b) dritte Person aus 8: 8 / 120 ≈ <b>6,67 %</b> · c) Produktregel · d) gleiche Auswahlchance.</p>" },

      { titel: "Ähnlichkeit von Profilen", text: "<p>Skill-Vektoren (Python, SQL, Excel, ML): Stelle s = (1; 1; 0; 1), Kandidat K = (1; 0; 1; 1), Kandidatin M = (1; 1; 0; 0).</p>",
        teile: [
          z("a", "a) Kosinusähnlichkeit von s und K (vier Nachkommastellen)", 4, 0.6667, 0.003),
          z("b", "b) Kosinusähnlichkeit von s und M (vier Nachkommastellen)", 4, 0.8165, 0.003),
          w("c", "c) Wer passt nach diesem Maß besser?", 2, ["M", "K", "beide gleich", "keine Aussage"], 0),
          w("d", "d) Was misst der Jaccard-Index bei Skill-Mengen?", 2, ["Anteil gemeinsamer Skills an allen vorkommenden Skills", "die Länge der Lebensläufe", "die Zahl der Bewerber", "das Durchschnittsgehalt"], 0)
        ],
        loesung: "<p>a) 2 / (√3 · √3) = <b>0,6667</b> · b) 2 / (√3 · √2) ≈ <b>0,8165</b> · c) M · d) Schnittmenge durch Vereinigungsmenge.</p>" },

      { titel: "Vorauswahl bewerten", text: "<p>500 Bewerbungen, davon 60 geeignet. Das Modell schlägt 80 zur Einladung vor, davon 48 geeignet. Prozentwerte mit zwei Nachkommastellen.</p>",
        teile: [
          z("a", "a) Precision", 2, 60, 0.1, "%"),
          z("b", "b) Recall", 2, 80, 0.1, "%"),
          z("c", "c) Accuracy", 2, 91.2, 0.1, "%"),
          z("d", "d) F1-Score", 2, 68.57, 0.15, "%"),
          w("e", "e) Was ist hier ein falsch negativer Fall?", 2, ["eine geeignete Person wird nicht eingeladen", "eine ungeeignete Person wird eingeladen", "eine geeignete Person wird eingeladen", "eine Bewerbung fehlt"], 0),
          t("f", "f) Welche Fehlerart ist für das Unternehmen und die Bewerbenden kritischer? Begründen Sie kurz.", 2, "Meist falsch negativ: geeignete Talente gehen verloren, Benachteiligung von Personen; falsch positiv kostet nur Gesprächszeit (2 P.).")
        ],
        loesung: "<p>TP = 48, FP = 32, FN = 12, TN = 408. a) 48 / 80 = <b>60 %</b> · b) 48 / 60 = <b>80 %</b> · c) 456 / 500 = <b>91,2 %</b> · d) ≈ <b>68,57 %</b> · e) geeignete Person nicht eingeladen · f) meist falsch negativ.</p>" },

      { titel: "Bewerberdaten", text: "",
        teile: [
          t("a", "a) Welche Probleme treten beim automatischen Auslesen von Lebensläufen auf?", 4, "Je 2 P.: unterschiedliche Layouts/Tabellen, gescannte PDFs (OCR-Fehler), uneinheitliche Bezeichnungen von Berufen und Skills, Lücken/Datumsformate, Sprachen."),
          w("b", "b) Welche Angabe ist für die Vorauswahl nach dem Grundsatz der Datenminimierung entbehrlich?", 2, ["das Bewerbungsfoto", "Berufserfahrung", "Qualifikationen", "Kontaktdaten"], 0),
          w("c", "c) Wie lange werden Unterlagen abgelehnter Bewerbender üblicherweise höchstens aufbewahrt?", 2, ["einige Monate, um Ansprüche nach dem AGG abwehren zu können", "zehn Jahre", "für immer", "gar nicht"], 0),
          w("d", "d) Anschreiben in Freitext sind …", 2, ["unstrukturierte Daten", "strukturierte Daten", "Metadaten", "Zeitreihen"], 0)
        ],
        loesung: "<p>a) Layouts, OCR, uneinheitliche Begriffe, Datumsformate · b) Foto · c) einige Monate (AGG-Fristen) · d) unstrukturiert.</p>" },

      { titel: "Python mit Mengen", text: "<pre class=\"code\">skills = {\"python\", \"sql\", \"ml\"}\nkandidat = {\"sql\", \"excel\", \"python\"}\nprint(len(skills &amp; kandidat))\nprint(sorted(skills - kandidat))\nprint(round(len(skills &amp; kandidat) / len(skills | kandidat), 2))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 2, 0),
          w("b", "b) Zweite Ausgabe", 3, ["['ml']", "['excel']", "['python', 'sql']", "[]"], 0),
          z("c", "c) Dritte Ausgabe", 2, 0.5, 0.001),
          w("d", "d) Was bedeutet der Operator &amp; bei Mengen?", 2, ["Schnittmenge", "Vereinigung", "Differenz", "Vergleich"], 0)
        ],
        loesung: "<p>a) {python, sql} → <b>2</b> · b) <b>['ml']</b> · c) 2 / 4 = <b>0,5</b> (Jaccard) · d) Schnittmenge.</p>" },

      { titel: "Regression", text: "<p>Ein Modell schätzt das Gehalt (T€): ŷ = 30 + 2,5 · Berufsjahre.</p>",
        teile: [
          z("a", "a) Prognose für 8 Berufsjahre", 2, 50, 0.001, "T€"),
          z("b", "b) Eine Person mit 8 Jahren verdient 47 T€. Residuum y − ŷ", 2, -3, 0.001, "T€"),
          w("c", "c) Ein Kollege schlägt vor, das Geschlecht als Merkmal aufzunehmen, weil es die Prognose verbessert. Wie bewerten Sie das?", 2, ["kritisch: das Modell würde bestehende Entgeltungleichheit fortschreiben", "unbedenklich", "Pflicht nach dem AGG", "nur bei mehr Daten sinnvoll"], 0),
          t("d", "d) Was ist Multikollinearität, und warum stört sie?", 4, "Merkmale sind stark untereinander korreliert, z. B. Alter und Berufsjahre (2 P.); Koeffizienten werden instabil und schwer interpretierbar (2 P.).")
        ],
        loesung: "<p>a) 30 + 20 = <b>50</b> · b) 47 − 50 = <b>−3</b> · c) kritisch, Benachteiligung würde fortgeschrieben · d) korrelierte Merkmale, instabile Koeffizienten.</p>" },

      { titel: "Recht im Recruiting", text: "",
        teile: [
          w("a", "a) KI zur Vorauswahl oder Bewertung von Bewerbenden ist …", 2, ["Hochrisiko (Anhang III, Beschäftigung)", "minimales Risiko", "verboten", "nur transparenzpflichtig"], 0),
          w("b", "b) Welches Merkmal ist durch das AGG geschützt?", 2, ["Alter", "Hobbys", "Berufserfahrung", "Wohnort"], 0),
          t("c", "c) Wann ist eine automatische Absage nach Art. 22 DSGVO problematisch, und wie vermeiden Sie das?", 4, "Problematisch, wenn sie ausschließlich automatisiert erfolgt und erhebliche Wirkung hat (2 P.); echte menschliche Prüfung vor jeder Absage, Information, Kontaktmöglichkeit (2 P.)."),
          w("d", "d) Ein Anbieter wirbt mit Emotionserkennung in Videointerviews. Wie ist das einzustufen?", 2, ["verboten (Emotionserkennung im Bereich Arbeitsplatz)", "minimales Risiko", "Hochrisiko, aber erlaubt ohne Auflagen", "nur Transparenz"], 0),
          w("e", "e) Welche Vorschrift gibt dem Betriebsrat ein Zustimmungsrecht bei KI-gestützten Auswahlrichtlinien?", 2, ["§ 95 Abs. 2a BetrVG", "§ 102 BetrVG", "§ 111 BetrVG", "§ 5 ArbZG"], 0),
          w("f", "f) Innerhalb welcher Frist muss eine abgelehnte Person Entschädigungsansprüche nach dem AGG schriftlich geltend machen?", 2, ["zwei Monate", "zwei Wochen", "ein Jahr", "drei Jahre"], 0)
        ],
        loesung: "<p>a) Hochrisiko · b) Alter · c) keine rein automatisierte Absage, menschliche Prüfung · d) verboten · e) § 95 Abs. 2a · f) zwei Monate.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s08b", satz: 8, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Rangfolgen bewerten", text: "<p>Für eine Stelle schlägt das System 5 Profile vor; 3 davon sind laut Recruitern passend.</p>",
        teile: [
          z("a", "a) Precision@5", 3, 0.6, 0.001),
          t("b", "b) Was misst NDCG zusätzlich zu Precision@k?", 3, "Position der relevanten Treffer: weiter oben platzierte Treffer zählen mehr (2 P.); normiert auf die ideale Reihenfolge (1 P.)."),
          w("c", "c) Was ist das Kaltstartproblem?", 2, ["für neue Profile oder Stellen fehlen Verhaltensdaten", "ein kalter Server", "zu viele Daten", "ein Fehler im Ranking"], 0),
          t("d", "d) Wie kann ein Empfehlungssystem durch Rückkopplung Verzerrungen verstärken?", 4, "Oft vorgeschlagene Profile erhalten mehr Klicks und Einladungen, die wiederum als Trainingssignal dienen (2 P.); weniger sichtbare Gruppen geraten weiter ins Hintertreffen – Exploration, Fairness-Monitoring (2 P.).")
        ],
        loesung: "<p>a) 3 / 5 = <b>0,6</b> · b) Position der Treffer · c) fehlende Daten bei Neuem · d) Rückkopplung verstärkt Sichtbarkeit; gegensteuern.</p>" },

      { titel: "Text-Embeddings", text: "",
        teile: [
          t("a", "a) Warum finden Satz-Embeddings passende Profile besser als TF-IDF?", 4, "Erfassen Bedeutung und Kontext (2 P.); erkennen Synonyme wie „Data Engineer“ und „Datenpipeline-Entwickler“, mehrsprachig möglich (2 P.)."),
          z("b", "b) Skalarprodukt der normierten Vektoren u = (0,6; 0,8) und v = (0,8; 0,6)", 3, 0.96, 0.001),
          w("c", "c) Was gilt für Kosinusähnlichkeit und Skalarprodukt normierter Vektoren?", 2, ["sie sind gleich", "das Skalarprodukt ist immer null", "die Kosinusähnlichkeit ist doppelt so groß", "kein Zusammenhang"], 0),
          t("d", "d) Beschreiben Sie eine semantische Suche nach passenden Profilen.", 3, "Profile und Stellentext einbetten (1 P.), in Vektordatenbank speichern (1 P.), nächste Nachbarn zum Stellenvektor suchen und anschließend fachlich prüfen (1 P.).")
        ],
        loesung: "<p>a) Bedeutung statt Wortgleichheit · b) 0,48 + 0,48 = <b>0,96</b> · c) gleich · d) einbetten, speichern, nächste Nachbarn suchen, prüfen.</p>" },

      { titel: "Fairness-Metriken", text: "<p>Frauen: 200 Bewerberinnen, 40 qualifiziert; das Modell empfiehlt 30 qualifizierte und 10 nicht qualifizierte. Männer: 300 Bewerber, 60 qualifiziert; empfohlen werden 54 qualifizierte und 6 nicht qualifizierte.</p>",
        teile: [
          z("a", "a) Empfehlungsquote Frauen in %", 2, 20, 0.1, "%"),
          z("b", "b) Empfehlungsquote Männer in %", 2, 20, 0.1, "%"),
          z("c", "c) True-Positive-Rate Frauen", 2, 0.75, 0.001),
          z("d", "d) True-Positive-Rate Männer", 2, 0.9, 0.001),
          w("e", "e) Was folgt daraus?", 2, ["Demographic Parity ist erfüllt, Equal Opportunity verletzt – qualifizierte Frauen werden seltener erkannt", "beide Kriterien erfüllt", "beide verletzt", "Equal Opportunity erfüllt"], 0),
          t("f", "f) Warum lassen sich nicht alle Fairnesskriterien gleichzeitig erfüllen, und wie entscheiden Sie?", 4, "Bei unterschiedlichen Basisraten widersprechen sich Kriterien mathematisch (2 P.); Wahl nach Zweck und Recht, z. B. im Recruiting gleiche Erkennung Qualifizierter, dokumentieren und mit Fachleuten/Betriebsrat abstimmen (2 P.).")
        ],
        loesung: "<p>a) 40 / 200 = <b>20 %</b> · b) 60 / 300 = <b>20 %</b> · c) 30 / 40 = <b>0,75</b> · d) 54 / 60 = <b>0,9</b> · e) Parity ja, Equal Opportunity nein · f) Zielkonflikt; begründete Auswahl und Dokumentation.</p>" },

      { titel: "Bias mindern", text: "",
        teile: [
          t("a", "a) Nennen Sie je eine Maßnahme vor, während und nach dem Training.", 6, "Vorher: Daten ausbalancieren/umgewichten, Stellvertretermerkmale entfernen (2 P.); während: Fairness-Nebenbedingungen/Regularisierung (2 P.); nachher: Schwellen je Gruppe prüfen, Monitoring, menschliche Kontrolle (2 P.)."),
          w("b", "b) Was ist ein Stellvertretermerkmal (Proxy)?", 2, ["ein Merkmal, das indirekt auf ein geschütztes Merkmal schließen lässt, z. B. Vorname", "ein fehlender Wert", "ein Hyperparameter", "ein Label"], 0),
          w("c", "c) Reicht es, das Merkmal Geschlecht zu löschen?", 2, ["nein, über Proxys kann das Modell es indirekt weiter nutzen", "ja, immer", "ja, wenn das Modell klein ist", "nur bei Regression"], 0)
        ],
        loesung: "<p>a) Umgewichten, Fairness-Nebenbedingungen, Schwellen und Monitoring · b) indirekter Hinweis · c) nein.</p>" },

      { titel: "Erklärungen für Bewerbende", text: "<p>SHAP-Erklärung für eine Bewerberin: Basiswert 0,40; Berufserfahrung +0,15; Skills +0,10; „Lücke im Lebenslauf“ −0,20.</p>",
        teile: [
          t("a", "a) Welche Erklärung sollten Bewerbende erhalten?", 4, "Verständliche Hauptgründe statt technischer Werte (2 P.); Hinweis auf menschliche Prüfung, Ansprechpartner, Möglichkeit zur Stellungnahme (2 P.)."),
          z("b", "b) Vorhergesagter Eignungswert", 3, 0.45, 0.001),
          w("c", "c) Warum ist das Merkmal „Lücke im Lebenslauf“ kritisch?", 3, ["es kann Elternzeit, Pflege oder Krankheit abbilden und damit mittelbar benachteiligen", "es ist immer aussagekräftig", "es ist zu genau", "es ist verboten zu speichern"], 0)
        ],
        loesung: "<p>a) Hauptgründe, menschliche Prüfung, Stellungnahme · b) 0,40 + 0,15 + 0,10 − 0,20 = <b>0,45</b> · c) mittelbare Benachteiligung.</p>" },

      { titel: "Lebensläufe mit Sprachmodellen auslesen", text: "",
        teile: [
          t("a", "a) Wie stellen Sie sicher, dass ein Sprachmodell strukturierte und gültige Daten liefert?", 4, "Vorgegebenes Ausgabeformat (JSON-Schema) (2 P.); Validierung der Felder, Plausibilitätsprüfungen, Rückfall auf manuelle Prüfung bei Fehlern (2 P.)."),
          z("b", "b) 1.000 geprüfte Felder, 940 korrekt. Feldgenauigkeit in %", 2, 94, 0.1, "%"),
          t("c", "c) Wie können Verzerrungen des Sprachmodells das Auslesen beeinflussen?", 4, "Modell bewertet oder ergänzt Inhalte nach gelernten Stereotypen, z. B. bei Namen oder ausländischen Abschlüssen (2 P.); Gegenmaßnahme: nur extrahieren statt bewerten, Tests mit vertauschten Namen (2 P.)."),
          w("d", "d) Welche Temperatur wählen Sie für reine Extraktion?", 2, ["niedrig, z. B. 0", "sehr hoch", "zufällig wechselnd", "egal"], 0)
        ],
        loesung: "<p>a) Schema und Validierung · b) <b>94 %</b> · c) Stereotype; nur extrahieren, Tests mit vertauschten Namen · d) niedrig.</p>" },

      { titel: "A/B-Test der Stellenanzeigen", text: "<p>Anzeige A: 1.000 Besuche, 50 Bewerbungen. Anzeige B (KI-optimierter Text): 1.000 Besuche, 70 Bewerbungen.</p>",
        teile: [
          z("a", "a) Relativer Anstieg der Bewerbungsquote in %", 3, 40, 0.1, "%"),
          z("b", "b) Absoluter Anstieg in Prozentpunkten", 2, 2, 0.001),
          t("c", "c) Wie prüfen Sie, ob der Unterschied nicht nur Zufall ist?", 3, "Statistischer Test, z. B. auf Unterschied zweier Anteile (1 P.); Signifikanzniveau festlegen, ausreichende Stichprobe, Laufzeit vorab planen (2 P.)."),
          w("d", "d) Was bedeutet ein p-Wert von 0,03?", 2, ["unter Annahme keines Unterschieds wäre ein mindestens so großer Effekt mit 3 % Wahrscheinlichkeit zu erwarten", "B ist mit 97 % besser", "3 % Bewerbungsquote", "der Effekt beträgt 3 %"], 0)
        ],
        loesung: "<p>a) (7 % − 5 %) / 5 % = <b>40 %</b> · b) <b>2</b> Prozentpunkte · c) Test auf Anteilsunterschied mit vorab geplanter Stichprobe · d) Wahrscheinlichkeit unter Nullhypothese.</p>" },

      { titel: "Python mit pandas", text: "<pre class=\"code\">import pandas as pd\ndf = pd.DataFrame({\"gruppe\": [\"F\", \"M\", \"F\", \"M\", \"M\"], \"eingeladen\": [1, 1, 0, 1, 0]})\nquote = df.groupby(\"gruppe\")[\"eingeladen\"].mean()\nprint(quote[\"F\"])\nprint(round(quote[\"M\"], 2))\nprint(round(quote[\"F\"] / quote[\"M\"], 2))</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 0.5, 0.001),
          z("b", "b) Zweite Ausgabe", 3, 0.67, 0.001),
          z("c", "c) Dritte Ausgabe", 2, 0.75, 0.001),
          w("d", "d) Was macht groupby hier?", 2, ["bildet je Gruppe den Mittelwert der Einladungen", "sortiert die Tabelle", "löscht Gruppen", "zählt Spalten"], 0)
        ],
        loesung: "<p>a) F: (1 + 0) / 2 = <b>0,5</b> · b) M: 2 / 3 ≈ <b>0,67</b> · c) 0,5 / 0,667 = <b>0,75</b> · d) Gruppenmittelwerte.</p>" },

      { titel: "Dokumentation und Governance", text: "",
        teile: [
          t("a", "a) Was gehört in eine Model Card bzw. technische Dokumentation eines Matching-Modells?", 4, "Je 1 P.: Zweck und Grenzen, Trainingsdaten und Herkunft, Kennzahlen insgesamt und je Gruppe, bekannte Risiken/Bias, menschliche Aufsicht, Version und Verantwortliche."),
          w("b", "b) Welche Pflicht haben Hochrisiko-Systeme bezüglich Protokollen?", 2, ["automatische Aufzeichnung von Ereignissen zur Rückverfolgbarkeit", "keine", "nur Fehlermeldungen anzeigen", "Protokolle sofort löschen"], 0),
          t("c", "c) Wie überwacht der Anbieter das System nach dem Inverkehrbringen?", 4, "Daten zur Leistung und zu Vorfällen sammeln, auch von Betreibern (2 P.); Fairness- und Drift-Monitoring, Korrekturen, Meldung schwerwiegender Vorfälle (2 P.).")
        ],
        loesung: "<p>a) Zweck, Daten, Kennzahlen je Gruppe, Risiken, Aufsicht, Version · b) automatische Protokollierung · c) Beobachtung nach dem Inverkehrbringen mit Korrekturen und Meldungen.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s08t2", satz: 8, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI-Matching beim Personaldienstleister", kurz: "Personaldienstleister · Recruiting", minuten: 240,
    situation: "<p>Die <b>TalentPartner GmbH</b> (380 interne Beschäftigte, Betriebsrat) ist in Arbeitnehmerüberlassung und Personalvermittlung tätig und betreut 2.500 Zeitarbeitnehmer. Monatlich gehen 400 Kundenaufträge ein; Recruiter suchen in einer Datenbank mit 60.000 Kandidatenprofilen. Bis zur Besetzung vergehen im Schnitt 21 Tage.</p><p>Ein Softwareanbieter bietet zwei Module an: (1) KI-Matching, das zu jedem Auftrag eine Rangliste passender Profile erstellt, und (2) eine Analyse von Videointerviews, die „Begeisterung, Stressresistenz und Ehrlichkeit“ aus Mimik und Stimme ableitet. Sie sollen die Einführung bewerten und leiten.</p>",
    aufgaben: [
      { titel: "Matching konzipieren", text: "",
        teile: [
          t("a", "a) Beschreiben Sie den Aufbau des Matching-Systems.", 6, "Skills und Erfahrungen aus Profilen/Aufträgen extrahieren (1 P.); Embeddings und/oder Merkmalsvergleich (1 P.); Ranking mit Erklärung je Treffer (1 P.); Ausschluss geschützter Merkmale und Proxys (1 P.); Recruiter prüft und entscheidet (1 P.); Rückmeldung zur Verbesserung, Fairness-Monitoring (1 P.)."),
          z("b", "b) Von 10 vorgeschlagenen Profilen sind 6 passend. Precision@10 in %", 2, 60, 0.1, "%"),
          z("c", "c) Je Auftrag sinkt die Recherchezeit um 45 Minuten. Eingesparte Stunden pro Monat", 2, 300, 0, "h"),
          t("d", "d) Welche Fragen zu den Kandidatendaten klären Sie vorab?", 4, "Rechtsgrundlage und Information der Kandidaten über KI-Nutzung (1 P.); Aktualität, Löschfristen alter Profile (1 P.); Datenqualität/Vollständigkeit (1 P.); keine sensiblen Merkmale wie Foto, Religion (1 P.)."),
          w("e", "e) Welches Prinzip gilt für die Auswahlentscheidung?", 2, ["Mensch entscheidet, KI schlägt vor (Human in the Loop)", "die KI entscheidet allein", "der Kunde entscheidet über die KI", "Zufallsauswahl"], 0)
        ],
        loesung: "<p>a) Extraktion, Embeddings, Ranking mit Erklärung, Ausschluss sensibler Merkmale, menschliche Entscheidung, Monitoring · b) <b>60 %</b> · c) 400 · 45 / 60 = <b>300 h</b> · d) Rechtsgrundlage, Information, Löschfristen, Datenqualität · e) Mensch entscheidet.</p>" },

      { titel: "Prozess und Kennzahlen", text: "<p>Ziel ist eine Besetzung in 14 statt 21 Tagen. Jeder Tag ohne Besetzung kostet im Mittel 120 € Deckungsbeitrag je Auftrag.</p>",
        teile: [
          z("a", "a) Reduktion der Besetzungsdauer in % (zwei Nachkommastellen)", 2, 33.33, 0.05, "%"),
          z("b", "b) Rechnerischer Deckungsbeitrag der 7 schnelleren Tage bei 400 Aufträgen pro Monat", 3, 336000, 0, "€"),
          t("c", "c) Beschreiben Sie den Soll-Prozess von Auftragseingang bis Vorstellung beim Kunden.", 4, "Auftrag strukturiert erfassen (1 P.); KI-Rangliste mit Begründung (1 P.); Recruiter prüft, spricht Kandidaten an (1 P.); Vorstellung, Rückmeldung als Lernsignal (1 P.)."),
          t("d", "d) Nennen Sie drei Kennzahlen.", 3, "Je 1 P.: Time-to-fill, Besetzungsquote, Precision@10, Kandidatenzufriedenheit, Fairness je Gruppe, Kundenzufriedenheit.")
        ],
        loesung: "<p>a) 7 / 21 ≈ <b>33,33 %</b> · b) 400 · 7 · 120 = <b>336.000 €</b> · c) Erfassen, Rangliste, Prüfung, Vorstellung, Rückmeldung · d) z. B. Time-to-fill, Besetzungsquote, Fairness je Gruppe.</p>" },

      { titel: "Projektsteuerung und Risiken", text: "",
        teile: [
          t("a", "a) Nennen Sie zwei wesentliche Projektrisiken mit Maßnahme.", 4, "Je 2 P.: Diskriminierung/AGG → Fairness-Tests, menschliche Prüfung; Rechtsverstoß KI-VO → Rechtsprüfung vor Vertrag; Akzeptanz der Recruiter → Beteiligung, Schulung; Datenqualität → Bereinigung."),
          z("b", "b) Risiko AGG-Klagen: Wahrscheinlichkeit 10 %, Schaden 150.000 €. Erwartungswert", 2, 15000, 0, "€"),
          t("c", "c) Wie setzen Sie die Projektorganisation auf?", 4, "Auftraggeber Geschäftsführung, Lenkungsausschuss (1 P.); Projektleitung, Recruiter als Key User/Product Owner (1 P.); Datenschutzbeauftragter, Rechtsabteilung (1 P.); Betriebsrat früh eingebunden (1 P.)."),
          w("d", "d) CPI 0,9 und SPI 1,1 bedeuten …", 2, ["teurer als geplant, aber schneller", "günstiger und langsamer", "im Plan", "günstiger und schneller"], 0),
          w("e", "e) Welche Methode passt für den laufenden Support nach dem Go-live?", 2, ["Kanban", "Wasserfall", "Netzplan", "Stage-Gate"], 0)
        ],
        loesung: "<p>a) z. B. Diskriminierung und Akzeptanz · b) 0,1 · 150.000 = <b>15.000 €</b> · c) Lenkungsausschuss, Key User, DSB, Betriebsrat · d) teurer, aber schneller · e) Kanban.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Wie ist das Matching-Modul nach der KI-Verordnung einzustufen?", 2, ["Hochrisiko (Anhang III, Personalauswahl)", "minimales Risiko", "verboten", "nur Transparenz"], 0),
          w("b", "b) Wie ist die Videointerview-Analyse von Mimik und Stimme einzustufen?", 2, ["verboten (Emotionserkennung im Bereich Arbeitsplatz)", "Hochrisiko", "minimales Risiko", "nur Transparenz"], 0),
          t("c", "c) Welche Pflichten hat TalentPartner als Betreiberin des Matchings, und was verlangt das AGG?", 6, "Betreiberpflichten (je 1 P.): Gebrauchsanweisung, menschliche Aufsicht durch geschulte Recruiter, geeignete Eingabedaten, Protokolle aufbewahren, Information von Beschäftigten/Betroffenen (max. 4 P.); AGG: keine unmittelbare oder mittelbare Benachteiligung, Fairness prüfen und dokumentieren (2 P.)."),
          t("d", "d) Welche Anforderungen stellt die DSGVO an das Matching?", 4, "Rechtsgrundlage (Anbahnung des Vertrags bzw. Einwilligung für Talentpool) (1 P.); Information über KI-Einsatz (1 P.); Art. 22 – keine rein automatisierte Absage (1 P.); Löschfristen, DSFA (1 P.)."),
          w("e", "e) Welches Recht hat der Betriebsrat bei Auswahlrichtlinien, die mithilfe von KI aufgestellt werden?", 2, ["Zustimmungsrecht nach § 95 Abs. 2a BetrVG", "kein Recht", "nur Information nach § 106", "Anhörung nach § 102"], 0),
          w("f", "f) Wie lange darf ein Zeitarbeitnehmer grundsätzlich höchstens an denselben Entleiher überlassen werden?", 2, ["18 Monate", "6 Monate", "3 Jahre", "unbegrenzt"], 0),
          w("g", "g) Welcher Bußgeldrahmen droht bei Einsatz einer verbotenen KI-Praxis?", 2, ["bis 35 Mio. € oder 7 % des weltweiten Jahresumsatzes", "bis 10.000 €", "bis 20 Mio. € oder 4 %", "kein Bußgeld"], 0)
        ],
        loesung: "<p>a) Hochrisiko · b) verboten – das Modul darf nicht eingesetzt werden · c) Betreiberpflichten und Diskriminierungsfreiheit · d) Rechtsgrundlage, Information, Art. 22, Löschfristen, DSFA · e) § 95 Abs. 2a · f) 18 Monate · g) 35 Mio. € oder 7 %.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Investition 250.000 €, Lizenz 60.000 € pro Jahr. Eingesparte Recruiterzeit (Aufgabe 1) wird mit 45 € je Stunde bewertet. Durch schnellere Besetzungen rechnen Sie vorsichtig mit 180.000 € zusätzlichem Deckungsbeitrag pro Jahr. Nutzungsdauer 3 Jahre, Zins 8 % (Rentenbarwertfaktor 2,5771).</p>",
        teile: [
          z("a", "a) Jährlicher Rückfluss", 3, 282000, 0, "€"),
          z("b", "b) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 2, 0.89, 0.01, "Jahre"),
          z("c", "c) Kapitalwert", 4, 476742, 10, "€"),
          z("d", "d) Kapitalwert, wenn der zusätzliche Deckungsbeitrag ganz ausbleibt", 3, 12864, 10, "€"),
          t("e", "e) Was folgt aus d) für Ihre Empfehlung?", 2, "Auch im ungünstigen Fall knapp positiv, Investition vertretbar; Nutzen im Pilot messen, Annahmen absichern (2 P.).")
        ],
        loesung: "<p>a) 300 · 12 · 45 = 162.000 €; 162.000 + 180.000 − 60.000 = <b>282.000 €</b> · b) 250.000 / 282.000 ≈ <b>0,89 Jahre</b> · c) 282.000 · 2,5771 − 250.000 ≈ <b>476.742 €</b> · d) (162.000 − 60.000) · 2,5771 − 250.000 ≈ <b>12.864 €</b> · e) robust, aber Annahmen im Pilot prüfen.</p>" },

      { titel: "Personal und Führung", text: "",
        teile: [
          t("a", "a) Wie verändert sich die Rolle der Recruiter, und welche Kompetenzen brauchen sie?", 4, "Weniger Suche, mehr Beratung, Prüfung und Kandidatenbeziehung (2 P.); Kompetenzen: KI-Ergebnisse kritisch prüfen, Fairnessbewusstsein, Datenschutz, Gesprächsführung (2 P.)."),
          w("b", "b) Ab wann haben Zeitarbeitnehmer grundsätzlich Anspruch auf gleiches Entgelt wie Stammbeschäftigte des Entleihers?", 2, ["nach 9 Monaten Überlassung", "ab dem ersten Tag ohne Ausnahme", "nach 3 Jahren", "nie"], 0),
          w("c", "c) Ein Recruiter arbeitet als Freelancer fest eingeplant im Team, mit festen Zeiten und Weisungen. Risiko?", 2, ["Scheinselbstständigkeit", "keines", "Betriebsänderung", "Kurzarbeit"], 0),
          t("d", "d) Einige erfahrene Recruiter ignorieren die Ranglisten. Wie führen Sie situativ?", 4, "Reifegrad: kompetent, aber nicht bereit (R3) (2 P.); beteiligen/unterstützen: Bedenken anhören, gemeinsam Regeln für Nutzung, Erfahrungen einbeziehen (2 P.).")
        ],
        loesung: "<p>a) mehr Beratung und Prüfung; KI-Kompetenz, Fairness, Gesprächsführung · b) nach 9 Monaten · c) Scheinselbstständigkeit · d) beteiligen und unterstützen.</p>" },

      { titel: "Zukunftskompetenzen", text: "<p>Ein Kunde ruft an: „Ihre KI schickt mir nur unpassende Leute.“</p>",
        teile: [
          t("a", "a) Analysieren Sie die Aussage mit dem Vier-Seiten-Modell.", 4, "Sache: Vorschläge passen nicht (1 P.); Selbstkundgabe: Ärger, Zeitdruck (1 P.); Beziehung: Zweifel an Kompetenz von TalentPartner (1 P.); Appell: Bessere Vorschläge, kümmern Sie sich (1 P.)."),
          t("b", "b) Reflektieren Sie ethisch: Warum lehnen Sie das Videointerview-Modul auch unabhängig vom Verbot ab?", 4, "Wissenschaftlich fragwürdig, Emotionen nicht zuverlässig aus Mimik ablesbar (2 P.); benachteiligt z. B. Menschen mit Behinderung, anderer Kultur oder Nervosität, Würde und Vertrauen (2 P.)."),
          w("c", "c) Wer im Team prüft Vorschläge nüchtern und kritisch (Belbin)?", 2, ["Beobachter", "Macher", "Wegbereiter", "Teamarbeiter"], 0),
          w("d", "d) Mit welchem Schritt beginnt die gewaltfreie Kommunikation?", 2, ["Beobachtung", "Bitte", "Bedürfnis", "Gefühl"], 0)
        ],
        loesung: "<p>a) Sache, Selbstkundgabe, Beziehung, Appell · b) unzuverlässig, diskriminierend, würdeverletzend · c) Beobachter · d) Beobachtung.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
