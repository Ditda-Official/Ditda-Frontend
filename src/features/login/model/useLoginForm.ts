"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { postLogin } from "@/features/login/api/login";
import { loginFormSchema, type LoginFormValues } from "@/features/login/model/loginSchemas";
import {
  getClientUserHomePath,
  normalizeClientUserRole,
  setClientAuth,
} from "@/shared/lib/auth/client";

export const useLoginForm = () => {
  const router = useRouter();
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<LoginFormValues>({
    defaultValues: {
      password: "",
      username: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });
  const values = useWatch({ control }) as LoginFormValues;
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("username", event.target.value, { shouldDirty: true, shouldValidate: true });
    setErrorMessage(undefined);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("password", event.target.value, { shouldDirty: true, shouldValidate: true });
    setErrorMessage(undefined);
  };

  const clearUsername = () => {
    setValue("username", "", { shouldDirty: true, shouldValidate: true });
    setErrorMessage(undefined);
  };

  const onSubmit = handleSubmit(async formValues => {
    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      const result = await postLogin(formValues);
      const userRole = normalizeClientUserRole(result.userType);

      if (userRole == null) {
        throw new Error("사용자 유형을 확인할 수 없습니다");
      }

      setClientAuth({
        accessToken: result.accessToken,
        role: userRole,
        name: result.name,
        profileImageUrl: result.profileImageUrl,
      });
      router.push(getClientUserHomePath(userRole));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "요청 처리 중 문제가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    clearUsername,
    errorMessage,
    handlePasswordChange,
    handleUsernameChange,
    isLoginEnabled: isValid && !isSubmitting,
    isSubmitting,
    onSubmit,
    password: values.password,
    username: values.username,
  };
};
