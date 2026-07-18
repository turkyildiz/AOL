/**
 * QuickLoad Shipper API client (server-only).
 * Docs: https://www.quickload.com/developer
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

  // Token endpoint expects form-urlencoded (JSON returns 415)
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

  // Cache ~50 minutes (JWT lifetime unknown; refresh conservatively)
  tokenCache = { token, expiresAt: Date.now() + 50 * 60_000 };
  return token;
}

async function qlFetch<T>(path: string, body: unknown): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    // Retry once on 401 with fresh token
    if (res.status === 401) {
      tokenCache = null;
      const token2 = await getToken();
      const res2 = await fetch(`${getBaseUrl()}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token2}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      });
      if (!res2.ok) {
        const text = await res2.text().catch(() => "");
        throw new Error(`QuickLoad API ${path} failed (${res2.status}): ${text.slice(0, 300)}`);
      }
      return (await res2.json()) as T;
    }
    const text = await res.text().catch(() => "");
    throw new Error(`QuickLoad API ${path} failed (${res.status}): ${text.slice(0, 300)}`);
  }

  return (await res.json()) as T;
}

function basePrimus(origin: QuoteLocation, destination: QuoteLocation, pickupDate: string) {
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

/** Instant QuickLoad network quote (single price) */
export async function getQlQuote(input: {
  origin: QuoteLocation;
  destination: QuoteLocation;
  pickupDate: string;
  isFTL: boolean;
  truckType?: string;
  freightInfo?: FreightLine | FreightLine[] | null;
}): Promise<QuickloadQlQuote> {
  return qlFetch<QuickloadQlQuote>("/api/v1/quote/getqlquote?api-version=1.0", {
    ...basePrimus(input.origin, input.destination, input.pickupDate),
    isFTL: input.isFTL,
    truckType: input.truckType ?? null,
    freightInfo: input.freightInfo ?? null,
  });
}

/** Marketplace FTL rates */
export async function getFtlQuotes(input: {
  origin: QuoteLocation;
  destination: QuoteLocation;
  pickupDate: string;
  equipment?: string;
  truckTypeId?: number;
  shipmentTypeId?: number;
  freightInfo?: FreightLine | null;
}): Promise<QuickloadRate[]> {
  const data = await qlFetch<QuickloadRate[] | { data?: QuickloadRate[] }>(
    "/api/v1/quote/getftlquote?api-version=1.0",
    {
      quotePrimusRequest: {
        ...basePrimus(input.origin, input.destination, input.pickupDate),
        equipment: input.equipment ?? "Van",
        accessorials: [],
        freightInfo: input.freightInfo ?? null,
        isFTL: true,
      },
      accessorialTypeIds: [],
      shipmentTypeId: input.shipmentTypeId ?? 1,
      truckTypeId: input.truckTypeId ?? 1,
    },
  );
  return Array.isArray(data) ? data : data.data ?? [];
}

/** Marketplace LTL rates */
export async function getLtlQuotes(input: {
  origin: QuoteLocation;
  destination: QuoteLocation;
  pickupDate: string;
  freightInfo: FreightLine[];
  shipmentTypeId?: number;
}): Promise<QuickloadRate[]> {
  const data = await qlFetch<QuickloadRate[] | { data?: QuickloadRate[] }>(
    "/api/v1/quote/getltlquote?api-version=1.0",
    {
      quotePrimusRequest: {
        ...basePrimus(input.origin, input.destination, input.pickupDate),
        equipment: null,
        accessorials: [],
        freightInfo: input.freightInfo,
        isFTL: false,
      },
      accessorialTypeIds: [],
      shipmentTypeId: input.shipmentTypeId ?? 2,
      truckTypeId: 0,
    },
  );
  return Array.isArray(data) ? data : data.data ?? [];
}
