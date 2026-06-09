import Button from "@/shared/ui/Button";
import Thumbnail from "@/shared/ui/Thumbnail";

const DraftCard = () => {
  return (
    <div className="border-gray-30 rounded-12 w-full border-[1.5px] bg-white p-4">
      <div className="flex justify-between pb-6">
        <span className="text-gray-70 text-body1-sb">시안 1</span>
        <Button variant="choose" className="w-fit">
          이 디자인으로 할게요
        </Button>
      </div>
      <Thumbnail className="h-63.75 w-62.5" />
    </div>
  );
};

export default DraftCard;
