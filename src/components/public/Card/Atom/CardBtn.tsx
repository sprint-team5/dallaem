"use client"

import { MouseEvent, ReactNode } from "react"

interface ICardCancelProps {
  onClick?: (e: MouseEvent) => void
  type?: "active" | "outline"
  children: ReactNode
}

const CardBtn = ({ onClick, type = "outline", children }: ICardCancelProps) => {
  return (
    <button
      className={`h-10 w-[120px] rounded-xl border border-orange-600 text-sm font-semibold leading-5 transition-colors ${type === "active" ? "text-white hover:bg-white hover:text-orange-600" : "text-orange-600 hover:bg-orange-600 hover:text-white"}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CardBtn
