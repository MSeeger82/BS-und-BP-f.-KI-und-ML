"""Erklär-GIFs für Modul 12: Recht II – Datenschutz, Datensicherheit, Urheber- und Patentrecht, EU-KI-Recht."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow)

NR = 12


def grundsaetze():
    """Die sieben Grundsätze nach Art. 5 DSGVO erscheinen nacheinander."""
    g = [("Rechtmäßigkeit, Treu und Glauben, Transparenz", "Rechtsgrundlage, verständliche Information"),
         ("Zweckbindung", "nur für festgelegte, eindeutige Zwecke"),
         ("Datenminimierung", "so wenig Daten wie nötig"),
         ("Richtigkeit", "falsche Daten berichtigen oder löschen"),
         ("Speicherbegrenzung", "löschen, wenn der Zweck erfüllt ist"),
         ("Integrität und Vertraulichkeit", "angemessene Sicherheit"),
         ("Rechenschaftspflicht", "Einhaltung nachweisen können")]
    a = Anim()
    for i in range(84):
        img, d = canvas()
        title(d, "Art. 5 DSGVO: sieben Grundsätze")
        n = min(7, i // 9 + 1)
        cols = [SKY, TEAL, VIOLET, AMBER, CORAL, SKY, TEAL]
        for k in range(n):
            y = 52 + k * 39
            c = cols[k]
            d.rounded_rectangle(p(24, y, 616, y + 33), radius=6 * 2, fill=mix(WHITE, c, .15), outline=c, width=2)
            d.ellipse(p(32, y + 6, 54, y + 28), fill=c)
            text(d, (43, y + 17), str(k + 1), 11, True, WHITE, "mm")
            text(d, (66, y + 17), g[k][0], 13, True, INK, "lm")
            text(d, (606, y + 17), g[k][1], 11, False, MUTED, "rm")
        caption(d, "Für KI besonders heikel: Zweckbindung und Datenminimierung beim Training")
        a.frame(img, 100)
    a.hold(3400)
    a.save(NR, "grundsaetze.gif")


def avv():
    """Verantwortlicher, Auftragsverarbeiter, Unterauftragnehmer, Drittland."""
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Auftragsverarbeitung beim KI-Dienst in der Cloud")
        box(d, 24, 120, 170, 64, "Unternehmen", TEAL, TEAL_L, "Verantwortlicher", size=14)
        if i > 10:
            arrow(d, 196, 152, 236, 152, GREY, 3)
            box(d, 238, 120, 170, 64, "KI-Anbieter", SKY, SKY_L, "Auftragsverarbeiter", size=14)
            text(d, (216, 104), "AV-Vertrag", 11, True, VIOLET, "mm")
            text(d, (216, 118), "Art. 28", 10, False, VIOLET, "mm")
        if i > 26:
            arrow(d, 410, 152, 450, 152, GREY, 3)
            box(d, 452, 120, 164, 64, "Rechenzentrum", AMBER, AMBER_L, "Unterauftragnehmer", size=14)
        if i > 42:
            d.rounded_rectangle(p(446, 210, 622, 300), radius=8 * 2, outline=CORAL, width=2 * 2)
            text(d, (534, 228), "Drittland, z. B. USA", 12, True, CORAL, "mm")
            text(d, (534, 250), "Angemessenheitsbeschluss", 11, False, INK, "mm")
            text(d, (534, 266), "(Data Privacy Framework)", 11, False, INK, "mm")
            text(d, (534, 284), "oder Standardvertragsklauseln", 11, False, INK, "mm")
        if i > 58:
            text(d, (24, 220), "Prüfen:", 13, True, INK)
            for k, s in enumerate(["Weisungsgebundenheit, TOM", "kein Training mit Ihren Daten?", "Unterauftragnehmer, Speicherort", "Löschung am Vertragsende"]):
                text(d, (24, 244 + k * 20), "• " + s, 12, False, INK)
        caption(d, "Die Verantwortung bleibt beim Unternehmen, auch wenn der Dienst ausgelagert ist")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "avv.gif")


def schutzziele():
    """Vertraulichkeit, Integrität, Verfügbarkeit mit Maßnahmen."""
    z = [("Vertraulichkeit", "nur Befugte sehen Daten", ["Verschlüsselung", "Rollen und Rechte", "Zwei-Faktor-Anmeldung"], SKY, SKY_L),
         ("Integrität", "Daten und Modelle unverändert", ["Protokollierung", "Prüfsummen, Signaturen", "Versionierung"], VIOLET, VIOLET_L),
         ("Verfügbarkeit", "System läuft, wenn nötig", ["Backups", "Redundanz", "Notfallplan"], TEAL, TEAL_L)]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Datensicherheit: Schutzziele und Maßnahmen")
        n = min(3, i // 14 + 1)
        for k in range(n):
            nme, sub, ms, c, cl = z[k]
            x = 24 + k * 200
            box(d, x, 60, 190, 60, nme, c, cl, sub, size=15)
            t = ease((i - k * 14) / 12)
            for j, m in enumerate(ms):
                if t > j / 3:
                    d.rounded_rectangle(p(x + 10, 136 + j * 40, x + 180, 168 + j * 40), radius=6 * 2, fill=WHITE, outline=c, width=2)
                    text(d, (x + 95, 152 + j * 40), m, 12, False, INK, "mm")
        if i > 50:
            text(d, (320, 286), "Organisatorisch: Schulung, Richtlinien, Berechtigungsprüfung, Notfallübungen", 12, True, INK, "mm")
            text(d, (320, 308), "Rahmen: ISO/IEC 27001 oder BSI IT-Grundschutz", 12, False, MUTED, "mm")
        caption(d, "Technische und organisatorische Maßnahmen (TOM), Art. 32 DSGVO")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "schutzziele.gif")


def tdm():
    """Text- und Data-Mining: erlaubt, außer bei maschinenlesbarem Nutzungsvorbehalt."""
    a = Anim()
    sites = [("Website A", False), ("Website B", True), ("Website C", False), ("Website D", True)]
    for i in range(80):
        img, d = canvas()
        title(d, "Trainingsdaten: Text- und Data-Mining (§ 44b UrhG)")
        box(d, 470, 130, 146, 70, "Trainingsdatensatz", TEAL, TEAL_L, size=13)
        for k, (nme, vorb) in enumerate(sites):
            y = 60 + k * 66
            c = CORAL if vorb else SKY
            box(d, 24, y, 140, 50, nme, c, CORAL_L if vorb else SKY_L, "Vorbehalt in robots.txt" if vorb else "kein Vorbehalt", size=13)
            t = ease((i - 8 - k * 10) / 14)
            if t > 0:
                if vorb:
                    xe = 166 + 120 * t
                    arrow(d, 166, y + 25, xe, y + 25, CORAL, 2)
                    if t > .95:
                        d.line(p(270, y + 13, 294, y + 37), fill=CORAL, width=3 * 2)
                        d.line(p(294, y + 13, 270, y + 37), fill=CORAL, width=3 * 2)
                        text(d, (304, y + 25), "nicht verwenden", 11, True, CORAL, "lm")
                else:
                    xe = 166 + (468 - 166) * t
                    ye = y + 25 + (165 - y - 25) * t
                    arrow(d, 166, y + 25, xe, ye, SKY, 2)
        caption(d, "Rein KI-erzeugte Ergebnisse ohne menschliche Schöpfung: nach h. M. kein Urheberrechtsschutz")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "tdm.gif")


def pyramide():
    """Risikopyramide der EU-KI-Verordnung."""
    lv = [("unannehmbar: verboten", "Social Scoring, Emotionserkennung am Arbeitsplatz", CORAL, CORAL_L),
          ("hohes Risiko: strenge Pflichten", "Personalauswahl, Kredit, kritische Infrastruktur", AMBER, AMBER_L),
          ("Transparenzpflichten", "Chatbots, Deepfakes, KI-generierte Texte", SKY, SKY_L),
          ("minimales Risiko: keine Zusatzpflichten", "Spamfilter, KI in Spielen", TEAL, TEAL_L)]
    a = Anim()
    cx, top, bot = 176, 56, 316
    hh = (bot - top) / 4
    for i in range(80):
        img, d = canvas()
        title(d, "EU-KI-Verordnung: risikobasierter Ansatz")
        n = min(4, i // 12 + 1)
        for k in range(4):
            if 3 - k >= 4 - n:
                pass
        order = [3, 2, 1, 0]
        for idx in order[:n]:
            nme, bsp, c, cl = lv[idx]
            y0 = top + idx * hh
            y1 = y0 + hh
            w0 = (y0 - top) / (bot - top) * 160
            w1 = (y1 - top) / (bot - top) * 160
            d.polygon([p(cx - w0, y0), p(cx + w0, y0), p(cx + w1, y1), p(cx - w1, y1)], fill=cl, outline=c)
            text(d, (352, y0 + hh / 2 - 9), nme, 12, True, c, "lm")
            text(d, (352, y0 + hh / 2 + 9), bsp, 10, False, MUTED, "lm")
            d.line(p(cx + (w0 + w1) / 2 + 6, y0 + hh / 2, 346, y0 + hh / 2), fill=GRID, width=2)
        caption(d, "Zusätzlich: eigene Pflichten für KI-Modelle mit allgemeinem Verwendungszweck (GPAI)")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "pyramide.gif")


def zeitstrahl():
    """Fristen der EU-KI-Verordnung nach dem Digital Omnibus."""
    ev = [("1.8.2024", "in Kraft", GREY), ("2.2.2025", "Verbote, KI-Kompetenz", CORAL), ("2.8.2025", "Pflichten GPAI-Modelle, Sanktionen", VIOLET),
          ("2.8.2026", "Transparenz (Art. 50), Aufsicht", SKY), ("2.12.2027", "Hochrisiko nach Anhang III", AMBER), ("2.8.2028", "Hochrisiko-Produkte (Anhang I)", TEAL)]
    X0, X1 = 50, 590
    t0, t1 = 2024.5, 2028.7

    def xd(s):
        dd, mm, yy = (int(v) for v in s.split("."))
        return X0 + (yy + (mm - 1) / 12 + dd / 365 - t0) / (t1 - t0) * (X1 - X0)

    a = Anim()
    for i in range(84):
        img, d = canvas()
        title(d, "EU-KI-Verordnung: Fristen (Stand nach Digital Omnibus 2026)")
        d.line(p(X0, 190, X1, 190), fill=GREY, width=3 * 2)
        for y in range(2025, 2029):
            x = X0 + (y - t0) / (t1 - t0) * (X1 - X0)
            d.line(p(x, 184, x, 196), fill=GREY, width=2)
            text(d, (x, 206), str(y), 11, False, MUTED, "mm")
        n = min(6, i // 10 + 1)
        for k in range(n):
            dt, s, c = ev[k]
            x = xd(dt)
            up = k % 2 == 0
            y = (78 if k == 0 else 120) if up else 250
            d.line(p(x, 190, x, y + (18 if up else -18)), fill=c, width=2)
            d.ellipse(p(x - 7, 183, x + 7, 197), fill=c)
            ax = "mm"
            xx = min(max(x, 70), 545)
            text(d, (xx, y - 8), dt, 12, True, c, ax)
            text(d, (xx, y + 10), s, 11, False, INK, ax)
        if i > 66:
            text(d, (320, 316), "Hochrisiko-Termine wurden von 2.8.2026 / 2.8.2027 verschoben (VO (EU) 2026/1744)", 11, True, AMBER, "mm")
        caption(d, "Vor der Prüfung den aktuellen Stand prüfen – das Recht entwickelt sich weiter")
        a.frame(img, 100)
    a.hold(3600)
    a.save(NR, "zeitstrahl.gif")


if __name__ == "__main__":
    grundsaetze()
    avv()
    schutzziele()
    tdm()
    pyramide()
    zeitstrahl()
