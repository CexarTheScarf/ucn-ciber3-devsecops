import { NextResponse, NextRequest } from "next/server";
import { GetSessionEdge } from "@/lib/auth";
import { encodeCallbackToB64 } from "@/lib/utils";
import { getEnvValue } from "@/lib/env";
import { PATH_SOURCES } from "@/lib/constants";
import { GetAuthCallack } from "@/lib/server-utils";

const WHITE_LIST_PATHS: (typeof PATH_SOURCES)[keyof typeof PATH_SOURCES][] = [
  PATH_SOURCES.home,
  PATH_SOURCES.auth,
  PATH_SOURCES.logout,
  PATH_SOURCES.register,
];

function GetPathnameAndHeader(request: NextRequest): [string, Headers] {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(getEnvValue("NEXT_PATHNAME_HEADER"), pathname);
  return [pathname, requestHeaders];
}

function AuthRedirect(request: NextRequest, headers: Headers) {
  const requestUrl = new URL(request.url);
  const callback = encodeCallbackToB64(requestUrl.pathname + requestUrl.search);

  return NextResponse.redirect(
    new URL(`${PATH_SOURCES.auth}?callback=${callback}`, request.url),
    { headers },
  );
}

function AfterAuthRedirect(request: NextRequest, headers: Headers) {
  return NextResponse.redirect(new URL(GetAuthCallack(), request.url), {
    headers,
  });
}

function LogoutRedirect(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL(PATH_SOURCES.home, request.url),
  );
  response.cookies.delete(getEnvValue("AUTH_COOKIE_NAME"));
  return response;
}

export async function middleware(request: NextRequest) {
  // Pathaname header manipulation
  const [pathname, headers] = GetPathnameAndHeader(request);

  // Logout
  if (pathname === PATH_SOURCES.logout) return LogoutRedirect(request);

  // Auth (whitelist strategy)
  if (!WHITE_LIST_PATHS.includes(pathname as any)) {
    const session = await GetSessionEdge();
    if (!session) return AuthRedirect(request, headers);
  }

  // After login
  if (pathname === PATH_SOURCES.auth) {
    const session = await GetSessionEdge();
    if (session) return AfterAuthRedirect(request, headers);
  }

  // Next
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)",
  ],
};
