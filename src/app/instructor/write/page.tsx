import StepHeader from "@/components/instructor/write/StepHeader";
import CategorySection from "@/container/instructor/write/CategorySection";
import SizeSection from "@/container/instructor/write/SizeSection";
import { WriteFormProvider } from "@/context/WriteFormContext";

const page = () => {
  return (
    <div className="bg-gray-10 min-h-screen">
      <StepHeader />
      <WriteFormProvider>
        <div className="flex flex-col gap-10 pt-15 pr-30 pl-29">
          <CategorySection />
          <SizeSection />
        </div>
      </WriteFormProvider>
    </div>
  );
};

export default page;
