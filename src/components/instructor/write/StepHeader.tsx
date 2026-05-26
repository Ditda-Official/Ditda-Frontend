import ProgressBar from "@/components/instructor/write/ProgressBar";

const StepHeader = () => {
  return (
    <header className="bg-gray-10 flex w-full justify-between px-30 py-4">
      <p className="text-title2-sb text-black">새 외주 작성</p>
      <ProgressBar />
    </header>
  );
};

export default StepHeader;
