export type ClientUserRole = "designer" | "instructor";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const USER_ROLE_COOKIE_NAME = "userRole";
const USER_NAME_COOKIE_NAME = "userName";
const USER_PROFILE_IMAGE_COOKIE_NAME = "userProfileImageUrl";
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

export const normalizeClientUserRole = (role?: string): ClientUserRole | null => {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "designer" || normalizedRole === "instructor") {
    return normalizedRole;
  }

  return null;
};

export const getClientUserHomePath = (role: ClientUserRole) => {
  return `/${role}`;
};

const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  const [, payload] = token.split(".");

  if (payload == null) return null;

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decodedPayload = atob(paddedBase64);

    return JSON.parse(decodedPayload) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const getClientAccessToken = () => getCookieValue(ACCESS_TOKEN_COOKIE_NAME);
export const getClientUserName = () => getCookieValue(USER_NAME_COOKIE_NAME);
export const getClientProfileImageUrl = () => getCookieValue(USER_PROFILE_IMAGE_COOKIE_NAME);

export const setClientAccessToken = (accessToken: string) => {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${encodeURIComponent(
    accessToken,
  )}; ${createCookieOptions(ACCESS_TOKEN_MAX_AGE_SECONDS)}`;
};

export const getClientUserRoleFromAccessToken = (accessToken: string) => {
  const tokenPayload = parseJwtPayload(accessToken);
  const roleFromToken =
    typeof tokenPayload?.role === "string"
      ? tokenPayload.role
      : typeof tokenPayload?.userType === "string"
        ? tokenPayload.userType
        : undefined;

  return normalizeClientUserRole(roleFromToken);
};

export const setClientAuth = ({
  accessToken,
  role,
  name,
  profileImageUrl,
}: {
  accessToken: string;
  role?: ClientUserRole;
  name?: string;
  profileImageUrl?: string;
}) => {
  setClientAccessToken(accessToken);

  if (role == null) {
    document.cookie = `${USER_ROLE_COOKIE_NAME}=; ${createCookieOptions(0)}`;
  } else {
    document.cookie = `${USER_ROLE_COOKIE_NAME}=${encodeURIComponent(role)}; ${createCookieOptions(
      ACCESS_TOKEN_MAX_AGE_SECONDS,
    )}`;
  }

  if (name != null) {
    document.cookie = `${USER_NAME_COOKIE_NAME}=${encodeURIComponent(name)}; ${createCookieOptions(
      ACCESS_TOKEN_MAX_AGE_SECONDS,
    )}`;
  }

  if (profileImageUrl != null) {
    document.cookie = `${USER_PROFILE_IMAGE_COOKIE_NAME}=${encodeURIComponent(profileImageUrl)}; ${createCookieOptions(
      ACCESS_TOKEN_MAX_AGE_SECONDS,
    )}`;
  }
};

export const clearClientAuth = () => {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=; ${createCookieOptions(0)}`;
  document.cookie = `${USER_ROLE_COOKIE_NAME}=; ${createCookieOptions(0)}`;
  document.cookie = `${USER_NAME_COOKIE_NAME}=; ${createCookieOptions(0)}`;
  document.cookie = `${USER_PROFILE_IMAGE_COOKIE_NAME}=; ${createCookieOptions(0)}`;
};
