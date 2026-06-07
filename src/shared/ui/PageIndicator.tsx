interface PageIndicatorProps {
  total: number;
  current: number;
}

const PageIndicator = ({ total, current }: PageIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`size-2 rounded-full transition-colors duration-300 ${i === current ? "bg-gray-700" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;
