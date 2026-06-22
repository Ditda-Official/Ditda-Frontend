export type SignupRole = "designer" | "instructor";

export type SignupFunnelStep = "role" | "termsProfile" | "account" | "designerAdditional";

export type SignupRoleStep = Exclude<SignupFunnelStep, "role">;

export type {
  SignupAccountData,
  SignupProfileData,
  SignupTermType,
} from "@/features/signup/model/signupSchemas";
