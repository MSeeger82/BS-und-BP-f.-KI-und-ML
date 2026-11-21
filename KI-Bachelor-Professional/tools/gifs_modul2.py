"""Erklär-GIFs für Modul 2: Umgang mit Daten."""
import math
import random

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 2


def table(d, x, y, cols, rows, widths, head_fill=TEAL_L, hl=None, t=1.0):
    """Kleine Tabelle; hl = {zeilenindex: farbe}."""
    hl = hl or {}
    cx = x
    for c, w in zip(cols, widths):
        cell(d, cx, y, w, 24, c, fill=mix(BG, head_fill, t), col=mix(BG, INK, t), bold=True, size=11)
        cx += w
    for r, row in enumerate(rows):
        cx = x
        for v, w in zip(row, widths):
            cell(d, cx, y + 24 + r * 22, w, 22, str(v), fill=mix(BG, hl.get(r, WHITE), t), col=mix(BG, INK, t), size=11)
            cx += w


def relationen():
    """Zwei Tabellen; Fremdschlüssel in Bestellung zeigt auf Primärschlüssel in Kunde."""
    kunden = [("1", "Meier", "Köln"), ("2", "Öztürk", "Ulm"), ("3", "Schulz", "Kiel")]
    best = [("101", "2", "89 €"), ("102", "1", "45 €"), ("103", "2", "120 €"), ("104", "3", "15 €")]
    a = Anim()
    for i in range(4 * 16 + 10):
        img, d = canvas()
        title(d, "Relationale Datenbank: Schlüssel verbinden Tabellen")
        k = min(3, i // 16)
        t = ease((i % 16) / 10) if i < 64 else 1
        hlb = {k: AMBER_L} if i < 64 else {}
        ref = int(best[k][1]) - 1 if i < 64 else -1
        table(d, 30, 70, ["kunden_id (PK)", "name", "ort"], kunden, [100, 80, 70], hl={ref: AMBER_L} if ref >= 0 else {})
        table(d, 360, 70, ["best_id (PK)", "kunden_id (FK)", "betrag"], best, [92, 110, 60], head_fill=SKY_L, hl=hlb)
        if i < 64:
            y1 = 70 + 24 + k * 22 + 11
            y2 = 70 + 24 + ref * 22 + 11
            arrow(d, 360, y1, 30 + 250 + 6 + (1 - t) * 60, y2, AMBER, 2)
        text(d, (30, 220), "PK = Primärschlüssel: identifiziert jede Zeile eindeutig", 13, False, INK)
        text(d, (30, 244), "FK = Fremdschlüssel: verweist auf den Primärschlüssel einer anderen Tabelle", 13, False, INK)
        text(d, (30, 268), "1 Kunde – n Bestellungen  (1:n-Beziehung)", 13, True, TEAL)
        caption(d, "Jede Information steht nur einmal – Verknüpfung über Schlüssel")
        a.frame(img, 80)
    a.hold(2600)
    a.save(NR, "relationen.gif")


def join():
    """INNER JOIN: passende Zeilen werden zusammengeführt."""
    kunden = [("1", "Meier"), ("2", "Öztürk"), ("3", "Schulz")]
    best = [("101", "2", "89"), ("102", "1", "45"), ("103", "2", "120")]
    res = [("101", "Öztürk", "89"), ("102", "Meier", "45"), ("103", "Öztürk", "120")]
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "JOIN: Tabellen über den Schlüssel zusammenführen")
        text(d, (24, 48), "SELECT b.best_id, k.name, b.betrag FROM bestellung b JOIN kunde k ON b.kunden_id = k.kunden_id;", 10, False, VIOLET)
        table(d, 30, 75, ["kunden_id", "name"], kunden, [80, 80])
        table(d, 230, 75, ["best_id", "kunden_id", "betrag"], best, [70, 80, 60], head_fill=SKY_L)
        n = min(3, max(0, (i - 10) // 14 + 1))
        if n:
            table(d, 30, 210, ["best_id", "name", "betrag"], res[:n], [80, 100, 70], head_fill=AMBER_L)
        text(d, (470, 120), "Kunde 3 hat keine", 12, False, MUTED)
        text(d, (470, 138), "Bestellung → fehlt", 12, False, MUTED)
        text(d, (470, 156), "beim INNER JOIN.", 12, False, MUTED)
        text(d, (470, 186), "LEFT JOIN behält", 12, True, TEAL)
        text(d, (470, 204), "alle Kunden.", 12, True, TEAL)
        caption(d, "Nur Zeilen mit passendem Schlüssel landen im Ergebnis")
        a.frame(img, 90)
    a.hold(2800)
    a.save(NR, "join.gif")


def group_by():
    """Zeilen werden nach Region gruppiert und aufsummiert."""
    rows = [("Nord", 120), ("Süd", 80), ("Nord", 60), ("West", 150), ("Süd", 40), ("Nord", 90), ("West", 30)]
    colors = {"Nord": TEAL, "Süd": AMBER, "West": VIOLET}
    groups = ["Nord", "Süd", "West"]
    a = Anim()
    for i in range(70):
        t = ease((i - 15) / 30)
        img, d = canvas()
        title(d, "GROUP BY: je Gruppe eine Zeile mit Kennzahl")
        text(d, (24, 50), "SELECT region, SUM(umsatz), COUNT(*) FROM verkauf GROUP BY region;", 11, False, VIOLET)
        cnt = {g: 0 for g in groups}
        for k, (r, v) in enumerate(rows):
            gi = groups.index(r)
            x0, y0 = 40, 80 + k * 30
            x1, y1 = 300, 72 + gi * 92 + cnt[r] * 27
            cnt[r] += 1
            x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            d.rounded_rectangle(p(x, y, x + 120, y + 24), radius=5 * 2, fill=mix(WHITE, mix(WHITE, colors[r], .25), 1), outline=colors[r], width=2)
            text(d, (x + 8, y + 12), f"{r}", 11, True, colors[r], "lm")
            text(d, (x + 112, y + 12), f"{v} T€", 11, False, INK, "rm")
        if t > 0.95:
            for gi, g in enumerate(groups):
                s = sum(v for r, v in rows if r == g)
                c = sum(1 for r, v in rows if r == g)
                yc = 72 + gi * 92 + (c * 27 - 3) / 2
                arrow(d, 430, yc, 470, yc, colors[g])
                box(d, 478, yc - 20, 140, 40, f"{g}: {s} T€", colors[g], WHITE, f"{c} Verkäufe")
        caption(d, "WHERE filtert Zeilen vorher – HAVING filtert Gruppen nachher")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "group-by.gif")


def mittelwert_median():
    """Ein Ausreißer wandert nach rechts: Mittelwert folgt, Median bleibt stehen."""
    base = [2, 3, 3, 4, 4, 5, 5, 6]
    a = Anim()
    for i in range(60):
        out = 6 + 16 * ease(i / 40)
        vals = sorted(base + [out])
        mean = sum(vals) / len(vals)
        med = vals[len(vals) // 2]
        img, d = canvas()
        title(d, "Lieferzeiten in Tagen: Mittelwert gegen Median")
        X0, X1, Y = 40, 600, 220
        sx = lambda v: X0 + v / 24 * (X1 - X0)
        d.line(p(X0, Y, X1, Y), fill=GREY, width=2)
        for v in range(0, 25, 2):
            d.line(p(sx(v), Y, sx(v), Y + 6), fill=GREY, width=2)
            text(d, (sx(v), Y + 18), str(v), 11, False, MUTED, "mm")
        stack = {}
        for v in vals:
            k = round(v, 1)
            stack[k] = stack.get(k, 0) + 1
            y = Y - 14 - (stack[k] - 1) * 20
            col = CORAL if v == out and v > 6.01 else TEAL
            d.ellipse(p(sx(v) - 8, y - 8, sx(v) + 8, y + 8), fill=col)
        d.line(p(sx(mean), 80, sx(mean), Y), fill=AMBER, width=3 * 2)
        text(d, (sx(mean) + 6, 86), f"Mittelwert {de(mean)}", 13, True, AMBER)
        d.line(p(sx(med), 120, sx(med), Y), fill=VIOLET, width=3 * 2)
        text(d, (sx(med) - 6, 126), f"Median {de(med, 0)}", 13, True, VIOLET, "ra")
        caption(d, "Der Median ist robust gegen Ausreißer – der Mittelwert nicht")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "mittelwert-median.gif")


def boxplot():
    """Werte sortieren, Quartile markieren, Box und Whisker zeichnen, Ausreißer nach Tukey."""
    vals = [12, 14, 15, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24, 40]
    q1, med, q3 = 15, 18, 22
    iqr = q3 - q1
    lo, hi = q1 - 1.5 * iqr, q3 + 1.5 * iqr
    a = Anim()
    for i in range(80):
        img, d = canvas()
        title(d, "Boxplot: Quartile, IQR und Ausreißer")
        X0, X1 = 50, 600
        sx = lambda v: X0 + (v - 8) / 36 * (X1 - X0)
        for k, v in enumerate(vals):
            x = 50 + k * 37
            col = CORAL if v > hi and i > 50 else INK
            cell(d, x, 54, 33, 26, str(v), fill=WHITE, col=col, bold=v > hi and i > 50, size=12)
        s1 = ease((i - 8) / 12)
        if s1 > 0:
            # n = 15: Q1 = 4. Wert, Median = 8. Wert, Q3 = 12. Wert
            for k, name, col in ((3, "Q1", TEAL), (7, "Median", VIOLET), (11, "Q3", TEAL)):
                x = 50 + k * 37 + 16
                text(d, (x, 98), name, 12, True, mix(BG, col, s1), "mm")
        s2 = ease((i - 24) / 14)
        Y = 210
        d.line(p(X0, Y + 50, X1, Y + 50), fill=GRID, width=2)
        for v in range(8, 45, 4):
            text(d, (sx(v), Y + 64), str(v), 11, False, MUTED, "mm")
        if s2 > 0:
            d.rectangle(p(sx(q1), Y - 24, sx(q1) + (sx(q3) - sx(q1)) * s2, Y + 24), fill=TEAL_L, outline=TEAL, width=2 * 2)
            d.line(p(sx(med), Y - 24, sx(med), Y + 24), fill=VIOLET, width=3 * 2)
        s3 = ease((i - 40) / 10)
        if s3 > 0:
            whi = max(v for v in vals if v <= hi)
            d.line(p(sx(min(vals)), Y, sx(q1), Y), fill=mix(BG, INK, s3), width=2 * 2)
            d.line(p(sx(q3), Y, sx(whi), Y), fill=mix(BG, INK, s3), width=2 * 2)
            for v in (min(vals), whi):
                d.line(p(sx(v), Y - 12, sx(v), Y + 12), fill=mix(BG, INK, s3), width=2 * 2)
            text(d, (sx(q1) + (sx(q3) - sx(q1)) / 2, Y - 40), f"IQR = Q3 − Q1 = {iqr}", 13, True, mix(BG, TEAL, s3), "mm")
        if i > 50:
            d.ellipse(p(sx(40) - 7, Y - 7, sx(40) + 7, Y + 7), outline=CORAL, width=3 * 2)
            text(d, (sx(40), Y - 30), "Ausreißer", 12, True, CORAL, "mm")
            text(d, (sx(40), Y + 34), f"> Q3 + 1,5·IQR = {de(hi, 1)}", 11, False, CORAL, "mm")
        caption(d, "Die Box enthält die mittleren 50 % der Werte")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "boxplot.gif")


