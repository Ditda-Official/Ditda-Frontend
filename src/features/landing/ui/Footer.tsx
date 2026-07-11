import { WhiteLogo } from "@/shared/assets/logos";
import Button from "@/shared/ui/Button";

const handleDownload = (fileUrl: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  link.click();
};

const Footer = () => {
  return (
    <footer className="bg-gray-80 flex items-center justify-between px-40 py-12">
      <WhiteLogo className="h-8 w-25.25" />
      <div className="flex flex-row gap-20">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-gray-40 text-body2-m pb-1">Instagram</p>
            <p className="text-[18px] leading-[150%] font-semibold tracking-[-0.36px] text-white">
              @ditda_design
            </p>
          </div>
          <div>
            <p className="text-gray-40 text-body2-m pb-1">Email</p>
            <p className="text-[18px] leading-[150%] font-semibold tracking-[-0.36px] text-white">
              ditta.contact@gmail.com
            </p>
          </div>
        </div>
        <div className="flex w-61.5 shrink-0 flex-col gap-1 whitespace-nowrap">
          <p className="text-gray-40 text-body2-m">서비스 소개서</p>
          <Button
            variant="medium_secondary"
            onClick={() =>
              handleDownload(
                "/files/service_intro_instructor.pdf",
                "ditda_강사용_서비스_소개서.pdf",
              )
            }
          >
            강사용 서비스 소개서 다운로드
          </Button>
          <Button
            variant="medium_secondary"
            onClick={() =>
              handleDownload(
                "/files/service_intro_designer.pdf",
                "ditda_디자이너용_서비스_소개서.pdf",
              )
            }
          >
            디자이너용 서비스 소개서 다운로드
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
