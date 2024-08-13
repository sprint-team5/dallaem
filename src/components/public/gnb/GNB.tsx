"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import Logo from "@/components/public/img/Logo"
import ROUTE from "@/constants/route"
import useGetUserData from "@/hooks/useGetUserData"
import { useWishCount } from "@/provider/CountProvider"

import ProfileComponent from "./components/ProfileComponent"

// 테일윈드 스타일
const wrapperStyles = {
  default: "flex items-center justify-between relative max-w-[1198px]",
  mobile: "h-[55px] w-full text-sm",
  tablet: "md:h-[59px] md:text-lg",
  desktop: "xl:w-[1198px] xl:mx-auto",
}

const navbarStyles = {
  default: "flex items-center justify-between",
  mobile: "gap-3",
  tablet: "md:gap-5",
  desktop: "xl:gap-6",
}

const gnbStyles = {
  container:
    "fixed left-0 top-0 z-50 flex w-full items-center justify-between whitespace-nowrap border-b border-gray-400 bg-white px-4 md:px-6 xl:px-0",
  wrapper: `${wrapperStyles.default} ${wrapperStyles.mobile} ${wrapperStyles.tablet} ${wrapperStyles.desktop}`,
  navbar: `${navbarStyles.default} ${navbarStyles.mobile} ${navbarStyles.tablet} ${navbarStyles.desktop}`,
  navItem: "font-semibold text-[#111827]",
  currentNavItem: "font-semibold text-orange-600",
  hoveredNavItem: "transition-all ease-in-out transform hover:scale-125 delay-[10ms] duration-150",
}

const logoStyles = `${gnbStyles.hoveredNavItem} text-orange-600 w-[60px] h-6 md:w-[70px] md:h-9`
const navBaseStyles = `${gnbStyles.navItem} ${gnbStyles.hoveredNavItem}`
const currentNavStyles = `${gnbStyles.currentNavItem} ${gnbStyles.hoveredNavItem}`

interface IGNBProps {
  userToken: string | undefined
}

const GNB = ({ userToken }: IGNBProps) => {
  const { data } = useGetUserData(userToken)
  const { wishCount } = useWishCount()
  const isClient = typeof window !== "undefined"

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

  if (!shouldShowGNB) return null

  return (
    <div className={gnbStyles.container}>
      <div className={gnbStyles.wrapper}>
        <div className={gnbStyles.navbar}>
          <Link href={ROUTE.HOME}>
            <Logo state="large" className={logoStyles} />
          </Link>
          {navItems.map((item) => {
            const isLabel = item.label === "찜한 모임"
            return (
              <Link
                key={item.href}
                href={item.href}
                className={currentPath === item.href ? currentNavStyles : navBaseStyles}
              >
                {item.label}
                {isClient && isLabel && wishCount > 0 && (
                  <span
                    className={
                      currentPath === item.href
                        ? "relative bottom-[1px] ml-1 rounded-full bg-orange-600 px-2 py-0 text-sm font-medium text-white"
                        : "relative bottom-[1px] ml-1 rounded-full bg-[#111827] px-2 py-0 text-sm font-medium text-white"
                    }
                  >
                    {wishCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
        <ProfileComponent isLoggedIn={isLoggedIn} profileImg={profileImg} />
      </div>
    </div>
  )
}

export default GNB
