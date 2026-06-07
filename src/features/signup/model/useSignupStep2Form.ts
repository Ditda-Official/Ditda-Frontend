import { type ChangeEvent, useEffect, useState } from "react";

import {
  SIGNUP_EMAIL_ERROR_MESSAGE,
  SIGNUP_EMAIL_REGEX,
  SIGNUP_EMAIL_VERIFICATION_CODE_ERROR_MESSAGE,
  SIGNUP_EMAIL_VERIFICATION_LIMIT_SECONDS,
  SIGNUP_ID_AVAILABLE_MESSAGE,
  SIGNUP_ID_DUPLICATED_ERROR_MESSAGE,
  SIGNUP_ID_LENGTH_ERROR_MESSAGE,
  SIGNUP_MAX_ID_LENGTH,
  SIGNUP_MAX_PASSWORD_LENGTH,
  SIGNUP_MIN_ID_LENGTH,
  SIGNUP_MIN_PASSWORD_LENGTH,
  SIGNUP_MOCK_ACCOUNT,
  SIGNUP_MOCK_EMAIL_VERIFICATION_CODE,
  SIGNUP_PASSWORD_CONFIRM_ERROR_MESSAGE,
  SIGNUP_PASSWORD_CONFIRM_FORMAT_ERROR_MESSAGE,
  SIGNUP_PASSWORD_ERROR_MESSAGE,
} from "@/features/signup/config/signup";

type SignupUserIdCheckStatus = "idle" | "available" | "duplicated";
type SignupEmailVerificationStatus = "idle" | "sent" | "verified";

const formatSignupUserId = (value: string) =>
  value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "").slice(0, SIGNUP_MAX_ID_LENGTH);

const validateSignupPassword = (value: string) =>
  value.length >= SIGNUP_MIN_PASSWORD_LENGTH &&
  value.length <= SIGNUP_MAX_PASSWORD_LENGTH &&
  /[A-Za-z]/.test(value) &&
  /\d/.test(value) &&
  /^[!-~]+$/.test(value);

const validateSignupEmail = (value: string) => SIGNUP_EMAIL_REGEX.test(value.trim());

const formatSignupEmailVerificationTimer = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

const checkSignupUserIdAvailability = (value: string) => value.trim() !== SIGNUP_MOCK_ACCOUNT.id;

export const useSignupStep2Form = () => {
  const [userId, setUserId] = useState("");
  const [userIdCheckStatus, setUserIdCheckStatus] = useState<SignupUserIdCheckStatus>("idle");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [emailVerificationStatus, setEmailVerificationStatus] =
    useState<SignupEmailVerificationStatus>("idle");
  const isUserIdLengthValid =
    userId.length >= SIGNUP_MIN_ID_LENGTH && userId.length <= SIGNUP_MAX_ID_LENGTH;
  const isUserIdAvailable = userIdCheckStatus === "available";
  const userIdErrorMessage =
    userId.length > 0 && !isUserIdLengthValid
      ? SIGNUP_ID_LENGTH_ERROR_MESSAGE
      : userIdCheckStatus === "duplicated"
        ? SIGNUP_ID_DUPLICATED_ERROR_MESSAGE
        : undefined;
  const userIdMessage =
    userIdErrorMessage ?? (isUserIdAvailable ? SIGNUP_ID_AVAILABLE_MESSAGE : undefined);
  const isPasswordValid = validateSignupPassword(password);
  const hasPasswordFormatError = password.length > 0 && !isPasswordValid;
  const isPasswordConfirmValid =
    passwordConfirm.length > 0 && isPasswordValid && passwordConfirm === password;
  const hasEmail = email.trim().length > 0;
  const isEmailFormatValid = validateSignupEmail(email);
  const isEmailVerified = emailVerificationStatus === "verified";
  const isVerificationCodeVisible = emailVerificationStatus !== "idle";
  const isVerificationTimerActive = verificationTimer > 0;
  const isVerificationCodeInvalid =
    isVerificationCodeVisible &&
    verificationCode.length > 0 &&
    verificationCode.trim() !== SIGNUP_MOCK_EMAIL_VERIFICATION_CODE &&
    !isEmailVerified;

  useEffect(() => {
    if (!isVerificationTimerActive || isEmailVerified) return;

    const timerId = window.setInterval(() => {
      setVerificationTimer(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isEmailVerified, isVerificationTimerActive]);

  const resetEmailVerification = () => {
    setVerificationCode("");
    setVerificationTimer(0);
    setEmailVerificationStatus("idle");
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(formatSignupUserId(event.target.value));
    setUserIdCheckStatus("idle");
  };

  const handleUserIdCheck = () => {
    const isAvailable = checkSignupUserIdAvailability(userId);
    setUserIdCheckStatus(isAvailable ? "available" : "duplicated");
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    resetEmailVerification();
  };

  const handleEmailVerificationRequest = () => {
    if (!isEmailFormatValid) return;

    setVerificationCode("");
    setEmailVerificationStatus("sent");
    setVerificationTimer(SIGNUP_EMAIL_VERIFICATION_LIMIT_SECONDS);
  };

  const handleVerificationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextCode = event.target.value;

    setVerificationCode(nextCode);

    if (nextCode.trim() === SIGNUP_MOCK_EMAIL_VERIFICATION_CODE) {
      setEmailVerificationStatus("verified");
      setVerificationTimer(0);
    }
  };

  const clearUserId = () => {
    setUserId("");
    setUserIdCheckStatus("idle");
  };

  const clearEmail = () => {
    setEmail("");
    resetEmailVerification();
  };

  return {
    clearEmail,
    clearUserId,
    email,
    emailErrorMessage: hasEmail && !isEmailFormatValid ? SIGNUP_EMAIL_ERROR_MESSAGE : undefined,
    handleEmailChange,
    handleEmailVerificationRequest,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleUserIdChange,
    handleUserIdCheck,
    handleVerificationCodeChange,
    isEmailVerificationButtonEnabled: hasEmail && !isVerificationTimerActive && !isEmailVerified,
    isEmailVerified,
    isPasswordConfirmValid,
    isPasswordValid,
    isSubmitEnabled:
      isUserIdAvailable && isPasswordValid && isPasswordConfirmValid && isEmailVerified,
    isUserIdAvailable,
    isUserIdLengthValid,
    isVerificationCodeVisible,
    password,
    passwordConfirm,
    passwordConfirmErrorMessage:
      passwordConfirm.length > 0
        ? hasPasswordFormatError
          ? SIGNUP_PASSWORD_CONFIRM_FORMAT_ERROR_MESSAGE
          : passwordConfirm !== password
            ? SIGNUP_PASSWORD_CONFIRM_ERROR_MESSAGE
            : undefined
        : undefined,
    passwordErrorMessage:
      password.length > 0 && !isPasswordValid ? SIGNUP_PASSWORD_ERROR_MESSAGE : undefined,
    userId,
    userIdErrorMessage,
    userIdMessage,
    verificationCode,
    verificationCodeErrorMessage: isVerificationCodeInvalid
      ? SIGNUP_EMAIL_VERIFICATION_CODE_ERROR_MESSAGE
      : undefined,
    verificationTimerText: isVerificationTimerActive
      ? formatSignupEmailVerificationTimer(verificationTimer)
      : undefined,
  };
};
