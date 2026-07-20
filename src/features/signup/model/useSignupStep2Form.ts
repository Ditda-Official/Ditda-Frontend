import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  postCheckSignupUsername,
  postSignupEmailVerification,
  postSignupInstructor,
  postVerifySignupEmail,
} from "@/features/signup/api/signup";
import {
  SIGNUP_EMAIL_ERROR_MESSAGE,
  SIGNUP_EMAIL_VERIFICATION_CODE_ERROR_MESSAGE,
  SIGNUP_EMAIL_VERIFICATION_LIMIT_SECONDS,
  SIGNUP_ID_AVAILABLE_MESSAGE,
  SIGNUP_ID_DUPLICATED_ERROR_MESSAGE,
  SIGNUP_ID_LENGTH_ERROR_MESSAGE,
  SIGNUP_MAX_ID_LENGTH,
  SIGNUP_MIN_ID_LENGTH,
  SIGNUP_PASSWORD_CONFIRM_ERROR_MESSAGE,
  SIGNUP_PASSWORD_CONFIRM_FORMAT_ERROR_MESSAGE,
  SIGNUP_PASSWORD_ERROR_MESSAGE,
} from "@/features/signup/config/signup";
import { useSignupFormStore } from "@/features/signup/model/signupFormStore";
import {
  SignupAccountData,
  SignupAccountFormValues,
  signupAccountSchema,
  SignupProfileData,
} from "@/features/signup/model/signupSchemas";
import { ApiError } from "@/shared/api/client";

type SignupUserIdCheckStatus = "idle" | "checking" | "available" | "duplicated";
type SignupEmailVerificationStatus = "idle" | "sending" | "sent" | "verifying" | "verified";

const formatSignupUserId = (value: string) =>
  value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "").slice(0, SIGNUP_MAX_ID_LENGTH);

const formatSignupEmailVerificationTimer = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

const toSignupAccountData = ({
  email,
  password,
  username,
}: SignupAccountFormValues): SignupAccountData => ({
  email,
  password,
  username,
});

