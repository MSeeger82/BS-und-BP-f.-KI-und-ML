"""GIFs für Modul 9 (Projektvorgehen und MLOps)."""
import math
import random
from gifkit import *  # noqa: F401,F403

OUT = out_dir(9)


def rbox(d, cx, cy, w, h, label, col, colL, on=True, sub=None, size=12):
    d.rounded_rectangle(p(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2), radius=10 * S,
                        fill=colL if on else WHITE, outline=col if on else GRID, width=2 * S)
    if sub:
        text(d, (cx, cy - 8), label, size, True, INK if on else MUTED, "mm")
        text(d, (cx, cy + 10), sub, 10, False, MUTED, "mm")
    else:
        text(d, (cx, cy), label, size, True, INK if on else MUTED, "mm")


# 1 CRISP-DM ----------------------------------------------------------------------
def gif_crisp():
    phases = [("Business", "Understanding"), ("Data", "Understanding"), ("Data", "Preparation"), ("Modeling", ""), ("Evaluation", ""), ("Deployment", "")]
    desc = ["Ziel, Erfolgskriterium, Nutzen", "Daten sichten, EDA, Qualität", "Bereinigen, Merkmale, Aufteilen", "Verfahren wählen, trainieren", "Technisch und fachlich prüfen: Go / No-Go", "Betrieb, Monitoring, Wartung"]
    cols = [AMBER, TEAL, TEAL, VIOLET, CORAL, TEAL]
    colsL = [AMBER_L, TEAL_L, TEAL_L, VIOLET_L, CORAL_L, TEAL_L]
    cx, cy, R = 230, 200, 130
    pos = [(cx + R * 1.15 * math.cos(-math.pi / 2 + i * math.pi / 3), cy + R * math.sin(-math.pi / 2 + i * math.pi / 3)) for i in range(6)]
    frames, durs = [], []
    order = [0, 1, 0, 1, 2, 3, 2, 3, 4, 0, 1, 2, 3, 4, 5]
    for si, ph in enumerate(order):
        for f in range(10):
            img, d = canvas()
            text(d, (24, 26), "CRISP-DM: sechs Phasen, mit Rücksprüngen", 15, True, INK)
            d.ellipse(p(cx - R * 1.15, cy - R, cx + R * 1.15, cy + R), outline=GRID, width=3 * S)
            # Daten in der Mitte
            d.ellipse(p(cx - 34, cy - 24, cx + 34, cy + 24), fill=WHITE, outline=GREY, width=2 * S)
            text(d, (cx, cy), "Daten", 12, True, MUTED, "mm")
            for i, ((a, b), (x, y)) in enumerate(zip(phases, pos)):
                rbox(d, x, y, 118, 46, a, cols[i], colsL[i], on=(i == ph), sub=b if b else None)
            if si > 0:
                prev = order[si - 1]
                if prev != ph:
                    t = ease(f / 9)
                    (xa, ya), (xb, yb) = pos[prev], pos[ph]
                    mx, my = xa + (xb - xa) * t, ya + (yb - ya) * t
                    d.ellipse(p(mx - 6, my - 6, mx + 6, my + 6), fill=AMBER)
                    if ph < prev:
                        text(d, (cx, cy + 46), "Rücksprung!", 12, True, CORAL, "mm")
            tx = 430
            text(d, (tx, 80), "Aktuelle Phase:", 12, False, MUTED)
            text(d, (tx, 104), (phases[ph][0] + " " + phases[ph][1]).strip(), 14, True, cols[ph])
            wrap_text(d, tx, 134, desc[ph], 24, 12, False, INK, 18)
            text(d, (tx, 250), "Rücksprünge sind normal:", 12, True, INK)
            text(d, (tx, 270), "Neue Erkenntnisse führen", 12, False, INK)
            text(d, (tx, 288), "zurück zu früheren Phasen.", 12, False, INK)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 900
    durs[-1] = 3000
    save(frames, OUT / "crisp-dm.gif", durs)


