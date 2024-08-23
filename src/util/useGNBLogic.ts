import { useCallback, useEffect, useRef, useState } from "react"

import useGetUserData from "@/hooks/useGetUserData"
import useOutsideClick from "@/util/useOutsideClick"

const useGNBLogic = (userToken: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false)
  const [is2XlScreen, setIs2XlScreen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data } = useGetUserData(userToken)

  // data가 변경될 때마다 isLoggedIn 상태를 업데이트
  useEffect(() => {
    setIsLoggedIn(Boolean(data?.name))
  }, [data])

  const profileImg = data?.image

  const menuRef = useRef<HTMLDivElement>(null)
  useOutsideClick(menuRef, () => {
    setIsOpen(false)
  })

  const checkScreenSize = useCallback(() => {
    const newIs2XlScreen = window.innerWidth >= 1024
    setIs2XlScreen(newIs2XlScreen)
    if (!newIs2XlScreen) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    checkScreenSize()

    let timeoutId: number
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(checkScreenSize, 100)
    }

    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [checkScreenSize])

  const menuIconClick = useCallback(() => {
    setIsOpen((prev) => {
      return !prev
    })
  }, [])

  return {
    isOpen,
    setIsOpen,
    is2XlScreen,
    isLoggedIn,
    profileImg,
    menuRef,
    menuIconClick,
  }
}

export default useGNBLogic
