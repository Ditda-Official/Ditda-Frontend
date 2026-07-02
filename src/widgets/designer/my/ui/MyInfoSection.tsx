import { ProfileCircleIcon } from "@/shared/assets/icons";

const designerLEVEL = {
  level: "Lv.3",
  experience: "563/1000",
};

const designerStats = [
  { label: "수입", value: "34,343,000원" },
  { label: "외주 경험", value: "53회" },
  { label: "당첨률", value: "75%" },
];

interface MyInfoSectionProps {
  name: string;
}

const MyInfoSection = ({ name }: MyInfoSectionProps) => {
  return (
    <section className="w-full">
      <div className="rounded-t-12 flex items-center bg-purple-50 px-6 py-5">
        <div className="flex items-center gap-4">
          <ProfileCircleIcon className="size-8 shrink-0 text-white" />
          <div className="flex items-center gap-2">
            <p className="text-heading2-sb text-white">{name}</p>
            <div className="flex items-center gap-1">
              <p className="text-heading3-m text-gray-10">{designerLEVEL.level}</p>
              <p className="text-body2-m text-gray-10">({designerLEVEL.experience})</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-b-12 flex items-center bg-white px-16 py-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center px-12">
            <div className="flex items-center gap-14">
              <p className="text-body2-m text-gray-70">{designerStats[0].label}</p>
              <p className="text-heading3-sb text-gray-80">{designerStats[0].value}</p>
            </div>
          </div>
          <div className="border-gray-30 self-stretch border-l" />
          <div className="flex items-center justify-center gap-14 px-20.5">
            <p className="text-body2-m text-gray-70">{designerStats[1].label}</p>
            <p className="text-heading3-sb text-gray-80">{designerStats[1].value}</p>
          </div>
          <div className="border-gray-30 self-stretch border-l" />
          <div className="flex items-center justify-center gap-14 px-20.5">
            <p className="text-body2-m text-gray-70">{designerStats[2].label}</p>
            <p className="text-heading3-sb text-gray-80">{designerStats[2].value}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyInfoSection;
