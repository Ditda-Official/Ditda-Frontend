import Image from "next/image";

type ImageCardProps = {
  url: string;
  label?: string;
};

const ImageCard = ({ url, label }: ImageCardProps) => {
  return (
    <div className="flex shrink-0 flex-col gap-2">
      <div className="border-gray-30 rounded-8 bg-gray-10 relative h-70 w-50 overflow-hidden border">
        <Image src={url} alt={label ?? ""} fill sizes="200px" className="object-cover" />
      </div>
      {label && <p className="text-caption1-m text-gray-70 text-center">{label}</p>}
    </div>
  );
};

export default ImageCard;
