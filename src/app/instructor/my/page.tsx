import { CommissionsHistorySection, MyInfoSection } from "@/widgets/instructor/my";

const page = () => {
  return (
    <div className="mx-auto flex w-212.75 flex-col items-center pt-15">
      <h1 className="text-title2-sb w-full pb-10 text-left text-black">마이페이지</h1>
      <div className="flex flex-col gap-8">
        <MyInfoSection />
        <CommissionsHistorySection />
      </div>
    </div>
  );
};

export default page;
