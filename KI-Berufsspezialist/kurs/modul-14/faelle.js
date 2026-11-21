/* Fallbeispiele für den Transferprojekt-Simulator (Modul 14). Alle Firmen sind erfunden. */
window.FAELLE = [
  {
    id: "produktion", branche: "Produktion", firma: "Kunststofftechnik Lehmann GmbH",
    kurz: "Ungeplante Maschinenausfälle vorhersagen",
    beschreibung: "<p>Die <b>Kunststofftechnik Lehmann GmbH</b> (260 Mitarbeitende) fertigt Kunststoffteile für die Autoindustrie auf 18 Spritzgießmaschinen im Dreischichtbetrieb.</p><ul><li><b>Problem:</b> rund 24 ungeplante Stillstände pro Jahr, je Ausfall im Schnitt 12.000 € (Reparatur, Ausschuss, Lieferverzug, Sonderschichten).</li><li><b>Daten:</b> Seit 30 Monaten speichert das Leitsystem je Maschine Temperatur, Einspritzdruck, Zykluszeit und Stromaufnahme im Sekundentakt. Ausfälle und Reparaturen stehen im Instandhaltungssystem (teils als Freitext).</li><li><b>Beteiligte:</b> Geschäftsführung, Produktionsleitung, Instandhaltung (6 Personen), IT (2 Personen), Betriebsrat, Datenschutzbeauftragter (extern).</li><li><b>Rahmen:</b> Budget bis 80.000 € für einen Pilot, Entscheidung in drei Monaten.</li></ul>"
  },
  {
    id: "handel", branche: "Lebensmittelhandel", firma: "Frischemarkt Nord GmbH",
    kurz: "Bestellmengen für Frischwaren prognostizieren",
    beschreibung: "<p>Die <b>Frischemarkt Nord GmbH</b> betreibt 32 Supermärkte in Norddeutschland.</p><ul><li><b>Problem:</b> Bei Obst, Gemüse und Backwaren werden jährlich Waren im Wert von 1,9 Mio. € abgeschrieben (verdorben, unverkauft). Gleichzeitig sind beliebte Artikel nachmittags oft ausverkauft.</li><li><b>Daten:</b> Kassendaten aller Filialen der letzten vier Jahre, Bestellungen und Abschriften je Artikel und Tag, Aktionskalender, Öffnungszeiten; externe Wetterdaten können zugekauft werden.</li><li><b>Beteiligte:</b> Geschäftsführung, Einkauf, Filialleitungen (bestellen bisher nach Erfahrung), IT, Betriebsrat.</li><li><b>Rahmen:</b> Pilot in vier Filialen; die Filialleitungen sollen die letzte Entscheidung behalten.</li></ul>"
  },
  {
    id: "versicherung", branche: "Versicherung", firma: "Hansa Mobil Versicherung AG",
    kurz: "Eingehende Schadensmeldungen automatisch vorsortieren",
    beschreibung: "<p>Die <b>Hansa Mobil Versicherung AG</b> (1.100 Mitarbeitende) versichert Kraftfahrzeuge.</p><ul><li><b>Problem:</b> Täglich gehen rund 2.500 Dokumente ein (Schadensmeldungen, Gutachten, Werkstattrechnungen, Fotos, Briefe). Die manuelle Sortierung und Erfassung dauert im Schnitt 4 Minuten je Dokument; Bearbeitungszeiten von bis zu 14 Tagen führen zu Beschwerden.</li><li><b>Daten:</b> 1,2 Mio. bereits zugeordnete Dokumente der letzten drei Jahre (PDF, Scans, Fotos) mit Dokumentart und Schadennummer.</li><li><b>Beteiligte:</b> Vorstand Schaden, Teamleitungen Schadenbearbeitung, IT-Architektur, Datenschutz, Informationssicherheit, Betriebsrat.</li><li><b>Rahmen:</b> Die Versicherung unterliegt der BaFin-Aufsicht; Cloud-Dienste nur mit strenger Prüfung.</li></ul>"
  },
  {
    id: "logistik", branche: "Logistik", firma: "Elbe Logistik GmbH",
    kurz: "Transportschäden beim Wareneingang per Bilderkennung erkennen",
    beschreibung: "<p>Die <b>Elbe Logistik GmbH</b> betreibt ein Kontraktlager für Elektronikhändler mit 140 Beschäftigten.</p><ul><li><b>Problem:</b> Täglich kommen rund 900 Paletten an. Beschädigungen werden oft erst später entdeckt; dann kann der Schaden nicht mehr dem Spediteur zugeordnet werden. Kosten nicht zuordenbarer Schäden: ca. 210.000 € pro Jahr.</li><li><b>Daten:</b> Am Tor sind Kameras vorhanden, Bilder werden 30 Tage gespeichert. Es gibt 2.300 dokumentierte Schadensfälle mit Fotos aus den letzten zwei Jahren (unterschiedliche Qualität).</li><li><b>Beteiligte:</b> Niederlassungsleitung, Lagerleitung, Schichtleiter Wareneingang, Kunden (Händler), Spediteure, IT, Betriebsrat.</li><li><b>Rahmen:</b> Die Lösung muss in Echtzeit an den Toren arbeiten; das Hallen-WLAN ist unzuverlässig.</li></ul>"
  },
  {
    id: "pflege", branche: "Gesundheit und Pflege", firma: "Pflegedienst Weserblick gGmbH",
    kurz: "Pflegedokumentation per Spracheingabe und KI-Zusammenfassung",
    beschreibung: "<p>Der ambulante <b>Pflegedienst Weserblick gGmbH</b> beschäftigt 85 Pflegekräfte, die täglich rund 600 Einsätze fahren.</p><ul><li><b>Problem:</b> Die Dokumentation dauert pro Einsatz 8–10 Minuten und wird oft nach Feierabend erledigt. Die Mitarbeiterzufriedenheit sinkt, die Fluktuation steigt.</li><li><b>Daten:</b> Strukturierte Pflegedokumentation in einer Branchensoftware mit Schnittstelle; Freitexte der Pflegeberichte der letzten fünf Jahre.</li><li><b>Beteiligte:</b> Geschäftsführung, Pflegedienstleitung, Pflegekräfte, Qualitätsmanagement, Datenschutzbeauftragte, Mitarbeitervertretung, Softwareanbieter.</li><li><b>Rahmen:</b> Gesundheitsdaten sind besonders geschützt; die Pflegekraft bleibt für den Inhalt der Dokumentation verantwortlich.</li></ul>"
  },
  {
    id: "verwaltung", branche: "Öffentliche Verwaltung", firma: "Stadt Moorstadt – Bürgerservice",
    kurz: "Wissensassistent für Bürgeranfragen",
    beschreibung: "<p>Der <b>Bürgerservice der Stadt Moorstadt</b> (78.000 Einwohner) beantwortet Anfragen per Telefon, E-Mail und Kontaktformular.</p><ul><li><b>Problem:</b> Rund 4.000 Anfragen pro Monat, davon etwa 60 % Standardfragen (Öffnungszeiten, benötigte Unterlagen, Gebühren, Zuständigkeiten). Wartezeiten am Telefon bis 25 Minuten.</li><li><b>Daten:</b> 650 Seiten Dienstleistungsbeschreibungen im städtischen Webportal, interne Arbeitsanweisungen, Gebührensatzungen, anonymisierte FAQ der letzten Jahre.</li><li><b>Beteiligte:</b> Bürgermeisterin, Fachbereichsleitung Bürgerservice, Sachbearbeitung, IT-Dienstleister der Stadt, Datenschutzbeauftragter, Personalrat, Bürgerinnen und Bürger.</li><li><b>Rahmen:</b> Antworten müssen rechtlich korrekt und barrierearm sein; die Stadt möchte eine Lösung mit Datenhaltung in der EU.</li></ul>"
  }
];
