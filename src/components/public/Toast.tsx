"use client"

import { useSearchParams } from "next/navigation"

import { useEffect, useState } from "react"

import XSVG from "@public/icon/staticIcon/X.svg"
import ErrorSVG from "@public/icon/staticIcon/error.svg"

const MODAL_DELAY_TIME = {
  open: 100,
  close: 4000,
}

const Toast = () => {
  const searchParams = useSearchParams()
  const [active, setActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const search = searchParams.get("alert")

  useEffect(() => {
    if (!search) return setActive(false)

    setErrorMsg(search)

    const firstTime = setTimeout(() => {
      setActive(true)
    }, MODAL_DELAY_TIME.open)

    const secondTime = setTimeout(() => {
      setActive(false)
    }, MODAL_DELAY_TIME.open + MODAL_DELAY_TIME.close)

    return () => {
      clearTimeout(firstTime)
      clearTimeout(secondTime)
    }
  }, [search])

  const clickHanlder = () => {
    setActive(false)
  }

  return (
    <button
      type="button"
      onClick={clickHanlder}
      className={`fixed top-20 z-50 flex cursor-pointer items-center gap-2 rounded border border-red-400 bg-red-100 py-3 pl-4 pr-6 text-xs font-bold text-red-400 transition-all duration-500 sm:text-sm ${active ? "right-6 translate-x-0" : "right-0 max-w-60 translate-x-full break-keep opacity-0"}`}
    >
      <div>
        <ErrorSVG className="text-red-4 size-5" />
      </div>
      {errorMsg}
      <XSVG className="absolute right-2 top-1 w-3" />
    </button>
  )
}

export default Toast
