import Image from "next/image";

import { LEVEL_DISPLAY_MAP, type MyInfo } from "@/features/designer/my";
import { ProfileCircleIcon } from "@/shared/assets/icons";

type MyInfoSectionProps = MyInfo;

const MyInfoSection = ({ name, profileImageUrl, levelInfo, stats }: MyInfoSectionProps) => {
  const experience =
    levelInfo.level === "LEVEL_3" ? "MAX" : `${levelInfo.exp}/${levelInfo.requiredExp}`;

  return (
    <section className="w-full">
      <div className="rounded-t-12 flex items-center bg-purple-50 px-6 py-5">
        <div className="flex items-center gap-4">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="프로필"
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <ProfileCircleIcon className="size-8 shrink-0 text-white" />
          )}
          <div className="flex items-center gap-2">
            <p className="text-heading2-sb text-white">{name}</p>
            <div className="flex items-center gap-1">
              <p className="text-heading3-m text-gray-10">{LEVEL_DISPLAY_MAP[levelInfo.level]}</p>
              <p className="text-body2-m text-gray-10">({experience})</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-b-12 flex items-center bg-white px-16 py-6">
        <div className="flex w-full items-center justify-between whitespace-nowrap">
          <div className="flex items-center px-12">
            <div className="flex items-center gap-14">
              <p className="text-body2-m text-gray-70">수입</p>
              <p className="text-heading3-sb text-gray-80">{stats.income.toLocaleString()}원</p>
            </div>
          </div>
          <div className="border-gray-30 self-stretch border-l" />
          <div className="flex items-center justify-center gap-14 px-20.5">
            <p className="text-body2-m text-gray-70">외주 경험</p>
            <p className="text-heading3-sb text-gray-80">{stats.submittedDraftCount}회</p>
          </div>
          <div className="border-gray-30 self-stretch border-l" />
          <div className="flex items-center justify-center gap-14 px-20.5">
            <p className="text-body2-m text-gray-70">당첨률</p>
            <p className="text-heading3-sb text-gray-80">{stats.winRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyInfoSection;
