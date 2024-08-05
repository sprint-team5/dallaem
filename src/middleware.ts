import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function startsWith(request: NextRequest, path: string) {
  return request.nextUrl.pathname.startsWith(path)
}

function toRedirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url))
}

export function middleware(request: NextRequest) {
  const userToken = cookies().get("userToken")?.value

  const checkUserToken = request.cookies.has("userToken") || userToken

  if (!checkUserToken) {
    if (startsWith(request, "/wishlist") || startsWith(request, "/mypage")) {
      return toRedirect(request, "/auth?mode=signin")
    }
  }

  if (checkUserToken) {
    if (startsWith(request, "/auth")) {
      return toRedirect(request, "/")
    }
  }

  return null
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon/.*\\.svg|jpg|png).*)"],
}
