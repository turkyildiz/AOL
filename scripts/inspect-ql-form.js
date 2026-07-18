const fs = require("fs");
const path = require("path");
const c = fs.readFileSync(path.join(process.env.TEMP || "/tmp", "ql-home.html"), "utf8");
// Extract form IDs and labels near Quick Quote
const i = c.indexOf("Quick");
const j = c.indexOf("btnGetQuote");
console.log(c.slice(Math.max(0, i - 200), Math.min(c.length, j + 500)));
console.log("\n\n=== partial form fields ===");
for (const id of [
  "pickup-full",
  "dropoff-full",
  "date-full",
  "truckType-full",
  "unitType-full",
  "unit-full",
  "weight-full",
  "width",
  "length",
  "height",
  "pickup-partial",
  "dropoff-partial",
]) {
  const idx = c.indexOf(`id="${id}"`);
  if (idx > 0) console.log(id, "=>", c.slice(idx - 80, idx + 200).replace(/\s+/g, " "));
}
