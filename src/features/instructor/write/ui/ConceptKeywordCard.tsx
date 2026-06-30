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
    <div className="flex flex-col gap-4 bg-white">
      <h1 className="text-gray-80 text-body2-sb">{title}</h1>
      <div className="flex w-full flex-col gap-2">
        {keywords.map(keyword => (
          <Chip
            key={keyword}
            label={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onClick={() => onSelect(keyword)}
            variant="long"
            className="w-35"
          />
        ))}
      </div>
    </div>
  );
};

export default ConceptKeywordCard;
