"use client"

import React from "react"

import Bye from "@/components/public/icon/staticIcon/Bye"
import { IByeBtnProps, IWishListData } from "@/types/wishlist/wishlist"

const ByeBtn = ({ list, removeHandler }: IByeBtnProps) => {
  const HandlerRemove = () => {
    const wish = localStorage.getItem("wishlist")
    if (wish) {
      const parse: IWishListData[] = JSON.parse(wish)
      const index = parse.findIndex((item) => {
        return item.id === list.id
      })
      if (index > -1) {
        parse.splice(index, 1)
      }
      localStorage.setItem("wishlist", JSON.stringify([...parse]))
      removeHandler(list.id)
    }
  }

  return (
    <button
      aria-label="wishRemove"
      type="button"
      onClick={HandlerRemove}
      className="z-20 flex cursor-pointer items-center justify-center gap-[2px] rounded-xl bg-orange-50 px-3 py-[6px] text-orange-600 sm:absolute sm:right-6 sm:top-6 sm:size-12 sm:rounded-full sm:p-0"
    >
      <Bye />
      <p className="text-xs font-semibold leading-4 sm:hidden">모임 보내주기</p>
    </button>
  )
}

export default ByeBtn
