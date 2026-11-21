"""Erklär-GIFs für Modul 10: Innovation und digitale Transformation."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, wrap_text)

NR = 10


def disruption():
    """Zwei S-Kurven: etablierte und disruptive Lösung, dazu der Anspruch des Markts."""
    a = Anim()
    X0, Y0, X1, Y1 = 60, 70, 470, 310
    v1 = lambda x: 30 + 150 / (1 + math.exp(-(x - .25) * 12))
    v2 = lambda x: 230 / (1 + math.exp(-(x - .72) * 11))
    dm = lambda x: 110 + 50 * x
    sx = lambda x: X0 + x * (X1 - X0)
    sy = lambda v: Y1 - v
    for i in range(70):
        t = ease(i / 55)
        img, d = canvas()
        title(d, "Disruptive Innovation: von unten in den Markt")
        axes(d, X0, Y0, X1, Y1, "Zeit", "Leistung")
        xs = [k / 100 for k in range(int(100 * t) + 1)]
        d.line([p(sx(x), sy(dm(x))) for x in xs] if len(xs) > 1 else [p(sx(0), sy(dm(0)))] * 2, fill=GREY, width=2 * 2)
        d.line([p(sx(x), sy(v1(x))) for x in xs] if len(xs) > 1 else [p(sx(0), sy(v1(0)))] * 2, fill=SKY, width=3 * 2)
        xs2 = [x for x in xs if x >= .35]
        if len(xs2) > 1:
            d.line([p(sx(x), sy(v2(x))) for x in xs2], fill=CORAL, width=3 * 2)
        if t > .98:
            text(d, (480, sy(v2(1))), "neue, disruptive Lösung", 12, True, CORAL, "lm")
            text(d, (480, sy(v1(1)) - 4), "etablierte Lösung", 12, True, SKY, "lm")
            text(d, (480, sy(dm(1)) + 10), "Anspruch des Markts", 12, False, MUTED, "lm")
            cx = sx(.78)
            d.ellipse(p(cx - 6, sy(dm(.78)) - 6, cx + 6, sy(dm(.78)) + 6), outline=INK, width=2 * 2)
            text(d, (cx + 10, sy(dm(.78)) + 24), "reicht dem Markt → verdrängt", 11, True, INK, "la")
        if .35 < t:
            text(d, (sx(.34), sy(20)), "startet einfacher,", 11, False, CORAL, "rm"); text(d, (sx(.34), sy(6)), "billiger, in Nische", 11, False, CORAL, "rm")
        caption(d, "Inkrementell verbessert das Bestehende – disruptiv ersetzt es (Christensen)")
        a.frame(img, 80)
    a.hold(3400)
    a.save(NR, "disruption.gif")


def stagegate():
    """Stage-Gate-Prozess: Phasen und Tore, die Zahl der Ideen sinkt."""
    stages = [("Idee", 100), ("Konzept", 30), ("Entwicklung", 10), ("Test", 4), ("Einführung", 2)]
    a = Anim()
    BW, GW, X = 96, 28, 24
    for i in range(80):
        img, d = canvas()
        title(d, "Innovationsprozess mit Stage-Gate")
        n = min(5, i // 12 + 1)
        for k in range(n):
            nme, cnt = stages[k]
            x = X + k * (BW + GW)
            box(d, x, 120, BW, 60, nme, TEAL, TEAL_L, size=13)
            r = 8 + 22 * math.sqrt(cnt / 100)
            d.ellipse(p(x + BW / 2 - r, 240 - r, x + BW / 2 + r, 240 + r), fill=AMBER_L, outline=AMBER, width=2 * 2)
            text(d, (x + BW / 2, 240), str(cnt), 12, True, INK, "mm")
            if k:
                gx = x - GW / 2
                d.polygon([p(gx, 136), p(gx + 12, 150), p(gx, 164), p(gx - 12, 150)], fill=CORAL)
                text(d, (gx, 104), f"Gate {k}", 10, True, CORAL, "mm")
        text(d, (24, 290), "Ideen im Trichter", 11, False, MUTED)
        if i > 62:
            text(d, (320, 318), "An jedem Gate: Go · Kill · Hold · Recycle – nach festen Kriterien", 13, True, INK, "mm")
        caption(d, "Viele Ideen hinein, wenige erfolgreiche Innovationen heraus")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "stagegate.gif")


def designthinking():
    """Sechs Phasen Design Thinking, Problem- und Lösungsraum, Iterationsschleife."""
    ph = ["Verstehen", "Beobachten", "Sichtweise\ndefinieren", "Ideen\nfinden", "Prototyp", "Testen"]
    cols = [(SKY, SKY_L)] * 3 + [(AMBER, AMBER_L)] * 3
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "Design Thinking: nutzerzentriert und iterativ")
        act = min(5, i // 10)
        text(d, (170, 70), "Problemraum", 13, True, SKY, "mm")
        text(d, (470, 70), "Lösungsraum", 13, True, AMBER, "mm")
        d.line(p(30, 84, 310, 84), fill=SKY, width=2 * 2)
        d.line(p(330, 84, 610, 84), fill=AMBER, width=2 * 2)
        for k, n in enumerate(ph):
            cx = 70 + k * 100
            c, cl = cols[k]
            on = k <= act
            r = 34 if k != act or i >= 60 else 34 + 4 * math.sin(i / 2)
            d.ellipse(p(cx - r, 150 - r, cx + r, 150 + r), fill=cl if on else WHITE, outline=c if on else GRID, width=3 * 2)
            text(d, (cx, 150), str(k + 1), 18, True, INK if on else GREY, "mm")
            for j, line in enumerate(n.split("\n")):
                text(d, (cx, 204 + j * 16), line, 12, True, INK if on else GREY, "mm")
            if k < 5:
                arrow(d, cx + 38, 150, cx + 62, 150, GREY)
        if i >= 60:
            d.line(p(570, 240, 570, 270, 70, 270, 70, 242), fill=CORAL, width=2 * 2, joint="curve")
            arrow(d, 70, 262, 70, 240, CORAL)
            text(d, (320, 290), "Erkenntnisse aus dem Test führen zurück – so oft wie nötig", 13, True, CORAL, "mm")
        caption(d, "Interdisziplinäres Team, echte Nutzer, schnelle Prototypen")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "designthinking.gif")


def lean():
    """Build-Measure-Learn-Kreislauf mit MVP-Iterationen."""
    nodes = [("Bauen", "Produkt / MVP", TEAL, TEAL_L), ("Messen", "Daten", SKY, SKY_L), ("Lernen", "Erkenntnis", VIOLET, VIOLET_L)]
    its = [("1", "MVP: FAQ-Bot für 50 Testkunden", "38 % der Anfragen gelöst", "Lieferstatus fehlt"),
           ("2", "Bot mit Anbindung Lieferstatus", "61 % gelöst", "weitermachen (persevere)"),
           ("3", "Ausbau auf alle Kunden", "64 % gelöst, Zufriedenheit 4,3", "skalieren")]
    cx, cy, R = 200, 190, 100
    pos = [(cx + R * math.cos(math.radians(a_)), cy + R * math.sin(math.radians(a_))) for a_ in (-90, 30, 150)]
    an = Anim()
    for i in range(108):
        img, d = canvas()
        title(d, "Lean Startup: Bauen – Messen – Lernen")
        for k in range(3):
            x1, y1 = pos[k]
            x2, y2 = pos[(k + 1) % 3]
            mx, my = x1 + (x2 - x1) * .25, y1 + (y2 - y1) * .25
            ex, ey = x1 + (x2 - x1) * .75, y1 + (y2 - y1) * .75
            arrow(d, mx, my, ex, ey, GREY)
        for k, (n, s, c, cl) in enumerate(nodes):
            x, y = pos[k]
            box(d, x - 56, y - 26, 112, 52, n, c, cl, s, size=13)
        it = min(2, i // 36)
        ph = (i % 36) / 36 * 3
        seg = int(ph)
        f = ph - seg
        x1, y1 = pos[seg]
        x2, y2 = pos[(seg + 1) % 3]
        d.ellipse(p(x1 + (x2 - x1) * f - 8, y1 + (y2 - y1) * f - 8, x1 + (x2 - x1) * f + 8, y1 + (y2 - y1) * f + 8), fill=CORAL)
        text(d, (cx, cy), f"Runde {it + 1}", 14, True, CORAL, "mm")
        for k in range(it + 1):
            y = 62 + k * 92
            nr, b, m, l = its[k]
            text(d, (370, y), f"Runde {nr}", 12, True, INK)
            text(d, (370, y + 20), "gebaut: " + b, 11, False, TEAL)
            text(d, (370, y + 38), "gemessen: " + m, 11, False, SKY)
            text(d, (370, y + 56), "gelernt: " + l, 11, False, VIOLET)
        caption(d, "MVP: kleinstes Produkt, mit dem man lernt – dann weiter, schwenken oder stoppen")
        an.frame(img, 100)
    an.hold(3400)
    an.save(NR, "lean.gif")


def bmc():
    """Business Model Canvas füllt sich für eine KI-Wartungsprognose."""
    F = {
        "Schlüssel-\npartner": (20, 50, 120, 200, "Sensorhersteller, Cloud-Anbieter"),
        "Schlüssel-\naktivitäten": (140, 50, 120, 100, "Modelle trainieren und überwachen"),
        "Schlüssel-\nressourcen": (140, 150, 120, 100, "Sensordaten, Modell, Data-Team"),
        "Wertangebot": (260, 50, 120, 200, "weniger Stillstand, planbare Wartung, Ersatzteile rechtzeitig"),
        "Kunden-\nbeziehungen": (380, 50, 120, 100, "Kundenportal, Servicetechniker"),
        "Kanäle": (380, 150, 120, 100, "Direktvertrieb, Portal, App"),
        "Kunden-\nsegmente": (500, 50, 120, 200, "Betreiber von Produktions-anlagen"),
        "Kosten-\nstruktur": (20, 250, 300, 74, "Cloud, Personal, Sensorik, Vertrieb"),
        "Einnahme-\nquellen": (320, 250, 300, 74, "Abo je Maschine und Monat"),
    }
    order = ["Kunden-\nsegmente", "Wertangebot", "Kanäle", "Kunden-\nbeziehungen", "Einnahme-\nquellen", "Schlüssel-\nressourcen",
             "Schlüssel-\naktivitäten", "Schlüssel-\npartner", "Kosten-\nstruktur"]
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "Business Model Canvas: KI-Wartungsprognose als Abo")
        n = min(9, i // 8 + 1)
        for k, key in enumerate(order):
            x, y, w, h, s = F[key]
            on = k < n
            hl = k == n - 1 and i < 76
            d.rectangle(p(x, y, x + w, y + h), fill=(AMBER_L if hl else TEAL_L) if on else WHITE, outline=GREY, width=2)
            lab = key.replace("-\n", "") if w > 200 else key
            yy = y + 8
            for line in lab.split("\n"):
                text(d, (x + 8, yy), line, 11, True, INK if on else GREY)
                yy += 15
            if on:
                wrap_text(d, x + 8, yy + 6, s, 18 if w < 200 else 40, 11, False, INK, 16)
        caption(d, "Reihenfolge: Kunden → Wertangebot → Kanäle → Beziehung → Einnahmen → Ressourcen …")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "bmc.gif")


def reifegrad():
    """KI-Reifegrad als Treppe mit Ist und Ziel."""
    lv = [("1 Einsteiger", "erste Experimente"), ("2 Pilotierung", "einzelne Piloten"), ("3 Etabliert", "mehrere im Betrieb"),
          ("4 Skaliert", "Plattform, MLOps"), ("5 Transformiert", "KI prägt Geschäft")]
    cols = [GREY, SKY, TEAL, VIOLET, AMBER]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "KI-Reifegrad: Wo stehen wir, wo wollen wir hin?")
        n = min(5, i // 8 + 1)
        for k in range(n):
            x = 40 + k * 112
            top = 290 - (k + 1) * 40
            d.rectangle(p(x, top, x + 108, 300), fill=mix(WHITE, cols[k], .25), outline=cols[k], width=2 * 2)
            text(d, (x + 54, top + 14), lv[k][0], 12, True, INK, "mm")
            text(d, (x + 54, top + 32), lv[k][1], 10, False, MUTED, "mm")
        if i > 44:
            xi, ti = 40 + 1 * 112 + 54, 290 - 2 * 40
            xz, tz = 40 + 3 * 112 + 54, 290 - 4 * 40
            d.polygon([p(xi - 9, ti - 26), p(xi + 9, ti - 26), p(xi, ti - 12)], fill=CORAL)
            text(d, (xi, ti - 38), "Ist heute", 12, True, CORAL, "mm")
            d.polygon([p(xz - 9, tz - 26), p(xz + 9, tz - 26), p(xz, tz - 12)], fill=TEAL)
            text(d, (xz, tz - 38), "Ziel in 3 Jahren", 12, True, TEAL, "mm")
            if i > 52:
                arrow(d, xi + 40, ti - 40, xz - 70, tz - 34, CORAL, 2)
        caption(d, "Bewertet nach Strategie, Daten, Technik, Kompetenzen, Kultur und Governance")
        a.frame(img, 90)
    a.hold(3200)
    a.save(NR, "reifegrad.gif")


def usecase():
    """Use-Case-Portfolio: Nutzen × Machbarkeit."""
    uc = [("Rechnungsprüfung", 8, 8), ("Chatbot Kundenservice", 7, 6), ("Wartungsprognose", 3, 8), ("Absatzprognose", 6, 7.5),
          ("Autonome Preissetzung", 2.5, 3.5), ("Bilder für Marketing", 8.5, 3)]
    X0, Y0, S_ = 70, 50, 26
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Use Cases priorisieren: Nutzen × Machbarkeit")
        q = [(0, 0, VIOLET_L, "strategisch:", "Voraussetzungen schaffen"), (5, 0, TEAL_L, "zuerst", "(Quick Wins)"),
             (0, 5, GRID, "zurückstellen", ""), (5, 5, AMBER_L, "nebenbei", "mitnehmen")]
        for cx_, cy_, col, l1, l2 in q:
            d.rectangle(p(X0 + cx_ * S_, Y0 + cy_ * S_, X0 + (cx_ + 5) * S_, Y0 + (cy_ + 5) * S_), fill=col, outline=WHITE, width=2)
            text(d, (X0 + (cx_ + 2.5) * S_, Y0 + cy_ * S_ + 14), l1, 11, True, MUTED, "mm")
            if l2:
                text(d, (X0 + (cx_ + 2.5) * S_, Y0 + cy_ * S_ + 28), l2, 10, False, MUTED, "mm")
        text(d, (X0 + 130, Y0 + 276), "Machbarkeit (Daten, Technik, Recht) →", 11, False, MUTED, "mm")
        text(d, (X0 - 8, Y0 + 130), "Nutzen", 11, False, MUTED, "rm")
        text(d, (X0 - 8, Y0 + 146), "↑", 11, False, MUTED, "rm")
        n = min(len(uc), i // 10 + 1)
        for k in range(n):
            nme, mb, nu = uc[k]
            cx, cy = X0 + mb * S_, Y0 + (10 - nu) * S_
            d.ellipse(p(cx - 11, cy - 11, cx + 11, cy + 11), fill=INK)
            text(d, (cx, cy), str(k + 1), 11, True, WHITE, "mm")
            text(d, (370, 64 + k * 30), f"{k + 1}  {nme}", 12, False, INK)
            text(d, (600, 64 + k * 30), f"{nu:g} / {mb:g}".replace(".", ","), 11, False, MUTED, "ra")
        text(d, (600, 46), "Nutzen / Machb.", 10, True, MUTED, "ra")
        if i > 64:
            text(d, (370, 260), "Start mit 1 und 4: hoher Nutzen,", 12, True, TEAL)
            text(d, (370, 278), "Daten da, rechtlich unkritisch.", 12, True, TEAL)
        caption(d, "Nicht die spannendste Idee zuerst, sondern die mit Nutzen und Machbarkeit")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "usecase.gif")


def kotter():
    """Kotters 8 Schritte, gruppiert nach Lewins drei Phasen."""
    st = ["Dringlichkeit erzeugen", "Führungskoalition bilden", "Vision und Strategie entwickeln", "Vision kommunizieren",
          "Hindernisse beseitigen, Beschäftigte befähigen", "Schnelle Erfolge sichtbar machen", "Erfolge ausbauen, nicht nachlassen",
          "Veränderung in der Kultur verankern"]
    bands = [("Auftauen", 0, 3, SKY, SKY_L), ("Verändern", 3, 7, AMBER, AMBER_L), ("Einfrieren", 7, 8, TEAL, TEAL_L)]
    a = Anim()
    RH, Y = 34, 52
    for i in range(84):
        img, d = canvas()
        title(d, "Wandel gestalten: Lewin und Kotter")
        n = min(8, i // 8 + 1)
        for nme, s0, s1, c, cl in bands:
            if n > s0:
                y0, y1 = Y + s0 * RH, Y + s1 * RH - 4
                d.rounded_rectangle(p(24, y0, 150, y1), radius=8 * 2, fill=cl, outline=c, width=2 * 2)
                text(d, (87, (y0 + y1) / 2), nme, 13, True, c, "mm")
        for k in range(n):
            y = Y + k * RH
            c = [b[3] for b in bands if b[1] <= k < b[2]][0]
            d.rounded_rectangle(p(170, y, 616, y + RH - 6), radius=6 * 2, fill=WHITE, outline=c, width=2)
            d.ellipse(p(178, y + 3, 200, y + 25), fill=c)
            text(d, (189, y + 14), str(k + 1), 11, True, WHITE, "mm")
            text(d, (212, y + 14), st[k], 13, False, INK, "lm")
        caption(d, "Lewin: Auftauen – Verändern – Einfrieren · Kotter: 8 Schritte")
        a.frame(img, 100)
    a.hold(3400)
    a.save(NR, "kotter.gif")


if __name__ == "__main__":
    disruption()
    stagegate()
    designthinking()
    lean()
    bmc()
    reifegrad()
    usecase()
    kotter()
