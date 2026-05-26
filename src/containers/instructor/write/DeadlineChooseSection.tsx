import DropdownBox from "@/components/common/dropdown/DropdownBox";

const DeadlineChooseSection = () => {
  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-90 text-heading1-sb">마감 기한 선택</h1>
        <h2 className="text-gray-70 text-body2-m">시안을 수령할 날짜를 선택해주세요</h2>
      </div>
      <div className="flex flex-row gap-6">
        <DropdownBox />
        <DropdownBox />
      </div>
    </div>
  );
};

export default DeadlineChooseSection;
