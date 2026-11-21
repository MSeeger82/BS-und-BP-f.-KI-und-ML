"""Erklär-GIFs für Modul 17: Zukunftskompetenzen."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes)

NR = 17


def tuckman():
    """Teamphasen nach Tuckman mit Leistungskurve."""
    ph = [("Forming", "Orientierung, höflich", SKY), ("Storming", "Konflikte, Positionen", CORAL), ("Norming", "Regeln, Rollen", AMBER),
          ("Performing", "Leistung, Vertrauen", TEAL), ("Adjourning", "Abschluss, Würdigung", VIOLET)]
    perf = lambda x: 0.35 - 0.18 * math.exp(-((x - 1.4) ** 2) / 0.25) + 0.55 / (1 + math.exp(-(x - 2.6) * 3)) - (0.3 / (1 + math.exp(-(x - 4.4) * 6)))
    X0, Y0, X1, Y1 = 50, 60, 610, 250
    sx = lambda x: X0 + x / 5 * (X1 - X0)
    sy = lambda v: Y1 - v * (Y1 - Y0)
    a = Anim()
    for i in range(80):
        t = ease(i / 60)
        img, d = canvas()
        title(d, "Teamentwicklung nach Tuckman")
        for k, (nm, sub, c) in enumerate(ph):
            x0 = sx(k)
            d.rectangle(p(x0, Y0, sx(k + 1), Y1), fill=mix(BG, c, .12))
            if t * 5 > k:
                text(d, (sx(k + .5), 270), nm, 13, True, c, "mm")
                text(d, (sx(k + .5), 290), sub, 10, False, MUTED, "mm")
        xs = [k / 50 for k in range(int(250 * t) + 1)]
        if len(xs) > 1:
            d.line([p(sx(x), sy(perf(x))) for x in xs], fill=INK, width=3 * 2)
        text(d, (X0 + 4, Y0 + 6), "Leistung des Teams", 11, False, MUTED, "la")
        caption(d, "Führung je Phase: orientieren → Konflikte moderieren → Regeln stärken → delegieren")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "tuckman.gif")


def vierseiten():
    """Vier-Seiten-Modell nach Schulz von Thun."""
    sides = [("Sachinhalt", "Das Ergebnis ist fehlerhaft.", SKY, (320, 92)), ("Selbstkundgabe", "Ich bin frustriert.", AMBER, (130, 190)),
             ("Beziehung", "Ihr arbeitet nicht sorgfältig.", CORAL, (510, 190)), ("Appell", "Ändert das!", TEAL, (320, 288))]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Vier Seiten einer Nachricht (Schulz von Thun)")
        d.polygon([p(320, 130), p(420, 190), p(320, 250), p(220, 190)], fill=WHITE, outline=INK)
        text(d, (320, 182), "„Das Modell ist", 12, True, INK, "mm")
        text(d, (320, 200), "schon wieder falsch.“", 12, True, INK, "mm")
        n = min(4, i // 12 + 1)
        for k in range(n):
            nm, s, c, (x, y) = sides[k]
            d.rounded_rectangle(p(x - 110, y - 26, x + 110, y + 26), radius=8 * 2, fill=mix(WHITE, c, .2), outline=c, width=2 * 2)
            text(d, (x, y - 9), nm, 13, True, c, "mm")
            text(d, (x, y + 11), s, 11, False, INK, "mm")
        caption(d, "Der Empfänger hört mit vier Ohren – oft mit einem anderen als gemeint")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "vierseiten.gif")


def johari():
    """Johari-Fenster: Feedback und Selbstoffenbarung vergrößern den öffentlichen Bereich."""
    a = Anim()
    X0, Y0, S = 150, 60, 260
    for i in range(80):
        t = ease((i - 20) / 40)
        img, d = canvas()
        title(d, "Johari-Fenster: blinde Flecken verkleinern")
        vx = X0 + S * (.5 + .2 * t)
        vy = Y0 + S * (.5 + .2 * t)
        q = [(X0, Y0, vx, vy, "öffentlich", "mir und anderen bekannt", TEAL_L), (vx, Y0, X0 + S, vy, "blinder Fleck", "nur anderen bekannt", CORAL_L),
             (X0, vy, vx, Y0 + S, "verborgen", "nur mir bekannt", AMBER_L), (vx, vy, X0 + S, Y0 + S, "unbekannt", "niemandem bekannt", GRID)]
        for x0, y0, x1, y1, nm, sub, c in q:
            d.rectangle(p(x0, y0, x1, y1), fill=c, outline=WHITE, width=3)
            text(d, ((x0 + x1) / 2, (y0 + y1) / 2 - 8), nm, 12 if x1 - x0 > 90 else 10, True, INK, "mm")
            text(d, ((x0 + x1) / 2, (y0 + y1) / 2 + 10), sub, 10 if x1 - x0 > 110 else 8, False, MUTED, "mm")
        if t > 0:
            arrow(d, X0 + S * .5, Y0 - 10, vx, Y0 - 10, CORAL, 2)
            text(d, (X0 + S + 10, Y0 + 30), "Feedback einholen →", 12, True, CORAL, "la")
            text(d, (X0 + S + 10, Y0 + 50), "blinder Fleck schrumpft", 11, False, INK, "la")
            text(d, (X0 + S + 10, Y0 + 180), "sich öffnen ↓", 12, True, AMBER, "la")
            text(d, (X0 + S + 10, Y0 + 200), "Verborgenes wird geteilt", 11, False, INK, "la")
        caption(d, "Selbstreflexion: Wie sehe ich mich, wie sehen mich andere?")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "johari.gif")


def ishikawa():
    """Fischgrätdiagramm zur Ursache „Prognose ungenau“."""
    cats = [("Mensch", ["fehlendes Fachwissen", "Labelfehler"]), ("Methode", ["falsche Metrik", "kein Backtest"]), ("Material/Daten", ["Lücken", "veraltete Daten"]),
            ("Maschine", ["zu wenig Rechenzeit"]), ("Messung", ["Zielgröße ungenau"]), ("Mitwelt", ["Marktumbruch, Drift"])]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Ishikawa-Diagramm: Ursachen systematisch sammeln")
        d.line(p(40, 190, 500, 190), fill=INK, width=3 * 2)
        d.polygon([p(500, 160), p(610, 190), p(500, 220)], fill=CORAL_L, outline=CORAL)
        text(d, (548, 182), "Prognose", 11, True, INK, "mm")
        text(d, (548, 198), "ungenau", 11, True, INK, "mm")
        n = min(6, i // 9 + 1)
        for k in range(n):
            nm, us = cats[k]
            top = k < 3
            x = 170 + (k % 3) * 120
            y0 = 70 if top else 310
            d.line(p(x, y0, x + 70, 190), fill=GREY, width=2 * 2)
            text(d, (x, y0 - 12 if top else y0 + 12), nm, 12, True, VIOLET, "mm")
            for j, u in enumerate(us):
                yy = y0 + (35 + j * 30) * (1 if top else -1)
                xx = x + (yy - y0) / (190 - y0) * 70
                d.line(p(xx - 50, yy, xx, yy), fill=GRID, width=2)
                text(d, (xx - 54, yy), u, 10, False, INK, "rm")
        caption(d, "6 M: Mensch, Maschine, Methode, Material, Messung, Mitwelt")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "ishikawa.gif")


def gfk():
    """Gewaltfreie Kommunikation: vier Schritte mit Beispiel."""
    st = [("Beobachtung", "Der Bericht kam heute um 16 Uhr statt um 10 Uhr.", SKY, SKY_L),
          ("Gefühl", "Ich war unter Druck,", AMBER, AMBER_L),
          ("Bedürfnis", "weil ich Zeit zum Prüfen vor dem Lenkungsausschuss brauche.", VIOLET, VIOLET_L),
          ("Bitte", "Kannst du mir künftig bis 10 Uhr Bescheid geben, wenn es später wird?", TEAL, TEAL_L)]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Gewaltfreie Kommunikation (Rosenberg)")
        n = min(4, i // 14 + 1)
        for k in range(n):
            nm, s, c, cl = st[k]
            y = 60 + k * 66
            box(d, 30, y, 150, 50, nm, c, cl, size=14)
            text(d, (196, y + 25), s, 12, False, INK, "lm")
        caption(d, "Beobachten statt bewerten – Gefühl und Bedürfnis benennen – konkret und erfüllbar bitten")
        a.frame(img, 100)
    a.hold(3400)
    a.save(NR, "gfk.gif")


def automation():
    """Automation Bias: Vorschläge ungeprüft übernommen vs. mit Gegenmaßnahmen."""
    a = Anim()
    for i in range(96):
        img, d = canvas()
        bad = i < 48
        title(d, "Automation Bias: " + ("Vorschläge werden durchgewunken" if bad else "Gegenmaßnahmen wirken"))
        box(d, 30, 150, 130, 60, "KI-Vorschlag", SKY, SKY_L, "95 % richtig", size=13)
        box(d, 250, 150, 140, 60, "Mensch", VIOLET, VIOLET_L, "prüft?", size=14)
        arrow(d, 162, 180, 248, 180, GREY, 3)
        k = (i % 48) // 6
        for j in range(min(8, k + 1)):
            wrong = j in (3, 6)
            x = 430 + (j % 4) * 46
            y = 120 + (j // 4) * 70
            if bad:
                c = CORAL if wrong else TEAL
                lab = "✗ übernommen" if wrong else "✓"
            else:
                c = AMBER if wrong else TEAL
                lab = "erkannt" if wrong else "✓"
            d.rounded_rectangle(p(x, y, x + 40, y + 40), radius=6 * 2, fill=mix(WHITE, c, .3), outline=c, width=2)
            text(d, (x + 20, y + 20), "OK" if not wrong else ("X" if bad else "!"), 13, True, c, "mm")
        if bad:
            text(d, (320, 270), "Fehler der KI werden übernommen, weil der Vorschlag „vom System“ kommt.", 12, True, CORAL, "mm")
        else:
            text(d, (320, 262), "Begründungspflicht bei Übernahme · Erklärungen und Unsicherheit anzeigen", 12, True, TEAL, "mm")
            text(d, (320, 282), "Stichprobenkontrollen · Schulung · Abweichungen sind erwünscht", 12, True, TEAL, "mm")
        caption(d, "Menschliche Aufsicht wirkt nur, wenn Menschen wirklich prüfen können und dürfen")
        a.frame(img, 100)
        if i == 47:
            a.hold(2400)
    a.hold(3400)
    a.save(NR, "automation.gif")


if __name__ == "__main__":
    tuckman()
    vierseiten()
    johari()
    ishikawa()
    gfk()
    automation()
