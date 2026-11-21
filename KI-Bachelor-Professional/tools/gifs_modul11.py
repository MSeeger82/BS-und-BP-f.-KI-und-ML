"""Erklär-GIFs für Modul 11: Recht I – Rechtsformen, Verträge, Steuern."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, de)

NR = 11


def tsd(x):
    return f"{x:,.0f}".replace(",", ".")


def haftung():
    """Gläubiger greift zu: bei Einzelunternehmen/OHG auch aufs Privatvermögen, bei GmbH nur aufs Gesellschaftsvermögen."""
    a = Anim()
    for i in range(96):
        img, d = canvas()
        title(d, "Haftung: Wer zahlt, wenn das Unternehmen Schulden hat?")
        left = i < 48
        t = ease(((i % 48) - 6) / 24)
        name = "Einzelunternehmen, GbR, OHG" if left else "GmbH, UG, AG"
        text(d, (320, 62), name, 15, True, CORAL if left else TEAL, "mm")
        box(d, 140, 110, 160, 70, "Unternehmen", SKY, SKY_L, "Firmenvermögen", size=14)
        box(d, 140, 220, 160, 70, "Inhaber / Gesellschafter", VIOLET, VIOLET_L, "Privatvermögen", size=13)
        if not left:
            d.rounded_rectangle(p(126, 196, 314, 206), radius=4, fill=TEAL)
            text(d, (330, 201), "Haftungsschranke", 12, True, TEAL, "lm")
        box(d, 480, 160, 130, 70, "Gläubiger", CORAL, CORAL_L, "z. B. Lieferant", size=14)
        gx = 480 - (480 - 304) * t
        arrow(d, 480, 180, max(304, gx), 150, CORAL, 3)
        if left and t > .9:
            arrow(d, 480, 210, 304, 255, CORAL, 3)
            text(d, (390, 300), "unbeschränkt, persönlich", 13, True, CORAL, "mm")
        if not left and t > .9:
            text(d, (220, 320), "Privatvermögen geschützt", 13, True, TEAL, "mm")
        caption(d, "Kommanditisten (KG) haften nur bis zur Höhe ihrer Einlage")
        a.frame(img, 90)
        if i in (47, 95):
            a.hold(2600)
    a.save(NR, "haftung.gif")


def vertragsschluss():
    """Zwei übereinstimmende Willenserklärungen: Angebot und Annahme."""
    steps = [("Werbung, Katalog, Website", "Aufforderung zur Abgabe eines Angebots", GREY, WHITE, "Anbieter"),
             ("Bestellung", "Angebot (§ 145 BGB)", SKY, SKY_L, "Kunde"),
             ("Auftragsbestätigung", "Annahme (§ 147 BGB)", TEAL, TEAL_L, "Anbieter"),
             ("Vertrag geschlossen", "Rechte und Pflichten beider Seiten", VIOLET, VIOLET_L, "")]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Wie ein Vertrag zustande kommt")
        text(d, (110, 62), "Kunde", 14, True, INK, "mm")
        text(d, (530, 62), "Anbieter", 14, True, INK, "mm")
        d.line(p(110, 74, 110, 300), fill=GRID, width=3 * 2)
        d.line(p(530, 74, 530, 300), fill=GRID, width=3 * 2)
        n = min(4, i // 14 + 1)
        for k in range(n):
            nme, sub, c, cl, who = steps[k]
            y = 84 + k * 56
            t = ease((i - k * 14) / 10)
            if who == "Anbieter":
                x0, x1 = 530, 110
            elif who == "Kunde":
                x0, x1 = 110, 530
            else:
                x0 = x1 = None
            if x0 is not None:
                xe = x0 + (x1 - x0) * t
                arrow(d, x0, y + 22, xe, y + 22, c, 3)
                text(d, (320, y + 6), nme, 13, True, INK, "mm")
                text(d, (320, y + 38), sub, 11, False, c, "mm")
            else:
                box(d, 170, y, 300, 46, nme, c, cl, sub, size=14)
        caption(d, "Schweigen gilt grundsätzlich nicht als Annahme")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "vertragsschluss.gif")


def vertragsarten():
    """Was wird geschuldet? Kauf, Werk, Dienst, Miete."""
    rows = [("Kaufvertrag", "§ 433 BGB", "Sache übergeben, Eigentum verschaffen", "Server, Lizenz-Stick", SKY, SKY_L),
            ("Werkvertrag", "§ 631 BGB", "Erfolg: fertiges Werk, Abnahme", "Prognosemodell, Zielwert", TEAL, TEAL_L),
            ("Dienstvertrag", "§ 611 BGB", "Tätigkeit, kein Erfolg", "Beratung nach Stunden", AMBER, AMBER_L),
            ("Mietvertrag", "§ 535 BGB", "Gebrauch auf Zeit", "Leitbild für SaaS", VIOLET, VIOLET_L)]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Vertragsarten: Was wird geschuldet?")
        text(d, (40, 58), "Vertrag", 11, True, MUTED)
        text(d, (200, 58), "geschuldet", 11, True, MUTED)
        text(d, (474, 58), "Beispiel", 11, True, MUTED)
        n = min(4, i // 12 + 1)
        for k in range(n):
            nme, par, sch, bsp, c, cl = rows[k]
            y = 72 + k * 62
            d.rounded_rectangle(p(24, y, 616, y + 54), radius=8 * 2, fill=cl, outline=c, width=2 * 2)
            text(d, (40, y + 18), nme, 14, True, INK, "lm")
            text(d, (40, y + 38), par, 11, False, MUTED, "lm")
            text(d, (200, y + 27), sch, 12, False, INK, "lm")
            text(d, (474, y + 27), bsp, 11, False, c, "lm")
        caption(d, "Entscheidend ist der Inhalt, nicht die Überschrift des Vertrags")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "vertragsarten.gif")


def ustkette():
    """Umsatzsteuer über drei Stufen: jeder zahlt nur auf seinen Mehrwert."""
    st = [("Rechenzentrum", 1000, SKY, SKY_L), ("KI-Start-up", 2500, TEAL, TEAL_L), ("Systemhaus", 4000, VIOLET, VIOLET_L)]
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "Umsatzsteuer: Vorsteuerabzug in der Kette")
        n = min(3, i // 18 + 1)
        tot = 0
        for k in range(n):
            nme, net, c, cl = st[k]
            x = 24 + k * 150
            box(d, x, 70, 130, 50, nme, c, cl, size=13)
            arrow(d, x + 130, 95, x + 148, 95, GREY)
            ust = net * .19
            vst = st[k - 1][1] * .19 if k else 0
            zahl = ust - vst
            tot += zahl
            text(d, (x + 65, 140), f"netto {tsd(net)} €", 12, False, INK, "mm")
            text(d, (x + 65, 160), f"USt {tsd(ust)} €", 12, False, INK, "mm")
            text(d, (x + 65, 180), f"− Vorsteuer {tsd(vst)} €", 12, False, MUTED, "mm")
            text(d, (x + 65, 204), f"zahlt {tsd(zahl)} €", 13, True, CORAL, "mm")
        if n == 3:
            box(d, 474, 70, 142, 50, "Endkunde", AMBER, AMBER_L, "kein Vorsteuerabzug", size=13)
            text(d, (545, 150), "zahlt 4.760 €", 12, True, INK, "mm")
            text(d, (545, 170), "davon USt 760 €", 12, False, INK, "mm")
        if i > 70:
            text(d, (545, 240), f"Staat erhält {tsd(tot)} €", 13, True, CORAL, "mm")
            text(d, (545, 260), "= 19 % des Endpreises", 12, False, CORAL, "mm")
        caption(d, "Für Unternehmen mit Vorsteuerabzug zählt der Nettopreis – die Last trägt der Endverbraucher")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "ustkette.gif")


def reversecharge():
    """Reverse Charge: Leistung eines ausländischen Anbieters an ein deutsches Unternehmen."""
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Reverse Charge (§ 13b UStG): Steuerschuld kehrt sich um")
        box(d, 30, 90, 170, 60, "KI-Anbieter (Irland)", SKY, SKY_L, "Cloud-/KI-Dienst", size=13)
        box(d, 440, 90, 170, 60, "Unternehmen (DE)", TEAL, TEAL_L, "Leistungsempfänger", size=13)
        t1 = ease(i / 18)
        arrow(d, 200, 120, 200 + 238 * t1, 120, GREY, 3)
        if i > 16:
            d.rectangle(p(220, 150, 360, 220), fill=WHITE, outline=GREY, width=2)
            text(d, (290, 166), "Rechnung", 12, True, INK, "mm")
            text(d, (290, 186), "1.000 € netto, ohne USt", 11, False, INK, "mm")
            text(d, (290, 204), "„Steuerschuldnerschaft", 10, False, MUTED, "mm")
            text(d, (290, 216), "des Leistungsempfängers“", 10, False, MUTED, "mm")
        if i > 36:
            box(d, 440, 250, 170, 56, "Finanzamt", AMBER, AMBER_L, size=13)
            arrow(d, 525, 152, 525, 248, CORAL, 3)
            text(d, (515, 236), "meldet USt 190 €", 12, True, CORAL, "rm")
        if i > 54:
            arrow(d, 560, 248, 560, 152, TEAL, 3)
            text(d, (525, 322), "zieht 190 € als Vorsteuer ab", 12, True, TEAL, "mm")
        if i > 66:
            text(d, (30, 280), "Ergebnis bei vollem Vorsteuerabzug:", 12, True, INK)
            text(d, (30, 300), "Belastung 0 €, aber Meldepflicht!", 12, True, INK)
        caption(d, "Gilt bei Dienstleistungen ausländischer Unternehmen an Unternehmen im Inland")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "reversecharge.gif")


def ertragsteuer():
    """Ertragsteuern einer GmbH bei 100.000 € Gewinn, Hebesatz 400 %, heute und 2032."""
    parts_now = [("Körperschaftsteuer 15 %", 15000, SKY), ("Soli 5,5 % darauf", 825, VIOLET), ("Gewerbesteuer", 14000, AMBER)]
    parts_32 = [("Körperschaftsteuer 10 %", 10000, SKY), ("Soli 5,5 % darauf", 550, VIOLET), ("Gewerbesteuer", 14000, AMBER)]
    a = Anim()
    X0, Y1 = 90, 320
    sc = 230 / 100000
    for i in range(70):
        t = ease(i / 45)
        img, d = canvas()
        title(d, "Ertragsteuern der GmbH: 100.000 € Gewinn, Hebesatz 400 %")
        for j, (lab, parts) in enumerate([("bis 2027", parts_now), ("ab 2032", parts_32)]):
            x = X0 + j * 150
            d.rectangle(p(x, Y1 - 100000 * sc, x + 90, Y1), outline=GRID, width=2)
            y = Y1
            tot = 0
            for nme, v, c in parts:
                h = v * sc * t
                d.rectangle(p(x, y - h, x + 90, y), fill=c)
                y -= h
                tot += v
            text(d, (x + 45, Y1 + 14), lab, 12, True, INK, "mm")
            if t > .95:
                text(d, (x + 45, y - 14), f"{tsd(tot)} € = {de(tot / 1000, 1)} %", 12, True, CORAL, "mm")
        if t > .95:
            for k, (nme, v, c) in enumerate(parts_now):
                d.rectangle(p(400, 92 + k * 30, 414, 106 + k * 30), fill=c)
                text(d, (422, 99 + k * 30), f"{nme}: {tsd(v)} €", 12, False, INK, "lm")
            text(d, (400, 200), "Gewerbesteuer:", 12, True, INK)
            text(d, (400, 220), "100.000 × 3,5 % × 400 %", 12, False, INK)
            text(d, (400, 240), "= 14.000 €", 12, False, INK)
            text(d, (400, 272), "KSt sinkt ab 2028 jährlich", 11, False, MUTED)
            text(d, (400, 290), "um 1 Punkt bis 10 % (2032)", 11, False, MUTED)
        caption(d, "Vereinfacht: ohne Hinzurechnungen und Kürzungen")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "ertragsteuer.gif")


if __name__ == "__main__":
    haftung()
    vertragsschluss()
    vertragsarten()
    ustkette()
    reversecharge()
    ertragsteuer()
