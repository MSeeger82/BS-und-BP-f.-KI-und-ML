// Prüft die Prüfungsbögen von Modul 13: Aufruf  node tools/pruefe_pruefungen.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const dir = path.join(__dirname, "..", "kurs", "modul-13", "daten");
const ctx = { window: {} };
ctx.window.PRUEFUNGEN = [];
ctx.PB = {
  z: (id, label, punkte, wert, tol, einheit, alt) => ({ id, label, typ: "zahl", punkte, wert, tol: tol || 0, einheit, alt }),
  w: (id, label, punkte, optionen, richtig) => ({ id, label, typ: "wahl", punkte, optionen, richtig }),
  t: (id, label, punkte, erwartung) => ({ id, label, typ: "text", punkte, erwartung })
};
vm.createContext(ctx);
let fehler = 0;
const files = fs.readdirSync(dir).filter(f => /^satz-\d+\.js$/.test(f)).sort();
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f }); }
  catch (e) { console.log(f + ": Syntax/Laufzeitfehler: " + e.message); fehler++; }
}
const ids = new Set();
for (const b of ctx.window.PRUEFUNGEN) {
  const p = (m) => { console.log(b.id + ": " + m); fehler++; };
  if (ids.has(b.id)) p("doppelte ID"); ids.add(b.id);
  if (b.id !== "s" + String(b.satz).padStart(2, "0") + "t" + b.teil) p("ID passt nicht zu Satz/Teil");
  if (b.minuten !== (b.teil === 1 ? 60 : 120)) p("Minuten falsch");
  if (b.teil === 2 && !b.situation) p("Situation fehlt");
  let sum = 0;
  b.aufgaben.forEach((a, i) => {
    if (!a.titel || a.loesung === undefined || !a.loesung) p("Aufgabe " + (i + 1) + ": Titel oder Lösung fehlt");
    const tids = new Set();
    a.teile.forEach(t => {
      if (tids.has(t.id)) p("Aufgabe " + (i + 1) + ": doppelte Teil-ID " + t.id); tids.add(t.id);
      if (!(t.punkte > 0)) p("Aufgabe " + (i + 1) + "/" + t.id + ": Punkte fehlen");
      if (t.typ === "wahl" && !(t.richtig >= 0 && t.richtig < t.optionen.length)) p("Aufgabe " + (i + 1) + "/" + t.id + ": richtig-Index ungültig");
      if (t.typ === "zahl" && typeof t.wert !== "number") p("Aufgabe " + (i + 1) + "/" + t.id + ": Wert fehlt");
      if (t.typ === "text" && !t.erwartung) p("Aufgabe " + (i + 1) + "/" + t.id + ": Erwartung fehlt");
      sum += t.punkte;
    });
  });
  if (Math.abs(sum - 100) > 1e-9) p("Punktsumme " + sum + " statt 100");
  console.log(b.id + ": " + b.aufgaben.length + " Aufgaben, " + sum + " Punkte");
}
console.log(ctx.window.PRUEFUNGEN.length + " Bögen, " + (fehler ? fehler + " Fehler" : "OK"));
process.exit(fehler ? 1 : 0);
