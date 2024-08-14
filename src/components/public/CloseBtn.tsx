"use client"

import { useRouter } from "next/navigation"

import X from "./icon/staticIcon/X"

const CloseBtn = () => {
  const route = useRouter()

  const handleClick = () => {
    route.back()
  }
  return (
    <button type="button" onClick={handleClick} className="block" aria-label="Close">
      <X />
    </button>
  )
}

export default CloseBtn
