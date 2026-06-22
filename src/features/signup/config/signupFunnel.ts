import type { SignupFunnelStep, SignupRole, SignupRoleStep } from "@/features/signup/model/signup";

export const SIGNUP_INITIAL_STEP = "role" satisfies SignupFunnelStep;

export const SIGNUP_STEPS_BY_ROLE = {
  designer: ["termsProfile", "account", "designerAdditional"],
  instructor: ["termsProfile", "account"],
} as const satisfies Record<SignupRole, readonly SignupRoleStep[]>;
