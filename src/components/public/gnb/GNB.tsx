"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { useGetUserData } from "@/actions/api-hooks/Auths"
import Logo from "@/components/public/img/Logo"
import ROUTE from "@/constants/route"

import ProfileComponent from "./components/ProfileComponent"

const gnbStyles = {
  container:
    "z-50 border-b-2 fixed top-0 left-0 border-black flex w-full items-center justify-center whitespace-nowrap bg-[#EA580C]",
  wrapper: {
    default: "flex items-center justify-between relative",
    mobile: "h-[54px] w-[375px]",
    tablet: "md:h-[58px] md:w-[744px]",
    desktop: "xl:w-[1198px]",
  },
  navbar: {
    default: "flex items-center justify-between",
    mobile: "gap-3",
    tablet: "md:gap-5",
    desktop: "xl:gap-6",
  },
}

const wrapperStyles = `${gnbStyles.wrapper.default} ${gnbStyles.wrapper.mobile} ${gnbStyles.wrapper.tablet} ${gnbStyles.wrapper.desktop}`
const navbarStyles = `${gnbStyles.navbar.default} ${gnbStyles.navbar.mobile} ${gnbStyles.navbar.tablet} ${gnbStyles.navbar.desktop}`

const navBaseStyles = "font-semibold text-[#FFF7ED]"
const currentNavStyles = "font-semibold text-[#111827]"

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
    <div>
      {shouldShowGNB && (
        <div className={gnbStyles.container}>
          <div className={wrapperStyles}>
            <div className={navbarStyles}>
              <Link href={ROUTE.HOME}>
                <Logo state="large" />
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
    </div>
  )
}

export default GNB
