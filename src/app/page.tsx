import Header from "@/shared/ui/Header";
import { DescriptionSection, ServiceIntroductionSection, TitleSection } from "@/widgets/landing";

const Page = () => {
  return (
    <>
      <Header variant="landing" />
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <TitleSection />
        <DescriptionSection />
        <ServiceIntroductionSection />
      </div>
    </>
  );
};

export default Page;
