"use client"

import { MouseEvent, ReactNode } from "react"

interface ICardReviewProps {
  onClick?: (e: MouseEvent) => void
  children: ReactNode
}

const CardReview = ({ onClick, children }: ICardReviewProps) => {
  return (
    <button
      className="h-10 w-[120px] rounded-xl border border-orange-600 bg-orange-600 text-sm font-semibold leading-5 text-white transition-colors hover:bg-white hover:text-orange-600"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CardReview
