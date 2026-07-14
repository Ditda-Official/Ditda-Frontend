import { getMyInfo } from "@/features/designer/my/api/my";
import { MyInfoSection, PaymentHistorySection } from "@/widgets/designer/my";

export const dynamic = "force-dynamic";

const page = async () => {
  const myInfo = await getMyInfo();

  return (
    <div className="mx-auto flex w-275 flex-col items-start gap-10 pt-10 pb-14">
      <h1 className="text-title2-sb w-full text-left text-black">마이페이지</h1>
      <div className="flex w-full flex-col gap-8">
        {myInfo != null && <MyInfoSection {...myInfo} />}
        <PaymentHistorySection />
      </div>
    </div>
  );
};

export default page;
