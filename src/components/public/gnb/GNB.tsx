"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { useEffect, useRef, useState } from "react"

import ROUTE from "@/constants/route"
import useGetUserData from "@/hooks/useGetUserData"
import useOutsideClick from "@/util/useOutsideClick"
import { animated, useTransition } from "@react-spring/web"

import AnimatedMenu from "./components/AnimatedMenu"
import AnimatedMenuIcon from "./components/AnimatedMenuIcon"
import ProfileComponent from "./components/ProfileComponent"

// 테일윈드 스타일
const wrapperStyles = {
  default: "flex items-center justify-between relative w-full ",
  mobile: "h-[55px] text-sm",
  tablet: "md:h-[59px] md:text-lg",
  desktop: "",
}

const gnbStyles = {
  container:
    "fixed left-0 top-0 z-50 flex w-full items-center justify-between whitespace-nowrap border-b border-gray-400 bg-white px-5 md:px-[30px]",
  wrapper: `${wrapperStyles.default} ${wrapperStyles.mobile} ${wrapperStyles.tablet} ${wrapperStyles.desktop}`,
  hoveredNavItem: "transition-all ease-in-out transform hover:scale-150 delay-[10ms] duration-150",
}

interface IGNBProps {
  userToken: string | undefined
  children: React.ReactNode
}

const GNB = ({ userToken, children }: IGNBProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [is2XlScreen, setIs2XlScreen] = useState(false)

  const { data } = useGetUserData(userToken)

  const isLoggedIn = Boolean(data?.name)
  const profileImg = data?.image

  const currentPath = usePathname()
  const searchParams = useSearchParams()

  const menuRef = useRef<HTMLDivElement>(null)
  useOutsideClick(menuRef, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIs2XlScreen(window.innerWidth >= 1536) // 1536px is the default '2xl' breakpoint in Tailwind
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      return window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // 현재 경로가 showGNBPaths에 포함되어 있는지 확인
  function isValidRoute(path: string): boolean {
    return Object.values(ROUTE).some((route) => {
      // 쿼리 스트링이 있는 경우
      if (route.includes("?")) {
        const [basePath, query] = route.split("?")
        const [paramKey, paramValue] = query.split("=")
        return path === basePath && searchParams.get(paramKey) === paramValue
      }
      // 쿼리 스트링이 없는 경우
      return path === route || path.startsWith(`${route}/`)
    })
  }

  const shouldShowGNB = isValidRoute(currentPath)

  // 메뉴 전환 애니메이션
  const menuTransition = useTransition(is2XlScreen || isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150 },
  })

  if (!shouldShowGNB) return null

  const navButtonClick = () => {
    setIsOpen((prev) => {
      return !prev
    })
  }

  return (
    <>
      <div className={gnbStyles.container}>
        {menuTransition((style, item) => {
          return (
            item && (
              <animated.div style={style}>
                <AnimatedMenu menuRef={menuRef} />
              </animated.div>
            )
          )
        })}
        <div className={gnbStyles.wrapper}>
          {!is2XlScreen && (
            <div className="mr-4">
              <AnimatedMenuIcon onClick={navButtonClick} isOpen={isOpen} />
            </div>
          )}
          <Link
            href={ROUTE.HOME}
            className="font-tmoneyRoundWind mr-auto text-lg font-extrabold text-primary"
          >
            같이달램
          </Link>
          <ProfileComponent isLoggedIn={isLoggedIn} profileImg={profileImg} />
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${is2XlScreen ? "2xl:ml-[220px]" : ""}`}
      >
        {children}
      </div>
    </>
  )
}

export default GNB
