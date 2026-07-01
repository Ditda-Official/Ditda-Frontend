import { cookies } from "next/headers";

import { MyInfoSection, PaymentHistorySection } from "@/widgets/designer/my";

const page = async () => {
  const cookieStore = await cookies();
  const name = cookieStore.get("userName")?.value ?? "";
  const displayName = name;

  return (
    <div className="mx-auto flex w-275 flex-col items-start gap-10 pt-10 pb-14">
      <h1 className="text-title2-sb w-full text-left text-black">마이페이지</h1>
      <div className="flex w-full flex-col gap-8">
        <MyInfoSection name={displayName} />
        <PaymentHistorySection />
      </div>
    </div>
  );
};

export default page;
