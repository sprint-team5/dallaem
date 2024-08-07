"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import Logo from "@/components/public/img/Logo"
import ROUTE from "@/constants/route"
import useGetUserData from "@/hooks/useGetUserData"

import ProfileComponent from "./components/ProfileComponent"

// 테일윈드 스타일
const wrapperStyles = {
  default: "flex items-center justify-between relative",
  mobile: "h-[54px] w-[375px]",
  tablet: "md:h-[58px] md:w-[744px]",
  desktop: "xl:w-[1198px]",
}

const navbarStyles = {
  default: "flex items-center justify-between",
  mobile: "gap-3",
  tablet: "md:gap-5",
  desktop: "xl:gap-6",
}

const gnbStyles = {
  container:
    "z-50 border-b fixed top-0 left-0 border-gray-400 flex w-full items-center justify-center whitespace-nowrap bg-white",
  wrapper: `${wrapperStyles.default} ${wrapperStyles.mobile} ${wrapperStyles.tablet} ${wrapperStyles.desktop}`,
  navbar: `${navbarStyles.default} ${navbarStyles.mobile} ${navbarStyles.tablet} ${navbarStyles.desktop}`,
  navItem: "font-semibold text-orange-600",
  currentNavItem: "font-semibold text-[#111827]",
  hoveredNavItem: "transition-all ease-in-out transform hover:scale-125 delay-[10ms] duration-150",
}

const navBaseStyles = `${gnbStyles.navItem} ${gnbStyles.hoveredNavItem}`
const currentNavStyles = `${gnbStyles.currentNavItem} ${gnbStyles.hoveredNavItem}`

interface IGNBProps {
  userToken: string | undefined
}

const GNB = ({ userToken }: IGNBProps) => {
  const { data } = useGetUserData(userToken)

  const isLoggedIn = Boolean(data?.name)
  const profileImg = data?.image

  const currentPath = usePathname()
  const searchParams = useSearchParams()

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

  const navItems = [
    { href: ROUTE.GATHERINGS, label: "모임 찾기" },
    { href: ROUTE.SAVE_GATHERINGS, label: "찜한 모임" },
    { href: ROUTE.ALL_REVIEW, label: "모든 리뷰" },
  ]

  return (
    <>
      {shouldShowGNB && (
        <div className={gnbStyles.container}>
          <div className={gnbStyles.wrapper}>
            <div className={gnbStyles.navbar}>
              <Link href={ROUTE.HOME}>
                <Logo state="large" className={`${gnbStyles.hoveredNavItem} text-orange-600`} />
              </Link>
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={currentPath === item.href ? currentNavStyles : navBaseStyles}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
            <ProfileComponent isLoggedIn={isLoggedIn} profileImg={profileImg} />
          </div>
        </div>
      )}
    </>
  )
}

export default GNB
