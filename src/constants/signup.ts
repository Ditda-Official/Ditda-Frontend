/* =========================
    공통
    ========================= */
export const SIGNUP_MAX_NAME_LENGTH = 5;
export const SIGNUP_MAX_PHONE_NUMBER_LENGTH = 11;

export type SignupTermsItem = {
  id: string;
  label: string;
  modalTitle: string;
  content: string;
};

/* =========================
    디자이너 약관
    ========================= */
export const DESIGNER_TERMS = [
  {
    id: "1",
    label: "디자이너 약관 1",
    modalTitle: "디자이너 약관 제목 1",
    content: "디자이너약관1디자이너약관1디자이너약관1",
  },
  {
    id: "2",
    label: "디자이너 약관 2",
    modalTitle: "디자이너 약관 제목 2",
    content: "디자이너약관2디자이너약관2디자이너약관2디자이너약관2",
  },
  {
    id: "3",
    label: "디자이너 약관 3",
    modalTitle: "디자이너 약관 제목 3",
    content: "디자이너약관3디자이너약관3디자이너약관3디자이너약관3디자이너약관3",
  },
  {
    id: "4",
    label: "디자이너 약관 4",
    modalTitle: "약관 제목 4",
    content: "디자이너약관4디자이너약관4디자이너약관4디자이너약관4디자이너약관4",
  },
] as const satisfies readonly SignupTermsItem[];

export type DesignerTermsId = (typeof DESIGNER_TERMS)[number]["id"];

/* =========================
    강사 약관
    ========================= */
export const INSTRUCTOR_TERMS = [
  {
    id: "1",
    label: "강사 약관 1",
    modalTitle: "강사 약관 제목 1",
    content: "강사약관1강사약관1강사약관1강사약관1강사약관1강사약관1강사약관1강사약관1강사약관1",
  },
  {
    id: "2",
    label: "강사 약관 2",
    modalTitle: "강사 약관 제목 3",
    content: "강사약관2강사약관2강사약관2강사약관2강사약관2강사약관2강사약관2강사약관2강사약관2",
  },
  {
    id: "3",
    label: "강사 약관 3",
    modalTitle: "강사 약관 제목 3",
    content:
      "강사약관3강사약관3강사약관3강사약관3강사약관3강사약관3강사약관3강사약관3강사약관3강사약관3",
  },
  {
    id: "4",
    label: "강사 약관 4",
    modalTitle: "강사 약관 제목 4",
    content: "강사약관4강사약관4강사약관4강사약관4강사약관4강사약관4강사약관4강사약관4강사약관4",
  },
] as const satisfies readonly SignupTermsItem[];

export type InstructorTermsId = (typeof INSTRUCTOR_TERMS)[number]["id"];
