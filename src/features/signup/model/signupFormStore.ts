import { create } from "zustand";

import type { BankCode } from "@/features/signup/config/signup";
import type { SignupAccountFormValues } from "@/features/signup/model/signupSchemas";
import type { UploadedFile } from "@/shared/types/file";

type SignupAccountField = keyof SignupAccountFormValues;

interface SignupDesignerDraft {
  accountHolder: string;
  accountNumber: string;
  bankCode: BankCode | null;
  portfolioFiles: UploadedFile[];
}

interface SignupFormState {
  accountDraft: SignupAccountFormValues;
  designerDraft: SignupDesignerDraft;
  verifiedEmail: string | null;
  verifiedUsername: string | null;
  setAccountField: (field: SignupAccountField, value: string) => void;
  setDesignerAccountHolder: (accountHolder: string) => void;
  setDesignerAccountNumber: (accountNumber: string) => void;
  setDesignerBankCode: (bankCode: BankCode | null) => void;
  setDesignerPortfolioFiles: (portfolioFiles: UploadedFile[]) => void;
  setVerifiedEmail: (email: string) => void;
  setVerifiedUsername: (username: string) => void;
  resetSignupForm: () => void;
}

const initialState = {
  accountDraft: {
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    verificationCode: "",
  },
  designerDraft: {
    accountHolder: "",
    accountNumber: "",
    bankCode: null,
    portfolioFiles: [],
  },
  verifiedEmail: null,
  verifiedUsername: null,
};

export const useSignupFormStore = create<SignupFormState>()(set => ({
  ...initialState,

  setAccountField: (field, value) =>
    set(state => {
      const nextState: Partial<SignupFormState> = {
        accountDraft: { ...state.accountDraft, [field]: value },
      };

      if (field === "username" && state.verifiedUsername !== value) {
        nextState.verifiedUsername = null;
      }

      if (field === "email" && state.verifiedEmail !== value.trim()) {
        nextState.verifiedEmail = null;
      }

      return nextState;
    }),
  setDesignerAccountHolder: accountHolder =>
    set(state => ({ designerDraft: { ...state.designerDraft, accountHolder } })),
  setDesignerAccountNumber: accountNumber =>
    set(state => ({ designerDraft: { ...state.designerDraft, accountNumber } })),
  setDesignerBankCode: bankCode =>
    set(state => ({ designerDraft: { ...state.designerDraft, bankCode } })),
  setDesignerPortfolioFiles: portfolioFiles =>
    set(state => ({ designerDraft: { ...state.designerDraft, portfolioFiles } })),
  setVerifiedEmail: email => set({ verifiedEmail: email.trim() }),
  setVerifiedUsername: username => set({ verifiedUsername: username }),
  resetSignupForm: () => set(initialState),
}));
