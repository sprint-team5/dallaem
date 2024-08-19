import Link from "next/link"

import ROUTE from "@/constants/route"

const notFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-primary text-5xl font-bold">404</h2>
      <p className="mt-2 text-xl font-medium">잘못된 페이지 접근 입니다.</p>
      <Link
        href={ROUTE.HOME}
        className="border-primary text-primary hover:bg-primary mt-4 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:text-white"
      >
        메인으로 돌아가기
      </Link>
    </div>
  )
}

export default notFound
