import Chip from "@/shared/ui/Chip";

interface ConceptKeywordCardProps {
  title: string;
  keywords: string[];
  selectedKeywords: string[];
  onSelect: (keyword: string) => void;
}

const ConceptKeywordCard = ({
  title,
  keywords,
  selectedKeywords,
  onSelect,
}: ConceptKeywordCardProps) => {
  return (
    <div className="rounded-20 border-gray-20 flex h-51 w-30 flex-col gap-6 border bg-white px-4 pt-4 pb-3">
      <h1 className="text-gray-80 text-body2-sb">{title}</h1>
      <div className="flex w-full flex-col items-start gap-2">
        {keywords.map(keyword => (
          <Chip
            key={keyword}
            label={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onClick={() => onSelect(keyword)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConceptKeywordCard;
