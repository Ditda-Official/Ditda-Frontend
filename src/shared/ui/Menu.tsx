interface MenuProps {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

const Menu = ({ label, selected, onClick }: MenuProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-body1-m flex w-full cursor-pointer items-center justify-center border-b-2 px-6 py-3 transition-colors duration-200 ${
        selected ? "text-body1-sb text-gray-90 border-gray-80" : "text-gray-70 border-transparent"
      }`}
    >
      {label}
    </button>
  );
};

export default Menu;
