import { useEffect, useState } from "react";

import {
  PLAN_LABEL_MAP,
  SIZE_DISPLAY_MAP,
  TERMS_CONTENT,
} from "@/features/instructor/write/config/write";
import { formatDate } from "@/features/instructor/write/lib/date";
import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import { ArrowDownIcon, CheckboxFillIcon, CheckboxGrayIcon } from "@/shared/assets/icons";
import Button from "@/shared/ui/Button";
import Chip from "@/shared/ui/Chip";
import Toast from "@/shared/ui/Toast";

/* ─────────────────────────────────────────────
   InfoRow
───────────────────────────────────────────── */

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
    <p className="text-gray-70 text-body2-m shrink-0">{label}</p>
    <div className="bg-gray-40 h-5 w-px shrink-0" />
    {value != null ? (
      <p className="text-gray-90 text-body1-sb">{value}</p>
    ) : (
      <div className="scrollbar-hide flex flex-row gap-2 overflow-x-auto *:shrink-0">
        {children}
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   TermsSection
───────────────────────────────────────────── */

const TermsSection = ({
  isTermsAgreed,
  setIsTermsAgreed,
}: {
  isTermsAgreed: boolean;
  setIsTermsAgreed: (v: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-90 text-body2-m">약관동의</h2>
      <div className="bg-gray-20 rounded-10 flex flex-col gap-2.5 px-5 py-4">
        <p className="text-gray-90 text-body2-r">결제·환불 정책</p>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            {isTermsAgreed ? (
              <CheckboxFillIcon
                className="size-4.5 cursor-pointer"
                onClick={() => setIsTermsAgreed(false)}
              />
            ) : (
              <CheckboxGrayIcon
                className="size-4.5 cursor-pointer"
                onClick={() => setIsTermsAgreed(true)}
              />
            )}
            <div
              className="flex cursor-pointer flex-row gap-1"
              onClick={() => setIsOpen(prev => !prev)}
            >
              <p className="text-gray-90 text-body2-r">[필수] 모두 동의</p>
              <ArrowDownIcon
                className={`text-gray-80 size-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="flex flex-col gap-3 overflow-hidden">
              {TERMS_CONTENT.map((term, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <p className="text-gray-90 text-body1-sb pt-2.5">{term.title}</p>
                  <p className="text-gray-90 text-body2-r whitespace-pre-wrap">{term.body}</p>
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
  );
};

/* ─────────────────────────────────────────────
   Step1
───────────────────────────────────────────── */

const Step1 = ({ onNext, errorMessage }: { onNext: () => void; errorMessage?: string | null }) => {
  const {
    selectedCategory,
    selectedSize,
    selectedKeywords,
    colorMode,
    colors,
    selectedPages,
    selectedPlan,
    firstDate,
    finalDate,
    isTermsAgreed,
    setIsTermsAgreed,
  } = useWriteFormStore();

  const [prevErrorMessage, setPrevErrorMessage] = useState(errorMessage);
  const [autoHide, setAutoHide] = useState(false);
  if (errorMessage !== prevErrorMessage) {
    setPrevErrorMessage(errorMessage);
    setAutoHide(false);
  }
  const showError = !!errorMessage && !autoHide;

  useEffect(() => {
    if (!showError) return;
    const timeout = setTimeout(() => setAutoHide(true), 2500);
    return () => clearTimeout(timeout);
  }, [showError]);

  return (
    <>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto pt-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            {selectedCategory && <InfoRow label="카테고리" value={selectedCategory.item} />}
            {selectedSize && <InfoRow label="사이즈" value={SIZE_DISPLAY_MAP[selectedSize]} />}
            {selectedPlan && <InfoRow label="플랜" value={PLAN_LABEL_MAP[selectedPlan.code]} />}
            {selectedPages.length > 0 && (
              <InfoRow label="페이지">
                {selectedPages.map(p => (
                  <Chip key={p} label={p} disableHover />
                ))}
              </InfoRow>
            )}
            {selectedKeywords.length > 0 && (
              <InfoRow label="컨셉">
                {selectedKeywords.map(k => (
                  <Chip key={k} label={k} disableHover />
                ))}
              </InfoRow>
            )}
            {colorMode === "designer" && <InfoRow label="컬러" value="디자이너가 지정" />}
            {colorMode === "custom" && colors.some(Boolean) && (
              <InfoRow label="컬러">
                {colors.map((c, i) =>
                  c ? (
                    <div
                      key={i}
                      className="rounded-4 size-9.75"
                      style={{ backgroundColor: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a / 100})` }}
                    />
                  ) : null,
                )}
              </InfoRow>
            )}
            {firstDate && <InfoRow label="1차 수령 일시" value={formatDate(firstDate)} />}
            {finalDate && <InfoRow label="최종 수령 일시" value={formatDate(finalDate)} />}
          </div>
          <hr className="border-gray-20 border-t" />
          <TermsSection isTermsAgreed={isTermsAgreed} setIsTermsAgreed={setIsTermsAgreed} />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-between pt-6 pb-8">
          <h3 className="text-heading3-sb text-gray-70">최종 금액</h3>
          <p className="text-gray-90 text-title2-sb">
            {selectedPlan ? `${selectedPlan.price.toLocaleString("ko-KR")}원` : "-"}
          </p>
        </div>
        <div className="relative">
          <Toast
            message={errorMessage ?? ""}
            show={showError}
            className="absolute -top-4 left-1/2 w-fit shrink-0 -translate-x-1/2 -translate-y-full whitespace-nowrap"
          />
          <Button
            variant={isTermsAgreed && !showError ? "large_primary" : "large_disabled"}
            disabled={!isTermsAgreed || showError}
            onClick={onNext}
          >
            결제하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step1;
