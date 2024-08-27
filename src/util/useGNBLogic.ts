import { useCallback, useEffect, useRef, useState } from "react"

import useGetUserData from "@/hooks/useGetUserData"
import useUserToken from "@/hooks/useUserToken"
import useOutsideClick from "@/util/useOutsideClick"

const useGNBLogic = (initialUserToken: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false)
  const [is2XlScreen, setIs2XlScreen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileImg, setProfileImg] = useState<string | null>(null)

  const { userToken, updateUserToken } = useUserToken(initialUserToken)
  // api 요청
  const { data } = useGetUserData(initialUserToken)

  // 유저 토큰이 업데이트 되면 초기값을 업데이트함
  useEffect(() => {
    if (initialUserToken !== userToken) {
      updateUserToken()
    }
  }, [initialUserToken, userToken, updateUserToken])

  // data와 userToken 값의 업데이트에 따라 로그인 유무와 프로필 이미지를 업데이트함
  useEffect(() => {
    if (data) {
      setIsLoggedIn(true)
      setProfileImg(data.image)
    } else {
      setIsLoggedIn(false)
      setProfileImg(null)
    }
  }, [data, userToken])

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
