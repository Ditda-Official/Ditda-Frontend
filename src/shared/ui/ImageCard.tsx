type ImageCardProps = {
  label?: string;
};

const ImageCard = ({ label }: ImageCardProps) => {
  return (
    <div className="flex shrink-0 flex-col gap-2">
      <div className="border-gray-30 rounded-8 bg-gray-10 h-70 w-50 border"></div>
      {label && <p className="text-caption1-m text-gray-70 text-center">{label}</p>}
    </div>
  );
};

export default ImageCard;
