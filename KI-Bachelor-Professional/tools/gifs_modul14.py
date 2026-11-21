"""Erklär-GIFs für Modul 14: Ökonomische Aspekte."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 14


def tsd(x):
    return f"{x:,.0f}".replace(",", ".")


def breakeven():
    """Fixkosten, Gesamtkosten, Erlöse; Break-even bei 150.000 Anfragen."""
    a = Anim()
    X0, Y0, X1, Y1 = 80, 60, 440, 310
    xm, ym = 300000, 30000
    sx = lambda x: X0 + x / xm * (X1 - X0)
    sy = lambda y: Y1 - y / ym * (Y1 - Y0)
    for i in range(70):
        t = ease(i / 50)
        img, d = canvas()
        title(d, "Deckungsbeitrag und Break-even: KI-Dienst je Anfrage")
        axes(d, X0, Y0, X1, Y1, "", "€")
        text(d, (X1, Y1 + 28), "Anfragen pro Jahr", 11, False, MUTED, "rm")
        for x in (100000, 200000, 300000):
            text(d, (sx(x), Y1 + 12), tsd(x / 1000) + " Tsd.", 10, False, MUTED, "mm")
        for y in (10000, 20000, 30000):
            text(d, (X0 - 6, sy(y)), tsd(y), 10, False, MUTED, "rm")
        xe = xm * t
        d.line(p(sx(0), sy(12000), sx(xe), sy(12000)), fill=GREY, width=2 * 2)
        d.line(p(sx(0), sy(12000), sx(xe), sy(12000 + .02 * xe)), fill=CORAL, width=3 * 2)
        d.line(p(sx(0), sy(0), sx(xe), sy(.10 * xe)), fill=TEAL, width=3 * 2)
        if t > .98:
            d.ellipse(p(sx(150000) - 7, sy(15000) - 7, sx(150000) + 7, sy(15000) + 7), outline=VIOLET, width=3 * 2)
            text(d, (sx(150000) - 12, sy(15000) - 14), "Break-even", 12, True, VIOLET, "rm")
            text(d, (460, 70), "Erlös 0,10 € je Anfrage", 12, True, TEAL)
            text(d, (460, 92), "Gesamtkosten", 12, True, CORAL)
            text(d, (460, 110), "= 12.000 € + 0,02 €/Anfrage", 11, False, CORAL)
            text(d, (460, 132), "Fixkosten 12.000 €", 12, True, GREY)
            text(d, (460, 180), "DB je Anfrage = 0,10 − 0,02", 12, False, INK)
            text(d, (460, 198), "= 0,08 €", 12, True, INK)
            text(d, (460, 226), "Break-even = 12.000 / 0,08", 12, False, INK)
            text(d, (460, 244), "= 150.000 Anfragen", 13, True, VIOLET)
        caption(d, "Links vom Break-even Verlust, rechts davon Gewinn")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "breakeven.gif")


def kalkulation():
    """Zuschlagskalkulation als Treppe."""
    st = [("Materialeinzelkosten", 1000, SKY), ("+ Materialgemeinkosten 10 %", 100, SKY), ("Fertigungslöhne", 2000, VIOLET),
          ("+ Fertigungsgemeinkosten 120 %", 2400, VIOLET), ("+ Verwaltung/Vertrieb 15 %", 825, AMBER), ("+ Gewinn 10 %", 632.5, TEAL)]
    tot = [("Herstellkosten", 5500, 4), ("Selbstkosten", 6325, 5), ("Barverkaufspreis", 6957.5, 6)]
    a = Anim()
    X0, Y1, SC = 250, 320, 260 / 7000
    for i in range(84):
        img, d = canvas()
        title(d, "Zuschlagskalkulation: vom Material zum Angebotspreis")
        n = min(6, i // 10 + 1)
        cum = 0
        for k in range(n):
            nm, v, c = st[k]
            y = 58 + k * 36
            x0 = X0 + cum * SC
            w = v * SC
            d.rectangle(p(x0, y, x0 + w, y + 26), fill=mix(WHITE, c, .7), outline=c, width=2)
            text(d, (X0 - 8, y + 13), nm, 11, False, INK, "rm")
            text(d, (x0 + w + 6, y + 13), tsd(v) if v == int(v) else de(v, 2), 11, True, INK, "lm")
            cum += v
        for nm, v, after in tot:
            if n >= after and i > after * 10 + 4:
                xx = X0 + v * SC
                d.line(p(xx, 56, xx, 280), fill=CORAL, width=2)
        if i > 66:
            text(d, (24, 290), "Herstellkosten 5.500 · Selbstkosten 6.325 · Barverkaufspreis 6.957,50 €", 12, True, CORAL)
            text(d, (24, 312), "Dienstleister rechnen oft mit Stundensätzen: Personalkosten / produktive Stunden + Zuschläge", 11, False, MUTED)
        caption(d, "Gemeinkosten werden über Zuschlagssätze aus dem Betriebsabrechnungsbogen verteilt")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "kalkulation.gif")


def abzinsen():
    """Rückflüsse in drei Jahren werden auf heute abgezinst (8 %)."""
    rf = [40000, 40000, 40000]
    bw = [40000 / 1.08 ** (k + 1) for k in range(3)]
    a = Anim()
    for i in range(80):
        t = ease((i - 20) / 40)
        img, d = canvas()
        title(d, "Abzinsen: Was sind künftige Rückflüsse heute wert? (i = 8 %)")
        for k in range(4):
            x = 60 + k * 140
            text(d, (x + 40, 312), f"t = {k}", 12, True, MUTED, "mm")
        d.line(p(40, 296, 600, 296), fill=GREY, width=2)
        text(d, (80, 110), "− 100.000", 12, True, CORAL, "mm")
        d.rectangle(p(60, 120, 100, 296), outline=CORAL, width=2 * 2)
        for k in range(3):
            x0 = 60 + (k + 1) * 140
            h = rf[k] / 100000 * 176
            hb = bw[k] / 100000 * 176
            xx = x0
            hh = h + (hb - h) * t
            d.rectangle(p(xx, 296 - hh, xx + 40, 296), fill=mix(WHITE, TEAL, .7), outline=TEAL, width=2)
            lab = tsd(rf[k]) if t < .5 else tsd(bw[k])
            text(d, (xx + 20, 296 - hh - 12), lab, 11, True, TEAL, "mm")
        if i > 64:
            text(d, (330, 80), "Barwerte: 37.037 + 34.294 + 31.753", 13, False, INK, "mm")
            text(d, (330, 104), "= 103.084 €  →  Kapitalwert = + 3.084 €", 14, True, TEAL, "mm")
        caption(d, "Barwert = Rückfluss / (1 + i)ᵗ – ein Euro heute ist mehr wert als ein Euro morgen")
        a.frame(img, 90)
    a.hold(3600)
    a.save(NR, "abzinsen.gif")


def kapitalwertkurve():
    """Kapitalwert in Abhängigkeit vom Zins; interner Zinsfuß ≈ 9,7 %."""
    C = lambda i: -100000 + sum(40000 / (1 + i) ** t for t in (1, 2, 3))
    X0, Y0, X1, Y1 = 80, 60, 440, 300
    sx = lambda i: X0 + i / .2 * (X1 - X0)
    sy = lambda c: Y0 + (25000 - c) / 45000 * (Y1 - Y0)
    a = Anim()
    for k in range(70):
        t = ease(k / 50)
        img, d = canvas()
        title(d, "Kapitalwertkurve und interner Zinsfuß")
        axes(d, X0, Y0, X1, Y1, "", "C₀ in €")
        d.line(p(X0, sy(0), X1, sy(0)), fill=GREY, width=2)
        for z in (0, .05, .1, .15, .2):
            text(d, (sx(z), Y1 + 12), f"{int(z * 100)} %", 10, False, MUTED, "mm")
        for c in (20000, 10000, -10000):
            text(d, (X0 - 6, sy(c)), tsd(c), 10, False, MUTED, "rm")
        pts = [p(sx(j / 1000), sy(C(j / 1000))) for j in range(0, int(200 * t) + 1)]
        if len(pts) > 1:
            d.line(pts, fill=SKY, width=3 * 2)
        if t > .5:
            d.ellipse(p(sx(.08) - 6, sy(C(.08)) - 6, sx(.08) + 6, sy(C(.08)) + 6), fill=TEAL)
            text(d, (sx(.08) + 10, sy(C(.08)) - 10), "8 %: + 3.084 €", 11, True, TEAL, "la")
        if t > .7:
            d.ellipse(p(sx(.097) - 7, sy(0) - 7, sx(.097) + 7, sy(0) + 7), outline=VIOLET, width=3 * 2)
            text(d, (sx(.097) - 10, sy(0) + 18), "interner Zinsfuß ≈ 9,7 %", 11, True, VIOLET, "ra")
        if t > .98:
            text(d, (460, 80), "I₀ = 100.000 €", 12, True, INK)
            text(d, (460, 100), "Rückfluss 40.000 € × 3 J.", 12, True, INK)
            text(d, (460, 140), "C₀ > 0: lohnt sich beim", 12, False, INK)
            text(d, (460, 158), "gewählten Zins", 12, False, INK)
            text(d, (460, 190), "Interner Zinsfuß: Rendite,", 12, False, INK)
            text(d, (460, 208), "bei der C₀ = 0 ist", 12, False, INK)
            text(d, (460, 240), "Lohnt sich, wenn er über", 12, False, INK)
            text(d, (460, 258), "dem Kalkulationszins liegt", 12, False, INK)
        caption(d, "Je höher der Kalkulationszins, desto weniger sind spätere Rückflüsse heute wert")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "kapitalwertkurve.gif")


def finanzierung():
    """Matrix Innen-/Außenfinanzierung × Eigen-/Fremdkapital."""
    cells = [(0, 0, "Beteiligungsfinanzierung", "Einlagen, Wagniskapital", TEAL, TEAL_L),
             (1, 0, "Kreditfinanzierung", "Bankkredit, Anleihe, Leasing", CORAL, CORAL_L),
             (0, 1, "Selbstfinanzierung", "einbehaltene Gewinne", SKY, SKY_L),
             (1, 1, "aus Rückstellungen", "z. B. Pensionsrückstellungen", AMBER, AMBER_L),
             (2, 1, "aus Abschreibungen / Vermögensumschichtung", "Rückfluss über Preise, Verkauf, Factoring", VIOLET, VIOLET_L)]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Finanzierungsarten: Herkunft und Rechtsstellung des Kapitals")
        text(d, (330, 56), "Eigenkapital", 13, True, TEAL, "mm")
        text(d, (520, 56), "Fremdkapital", 13, True, CORAL, "mm")
        text(d, (120, 120), "Außenfinanzierung", 13, True, INK, "mm")
        text(d, (120, 236), "Innenfinanzierung", 13, True, INK, "mm")
        n = min(5, i // 10 + 1)
        for k in range(n):
            c_, r_, nm, sub, c, cl = cells[k]
            if c_ == 2:
                box(d, 236, 270, 380, 54, nm, c, cl, sub, size=12)
            else:
                box(d, 236 + c_ * 190, 80 + r_ * 104, 184, 84 if r_ == 0 else 76, nm, c, cl, sub, size=12)
        caption(d, "Innen: aus dem Umsatzprozess · Außen: von Kapitalgebern")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "finanzierung.gif")


def abweichung():
    """Plan-Ist-Abweichung der API-Kosten in Mengen- und Preisabweichung zerlegt."""
    a = Anim()
    X0, Y1, SC = 100, 300, 170 / 3500
    for i in range(70):
        t = ease(i / 40)
        img, d = canvas()
        title(d, "Abweichungsanalyse: API-Kosten Plan und Ist")
        bars = [("Plan", 2000, GREY, 0), ("+ Menge", 600, AMBER, 2000), ("+ Preis", 650, CORAL, 2600), ("Ist", 3250, SKY, 0)]
        for k, (nm, v, c, base) in enumerate(bars):
            if t < k / 4:
                continue
            x = X0 + k * 130
            d.rectangle(p(x, Y1 - (base + v) * SC, x + 70, Y1 - base * SC), fill=mix(WHITE, c, .7), outline=c, width=2)
            text(d, (x + 35, Y1 - (base + v) * SC - 12), tsd(v) + " €", 12, True, INK, "mm")
            text(d, (x + 35, Y1 + 14), nm, 11, True, INK, "mm")
        d.line(p(X0 - 10, Y1, X0 + 480, Y1), fill=GREY, width=2)
        if i > 50:
            text(d, (24, 66), "Plan: 100.000 Anfragen × 0,020 € = 2.000 €", 12, False, INK)
            text(d, (24, 86), "Ist: 130.000 Anfragen × 0,025 € = 3.250 €", 12, False, INK)
            text(d, (330, 66), "Menge: 30.000 × 0,020 = 600 €", 12, False, AMBER)
            text(d, (330, 86), "Preis: 0,005 × 130.000 = 650 €", 12, False, CORAL)
        caption(d, "Erst zerlegen, dann handeln: mehr Nutzung ist gut – höherer Preis je Anfrage nicht")
        a.frame(img, 90)
    a.hold(3400)
    a.save(NR, "abweichung.gif")


if __name__ == "__main__":
    breakeven()
    kalkulation()
    abzinsen()
    kapitalwertkurve()
    finanzierung()
    abweichung()
