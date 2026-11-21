import { chromium } from "playwright";
import { pathToFileURL } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "youtube-banner.html");
const outPath = path.join(__dirname, "youtube-banner-2560x1440.png");
const outSafe = path.join(__dirname, "youtube-banner.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 2560, height: 1440 },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
// wait for fonts
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

await page.locator("#banner").screenshot({
  path: outPath,
  type: "png",
  omitBackground: false,
});

fs.copyFileSync(outPath, outSafe);

const stat = fs.statSync(outPath);
const mb = (stat.size / (1024 * 1024)).toFixed(2);
console.log(`Wrote ${outPath}`);
console.log(`Also:  ${outSafe}`);
console.log(`Size: ${mb} MB (${stat.size} bytes)`);

await browser.close();
