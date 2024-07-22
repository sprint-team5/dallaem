"use client"

import { useRouter } from "next/navigation"

const ProfileEditBtn = () => {
  const router = useRouter()

  const handleClick = () => {
    // fixme: 경로 수정 필요
    router.push("/")
  }
  return (
    <button
      onClick={handleClick}
      type="button"
      className="bg-editBtn size-8 rounded-full border-none bg-cover bg-no-repeat"
    >
      {" "}
    </button>
  )
}

export default ProfileEditBtn
