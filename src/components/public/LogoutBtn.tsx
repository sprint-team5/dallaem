"use client"

import { useRouter } from "next/navigation"

const LogoutBtn = () => {
  const router = useRouter()

  const handleClick = () => {
    // fixme: 경로 수정 필요
    router.push("/")
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full bg-gray-100 px-3 py-1 text-gray-400"
    >
      로그아웃
    </button>
  )
}

export default LogoutBtn
