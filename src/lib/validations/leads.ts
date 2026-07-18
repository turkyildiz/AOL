import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined));

export const contactLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  phone: optionalString,
  company: optionalString,
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  phone: optionalString,
  company: optionalString,
  mode: optionalString,
  equipment: optionalString,
  origin: z.string().trim().min(1, "Origin is required").max(300),
  destination: z.string().trim().min(1, "Destination is required").max(300),
  readyDate: optionalString,
  weight: optionalString,
  cargo: optionalString,
  message: optionalString,
});

/** Shipper counter-offer after seeing live network rates */
export const targetRateOfferSchema = z.object({
  name: z.string().trim().max(200).optional(),
  email: z.string().trim().email("Valid email required").max(320),
  phone: z
    .string()
    .trim()
    .min(7, "Phone is required so we can work your load")
    .max(40),
  company: z.string().trim().max(200).optional(),
  targetRate: z
    .number()
    .positive("Target rate must be greater than zero")
    .max(500_000, "That target looks too high — call ops"),
  marketBest: z.number().positive().nullable().optional(),
  mode: z.string().trim().max(40).optional(),
  equipment: z.string().trim().max(80).optional(),
  origin: z.string().trim().min(1, "Origin is required").max(300),
  destination: z.string().trim().min(1, "Destination is required").max(300),
  readyDate: z.string().trim().max(40).optional(),
  weight: z.string().trim().max(40).optional(),
  cargo: z.string().trim().max(300).optional(),
  flexiblePickup: z.boolean().optional(),
  canWait: z.boolean().optional(),
  notes: z.string().trim().max(2000).optional(),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type TargetRateOfferInput = z.infer<typeof targetRateOfferSchema>;
