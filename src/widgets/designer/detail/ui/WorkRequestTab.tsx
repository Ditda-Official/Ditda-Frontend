import Chip from "@/shared/ui/Chip";
import TextField from "@/shared/ui/input/TextField";

const REQUIRED_PAGES = [
  "강사 프로필",
  "저자의 말",
  "목차",
  "단원 시작 간지",
  "개념 설명",
  "대표 유형",
  "문제 풀이",
  "노트",
  "표지",
] as const;

type WorkRequest = {
  requiredPages: string[];
  pageRequests: { title: string; value: string; placeholder: string }[];
};

interface WorkRequestTabProps {
  workRequest: WorkRequest;
}

const WorkRequestTab = ({ workRequest }: WorkRequestTabProps) => {
  const requiredPageSet = new Set(workRequest.requiredPages);

  return (
    <div className="flex flex-col items-start gap-7">
      <section className="flex w-full flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-heading2-sb text-gray-90">필수 페이지</h3>
          <p className="text-body2-m text-gray-70">
            작업물에 필수적으로 들어가야 할 페이지 및 레이아웃입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {REQUIRED_PAGES.map(page => (
            <Chip
              key={page}
              label={page}
              className="w-fit"
              isSelected={requiredPageSet.has(page)}
              disableHover
            />
          ))}
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-8">
        <h3 className="text-heading2-sb text-gray-90">레이아웃 및 디자인 요청사항</h3>
        <div className="grid w-full grid-cols-2 gap-6">
          {workRequest.pageRequests.map(({ title, value, placeholder }) => (
            <div key={title} className="flex flex-col gap-2">
              <p className="text-body1-sb text-gray-80">{title}</p>
              <TextField
                readOnly
                maxLength={150}
                value={value}
                placeholder={placeholder}
                variant="white"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkRequestTab;
