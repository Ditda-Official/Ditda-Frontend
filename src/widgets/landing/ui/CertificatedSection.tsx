import { DesignerDraft } from "@/features/landing";
import draftExample1 from "@/shared/assets/images/landing/draft_example_1.jpg";
import draftExample2 from "@/shared/assets/images/landing/draft_example_2.png";
import draftExample3 from "@/shared/assets/images/landing/draft_example_3.png";
import draftExample4 from "@/shared/assets/images/landing/draft_example_4.png";
import draftExample5 from "@/shared/assets/images/landing/draft_example_5.png";
import draftExample6 from "@/shared/assets/images/landing/draft_example_6.png";
import draftExample7 from "@/shared/assets/images/landing/draft_example_7.png";

const DRAFT_IMAGES = [
  draftExample1,
  draftExample2,
  draftExample3,
  draftExample4,
  draftExample5,
  draftExample6,
  draftExample7,
];

const CertificatedSection = () => {
  return (
    <div className="pt-20.5 pb-33 text-center">
      <h1 className="text-main-main text-heading2-sb pb-3">검증된 디자이너</h1>
      <h2 className="pb-8 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
        실력 검증을 마친 디자이너 20명
        <br />
        이상이 시안 제작을 위해 대기중입니다.
      </h2>
      <p className="text-gray-70 text-heading3-m pb-10">
        학원, 교재, 홍보물에 특화된 디자이너들이 이미 준비되어 있습니다.
      </p>
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max flex-row">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="mr-12 flex flex-row gap-12"
              aria-hidden={groupIndex === 1}
            >
              {DRAFT_IMAGES.map((image, index) => (
                <DesignerDraft key={index} image={image} alt={`디자인 시안 예시 ${index + 1}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificatedSection;
