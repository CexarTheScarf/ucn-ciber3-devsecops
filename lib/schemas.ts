import { z } from "zod";

// ======================================== Survey schema ========================================
export const surveyFormSchema = z.object({
  surveyId: z.string().min(1),
  answers: z.record(z.string().min(1)),
});

export type SurveyForm = z.infer<typeof surveyFormSchema>;

// ======================================== Search params schema ========================================
export const surveySearchParamSchema = z.object({
  searchParams: z.object({
    sid: z.string().cuid(),
  }),
});

export type SurveySearchParams = z.infer<typeof surveySearchParamSchema>;

// ======================================== Session JWT schema ========================================
export const sessionJWTPayloadSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export type SessionJWTPayload = z.infer<typeof sessionJWTPayloadSchema>;
