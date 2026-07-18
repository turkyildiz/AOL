const fs = require("fs");
const path = require("path");

async function main() {
  const res = await fetch("https://www.airoceanlogistics.us/quote");
  const html = await res.text();
  console.log("status", res.status, "len", html.length);
  const scripts = [...html.matchAll(/src="(\/_next\/[^"]+\.js)"/g)].map((m) => m[1]);
  console.log("scripts", scripts.length, scripts.slice(0, 8));

  let actionIds = [];
  for (const s of scripts) {
    const js = await fetch("https://www.airoceanlogistics.us" + s).then((r) => r.text());
    if (js.includes("createServerReference") || js.includes("QuickLoad") || js.includes("not connected")) {
      console.log("interesting chunk", s, "len", js.length);
      const ids = [
        ...js.matchAll(/createServerReference\("([^"]+)"/g),
        ...js.matchAll(/createServerReference\)\("([^"]+)"/g),
        ...js.matchAll(/\("([a-f0-9]{40,})"\s*,\s*"/g),
      ].map((m) => m[1]);
      actionIds.push(...ids);
      if (js.includes("not connected yet")) console.log("has not-connected string");
      if (js.includes("Getting price")) console.log("has Getting price");
      if (js.includes("bestPrice")) console.log("has bestPrice");
    }
  }
  actionIds = [...new Set(actionIds)];
  console.log("actionIds", actionIds);

  // Try each action id
  const pickup = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
  for (const id of actionIds.slice(0, 5)) {
    const fd = new FormData();
    fd.set("1_mode", "FTL");
    // Next actions often use indexed fields - try plain too
    const fd2 = new FormData();
    [
      ["mode", "FTL"],
      ["originCity", "Chicago"],
      ["originState", "IL"],
      ["originZip", "60601"],
      ["destCity", "Dallas"],
      ["destState", "TX"],
      ["destZip", "75201"],
      ["pickupDate", pickup],
      ["equipment", "Dry Van"],
      ["name", "Check"],
      ["email", "check@test.com"],
    ].forEach(([k, v]) => fd2.set(k, v));

    const r = await fetch("https://www.airoceanlogistics.us/quote", {
      method: "POST",
      headers: {
        "Next-Action": id,
        Accept: "text/x-component",
      },
      body: fd2,
    });
    const t = await r.text();
    console.log("\naction", id.slice(0, 16), "status", r.status);
    console.log(t.slice(0, 500));
    if (/3630|3874|bestPrice|totalAmount|ok.:true|"ok":true/.test(t)) {
      console.log(">>> PRICING WORKS ON PRODUCTION");
    }
    if (/not connected|not configured|QUICKLOAD/.test(t)) {
      console.log(">>> ENV ISSUE:", t.match(/[^\n]{0,80}not connected[^\n]{0,80}|[^\n]{0,80}not configured[^\n]{0,80}/)?.[0]);
    }
  }

  // Also try without action id - multi form field next action from html
  const bound = html.match(/\$ACTION_ID_([a-zA-Z0-9_-]+)/);
  console.log("ACTION_ID html", bound && bound[1]);
}

main().catch(console.error);
