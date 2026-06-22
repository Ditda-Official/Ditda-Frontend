"use client";

import { type ChangeEvent, type ReactNode, useState } from "react";

import type { BankCode, BankOption } from "@/features/signup/config/signup";
import {
  type SignupDesignerAdditionalData,
  signupDesignerAdditionalSchema,
} from "@/features/signup/model/signupSchemas";
import BankDropdown from "@/features/signup/ui/BankDropdown";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import Button from "@/shared/ui/Button";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import InputField from "@/shared/ui/input/InputField";

type DesignerAdditionalStepProps = {
  progressIcon: ReactNode;
  initialData?: SignupDesignerAdditionalData;
  onPrev: () => void;
  onSubmit: (data: SignupDesignerAdditionalData) => Promise<void>;
};

const PORTFOLIO_MAX_FILE_COUNT = 3;
const PORTFOLIO_ALLOWED_EXTENSIONS = [".pdf", ".png"];

const isPortfolioFile = (file: File) => {
  const fileName = file.name.toLowerCase();

  return PORTFOLIO_ALLOWED_EXTENSIONS.some(extension => fileName.endsWith(extension));
};

const DesignerAdditionalStep = ({
  progressIcon,
  initialData,
  onPrev,
  onSubmit,
}: DesignerAdditionalStepProps) => {
  const [selectedBank, setSelectedBank] = useState<BankCode | null>(initialData?.bankCode ?? null);
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber ?? "");
  const [accountHolder, setAccountHolder] = useState(initialData?.accountHolder ?? "");
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitEnabled =
    selectedBank != null &&
    accountNumber.trim().length > 0 &&
    accountHolder.trim().length > 0 &&
    !isSubmitting;

  const handleBankChange = (bank: BankOption) => {
    setSelectedBank(bank.code);
  };

  const handleAccountNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value.replace(/\D/g, ""));
  };

  const handlePortfolioFilesAdded = (files: File[]) => {
    const remainingCount = PORTFOLIO_MAX_FILE_COUNT - uploadedFiles.length;
    if (remainingCount <= 0) return;

    const portfolioFiles = files.filter(isPortfolioFile).slice(0, remainingCount);
    if (portfolioFiles.length > 0) handleFilesAdded(portfolioFiles);
  };

  const handleSubmit = async () => {
    const parsedData = signupDesignerAdditionalSchema.safeParse({
      bankCode: selectedBank,
      accountNumber: accountNumber.trim(),
      accountHolder: accountHolder.trim(),
      portfolioFiles: uploadedFiles.map(({ file }) => file),
    });

    if (!parsedData.success || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitErrorMessage(undefined);

    try {
      await onSubmit(parsedData.data);
    } catch (error) {
      setSubmitErrorMessage(
        error instanceof Error ? error.message : "디자이너 회원가입에 실패했습니다",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col gap-12">
          <div className="flex w-full flex-col gap-16">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-title2-b text-black">회원가입</h1>
              {progressIcon}
            </div>

            <div className="flex w-full flex-col gap-5">
              <div className="flex w-full flex-col gap-2">
                <p className="text-body2-r text-gray-70">은행 선택</p>
                <BankDropdown value={selectedBank} onChange={handleBankChange} />
              </div>

              <InputField
                label="계좌번호"
                placeholder="계좌번호를 입력해주세요"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                onClear={() => setAccountNumber("")}
              />

              <InputField
                label="예금주"
                placeholder="예금주를 입력해주세요"
                value={accountHolder}
                onChange={event => setAccountHolder(event.target.value)}
                onClear={() => setAccountHolder("")}
              />

              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full items-center justify-between gap-3">
                  <p className="text-body2-r text-gray-70">포트폴리오 제출(선택)</p>
                  <p className="text-body2-r text-red-main shrink-0">
                    파일은 3개까지 업로드 가능합니다
                  </p>
                </div>
                <FileDragAndDrop isPortfolio onFilesAdded={handlePortfolioFilesAdded} />
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {uploadedFiles.map(file => (
                      <FileUpload
                        key={file.id}
                        fileName={file.fileName}
                        fileSize={file.fileSize}
                        isUploading={file.isUploading}
                        onRemove={() => handleRemove(file.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
              {submitErrorMessage != null && (
                <p className="text-caption1-m text-red-main px-1">{submitErrorMessage}</p>
              )}
            </div>
          </div>

          <div className="flex w-full items-start justify-between">
            <Button className="w-58" type="button" variant="medium_secondary" onClick={onPrev}>
              이전
            </Button>
            <Button
              className="w-58"
              type="button"
              variant={isSubmitEnabled ? "medium_primary" : "medium_disabled"}
              onClick={() => {
                if (isSubmitEnabled) void handleSubmit();
              }}
            >
              가입하기
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignerAdditionalStep;
