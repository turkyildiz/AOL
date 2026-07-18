/**
 * QuickLoad Shipper API client (server-only).
 * Prod API: https://shipperapi.azurewebsites.net
 */

export type QuickloadRate = {
  rateId?: string | null;
  carrierName?: string | null;
  serviceLevel?: string | null;
  transitDays?: number | null;
  totalAmount?: number | null;
  rateType?: string | null;
  scac?: string | null;
  quoteNumber?: string | null;
  vendorId?: number | null;
};

export type QuickloadQlQuote = {
  quoteId?: number | null;
  shipmentType?: string | null;
  transitDays?: number | null;
  totalAmount?: number | null;
};

export type QuoteLocation = {
  city: string;
  state: string;
  zipcode: string;
  country?: string;
};

export type FreightLine = {
  qty: number;
  weight: number;
  weightType?: string;
  length?: number;
  width?: number;
  height?: number;
  hazmat?: number;
  commodity?: string;
  dimType?: string;
  freightClass?: number;
};

type TokenCache = { token: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

function getBaseUrl(): string {
  return (
    process.env.QUICKLOAD_API_BASE_URL?.replace(/\/$/, "") ||
    "https://shipperapi.azurewebsites.net"
  );
}

export function isQuickloadConfigured(): boolean {
  return Boolean(process.env.QUICKLOAD_EMAIL && process.env.QUICKLOAD_PASSWORD);
}

async function getToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const email = process.env.QUICKLOAD_EMAIL;
  const password = process.env.QUICKLOAD_PASSWORD;
  if (!email || !password) {
    throw new Error("QuickLoad credentials are not configured");
  }

  const body = new URLSearchParams({
    Email: email,
    Password: password,
    RememberMe: "true",
  });

  const res = await fetch(`${getBaseUrl()}/api/v1/account/token?api-version=1.0`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`QuickLoad auth failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { token?: string; data?: { token?: string } };
  const token = data.token || data.data?.token;
  if (!token) {
    throw new Error("QuickLoad auth returned no token");
  }

  tokenCache = { token, expiresAt: Date.now() + 50 * 60_000 };
  return token;
}

async function qlFetch<T>(path: string, body: unknown): Promise<T> {
  const token = await getToken();
  const doFetch = async (tok: string) =>
    fetch(`${getBaseUrl()}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tok}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

  let res = await doFetch(token);
  if (res.status === 401) {
    tokenCache = null;
    res = await doFetch(await getToken());
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`QuickLoad API ${path} failed (${res.status}): ${text.slice(0, 300)}`);
  }

  return (await res.json()) as T;
}

function loc(origin: QuoteLocation, destination: QuoteLocation, pickupDate: string) {
  return {
    originCity: origin.city,
    originState: origin.state,
    originZipcode: origin.zipcode,
    originCountry: origin.country || "US",
    destinationCity: destination.city,
    destinationState: destination.state,
    destinationZipcode: destination.zipcode,
    destinationCountry: destination.country || "US",
    uOM: "US",
    pickupDate,
  };
}

function normalizeRates(data: unknown): QuickloadRate[] {
  const arr = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)
      ? (data as { data: QuickloadRate[] }).data
      : [];
  return (arr as QuickloadRate[])
    .filter((r) => typeof r.totalAmount === "number" && (r.totalAmount as number) > 0)
    .sort((a, b) => (a.totalAmount ?? 0) - (b.totalAmount ?? 0));
}

/**
 * QuickLoad FTL marketplace keys equipment by truckTypeId (not the equipment string).
 * Confirmed against live getftlquote:
 *   1 = Flatbed, 2 = Van, 3 = Reefer
 * Step deck / power-only map to the closest marketplace class.
 */
export function truckTypeIdForEquipment(equipment?: string | null): number {
  const e = (equipment || "Van").toLowerCase();
  if (e.includes("reefer") || e.includes("refriger")) return 3;
  if (e.includes("flat") || e.includes("step") || e.includes("deck") || e.includes("rgn"))
    return 1;
  if (e.includes("power")) return 2; // no dedicated power-only marketplace id — quote as van capacity
  return 2; // Dry Van default
}

export function equipmentLabelForTruckTypeId(id: number): string {
  if (id === 1) return "Flatbed";
  if (id === 3) return "Reefer";
  return "Van";
}

/** Simple FTL quote — truckTypeId drives equipment class on the marketplace */
export async function getFtlQuotes(input: {
  origin: QuoteLocation;
  destination: QuoteLocation;
  pickupDate: string;
  equipment?: string;
  truckTypeId?: number;
}): Promise<QuickloadRate[]> {
  const truckTypeId = input.truckTypeId ?? truckTypeIdForEquipment(input.equipment);
  const equipment = equipmentLabelForTruckTypeId(truckTypeId);

  const data = await qlFetch<unknown>("/api/v1/quote/getftlquote?api-version=1.0", {
    quotePrimusRequest: {
      ...loc(input.origin, input.destination, input.pickupDate),
      equipment,
      accessorials: [],
      freightInfo: null,
      isFTL: true,
    },
    accessorialTypeIds: [],
    shipmentTypeId: 1,
    truckTypeId,
  });
  return normalizeRates(data);
}

export async function getLtlQuotes(input: {
  origin: QuoteLocation;
  destination: QuoteLocation;
  pickupDate: string;
  freightInfo: FreightLine[];
}): Promise<QuickloadRate[]> {
  const data = await qlFetch<unknown>("/api/v1/quote/getltlquote?api-version=1.0", {
    quotePrimusRequest: {
      ...loc(input.origin, input.destination, input.pickupDate),
      equipment: null,
      accessorials: [],
      freightInfo: input.freightInfo,
      isFTL: false,
    },
    accessorialTypeIds: [],
    shipmentTypeId: 2,
    truckTypeId: 0,
  });
  return normalizeRates(data);
}

export async function getQlQuote(input: {
  origin: QuoteLocation;
  destination: QuoteLocation;
  pickupDate: string;
  isFTL: boolean;
  truckType?: string;
  freightInfo?: FreightLine | FreightLine[] | null;
}): Promise<QuickloadQlQuote> {
  return qlFetch<QuickloadQlQuote>("/api/v1/quote/getqlquote?api-version=1.0", {
    ...loc(input.origin, input.destination, input.pickupDate),
    isFTL: input.isFTL,
    truckType: input.truckType ?? "Van",
    freightInfo: input.freightInfo ?? null,
  });
}
