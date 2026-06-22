import { z } from "zod";

import {
  BANK_OPTIONS,
  SIGNUP_EMAIL_REGEX,
  SIGNUP_MAX_ID_LENGTH,
  SIGNUP_MAX_NAME_LENGTH,
  SIGNUP_MAX_PASSWORD_LENGTH,
  SIGNUP_MAX_PHONE_NUMBER_LENGTH,
  SIGNUP_MIN_ID_LENGTH,
  SIGNUP_MIN_PASSWORD_LENGTH,
} from "@/features/signup/config/signup";

export const signupTermTypeSchema = z.enum(["DESIGNER_SERVICE", "INSTRUCTOR_SERVICE", "USERINFO"]);

export const signupTermAgreementSchema = z.object({
  type: signupTermTypeSchema,
  version: z.string().min(1),
  isAgreed: z.literal(true),
});

export const signupProfileSchema = z.object({
  name: z.string().trim().min(1).max(SIGNUP_MAX_NAME_LENGTH),
  phone: z
    .string()
    .regex(/^\d{10,11}$/)
    .max(SIGNUP_MAX_PHONE_NUMBER_LENGTH),
  terms: z.array(signupTermAgreementSchema).length(2),
});

export const signupAccountSchema = z
  .object({
    username: z.string().min(SIGNUP_MIN_ID_LENGTH).max(SIGNUP_MAX_ID_LENGTH),
    password: z
      .string()
      .min(SIGNUP_MIN_PASSWORD_LENGTH)
      .max(SIGNUP_MAX_PASSWORD_LENGTH)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[!-~]+$/),
    passwordConfirm: z.string().min(1),
    email: z.string().trim().regex(SIGNUP_EMAIL_REGEX),
    verificationCode: z.string().trim().min(1),
  })
  .superRefine(({ password, passwordConfirm }, context) => {
    if (password !== passwordConfirm) {
      context.addIssue({
        code: "custom",
        message: "비밀번호가 일치하지 않습니다",
        path: ["passwordConfirm"],
      });
    }
  });

export const signupDesignerAdditionalSchema = z.object({
  bankCode: z.custom<(typeof BANK_OPTIONS)[number]["code"]>(
    value => typeof value === "string" && BANK_OPTIONS.some(({ code }) => code === value),
  ),
  accountNumber: z.string().trim().min(1),
  accountHolder: z.string().trim().min(1),
  portfolioFiles: z
    .array(z.custom<File>(value => typeof File !== "undefined" && value instanceof File))
    .max(3),
});

export type SignupTermType = z.infer<typeof signupTermTypeSchema>;
export type SignupTermAgreement = z.infer<typeof signupTermAgreementSchema>;
export type SignupProfileData = z.infer<typeof signupProfileSchema>;
export type SignupAccountFormValues = z.infer<typeof signupAccountSchema>;
export type SignupAccountData = Omit<
  SignupAccountFormValues,
  "passwordConfirm" | "verificationCode"
>;
export type SignupDesignerAdditionalData = z.infer<typeof signupDesignerAdditionalSchema>;
