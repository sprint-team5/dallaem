"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCallback, useEffect, useState } from "react"
import { IoAlertOutline, IoCheckmark } from "react-icons/io5"

import { animated, useTransition } from "@react-spring/web"

const Toast = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState("")
  const pathname = usePathname()
  const search = searchParams.get("alert")
  const type = searchParams.get("type") || "error"

  const newURL = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete("type")
    newParams.delete("alert")
    const url = `${pathname}?${newParams.toString()}`
    return url
  }, [pathname, searchParams])

  useEffect(() => {
    if (!search) return
    setMessage(search)
  }, [search, router, newURL])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(newURL(), { scroll: false })
      setMessage("")
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [message, router, newURL])

  const transitions = useTransition(message, {
    from: { opacity: 0, x: "100%" },
    enter: { opacity: 1, x: "0%" },
    leave: { opacity: 0, x: "100%" },
    config: {
      duration: 300,
      tension: 120,
      friction: 44,
    },
    delay: message ? 100 : 0,
  })

  return transitions((style, item) => {
    return item ? (
      <animated.div
        style={style}
        className={`fixed right-4 top-[90px] z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-lg ${type === "error" ? "bg-red-100" : "bg-green-100"}`}
      >
        <div
          className={`flex size-4 items-center justify-center rounded-full text-[10px] text-white md:size-5 ${type === "error" ? "bg-red-400" : "bg-green-400"}`}
        >
          {type === "error" ? <IoAlertOutline /> : <IoCheckmark />}
        </div>
        <p className="text-[10px] text-gray-700 md:text-xs">{message}</p>
      </animated.div>
    ) : null
  })
}

export default Toast
