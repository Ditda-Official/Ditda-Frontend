import { mockApi } from "../utils/mockApi";

export const DETAIL_PATH = (commissionId: string | number) => `/api/v1/commissions/${commissionId}`;

export const mockCommissionDetail = (commissionId: string | number) =>
  mockApi(DETAIL_PATH(commissionId), {
    result: {
      commissionId: Number(commissionId),
      title: "수학의 정석 외주",
      category: "FLYER_TEXTBOOK_COVER_INNER",
      status: "IN_PROGRESS",
      designInfo: {
        pageSize: "A4",
        concepts: ["MUTED", "ORDERLY"],
        additionalConcept: "심플하게 부탁드려요",
        colorSelectionMode: "USER_SELECTED",
        colors: [
          { role: "MAIN", colorCode: "#FF0000" },
          { role: "SUB1", colorCode: "#00FF00" },
        ],
      },
      categoryDetail: {
        textbookName: "수학의 정석",
        instructorName: "홍길동",
        subject: "수학",
        requiredPages: [
          { pageType: "COVER", description: "심플한 표지로 부탁드려요" },
          { pageType: "TABLE_OF_CONTENTS", description: "" },
        ],
      },
      files: [
        {
          fileKind: "MATERIAL",
          fileUrls: ["/images/thumbnail_mock.jpg"],
          description: "자료 설명입니다",
        },
        { fileKind: "REFERENCE", fileUrls: [], description: "" },
      ],
      dateInfo: {
        applicationDeadline: "2026-07-20",
        firstDraftDeadline: "2026-08-01",
        finalDeadline: "2026-08-15",
      },
      priceInfo: null,
      applied: null,
    },
  });
