import { cookies } from "next/headers";

import {
  DraftSubmissionScheduleSection,
  ModifyingCommissionsSection,
  PresentationWaitingSection,
} from "@/widgets/designer/home";

const page = async () => {
  const cookieStore = await cookies();
  const name = cookieStore.get("userName")?.value ?? "";

  return (
    <div className="mx-auto flex w-275 flex-col items-center gap-10 pt-10 pb-16">
      <h1 className="text-gray-90 text-heading1-sb w-full text-left">{name}님, 어서오세요!</h1>
      <div className="flex w-full flex-col gap-8">
        <DraftSubmissionScheduleSection />
        <div className="flex w-full flex-row justify-between gap-5">
          <PresentationWaitingSection />
          <ModifyingCommissionsSection />
        </div>
      </div>
    </div>
  );
};

export default page;
