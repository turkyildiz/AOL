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

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
