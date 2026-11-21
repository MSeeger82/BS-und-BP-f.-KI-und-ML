"""Erklär-GIFs für Modul 16: Arbeits- und Betriebsverfassungsrecht."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, cell)

NR = 16


def fristen():
    """Kündigungsfristen des Arbeitgebers nach § 622 BGB als Treppe."""
    st = [("< 2 J.", "4 Wochen*"), ("2 J.", "1 Monat"), ("5 J.", "2 Monate"), ("8 J.", "3 Monate"), ("10 J.", "4 Monate"),
          ("12 J.", "5 Monate"), ("15 J.", "6 Monate"), ("20 J.", "7 Monate")]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Kündigungsfristen des Arbeitgebers (§ 622 BGB)")
        n = min(8, i // 7 + 1)
        for k in range(n):
            x = 30 + k * 72
            h = 24 + k * 22
            c = SKY if k == 0 else mix(TEAL, VIOLET, k / 7)
            d.rectangle(p(x, 300 - h, x + 64, 300), fill=mix(WHITE, c, .6), outline=c, width=2)
            text(d, (x + 32, 300 - h - 12), st[k][1], 11, True, INK, "mm")
            text(d, (x + 32, 314), st[k][0], 11, False, MUTED, "mm")
        text(d, (30, 60), "Betriebszugehörigkeit →", 11, False, MUTED)
        if i > 60:
            text(d, (30, 84), "* 4 Wochen zum 15. oder zum Monatsende; ab 2 Jahren zum Monatsende", 11, False, INK)
            text(d, (30, 102), "Probezeit (max. 6 Monate): 2 Wochen · Beschäftigte kündigen mit 4 Wochen", 11, False, INK)
        caption(d, "Kündigung nur schriftlich mit Originalunterschrift (§ 623 BGB) – keine E-Mail")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "fristen.gif")


def kschg():
    """Prüfschema Kündigungsschutz."""
    q = [("Gilt das KSchG?", "mehr als 10 Beschäftigte und mehr als 6 Monate im Betrieb", SKY, SKY_L),
         ("Sozial gerechtfertigt?", "personen-, verhaltens- oder betriebsbedingt", VIOLET, VIOLET_L),
         ("Betriebsrat angehört?", "§ 102 BetrVG – sonst unwirksam", AMBER, AMBER_L),
         ("Form und Frist?", "schriftlich, § 622 BGB, Sonderkündigungsschutz", TEAL, TEAL_L),
         ("Klage binnen 3 Wochen", "sonst gilt die Kündigung als wirksam", CORAL, CORAL_L)]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Ist die Kündigung wirksam? Ein Prüfschema")
        n = min(5, i // 12 + 1)
        for k in range(n):
            nm, sub, c, cl = q[k]
            y = 52 + k * 58
            box(d, 60, y, 520, 48, nm, c, cl, sub, size=14)
            if k:
                arrow(d, 320, y - 10, 320, y, GREY)
        caption(d, "Betriebsbedingt: Wegfall des Arbeitsplatzes, keine Weiterbeschäftigung, Sozialauswahl")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "kschg.gif")


def arbeitszeit():
    """Ein Arbeitstag: 8 bis 10 Stunden, Pausen, 11 Stunden Ruhezeit."""
    a = Anim()
    X0, X1 = 40, 600
    sx = lambda h: X0 + h / 24 * (X1 - X0)
    for i in range(70):
        t = ease(i / 50)
        img, d = canvas()
        title(d, "Arbeitszeitgesetz: Höchstarbeitszeit, Pausen, Ruhezeit")
        for h in range(0, 25, 2):
            text(d, (sx(h), 300), f"{(h + 7) % 24}:00", 10, False, MUTED, "mm")
            d.line(p(sx(h), 280, sx(h), 288), fill=GREY, width=2)
        d.line(p(X0, 284, X1, 284), fill=GREY, width=2)
        segs = [(0, 4, TEAL, "Arbeit"), (4, 4.5, AMBER, ""), (4.5, 8.5, TEAL, "Arbeit"), (8.5, 8.75, AMBER, ""), (8.75, 10.75, VIOLET, "bis 10 h"), (10.75, 21.75, SKY, "Ruhezeit mindestens 11 Stunden"), (21.75, 24, TEAL, "")]
        cur = 24 * t
        for a0, a1, c, lab in segs:
            if cur <= a0:
                continue
            b = min(a1, cur)
            d.rectangle(p(sx(a0), 150, sx(b), 220), fill=mix(WHITE, c, .6) if c != GREY else WHITE, outline=c, width=2)
            if lab and cur >= a1:
                text(d, (sx((a0 + a1) / 2), 185), lab, 11, True, INK, "mm")
        if t > .98:
            text(d, (40, 70), "Werktäglich 8 Stunden; bis 10 Stunden, wenn im Schnitt von 6 Monaten 8 Stunden erreicht werden.", 11, False, INK)
            text(d, (40, 90), "Pausen: bei mehr als 6 Stunden 30 Minuten, bei mehr als 9 Stunden 45 Minuten. Ruhezeit: 11 Stunden.", 11, False, INK)
            text(d, (40, 110), "Arbeitszeit ist zu erfassen (BAG 2022). Mobiles Arbeiten ändert daran nichts.", 11, True, CORAL)
        caption(d, "Mindesturlaub: 24 Werktage bei 6-Tage-Woche = 20 Arbeitstage bei 5-Tage-Woche")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "arbeitszeit.gif")


def scheinselbst():
    """Waage: Merkmale freier Mitarbeit vs. Arbeitsverhältnis."""
    links = ["weisungsgebunden in Zeit, Ort, Inhalt", "in die Organisation eingegliedert", "nur ein Auftraggeber", "kein unternehmerisches Risiko"]
    rechts = ["frei in Zeit, Ort, Ausführung", "eigene Arbeitsmittel", "mehrere Auftraggeber", "eigenes Unternehmerrisiko"]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Freie Mitarbeit oder verdecktes Arbeitsverhältnis?")
        n = min(4, i // 12 + 1)
        tilt = -min(n, 4) * 4 if i < 60 else -16
        cx = 320
        ang = math.radians(tilt)
        lx, ly = cx - 200 * math.cos(ang), 120 - 200 * math.sin(ang)
        rx, ry = cx + 200 * math.cos(ang), 120 + 200 * math.sin(ang)
        d.polygon([p(cx, 120), p(cx - 20, 330), p(cx + 20, 330)], fill=GRID)
        d.line(p(lx, ly, rx, ry), fill=INK, width=3 * 2)
        text(d, (lx, ly - 18), "Arbeitsverhältnis", 13, True, CORAL, "mm")
        text(d, (rx, ry - 18), "freie Mitarbeit", 13, True, TEAL, "mm")
        for k in range(n):
            text(d, (lx - 110, ly + 20 + k * 20), "• " + links[k], 10, False, INK, "la")
            text(d, (rx - 90, ry + 20 + k * 20) if ry + 20 + k * 20 < 330 else (rx - 90, 300), "• " + rechts[k], 10, False, MUTED, "la")
        if i > 60:
            text(d, (320, 340 - 24), "Gesamtbild entscheidet; Klärung über das Statusfeststellungsverfahren der DRV", 11, True, INK, "mm")
        caption(d, "Scheinselbstständigkeit: Nachzahlung der Sozialversicherungsbeiträge droht")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "scheinselbst.gif")


def beteiligung():
    """Stufen der Beteiligungsrechte des Betriebsrats."""
    st = [("Information", "§ 80 Abs. 2, § 90 Abs. 1", SKY), ("Anhörung", "§ 102 vor jeder Kündigung", SKY),
          ("Beratung", "§ 90 Abs. 2, § 92a, § 111", TEAL), ("Widerspruch", "§ 102 Abs. 3", AMBER),
          ("Zustimmungsverweigerung", "§ 99 Einstellung, Versetzung", AMBER), ("Mitbestimmung", "§ 87, § 95 Abs. 2a", CORAL)]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Beteiligungsrechte des Betriebsrats: von schwach bis stark")
        n = min(6, i // 10 + 1)
        for k in range(n):
            nm, par, c = st[k]
            x = 30 + k * 96
            h = 34 + k * 25
            d.rectangle(p(x, 300 - h, x + 88, 300), fill=mix(WHITE, c, .55), outline=c, width=2)
            text(d, (x + 44, 300 - h + 16), nm if len(nm) < 14 else "Zustimmungs-", 11, True, INK, "mm")
            if len(nm) >= 14:
                text(d, (x + 44, 300 - h + 30), "verweigerung", 11, True, INK, "mm")
        if i > 60:
            for k in range(6):
                text(d, (40 + (k % 2) * 300, 64 + (k // 2) * 18), f"{st[k][0]}: {st[k][1]}", 10, False, INK)
        caption(d, "Bei echter Mitbestimmung entscheidet bei Nichteinigung die Einigungsstelle")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "beteiligung.gif")


def ki_einfuehrung():
    """KI-Einführung mit Betriebsrat: Ablauf mit Paragrafen."""
    st = [("Planung", "§ 90: rechtzeitig unterrichten, beraten (auch KI)", SKY, SKY_L),
          ("Sachverstand", "§ 80 Abs. 3: Sachverständiger bei KI gilt als erforderlich", VIOLET, VIOLET_L),
          ("Verhandeln", "§ 87 Abs. 1 Nr. 6: Überwachungseignung → Mitbestimmung", AMBER, AMBER_L),
          ("Auswahlrichtlinien", "§ 95 Abs. 2a: auch bei KI zustimmungspflichtig", AMBER, AMBER_L),
          ("Betriebsvereinbarung", "Zweck, Daten, Auswertungen, Schulung, Evaluation", TEAL, TEAL_L),
          ("Einigungsstelle", "falls keine Einigung (§ 76)", CORAL, CORAL_L)]
    a = Anim()
    for i in range(84):
        img, d = canvas()
        title(d, "KI im Betrieb einführen: der Betriebsrat ist dabei")
        n = min(6, i // 12 + 1)
        for k in range(n):
            nm, sub, c, cl = st[k]
            y = 50 + k * 50
            box(d, 30, y, 150, 40, nm, c, cl, size=12)
            text(d, (196, y + 20), sub, 12, False, INK, "lm")
            if k and k < 5:
                arrow(d, 105, y - 10, 105, y, GREY)
        caption(d, "Früh einbinden spart Zeit: Viele KI-Projekte stocken, weil der Betriebsrat zu spät kommt")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "ki-einfuehrung.gif")


if __name__ == "__main__":
    fristen()
    kschg()
    arbeitszeit()
    scheinselbst()
    beteiligung()
    ki_einfuehrung()
