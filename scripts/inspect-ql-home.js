const fs = require("fs");
const path = require("path");
const file = path.join(process.env.TEMP || "/tmp", "ql-home.html");
const c = fs.readFileSync(file, "utf8");
const urls = [
  ...c.matchAll(/https?:\/\/[a-zA-Z0-9._-]+(?:\.azurewebsites\.net|\.quickload\.com)[^"'\\s]*/g),
].map((x) => x[0]);
console.log("URLS:\n" + [...new Set(urls)].join("\n"));
for (const name of ["SendFTLQuote", "SendQuote", "getftlquote", "shipperapi", "apiBase", "API_URL"]) {
  const i = c.indexOf(name);
  console.log("\n---", name, "idx", i, "---");
  if (i >= 0) console.log(c.slice(Math.max(0, i - 100), i + 1500));
}
