/* Fallbeispiele für den Transfer-Simulator (Bachelor Professional, Modul 19). Alle Firmen sind erfunden. */
window.FAELLE = [
  {
    id: "maschinenbau", branche: "Maschinenbau", firma: "Hartmann Antriebstechnik GmbH",
    kurz: "Vorausschauende Wartung vom Pilot auf drei Werke skalieren",
    beschreibung: "<p>Die <b>Hartmann Antriebstechnik GmbH</b> (1.400 Beschäftigte, drei Werke in Deutschland und Polen, Betriebsrat) hat in Werk 1 einen erfolgreichen Pilot zur vorausschauenden Wartung von 40 Fräsmaschinen abgeschlossen: Die ungeplanten Stillstände sanken um 35 %.</p><ul><li><b>Problem:</b> Die Lösung läuft als Insellösung auf einem Rechner in der Instandhaltung; die anderen Werke haben andere Maschinentypen und Sensoren. Je Stillstand entstehen im Schnitt 18.000 € Kosten, insgesamt rund 2,1 Mio. € pro Jahr.</li><li><b>Daten:</b> Sensordaten aus Werk 1 seit drei Jahren, Instandhaltungsaufträge (teils Freitext, teils Polnisch), keine einheitliche Datenplattform.</li><li><b>Beteiligte:</b> Geschäftsführung, drei Werkleitungen, Instandhaltung, zentrale IT, Betriebsrat und polnische Belegschaftsvertretung, Datenschutz.</li><li><b>Rahmen:</b> Budget 600.000 € für zwei Jahre; die Geschäftsführung erwartet eine Entscheidungsvorlage zum Rollout.</li></ul>"
  },
  {
    id: "versicherung", branche: "Versicherung", firma: "Süddeutsche Lebens- und Krankenversicherung AG",
    kurz: "KI-Unterstützung in der Risikoprüfung neuer Kranken-Zusatzversicherungen",
    beschreibung: "<p>Die <b>Süddeutsche Lebens- und Krankenversicherung AG</b> (2.300 Beschäftigte, Betriebsrat) prüft jährlich 85.000 Anträge auf Kranken-Zusatzversicherungen.</p><ul><li><b>Problem:</b> Die Risikoprüfung dauert im Schnitt neun Tage; 30 % der Anträge brauchen Rückfragen. Wettbewerber entscheiden einfache Fälle in Minuten.</li><li><b>Daten:</b> 600.000 historische Anträge mit Gesundheitsangaben und Entscheidungen, Leistungsdaten, Vertragsbestände.</li><li><b>Beteiligte:</b> Vorstand, Risikoprüfung, Aktuariat, Compliance, Datenschutz, Betriebsrat, Vertrieb.</li><li><b>Rahmen:</b> Risikobewertung in der Krankenversicherung ist Hochrisiko-KI; Gesundheitsdaten sind besonders geschützt; die Aufsicht erwartet nachvollziehbare Entscheidungen.</li></ul>"
  },
  {
    id: "handel", branche: "Handel", firma: "Kaufhaus Becker GmbH & Co. KG",
    kurz: "Generative KI im Kundenservice und Content über alle Kanäle",
    beschreibung: "<p>Die <b>Kaufhaus Becker GmbH &amp; Co. KG</b> (950 Beschäftigte, 12 Häuser und Onlineshop, Betriebsrat) will generative KI breit einsetzen.</p><ul><li><b>Problem:</b> 45.000 Kundenanfragen pro Monat über Telefon, E-Mail und Chat, Antwortzeit per E-Mail im Schnitt drei Tage; für 8.000 neue Artikel pro Saison fehlen gute Texte. Einzelne Abteilungen nutzen bereits private KI-Konten (Schatten-KI).</li><li><b>Daten:</b> Ticketsystem mit 400.000 Anfragen, Produktstammdaten, Richtlinien, FAQ.</li><li><b>Beteiligte:</b> Geschäftsführung, Kundenservice (60 Beschäftigte), Marketing, E-Commerce, IT, Betriebsrat, Datenschutz.</li><li><b>Rahmen:</b> Es gibt noch keine KI-Richtlinie; die Geschäftsführung wünscht ein Gesamtkonzept mit Governance, nicht nur ein Tool.</li></ul>"
  },
  {
    id: "logistik", branche: "Logistik", firma: "Nordport Logistik AG",
    kurz: "KI-gestützte Personaleinsatz- und Tourenplanung",
    beschreibung: "<p>Die <b>Nordport Logistik AG</b> (2.800 Beschäftigte, acht Standorte, Betriebsrat) betreibt Lager und Nahverkehr für den Handel.</p><ul><li><b>Problem:</b> Schwankende Mengen führen zu Überstunden (jährlich 210.000 Stunden) und kurzfristigen Leiharbeitseinsätzen; die Tourenplanung erfolgt manuell durch 14 Disponenten.</li><li><b>Daten:</b> Sendungsdaten, Schichtpläne, Zeiterfassung, Telematik der 300 Fahrzeuge.</li><li><b>Beteiligte:</b> Vorstand, Standortleitungen, Disposition, Personalabteilung, Betriebsrat, Datenschutz, Kunden.</li><li><b>Rahmen:</b> Systeme, die Aufgaben nach Verhalten zuweisen oder Leistung bewerten, sind Hochrisiko-KI; Telematik und Zeiterfassung berühren Mitbestimmungsrechte.</li></ul>"
  },
  {
    id: "kommune", branche: "Öffentliche Verwaltung", firma: "Landkreis Rheintal",
    kurz: "KI-Strategie und erste Anwendungen in der Kreisverwaltung",
    beschreibung: "<p>Der <b>Landkreis Rheintal</b> (210.000 Einwohner, 1.600 Beschäftigte, Personalrat) will KI einführen.</p><ul><li><b>Problem:</b> 18 % der Stellen sind unbesetzt, bis 2030 gehen weitere 25 % in Rente. Anträge (z. B. Elterngeld, Kfz-Zulassung, Baugenehmigungen) stauen sich.</li><li><b>Daten:</b> Fachverfahren je Amt, Dokumentenmanagement, Bürgerportal, aber keine gemeinsame Datenbasis.</li><li><b>Beteiligte:</b> Landrat, Amtsleitungen, IT-Dienstleister, Personalrat, Datenschutz, Kreistag, Bürger.</li><li><b>Rahmen:</b> Vergaberecht, Haushaltsrecht, Barrierefreiheit; bei Hochrisiko-KI ist eine Grundrechte-Folgenabschätzung nötig.</li></ul>"
  },
  {
    id: "energie", branche: "Energie", firma: "Westfalen Energienetz GmbH",
    kurz: "KI für Netzplanung und Engpassprognose im Verteilnetz",
    beschreibung: "<p>Die <b>Westfalen Energienetz GmbH</b> (780 Beschäftigte, Betriebsrat) betreibt ein Stromverteilnetz mit 250.000 Anschlüssen.</p><ul><li><b>Problem:</b> Durch Wärmepumpen, Wallboxen und Photovoltaik steigen die Engpässe; Netzausbau ist teuer und langwierig. Anschlussanfragen dauern im Schnitt zwölf Wochen.</li><li><b>Daten:</b> Messdaten der Umspannstationen, Smart-Meter-Daten (teilweise), Anschlussanträge, Wetterdaten.</li><li><b>Beteiligte:</b> Geschäftsführung, Netzplanung, Netzleitstelle, IT/OT-Sicherheit, Datenschutz, Betriebsrat, Regulierungsbehörde.</li><li><b>Rahmen:</b> NIS-2-Pflichten; KI als Sicherheitsbauteil der Netzsteuerung wäre Hochrisiko-KI – das Projekt soll zunächst planen und prognostizieren, nicht steuern.</li></ul>"
  }
];
