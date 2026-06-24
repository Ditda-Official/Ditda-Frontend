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

export const useSignupStep2Form = (initialValues?: Partial<SignupAccountData>) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = useForm<SignupAccountFormValues>({
    defaultValues: {
      email: initialValues?.email ?? "",
      password: initialValues?.password ?? "",
      passwordConfirm: initialValues?.password ?? "",
      username: initialValues?.username ?? "",
      verificationCode: "",
    },
    mode: "onChange",
    resolver: zodResolver(signupAccountSchema),
  });

  const values = useWatch({ control }) as SignupAccountFormValues;
  const [userIdCheckStatus, setUserIdCheckStatus] = useState<SignupUserIdCheckStatus>("idle");
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [emailVerificationStatus, setEmailVerificationStatus] =
    useState<SignupEmailVerificationStatus>("idle");
  const [emailRequestErrorMessage, setEmailRequestErrorMessage] = useState<string>();
  const [verificationCodeErrorMessage, setVerificationCodeErrorMessage] = useState<string>();
  const [userIdCheckErrorMessage, setUserIdCheckErrorMessage] = useState<string>();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVerificationTimerActive = verificationTimer > 0;
  const isEmailVerified = emailVerificationStatus === "verified";
  const isUserIdAvailable = userIdCheckStatus === "available";
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
    setVerificationTimer(0);
    setEmailVerificationStatus("idle");
    setEmailRequestErrorMessage(undefined);
    setVerificationCodeErrorMessage(undefined);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("username", formatSignupUserId(event.target.value), {
      shouldDirty: true,
      shouldValidate: true,
    });
    setUserIdCheckStatus("idle");
    setUserIdCheckErrorMessage(undefined);
  };

  const handleUserIdCheck = async () => {
    if (!isUserIdLengthValid || userIdCheckStatus === "checking") return;

    setUserIdCheckStatus("checking");

    try {
      await postCheckSignupUsername(values.username);
      setUserIdCheckStatus("available");
    } catch (error) {
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

    if (values.passwordConfirm.length > 0) {
      void trigger("passwordConfirm");
    }
  };

  const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("passwordConfirm", event.target.value, { shouldDirty: true, shouldValidate: true });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("email", event.target.value, { shouldDirty: true, shouldValidate: true });
    resetEmailVerification();
  };

  const handleEmailVerificationRequest = async () => {
    if (!isEmailFormatValid || emailVerificationStatus === "sending") return;

    setEmailVerificationStatus("sending");
    setEmailRequestErrorMessage(undefined);
    setVerificationCodeErrorMessage(undefined);

    try {
      await postSignupEmailVerification(values.email.trim());
      setValue("verificationCode", "", { shouldDirty: true, shouldValidate: true });
      setEmailVerificationStatus("sent");
      setVerificationTimer(SIGNUP_EMAIL_VERIFICATION_LIMIT_SECONDS);
    } catch (error) {
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

    setEmailVerificationStatus("verifying");
    setVerificationCodeErrorMessage(undefined);

    try {
      await postVerifySignupEmail({
        code: values.verificationCode.trim(),
        email: values.email.trim(),
      });
      setEmailVerificationStatus("verified");
      setVerificationTimer(0);
    } catch (error) {
      setEmailVerificationStatus("sent");
      setVerificationCodeErrorMessage(
        error instanceof Error ? error.message : SIGNUP_EMAIL_VERIFICATION_CODE_ERROR_MESSAGE,
      );
    }
  };

  const clearUserId = () => {
    setValue("username", "", { shouldDirty: true, shouldValidate: true });
    setUserIdCheckStatus("idle");
    setUserIdCheckErrorMessage(undefined);
  };

  const clearEmail = () => {
    setValue("email", "", { shouldDirty: true, shouldValidate: true });
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
