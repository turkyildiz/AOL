"use server";

import {
  getFtlQuotes,
  getLtlQuotes,
  getQlQuote,
  isQuickloadConfigured,
  type QuickloadQlQuote,
  type QuickloadRate,
} from "@/lib/quickload/client";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export type InstantQuoteResult =
  | {
      ok: true;
      mode: "FTL" | "Partial";
      qlQuote: QuickloadQlQuote | null;
      rates: QuickloadRate[];
      bestPrice: number | null;
      message?: string;
    }
  | { ok: false; error: string };

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function num(formData: FormData, key: string, fallback = 0): number {
  const n = Number(str(formData, key));
  return Number.isFinite(n) ? n : fallback;
}

function parseLocation(city: string, state: string, zip: string) {
  return {
    city: city || "Unknown",
    state: state.toUpperCase().slice(0, 2),
    zipcode: zip,
    country: "US",
  };
}

/** Map our equipment labels to QuickLoad-ish equipment names */
function mapEquipment(eq: string): string {
  const e = eq.toLowerCase();
  if (e.includes("reefer")) return "Reefer";
  if (e.includes("flat")) return "Flatbed";
  if (e.includes("step")) return "Stepdeck";
  if (e.includes("power")) return "Power Only";
  return "Van";
}

export async function getInstantQuickloadQuote(
  formData: FormData,
): Promise<InstantQuoteResult> {
  if (!isQuickloadConfigured()) {
    return {
      ok: false,
      error:
        "Instant pricing is not connected yet. Add QuickLoad shipper credentials (QUICKLOAD_EMAIL / QUICKLOAD_PASSWORD) on the server, or call ops for a manual quote.",
    };
  }

  const modeRaw = str(formData, "mode"); // FTL | Partial
  const mode: "FTL" | "Partial" = modeRaw === "Partial" ? "Partial" : "FTL";

  const originCity = str(formData, "originCity");
  const originState = str(formData, "originState");
  const originZip = str(formData, "originZip");
  const destCity = str(formData, "destCity");
  const destState = str(formData, "destState");
  const destZip = str(formData, "destZip");
  const pickupDate = str(formData, "pickupDate");
  const equipment = str(formData, "equipment") || "Dry Van";
  const weight = num(formData, "weight", 0);
  const qty = Math.max(1, num(formData, "qty", 1));
  const length = num(formData, "length", 0);
  const width = num(formData, "width", 0);
  const height = num(formData, "height", 0);
  const commodity = str(formData, "commodity") || "General freight";
  const freightClass = num(formData, "freightClass", 70);
  const contactName = str(formData, "name");
  const contactEmail = str(formData, "email");
  const contactPhone = str(formData, "phone");
  const company = str(formData, "company");

  if (!originZip || !destZip || !pickupDate) {
    return { ok: false, error: "Origin ZIP, destination ZIP, and pickup date are required." };
  }
  if (!originState || !destState) {
    return { ok: false, error: "Origin and destination state are required." };
  }

  const origin = parseLocation(originCity, originState, originZip);
  const destination = parseLocation(destCity, destState, destZip);

  try {
    let rates: QuickloadRate[] = [];
    let qlQuote: QuickloadQlQuote | null = null;

    if (mode === "FTL") {
      // Marketplace FTL is the reliable path; QL network quote is optional
      const marketplace = await getFtlQuotes({
        origin,
        destination,
        pickupDate,
        equipment: mapEquipment(equipment),
      });
      rates = marketplace ?? [];

      try {
        qlQuote = await getQlQuote({
          origin,
          destination,
          pickupDate,
          isFTL: true,
          truckType: mapEquipment(equipment),
          freightInfo: null,
        });
      } catch {
        qlQuote = null;
      }
    } else {
      if (weight <= 0) {
        return { ok: false, error: "Weight (lbs) is required for Partial / LTL quotes." };
      }
      const freightInfo = [
        {
          qty,
          weight,
          weightType: "lbs",
          length: length || 48,
          width: width || 40,
          height: height || 48,
          commodity,
          dimType: "in",
          hazmat: 0,
          freightClass: freightClass || 70,
        },
      ];

      const [ql, marketplace] = await Promise.allSettled([
        getQlQuote({
          origin,
          destination,
          pickupDate,
          isFTL: false,
          freightInfo,
        }),
        getLtlQuotes({
          origin,
          destination,
          pickupDate,
          freightInfo,
        }),
      ]);

      if (ql.status === "fulfilled") qlQuote = ql.value;
      if (marketplace.status === "fulfilled") rates = marketplace.value ?? [];
      if (ql.status === "rejected" && marketplace.status === "rejected") {
        throw marketplace.reason ?? ql.reason;
      }
    }

    // Normalize rates: filter invalid, sort by price
    rates = (rates || [])
      .filter((r) => typeof r.totalAmount === "number" && (r.totalAmount as number) > 0)
      .sort((a, b) => (a.totalAmount ?? 0) - (b.totalAmount ?? 0));

    const qlPrice =
      qlQuote && typeof qlQuote.totalAmount === "number" && qlQuote.totalAmount > 0
        ? qlQuote.totalAmount
        : null;
    const bestMarket = rates[0]?.totalAmount ?? null;
    const bestPrice =
      qlPrice != null && bestMarket != null
        ? Math.min(qlPrice, bestMarket)
        : (qlPrice ?? bestMarket);

    // Persist to Supabase when available
    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminClient();
        await supabase.from("quote_requests").insert({
          name: contactName || "Instant quote",
          email: contactEmail || "ops@airoceanlogistics.us",
          phone: contactPhone || null,
          company: company || null,
          mode: mode === "FTL" ? "FTL" : "LTL / Partial",
          equipment,
          origin: `${origin.city}, ${origin.state} ${origin.zipcode}`.trim(),
          destination: `${destination.city}, ${destination.state} ${destination.zipcode}`.trim(),
          ready_date: pickupDate || null,
          weight: weight ? String(weight) : null,
          cargo: commodity,
          message: JSON.stringify({
            source: "quickload_instant",
            bestPrice,
            qlQuote,
            rates: rates.slice(0, 10),
          }),
          status: bestPrice != null ? "quoted" : "new",
        });
      } catch (e) {
        console.error("[getInstantQuickloadQuote] supabase", e);
      }
    }

    if (bestPrice == null && rates.length === 0 && !qlQuote) {
      return {
        ok: false,
        error:
          "QuickLoad returned no rates for this lane. Try different ZIPs/dates, or contact ops for a manual quote.",
      };
    }

    return {
      ok: true,
      mode,
      qlQuote,
      rates: rates.slice(0, 12),
      bestPrice,
      message:
        bestPrice != null
          ? undefined
          : "Rates received but no priced options — contact ops to firm a number.",
    };
  } catch (err) {
    console.error("[getInstantQuickloadQuote]", err);
    const msg = err instanceof Error ? err.message : "Quote failed";
    return {
      ok: false,
      error: `Could not get a QuickLoad price right now. ${msg.includes("auth") ? "Check QuickLoad login credentials. " : ""}You can still call ops for a manual quote.`,
    };
  }
}
