import { EXTRA_FEE_CONTENT, type ExtraFeeType } from "@/features/landing/config/extraFee";
import { CheckIcon } from "@/shared/assets/icons";

const ExtraFeeCard = ({ type }: { type: ExtraFeeType }) => {
  const { question, label, price, note } = EXTRA_FEE_CONTENT[type];

  return (
    <div className="border-gray-30 rounded-8 relative h-43.75 w-121 border px-6 py-10">
      <div className="rounded-2 bg-green-bright mb-10 flex w-fit flex-row">
        <CheckIcon className="text-green-main size-6" />
        <p className="text-heading2-m pr-2 pl-1 text-black">{question}</p>
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-end gap-1">
          <span className="text-gray-90 text-heading2-sb">{label}</span>
          <span className="text-gray-70 text-caption1-m py-0.5">제공</span>
        </div>
        <div className="relative flex w-41.5 items-center">
          <div className="extra-fee-line-gradient h-px w-full" />
          <span className="bg-purple-30 absolute right-0 size-1.5 rounded-full" />
        </div>
        <p className="text-heading2-sb relative text-black">
          {price}
          {note && (
            <span className="text-gray-60 text-caption1-m absolute top-full right-0 mt-1 whitespace-nowrap">
              {note}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ExtraFeeCard;
