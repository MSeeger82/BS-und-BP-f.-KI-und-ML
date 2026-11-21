"""Erklär-GIFs für Modul 7: Programmierung und KI-Systementwicklung."""
import math

from gifbase import (W, H, BG, INK, MUTED, GRID, TEAL, TEAL_L, AMBER, AMBER_L, CORAL, CORAL_L, VIOLET, VIOLET_L,
                     SKY, SKY_L, GREY, WHITE, Anim, canvas, p, text, ease, mix, caption, title, box, arrow, axes, cell, de)

NR = 7
CODE_BG = (29, 39, 49)
CODE_FG = (227, 235, 232)


def code(d, x, y, lines, hl=None, w=300):
    d.rounded_rectangle(p(x, y, x + w, y + 24 + len(lines) * 20), radius=8 * 2, fill=CODE_BG)
    for k, ln in enumerate(lines):
        if hl == k:
            d.rectangle(p(x + 4, y + 10 + k * 20, x + w - 4, y + 30 + k * 20), fill=(60, 75, 90))
        text(d, (x + 12, y + 20 + k * 20), ln, 12, False, CODE_FG, "lm")


def schleife():
    """for-Schleife summiert eine Liste; Variablen ändern sich sichtbar."""
    vals = [120, 80, 45, 200]
    a = Anim()
    lines = ["umsaetze = [120, 80, 45, 200]", "summe = 0", "for u in umsaetze:", "    summe = summe + u", "print(summe)"]
    steps = [(0, None, 0), (1, None, 0)]
    s = 0
    for v in vals:
        steps.append((2, v, s))
        s += v
        steps.append((3, v, s))
    steps.append((4, None, s))
    for k, (ln, u, sm) in enumerate(steps):
        for f in range(8):
            img, d = canvas()
            title(d, "Python: Eine Schleife geht eine Liste Schritt für Schritt durch")
            code(d, 24, 60, lines, hl=ln, w=330)
            text(d, (400, 70), "Variablen", 14, True, MUTED)
            box(d, 400, 92, 210, 40, f"u = {u if u is not None else '–'}", SKY, SKY_L, size=14)
            box(d, 400, 142, 210, 40, f"summe = {sm}", TEAL, TEAL_L, size=14)
            if ln == 4:
                text(d, (400, 210), "Ausgabe:", 13, True, MUTED)
                text(d, (400, 234), str(sm), 22, True, INK)
            for j, v in enumerate(vals):
                on = u == v
                cell(d, 24 + j * 66, 200, 60, 32, str(v), fill=AMBER_L if on else WHITE, bold=on, size=13)
            caption(d, "Einrückung bildet den Block, der wiederholt wird")
            a.frame(img, 90)
    a.hold(2600)
    a.save(NR, "schleife.gif")


def dataframe():
    """DataFrame: Zeilen filtern, dann gruppieren und Mittelwert bilden."""
    rows = [("Nord", 34, 120), ("Süd", 52, 80), ("Nord", 41, 200), ("West", 29, 60), ("Süd", 63, 150), ("West", 47, 90)]
    a = Anim()
    for i in range(80):
        img, d = canvas()
        st = 0 if i < 20 else 1 if i < 45 else 2
        title(d, "pandas: filtern und gruppieren")
        cmd = ['df.head()', 'df[df["alter"] > 40]', 'df[df["alter"] > 40].groupby("region")["umsatz"].mean()'][st]
        text(d, (24, 52), cmd, 12, False, VIOLET)
        cols = ["region", "alter", "umsatz"]
        for j, c in enumerate(cols):
            cell(d, 24 + j * 90, 80, 90, 26, c, fill=TEAL_L, bold=True, size=12)
        for r, (reg, alt, ums) in enumerate(rows):
            keep = alt > 40
            fill = WHITE if st == 0 else (AMBER_L if keep else (240, 240, 240))
            col = INK if (st == 0 or keep) else GREY
            for j, v in enumerate((reg, alt, ums)):
                cell(d, 24 + j * 90, 106 + r * 26, 90, 26, str(v), fill=fill, col=col, size=12)
        if st == 2:
            res = {}
            for reg, alt, ums in rows:
                if alt > 40:
                    res.setdefault(reg, []).append(ums)
            arrow(d, 300, 180, 360, 180, GREY)
            cell(d, 370, 120, 110, 26, "region", fill=AMBER_L, bold=True, size=12)
            cell(d, 480, 120, 110, 26, "Ø umsatz", fill=AMBER_L, bold=True, size=12)
            for k, (reg, v) in enumerate(sorted(res.items())):
                cell(d, 370, 146 + k * 26, 110, 26, reg, size=12)
                cell(d, 480, 146 + k * 26, 110, 26, de(sum(v) / len(v), 0), size=12)
        caption(d, "Wie SQL: WHERE = Filter, GROUP BY = groupby")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "dataframe.gif")