def korrelation():
    """Punktwolke wandert von r ≈ −0,9 über 0 zu +0,9."""
    random.seed(5)
    base = [(random.gauss(0, 1), random.gauss(0, 1)) for _ in range(60)]
    a = Anim()
    steps = 90
    for i in range(steps):
        r = -0.9 + 1.8 * ease(i / (steps - 15))
        pts = [(x, r * x + math.sqrt(1 - r * r) * e) for x, e in base]
        img, d = canvas()
        title(d, "Korrelation r: Stärke und Richtung eines linearen Zusammenhangs")
        X0, Y0, X1, Y1 = 150, 60, 490, 320
        axes(d, X0, Y0, X1, Y1, "x", "y")
        for x, y in pts:
            cx, cy = 320 + x * 52, 190 - y * 40
            d.ellipse(p(cx - 4, cy - 4, cx + 4, cy + 4), fill=TEAL if r > 0.2 else CORAL if r < -0.2 else GREY)
        text(d, (520, 150), f"r = {de(r, 2)}", 22, True, INK)
        lab = "stark negativ" if r < -0.7 else "mittel negativ" if r < -0.3 else "kaum linear" if r < 0.3 else "mittel positiv" if r < 0.7 else "stark positiv"
        text(d, (520, 182), lab, 14, False, MUTED)
        caption(d, "Korrelation heißt nicht Kausalität")
        a.frame(img, 70)
    a.hold(2600)
    a.save(NR, "korrelation.gif")


