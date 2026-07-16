import { mockApi } from "../utils/mockApi";

export const DRAFT_SUBMISSIONS_PATH = "/api/v1/instructors/dashboards/draft-submissions";
export const MATCHINGS_PATH = "/api/v1/instructors/dashboards/matchings";
export const REVISIONS_PATH = "/api/v1/instructors/dashboards/revisions";

// 다른 페이지에서 /instructor(홈)로 리다이렉트되는 흐름을 검증할 때, 홈 대시보드가
// 추가로 호출하는 3개 API를 비워서 목 서버의 "NOT_MOCKED" 404 노이즈를 없앤다.
export const mockEmptyHomeDashboards = () =>
  Promise.all([
    mockApi(DRAFT_SUBMISSIONS_PATH, { result: { commissions: [] } }),
    mockApi(MATCHINGS_PATH, { result: { commissions: [] } }),
    mockApi(REVISIONS_PATH, { result: { commissions: [] } }),
  ]);