# 2 MLOps-Lebenszyklus -------------------------------------------------------------
def gif_mlops():
    steps = [("Daten", "versioniert", TEAL, TEAL_L), ("Training", "Experimente protokolliert", VIOLET, VIOLET_L), ("Tests", "Qualität, Fairness", AMBER, AMBER_L),
             ("Registry", "Modell v1, v2, …", VIOLET, VIOLET_L), ("Deployment", "API, Container", TEAL, TEAL_L), ("Monitoring", "Drift, Fehler, Kosten", CORAL, CORAL_L)]
    xs = [62, 166, 270, 374, 478, 582]
    y = 160
    frames, durs = [], []
    for loop in range(2):
        for i in range(len(steps)):
            for f in range(10):
                t = ease(f / 9)
                img, d = canvas()
                text(d, (24, 26), "MLOps: Der Kreislauf vom Experiment zum zuverlässigen Betrieb", 15, True, INK)
                for j, ((lab, sub, col, colL), x) in enumerate(zip(steps, xs)):
                    on = j <= i or loop == 1
                    rbox(d, x, y, 96, 62, lab, col, colL, on=on or j == i, sub=None)
                    wrap_text(d, x - 46, y + 42, sub, 15, 10, False, MUTED if on else GRID, 14)
                    if j < len(steps) - 1:
                        arrow(d, x + 50, y, xs[j + 1] - 50, y, GREY)
                # Rücklauf
                d.line(p(582, y - 34, 582, 80, 62, 80, 62, y - 34), fill=CORAL_L, width=3 * S)
                arrow(d, 62, 90, 62, y - 34, CORAL_L)
                text(d, (332, 70), "Drift erkannt → automatisch neu trainieren (Continuous Training)", 11, True, CORAL, "mm")
                xa = xs[i]
                d.ellipse(p(xa - 7, y + 26 + 6 * math.sin(f), xa + 7, y + 40 + 6 * math.sin(f)), fill=AMBER) if False else None
                if loop == 1 and i == len(steps) - 1:
                    a = t
                    px_ = 582 - (582 - 62) * a
                    d.ellipse(p(px_ - 7, 73, px_ + 7, 87), fill=CORAL)
                text(d, (24, 300), "Alles wird versioniert und automatisiert: Code (Git), Daten (z. B. DVC), Modelle (Registry, z. B. MLflow).", 12, False, INK)
                text(d, (24, 322), "So ist jedes Ergebnis nachvollziehbar und jede Version kann zurückgeholt werden.", 12, False, MUTED)
                frames.append(finish(img)); durs.append(70)
            durs[-1] = 500
    durs[-1] = 3200
    save(frames, OUT / "mlops-kreislauf.gif", durs)


