import { getMyInfo } from "@/features/instructor/my/api/my";
import { CommissionsHistorySection, MyInfoSection } from "@/widgets/instructor/my";

export const dynamic = "force-dynamic";

const page = async () => {
  const myInfo = await getMyInfo();

  return (
    <div className="mx-auto flex w-275 flex-col items-center pt-15">
      <h1 className="text-title2-sb w-full pb-10 text-left text-black">마이페이지</h1>
      <div className="flex flex-col gap-8">
        {myInfo != null && <MyInfoSection {...myInfo} />}
        <CommissionsHistorySection />
      </div>
    </div>
  );
};

export default page;
