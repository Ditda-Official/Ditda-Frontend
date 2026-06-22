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
  디자이너 이용약관
    ========================= */
export type SignupTermContentItem = {
  text: string;
  subItems?: readonly string[];
};

export type SignupTermContentSection = {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly SignupTermContentItem[];
};

export type SignupTermContent = {
  sections: readonly SignupTermContentSection[];
};

const DESIGNER_SERVICE_TERM_CONTENT = {
  sections: [
    {
      heading: "제1조 (목적)",
      paragraphs: [
        "본 약관은 회사가 제공하는 Ditda 서비스에서 시안 제작·제출·정산에 관한 디자이너와 회사 간의 권리·의무를 규정한다.",
      ],
    },
    {
      heading: "제2조 (회원 자격·승인)",
      items: [
        { text: "만 19세 이상 + 본인 명의 이메일·연락처" },
        {
          text: "정산용 은행명·계좌번호·예금주 입력 필수. (정산용 계좌의 미일치 혹은 불법 사항에 대한 모든 책임은 가입자 본인이 진다.)",
        },
      ],
    },
    {
      heading: "제3조 (탈중개화 금지)",
      items: [
        {
          text: "디자이너는 강사 또는 강사로 추정되는 자와 플랫폼 외부에서 직접 거래·연락처 교환·외주 진행을 할 수 없다.",
        },
        {
          text: "위반 시:",
          subItems: [
            "1차: 경고 + 해당 외주 정산 보류",
            "2차: 계정 30일 정지",
            "3차: 영구 정지 + 미정산 금액 환수",
          ],
        },
        { text: "회사는 시안 내부에 연락처·외부 링크 포함 여부를 검수할 수 있다." },
      ],
    },
    {
      heading: "제4조 (시안 제출 의무)",
      items: [
        { text: "매칭 수락 후 마감 기한 내 1차 시안을 제출해야 한다." },
        { text: "제출 형식: PNG 파일 (개당 30MB 이하)" },
        {
          text: "시안에 디자이너 본인의 워터마크·서명·연락처를 포함할 수 없다. 워터마크는 회사가 일괄 적용한다.",
        },
        {
          text: "시안은 본인의 창작물이어야 하며, 타인 저작물·AI 학습 데이터 무단 사용 시 신고·제재 대상이다.",
        },
      ],
    },
    {
      heading: "제5조 (저작권)",
      items: [
        { text: "미채택 시안의 저작권은 디자이너에게 귀속된다." },
        { text: "채택 + 최종 확정된 시안의 저작권은 강사에게 양도된다." },
        { text: "디자이너 본인 포트폴리오 사용은 허용된다." },
      ],
    },
    {
      heading: "제6조 (정산)",
      items: [
        {
          text: "기본금 (보장금) - 정상 시안 제출 + 신고 없는 경우 매칭 외주당 지급, 외주 종료 후 정산",
        },
        {
          text: "채택 인센티브 - 채택 + 최종 확정 시 채택 디자이너에게 추가 지급",
        },
        {
          text: "정산 송금: 회사가 디자이너 등록 계좌로 송금 (영업일 기준 N일 이내)",
        },
        {
          text: "정산 보류 사유:",
          subItems: ["시안 신고 심의 중", "탈중개화 위반 의심", "시안 미제출"],
        },
      ],
    },
    {
      heading: "제7조 (수정 의무)",
      items: [
        {
          text: "채택된 디자이너는 강사의 수정 요청을 마감 기한 내 반영하여 수정본을 제출해야 한다.",
        },
        {
          text: "수정본 제출 후 1회 한도 내 추가 코멘트 작성 가능 (최대 500자, 반영 내용·확인 필요·미반영 사유)",
        },
        { text: "디자이너 사유로 수정 마감 초과 시 - 정산 보류·인센티브 미지급" },
      ],
    },
    {
      heading: "제8조 (신고·제재)",
      items: [
        { text: "강사가 시안에 대해 신고할 수 있다. (표절·저작권 침해·부적절 콘텐츠)" },
        {
          text: "어드민 심의 결과:",
          subItems: [
            "승인: 디자이너 미정산 + 패널티 (다음 외주 후순위 처리·계정 정지 등)",
            "기각: 정상 정산",
          ],
        },
      ],
    },
    {
      heading: "제9조 (디자이너 탈퇴·계정 삭제)",
      items: [
        { text: "진행 중인 외주가 없을 때 탈퇴 가능" },
        { text: "진행 중 외주가 있는 상태에서 탈퇴 시 - 외주 종료까지 보류" },
        { text: "탈퇴 후에도 저작권·정산 의무는 잔존한다" },
      ],
    },
  ],
} as const satisfies SignupTermContent;

/* =========================
  강사 이용약관
    ========================= */
