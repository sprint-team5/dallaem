import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  function startsWith(path: string) {
    return request.nextUrl.pathname.startsWith(path)
  }

  function toRedirect(path: string) {
    return NextResponse.redirect(new URL(path, request.url))
  }

  const userToken = cookies().get("userToken")?.value

  if (!request.cookies.has("userToken") || !userToken) {
    if (startsWith("/wishlist") || startsWith("/mypage")) {
      return toRedirect("/auth?mode=signin")
    }
  }

  if (startsWith("/auth")) {
    return toRedirect("/")
  }

  return null
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon/.*\\.svg|jpg|png).*)"],
}
