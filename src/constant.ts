import { z } from "zod";

export enum Status {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export const GeneratePdfQuerySchema = z.object({
  url: z.string().url(),
});

export const GetPdfQuerySchema = z.object({
  id: z.string(),
});
