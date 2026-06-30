import { cookies } from "next/headers";

import { CommissionsHistorySection, MyInfoSection } from "@/widgets/instructor/my";

const page = async () => {
  const cookieStore = await cookies();
  const name = cookieStore.get("userName")?.value ?? "";
  const profileImageUrl = cookieStore.get("userProfileImageUrl")?.value;

  return (
    <div className="mx-auto flex w-212.75 flex-col items-center pt-15">
      <h1 className="text-title2-sb w-full pb-10 text-left text-black">마이페이지</h1>
      <div className="flex flex-col gap-8">
        <MyInfoSection name={name} profileImageUrl={profileImageUrl} />
        <CommissionsHistorySection />
      </div>
    </div>
  );
};

export default page;
