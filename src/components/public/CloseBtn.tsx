"use client"

import { useRouter } from "next/navigation"

import CloseIcon from "@/public/icon/closeIcon.svg"

const CloseBtn = () => {
  const route = useRouter()

  const handleClick = () => {
    route.back()
  }
  return (
    <button type="button" onClick={handleClick} className="block">
      {" "}
      <CloseIcon fill="true" className="self-end" />
    </button>
  )
}

export default CloseBtn
