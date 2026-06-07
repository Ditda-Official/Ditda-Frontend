/* =========================
    공통
    ========================= */
export const SIGNUP_MAX_NAME_LENGTH = 5;
export const SIGNUP_MAX_PHONE_NUMBER_LENGTH = 11;
export const SIGNUP_MIN_ID_LENGTH = 6;
export const SIGNUP_MAX_ID_LENGTH = 20;
export const SIGNUP_ID_LENGTH_ERROR_MESSAGE = "6~20자로 아이디를 입력해주세요";
export const SIGNUP_MIN_PASSWORD_LENGTH = 8;
export const SIGNUP_MAX_PASSWORD_LENGTH = 20;
export const SIGNUP_PASSWORD_ERROR_MESSAGE =
  "8~20자의 영문,숫자를 모두 포함한 비밀번호를 입력해주세요";
export const SIGNUP_PASSWORD_CONFIRM_ERROR_MESSAGE = "비밀번호가 일치하지 않습니다";
export const SIGNUP_PASSWORD_CONFIRM_FORMAT_ERROR_MESSAGE = "비밀번호가 형식에 맞지 않습니다";
export const SIGNUP_ID_DUPLICATED_ERROR_MESSAGE = "이미 존재하는 아이디입니다";
export const SIGNUP_ID_AVAILABLE_MESSAGE = "사용 가능한 아이디입니다";
export const SIGNUP_EMAIL_ERROR_MESSAGE = "형식이 올바르지 않습니다";
export const SIGNUP_EMAIL_VERIFICATION_CODE_ERROR_MESSAGE = "인증번호가 일치하지 않습니다";
export const SIGNUP_EMAIL_VERIFICATION_LIMIT_SECONDS = 5 * 60;
export const SIGNUP_MOCK_EMAIL_VERIFICATION_CODE = "1234";
export const SIGNUP_MOCK_ACCOUNT = {
  id: "test1234",
  password: "test1234",
} as const;
export const SIGNUP_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================
    은행 선택
    ========================= */
export const BANK_DROPDOWN_VISIBLE_COUNT = 5;
export const BANK_DROPDOWN_OPTION_HEIGHT = 56;
export const BANK_DROPDOWN_MAX_HEIGHT = BANK_DROPDOWN_VISIBLE_COUNT * BANK_DROPDOWN_OPTION_HEIGHT;

export const BANK_OPTIONS = [
  { code: "TOSS", name: "토스뱅크" },
  { code: "KAKAO", name: "카카오뱅크" },
  { code: "KOOKMIN", name: "국민은행" },
  { code: "IBK", name: "기업은행" },
  { code: "NH", name: "농협은행" },
  { code: "SHINHAN", name: "신한은행" },
  { code: "IM", name: "iM뱅크" },
  { code: "WOORI", name: "우리은행" },
  { code: "CITI", name: "한국시티은행" },
  { code: "HANA", name: "하나은행" },
  { code: "SAVINGS", name: "저축은행" },
  { code: "SAEMAUL", name: "새마을금고" },
  { code: "SHINHYUP", name: "신협" },
  { code: "POST_OFFICE", name: "우체국" },
] as const;

export type BankOption = (typeof BANK_OPTIONS)[number];
export type BankCode = BankOption["code"];
export type BankName = BankOption["name"];

export const BANK_API_MAP = Object.fromEntries(
  BANK_OPTIONS.map(({ code, name }) => [name, code]),
) as Record<BankName, BankCode>;

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
] as const;

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
] as const;
