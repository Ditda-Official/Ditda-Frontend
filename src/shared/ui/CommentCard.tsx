interface CommentCardProps {
  title: string;
  comment: string;
}

const CommentCard = ({ title, comment }: CommentCardProps) => {
  return (
    <div className="bg-purple-5 border-purple-10 rounded-12 flex w-full flex-col gap-2.5 border px-6 py-4">
      <h1 className="text-main-main text-body1-sb">{title}</h1>
      <h2 className="text-gray-80 text-body2-r scrollbar-hide h-16.5 overflow-y-auto">{comment}</h2>
    </div>
  );
};

export default CommentCard;
