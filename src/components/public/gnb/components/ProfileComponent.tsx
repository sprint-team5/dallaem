"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useRef, useState } from "react"

import onLogout from "@/actions/onLogout"
import Profile from "@/components/public/img/Profile"
import ROUTE from "@/constants/route"
import useOutsideClick from "@/util/useOutsideClick"

// 테일윈드 스타일
const navBaseStyles = "font-semibold  text-[#FFF7ED]"
const profileStyles = "w-[40px] h-[40px]"
const modalStyles = {
  constainer:
    "absolute right-0 top-[62px] flex h-[70px] w-[150px] flex-col rounded-lg bg-white shadow-xl md:top-[66px]",
  navItems: "flex h-1/2 w-full items-center justify-center rounded-lg text-center text-[#EA580C]",
}

interface IProfileComponentProps {
  isLoggedIn: boolean
  profileImg: string | undefined | null
  hoveredNavItem: string
}

const ProfileComponent = ({ isLoggedIn, profileImg, hoveredNavItem }: IProfileComponentProps) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdownRef, () => {
    return setIsOpen(false)
  })

  const handleToggle = () => {
    return setIsOpen(!isOpen)
  }

  if (isLoggedIn) {
    return (
      <div className="" ref={dropdownRef}>
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleToggle()
            }
          }}
          aria-label="프로필 메뉴 열기"
        >
          <Profile state="largeDefault" className={profileStyles} profileImg={profileImg} />
        </button>
        {isOpen && (
          <div className={modalStyles.constainer}>
            <button
              type="button"
              className={`${modalStyles.navItems} ${hoveredNavItem}`}
              onClick={() => {
                return router.push(ROUTE.MY_PAGE)
              }}
            >
              마이 페이지
            </button>
            <form action={onLogout} className={`${modalStyles.navItems} ${hoveredNavItem}`}>
              <button type="submit" className="h-full w-full">
                로그아웃
              </button>
            </form>
          </div>
        )}
      </div>
    )
  }

  return (
    <Link href={ROUTE.SIGNIN} className={`${navBaseStyles} ${hoveredNavItem}`}>
      로그인
    </Link>
  )
}

export default ProfileComponent
