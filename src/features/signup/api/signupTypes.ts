import { z } from "zod";

import type {
  SignupAccountData,
  SignupDesignerAdditionalData,
  SignupProfileData,
  SignupTermAgreement,
} from "@/features/signup/model/signupSchemas";

export const instructorSignupResultSchema = z.object({
  userId: z.number(),
  userType: z.string(),
  name: z.string(),
  profileImageUrl: z.string(),
  accessToken: z.string(),
});

export const designerSignupResultSchema = z.object({
  userId: z.number(),
  userType: z.string(),
  name: z.string(),
  profileImageUrl: z.string(),
  accessToken: z.string(),
});

export const portfolioPresignedUrlResultSchema = z.object({
  key: z.string(),
  presignedUrl: z.string(),
});

export type InstructorSignupResult = z.infer<typeof instructorSignupResultSchema>;
export type DesignerSignupResult = z.infer<typeof designerSignupResultSchema>;
export type PortfolioPresignedUrlResult = z.infer<typeof portfolioPresignedUrlResultSchema>;

export type PostSignupInstructorParams = {
  profile: SignupProfileData;
  account: SignupAccountData;
};

export type PostSignupDesignerParams = {
  profile: SignupProfileData;
  account: SignupAccountData;
  additional: SignupDesignerAdditionalData;
};

export type PostSignupInstructorBody = {
  terms: SignupTermAgreement[];
  name: string;
  phone: string;
  username: string;
  password: string;
  email: string;
};

export type PostSignupDesignerBody = PostSignupInstructorBody & {
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  portfolioKeys: string[];
};

export type PostPortfolioPresignedUrlBody = {
  email: string;
  contentType: string;
};