def pipeline():
    """scikit-learn-Pipeline: fit auf Training lernt Median/Skalierung/Modell; Test wird nur transformiert."""
    a = Anim()
    stages = [("SimpleImputer", "Median füllen", SKY, SKY_L), ("StandardScaler", "μ und σ", VIOLET, VIOLET_L), ("LogisticRegression", "Gewichte", AMBER, AMBER_L)]
    for i in range(90):
        img, d = canvas()
        title(d, "Pipeline: Vorverarbeitung und Modell als ein Baustein")
        for k, (n, s, c, cl) in enumerate(stages):
            box(d, 150 + k * 160, 130, 140, 60, n, c, cl, s, size=12)
            if k:
                arrow(d, 150 + k * 160 - 18, 160, 150 + k * 160 - 4, 160, GREY)
        phase = 0 if i < 45 else 1
        t = ((i % 45) / 44)
        if phase == 0:
            box(d, 20, 60, 110, 40, "X_train", TEAL, TEAL_L, size=13)
            x = 70 + t * 480
            d.ellipse(p(x - 9, 151, x + 9, 169), fill=TEAL)
            k = min(2, int(t * 3))
            text(d, (320, 230), ".fit(X_train, y_train)", 15, True, TEAL, "mm")
            text(d, (320, 254), "lernt Median, μ, σ und Gewichte – nur aus den Trainingsdaten", 12, False, INK, "mm")
        else:
            box(d, 20, 230, 110, 40, "X_test", CORAL, CORAL_L, size=13)
            x = 70 + t * 480
            d.ellipse(p(x - 9, 151, x + 9, 169), fill=CORAL)
            text(d, (320, 230), ".predict(X_test)", 15, True, CORAL, "mm")
            text(d, (320, 254), "wendet das Gelernte nur an – kein Leck aus den Testdaten", 12, False, INK, "mm")
        caption(d, "Dieselbe Pipeline wird später im Betrieb genutzt – identische Vorverarbeitung")
        a.frame(img, 80)
    a.hold(2600)
    a.save(NR, "pipeline.gif")


