import DraftSubmissionStatusSection from "@/containers/instructor/home/DraftSubmissionStatusSection";

const page = () => {
  return (
    <div className="bg-gray-10">
      <div className="mx-auto flex w-275 flex-col items-center justify-center gap-10">
        <h1 className="text-gray-90 text-heading1-sb w-full text-left">다현님, 어서오세요!</h1>
        <DraftSubmissionStatusSection />
      </div>
    </div>
  );
};

export default page;
