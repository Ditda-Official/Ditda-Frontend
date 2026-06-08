import { RevisionRequestSection } from "@/widgets/instructor/revision";

const page = () => {
  return (
    <div className="mx-auto flex w-235 flex-col items-center pt-16">
      <h1 className="text-title2-sb w-full py-4 pb-8 text-left text-black">YBM 영어 교재</h1>
      <RevisionRequestSection />
    </div>
  );
};

export default page;
