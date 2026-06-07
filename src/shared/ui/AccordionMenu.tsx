import { ArrowDownIcon } from "@/shared/assets/icons";

interface AccordionMenuProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const AccordionMenu = ({ label, selected = false, onClick }: AccordionMenuProps) => {
  return (
    <div
      className="rounded-8 flex w-fit cursor-pointer flex-row items-center p-1 pr-0"
      onClick={onClick}
    >
      <p className={`text-body1-sb ${selected ? "text-main-main" : "text-gray-90"}`}>{label}</p>
      <ArrowDownIcon
        className={`size-6 transition-transform duration-200 ${selected ? "text-main-main rotate-180" : "text-gray-70"}`}
      />
    </div>
  );
};

export default AccordionMenu;
