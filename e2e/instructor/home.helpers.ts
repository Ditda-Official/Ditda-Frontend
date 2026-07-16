import { mockApi } from "../utils/mockApi";

export const DRAFT_SUBMISSIONS_PATH = "/api/v1/instructors/dashboards/draft-submissions";
export const MATCHINGS_PATH = "/api/v1/instructors/dashboards/matchings";
export const REVISIONS_PATH = "/api/v1/instructors/dashboards/revisions";

// 홈 대시보드 3개 API를 원하는 데이터로 채운다. 인자를 생략하면 전부 빈 목록으로
// 채워져, 다른 페이지에서 /instructor로 리다이렉트되는 흐름을 검증할 때
// 목 서버의 "NOT_MOCKED" 404 노이즈를 없애는 용도로도 쓸 수 있다.
export const mockHomeDashboards = (
  overrides: {
    draftSubmissions?: unknown[];
    matchings?: unknown[];
    revisions?: unknown[];
  } = {},
) =>
  Promise.all([
    mockApi(DRAFT_SUBMISSIONS_PATH, { result: { commissions: overrides.draftSubmissions ?? [] } }),
    mockApi(MATCHINGS_PATH, { result: { commissions: overrides.matchings ?? [] } }),
    mockApi(REVISIONS_PATH, { result: { commissions: overrides.revisions ?? [] } }),
  ]);

export const mockEmptyHomeDashboards = () => mockHomeDashboards();
