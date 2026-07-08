import Image, { type StaticImageData } from "next/image";

interface DesignerDraftProps {
  image: StaticImageData;
  alt: string;
}

const DesignerDraft = ({ image, alt }: DesignerDraftProps) => {
  return (
    <div className="bg-gray-10 h-105 w-74.5 overflow-hidden">
      <Image src={image} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default DesignerDraft;
