import StepHeader from "@/components/instructor/write/StepHeader";
import CategorySection from "@/container/instructor/write/CategorySection";
import DesignConceptSection from "@/container/instructor/write/DesignConceptSection";
import SizeSection from "@/container/instructor/write/SizeSection";
import { WriteFormProvider } from "@/context/WriteFormContext";

const page = () => {
  return (
    <div className="bg-gray-10 min-h-screen pt-16">
      <div className="sticky top-0 z-10">
        <StepHeader />
      </div>
      <WriteFormProvider>
        <div className="flex flex-col gap-10 pt-15 pr-30 pb-30 pl-29">
          <CategorySection />
          <SizeSection />
          <DesignConceptSection />
        </div>
      </WriteFormProvider>
    </div>
  );
};

export default page;
