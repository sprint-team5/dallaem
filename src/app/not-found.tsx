import Link from "next/link"

import ROUTE from "@/constants/route"

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-primary">404</h2>
      <p className="mt-2 text-xl font-medium">잘못된 페이지 접근 입니다.</p>
      <Link
        href={ROUTE.HOME}
        replace
        className="mt-4 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
      >
        메인으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFound
