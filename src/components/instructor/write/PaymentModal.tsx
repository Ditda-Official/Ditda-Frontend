"use client";

import { useEffect, useState } from "react";

import { ArrowDownIcon, CheckboxFillIcon, CheckboxGrayIcon, CloseIcon } from "@/assets/icons";
import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import { TERMS_CONTENT } from "@/constants/write";

const InfoRow = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-row items-center gap-2">
    <p className="text-gray-70 text-body2-m">{label}</p>
    <div className="bg-gray-40 h-5 w-px" />
    {value != null ? <p className="text-gray-90 text-body1-sb">{value}</p> : children}
  </div>
);

const PaymentModal = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div className="rounded-20 w-130 bg-white p-6" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between py-2">
            <h1 className="text-gray-90 text-heading2-sb">YBM 영어학원 홍보물 디자인 외주</h1>
            <CloseIcon className="text-gray-90 size-6 cursor-pointer" onClick={onClose} />
          </div>
          <hr className="border-gray-20 border-t" />
          <div className="scrollbar-hide h-146.25 overflow-y-auto py-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <InfoRow label="카테고리" value="교재" />
                <InfoRow label="사이즈" value="A4" />
                <InfoRow label="플랜" value="플러스 플랜" />
                <InfoRow label="컨셉">
                  <Chip label="강사 프로필" disableHover />
                  <Chip label="단원 시작 간지" disableHover />
                </InfoRow>
                <InfoRow label="페이지">
                  <Chip label="점잖은" disableHover />
                  <Chip label="우아한" disableHover />
                </InfoRow>
                <InfoRow label="컬러">
                  <div className="rounded-4 bg-purple-30 size-9.75" />
                  <div className="rounded-4 bg-purple-30 size-9.75" />
                  <div className="rounded-4 bg-purple-30 size-9.75" />
                </InfoRow>
                <InfoRow label="1차 수령 일시" value="2026년 5월 15일" />
                <InfoRow label="최종 수령 일시" value="2026년 5월 23일" />
              </div>
              <hr className="border-gray-20 border-t" />
              <div className="flex flex-col gap-2">
                <h2 className="text-gray-90 text-body2-m">약관동의</h2>
                <div className="bg-gray-20 rounded-10 flex flex-col gap-2.5 px-5 py-4">
                  <p className="text-gray-90 text-body2-r">결제·환불 정책</p>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      {isAgreed ? (
                        <CheckboxFillIcon
                          className="size-4.5 cursor-pointer"
                          onClick={() => setIsAgreed(false)}
                        />
                      ) : (
                        <CheckboxGrayIcon
                          className="size-4.5 cursor-pointer"
                          onClick={() => setIsAgreed(true)}
                        />
                      )}
                      <div
                        className="flex cursor-pointer flex-row gap-1"
                        onClick={() => setIsTermsOpen(prev => !prev)}
                      >
                        <p className="text-gray-90 text-body2-r">[필수] 모두 동의</p>
                        <ArrowDownIcon
                          className={`text-gray-80 size-6 transition-transform duration-200 ${isTermsOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isTermsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="flex flex-col gap-3 overflow-hidden">
                        {TERMS_CONTENT.map((term, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <p className="text-gray-90 text-body1-sb pt-2.5">{term.title}</p>
                            <p className="text-gray-90 text-body2-r whitespace-pre-wrap">
                              {term.body}
                            </p>
                            {term.sections?.map((section, j) => (
                              <div key={j} className="flex flex-col gap-0.5 pt-1.5">
                                <p className="text-gray-90 text-body2-m">{section.subtitle}</p>
                                <p className="text-gray-90 text-body2-r whitespace-pre-wrap">
                                  {section.body}
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pb-8">
          <h3 className="text-heading3-sb text-gray-70">최종 금액</h3>
          <p className="text-gray-90 text-title2-sb">480,000원</p>
        </div>
        <Button variant={isAgreed ? "large_primary" : "large_disabled"} disabled={!isAgreed}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentModal;
