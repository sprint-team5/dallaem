import Link from "next/link"

const notFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-orange-600">404</h2>
      <p className="mt-2 text-xl font-medium">잘못된 페이지 접근 입니다.</p>
      <Link
        href="/"
        className="mt-4 rounded-xl border border-orange-600 px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-600 hover:text-white"
      >
        메인으로 돌아가기
      </Link>
    </div>
  )
}

export default notFound
