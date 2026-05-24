import StepHeader from "@/components/instructor/write/StepHeader";
import CategorySection from "@/container/instructor/write/CategorySection";
import SizeSection from "@/container/instructor/write/SizeSection";

const page = () => {
  return (
    <div className="bg-gray-10 min-h-screen">
      <StepHeader />
      <div className="flex flex-col gap-10 pt-15 pr-30 pl-29">
        <CategorySection />
        <SizeSection />
      </div>
    </div>
  );
};

export default page;
