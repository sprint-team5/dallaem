"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import ROUTE from "@/constants/route"
import { useWishCount } from "@/provider/CountProvider"
import { animated, config, useSpring } from "@react-spring/web"

const navItems = [
  { href: ROUTE.HOME, label: "홈" },
  { href: ROUTE.GATHERINGS, label: "모임 찾기" },
  { href: ROUTE.SAVE_GATHERINGS, label: "찜한 모임" },
  { href: ROUTE.ALL_REVIEW, label: "모든 리뷰" },
]

// 테일윈드 스타일

const menuContainer = {
  default:
    "absolute left-0 flex  flex-col items-stretch justify-between border-r border-r-[##D1D5DB] bg-white px-[20px] py-[120px] shadow-lg",
  mobile: "top-[56px] h-[calc(100vh-56px)] w-[70vw] md:py-[17px] text-2xl",
  tablet: "md:top-[60px] md:h-[calc(100vh-60px)] md:w-[220px] md:text-sm",
  desktop: "",
}

const menuStyles = {
  container: `${menuContainer.default} ${menuContainer.mobile} ${menuContainer.tablet} ${menuContainer.desktop}`,
  wrraper: "flex flex-col justify-start gap-10 md:gap-5",
  navItem: "px-[10px] py-[3px] font-semibold text-[#6B7280]",
  currentNavItem: "px-[10px] py-[3px] font-semibold text-black",
  hoveredNavItem:
    "transform rounded-md transition-all delay-[10ms] duration-150 ease-in-out hover:bg-primary",
}

const navBaseStyles = `${menuStyles.navItem} ${menuStyles.hoveredNavItem}`
const currentNavStyles = `${menuStyles.currentNavItem} ${menuStyles.hoveredNavItem}`

interface IAminatedMenuProps {
  menuRef: React.RefObject<HTMLDivElement>
}
const AnimatedMenu = ({ menuRef }: IAminatedMenuProps) => {
  const { wishCount } = useWishCount()
  const isClient = typeof window !== "undefined"
  const currentPath = usePathname()

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

  return (
    <animated.div ref={menuRef} style={containerAnimation} className={menuStyles.container}>
      <animated.div style={itemAnimation} className={menuStyles.wrraper}>
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
                      ? "relative bottom-[1px] ml-1 rounded-full bg-black px-2 py-0 text-sm font-medium text-white"
                      : "relative bottom-[1px] ml-1 rounded-full bg-primary px-2 py-0 text-sm font-medium text-white"
                  }
                >
                  {wishCount}
                </span>
              )}
            </Link>
          )
        })}
      </animated.div>
      <animated.span style={itemAnimation} className="text-[#9CA3AF]">
        ⓒ 2024 같이달램{" "}
      </animated.span>
    </animated.div>
  )
}

export default AnimatedMenu