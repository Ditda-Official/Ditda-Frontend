import { ExtraFeeCard, LevelCard } from "@/features/landing";
import { PlusIcon } from "@/shared/assets/icons";

const RewardSection = () => {
  return (
    <div className="flex flex-col gap-20 bg-white px-32 py-20.5 text-center">
      <div>
        <h1 className="text-main-main text-heading2-sb pb-3">레벨별 보상 구조</h1>
        <h2 className="pb-8 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
          시안 제출만 해도 받는 금액, 미리 보여드립니다
        </h2>
        <h3 className="text-gray-70 text-heading3-m">
          레벨이 올라갈수록 기본 참여금도 함께 올라갑니다
        </h3>
      </div>
      <div className="mx-auto w-296">
        <div className="flex flex-row items-start gap-3.5">
          <div className="flex flex-row gap-2">
            <section className="bg-purple-5 rounded-8 flex h-89.25 w-fit items-center justify-center px-3">
              <p className="text-main-dark text-[18px] leading-[140%] font-semibold tracking-[-0.36px]">
                기본금
              </p>
            </section>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <LevelCard level="L1" />
                <LevelCard level="L2" />
                <LevelCard level="L3" />
              </div>
              <p className="text-gray-70 text-heading3-m mt-3 text-left">
                *레벨 업 기준은 시안 제출 횟수, 최종 시안으로 선정 횟수입니다
              </p>
            </div>
          </div>
          <PlusIcon className="text-main-main size-8 self-center" />
          <div className="flex flex-row items-start justify-start gap-2">
            <section className="bg-purple-5 rounded-8 flex h-89.25 w-fit items-center justify-center px-3">
              <p className="text-main-dark text-[18px] leading-[140%] font-semibold tracking-[-0.36px]">
                조건부
                <br />
                추가금
              </p>
            </section>
            <div className="flex flex-col gap-2">
              <ExtraFeeCard type="adoption" />
              <ExtraFeeCard type="revision" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardSection;
