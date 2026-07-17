import { cookies } from "next/headers";

import {
  getAnnouncements,
  getDraftSubmissions,
  getRevisions,
} from "@/features/designer/home/api/home";
import {
  DraftSubmissionScheduleSection,
  ModifyingCommissionsSection,
  PresentationWaitingSection,
} from "@/widgets/designer/home";

export const dynamic = "force-dynamic";

const page = async () => {
  const cookieStore = await cookies();
  const name = cookieStore.get("userName")?.value ?? "";
  const [draftSubmissions, announcements, revisions] = await Promise.all([
    getDraftSubmissions(),
    getAnnouncements(),
    getRevisions(),
  ]);

  return (
    <div className="mx-auto flex w-275 flex-col items-center gap-10 pt-10 pb-16">
      <h1 className="text-gray-90 text-heading1-sb w-full text-left">{name}님, 어서오세요!</h1>
      <div className="flex w-full flex-col gap-8">
        <DraftSubmissionScheduleSection items={draftSubmissions} />
        <div className="flex w-full flex-row justify-between gap-5">
          <PresentationWaitingSection items={announcements} />
          <ModifyingCommissionsSection items={revisions} />
        </div>
      </div>
    </div>
  );
};

export default page;
