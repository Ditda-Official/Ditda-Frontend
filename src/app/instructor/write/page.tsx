import StepHeader from "@/components/instructor/write/StepHeader";
import CategorySection from "@/container/instructor/write/CategorySection";

const page = () => {
  return (
    <div className="bg-gray-10 min-h-screen">
      <StepHeader />
      <div className="flex flex-col gap-10 pt-15 pr-30 pl-29">
        <CategorySection />
      </div>
    </div>
  );
};

export default page;
