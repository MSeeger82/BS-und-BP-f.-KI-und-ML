"""GIFs für Modul 3 (Daten: Qualität, Vorverarbeitung, Feature Engineering)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(3)


# 1 Datenbereinigung -----------------------------------------------------------
def gif_bereinigung():
    cols = ["Kunde", "Alter", "Ort", "Umsatz €"]
    rows = [
        ["Meier", "34", "Köln", "820"],
        ["Schulz", "", "Bonn", "640"],
        ["Meier", "34", "Köln", "820"],
        ["Yilmaz", "29", "köln ", "910"],
        ["Kraus", "51", "Bonn", "95000"],
        ["Becker", "47", "Aachen", "730"],
    ]
    steps = [
        ("Rohdaten aus dem Shop-Export", None),
        ("1  Duplikat finden und entfernen", "dup"),
        ("2  Fehlenden Wert mit dem Median füllen (Alter 34)", "na"),
        ("3  Schreibweise vereinheitlichen: »köln « → »Köln«", "fmt"),
        ("4  Ausreißer prüfen: 95.000 € – Tippfehler, korrigiert auf 950", "out"),
        ("Saubere Daten – bereit für das Modell", "done"),
    ]
    x0, y0, cw, ch = 40, 92, 135, 34
    frames, durs = [], []
    for si, (label, key) in enumerate(steps):
        keys = [k for _, k in steps[:si + 1]]
        for k in range(10):
            t = ease(k / 9)
            img, d = canvas()
            text(d, (24, 30), "Datenbereinigung Schritt für Schritt", 16, True, INK)
            text(d, (24, 58), label, 14, True, AMBER if key != "done" else TEAL)
            for j, c in enumerate(cols):
                cell(d, x0 + j * cw, y0, cw, ch, c, GRID, INK, True, 12)
            ry = y0 + ch
            for i, r in enumerate(rows):
                vals = list(r)
                fill = WHITE
                hide = 0
                if i == 2 and "dup" in keys:
                    if key == "dup":
                        fill = mix(WHITE, CORAL_L, 1)
                        hide = t if k > 4 else 0
                    else:
                        continue
                if i == 1 and "na" in keys:
                    vals[1] = "34"
                if i == 3 and "fmt" in keys:
                    vals[2] = "Köln"
                if i == 4 and "out" in keys:
                    vals[3] = "950"
                hl = {}
                if key == "na" and i == 1:
                    hl[1] = AMBER_L
                if key == "fmt" and i == 3:
                    hl[2] = AMBER_L
                if key == "out" and i == 4:
                    hl[3] = AMBER_L
                if key is None and i == 1:
                    hl[1] = CORAL_L
                h_ = ch * (1 - hide)
                if h_ < 2:
                    continue
                for j, v in enumerate(vals):
                    f = hl.get(j, fill)
                    if key == "done":
                        f = mix(WHITE, TEAL_L, 0.5)
                    d.rectangle(p(x0 + j * cw, ry, x0 + (j + 1) * cw, ry + h_), fill=f, outline=GRID, width=S)
                    if h_ > 20:
                        text(d, (x0 + j * cw + cw / 2, ry + h_ / 2), v if v else "– leer –", 12, False, MUTED if not v else INK, "mm")
                ry += h_
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1600
    durs[-1] = 3000
    save(frames, OUT / "datenbereinigung.gif", durs)


# 2 One-Hot-Encoding ------------------------------------------------------------
def gif_onehot():
    farben = ["rot", "grün", "blau", "grün", "rot"]
    cats = ["rot", "grün", "blau"]
    colc = {"rot": CORAL, "grün": TEAL, "blau": VIOLET}
    frames, durs = [], []
    for phase in range(3):
        for k in range(14):
            t = ease(k / 13)
            img, d = canvas()
            text(d, (24, 30), "One-Hot-Encoding: aus einer Kategorie werden Ja/Nein-Spalten", 15, True, INK)
            # links: Originalspalte
            x0, y0, cw, ch = 40, 80, 110, 38
            cell(d, x0, y0, cw, ch, "Farbe", GRID, INK, True)
            for i, f in enumerate(farben):
                cell(d, x0, y0 + ch * (i + 1), cw, ch, f, WHITE, colc[f], True)
            if phase >= 1:
                arrow(d, x0 + cw + 14, y0 + 3.5 * ch, x0 + cw + 70, y0 + 3.5 * ch, GREY)
            # rechts: neue Spalten
            rx = 250
            for j, c in enumerate(cats):
                a = 1 if phase >= 2 else (t if phase == 1 else 0)
                if a <= 0.02:
                    continue
                cell(d, rx + j * 110, y0, 110, ch, "ist_" + c, mix(BG, GRID, a), mix(BG, INK, a), True)
                for i, f in enumerate(farben):
                    v = "1" if f == c else "0"
                    show = 1 if phase == 2 else 0
                    if phase == 2:
                        show = ease(min(1, max(0, t * 1.6 - i * 0.12)))
                    fill = mix(WHITE, mix(WHITE, colc[c], 0.25) if v == "1" else WHITE, show)
                    d.rectangle(p(rx + j * 110, y0 + ch * (i + 1), rx + (j + 1) * 110, y0 + ch * (i + 2)), fill=mix(BG, fill, a), outline=GRID, width=S)
                    if show > 0.3:
                        text(d, (rx + j * 110 + 55, y0 + ch * (i + 1.5)), v, 14, v == "1", INK if v == "1" else MUTED, "mm")
            if phase == 2 and k > 8:
                text(d, (24, 330), "Keine Spalte ist »größer« als die andere – das Modell sieht keine falsche Reihenfolge.", 13, False, MUTED)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1500
    durs[-1] = 3000
    save(frames, OUT / "one-hot-encoding.gif", durs)


# 3 Skalierung ------------------------------------------------------------------
def gif_skalierung():
    rnd = random.Random(4)
    pts = [(rnd.uniform(20, 65), rnd.uniform(20000, 90000)) for _ in range(30)]
    q = (42, 55000)
    ma = sum(a for a, _ in pts) / len(pts); sa = math.sqrt(sum((a - ma) ** 2 for a, _ in pts) / len(pts))
    me = sum(b for _, b in pts) / len(pts); se = math.sqrt(sum((b - me) ** 2 for _, b in pts) / len(pts))
    frames, durs = [], []
    for phase, steps in [(0, 16), (1, 22), (2, 16)]:
        for k in range(steps):
            t = ease(k / (steps - 1))
            img, d = canvas()
            x0, y0, x1, y1 = 60, 66, 330, 330
            d.rectangle(p(x0, y0, x1, y1), outline=GRID, width=S)
            if phase < 1 or (phase == 1 and t < 0.5):
                title, xl, yl = "Rohdaten: Alter (Jahre) und Einkommen (€)", "Alter 20–65", "Einkommen 20.000–90.000"
            else:
                title, xl, yl = "Nach Standardisierung (z-Werte)", "Alter (z)", "Einkommen (z)"
            text(d, (24, 22), title, 15, True, INK)
            text(d, ((x0 + x1) / 2, y1 + 16), xl, 11, False, MUTED, "mm")
            text(d, (x0, y0 - 10), "↑ " + yl, 11, False, MUTED, "lm")
            u = 0 if phase == 0 else (t if phase == 1 else 1)

            def pos(a, b):
                # Rohdaten: gleiche Pixelskala für beide Achsen (Einheit 1) -> Einkommen dominiert
                rx = x0 + (a - 0) / 90000 * (x1 - x0) * 40 + 4
                ry = y1 - (b - 0) / 90000 * (y1 - y0)
                zx = x0 + ((a - ma) / sa + 2.5) / 5 * (x1 - x0)
                zy = y1 - ((b - me) / se + 2.5) / 5 * (y1 - y0)
                return rx + (zx - rx) * u, ry + (zy - ry) * u
            for a, b in pts:
                X, Y = pos(a, b)
                d.ellipse(p(X - 4, Y - 4, X + 4, Y + 4), fill=TEAL)
            QX, QY = pos(*q)
            d.ellipse(p(QX - 7, QY - 7, QX + 7, QY + 7), fill=AMBER)
            tx = 360
            if u < 0.5:
                lines = ["Problem: Einkommen hat", "riesige Zahlen, Alter kleine.", "", "Abstand zweier Personen", "= fast nur Einkommens-", "unterschied. Das Alter", "spielt keine Rolle."]
                col = CORAL
            else:
                lines = ["Lösung: Beide Merkmale", "in z-Werte umrechnen:", "(Wert − Mittel) / Std.-Abw.", "", "Jetzt liegen beide auf", "gleicher Skala (meist −2 bis +2)", "und zählen gleich viel."]
                col = TEAL
            yy = 70
            for ln in lines:
                text(d, (tx, yy), ln, 13, ln.startswith(("Problem", "Lösung")), col if ln.startswith(("Problem", "Lösung")) else INK)
                yy += 22
            text(d, (tx, 300), "Wichtig für kNN, k-Means,", 12, False, MUTED)
            text(d, (tx, 318), "SVM und neuronale Netze", 12, False, MUTED)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1800
    durs[-1] = 3000
    save(frames, OUT / "skalierung.gif", durs)


# 4 Train/Validation/Test -------------------------------------------------------
def gif_split():
    rnd = random.Random(8)
    n = 100
    order = list(range(n))
    rnd.shuffle(order)
    cols_ = 20
    sz = 22
    frames, durs = [], []

    def grid_pos(i):
        return 40 + (i % cols_) * (sz + 4), 70 + (i // cols_) * (sz + 4)

    for phase in range(4):
        for k in range(14):
            t = ease(k / 13)
            img, d = canvas()
            titles = ["100 Datensätze", "Gut mischen", "Aufteilen: 70 % / 15 % / 15 %", "Jeder Teil hat eine Aufgabe"]
            text(d, (24, 30), titles[phase], 16, True, INK)
            for i in range(n):
                if phase == 0:
                    x, y = grid_pos(i); col = GREY
                elif phase == 1:
                    a = grid_pos(i); b = grid_pos(order.index(i))
                    x, y = a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t
                    col = GREY
                else:
                    pos = order.index(i)
                    x, y = grid_pos(pos)
                    target = TEAL if pos < 70 else (AMBER if pos < 85 else VIOLET)
                    col = mix(GREY, target, t if phase == 2 else 1)
                d.rounded_rectangle(p(x, y, x + sz, y + sz), radius=4 * S, fill=col)
            if phase == 3:
                yy = 222
                for col, name, desc in [(TEAL, "Training (70)", "Modell lernt die Gewichte"),
                                        (AMBER, "Validierung (15)", "Einstellungen wählen, Modelle vergleichen"),
                                        (VIOLET, "Test (15)", "Einmal am Ende: ehrliche Abschlussnote")]:
                    d.rounded_rectangle(p(40, yy, 58, yy + 18), radius=4 * S, fill=col)
                    text(d, (68, yy + 9), name, 13, True, INK, "lm")
                    text(d, (220, yy + 9), desc, 13, False, MUTED, "lm")
                    yy += 34
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1400
    durs[-1] = 3200
    save(frames, OUT / "train-test-split.gif", durs)


# 5 Data Leakage ----------------------------------------------------------------
def gif_leakage():
    frames, durs = [], []
    x0, x1, yl = 50, 590, 190
    events = [
        (0.10, "Vertrag seit 4 Jahren", TEAL, True),
        (0.28, "3 Support-Anrufe", TEAL, True),
        (0.45, "Preis erhöht", TEAL, True),
        (0.62, "Vorhersage-Zeitpunkt", AMBER, None),
        (0.75, "Kündigung", CORAL, None),
        (0.90, "Kündigungsbestätigung versendet", CORAL, False),
    ]
    for phase in range(4):
        for k in range(14):
            t = ease(k / 13)
            img, d = canvas()
            text(d, (24, 30), "Data Leakage: Informationen aus der Zukunft", 16, True, INK)
            d.line(p(x0, yl, x1, yl), fill=GREY, width=3 * S)
            arrow(d, x1 - 10, yl, x1 + 10, yl, GREY)
            text(d, (x1, yl + 22), "Zeit", 11, False, MUTED, "mm")
            nshow = [3, 5, 6, 6][phase]
            for i, (pos, lab, col, ok) in enumerate(events[:nshow]):
                X = x0 + pos * (x1 - x0)
                a = 1 if (i < [0, 3, 5, 6][phase]) else t
                c = mix(BG, col, a)
                up = i in (0, 2, 4, 5)
                d.ellipse(p(X - 7, yl - 7, X + 7, yl + 7), fill=c)
                ly = (yl - 46 if i != 5 else yl - 76) if up else yl + 46
                if i == 5:
                    X = X - 30
                d.line(p(X, yl, X, ly + (12 if up else -12)), fill=c, width=S)
                text(d, (X, ly), lab, 12, True, c, "mm")
            if phase >= 1:
                Xv = x0 + 0.62 * (x1 - x0)
                d.rectangle(p(Xv, yl - 90, x1, yl + 90), outline=CORAL_L, width=2 * S)
                text(d, ((Xv + x1) / 2, yl - 100), "Zukunft – zum Vorhersagezeitpunkt unbekannt", 11, False, CORAL, "mm")
            if phase >= 3:
                Xb = x0 + 0.90 * (x1 - x0)
                for dd in (-1, 1):
                    d.line(p(Xb - 12, yl + 40 - 12 * dd, Xb + 12, yl + 40 + 12 * dd), fill=CORAL, width=4 * S)
                text(d, (24, 318), "Verwendet man »Kündigungsbestätigung versendet« als Merkmal, ist das Modell im Test", 13, False, INK)
                text(d, (24, 340), "fast perfekt – im echten Einsatz aber nutzlos. Nur Merkmale links vom Vorhersagezeitpunkt!", 13, True, CORAL)
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1500
    durs[-1] = 3800
    save(frames, OUT / "data-leakage.gif", durs)


# 6 SQL JOIN --------------------------------------------------------------------
def gif_join():
    kunden = [("1", "Meier"), ("2", "Schulz"), ("3", "Yilmaz")]
    best = [("101", "1", "120 €"), ("102", "3", "80 €"), ("103", "1", "45 €")]
    frames, durs = [], []
    kx, ky = 30, 80
    bx, by = 250, 80
    rx, ry = 440, 80
    for phase in range(4):
        for k in range(12):
            t = ease(k / 11)
            img, d = canvas()
            titles = ["Zwei Tabellen: kunde und bestellung", "JOIN: Zeilen mit gleicher kunde_id verbinden", "INNER JOIN: nur Kunden mit Bestellung", "LEFT JOIN: alle Kunden, auch ohne Bestellung"]
            text(d, (24, 30), titles[phase], 15, True, INK)
            text(d, (kx, ky - 14), "kunde", 12, True, TEAL)
            cell(d, kx, ky, 60, 30, "id", GRID, INK, True); cell(d, kx + 60, ky, 100, 30, "name", GRID, INK, True)
            for i, (a, b) in enumerate(kunden):
                hl = TEAL_L if phase >= 1 and a in ("1", "3") else (CORAL_L if phase == 3 and a == "2" else WHITE)
                cell(d, kx, ky + 30 * (i + 1), 60, 30, a, hl); cell(d, kx + 60, ky + 30 * (i + 1), 100, 30, b, hl)
            text(d, (bx, by - 14), "bestellung", 12, True, AMBER)
            cell(d, bx, by, 60, 30, "nr", GRID, INK, True); cell(d, bx + 60, by, 70, 30, "kunde_id", GRID, INK, True, 11); cell(d, bx + 130, by, 60, 30, "betrag", GRID, INK, True, 11)
            for i, (a, b, c) in enumerate(best):
                cell(d, bx, by + 30 * (i + 1), 60, 30, a); cell(d, bx + 60, by + 30 * (i + 1), 70, 30, b, AMBER_L if phase >= 1 else WHITE); cell(d, bx + 130, by + 30 * (i + 1), 60, 30, c)
            if phase >= 1:
                for i, (a, b, c) in enumerate(best):
                    ki = [x[0] for x in kunden].index(b)
                    a_ = t if phase == 1 else 1
                    d.line(p(kx + 160, ky + 30 * (ki + 1.5), kx + 160 + (bx - kx - 160) * a_, ky + 30 * (ki + 1.5) + ((by + 30 * (i + 1.5)) - (ky + 30 * (ki + 1.5))) * a_), fill=AMBER, width=2 * S)
            if phase >= 2:
                text(d, (rx, ry - 14), "Ergebnis", 12, True, VIOLET)
                res = [("Meier", "120 €"), ("Meier", "45 €"), ("Yilmaz", "80 €")]
                if phase == 3:
                    res = [("Meier", "120 €"), ("Meier", "45 €"), ("Schulz", "NULL"), ("Yilmaz", "80 €")]
                cell(d, rx, ry, 100, 30, "name", GRID, INK, True); cell(d, rx + 100, ry, 80, 30, "betrag", GRID, INK, True)
                for i, (a, b) in enumerate(res):
                    a_ = ease(min(1, max(0, t * 2 - i * 0.25)))
                    if a_ < 0.05:
                        continue
                    f = CORAL_L if b == "NULL" else VIOLET_L
                    cell(d, rx, ry + 30 * (i + 1), 100, 30, a, mix(BG, f, a_), mix(BG, INK, a_))
                    cell(d, rx + 100, ry + 30 * (i + 1), 80, 30, b, mix(BG, f, a_), mix(BG, INK, a_))
            code = {0: "", 1: "... JOIN bestellung b ON b.kunde_id = k.id",
                    2: "SELECT k.name, b.betrag FROM kunde k INNER JOIN bestellung b ON b.kunde_id = k.id",
                    3: "SELECT k.name, b.betrag FROM kunde k LEFT JOIN bestellung b ON b.kunde_id = k.id"}[phase]
            if code:
                d.rounded_rectangle(p(24, 300, W - 24, 344), radius=8 * S, fill=INK)
                text(d, (36, 322), code, 11, False, WHITE, "lm")
            frames.append(finish(img)); durs.append(90)
        durs[-1] = 1800
    durs[-1] = 3600
    save(frames, OUT / "sql-join.gif", durs)


if __name__ == "__main__":
    gif_bereinigung()
    gif_onehot()
    gif_skalierung()
    gif_split()
    gif_leakage()
    gif_join()
