"""Erklär-GIFs für Modul 8: Prozessmanagement."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 8


def prozess():
    """Input → Tätigkeiten → Output → Kunde, mit Prozesseigner und Kennzahl."""
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Was ist ein Prozess?")
        n = min(4, i // 10 + 1)
        items = [(24, "Input", "Kundenanfrage", SKY, SKY_L), (174, "Tätigkeiten", "prüfen, kalkulieren", VIOLET, VIOLET_L),
                 (344, "Output", "Angebot", AMBER, AMBER_L), (494, "Kunde", "intern oder extern", TEAL, TEAL_L)]
        for k in range(n):
            x, nme, sub, c, cl = items[k]
            box(d, x, 140, 130 if k != 1 else 150, 64, nme, c, cl, sub)
            if k:
                arrow(d, x - 18, 172, x - 4, 172, GREY)
        if i > 42:
            text(d, (24, 250), "Anfang und Ende definiert · wiederholt sich · erzeugt Wert für einen Kunden", 13, True, INK)
            text(d, (24, 276), "Prozesseigner: Leitung Vertriebsinnendienst · Kennzahl: Zeit bis Angebot", 13, False, MUTED)
        caption(d, "")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "prozess.gif")


def landkarte():
    """Prozesslandkarte: Management oben, Kernprozesse mittig (Kunde → Kunde), Unterstützung unten."""
    a = Anim()
    for i in range(60):
        img, d = canvas()
        title(d, "Prozesslandkarte")
        t1, t2, t3 = ease(i / 12), ease((i - 12) / 12), ease((i - 24) / 12)
        d.rounded_rectangle(p(80, 56, 560, 106), radius=10 * 2, fill=mix(BG, VIOLET_L, t1), outline=mix(BG, VIOLET, t1), width=2)
        text(d, (320, 81), "Managementprozesse: Strategie, Planung, Controlling", 13, True, mix(BG, INK, t1), "mm")
        for k, nme in enumerate(["Vertrieb", "Auftrag", "Produktion", "Versand", "Service"]):
            x = 80 + k * 96
            pts = [(x, 130), (x + 84, 130), (x + 96, 160), (x + 84, 190), (x, 190), (x + 12, 160)]
            d.polygon([p(*q) for q in pts], fill=mix(BG, TEAL_L, t2), outline=mix(BG, TEAL, t2))
            text(d, (x + 48, 160), nme, 11, True, mix(BG, INK, t2), "mm")
        text(d, (40, 160), "Kunde", 12, True, mix(BG, MUTED, t2), "mm")
        text(d, (600, 160), "Kunde", 12, True, mix(BG, MUTED, t2), "mm")
        d.rounded_rectangle(p(80, 214, 560, 264), radius=10 * 2, fill=mix(BG, AMBER_L, t3), outline=mix(BG, AMBER, t3), width=2)
        text(d, (320, 239), "Unterstützungsprozesse: Personal, IT, Einkauf, Buchhaltung", 13, True, mix(BG, INK, t3), "mm")
        caption(d, "Kernprozesse schaffen direkt Wert für den Kunden")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "landkarte.gif")


def bpmn():
    """Kleiner BPMN-Prozess: Start → Rechnung prüfen (KI) → Gateway → freigeben / klären → Ende."""
    a = Anim()

    def task(d, x, y, w, h, label, col, colL):
        d.rounded_rectangle(p(x, y, x + w, y + h), radius=10 * 2, fill=colL, outline=col, width=2 * 2)
        text(d, (x + w / 2, y + h / 2), label, 12, True, INK, "mm")

    for i in range(90):
        img, d = canvas()
        title(d, "BPMN 2.0: Rechnungseingang mit KI-Prüfung")
        # Pool / Lanes
        d.rectangle(p(20, 50, 620, 330), outline=GRID, width=2)
        d.line(p(20, 190, 620, 190), fill=GRID, width=2)
        text(d, (30, 60), "KI-System", 11, True, MUTED)
        text(d, (30, 200), "Buchhaltung", 11, True, MUTED)
        st = i // 10
        if st >= 0:
            d.ellipse(p(50, 105, 80, 135), outline=TEAL, width=2 * 2)
            text(d, (65, 150), "Rechnung", 10, False, MUTED, "mm")
            text(d, (65, 162), "eingegangen", 10, False, MUTED, "mm")
        if st >= 1:
            arrow(d, 82, 120, 118, 120, INK)
            task(d, 120, 95, 120, 50, "Daten auslesen", VIOLET, VIOLET_L)
        if st >= 2:
            arrow(d, 242, 120, 278, 120, INK)
            d.polygon([p(300, 98), p(322, 120), p(300, 142), p(278, 120)], fill=WHITE, outline=INK)
            text(d, (300, 120), "X", 14, True, INK, "mm")
            text(d, (300, 84), "Bestellung passt?", 10, False, MUTED, "mm")
        if st >= 3:
            arrow(d, 324, 120, 398, 120, INK)
            text(d, (360, 110), "ja", 10, False, MUTED, "mm")
            task(d, 400, 95, 130, 50, "Zahlung freigeben", VIOLET, VIOLET_L)
        if st >= 4:
            d.line(p(300, 144, 300, 250), fill=INK, width=2)
            arrow(d, 300, 250, 336, 250, INK)
            text(d, (310, 200), "nein", 10, False, MUTED)
            task(d, 338, 225, 130, 50, "Abweichung klären", AMBER, AMBER_L)
        if st >= 5:
            arrow(d, 532, 120, 556, 120, INK)
            d.ellipse(p(558, 105, 588, 135), outline=INK, width=4 * 2)
            arrow(d, 470, 250, 556, 250, INK)
            d.ellipse(p(558, 235, 588, 265), outline=INK, width=4 * 2)
        caption(d, "Kreis = Ereignis · Rechteck = Aktivität · Raute mit X = exklusives Gateway · Bahnen = Rollen")
        a.frame(img, 100)
    a.hold(3200)
    a.save(NR, "bpmn.gif")


def durchlaufzeit():
    """Zeitstrahl: Bearbeitung kurz, Warten lang; Effizienz."""
    segs = [("Bearbeitung", 20, VIOLET), ("Warten", 300, GREY), ("Bearbeitung", 15, VIOLET), ("Transport", 25, SKY),
            ("Warten", 600, GREY), ("Bearbeitung", 5, VIOLET)]
    total = sum(s[1] for s in segs)
    a = Anim()
    for i in range(60):
        t = ease(i / 40)
        img, d = canvas()
        title(d, "Durchlaufzeit: Wo bleibt die Zeit?")
        x = 30
        Wt = 580
        shown = total * t
        acc = 0
        for nme, m, col in segs:
            w = m / total * Wt
            vis = max(0, min(m, shown - acc)) / total * Wt
            if vis > 0:
                d.rectangle(p(x, 150, x + vis, 200), fill=col)
            if m / total * Wt > 40 and shown >= acc + m:
                text(d, (x + w / 2, 175), f"{m} min", 11, True, WHITE, "mm")
            x += w
            acc += m
        if t > .97:
            bz = sum(m for n, m, c in segs if n == "Bearbeitung")
            text(d, (30, 230), f"Bearbeitungszeit {bz} min · Durchlaufzeit {total} min", 14, True, INK)
            text(d, (30, 256), f"Prozesseffizienz = {bz} / {total} ≈ {de(bz / total * 100, 1)} %", 14, True, CORAL)
            text(d, (30, 290), "Hebel liegt im Warten – nicht im schnelleren Arbeiten", 13, False, MUTED)
        text(d, (30, 130), "violett = Bearbeitung · grau = Warten · blau = Transport", 11, False, MUTED)
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "durchlaufzeit.gif")


def ki_im_prozess():
    """Vorher: 5 manuelle Schritte. Nachher: KI liest aus und schlägt vor, Mensch prüft Ausnahmen."""
    a = Anim()
    before = ["Mail öffnen", "Daten abtippen", "Bestellung suchen", "Abgleichen", "Freigeben"]
    after = [("KI liest aus", VIOLET, VIOLET_L), ("KI gleicht ab", VIOLET, VIOLET_L), ("Mensch prüft Ausnahmen", AMBER, AMBER_L), ("Freigeben", TEAL, TEAL_L)]
    for i in range(70):
        img, d = canvas()
        title(d, "Wo passt KI in den Prozess?")
        text(d, (24, 60), "vorher: alles manuell, ca. 12 min je Rechnung", 13, True, MUTED)
        for k, s in enumerate(before):
            box(d, 24 + k * 122, 80, 110, 46, s, GREY, WHITE, size=11)
        if i > 25:
            t = ease((i - 25) / 20)
            text(d, (24, 180), "nachher: KI übernimmt Routine, Mensch die Ausnahmen, ca. 3 min je Rechnung", 13, True, mix(BG, TEAL, t))
            for k, (s, c, cl) in enumerate(after):
                box(d, 24 + k * 152, 200, 146, 50, s, c, cl, t=t, size=11)
        caption(d, "Automatisieren, unterstützen oder vorhersagen – und die Ausnahmen bewusst gestalten")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "ki-im-prozess.gif")


def pdca():
    """PDCA-Kreis, der eine Rampe hochrollt (KVP)."""
    a = Anim()
    labels = [("Plan", TEAL), ("Do", AMBER), ("Check", VIOLET), ("Act", CORAL)]
    for i in range(80):
        img, d = canvas()
        title(d, "PDCA: kontinuierlich verbessern")
        t = i / 80
        d.line(p(40, 320, 600, 120), fill=GREY, width=3 * 2)
        cx = 120 + 340 * ease(t)
        cy = 320 - (cx - 40) * (200 / 560) - 64  # Rad liegt auf der Rampe
        R = 62
        rot = t * 2 * math.pi * 1.5
        for k, (lab, col) in enumerate(labels):
            a0 = rot + k * math.pi / 2
            d.pieslice(p(cx - R, cy - R, cx + R, cy + R), start=math.degrees(a0), end=math.degrees(a0 + math.pi / 2), fill=col)
            am = a0 + math.pi / 4
            text(d, (cx + math.cos(am) * R * .58, cy + math.sin(am) * R * .58), lab, 12, True, WHITE, "mm")
        d.polygon([p(cx - 50, cy + 66), p(cx + 50, cy + 66), p(cx, cy + 60)], fill=GREY)
        text(d, (430, 300), "Keil = Standard sichert das Erreichte", 12, False, MUTED, "mm")
        caption(d, "Plan – Do – Check – Act, immer wieder: KVP")
        a.frame(img, 80)
    a.hold(2400)
    a.save(NR, "pdca.gif")


def process_mining():
    """Ereignisprotokoll wird zu einer Prozesslandkarte mit Häufigkeiten und Schleife."""
    log = [("4711", "Auftrag angelegt", "08:02"), ("4711", "Kredit geprüft", "08:40"), ("4711", "Ware versandt", "13:15"),
           ("4712", "Auftrag angelegt", "08:05"), ("4712", "Kredit geprüft", "09:10"), ("4712", "Auftrag geändert", "10:02"),
           ("4712", "Kredit geprüft", "11:30"), ("4712", "Ware versandt", "16:40")]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Process Mining: der Prozess, wie er wirklich läuft")
        for j, c in enumerate(["Fall-ID", "Aktivität", "Zeit"]):
            cell(d, 20 + [0, 60, 200][j], 50, [60, 140, 60][j], 22, c, fill=TEAL_L, bold=True, size=10)
        n = min(len(log), i // 4 + 1)
        for r in range(n):
            for j, v in enumerate(log[r]):
                cell(d, 20 + [0, 60, 200][j], 72 + r * 22, [60, 140, 60][j], 22, v, size=10)
        if i > 40:
            t = ease((i - 40) / 20)
            nodes = {"Auftrag angelegt": (440, 70), "Kredit geprüft": (440, 150), "Auftrag geändert": (580, 190), "Ware versandt": (440, 260)}
            for nme, (x, y) in nodes.items():
                col = CORAL if nme == "Auftrag geändert" else VIOLET
                box(d, x - 62, y - 18, 124, 36, nme, col, CORAL_L if col == CORAL else VIOLET_L, t=t, size=11)
            arrow(d, 440, 90, 440, 130, mix(BG, INK, t))
            text(d, (450, 110), "2×", 11, True, mix(BG, INK, t))
            arrow(d, 440, 170, 440, 240, mix(BG, INK, t))
            text(d, (450, 205), "2×", 11, True, mix(BG, INK, t))
            arrow(d, 500, 160, 540, 178, mix(BG, CORAL, t))
            arrow(d, 540, 200, 502, 158, mix(BG, CORAL, t))
            text(d, (520, 220), "Schleife 1×", 11, True, mix(BG, CORAL, t))
        caption(d, "Fall-ID + Aktivität + Zeitstempel genügen, um Abläufe, Varianten und Engpässe zu sehen")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "process-mining.gif")


if __name__ == "__main__":
    prozess()
    landkarte()
    bpmn()
    durchlaufzeit()
    ki_im_prozess()
    pdca()
    process_mining()
