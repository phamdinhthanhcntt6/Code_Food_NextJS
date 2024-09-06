import { NextResponse, type NextRequest } from "next/server";

const privaitePaths = ["/manage"];
const unAuthPaths = ["/login"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = Boolean(request.cookies.get("accessToken"));

  //Chưa đăng nhâp thì chưa cho vào privatePath
  if (privaitePaths.some((path) => pathname.startsWith(path) && !isAuth)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (unAuthPaths.some((path) => pathname.startsWith(path) && isAuth)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/login"],
};
