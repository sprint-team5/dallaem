import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  function startsWith(path: string) {
    return request.nextUrl.pathname.startsWith(path)
  }

  function toRedirect(path: string) {
    return NextResponse.redirect(new URL(path, request.url))
  }

  if (request.cookies.has("userToken")) {
    if (startsWith("/auth")) {
      return toRedirect("/")
    }
  } else {
    if (startsWith("/wishlist")) {
      return toRedirect("/auth?mode=signin")
    }

    if (startsWith("/mypage")) {
      return toRedirect("/auth?mode=signin")
    }
  }

  return null
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon/.*\\.svg|jpg|png).*)"],
}