# 3 Deployment-Varianten ------------------------------------------------------------
def gif_deployment():
    panels = [("Batch", "jede Nacht 1×", "Kündigerliste", TEAL, TEAL_L), ("Online / API", "pro Anfrage, ms", "Betrugsprüfung", AMBER, AMBER_L),
              ("Edge", "auf dem Gerät", "Kamera an der Linie", VIOLET, VIOLET_L), ("Streaming", "laufender Datenstrom", "Sensorüberwachung", CORAL, CORAL_L)]
    frames, durs = [], []
    for f in range(60):
        img, d = canvas()
        text(d, (24, 26), "Vier Wege, ein Modell einzusetzen", 15, True, INK)
        for i, (name, how, ex, col, colL) in enumerate(panels):
            x0 = 24 + (i % 2) * 304
            y0 = 52 + (i // 2) * 150
            d.rounded_rectangle(p(x0, y0, x0 + 292, y0 + 138), radius=12 * S, fill=WHITE, outline=col, width=2 * S)
            text(d, (x0 + 14, y0 + 18), name, 14, True, col)
            text(d, (x0 + 14, y0 + 40), how, 11, False, MUTED)
            text(d, (x0 + 14, y0 + 118), "z. B. " + ex, 11, True, INK)
            mx, my = x0 + 200, y0 + 72
            d.rounded_rectangle(p(mx - 30, my - 20, mx + 30, my + 20), radius=8 * S, fill=colL, outline=col, width=2 * S)
            text(d, (mx, my), "Modell", 10, True, INK, "mm")
            if i == 0:
                k = f % 60
                if k < 30:
                    for j in range(5):
                        d.rectangle(p(x0 + 20 + j * 16, my - 8, x0 + 32 + j * 16, my + 8), fill=GREY)
                else:
                    t = ease((k - 30) / 15) if k < 45 else 1
                    for j in range(5):
                        xx = x0 + 20 + j * 16 + (mx - 40 - x0 - 20) * t
                        d.rectangle(p(xx, my - 8, xx + 12, my + 8), fill=col)
                text(d, (x0 + 14, y0 + 96), "Stapel auf einmal", 10, False, MUTED)
            elif i == 1:
                for j in range(3):
                    ph = ((f + j * 20) % 20) / 20
                    xx = x0 + 20 + (mx - 52 - x0) * ph
                    d.ellipse(p(xx - 5, my - 5 + (j - 1) * 14, xx + 5, my + 5 + (j - 1) * 14), fill=col)
                text(d, (x0 + 14, y0 + 96), "Anfrage → Antwort sofort", 10, False, MUTED)
            elif i == 2:
                d.rounded_rectangle(p(mx - 46, my - 34, mx + 46, my + 34), radius=10 * S, outline=GREY, width=2 * S)
                text(d, (mx, my + 44), "Gerät", 10, False, MUTED, "mm")
                if f % 20 < 10:
                    d.ellipse(p(x0 + 40, my - 6, x0 + 52, my + 6), fill=col)
                text(d, (x0 + 14, y0 + 96), "ohne Netz, wenig Verzögerung", 10, False, MUTED)
            else:
                for j in range(8):
                    xx = x0 + 14 + ((f * 3 + j * 18) % 140)
                    if xx < mx - 34:
                        d.ellipse(p(xx - 3, my - 3 + math.sin(j) * 6, xx + 3, my + 3 + math.sin(j) * 6), fill=col)
                text(d, (x0 + 14, y0 + 96), "ständig, Ereignis für Ereignis", 10, False, MUTED)
        frames.append(finish(img)); durs.append(90)
    save(frames, OUT / "deployment-varianten.gif", durs)


# 4 Rollout-Strategien --------------------------------------------------------------
def gif_rollout():
    frames, durs = [], []
    users = 40
    rnd = random.Random(3)
    for strat, title in [("canary", "Canary-Release: erst wenige, dann alle"), ("shadow", "Shadow-Modus: das neue Modell rechnet nur mit"), ("ab", "A/B-Test: zwei Varianten im fairen Vergleich")]:
        for f in range(36):
            t = ease(f / 35)
            img, d = canvas()
            text(d, (24, 26), title, 15, True, INK)
            rbox(d, 470, 110, 130, 50, "Modell v1", TEAL, TEAL_L, sub="bewährt")
            rbox(d, 470, 240, 130, 50, "Modell v2", AMBER, AMBER_L, sub="neu")
            share = {"canary": [0.05, 0.05, 0.25, 0.5, 1.0][min(4, int(t * 5))], "shadow": 0, "ab": 0.5}[strat]
            for u in range(users):
                ux, uy = 50 + (u % 8) * 30, 80 + (u // 8) * 40
                to_v2 = (u / users) < share
                d.ellipse(p(ux - 9, uy - 9, ux + 9, uy + 9), fill=AMBER if to_v2 else TEAL)
            # Linien
            d.line(p(300, 180, 400, 110), fill=TEAL, width=max(1, int(6 * (1 - share))) * S)
            if strat == "shadow":
                d.line(p(300, 180, 400, 240), fill=AMBER_L, width=3 * S)
                text(d, (470, 284), "bekommt Kopie aller Anfragen,", 10, False, MUTED, "mm")
                text(d, (470, 298), "Antwort wird nur protokolliert", 10, False, MUTED, "mm")
            else:
                d.line(p(300, 180, 400, 240), fill=AMBER, width=max(1, int(6 * share)) * S)
            if strat == "canary":
                text(d, (24, 316), f"Anteil auf v2: {round(share * 100)} % – bei Problemen sofort zurück auf v1 (Rollback).", 13, True, INK)
            elif strat == "shadow":
                text(d, (24, 316), "Kein Kunde merkt etwas. Man vergleicht in Ruhe, wie v2 entschieden hätte.", 13, True, INK)
            else:
                text(d, (24, 316), "Zufällige Hälften: Welche Variante bringt mehr Umsatz / weniger Fehler?", 13, True, INK)
            frames.append(finish(img)); durs.append(110)
        durs[-1] = 1800
    durs[-1] = 3000
    save(frames, OUT / "rollout-strategien.gif", durs)


# 5 Data Drift -----------------------------------------------------------------------
def gif_data_drift():
    bins = 12
    def dist(mu, sd):
        v = [math.exp(-((i + 0.5 - mu) ** 2) / (2 * sd * sd)) for i in range(bins)]
        s = sum(v)
        return [x / s for x in v]
    base = dist(5, 1.8)
    frames, durs = [], []
    months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug"]
    for mi, m in enumerate(months):
        mu = 5 + (0 if mi < 3 else (mi - 2) * 0.35)
        cur = dist(mu, 1.8 + (0 if mi < 3 else (mi - 2) * 0.05))
        psi = sum((c - b) * math.log(c / b) for b, c in zip(base, cur))
        for f in range(10):
            t = ease(f / 9)
            img, d = canvas()
            text(d, (24, 26), "Data Drift: Die Eingabedaten verändern sich", 15, True, INK)
            x0, y1, bw = 40, 300, 28
            for i in range(bins):
                hb = base[i] * 900
                hc = cur[i] * 900 * t
                d.rectangle(p(x0 + i * bw, y1 - hb, x0 + i * bw + bw - 3, y1), outline=GREY, width=2 * S)
                d.rectangle(p(x0 + i * bw + 5, y1 - hc, x0 + i * bw + bw - 8, y1), fill=AMBER if psi > 0.1 else TEAL)
            d.line(p(x0, y1, x0 + bins * bw, y1), fill=GREY, width=S)
            text(d, (x0 + bins * bw / 2, y1 + 16), "Kundenalter (Klassen)", 11, False, MUTED, "mm")
            d.rectangle(p(x0, 60, x0 + 14, 74), outline=GREY, width=2 * S); text(d, (x0 + 20, 67), "Trainingsdaten", 11, False, MUTED, "lm")
            d.rectangle(p(x0 + 140, 60, x0 + 154, 74), fill=TEAL); text(d, (x0 + 160, 67), "aktueller Monat", 11, False, MUTED, "lm")
            tx = 420
            text(d, (tx, 80), f"Monat: {m}", 18, True, INK)
            text(d, (tx, 120), "PSI (Stabilitätsindex)", 12, False, MUTED)
            col = TEAL if psi < 0.1 else (AMBER if psi < 0.25 else CORAL)
            text(d, (tx, 150), de(psi, 2), 30, True, col, "lm")
            status = "stabil" if psi < 0.1 else ("beobachten" if psi < 0.25 else "deutlicher Drift – handeln!")
            text(d, (tx, 190), status, 13, True, col)
            text(d, (tx, 240), "< 0,10 stabil", 11, False, MUTED)
            text(d, (tx, 258), "0,10 – 0,25 beobachten", 11, False, MUTED)
            text(d, (tx, 276), "> 0,25 deutlicher Drift", 11, False, MUTED)
            frames.append(finish(img)); durs.append(80)
        durs[-1] = 1000
    durs[-1] = 3200
    save(frames, OUT / "data-drift.gif", durs)


# 6 Concept Drift und Nachtraining ------------------------------------------------------
def gif_concept_drift():
    rnd = random.Random(5)
    n = 24
    acc = []
    for m in range(n):
        if m < 8:
            a = 0.90 + rnd.gauss(0, 0.008)
        elif m < 15:
            a = 0.90 - (m - 7) * 0.025 + rnd.gauss(0, 0.008)
        else:
            a = 0.89 + rnd.gauss(0, 0.008)
        acc.append(a)
    x0, y0, x1, y1 = 60, 78, 600, 290
    X = lambda m: x0 + m / (n - 1) * (x1 - x0)
    Y = lambda a: y1 - (a - 0.6) / 0.35 * (y1 - y0)
    frames, durs = [], []
    for k in range(2, n + 1):
        img, d = canvas()
        text(d, (24, 26), "Concept Drift: Die Welt ändert sich – das Modell wird schlechter", 15, True, INK)
        for v in (0.7, 0.8, 0.9):
            d.line(p(x0, Y(v), x1, Y(v)), fill=GRID, width=S)
            text(d, (x0 - 6, Y(v)), de(v, 1), 10, False, MUTED, "rm")
        d.line(p(x0, Y(0.8), x1, Y(0.8)), fill=CORAL_L, width=2 * S)
        text(d, (x1, Y(0.8) - 10), "Alarmschwelle", 10, True, CORAL, "rm")
        pts = [p(X(m), Y(acc[m])) for m in range(k)]
        d.line(pts, fill=TEAL, width=3 * S)
        for m in range(k):
            c = CORAL if acc[m] < 0.8 else TEAL
            d.ellipse(p(X(m) - 4, Y(acc[m]) - 4, X(m) + 4, Y(acc[m]) + 4), fill=c)
        text(d, ((x0 + x1) / 2, y1 + 18), "Monate im Einsatz", 11, False, MUTED, "mm")
        text(d, (x0, y0 - 14), "Genauigkeit (sobald echte Ergebnisse vorliegen)", 11, False, MUTED, "lm")
        if k > 8:
            d.line(p(X(8), y0, X(8), y1), fill=AMBER_L, width=S)
            text(d, (X(8) + 4, y0 + 8), "Betrüger ändern ihre Masche", 10, True, AMBER, "lm")
        if k > 14:
            d.line(p(X(14), y0, X(14), y1), fill=VIOLET, width=2 * S)
            text(d, (X(14) + 4, y0 + 26), "Alarm → neu trainiert (v2)", 10, True, VIOLET, "lm")
        if k == n:
            text(d, (24, 330), "Gleiche Eingaben bedeuten plötzlich etwas anderes. Abhilfe: überwachen, nachtrainieren, neu bewerten.", 12, True, INK)
        frames.append(finish(img)); durs.append(200)
    durs[-1] = 3600
    save(frames, OUT / "concept-drift.gif", durs)


if __name__ == "__main__":
    gif_crisp()
    gif_mlops()
    gif_deployment()
    gif_rollout()
    gif_data_drift()
    gif_concept_drift()