def skalierung():
    """Zwei Merkmale mit sehr verschiedenen Bereichen werden auf vergleichbare Skalen gebracht."""
    alter = [22, 35, 41, 58, 63]
    gehalt = [28000, 41000, 52000, 67000, 90000]
    a = Anim()
    for i in range(70):
        t = ease((i - 15) / 30)
        img, d = canvas()
        title(d, "Skalierung: Merkmale vergleichbar machen")
        text(d, (40, 60), "vorher", 13, True, MUTED)
        text(d, (360, 60), "nachher: Min-Max auf [0; 1]", 13, True, TEAL)
        for k, (al, ge) in enumerate(zip(alter, gehalt)):
            y = 90 + k * 44
            # vorher: Balken relativ zu 90.000
            w_al = al / 90000 * 260
            w_ge = ge / 90000 * 260
            d.rectangle(p(40, y, 40 + max(2, w_al), y + 14), fill=AMBER)
            d.rectangle(p(40, y + 18, 40 + w_ge, y + 32), fill=SKY)
            text(d, (44 + max(2, w_al), y + 7), f"Alter {al}", 10, False, INK, "lm")
            text(d, (44 + w_ge, y + 25), f"{ge:,} €".replace(",", "."), 10, False, INK, "lm")
            na = (al - 22) / (63 - 22)
            ng = (ge - 28000) / (90000 - 28000)
            d.rectangle(p(360, y, 360 + max(2, 220 * na * t), y + 14), fill=AMBER)
            d.rectangle(p(360, y + 18, 360 + max(2, 220 * ng * t), y + 32), fill=SKY)
            if t > 0.9:
                text(d, (364 + max(2, 220 * na), y + 7), de(na, 2), 10, False, INK, "lm")
                text(d, (364 + max(2, 220 * ng), y + 25), de(ng, 2), 10, False, INK, "lm")
        caption(d, "Ohne Skalierung dominiert das Gehalt jeden Abstand – das Alter ginge unter")
        a.frame(img, 80)
    a.hold(3000)
    a.save(NR, "skalierung.gif")


