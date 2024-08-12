"use client"

import { useRouter } from "next/navigation"

import ROUTE from "@/constants/route"

import Edit from "./img/Edit"

const ProfileEditBtn = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`${ROUTE.MY_PAGE}/edit`)
  }
  return (
    <button
      onClick={handleClick}
      type="button"
      className="size-8 rounded-full border-none bg-cover bg-no-repeat"
    >
      {" "}
      <Edit state="large" />
    </button>
  )
}

export default ProfileEditBtn
