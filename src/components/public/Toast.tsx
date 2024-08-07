"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCallback, useEffect, useState } from "react"

import ErrorSVG from "@public/icon/staticIcon/error.svg"

import X from "./icon/staticIcon/X"

const MODAL_DELAY_TIME = {
  open: 100,
  close: 4000,
}

const Toast = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const pathname = usePathname()
  const search = searchParams.get("alert")

  const newURL = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete("alert")
    const url = `${pathname}?${newParams.toString()}`
    return url
  }, [pathname, searchParams])

  useEffect(() => {
    if (!search) return setActive(false)

    setErrorMsg(search)

    const firstTime = setTimeout(() => {
      setActive(true)
    }, MODAL_DELAY_TIME.open)

    const secondTime = setTimeout(() => {
      setActive(false)
      router.replace(newURL(), { scroll: false })
    }, MODAL_DELAY_TIME.open + MODAL_DELAY_TIME.close)

    return () => {
      clearTimeout(firstTime)
      clearTimeout(secondTime)
    }
  }, [search, router, newURL])

  const clickHanlder = () => {
    setActive(false)
    router.replace(newURL(), { scroll: false })
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
      <X className="absolute right-2 top-0 w-3" />
    </button>
  )
}

export default Toast
