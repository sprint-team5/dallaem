import Link from "next/link"

import { useRef, useState } from "react"

import Profile from "@/components/public/img/Profile"
import { ROUTE } from "@/constants/route"
import useOutsideClick from "@/utill/useOutsideClick"

const navBaseStyles = "font-semibold  text-[#FFF7ED]"
const profileStyles = "w-[40px] h-[40px]"

interface IProfileComponentProps {
  isLoggedIn: boolean
  profileImg: string | undefined
}

const ProfileComponent = ({ isLoggedIn, profileImg }: IProfileComponentProps) => {
  const [isOpen, setIsOpen] = useState(true)

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
          <div className="absolute right-0 top-[62px] flex h-[70px] w-[150px] flex-col rounded-lg bg-white shadow-xl md:top-[66px]">
            <div className="flex h-1/2 w-full items-center justify-center rounded-lg text-center text-[#EA580C] hover:bg-[#FFF7ED]">
              마이 페이지
            </div>
            <div className="flex h-1/2 w-full items-center justify-center rounded-lg text-center text-[#EA580C] hover:bg-[#FFF7ED]">
              로그아웃
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Link href={ROUTE.SIGNIN} className={navBaseStyles}>
      로그인
    </Link>
  )
}

export default ProfileComponent
