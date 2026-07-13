import type { DesignerCommissionDetail } from "@/widgets/designer/detail/ui/CommissionDetailSection";

export const designerDetailCommissions: DesignerCommissionDetail[] = [
  {
    id: 1,
    title: "수학의 정석 - 한석원",
    firstDraftDeadline: "2026.05.09 11:59pm",
    finalDeadline: "2026.05.30 11:59pm",
    category: "교재 외지 / 내지",
    size: "A4 (210×297mm)",
    selectedConcepts: ["입체감 있는", "정돈된", "밝은"],
    additionalRequest:
      "이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요. 핵심 개념이 눈에 잘 들어오도록 여백은 충분히 두고, 표지는 수학 문제집다운 신뢰감이 느껴졌으면 합니다.",
    colors: [
      { role: "Main", code: "#A379FC", background: "#F3F5F7" },
      { code: "#A379FC", background: "#FFF2F5" },
      { code: "#A379FC", background: "#E0EEFF" },
    ],
    requiredPages: ["강사 프로필", "저자의 말", "문제 풀이"],
    pageRequests: [
      {
        title: "강사 프로필 레이아웃",
        value: "강사 사진과 약력을 좌우 2단으로 구성해주세요.",
        placeholder: "자유롭게 해주세요",
      },
      {
        title: "단원 시작 간지 레이아웃",
        value: "예) 2단으로 구성해주세요",
        placeholder: "예) 2단으로 구성해주세요",
      },
      {
        title: "개념 설명 레이아웃",
        value: "",
        placeholder: "예) 2단으로 구성해주세요",
      },
    ],
    materialImages: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
    materialInfo:
      "이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요. 첨부 자료의 톤을 우선 참고하고, 실제 작업물에서는 정보 위계가 더 명확하게 보이도록 정리해주세요.",
    referenceImages: ["/images/thumbnail_mock.jpg", "/images/thumbnail_mock.jpg"],
    referenceInfo:
      "이건 이게 좋고요 저건 저게 좋고 이것은 이렇게 이렇게 해주세요. 레퍼런스의 색 대비와 타이포 리듬을 참고하되 그대로 복제하지 않고 새로운 방향으로 풀어주세요.",
    basePrice: "40,000원",
    maxReward: "320,000원",
  },
];
