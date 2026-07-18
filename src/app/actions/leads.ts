"use server";

import { formatLeadEmail, notifyDispatch } from "@/lib/email/dispatch";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { contactLeadSchema, quoteRequestSchema } from "@/lib/validations/leads";

export type LeadActionResult =
  | { ok: true }
  | { ok: false; error: string };

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitContactLead(formData: FormData): Promise<LeadActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "Form storage is not configured yet. Please email ops@airoceanlogistics.us or call us.",
    };
  }

  const parsed = contactLeadSchema.safeParse({
    name: formString(formData, "name"),
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    company: formString(formData, "company"),
    message: formString(formData, "message"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      company: parsed.data.company ?? null,
      message: parsed.data.message,
      source: "contact",
    });

    if (error) {
      console.error("[submitContactLead]", error.message);
      return { ok: false, error: "Could not save your message. Please try again or call us." };
    }

    try {
      const mail = await notifyDispatch(
        formatLeadEmail({
          kind: "contact",
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          company: parsed.data.company,
          message: parsed.data.message,
        }),
      );
      if (!mail.ok) console.error("[submitContactLead] dispatch email failed:", mail.error);
    } catch (mailErr) {
      console.error("[submitContactLead] dispatch email error", mailErr);
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitContactLead]", err);
    return { ok: false, error: "Could not save your message. Please try again or call us." };
  }
}

export async function submitQuoteRequest(formData: FormData): Promise<LeadActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "Form storage is not configured yet. Please email ops@airoceanlogistics.us or call us.",
    };
  }

  const parsed = quoteRequestSchema.safeParse({
    name: formString(formData, "name"),
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    company: formString(formData, "company"),
    mode: formString(formData, "mode"),
    equipment: formString(formData, "equipment"),
    origin: formString(formData, "origin"),
    destination: formString(formData, "destination"),
    readyDate: formString(formData, "readyDate"),
    weight: formString(formData, "weight"),
    cargo: formString(formData, "cargo"),
    message: formString(formData, "message"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const readyDate =
    parsed.data.readyDate && /^\d{4}-\d{2}-\d{2}$/.test(parsed.data.readyDate)
      ? parsed.data.readyDate
      : null;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("quote_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      company: parsed.data.company ?? null,
      mode: parsed.data.mode ?? null,
      equipment: parsed.data.equipment ?? null,
      origin: parsed.data.origin,
      destination: parsed.data.destination,
      ready_date: readyDate,
      weight: parsed.data.weight ?? null,
      cargo: parsed.data.cargo ?? null,
      message: parsed.data.message ?? null,
      status: "new",
    });

    if (error) {
      console.error("[submitQuoteRequest]", error.message);
      return { ok: false, error: "Could not save your quote. Please try again or call us." };
    }

    try {
      const mail = await notifyDispatch(
        formatLeadEmail({
          kind: "quote",
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          company: parsed.data.company,
          message: parsed.data.message,
          origin: parsed.data.origin,
          destination: parsed.data.destination,
          mode: parsed.data.mode,
          equipment: parsed.data.equipment,
          readyDate: parsed.data.readyDate,
          weight: parsed.data.weight,
          cargo: parsed.data.cargo,
        }),
      );
      if (!mail.ok) console.error("[submitQuoteRequest] dispatch email failed:", mail.error);
    } catch (mailErr) {
      console.error("[submitQuoteRequest] dispatch email error", mailErr);
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitQuoteRequest]", err);
    return { ok: false, error: "Could not save your quote. Please try again or call us." };
  }
}