def architektur():
    """Bausteine eines KI-Systems mit Daten- und Rückkopplungsfluss."""
    comps = [(24, 80, "Datenquellen", "ERP, Sensoren", SKY, SKY_L), (184, 80, "Datenpipeline", "prüfen, aufbereiten", VIOLET, VIOLET_L),
             (344, 80, "Modell-Service", "REST-API, Version 3", AMBER, AMBER_L), (504, 80, "Anwendung", "Oberfläche, Prozess", TEAL, TEAL_L),
             (184, 230, "Modellregister", "Versionen, Metriken", GREY, WHITE), (344, 230, "Monitoring", "Güte, Drift, Kosten", CORAL, CORAL_L),
             (504, 230, "Mensch", "prüft, gibt Feedback", TEAL, TEAL_L)]
    a = Anim()
    for i in range(90):
        img, d = canvas()
        title(d, "Vom Modell zum KI-System")
        n = min(len(comps), i // 9 + 1)
        for k in range(n):
            x, y, nme, sub, c, cl = comps[k]
            box(d, x, y, 130, 64, nme, c, cl, sub, size=13)
        if n >= 2: arrow(d, 156, 112, 182, 112, GREY)
        if n >= 3: arrow(d, 316, 112, 342, 112, GREY)
        if n >= 4: arrow(d, 476, 112, 502, 112, GREY)
        if n >= 5: arrow(d, 249, 228, 375, 146, GREY)
        if n >= 6: arrow(d, 409, 146, 409, 228, CORAL)
        if n >= 7:
            arrow(d, 569, 146, 569, 228, TEAL)
            arrow(d, 502, 262, 476, 262, TEAL)
            arrow(d, 342, 262, 316, 262, CORAL)
            text(d, (250, 320), "Rückkopplung: Monitoring und Feedback lösen Neutraining aus", 12, True, CORAL, "mm")
        caption(d, "")
        a.frame(img, 90)
    a.hold(3000)
    a.save(NR, "architektur.gif")


def api():
    """Client schickt JSON per POST, Modell-Service antwortet mit Vorhersage."""
    a = Anim()
    for i in range(70):
        img, d = canvas()
        title(d, "Modell als Dienst: Anfrage und Antwort über eine REST-API")
        box(d, 24, 120, 140, 70, "Anwendung", TEAL, TEAL_L, "z. B. CRM")
        box(d, 476, 120, 140, 70, "Modell-Service", AMBER, AMBER_L, "/api/v1/kuendigung")
        t1 = ease(i / 25)
        t2 = ease((i - 32) / 25)
        code(d, 170, 60, ['POST /api/v1/kuendigung', '{ "laufzeit": 5,', '  "beschwerden": 3 }'], w=210)
        if t1 > 0:
            arrow(d, 166, 140, 166 + 305 * t1, 140, VIOLET, 3)
        if t2 > 0:
            code(d, 260, 220, ['200 OK', '{ "wahrscheinlichkeit": 0.81,', '  "modell": "v3" }'], w=230)
            arrow(d, 474, 175, 474 - 305 * t2, 175, AMBER, 3)
        caption(d, "Schnittstelle versioniert, Antwortzeit und Fehler werden protokolliert")
        a.frame(img, 80)
    a.hold(2800)
    a.save(NR, "api.gif")


def mlops():
    """Kreislauf: Code → Test → Build → Deploy → Monitor → Retrain."""
    steps = [("Code + Daten", "Git, DVC", SKY, SKY_L), ("Tests", "automatisch", VIOLET, VIOLET_L), ("Training", "reproduzierbar", AMBER, AMBER_L),
             ("Registrieren", "Version, Metriken", GREY, WHITE), ("Ausrollen", "CI/CD, schrittweise", TEAL, TEAL_L), ("Überwachen", "Güte, Drift", CORAL, CORAL_L)]
    cx, cy, R = 320, 200, 120
    a = Anim()
    for i in range(6 * 12 + 24):
        img, d = canvas()
        title(d, "MLOps: Modelle zuverlässig bauen, ausrollen und betreiben")
        act = min(5, i // 12)
        for k, (n, s, c, cl) in enumerate(steps):
            ang = -math.pi / 2 + k * 2 * math.pi / 6
            x, y = cx + R * math.cos(ang), cy + R * math.sin(ang)
            on = k <= act
            box(d, x - 66, y - 26, 132, 52, n, c if on else GREY, cl if on else WHITE, s, size=13)
        if i >= 72:
            text(d, (cx, cy), "automatisiert", 13, True, MUTED, "mm")
            text(d, (cx, cy + 18), "und wiederholbar", 13, True, MUTED, "mm")
        caption(d, "Überwachen löst bei Bedarf ein neues Training aus – der Kreis schließt sich")
        a.frame(img, 80)
    a.hold(2800)
    a.save(NR, "mlops.gif")


def agent():
    """Agent: Ziel → Plan → Werkzeug → Beobachtung → … → Antwort, mit Freigabe."""
    a = Anim()
    seq = [("Ziel", "„Liefertermin für Auftrag 4711 klären“", SKY, SKY_L),
           ("Plan", "1. ERP abfragen 2. Spediteur prüfen", VIOLET, VIOLET_L),
           ("Werkzeug", "ERP-Abfrage → Versand am 12.03.", AMBER, AMBER_L),
           ("Werkzeug", "Sendungsverfolgung → Zustellung 14.03.", AMBER, AMBER_L),
           ("Freigabe", "Mail an Kunden? Mensch bestätigt", CORAL, CORAL_L),
           ("Antwort", "Kunde informiert, Vorgang dokumentiert", TEAL, TEAL_L)]
    for i in range(len(seq) * 14 + 20):
        img, d = canvas()
        title(d, "KI-Agent: planen, Werkzeuge nutzen, Ergebnis liefern")
        n = min(len(seq), i // 14 + 1)
        for k in range(n):
            nme, s, c, cl = seq[k]
            y = 56 + k * 46
            box(d, 24, y, 120, 38, nme, c, cl, size=13)
            text(d, (160, y + 19), s, 13, False, INK, "lm")
            if k:
                arrow(d, 84, y - 8, 84, y, GREY)
        caption(d, "Minimale Rechte, Protokoll jedes Schritts, Freigabe vor folgenreichen Aktionen")
        a.frame(img, 90)
    a.hold(2800)
    a.save(NR, "agent.gif")


if __name__ == "__main__":
    schleife()
    dataframe()
    pipeline()
    architektur()
    api()
    mlops()
    agent()
