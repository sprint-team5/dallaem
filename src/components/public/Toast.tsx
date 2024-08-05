"use client"

import { useSearchParams } from "next/navigation"

import { useEffect, useState } from "react"

import ErrorSVG from "@public/icon/staticIcon/error.svg"

import X from "./icon/staticIcon/X"

const SHOW = {
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
    }, SHOW.open)

    const secondTime = setTimeout(() => {
      setActive(false)
    }, SHOW.open + SHOW.close)

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
      className={`fixed top-20 z-50 flex cursor-pointer items-center gap-2 border-2 border-orange-500 bg-red-100 py-3 pl-4 pr-6 text-xs font-bold text-red-400 transition-all duration-500 sm:text-sm ${active ? "right-6 translate-x-0" : "right-0 max-w-60 translate-x-full break-keep opacity-0"}`}
    >
      <div>
        <ErrorSVG className="text-red-4 size-5" />
      </div>
      {errorMsg}
      <X className="absolute right-2 top-0 w-3" />
    </button>
  )
}

export default Toast
