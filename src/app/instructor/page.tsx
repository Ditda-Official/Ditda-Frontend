import {
  DraftSubmissionStatusSection,
  MatchingCommissionsSection,
  ModifyingCommissionsSection,
} from "@/widgets/instructor/home";

const page = () => {
  return (
    <div className="mx-auto flex w-275 flex-col items-center gap-10 pt-10 pb-14">
      <h1 className="text-gray-90 text-heading1-sb w-full text-left">다현님, 어서오세요!</h1>
      <DraftSubmissionStatusSection />
      <div className="flex w-full flex-row gap-5">
        <MatchingCommissionsSection />
        <ModifyingCommissionsSection />
      </div>
    </div>
  );
};

export default page;
