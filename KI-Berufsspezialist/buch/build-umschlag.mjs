// Umschlag für den Druck (Taschenbuch, z. B. Amazon KDP): Rückseite + Rücken + Vorderseite in einer PDF.
//   node build-umschlag.mjs <Seitenzahl-Innenteil> [weiss|creme]
import { createRequire } from "node:module";
import { writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const require = createRequire("d:/IT Konsultant/VS Studio/itundx/package.json");
const { chromium } = require("playwright-core");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const pages = Number(process.argv[2]); const paper = process.argv[3] === "creme" ? "creme" : "weiss";
if (!pages) { console.error("Seitenzahl fehlt"); process.exit(1); }
const mm = (inch) => inch * 25.4;
const spine = +(mm(pages * (paper === "creme" ? 0.0025 : 0.002252))).toFixed(2); // KDP: Papierstärke je Seite
const BL = 3.175, W = 170, H = 240;
const totalW = +(BL + W + spine + W + BL).toFixed(2), totalH = +(H + 2 * BL).toFixed(2);
const klapp = readFileSync(path.join(HERE, "VERLAG.md"), "utf8").match(/## Klappentext\r?\n([\s\S]*?)\r?\n## /)?.[1].trim().split(/\r?\n\r?\n/).map((p) => `<p>${p.replace(/\n/g, " ")}</p>`).join("") ?? "";
const FONT = pathToFileURL("d:/IT Konsultant/VS Studio/itundx/node_modules/@fontsource-variable").href;
const html = `<!doctype html><html lang="de"><meta charset="utf-8"><style>
@font-face{font-family:SS;src:url("${FONT}/source-sans-3/files/source-sans-3-latin-wght-normal.woff2");font-weight:200 900}
@font-face{font-family:BR;src:url("${FONT}/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2");font-weight:200 800}
@page{size:${totalW}mm ${totalH}mm;margin:0}*{box-sizing:border-box}body{margin:0;width:${totalW}mm;height:${totalH}mm;background:#0d2a27;color:#f3faf8;font-family:SS,Arial,sans-serif;position:relative;overflow:hidden}
.back{position:absolute;left:${BL}mm;top:${BL}mm;width:${W}mm;height:${H}mm;padding:22mm 18mm}.back h2{font-family:BR;font-size:15pt;margin:0 0 5mm;color:#7ee0cf}.back p{font-size:10.5pt;line-height:1.45;margin:0 0 3mm;color:#e3f4f0}.bc{position:absolute;right:15mm;bottom:15mm;width:51mm;height:31mm;background:#fff}
.spine{position:absolute;left:${BL + W}mm;top:${BL}mm;width:${spine}mm;height:${H}mm;display:flex;align-items:center;justify-content:center}.spine span{writing-mode:vertical-rl;font-family:BR;font-weight:700;font-size:${Math.min(16, spine * 0.4).toFixed(1)}pt;white-space:nowrap}
.front{position:absolute;left:${BL + W + spine}mm;top:${BL}mm;width:${W}mm;height:${H}mm;padding:26mm 20mm;display:flex;flex-direction:column;justify-content:space-between}.k{font-family:BR;letter-spacing:.14em;text-transform:uppercase;font-size:9pt;color:#7ee0cf}.front h1{font-family:BR;font-size:34pt;line-height:1.1;margin:8mm 0 4mm;color:#fff}.sub{font-size:13pt;color:#cfe9e4;max-width:120mm;line-height:1.35}.bars{display:flex;gap:3mm;margin-top:10mm}.bars i{display:block;height:3mm;flex:1;border-radius:2mm}.foot{font-size:10pt;color:#9fd4c9;border-top:1px solid #2c5a53;padding-top:5mm}
</style><body><div class="back"><h2>Sicher durch die IHK-Prüfung</h2>${klapp}<div class="bc"></div></div>
<div class="spine"><span>Berufsspezialist/in KI und ML · Michael Seeger</span></div>
<div class="front"><div><div class="k">IHK-Prüfung · DQR 5</div><h1>Berufsspezialist/in<br>Künstliche Intelligenz<br>und Maschinelles Lernen</h1><div class="sub">Der Lehrfaden für Einsteiger – vom ersten Begriff bis zur bestandenen Prüfung</div><div class="bars"><i style="background:#0f766e"></i><i style="background:#b45f06"></i><i style="background:#5a4bb0"></i><i style="background:#c33f4b"></i></div></div><div class="foot">Michael Seeger · mit Online-Kurs und Probeprüfungen auf itundx.de</div></div></body></html>`;
const f = path.join(HERE, "umschlag.html"); writeFileSync(f, html);
const browser = await chromium.launch({ channel: "msedge" }).catch(() => chromium.launch({ channel: "chrome" }));
const pg = await (await browser.newContext()).newPage(); await pg.goto(pathToFileURL(f).href); await pg.evaluate(() => document.fonts.ready);
const out = path.join(HERE, "Berufsspezialist-KI-ML-Lehrfaden-Umschlag-Druck.pdf");
await pg.pdf({ path: out, width: `${totalW}mm`, height: `${totalH}mm`, printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
await browser.close();
console.log(`Umschlag: ${totalW} x ${totalH} mm, Rücken ${spine} mm (${pages} Seiten, Papier ${paper}) -> ${out}`);
