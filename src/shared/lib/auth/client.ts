export type ClientUserRole = "designer" | "instructor";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const USER_ROLE_COOKIE_NAME = "userRole";
const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60;

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return undefined;

  const cookie = document.cookie.split("; ").find(cookie => cookie.startsWith(`${name}=`));

  if (cookie == null) return undefined;

  return decodeURIComponent(cookie.slice(name.length + 1));
};

const createCookieOptions = (maxAgeSeconds: number) => {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";

  return `Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure ? "; Secure" : ""}`;
};

export const getClientAccessToken = () => getCookieValue(ACCESS_TOKEN_COOKIE_NAME);

export const setClientAuth = ({
  accessToken,
  role,
}: {
  accessToken: string;
  role: ClientUserRole;
}) => {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${encodeURIComponent(
    accessToken,
  )}; ${createCookieOptions(ACCESS_TOKEN_MAX_AGE_SECONDS)}`;
  document.cookie = `${USER_ROLE_COOKIE_NAME}=${encodeURIComponent(
    role,
  )}; ${createCookieOptions(ACCESS_TOKEN_MAX_AGE_SECONDS)}`;
};
