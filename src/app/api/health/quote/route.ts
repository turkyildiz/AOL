import { NextResponse } from "next/server";
import { getFtlQuotes, isQuickloadConfigured } from "@/lib/quickload/client";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const configured = isQuickloadConfigured();
  const supabase = isSupabaseConfigured();

  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        quickloadConfigured: false,
        supabaseConfigured: supabase,
        error: "QUICKLOAD_EMAIL / QUICKLOAD_PASSWORD missing on this deployment",
      },
      { status: 503 },
    );
  }

  try {
    const pickupDate = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
    const rates = await getFtlQuotes({
      origin: { city: "Chicago", state: "IL", zipcode: "60601" },
      destination: { city: "Dallas", state: "TX", zipcode: "75201" },
      pickupDate,
      equipment: "Van",
    });

    const best = rates[0]?.totalAmount ?? null;

    return NextResponse.json({
      ok: rates.length > 0,
      quickloadConfigured: true,
      supabaseConfigured: supabase,
      pickupDate,
      rateCount: rates.length,
      bestPrice: best,
      sample: rates.slice(0, 3).map((r) => ({
        totalAmount: r.totalAmount,
        serviceLevel: r.serviceLevel,
        transitDays: r.transitDays,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(
      {
        ok: false,
        quickloadConfigured: true,
        supabaseConfigured: supabase,
        error: message.slice(0, 300),
      },
      { status: 500 },
    );
  }
}
