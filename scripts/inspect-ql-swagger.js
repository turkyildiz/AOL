const fs = require("fs");
const path = require("path");
const file = path.join(process.env.TEMP || "/tmp", "ql-v1.json");
const j = JSON.parse(fs.readFileSync(file, "utf8"));

const interesting = [
  "/api/v1/account/token",
  "/api/v1/quote/getftlquote",
  "/api/v1/quote/getltlquote",
  "/api/v1/quote/getqlquote",
  "/api/v1/quote/saveftlquote",
  "/api/v1/quote/saveltlquote",
  "/api/v1/external/container/quote",
];

function resolveRef(ref) {
  if (!ref) return null;
  const parts = ref.replace("#/", "").split("/");
  let x = j;
  for (const k of parts) x = x[k];
  return x;
}

function expandSchema(s, depth = 0) {
  if (!s || depth > 5) return s;
  if (s.$ref) return expandSchema(resolveRef(s.$ref), depth + 1);
  if (s.schema) return expandSchema(s.schema, depth);
  if (s.allOf) {
    const merged = { type: "object", properties: {}, required: [] };
    for (const part of s.allOf) {
      const e = expandSchema(part, depth + 1);
      if (e && e.properties) Object.assign(merged.properties, e.properties);
      if (e && e.required) merged.required.push(...e.required);
    }
    return merged;
  }
  if (s.properties) {
    const out = { type: s.type || "object", required: s.required, properties: {} };
    for (const [k, v] of Object.entries(s.properties)) {
      out.properties[k] = expandSchema(v, depth + 1);
    }
    return out;
  }
  if (s.items) return { type: "array", items: expandSchema(s.items, depth + 1) };
  return {
    type: s.type,
    format: s.format,
    enum: s.enum,
    description: s.description,
    example: s.example,
    nullable: s.nullable,
  };
}

for (const p of interesting) {
  console.log("\n========", p, "========");
  const pathItem = j.paths[p];
  if (!pathItem) {
    console.log("missing");
    continue;
  }
  const op = pathItem.post || pathItem.get;
  let body = null;
  if (op.requestBody && op.requestBody.content) {
    const ct =
      op.requestBody.content["application/json"] ||
      Object.values(op.requestBody.content)[0];
    body = expandSchema(ct.schema);
  } else if (op.parameters) {
    const bp = op.parameters.find((x) => x.in === "body");
    if (bp) body = expandSchema(bp.schema || bp);
  }
  console.log("REQUEST", JSON.stringify(body, null, 2).slice(0, 5000));
  const r = op.responses && (op.responses["200"] || op.responses["201"]);
  if (r) {
    let rs = null;
    if (r.content) {
      const ct = r.content["application/json"] || Object.values(r.content)[0];
      rs = expandSchema(ct.schema);
    } else if (r.schema) rs = expandSchema(r.schema);
    console.log("RESPONSE", JSON.stringify(rs, null, 2).slice(0, 3500));
  }
}

console.log(
  "\nSECURITY",
  JSON.stringify(
    (j.components && j.components.securitySchemes) ||
      j.securityDefinitions ||
      j.security,
    null,
    2,
  ),
);