export const useSignupStep2Form = () => {
  const initialValues = useSignupFormStore.getState().accountDraft;
  const verifiedEmail = useSignupFormStore(state => state.verifiedEmail);
  const verifiedUsername = useSignupFormStore(state => state.verifiedUsername);
  const setAccountField = useSignupFormStore(state => state.setAccountField);
  const setVerifiedEmail = useSignupFormStore(state => state.setVerifiedEmail);
  const setVerifiedUsername = useSignupFormStore(state => state.setVerifiedUsername);
  const {
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = useForm<SignupAccountFormValues>({
    defaultValues: {
      email: initialValues.email,
      password: initialValues.password,
      passwordConfirm: initialValues.passwordConfirm,
      username: initialValues.username,
      verificationCode: initialValues.verificationCode,
    },
    mode: "onChange",
    resolver: zodResolver(signupAccountSchema),
  });

  const values = useWatch({ control }) as SignupAccountFormValues;
  const [userIdCheckStatus, setUserIdCheckStatus] = useState<SignupUserIdCheckStatus>(() =>
    verifiedUsername === initialValues.username && initialValues.username !== ""
      ? "available"
      : "idle",
  );
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [emailVerificationStatus, setEmailVerificationStatus] =
    useState<SignupEmailVerificationStatus>(() =>
      verifiedEmail === initialValues.email.trim() && initialValues.email.trim() !== ""
        ? "verified"
        : "idle",
    );
  const [emailRequestErrorMessage, setEmailRequestErrorMessage] = useState<string>();
  const [verificationCodeErrorMessage, setVerificationCodeErrorMessage] = useState<string>();
  const [userIdCheckErrorMessage, setUserIdCheckErrorMessage] = useState<string>();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVerificationTimerActive = verificationTimer > 0;
  const isEmailVerified = values.email.trim() !== "" && verifiedEmail === values.email.trim();
  const isUserIdAvailable = values.username !== "" && verifiedUsername === values.username;
  const isUserIdLengthValid =
    values.username.length >= SIGNUP_MIN_ID_LENGTH &&
    values.username.length <= SIGNUP_MAX_ID_LENGTH;
  const isPasswordValid = values.password.length > 0 && errors.password == null;
  const isPasswordConfirmValid =
    values.passwordConfirm.length > 0 && values.password === values.passwordConfirm;
  const hasPasswordFormatError = values.password.length > 0 && errors.password != null;
  const hasEmail = values.email.trim().length > 0;
  const isEmailFormatValid = hasEmail && errors.email == null;
  const isVerificationCodeVisible = emailVerificationStatus !== "idle";
  const userIdErrorMessage =
    values.username.length > 0 && !isUserIdLengthValid
      ? SIGNUP_ID_LENGTH_ERROR_MESSAGE
      : userIdCheckStatus === "duplicated"
        ? SIGNUP_ID_DUPLICATED_ERROR_MESSAGE
        : userIdCheckErrorMessage;
  const userIdMessage =
    userIdErrorMessage ?? (isUserIdAvailable ? SIGNUP_ID_AVAILABLE_MESSAGE : undefined);

  useEffect(() => {
    if (!isVerificationTimerActive || isEmailVerified) return;

    const timerId = window.setInterval(() => {
      setVerificationTimer(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isEmailVerified, isVerificationTimerActive]);

  const resetEmailVerification = () => {
    setValue("verificationCode", "", { shouldDirty: true, shouldValidate: true });
    setAccountField("verificationCode", "");
    setVerificationTimer(0);
    setEmailVerificationStatus("idle");
    setEmailRequestErrorMessage(undefined);
    setVerificationCodeErrorMessage(undefined);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const username = formatSignupUserId(event.target.value);
    setValue("username", username, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setAccountField("username", username);
    setUserIdCheckStatus("idle");
    setUserIdCheckErrorMessage(undefined);
  };

  const handleUserIdCheck = async () => {
    if (!isUserIdLengthValid || userIdCheckStatus === "checking") return;

    const username = getValues("username");
    setUserIdCheckStatus("checking");

    try {
      await postCheckSignupUsername(username);

      if (getValues("username") !== username) return;

      setVerifiedUsername(username);
      setUserIdCheckStatus("available");
    } catch (error) {
      if (getValues("username") !== username) return;

      if (error instanceof ApiError && (error.status === 409 || error.code === "REQ_409_01")) {
        setUserIdCheckStatus("duplicated");
        return;
      }

      setUserIdCheckStatus("idle");
      setUserIdCheckErrorMessage(
        error instanceof Error ? error.message : "요청 처리 중 문제가 발생했습니다",
      );
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("password", event.target.value, { shouldDirty: true, shouldValidate: true });
    setAccountField("password", event.target.value);

    if (values.passwordConfirm.length > 0) {
      void trigger("passwordConfirm");
    }
  };

  const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("passwordConfirm", event.target.value, { shouldDirty: true, shouldValidate: true });
    setAccountField("passwordConfirm", event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("email", event.target.value, { shouldDirty: true, shouldValidate: true });
    setAccountField("email", event.target.value);
    resetEmailVerification();
  };

  const handleEmailVerificationRequest = async () => {
    if (!isEmailFormatValid || emailVerificationStatus === "sending") return;

    const email = getValues("email").trim();
    setEmailVerificationStatus("sending");
    setEmailRequestErrorMessage(undefined);
    setVerificationCodeErrorMessage(undefined);

    try {
      await postSignupEmailVerification(email);

      if (getValues("email").trim() !== email) return;

      setValue("verificationCode", "", { shouldDirty: true, shouldValidate: true });
      setAccountField("verificationCode", "");
      setEmailVerificationStatus("sent");
      setVerificationTimer(SIGNUP_EMAIL_VERIFICATION_LIMIT_SECONDS);
    } catch (error) {
      if (getValues("email").trim() !== email) return;

      setEmailVerificationStatus("idle");
      setEmailRequestErrorMessage(
        error instanceof Error ? error.message : "인증번호 요청에 실패했습니다",
      );
    }
  };

  const handleVerificationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("verificationCode", event.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setAccountField("verificationCode", event.target.value);
    setVerificationCodeErrorMessage(undefined);

    if (emailVerificationStatus === "verified") {
      setEmailVerificationStatus("sent");
    }
  };

  const handleEmailVerificationConfirm = async () => {
    if (
      !isEmailFormatValid ||
      values.verificationCode.trim().length === 0 ||
      emailVerificationStatus === "verifying" ||
      isEmailVerified
    ) {
      return;
    }

    const email = getValues("email").trim();
    const code = getValues("verificationCode").trim();
    setEmailVerificationStatus("verifying");
    setVerificationCodeErrorMessage(undefined);

    try {
      await postVerifySignupEmail({
        code,
        email,
      });

      if (getValues("email").trim() !== email || getValues("verificationCode").trim() !== code) {
        return;
      }

      setVerifiedEmail(email);
      setEmailVerificationStatus("verified");
      setVerificationTimer(0);
    } catch (error) {
      if (getValues("email").trim() !== email || getValues("verificationCode").trim() !== code) {
        return;
      }

      setEmailVerificationStatus("sent");
      setVerificationCodeErrorMessage(
        error instanceof Error ? error.message : SIGNUP_EMAIL_VERIFICATION_CODE_ERROR_MESSAGE,
      );
    }
  };

  const clearUserId = () => {
    setValue("username", "", { shouldDirty: true, shouldValidate: true });
    setAccountField("username", "");
    setUserIdCheckStatus("idle");
    setUserIdCheckErrorMessage(undefined);
  };

  const clearEmail = () => {
    setValue("email", "", { shouldDirty: true, shouldValidate: true });
    setAccountField("email", "");
    resetEmailVerification();
  };

  const validateAndGetAccountData = async () => {
    const isFormValid = await trigger();

    if (!isFormValid || !isUserIdAvailable || !isEmailVerified) return null;

    return toSignupAccountData(getValues());
  };

  const handleInstructorSignup = async (profile: SignupProfileData, account: SignupAccountData) => {
    setSubmitErrorMessage(undefined);
    setIsSubmitting(true);

    try {
      return await postSignupInstructor({ account, profile });
    } catch (error) {
      setSubmitErrorMessage(
        error instanceof Error ? error.message : "강사 회원가입에 실패했습니다",
      );

      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    clearEmail,
    clearUserId,
    email: values.email,
    emailErrorMessage:
      hasEmail && errors.email != null ? SIGNUP_EMAIL_ERROR_MESSAGE : emailRequestErrorMessage,
    handleEmailChange,
    handleEmailVerificationConfirm,
    handleEmailVerificationRequest,
    handleInstructorSignup,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleUserIdChange,
    handleUserIdCheck,
    handleVerificationCodeChange,
    isEmailVerificationButtonEnabled:
      isEmailFormatValid &&
      !isVerificationTimerActive &&
      !isEmailVerified &&
      emailVerificationStatus !== "sending",
    isEmailVerificationConfirmButtonEnabled:
      isEmailFormatValid &&
      values.verificationCode.trim().length > 0 &&
      !isEmailVerified &&
      emailVerificationStatus !== "verifying",
    isEmailVerified,
    isPasswordConfirmValid,
    isPasswordValid,
    isSubmitEnabled: isUserIdAvailable && isValid && isEmailVerified && !isSubmitting,
    isSubmitting,
    isUserIdAvailable,
    isUserIdLengthValid,
    isVerificationCodeVisible,
    password: values.password,
    passwordConfirm: values.passwordConfirm,
    passwordConfirmErrorMessage:
      values.passwordConfirm.length > 0
        ? hasPasswordFormatError
          ? SIGNUP_PASSWORD_CONFIRM_FORMAT_ERROR_MESSAGE
          : errors.passwordConfirm != null
            ? SIGNUP_PASSWORD_CONFIRM_ERROR_MESSAGE
            : undefined
        : undefined,
    passwordErrorMessage:
      values.password.length > 0 && errors.password != null
        ? SIGNUP_PASSWORD_ERROR_MESSAGE
        : undefined,
    setSubmitErrorMessage,
    submitErrorMessage,
    userId: values.username,
    userIdErrorMessage,
    userIdMessage,
    validateAndGetAccountData,
    verificationCode: values.verificationCode,
    verificationCodeErrorMessage,
    verificationTimerText: isVerificationTimerActive
      ? formatSignupEmailVerificationTimer(verificationTimer)
      : undefined,
  };
};
