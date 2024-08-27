"use client"

import Link from "next/link"

import { memo, useCallback } from "react"

import ROUTE from "@/constants/route"
import useGNBLogic from "@/util/useGNBLogic"

import ProfileComponent from "./components/ProfileComponent"
import SideBarIcon from "./components/SideBarIcon"
import SideBarMenu from "./components/SideBarMenu"

// 테일윈드 스타일
const wrapperStyles = {
  default: "flex items-center justify-between relative w-full",
  mobile: "h-[55px] text-sm",
  tablet: "md:h-[59px] md:text-lg",
  desktop: "",
}

const gnbStyles = {
  container: "fixed left-0 top-0 z-50 w-full bg-white",
  wrapper: `${wrapperStyles.default} ${wrapperStyles.mobile} ${wrapperStyles.tablet} ${wrapperStyles.desktop} border-b border-gray-300 px-5 md:px-[30px]`,
  hoveredNavItem: "transition-all ease-in-out transform hover:scale-150 delay-[10ms] duration-150",
  logo: "mr-auto font-tmoneyRoundWind text-lg font-extrabold text-primary subpixel-antialiased",
}

interface IGNBProps {
  initialUserToken: string | undefined
  children: React.ReactNode
}

const MemoizedProfileComponent = memo(ProfileComponent)

const GNB = ({ initialUserToken, children }: IGNBProps) => {
  const { isOpen, is2XlScreen, isLoggedIn, profileImg, menuRef, menuIconClick } =
    useGNBLogic(initialUserToken)

  const menuIconClickHandler = useCallback(() => {
    menuIconClick()
  }, [menuIconClick])

  return (
    <>
      <div className={gnbStyles.container}>
        <SideBarMenu menuRef={menuRef} isOpen={isOpen || is2XlScreen} />
        <div className={gnbStyles.wrapper}>
          {!is2XlScreen && (
            <div className="mr-4">
              <SideBarIcon onClick={menuIconClickHandler} isOpen={isOpen} />
            </div>
          )}
          <Link href={ROUTE.HOME} className={gnbStyles.logo}>
            같이달램
          </Link>
          <MemoizedProfileComponent isLoggedIn={isLoggedIn} profileImg={profileImg} />
        </div>
      </div>
      <div
        className={`pt-[56px] transition-all duration-300 ease-in-out md:pt-[60px] ${is2XlScreen ? "lg:ml-[220px]" : ""}`}
      >
        {children}
      </div>
    </>
  )
}

export default memo(GNB)
