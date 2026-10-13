// Saves the print version of a page (/cv, /rider) as a one-page A4 PDF.
// Usage: node page-pdf.mjs <url> <output.pdf>
import puppeteer from "puppeteer-core";

const [url, out] = process.argv.slice(2);
const A4 = { width: 794, height: 1123 }; // CSS pixels at 96 dpi

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport(A4);
await page.emulateMediaType("print");
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

// Always one page: if the page grows taller than A4, shrink it until it fits.
const height = await page.evaluate(() => document.documentElement.scrollHeight);
const scale = Math.min(1, A4.height / height);
if (scale < 1) {
  await page.evaluate((s, a4) => {
    const body = document.body;
    body.style.width = `${a4.width / s}px`;
    body.style.height = `${a4.height / s}px`;
    body.style.transformOrigin = "0 0";
    body.style.transform = `scale(${s})`;
    document.documentElement.style.overflow = "hidden";
  }, scale, A4);
}

await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, pageRanges: "1" });
console.log(`${out}: content ${height}px tall, scale ${scale.toFixed(3)}`);
await browser.close();
