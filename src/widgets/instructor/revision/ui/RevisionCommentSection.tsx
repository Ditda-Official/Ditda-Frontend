import TextField from "@/shared/ui/input/TextField";

interface RevisionCommentSectionProps {
  comments: Record<string, string>;
  onChangeComment: (category: string, value: string) => void;
  selectedCategories: string[];
}

const RevisionCommentSection = ({
  comments,
  onChangeComment,
  selectedCategories,
}: RevisionCommentSectionProps) => {
  if (selectedCategories.length === 0) {
    return null;
  }

  return (
    <div className="rounded-12 flex flex-col gap-8 bg-white p-6">
      {selectedCategories.map(category => (
        <div key={category} className="flex flex-col gap-2">
          <p className="text-gray-70 text-body1-sb">{category}</p>
          <TextField
            placeholder="원하는 수정방향성을 적어주세요."
            value={comments[category] ?? ""}
            onChange={event => onChangeComment(category, event.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default RevisionCommentSection;
