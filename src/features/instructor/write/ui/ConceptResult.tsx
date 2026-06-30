import Chip from "@/shared/ui/Chip";

interface ConceptResultProps {
  selectedKeywords: string[];
  onRemove: (keyword: string) => void;
}

const ConceptResult = ({ selectedKeywords, onRemove }: ConceptResultProps) => {
  return (
    <div className="rounded-12 bg-gray-5 flex h-12.5 flex-row gap-8 px-4 py-2">
      <p className="text-gray-80 text-body1-m flex items-center">선택한 컨셉</p>
      <div className="flex flex-row flex-wrap gap-2">
        {selectedKeywords.map(keyword => (
          <Chip
            key={keyword}
            label={keyword}
            variant="removable"
            onRemove={() => onRemove(keyword)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConceptResult;