const INSTRUCTOR_SERVICE_TERM_CONTENT = {
  sections: [
    {
      heading: "제1조 (목적)",
      paragraphs: [
        '본 약관은 ditda (이하 "회사")가 제공하는 ditda 서비스(이하 "서비스")의 이용과 관련하여 회사와 강사 회원(이하 "강사") 간의 권리·의무·책임사항을 규정함을 목적으로 한다.',
      ],
    },
    {
      heading: "제2조 (정의)",
      items: [
        {
          text: '"서비스" - 학원 강사가 교재·홍보물 디자인 외주를 등록하고, 다수 디자이너가 시안을 제출하여 강사가 채택하는 1:N 매칭 외주 플랫폼',
        },
        { text: '"외주" - 강사가 등록한 디자인 의뢰 단위' },
        { text: '"시안" - 디자이너가 외주에 대해 제출한 디자인 결과물 (PNG 등)' },
        { text: '"채택 시안" - 강사가 선택한 1건의 시안' },
        { text: '"미채택 시안" - 강사가 선택하지 않은 시안' },
        { text: '"기본금" - 미채택 디자이너가 정상 제출 + 신고 없는 경우 수령하는 기본 금액' },
      ],
    },
    {
      heading: "제3조 (회원 자격)",
      items: [
        { text: "만 19세 이상 + 본인 명의 이메일·연락처로 가입 가능" },
        { text: "사업자 또는 개인 사업자등록 강사 모두 가입 가능" },
      ],
    },
    {
      heading: "제4조 (외주 등록·결제)",
      items: [
        {
          text: "외주 등록 시 카테고리·사이즈·컨셉·색상·레퍼런스·콘텐츠·플랜(3·4·5인)·마감기한을 입력하고, 표시된 결제 금액을 사전 결제한다.",
        },
        { text: "결제는 회사가 지정한 방식(무통장 입금)으로 한다." },
        {
          text: '결제 완료 후 외주는 "매칭 대기열"에 등록되며, 매칭 시작 후 강사 단독 취소는 불가하다. (매칭 미달 시 자동 환불 - 제7조)',
        },
      ],
    },
    {
      heading: "제5조 (시안 채택·수정·확정)",
      items: [
        { text: "디자이너가 1차 시안을 제출하면 강사는 1건을 채택할 수 있다." },
        {
          text: "채택 시안에 대해 강사는 최대 3회 수정 요청을 할 수 있다. (수정 횟수 추가 결제 가능)",
        },
        {
          text: '강사는 수정본 도착 시점부터 N일 내 "최종 확정"을 선택해야 한다. 미선택 시 마감 후 자동 확정된다.',
        },
        {
          text: "최종 확정 후 결과물은 HWP·PNG 확장자로 회사가 전달한다. PDF·INDD 등은 별도 운영자 문의로 처리한다.",
        },
      ],
    },
    {
      heading: "제6조 (저작권 - 핵심 조항)",
      items: [
        {
          text: "채택된 시안의 저작권은 최종 결제·확정 시점에 강사에게 양도된다. 2차 저작물 작성권을 포함한다.",
        },
        { text: "미채택 시안의 저작권은 디자이너에게 귀속된다." },
        {
          text: "강사는 미채택 시안을 다음과 같이 사용할 수 없다:",
          subItems: [
            "다운로드·저장 (서비스 내 뷰어에서만 열람)",
            "복제·캡처·녹화",
            "2차 활용 (인쇄·온라인 게시·SNS 업로드 등)",
          ],
        },
        {
          text: "위반 시 회사는 강사 계정을 즉시 정지하고, 디자이너에게 발생한 손해에 대한 민·형사상 책임이 강사에게 있다.",
        },
        { text: "워터마크·다운로드 차단·우클릭 차단·캡처 차단을 회사가 기술적으로 적용한다." },
      ],
    },
    {
      heading: "제7조 (환불 정책)",
      paragraphs: ["별도의 결제·환불 정책에 따른다."],
    },
    {
      heading: "제8조 (신고·제재)",
      items: [
        { text: "강사는 시안에 표절·저작권 침해·부적절 콘텐츠 발견 시 신고할 수 있다." },
        { text: "허위 신고·신고 남용 누적 시 서비스 이용이 제한될 수 있다." },
        {
          text: "미채택 시안 2차 활용 위반 신고 시 회사는 시안 다운로드 로그·캡처 시도 로그를 증거로 활용한다.",
        },
      ],
    },
    {
      heading: "제9조 (개인정보)",
      paragraphs: ["별도의 개인정보 처리방침에 따른다."],
    },
    {
      heading: "제10조 (분쟁 해결)",
      items: [
        { text: "본 약관에 명시되지 않은 사항은 대한민국 법령에 따른다." },
        { text: "분쟁 발생 시 회사 소재지 관할 법원을 합의 관할 법원으로 한다." },
      ],
    },
  ],
} as const satisfies SignupTermContent;

