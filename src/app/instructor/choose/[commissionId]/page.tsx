import { DraftCheckSection } from "@/widgets/instructor/choose";

const page = () => {
  return (
    <div className="mx-auto flex w-235 flex-col items-center pt-16">
      <h1 className="text-title2-sb mb-6.5 w-full py-4 text-left text-black">YBM 영어 교재</h1>
      <DraftCheckSection />
    </div>
  );
};

export default page;
