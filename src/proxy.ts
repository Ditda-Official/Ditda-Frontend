import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type UserRole = "designer" | "instructor";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const USER_ROLE_COOKIE_NAME = "userRole";

const ROLE_HOME_PATH: Record<UserRole, string> = {
  designer: "/designer",
  instructor: "/instructor",
};

const normalizeRole = (role?: string): UserRole | null => {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "designer" || normalizedRole === "instructor") {
    return normalizedRole;
  }

  return null;
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

const getUserRole = (request: NextRequest, accessToken: string): UserRole | null => {
  const roleCookie = request.cookies.get(USER_ROLE_COOKIE_NAME)?.value;
  const roleFromCookie = normalizeRole(roleCookie);

  if (roleFromCookie != null) return roleFromCookie;

  const tokenPayload = parseJwtPayload(accessToken);
  const roleFromToken = typeof tokenPayload?.role === "string" ? tokenPayload.role : undefined;

  return normalizeRole(roleFromToken);
};

const getRequiredRole = (pathname: string): UserRole | null => {
  if (pathname.startsWith("/designer")) return "designer";
  if (pathname.startsWith("/instructor")) return "instructor";

  return null;
};

const redirect = (path: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(path, request.url));
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiredRole = getRequiredRole(pathname);

  if (requiredRole == null) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (accessToken == null) {
    return redirect("/login", request);
  }

  const userRole = getUserRole(request, accessToken);

  if (userRole == null) {
    return redirect("/login", request);
  }

  if (userRole !== requiredRole) {
    return redirect(ROLE_HOME_PATH[userRole], request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/designer/:path*", "/instructor/:path*"],
};
