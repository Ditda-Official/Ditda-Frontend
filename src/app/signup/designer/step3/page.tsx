"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";

import { type BankCode, BankDropdown, type BankOption } from "@/features/signup";
import { StepThreeDesignerIcon } from "@/shared/assets/icons";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import Button from "@/shared/ui/Button";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import InputField from "@/shared/ui/input/InputField";

const PORTFOLIO_MAX_FILE_COUNT = 3;
const PORTFOLIO_ALLOWED_EXTENSIONS = [".pdf", ".png"];

const isPortfolioFile = (file: File) => {
  const fileName = file.name.toLowerCase();

  return PORTFOLIO_ALLOWED_EXTENSIONS.some(extension => fileName.endsWith(extension));
};

const Page = () => {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<BankCode | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles();

  const isSubmitEnabled =
    selectedBank != null && accountNumber.trim().length > 0 && accountHolder.trim().length > 0;

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

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <section className="flex w-118 flex-col gap-12">
          <div className="flex w-full flex-col gap-16">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-title2-b text-black">회원가입</h1>
              <StepThreeDesignerIcon className="h-8 w-[138px] shrink-0" />
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
            </div>
          </div>

          <div className="flex w-full items-start justify-between">
            <Button
              className="w-[232px]"
              type="button"
              variant="medium_secondary"
              onClick={() => router.push("/signup/designer/step2")}
            >
              이전
            </Button>
            <Button
              className="w-[232px]"
              type="button"
              variant={isSubmitEnabled ? "medium_primary" : "medium_disabled"}
              onClick={() => {
                if (isSubmitEnabled) router.push("/login");
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

export default Page;
