import PaperSizeCard from "@/container/instructor/write/PaperSizeCard";

const SizeSection = () => {
  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col gap-8 border border-transparent bg-white p-6">
      <div>
        <h1 className="text-gray-90 text-heading1-sb pb-2">사이즈</h1>
        <h2 className="text-gray-70 text-body2-m">진행할 작업물의 사이즈를 선택해주세요</h2>
      </div>
      <PaperSizeCard />
    </div>
  );
};

export default SizeSection;