def pseudonym():
    """Klarnamen werden durch Kennungen ersetzt; der Schlüssel liegt getrennt. Anonymisierung entfernt den Bezug."""
    a = Anim()
    names = ["Anna Weber", "Jonas Kurz", "Mia Yilmaz"]
    ids = ["K-7F2A", "K-19C3", "K-B804"]
    for i in range(80):
        img, d = canvas()
        title(d, "Pseudonymisieren oder anonymisieren?")
        t = ease((i - 10) / 20)
        t2 = ease((i - 45) / 20)
        for k in range(3):
            y = 80 + k * 34
            cell(d, 30, y, 150, 30, names[k] if t < 0.5 else ids[k], fill=WHITE, col=INK if t < 0.5 else VIOLET, size=12)
            cell(d, 180, y, 90, 30, ["Diabetes", "Asthma", "–"][k], fill=WHITE, size=12)
        text(d, (30, 70), "Datensatz", 12, True, MUTED, "lb")
        if t > 0.5:
            d.rounded_rectangle(p(320, 76, 500, 172), radius=10 * 2, fill=AMBER_L, outline=AMBER, width=2 * 2)
            text(d, (332, 92), "Schlüsseltabelle", 13, True, INK)
            text(d, (332, 110), "getrennt gespeichert, geschützt", 10, False, MUTED)
            for k in range(3):
                text(d, (332, 128 + k * 15), f"{ids[k]} → {names[k]}", 10, False, INK)
            arrow(d, 300, 125, 316, 125, AMBER)
            text(d, (30, 200), "Pseudonymisiert: mit dem Schlüssel wieder zuordenbar", 13, True, VIOLET)
            text(d, (30, 220), "→ bleibt personenbezogen, DSGVO gilt weiter", 13, False, INK)
        if t2 > 0:
            d.line(p(320, 76, 500, 172), fill=mix(BG, CORAL, t2), width=3 * 2)
            d.line(p(500, 76, 320, 172), fill=mix(BG, CORAL, t2), width=3 * 2)
            text(d, (30, 262), "Anonymisiert: Schlüssel gelöscht, Personenbezug nicht mehr herstellbar", 13, True, mix(BG, TEAL, t2))
            text(d, (30, 282), "→ keine personenbezogenen Daten mehr, DSGVO gilt nicht", 13, False, mix(BG, INK, t2))
        caption(d, "Vorsicht: seltene Merkmalskombinationen können trotzdem verraten, wer gemeint ist")
        a.frame(img, 80)
    a.hold(3200)
    a.save(NR, "pseudonym.gif")


if __name__ == "__main__":
    relationen()
    join()
    group_by()
    mittelwert_median()
    boxplot()
    korrelation()
    skalierung()
    pseudonym()
