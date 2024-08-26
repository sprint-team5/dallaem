"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import ROUTE from "@/constants/route"
import { useWishCount } from "@/provider/CountProvider"
import { animated, config, useSpring, useTransition } from "@react-spring/web"

const navItems = [
  { href: ROUTE.HOME, label: "홈" },
  { href: ROUTE.GATHERINGS, label: "모임 찾기" },
  { href: ROUTE.SAVE_GATHERINGS, label: "찜한 모임" },
  { href: ROUTE.ALL_REVIEW, label: "모든 리뷰" },
]

// 테일윈드 스타일
const menuStyles = {
  wrraper: "flex flex-col justify-start ",
  navItem: "px-[10px] py-[3px] font-semibold text-[#6B7280] text-base md:text-sm lg:text-base",
  currentNavItem: "text-black bg-primary/60",
  hoveredNavItem:
    "transform rounded-md transition-all delay-[10ms] duration-150 ease-in-out hover:bg-primary/60",
}

const navBaseStyles = `${menuStyles.navItem} ${menuStyles.hoveredNavItem}`
const currentNavStyles = `${menuStyles.navItem} ${menuStyles.currentNavItem} ${menuStyles.hoveredNavItem}`

interface ISideBarMenuProps {
  menuRef: React.RefObject<HTMLDivElement>
  isOpen: boolean
}

const SideBarMenu = ({ menuRef, isOpen }: ISideBarMenuProps) => {
  const { wishCount } = useWishCount()
  const isClient = typeof window !== "undefined"
  const currentPath = usePathname()

  const menuTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150 },
  })

  // 컨테이너 애니메이션
  const containerAnimation = useSpring({
    from: {
      clipPath: "circle(0% at 0 0)",
    },
    to: {
      clipPath: "circle(150% at 0 0)",
    },
    config: {
      ...config.gentle,
      duration: 200,
      tension: 400,
      friction: 15,
    },
  })

  // 내부 요소 애니메이션
  const itemAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(5px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 20,
    config: {
      ...config.gentle,
      duration: 150,
      tension: 400,
      friction: 15,
    },
  })

  return menuTransition((style, styleItem) => {
    return styleItem ? (
      <animated.div
        ref={menuRef}
        style={{ ...style, ...containerAnimation }}
        className="absolute left-0 top-14 z-50 flex h-[calc(100vh-56px)] w-[80%] flex-col items-stretch justify-between border-r border-r-[##D1D5DB] bg-white p-5 text-2xl shadow-lg md:top-[60px] md:h-[calc(100vh-60px)] md:w-[220px] md:py-[17px] md:text-sm"
      >
        <animated.div style={itemAnimation} className={`${menuStyles.wrraper}`}>
          <div className="flex flex-col gap-5">
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
                    <span className="relative bottom-[1px] ml-1 rounded-full bg-primary px-2 py-0 text-sm font-medium text-white">
                      {wishCount}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="mt-10 flex flex-col">
            <Link
              href={ROUTE.MY_PAGE}
              className={currentPath === ROUTE.MY_PAGE ? currentNavStyles : navBaseStyles}
            >
              마이페이지
            </Link>
          </div>
        </animated.div>
        <animated.span
          style={itemAnimation}
          className="text-center text-xs font-semibold -tracking-wide text-gray-400"
        >
          ⓒ 2024 같이달램
        </animated.span>
      </animated.div>
    ) : null
  })
}

export default SideBarMenu
