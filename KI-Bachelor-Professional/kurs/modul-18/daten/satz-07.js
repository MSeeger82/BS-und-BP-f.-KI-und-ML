/* Bachelor-Prüfungssatz 7 */
(function (z, w, t) {
  window.PRUEFUNGEN.push({
    id: "bp-s07a", satz: 7, teil: 1, bereich: "A", titel: "Teil 1 · Bereich A: Grundlagen der KI", minuten: 60,
    aufgaben: [
      { titel: "Chatbots und Sprachmodelle", text: "",
        teile: [
          w("a", "a) Worin unterscheidet sich ein regelbasierter Chatbot von einem Chatbot mit Sprachmodell?", 2, ["Der regelbasierte folgt festen Dialogpfaden, das Sprachmodell erzeugt Antworten frei aus gelernten Mustern", "Es gibt keinen Unterschied", "Regelbasierte Chatbots halluzinieren häufiger", "Sprachmodelle brauchen keine Daten"], 0),
          t("b", "b) Nennen Sie vier Merkmale eines guten Prompts.", 4, "Je 1 P.: klare Aufgabe/Ziel, Rolle und Zielgruppe, Kontext/Quellen, gewünschtes Format, Beispiele, Einschränkungen (z. B. nur aus Quellen antworten)."),
          w("c", "c) Was ist eine Halluzination?", 2, ["eine plausibel klingende, aber falsche Ausgabe", "ein Systemabsturz", "ein Tippfehler des Nutzers", "eine lange Antwortzeit"], 0),
          w("d", "d) Was beschreibt das Kontextfenster eines Sprachmodells?", 2, ["die maximale Menge an Tokens, die das Modell auf einmal berücksichtigt", "die Bildschirmgröße", "die Zahl der Nutzer", "die Trainingsdauer"], 0)
        ],
        loesung: "<p>a) feste Pfade vs. freie Generierung · b) Ziel, Rolle, Kontext, Format, Beispiele, Grenzen · c) plausible Falschaussage · d) maximale Tokenmenge.</p>" },

      { titel: "Wartezeiten im Bürgerbüro", text: "<p>Wartezeiten in Minuten: <b>5, 10, 10, 15, 20, 30, 50</b>.</p>",
        teile: [
          z("a", "a) Mittelwert", 2, 20, 0.001, "min"),
          z("b", "b) Median", 2, 15, 0.001, "min"),
          z("c", "c) Spannweite", 2, 45, 0, "min"),
          z("d", "d) Anteil der Wartezeiten über 15 Minuten in % (zwei Nachkommastellen)", 2, 42.86, 0.1, "%"),
          w("e", "e) Die Verteilung ist …", 2, ["rechtsschief (Mittelwert größer als Median)", "linksschief", "symmetrisch", "gleichverteilt"], 0),
          t("f", "f) Welche Kennzahl berichten Sie dem Bürgermeister als „typische Wartezeit“, und warum?", 2, "Median, da robust gegen die langen Einzelfälle; ergänzend Anteil über einer Zielmarke (2 P.).")
        ],
        loesung: "<p>a) 140 / 7 = <b>20</b> · b) <b>15</b> · c) 50 − 5 = <b>45</b> · d) 3 / 7 ≈ <b>42,86 %</b> · e) rechtsschief · f) Median plus Anteil über Zielwert.</p>" },

      { titel: "Totale Wahrscheinlichkeit", text: "<p>Anfragen an den Bürgerchatbot: 60 % Formulare, 30 % Termine, 10 % Sonstiges. Der Chatbot löst Formularfragen zu 80 %, Terminfragen zu 90 % und Sonstiges zu 40 %.</p>",
        teile: [
          z("a", "a) Gesamte Lösungsquote in %", 4, 79, 0.05, "%"),
          z("b", "b) Anteil der Terminanfragen an allen gelösten Anfragen in % (zwei Nachkommastellen)", 4, 34.18, 0.1, "%"),
          w("c", "c) Welche Regel nutzen Sie für a)?", 2, ["Satz der totalen Wahrscheinlichkeit", "Ankereffekt", "Pareto-Prinzip", "Gesetz der großen Zahlen allein"], 0)
        ],
        loesung: "<p>a) 0,6 · 0,8 + 0,3 · 0,9 + 0,1 · 0,4 = 0,48 + 0,27 + 0,04 = <b>79 %</b> · b) 0,27 / 0,79 ≈ <b>34,18 %</b> (Bayes) · c) totale Wahrscheinlichkeit.</p>" },

      { titel: "Texte klassifizieren", text: "",
        teile: [
          w("a", "a) Was ist ein Bag-of-Words-Modell?", 2, ["Text als Häufigkeiten von Wörtern ohne Reihenfolge", "ein neuronales Netz für Bilder", "eine Datenbank", "eine Verschlüsselung"], 0),
          z("b", "b) Bei 400 Testanfragen wurde das Anliegen 340-mal richtig erkannt. Accuracy in %", 2, 85, 0.1, "%"),
          t("c", "c) Erklären Sie Stoppwörter und Lemmatisierung.", 4, "Stoppwörter: häufige Wörter ohne Aussage (der, und) werden entfernt (2 P.); Lemmatisierung: Rückführung auf Grundform (beantragte → beantragen) (2 P.)."),
          w("d", "d) Was sind Embeddings?", 2, ["Vektoren, in denen ähnliche Bedeutungen nah beieinander liegen", "Schlüsselwörter", "Datenbanktabellen", "Grafiken"], 0),
          w("e", "e) Das Erkennen des Anliegens (z. B. „Wohngeld“) ist welche Aufgabe?", 2, ["Klassifikation", "Regression", "Clustering", "bestärkendes Lernen"], 0)
        ],
        loesung: "<p>a) Worthäufigkeiten · b) 340 / 400 = <b>85 %</b> · c) Füllwörter entfernen; Grundformen bilden · d) Bedeutungsvektoren · e) Klassifikation (Intent-Erkennung).</p>" },

      { titel: "Daten in der Verwaltung", text: "",
        teile: [
          t("a", "a) Nennen Sie zwei typische Datenqualitätsprobleme in kommunalen Registern mit Auswirkung auf KI.", 4, "Je 2 P.: Dubletten (Personen doppelt), veraltete Adressen, uneinheitliche Schreibweisen, fehlende Felder, Freitexte statt Codes – führen zu falschen Zuordnungen/Prognosen."),
          w("b", "b) Warum eignet sich der Name einer Person nicht als Primärschlüssel?", 2, ["Namen sind nicht eindeutig und können sich ändern", "Namen sind zu kurz", "Namen sind verschlüsselt", "Namen sind Zahlen"], 0),
          w("c", "c) Welche SQL-Bedingung findet alle Straßen, die mit „Haupt“ beginnen?", 2, ["WHERE strasse LIKE 'Haupt%'", "WHERE strasse = 'Haupt'", "WHERE strasse IN 'Haupt'", "WHERE strasse > 'Haupt'"], 0),
          w("d", "d) Daten aus dem Meldewesen sollen für einen Chatbot genutzt werden. Welcher Grundsatz ist besonders zu prüfen?", 2, ["Zweckbindung", "Richtigkeit allein", "Transparenz allein", "keiner"], 0)
        ],
        loesung: "<p>a) z. B. Dubletten, veraltete Adressen · b) nicht eindeutig, veränderlich · c) LIKE 'Haupt%' · d) Zweckbindung.</p>" },

      { titel: "Entropie und Informationsgewinn", text: "<p>Ein Knoten enthält 8 Anträge: 4 vollständig, 4 unvollständig. Entropie H = −Σ p · log₂(p).</p>",
        teile: [
          z("a", "a) Entropie des Knotens", 3, 1, 0.001),
          z("b", "b) Split 1 teilt in (4 vollständig, 0 unvollständig) und (0, 4). Informationsgewinn", 3, 1, 0.001),
          z("c", "c) Split 2 teilt in (3, 3) und (1, 1). Informationsgewinn", 3, 0, 0.001),
          w("d", "d) Welcher Split wird gewählt?", 3, ["Split 1", "Split 2", "keiner", "beide gleich"], 0)
        ],
        loesung: "<p>a) p = 0,5 → <b>1</b> · b) beide Kinder rein (Entropie 0) → Gewinn <b>1</b> · c) beide Kinder Entropie 1 → Gewinn <b>0</b> · d) Split 1.</p>" },

      { titel: "Bewertung", text: "",
        teile: [
          t("a", "a) Erklären Sie die Rollen von Trainings-, Validierungs- und Testdaten.", 4, "Training: Lernen der Parameter (1 P.); Validierung: Modell- und Hyperparameterwahl (1,5 P.); Test: einmalige, unabhängige Endschätzung (1,5 P.)."),
          z("b", "b) Wie oft wird bei einer 5-fachen Kreuzvalidierung trainiert?", 2, 5, 0),
          w("c", "c) Was bedeutet stratifizierte Aufteilung?", 2, ["Klassenanteile bleiben in allen Teilen gleich", "Daten werden sortiert", "Ausreißer werden entfernt", "nur große Klassen werden genutzt"], 0),
          w("d", "d) Welches Vorgehen führt zu Data Leakage?", 2, ["dieselbe Bürgeranfrage liegt in leicht veränderter Form in Training und Test", "Testdaten werden erst am Ende verwendet", "Daten werden zeitlich getrennt", "Skalierung nur auf Trainingsdaten"], 0)
        ],
        loesung: "<p>a) lernen, auswählen, abschließend prüfen · b) <b>5</b> · c) gleiche Klassenanteile · d) Dubletten über die Grenze von Training und Test.</p>" },

      { titel: "Python", text: "<pre class=\"code\">anfragen = [\"Termin\", \"Wohngeld\", \"Termin\", \"Ausweis\", \"Termin\"]\nzaehler = {}\nfor a in anfragen:\n    zaehler[a] = zaehler.get(a, 0) + 1\nprint(zaehler[\"Termin\"])\nprint(len(zaehler))\nprint(sorted(zaehler.items(), key=lambda x: -x[1])[0][0])</pre>",
        teile: [
          z("a", "a) Erste Ausgabe", 3, 3, 0),
          z("b", "b) Zweite Ausgabe", 3, 3, 0),
          w("c", "c) Dritte Ausgabe", 2, ["Termin", "Wohngeld", "Ausweis", "3"], 0),
          w("d", "d) Was bewirkt zaehler.get(a, 0)?", 2, ["liefert den Wert zu a oder 0, falls a noch fehlt", "löscht a", "sortiert das Dictionary", "erzeugt einen Fehler bei fehlendem Schlüssel"], 0)
        ],
        loesung: "<p>a) <b>3</b> · b) drei Schlüssel → <b>3</b> · c) häufigstes Anliegen <b>Termin</b> · d) Standardwert 0.</p>" },

      { titel: "KI in der öffentlichen Verwaltung", text: "",
        teile: [
          w("a", "a) Welche Pflicht gilt für einen Bürgerchatbot nach der KI-Verordnung?", 2, ["Bürger müssen erkennen können, dass sie mit einer KI sprechen", "keine", "CE-Kennzeichnung als Hochrisiko-System", "Verbot"], 0),
          w("b", "b) Eine KI, die prüft, ob Bürger Anspruch auf öffentliche Leistungen haben, ist …", 2, ["Hochrisiko (Anhang III)", "minimales Risiko", "verboten", "nur transparenzpflichtig"], 0),
          w("c", "c) Was müssen öffentliche Stellen vor dem Einsatz von Hochrisiko-KI zusätzlich durchführen?", 2, ["eine Grundrechte-Folgenabschätzung", "eine Steuerprüfung", "einen Hackathon", "nichts"], 0),
          t("d", "d) Warum sind Barrierefreiheit und Gleichbehandlung bei KI in Behörden besonders wichtig?", 4, "Behörden müssen alle Bürger gleich behandeln und erreichen, auch Menschen mit Behinderung oder geringen Deutschkenntnissen (2 P.); Gefahr, dass digitale Angebote Gruppen ausschließen oder benachteiligen (2 P.)."),
          w("e", "e) Auf welche Rechtsgrundlage stützt eine Behörde die Verarbeitung zur Aufgabenerfüllung meist?", 2, ["Art. 6 Abs. 1 lit. e DSGVO (öffentliche Aufgabe)", "Einwilligung", "berechtigtes Interesse", "Vertrag"], 0),
          w("f", "f) Eine Stadt will Bürger nach ihrem Sozialverhalten bewerten und davon Leistungen abhängig machen. Das ist …", 2, ["verboten (Social Scoring)", "Hochrisiko", "minimales Risiko", "nur transparenzpflichtig"], 0)
        ],
        loesung: "<p>a) KI-Hinweis · b) Hochrisiko · c) Grundrechte-Folgenabschätzung · d) Gleichbehandlung und Zugang für alle · e) öffentliche Aufgabe · f) verboten.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s07b", satz: 7, teil: 2, bereich: "B", titel: "Teil 1 · Bereich B: Vertiefung datenbasierter KI-Modelle", minuten: 120,
    aufgaben: [
      { titel: "Sprachmodelle nutzen", text: "<p>Ein Bürgerchatbot erhält 50.000 Anfragen im Monat mit je 800 Eingabe- und 200 Ausgabetokens. Preise: 2 € je 1 Mio. Eingabetokens, 8 € je 1 Mio. Ausgabetokens.</p>",
        teile: [
          t("a", "a) Unterscheiden Sie Zero-Shot- und Few-Shot-Prompting.", 4, "Zero-Shot: nur Aufgabenbeschreibung ohne Beispiele (2 P.); Few-Shot: einige Beispiele im Prompt zeigen Format und Stil (2 P.)."),
          z("b", "b) Tokenkosten pro Monat", 3, 160, 0.01, "€"),
          w("c", "c) Wozu dient ein Systemprompt?", 2, ["legt Rolle, Regeln und Grenzen des Assistenten dauerhaft fest", "speichert Nutzerpasswörter", "trainiert das Modell neu", "beschleunigt das Netz"], 0),
          t("d", "d) Was ist Prompt Injection, und wie schützen Sie den Chatbot?", 3, "Versteckte Anweisungen in Eingaben oder Dokumenten übersteuern die Regeln (1 P.); Schutz: Eingaben filtern, Rechte des Bots begrenzen, keine geheimen Daten im Prompt, Ausgabeprüfung (2 P.).")
        ],
        loesung: "<p>a) ohne vs. mit Beispielen · b) 40 Mio. · 2 € / 1 Mio. = 80 € plus 10 Mio. · 8 € / 1 Mio. = 80 € → <b>160 €</b> · c) Rolle und Regeln · d) versteckte Anweisungen; Filter, Rechte begrenzen, Ausgaben prüfen.</p>" },

      { titel: "Retrieval-Augmented Generation", text: "<p>Embedding der Frage a = (1; 2; 2), Embedding eines Textabschnitts b = (2; 0; 1).</p>",
        teile: [
          t("a", "a) Beschreiben Sie die Schritte einer RAG-Pipeline.", 4, "Dokumente in Abschnitte teilen (1 P.); Embeddings berechnen und in Vektordatenbank speichern (1 P.); bei Frage ähnlichste Abschnitte suchen (1 P.); Sprachmodell antwortet auf Basis dieser Abschnitte mit Quellen (1 P.)."),
          z("b", "b) Kosinusähnlichkeit von a und b (vier Nachkommastellen)", 3, 0.5963, 0.005),
          w("c", "c) Welchen Zielkonflikt hat die Abschnittslänge (Chunk-Größe)?", 2, ["zu klein: Kontext fehlt; zu groß: unpräzise Treffer und hohe Kosten", "keinen", "nur die Rechenzeit", "nur die Farbe der Darstellung"], 0),
          t("d", "d) Wie bewerten Sie die Qualität der RAG-Antworten?", 3, "Retrieval: Trefferquote relevanter Abschnitte (Recall@k) (1 P.); Antwort: Treue zu den Quellen/keine Halluzination, Korrektheit, Vollständigkeit an Testfragen (2 P.)."),
          w("e", "e) Was steuert der Parameter Top-k?", 2, ["wie viele Abschnitte dem Modell als Kontext übergeben werden", "die Lernrate", "die Zahl der Nutzer", "die Antwortlänge in Seiten"], 0)
        ],
        loesung: "<p>a) Aufteilen, einbetten, suchen, generieren · b) a · b = 4; |a| = 3; |b| = √5 ≈ 2,236; 4 / 6,708 ≈ <b>0,5963</b> · c) Kontext vs. Präzision · d) Recall@k, Quellentreue, Korrektheit · e) Anzahl der Abschnitte.</p>" },

      { titel: "Anpassen eines Sprachmodells", text: "",
        teile: [
          t("a", "a) Wann wählen Sie RAG, wann Fine-Tuning?", 4, "RAG: aktuelles, häufig wechselndes Faktenwissen mit Quellen (2 P.); Fine-Tuning: Stil, Format, Fachsprache oder spezielle Aufgaben dauerhaft lernen (2 P.)."),
          w("b", "b) Was ist LoRA?", 2, ["parameter-effizientes Fine-Tuning mit kleinen zusätzlichen Matrizen", "eine Datenbank", "ein Verschlüsselungsverfahren", "ein Tokenizer"], 0),
          w("c", "c) Was ist katastrophales Vergessen?", 2, ["das Modell verliert durch Nachtraining zuvor gelernte Fähigkeiten", "ein Serverabsturz", "ein Löschbefehl", "ein Datenschutzverstoß"], 0),
          w("d", "d) Wofür steht RLHF?", 2, ["Lernen aus menschlichem Feedback zur Ausrichtung des Modells", "eine Rechtsvorschrift", "ein Clusteralgorithmus", "eine Hardware"], 0)
        ],
        loesung: "<p>a) RAG für Wissen, Fine-Tuning für Verhalten · b) effizientes Fine-Tuning · c) Verlust alter Fähigkeiten · d) Reinforcement Learning from Human Feedback.</p>" },

      { titel: "Anliegen erkennen", text: "<p>Ein Intent-Modell liefert für die Klassen Termin, Wohngeld, Ausweis die Werte (1,0; 2,0; 0,5).</p>",
        teile: [
          z("a", "a) Softmax-Wahrscheinlichkeit für „Wohngeld“ (vier Nachkommastellen)", 3, 0.6285, 0.003),
          w("b", "b) Welche Klasse wird gewählt?", 2, ["Wohngeld", "Termin", "Ausweis", "keine"], 0),
          t("c", "c) Wie gehen Sie mit unsicheren Erkennungen um?", 3, "Schwelle für Mindestwahrscheinlichkeit (1 P.); darunter Rückfrage an den Bürger oder Weiterleitung an Mitarbeitende (2 P.)."),
          w("d", "d) Warum ist Kalibrierung für die Schwelle wichtig?", 2, ["damit eine angezeigte Wahrscheinlichkeit von 0,7 tatsächlich etwa 70 % Trefferquote bedeutet", "damit das Modell schneller rechnet", "damit weniger Klassen nötig sind", "weil es das Gesetz verlangt"], 0)
        ],
        loesung: "<p>a) e² / (e¹ + e² + e<sup>0,5</sup>) = 7,389 / 11,756 ≈ <b>0,6285</b> · b) Wohngeld · c) Schwelle, Rückfrage, Weiterleitung · d) verlässliche Wahrscheinlichkeiten.</p>" },

      { titel: "Fairness bei öffentlichen Leistungen", text: "<p>Eine KI-Vorprüfung empfiehlt die Ablehnung von 120 der 1.000 Anträge deutschsprachiger Antragstellender und von 90 der 400 Anträge nicht deutschsprachiger Antragstellender.</p>",
        teile: [
          z("a", "a) Ablehnungsquote deutschsprachig in %", 2, 12, 0.1, "%"),
          z("b", "b) Ablehnungsquote nicht deutschsprachig in %", 2, 22.5, 0.1, "%"),
          z("c", "c) Verhältnis der Quoten (nicht deutschsprachig / deutschsprachig)", 2, 1.875, 0.005),
          t("d", "d) Nennen Sie eine mögliche Ursache und zwei Maßnahmen.", 4, "Ursache (1 P.): Sprachbarrieren, unvollständige Unterlagen, Merkmale als Stellvertreter. Maßnahmen (je 1,5 P.): mehrsprachige Hilfe, Nachforderung statt Ablehnung, Merkmale prüfen, menschliche Prüfung aller Ablehnungsempfehlungen, gruppenweises Monitoring."),
          w("e", "e) Was fordert Demographic Parity?", 2, ["gleiche positive bzw. negative Entscheidungsquoten in allen Gruppen", "gleiche Recall-Werte", "gleich viele Daten je Gruppe", "gleiche Modellgröße"], 0)
        ],
        loesung: "<p>a) 120 / 1.000 = <b>12 %</b> · b) 90 / 400 = <b>22,5 %</b> · c) 22,5 / 12 = <b>1,875</b> · d) z. B. Sprachbarriere; mehrsprachige Hilfe, Nachforderung statt Ablehnung, menschliche Prüfung · e) gleiche Quoten.</p>" },

      { titel: "Begründung von Verwaltungsentscheidungen", text: "",
        teile: [
          t("a", "a) Warum muss die Behörde KI-gestützte Entscheidungen erklären können?", 4, "Verwaltungsakte sind zu begründen (§ 39 VwVfG) (2 P.); Rechtsschutz der Bürger, Nachprüfbarkeit durch Gerichte, Vertrauen (2 P.)."),
          w("b", "b) „Mit 300 € höherem Einkommen wäre der Antrag abgelehnt worden.“ Welche Erklärungsart ist das?", 2, ["kontrafaktische Erklärung", "globale Feature Importance", "Konfusionsmatrix", "Dendrogramm"], 0),
          w("c", "c) Wann darf ein Verwaltungsakt nach § 35a VwVfG vollständig automatisiert erlassen werden?", 2, ["wenn eine Rechtsvorschrift es zulässt und weder Ermessen noch Beurteilungsspielraum besteht", "immer", "nie", "wenn die KI sehr genau ist"], 0)
        ],
        loesung: "<p>a) Begründungspflicht, Rechtsschutz, Vertrauen · b) kontrafaktisch · c) nur mit gesetzlicher Zulassung und ohne Ermessen.</p>" },

      { titel: "Antworten eines Sprachmodells bewerten", text: "<p>300 Testfragen wurden von Fachleuten bewertet: 246 korrekt, 30 unvollständig, 24 falsch.</p>",
        teile: [
          z("a", "a) Anteil korrekter Antworten in %", 2, 82, 0.1, "%"),
          z("b", "b) Anteil falscher Antworten in %", 2, 8, 0.1, "%"),
          t("c", "c) Beschreiben Sie ein gutes Evaluationsdesign für den Chatbot.", 4, "Repräsentative Testfragen mit Referenzantworten aus Quellen (1 P.); klare Bewertungskriterien (korrekt, vollständig, verständlich, Quellen) (1 P.); mehrere Bewerter mit Abgleich (1 P.); regelmäßige Wiederholung und Fehleranalyse (1 P.)."),
          w("d", "d) Welches Risiko hat es, ein Sprachmodell andere Antworten bewerten zu lassen?", 2, ["eigene Verzerrungen und Fehlurteile des Bewertermodells; Stichproben durch Menschen nötig", "keines", "es ist verboten", "es ist zu langsam"], 0),
          w("e", "e) Was tun Sie vor dem Wechsel auf eine neue Modellversion?", 2, ["Regressionstest mit denselben Testfragen", "ohne Test umstellen", "alle Testfragen löschen", "nur die Preise vergleichen"], 0)
        ],
        loesung: "<p>a) 246 / 300 = <b>82 %</b> · b) 24 / 300 = <b>8 %</b> · c) Testset, Kriterien, mehrere Bewerter, Wiederholung · d) Bewertermodell irrt auch · e) Regressionstest.</p>" },

      { titel: "Python mit regulären Ausdrücken", text: "<pre class=\"code\">import re\ntext = \"Termin am 12.03.2027 um 10:30 im Raum 4\"\ndatum = re.search(r\"\\d{2}\\.\\d{2}\\.\\d{4}\", text).group()\nprint(datum)\nprint(len(text.split()))\nzahlen = re.findall(r\"\\d+\", text)\nprint(len(zahlen))</pre>",
        teile: [
          w("a", "a) Erste Ausgabe", 3, ["12.03.2027", "10:30", "12", "Termin"], 0),
          z("b", "b) Zweite Ausgabe", 3, 8, 0),
          z("c", "c) Dritte Ausgabe", 2, 6, 0),
          w("d", "d) Wozu dienen reguläre Ausdrücke hier?", 2, ["Muster wie Datumsangaben in Texten finden", "Texte übersetzen", "Bilder erkennen", "Daten verschlüsseln"], 0)
        ],
        loesung: "<p>a) <b>12.03.2027</b> · b) 8 Wörter · c) 12, 03, 2027, 10, 30, 4 → <b>6</b> · d) Mustersuche.</p>" },

      { titel: "Sicherer Betrieb", text: "",
        teile: [
          t("a", "a) Was sind Guardrails bei einem Chatbot? Nennen Sie zwei Beispiele.", 4, "Schutzmechanismen um das Modell (1 P.); z. B. Themenbegrenzung auf Verwaltungsfragen, Filter für beleidigende/gefährliche Inhalte, Pflicht zur Quellenangabe, Erkennung personenbezogener Daten, Weiterleitung bei sensiblen Themen (je 1,5 P.)."),
          w("b", "b) Wie gehen Sie mit Chatprotokollen datenschutzgerecht um?", 2, ["kurze Speicherfristen, Pseudonymisierung, Zugriff nur für Berechtigte", "unbegrenzt speichern", "öffentlich auswerten", "an Dritte verkaufen"], 0),
          t("c", "c) Vor einer Frist für Anträge erwarten Sie zehnmal so viele Anfragen. Was prüfen Sie vorab?", 4, "Lasttest mit Spitzenlast (2 P.); Skalierung beim Anbieter, Kontingente/Ratenlimits, Kostenobergrenze, Rückfalllösung (2 P.)."),
          w("d", "d) Was ist Rate Limiting?", 2, ["Begrenzung der Anfragen je Nutzer oder Zeit", "Senkung der Lernrate", "Bewertung der Antworten", "Datenlöschung"], 0)
        ],
        loesung: "<p>a) Themenbegrenzung, Inhaltsfilter, Quellenpflicht · b) kurze Fristen, Pseudonymisierung · c) Lasttest, Skalierung, Limits, Kosten · d) Anfragebegrenzung.</p>" }
    ]
  });

  window.PRUEFUNGEN.push({
    id: "bp-s07t2", satz: 7, teil: 3, bereich: "Teil 2", titel: "Teil 2: Situationsaufgabe – KI in der Stadtverwaltung", kurz: "Kommune · Bürgerservice", minuten: 240,
    situation: "<p>Die <b>Stadt Lindenau</b> (85.000 Einwohner, 900 Beschäftigte in der Verwaltung, Personalrat) erhält monatlich 12.000 telefonische Anfragen zu Terminen, Formularen und Gebühren. Die Telefonzentrale ist oft überlastet. Zudem steigt die Zahl der Wohngeldanträge; die Bearbeitung dauert im Schnitt sieben Wochen.</p><p>Geplant sind (1) ein Bürgerchatbot auf der Website mit einem Sprachmodell und den Inhalten der städtischen Seiten (RAG) und (2) eine KI-Vorprüfung von Wohngeldanträgen, die Unterlagen auf Vollständigkeit prüft und eine Empfehlung erstellt. Über den Antrag entscheiden weiterhin die Sachbearbeiterinnen. Sie leiten das Digitalisierungsprojekt.</p>",
    aufgaben: [
      { titel: "Lösungen konzipieren", text: "",
        teile: [
          t("a", "a) Beschreiben Sie die Architektur des Bürgerchatbots mit besonderem Blick auf die Anforderungen einer Behörde.", 6, "RAG über städtische Inhalte mit Quellenangabe (1 P.); KI-Hinweis (1 P.); Barrierefreiheit und einfache Sprache, Mehrsprachigkeit (1 P.); Übergabe an Mitarbeitende/Rückruf (1 P.); keine Verarbeitung sensibler Daten ohne Not, Datenschutzhinweis (1 P.); Guardrails, Monitoring (1 P.)."),
          z("b", "b) Von 12.000 Chatanfragen werden 8.400 ohne Weiterleitung gelöst. Lösungsquote in %", 2, 70, 0.1, "%"),
          z("c", "c) Monatliche Betriebskosten 1.800 €. Kosten je Anfrage in €", 2, 0.15, 0.001, "€"),
          t("d", "d) Grenzen Sie den Umfang der Wohngeld-Vorprüfung ab.", 4, "Prüft Vollständigkeit und Plausibilität der Unterlagen, schlägt Nachforderungen vor (2 P.); keine Entscheidung über den Anspruch, Empfehlung nur als Hinweis an die Sachbearbeitung (2 P.)."),
          w("e", "e) Wer entscheidet über den Wohngeldantrag?", 2, ["die Sachbearbeiterin bzw. der Sachbearbeiter", "die KI", "der Chatbot", "der Anbieter"], 0)
        ],
        loesung: "<p>a) RAG mit Quellen, KI-Hinweis, Barrierefreiheit, Mehrsprachigkeit, Übergabe an Menschen, Datenschutz, Guardrails.</p><p>b) <b>70 %</b> · c) 1.800 / 12.000 = <b>0,15 €</b> · d) Vollständigkeit und Plausibilität, keine Entscheidung · e) Mensch.</p>" },

      { titel: "Prozesse", text: "<p>Jede vom Chatbot gelöste Anfrage erspart einen Anruf von 4 Minuten. Eine Vollzeitkraft hat 130 produktive Stunden im Monat.</p>",
        teile: [
          z("a", "a) Eingesparte Stunden pro Monat", 3, 560, 0, "h"),
          z("b", "b) Entspricht wie vielen Vollzeitkräften (zwei Nachkommastellen)?", 3, 4.31, 0.02),
          t("c", "c) Beschreiben Sie den Soll-Prozess der Wohngeldbearbeitung mit KI-Vorprüfung.", 4, "Antrag digital eingehend (1 P.); KI prüft Vollständigkeit, fordert fehlende Unterlagen an (1 P.); Sachbearbeitung prüft Empfehlung und entscheidet (1 P.); Bescheid, Rückmeldung zur Verbesserung (1 P.)."),
          t("d", "d) Nennen Sie zwei Kennzahlen mit Zielwert.", 4, "Je 2 P.: Bearbeitungsdauer Wohngeld (z. B. von 7 auf 3 Wochen), Anteil vollständiger Anträge, Lösungsquote Chatbot, Erreichbarkeit Telefon, Bürgerzufriedenheit, Widerspruchsquote.")
        ],
        loesung: "<p>a) 8.400 · 4 / 60 = <b>560 h</b> · b) 560 / 130 ≈ <b>4,31</b> · c) Eingang → Vollständigkeitsprüfung → Nachforderung → menschliche Entscheidung → Bescheid · d) z. B. Bearbeitungsdauer 3 Wochen.</p>" },

      { titel: "Vergabe und Projekt", text: "<p>Für den Chatbot gingen zwei Angebote ein. Zuschlagskriterien: Preis 40 %, Qualität 40 %, Datenschutz 20 %. Angebot A: 7 / 8 / 9 Punkte · Angebot B: 9 / 6 / 7 Punkte.</p>",
        teile: [
          t("a", "a) Was ist bei der Beschaffung durch eine Kommune vergaberechtlich zu beachten?", 4, "Öffentlicher Auftraggeber, Vergaberecht anwendbar (1 P.); ab EU-Schwellenwert europaweite Ausschreibung, darunter nationale Verfahren (1 P.); produktneutrale Leistungsbeschreibung (1 P.); vorab bekannt gemachte, gewichtete Zuschlagskriterien, Dokumentation (1 P.)."),
          z("b", "b) Nutzwert Angebot A", 2, 7.8, 0.01),
          z("c", "c) Nutzwert Angebot B", 2, 7.4, 0.01),
          w("d", "d) Welches Angebot erhält den Zuschlag?", 2, ["A", "B"], 0),
          w("e", "e) Wer sollte im agilen Projekt Product Owner sein?", 2, ["eine Person aus dem Fachbereich Bürgerservice mit Entscheidungsbefugnis", "der externe Anbieter", "der Personalrat", "niemand"], 0),
          t("f", "f) Nennen Sie zwei Stakeholder mit hohem Einfluss.", 2, "Je 1 P.: Bürgermeister/Verwaltungsspitze, Stadtrat, Personalrat, Datenschutzbeauftragter, Fachbereichsleitung.")
        ],
        loesung: "<p>a) Vergaberecht, Schwellenwerte, neutrale Leistungsbeschreibung, bekannt gemachte Kriterien · b) 2,8 + 3,2 + 1,8 = <b>7,8</b> · c) 3,6 + 2,4 + 1,4 = <b>7,4</b> · d) A · e) Fachbereich · f) z. B. Verwaltungsspitze, Personalrat.</p>" },

      { titel: "Recht", text: "",
        teile: [
          w("a", "a) Einstufung des Bürgerchatbots nach der KI-Verordnung", 2, ["Transparenzpflicht (Art. 50)", "Hochrisiko", "verboten", "keine Pflichten"], 0),
          w("b", "b) Einstufung der Wohngeld-Vorprüfung", 2, ["Hochrisiko (Anhang III: Prüfung von Ansprüchen auf öffentliche Leistungen)", "minimales Risiko", "verboten", "nur Transparenz"], 0),
          t("c", "c) Nennen Sie vier Pflichten der Stadt als Betreiberin der Vorprüfung.", 4, "Je 1 P.: Grundrechte-Folgenabschätzung (Art. 27), Registrierung der Nutzung in der EU-Datenbank als Behörde, menschliche Aufsicht durch geschultes Personal, Gebrauchsanweisung befolgen, Protokolle aufbewahren, Information der Betroffenen."),
          t("d", "d) Welche datenschutz- und verwaltungsrechtlichen Anforderungen gelten?", 4, "Rechtsgrundlage Art. 6 Abs. 1 lit. e DSGVO mit Fachgesetz (1 P.); Art. 22 – keine ausschließlich automatisierte Entscheidung (1 P.); § 35a VwVfG nur mit gesetzlicher Grundlage, daher menschliche Entscheidung (1 P.); Begründungspflicht § 39 VwVfG, DSFA (1 P.)."),
          w("e", "e) Welches Gremium vertritt die Beschäftigten der Stadtverwaltung?", 2, ["der Personalrat nach dem Personalvertretungsrecht des Landes", "der Betriebsrat nach BetrVG", "die IHK", "der Stadtrat"], 0),
          w("f", "f) Was gilt für die Website der Stadt mit Chatbot?", 2, ["sie muss barrierefrei sein (Barrierefreiheitsvorgaben für öffentliche Stellen)", "Barrierefreiheit ist freiwillig", "nur gedruckte Formulare zählen", "keine Vorgaben"], 0),
          w("g", "g) Sind die automatisch erzeugten Chatbot-Antworten urheberrechtlich geschützt?", 2, ["ohne menschliche Schöpfung nach herrschender Auffassung nicht", "ja, immer", "nur mit Anmeldung", "nur in Deutschland"], 0)
        ],
        loesung: "<p>a) Transparenz · b) Hochrisiko · c) Grundrechte-Folgenabschätzung, Registrierung, menschliche Aufsicht, Protokolle · d) Art. 6 Abs. 1 lit. e, Art. 22, § 35a, § 39 VwVfG, DSFA · e) Personalrat · f) Barrierefreiheit · g) kein Schutz.</p>" },

      { titel: "Wirtschaftlichkeit", text: "<p>Die eingesparten Stunden (Aufgabe 2) werden mit 38 € je Stunde bewertet und für andere Aufgaben genutzt. Betriebskosten 1.800 € pro Monat, Support 30.000 € pro Jahr, Investition 300.000 € (Nutzungsdauer 3 Jahre, linear abgeschrieben).</p>",
        teile: [
          z("a", "a) Jährlicher Rückfluss", 3, 203760, 0, "€"),
          z("b", "b) Statische Amortisationszeit in Jahren (zwei Nachkommastellen)", 2, 1.47, 0.01, "Jahre"),
          z("c", "c) Kosten je gelöster Anfrage pro Jahr (Abschreibung plus laufende Kosten, zwei Nachkommastellen)", 3, 1.5, 0.01, "€"),
          t("d", "d) Nennen Sie zwei nicht-monetäre Nutzen für die Stadt.", 3, "Je 1,5 P.: Erreichbarkeit rund um die Uhr, Bürgerzufriedenheit, Entlastung der Beschäftigten, schnellere Wohngeldbescheide, Image als moderne Verwaltung."),
          w("e", "e) Was verlangt das Haushaltsrecht vor solchen Investitionen?", 3, ["eine angemessene Wirtschaftlichkeitsuntersuchung", "keine Prüfung", "nur einen Ratsbeschluss ohne Zahlen", "eine Steuerprüfung"], 0)
        ],
        loesung: "<p>a) 560 · 12 · 38 = 255.360 €; minus 21.600 € und 30.000 € = <b>203.760 €</b> · b) 300.000 / 203.760 ≈ <b>1,47 Jahre</b> · c) (100.000 + 21.600 + 30.000) / (8.400 · 12) = 151.600 / 100.800 ≈ <b>1,50 €</b> · d) Erreichbarkeit, Zufriedenheit · e) Wirtschaftlichkeitsuntersuchung.</p>" },

      { titel: "Personal und Führung", text: "<p>In der Telefonzentrale arbeiten zehn Beschäftigte, die befürchten, überflüssig zu werden.</p>",
        teile: [
          t("a", "a) Welche neuen Aufgaben und Qualifizierungen bieten Sie an?", 4, "Aufgaben: Bearbeitung weitergeleiteter komplexer Anliegen, Pflege der Chatbot-Inhalte, Qualitätskontrolle der Antworten, Unterstützung beim Wohngeld (2 P.); Qualifizierung: Schulungen, Redaktion in einfacher Sprache, Begleitung (2 P.)."),
          w("b", "b) Welcher Faktor wirkt nach Herzberg motivierend auf die neue Rolle „Chatbot-Redaktion“?", 2, ["mehr Verantwortung und interessante Inhalte", "neuer Bürostuhl", "Parkplatz", "Kantinenzuschuss"], 0),
          t("c", "c) Wie nutzen Sie vier Schritte nach Kotter für diese Veränderung?", 4, "Je 1 P.: Dringlichkeit (Wartezeiten, Beschwerden), Koalition (Teamleitung, Personalrat), Vision kommunizieren (Entlastung, bessere Erreichbarkeit), schnelle Erfolge zeigen, verankern."),
          w("d", "d) Zwei Teams beschuldigen sich gegenseitig und suchen Unterstützer in anderen Ämtern. Glasl-Stufe?", 2, ["Stufe 4 Koalitionen", "Stufe 1", "Stufe 8", "Stufe 2"], 0)
        ],
        loesung: "<p>a) komplexe Anliegen, Redaktion, Qualitätskontrolle; Schulung · b) Verantwortung · c) Dringlichkeit, Koalition, Vision, Erfolge · d) Stufe 4.</p>" },

      { titel: "Kritisches Denken und Kommunikation", text: "<p>Ein Bürger beschwert sich: Der Chatbot hat eine falsche Gebühr für den Reisepass genannt.</p>",
        teile: [
          t("a", "a) Führen Sie eine 5-Why-Analyse mit plausibler Grundursache durch und leiten Sie eine Maßnahme ab.", 4, "Kette bis zur Grundursache, z. B. alte Gebührenseite im Index → keine Aktualisierungsroutine/Zuständigkeit (3 P.); Maßnahme: Redaktionsprozess mit Verantwortlichen, automatische Neuindizierung (1 P.)."),
          t("b", "b) Wie kommunizieren Sie den KI-Einsatz gegenüber Bürgern und Presse?", 4, "Offen über Zweck, Grenzen und Ansprechpartner (2 P.); Hinweis, dass Menschen entscheiden, Datenschutz, Feedbackmöglichkeit, verständliche Sprache (2 P.)."),
          w("c", "c) Am Telefon schildert ein aufgebrachter Bürger sein Problem. Welche Methode hilft zuerst?", 2, ["aktives Zuhören", "sofort widersprechen", "Gespräch beenden", "Fachbegriffe erklären"], 0),
          w("d", "d) Nach jedem Sprint will das Team die Zusammenarbeit verbessern. Welches Format?", 2, ["Retrospektive", "Lenkungsausschuss", "Audit", "Mitarbeitergespräch"], 0)
        ],
        loesung: "<p>a) z. B. Gebühr falsch → alte Seite indiziert → keine Aktualisierung → keine Zuständigkeit → Maßnahme Redaktionsprozess · b) offen, Grenzen, Menschen entscheiden · c) aktives Zuhören · d) Retrospektive.</p>" }
    ]
  });
})(PB.z, PB.w, PB.t);