/* =========================
  개인정보 처리방침
    ========================= */
const PRIVACY_POLICY_TERM_CONTENT = {
  sections: [
    {
      heading: "1. 수집 항목",
    },
    {
      heading: "1.1 강사",
      items: [
        { text: "필수: 이메일, 비밀번호, 이름, 연락처" },
        { text: "선택: 주소, 프로필 이미지" },
        {
          text: "자동 수집: IP 주소, 기기 정보, 쿠키, 결제 일시·금액·외주명, 서비스 이용 로그",
        },
      ],
    },
    {
      heading: "1.2 디자이너",
      items: [
        { text: "필수: 강사 공통 + 은행명, 계좌번호, 예금주" },
        { text: "선택: 포트폴리오 파일" },
        { text: "자동 수집: 강사 공통과 동일" },
      ],
    },
    {
      heading: "1.3 결제",
      items: [{ text: "무통장: 입금자명·입금일시만 수집" }],
    },
    {
      heading: "2. 수집 목적",
      items: [
        { text: "이메일, 연락처: 회원 식별·서비스 안내·CS 응대" },
        { text: "계좌 정보: 디자이너 정산 송금" },
        { text: "결제·외주 이력: 분쟁 해결·환불·세무 처리" },
        { text: "시안·코멘트: 서비스 제공·신고 처리" },
        { text: "IP·로그: 보안·부정 사용 방지·통계 분석" },
      ],
    },
    {
      heading: "3. 보유·이용 기간",
      items: [
        { text: "회원 기본 정보 (회원 탈퇴 시까지): 회원 식별" },
        { text: "결제·외주 이력 (5년): 전자상거래법" },
        { text: "세무 관련 정보 (5년): 국세기본법" },
        { text: "시안·코멘트 (외주 종료 후 3년): 통신비밀보호법" },
        { text: "서비스 이용 로그 (3개월): 통신비밀보호법" },
        { text: "신고·제재 이력 (회원 탈퇴 후 1년): 분쟁 대응" },
      ],
    },
    {
      heading: "4. 제3자 제공",
      items: [
        { text: "디자이너: 강사 외주 요청 내용(이름, 연락처 제외): 시안 제작 목적" },
        { text: "강사: 디자이너 닉네임, 시안: 시안 채택 목적" },
        { text: "어드민(회사 내부): 전체, 운영, 신고 처리 목적" },
      ],
      paragraphs: [
        "원칙: 강사 ↔ 디자이너 간 직접 식별 가능한 정보 (이름·실명·연락처) 교환 불가, 닉네임만 노출",
      ],
    },
    {
      heading: "5. 정보주체 권리",
      items: [
        { text: "열람·정정·삭제·처리 정지 요청 → 1:1 문의로 접수" },
        { text: "회원 탈퇴 시 즉시 파기 (보유 기간 명시된 항목 제외)" },
        { text: "자동 결정·프로파일링 거부권" },
      ],
    },
    {
      heading: "6. 안전 조치",
      items: [
        { text: "비밀번호 해시" },
        { text: "HTTPS" },
        { text: "DB 접근 제어, 로그" },
        { text: "시안 워터마크 + 다운로드 차단" },
        { text: "정기 백업" },
      ],
    },
    {
      heading: "7. 변경 통지",
      paragraphs: ["본 방침 변경 시 시행 7일 전 이메일 통지"],
    },
  ],
} as const satisfies SignupTermContent;

/* =========================
    디자이너 약관
    ========================= */
export const DESIGNER_TERMS = [
  {
    id: "DESIGNER_SERVICE",
    label: "디자이너 이용약관",
    modalTitle: "디자이너 이용약관",
    content: DESIGNER_SERVICE_TERM_CONTENT,
    version: "V1.0",
  },
  {
    id: "USERINFO",
    label: "개인정보처리방침",
    modalTitle: "개인정보처리방침",
    content: PRIVACY_POLICY_TERM_CONTENT,
    version: "V1.0",
  },
] as const;

/* =========================
    강사 약관
    ========================= */
export const INSTRUCTOR_TERMS = [
  {
    id: "INSTRUCTOR_SERVICE",
    label: "강사 이용약관",
    modalTitle: "강사 이용약관",
    content: INSTRUCTOR_SERVICE_TERM_CONTENT,
    version: "V1.0",
  },
  {
    id: "USERINFO",
    label: "개인정보처리방침",
    modalTitle: "개인정보처리방침",
    content: PRIVACY_POLICY_TERM_CONTENT,
    version: "V1.0",
  },
] as const;
