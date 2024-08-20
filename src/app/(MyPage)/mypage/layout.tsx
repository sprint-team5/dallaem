import { Metadata } from "next"

import { IMyPageLayoutProps } from "@/types/mypage/mypage"

export const metadata: Metadata = {
  title: "같이 달램 | 마이 페이지",
  description: "같이 달램 마이 페이지 입니다.",
}

const MyPageLayout = ({ edit, addReview, children }: IMyPageLayoutProps) => {
  return (
    <main className="relative mx-6 my-12 min-h-screen rounded-2xl bg-white px-[16px] md:m-12 md:px-[24px]">
      {children}
      {edit}
      {addReview}
    </main>
  )
}

export default MyPageLayout
