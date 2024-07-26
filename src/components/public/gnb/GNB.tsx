"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Logo from "@/components/public/img/Logo"
import { ROUTE } from "@/constants/route"

import ProfileComponent from "./components/ProfileComponent"

const gnbStyles = {
  container: "fixed top-0 flex w-full items-center justify-center whitespace-nowrap bg-[#EA580C]",
  wrapper: {
    default: "flex h-[56px] w-[375px] items-center justify-between relative",
    mobile: "sm:h-[56px] sm:w-[375px]",
    tablet: "md:h-[60px] md:w-[744px]",
    desktop: "xl:h-[60px] xl:w-[1198px]",
  },
  navbar: {
    default: "flex items-center justify-between gap-3",
    mobile: "sm:gap-3",
    tablet: "md:gap-5",
    desktop: "xl:gap-6",
  },
}

const wrapperStyles = `${gnbStyles.wrapper.default} ${gnbStyles.wrapper.mobile} ${gnbStyles.wrapper.tablet} ${gnbStyles.wrapper.desktop}`
const navbarStyles = `${gnbStyles.navbar.default} ${gnbStyles.navbar.mobile} ${gnbStyles.navbar.tablet} ${gnbStyles.navbar.desktop}`

const navBaseStyles = "font-semibold  text-[#FFF7ED]"
const currentNavStyles = "font-semibold text-[#111827 ]"

const GNB = () => {
  const currentPath = usePathname()

  // 임시 파일
  const isLoggedIn = false
  const profileImg =
    "data:image/jpeg;base64,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"

  const navItems = [
    { href: ROUTE.GATHERINGS, label: "모임 찾기" },
    { href: ROUTE.SAVE_GATHERINGS, label: "찜한 모임" },
    { href: ROUTE.ALL_REVIEW, label: "모든 리뷰" },
  ]

  return (
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
  )
}

export default GNB
