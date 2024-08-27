"use client"

import { useRouter } from "next/navigation"

import { useRef, useState } from "react"

import onLogout from "@/actions/Auths/onLogout"
import Profile from "@/components/public/img/Profile"
import ROUTE from "@/constants/route"
import useOutsideClick from "@/util/useOutsideClick"
import { animated, useSpring } from "@react-spring/web"

// 테일윈드 스타일
const profileStyles = "w-[40px] h-[40px]"

const profileMenuStyles = {
  container:
    "absolute right-0 top-[62px] flex h-[70px] w-[150px] flex-col rounded-lg bg-white shadow-xl md:top-[66px]",
  navItems: "flex h-1/2 w-full items-center justify-center rounded-lg text-center text-orange-600",
  hoveredNavItem: "transition-all ease-in-out transform delay-[10ms] duration-150",
}

interface IProfileComponentProps {
  isLoggedIn: boolean
  profileImg: string | undefined | null
}

const ProfileComponent = ({ isLoggedIn, profileImg }: IProfileComponentProps) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdownRef, () => {
    return setIsOpen(false)
  })

  const [{ clipPath }, api] = useSpring(() => {
    return { clipPath: "circle(0% at 0% 0%)" }
  })

  if (!isLoggedIn) {
    return (
      <button
        type="button"
        onClick={async () => {
          await onLogout()
          return router.push(ROUTE.SIGNIN)
        }}
        className="relative flex h-8 w-[80px] items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-semibold text-white md:w-[100px]"
        onMouseEnter={() => {
          return api({ clipPath: "circle(150% at 0% 0%)" })
        }}
        onMouseLeave={() => {
          return api({ clipPath: "circle(0% at 0% 0%)" })
        }}
      >
        <animated.div
          style={{ clipPath }}
          className="absolute left-0 top-0 h-full w-full bg-[#ed8f60]"
        />
        <p className="relative z-10">로그인</p>
      </button>
    )
  }

  const handleToggle = () => {
    return setIsOpen(!isOpen)
  }

  return (
    <div ref={dropdownRef} className="mt-1 md:mt-2">
      <button type="button" onClick={handleToggle} aria-label="프로필 메뉴 열기">
        <Profile state="largeDefault" className={profileStyles} profileImg={profileImg} />
      </button>
      {isOpen && (
        <div className={profileMenuStyles.container}>
          <button
            type="button"
            className={`${profileMenuStyles.navItems} ${profileMenuStyles.hoveredNavItem}`}
            onClick={() => {
              setIsOpen(false)
              return router.push(ROUTE.MY_PAGE)
            }}
          >
            마이 페이지
          </button>
          <form
            action={() => {
              setIsOpen(false)
              return onLogout()
            }}
            className={`${profileMenuStyles.navItems} ${profileMenuStyles.hoveredNavItem}`}
          >
            <button type="submit" className="h-full w-full">
              로그아웃
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ProfileComponent
