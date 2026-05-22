import Button from "@/components/common/Button";

const page = () => {
  return (
    <div className="flex w-100 flex-col gap-4">
      <Button variant="small_primary">로그인</Button>
      <Button variant="small_secondary">로그인</Button>
      <Button variant="small_tertiary">로그인</Button>
      <Button variant="small_disabled">로그인</Button>
    </div>
  );
};

export default page;
