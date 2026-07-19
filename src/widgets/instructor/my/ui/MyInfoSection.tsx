import Image from "next/image";

import type { MyInfo } from "@/features/instructor/my";
import { ProfileCircleIcon } from "@/shared/assets/icons";

type MyInfoSectionProps = MyInfo;

const MyInfoSection = ({ name, profileImageUrl, stats }: MyInfoSectionProps) => {
  return (
    <div className="w-275">
      <div className="flex flex-row items-center gap-4 rounded-t-xl bg-purple-50 px-6 py-5">
        {profileImageUrl != null ? (
          <Image
            src={profileImageUrl}
            alt="프로필"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <ProfileCircleIcon className="size-8 text-white" />
        )}
        <p className="text-heading2-sb text-white">{name}</p>
      </div>
      <div className="rounded-b-xl bg-white px-30 py-6">
        <div className="flex justify-between">
          <div className="flex w-fit flex-row gap-14 px-20 whitespace-nowrap">
            <p className="text-gray-70 text-body2-m">외주 이용 횟수</p>
            <p className="text-gray-80 text-heading3-sb">{stats.totalCommissionCount}회</p>
          </div>
          <div className="border-gray-30 w-1 border-l" />
          <div className="flex w-fit flex-row gap-14 px-20 whitespace-nowrap">
            <p className="text-gray-70 text-body2-m">진행 중인 외주 건수</p>
            <p className="text-gray-80 text-heading3-sb">{stats.ongoingCommissionCount}건</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoSection;
