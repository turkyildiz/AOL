"use server";

import { formatTargetRateEmail, notifyDispatch } from "@/lib/email/dispatch";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { targetRateOfferSchema } from "@/lib/validations/leads";

export type TargetRateResult =
  | {
      ok: true;
      status: "hot_target" | "target_submitted";
      gapPct: number | null;
      aggressive: boolean;
      message: string;
    }
  | { ok: false; error: string };

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function formNum(formData: FormData, key: string): number | null {
  const raw = formString(formData, key);
  if (!raw) return null;
  const n = Number(raw.replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function formBool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}

/** ≥ 85% of market = realistic / hot for ops */
const HOT_RATIO = 0.85;
/** < 70% of market = aggressive — still accepted, soft-flagged */
const AGGRESSIVE_RATIO = 0.7;

export async function submitTargetRate(formData: FormData): Promise<TargetRateResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "Could not save your target. Email ops@airoceanlogistics.us or call us.",
    };
  }

  const marketBest = formNum(formData, "marketBest");
  const targetRate = formNum(formData, "targetRate");

  const parsed = targetRateOfferSchema.safeParse({
    name: formString(formData, "name") || undefined,
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    company: formString(formData, "company") || undefined,
    targetRate: targetRate ?? undefined,
    marketBest: marketBest,
    mode: formString(formData, "mode") || undefined,
    equipment: formString(formData, "equipment") || undefined,
    origin: formString(formData, "origin"),
    destination: formString(formData, "destination"),
    readyDate: formString(formData, "readyDate") || undefined,
    weight: formString(formData, "weight") || undefined,
    cargo: formString(formData, "cargo") || undefined,
    flexiblePickup: formBool(formData, "flexiblePickup"),
    canWait: formBool(formData, "canWait"),
    notes: formString(formData, "notes") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const data = parsed.data;
  const market = data.marketBest ?? null;
  const target = data.targetRate;

  let gapPct: number | null = null;
  let status: "hot_target" | "target_submitted" = "target_submitted";
  let aggressive = false;

  if (market != null && market > 0) {
    gapPct = Math.round(((target - market) / market) * 1000) / 10; // e.g. -11.8
    const ratio = target / market;
    if (ratio >= HOT_RATIO) status = "hot_target";
    if (ratio < AGGRESSIVE_RATIO) aggressive = true;
  }

  const readyDate =
    data.readyDate && /^\d{4}-\d{2}-\d{2}$/.test(data.readyDate) ? data.readyDate : null;

  const payload = {
    source: "target_rate_offer",
    marketBest: market,
    targetRate: target,
    gapPct,
    aggressive,
    flexiblePickup: data.flexiblePickup ?? false,
    canWait: data.canWait ?? false,
    notes: data.notes ?? null,
  };

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("quote_requests").insert({
      name: data.name || "Target rate offer",
      email: data.email,
      phone: data.phone,
      company: data.company ?? null,
      mode: data.mode ?? null,
      equipment: data.equipment ?? null,
      origin: data.origin,
      destination: data.destination,
      ready_date: readyDate,
      weight: data.weight ?? null,
      cargo: data.cargo ?? null,
      message: JSON.stringify(payload),
      status,
    });

    if (error) {
      console.error("[submitTargetRate]", error.message);
      return {
        ok: false,
        error: "Could not save your target. Please try again or call ops.",
      };
    }

    // Await so serverless doesn't freeze before the mail leaves (still don't fail the shipper)
    try {
      const mail = await notifyDispatch(
        formatTargetRateEmail({
          status,
          aggressive,
          gapPct,
          marketBest: market,
          targetRate: target,
          origin: data.origin,
          destination: data.destination,
          mode: data.mode,
          equipment: data.equipment,
          readyDate: data.readyDate,
          weight: data.weight,
          cargo: data.cargo,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          flexiblePickup: data.flexiblePickup,
          canWait: data.canWait,
          notes: data.notes,
        }),
      );
      if (!mail.ok) console.error("[submitTargetRate] dispatch email failed:", mail.error);
      else console.info("[submitTargetRate] dispatch email via", mail.via);
    } catch (mailErr) {
      console.error("[submitTargetRate] dispatch email error", mailErr);
    }

    return {
      ok: true,
      status,
      gapPct,
      aggressive,
      message: aggressive
        ? "Got it — that target is aggressive for this lane. Ops will still review and reach out."
        : status === "hot_target"
          ? "Got it — strong target. Ops will work this load and reach out shortly."
          : "Got it — ops will work this load against capacity and reach out if we can cover it.",
    };
  } catch (err) {
    console.error("[submitTargetRate]", err);
    return {
      ok: false,
      error: "Could not save your target. Please try again or call ops.",
    };
  }
}
