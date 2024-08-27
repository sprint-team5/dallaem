import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import ROUTE from "./constants/route"

function startsWith(request: NextRequest, path: string) {
  return request.nextUrl.pathname.startsWith(path)
}

function toPrivateRedirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(`${path}&alert=로그인 후 이용이 가능합니다.`, request.url))
}

function toPublicRedirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(`${path}?alert=잘못된 접속 입니다.`, request.url))
}

export function middleware(request: NextRequest) {
  const userToken = cookies().get("userToken")?.value

  const checkUserToken = !!userToken

  if (!checkUserToken) {
    if (startsWith(request, ROUTE.SAVE_GATHERINGS) || startsWith(request, ROUTE.MY_PAGE)) {
      return toPrivateRedirect(request, ROUTE.SIGNIN)
    }
  }

  if (checkUserToken) {
    if (startsWith(request, "/auth")) {
      return toPublicRedirect(request, ROUTE.HOME)
    }
  }

  return null
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon/.*\\.svg|jpg|png).*)"],
}
