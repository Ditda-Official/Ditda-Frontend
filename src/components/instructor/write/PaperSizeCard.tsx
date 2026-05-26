const PAPER_SIZES = [
  { label: "A4", sizeClassName: "w-24 h-34.5" },
  { label: "국배판", sizeClassName: "w-21 h-29.75" },
  { label: "B5", sizeClassName: "w-17 h-24.25" },
  { label: "A5", sizeClassName: "w-14.75 h-20.75" },
];

const PaperSizeCard = () => {
  return (
    <div className="rounded-8 border-gray-20 flex w-fit items-end gap-3 border bg-white px-13.5 py-6.75">
      {PAPER_SIZES.map(({ label, sizeClassName }) => (
        <div key={label} className={`shrink-0 bg-[#D9D9D9] ${sizeClassName}`} />
      ))}
    </div>
  );
};

export default PaperSizeCard;
