import { z } from "zod";

export const claimsSchema = z.object({
  company: z.string().nullable(),
  promoter: z.string().nullable(),
  returnClaim: z.string().nullable(),
  paymentDestination: z.string().nullable(),
});

export const analyzeRequestSchema = z.object({
  text: z.string().trim().max(5000).default(""),
  imageData: z.string().max(7_500_000).optional(),
  imageMimeType: z.enum(["image/png", "image/jpeg", "image/webp"]).optional(),
}).refine((input) => input.text.length > 0 || Boolean(input.imageData), {
  message: "Comparte un mensaje, enlace o captura ficticia.",
});

export type Claims = z.infer<typeof claimsSchema>;

export type ExtractionResponse = {
  claims: Claims;
  mode: "gemini" | "demo";
  note: string;
};
