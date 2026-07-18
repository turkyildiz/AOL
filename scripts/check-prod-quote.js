const fs = require("fs");
const path = require("path");
const tmp = process.env.TEMP || "/tmp";

async function main() {
  const home = await fetch("https://www.airoceanlogistics.us/", {
    redirect: "follow",
  }).then((r) => r.text());
  const quote = await fetch("https://www.airoceanlogistics.us/quote", {
    redirect: "follow",
  }).then((r) => r.text());

  console.log("=== LIVE SITE ===");
  console.log("home has Quick Quote:", /Quick/.test(home) && /Quote/.test(home));
  console.log("home has Full Truck:", /Full Truck/.test(home));
  console.log("home has hero-truck:", /hero-truck/.test(home));
  console.log("quote has originZip:", /originZip/.test(quote));
  console.log("quote has Live quote:", /Live quote/.test(quote));

  // Find JS chunks
  const scripts = [
    ...quote.matchAll(/\/_next\/static\/[^"'\\s]+\.js/g),
  ].map((m) => m[0]);
  const unique = [...new Set(scripts)];
  console.log("js chunks", unique.length);

  let actionId = null;
  for (const s of unique) {
    const js = await fetch("https://www.airoceanlogistics.us" + s).then((r) =>
      r.text(),
    );
    if (
      js.includes("getInstantQuickloadQuote") ||
      js.includes("not connected yet") ||
      js.includes("Getting price") ||
      js.includes("createServerReference")
    ) {
      const refs = [
        ...js.matchAll(/createServerReference\)\("([^"]+)"/g),
      ].map((m) => m[1]);
      const refs2 = [
        ...js.matchAll(/createServerReference\("([^"]+)"/g),
      ].map((m) => m[1]);
      const all = [...refs, ...refs2];
      if (all.length) {
        console.log("chunk", s, "refs", all.slice(0, 8));
        actionId = all[0];
      }
      if (js.includes("not connected yet")) {
        console.log("client contains 'not connected yet' string");
      }
    }
  }

  // Call QuickLoad with env from .env.local to confirm pricing still works
  const envPath = path.join(process.cwd(), ".env.local");
  const env = Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i), l.slice(i + 1)];
      }),
  );
  const base =
    env.QUICKLOAD_API_BASE_URL || "https://shipperapi.azurewebsites.net";
  const body = new URLSearchParams({
    Email: env.QUICKLOAD_EMAIL,
    Password: env.QUICKLOAD_PASSWORD,
    RememberMe: "true",
  });
  const auth = await fetch(base + "/api/v1/account/token?api-version=1.0", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const aj = await auth.json();
  const token = aj.token || aj.data?.token;
  console.log("\n=== QUICKLOAD API ===");
  console.log("auth", auth.status, !!token);

  const pickup = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
  const r = await fetch(base + "/api/v1/quote/getftlquote?api-version=1.0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      quotePrimusRequest: {
        originCity: "Chicago",
        originState: "IL",
        originZipcode: "60601",
        originCountry: "US",
        destinationCity: "Dallas",
        destinationState: "TX",
        destinationZipcode: "75201",
        destinationCountry: "US",
        uOM: "US",
        pickupDate: pickup,
        equipment: "Van",
        accessorials: [],
        freightInfo: null,
        isFTL: true,
      },
      accessorialTypeIds: [],
      shipmentTypeId: 1,
      truckTypeId: 1,
    }),
  });
  const j = await r.json();
  const rates = Array.isArray(j) ? j : j.data || [];
  console.log("ftl", r.status, "rates", rates.length);
  if (rates[0]) {
    console.log(
      "best",
      rates[0].totalAmount,
      rates[0].serviceLevel,
      rates[0].transitDays + "d",
    );
  }

  // If we found an action id, try invoking production server action
  if (actionId) {
    console.log("\n=== PROD SERVER ACTION ===", actionId);
    const fd = new FormData();
    fd.set("mode", "FTL");
    fd.set("originCity", "Chicago");
    fd.set("originState", "IL");
    fd.set("originZip", "60601");
    fd.set("destCity", "Dallas");
    fd.set("destState", "TX");
    fd.set("destZip", "75201");
    fd.set("pickupDate", pickup);
    fd.set("equipment", "Dry Van");
    fd.set("name", "Prod Check");
    fd.set("email", "check@test.com");

    const res = await fetch("https://www.airoceanlogistics.us/quote", {
      method: "POST",
      headers: {
        "Next-Action": actionId,
        Accept: "text/x-component",
      },
      body: fd,
    });
    const text = await res.text();
    console.log("action status", res.status);
    console.log("action body sample", text.slice(0, 800));
    if (text.includes("3630") || text.includes("bestPrice") || text.includes("totalAmount")) {
      console.log("PRICING LIKELY WORKING ON PROD");
    }
    if (text.includes("not connected") || text.includes("not configured")) {
      console.log("ENV MISSING ON PROD");
    }
  } else {
    console.log("\n(No server action id found in bundles for direct prod invoke)");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
