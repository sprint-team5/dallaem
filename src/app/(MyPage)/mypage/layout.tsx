import { Metadata } from "next"

import { IMyPageLayoutProps } from "@/types/mypage/mypage"

export const metadata: Metadata = {
  title: "같이 달램 | 마이 페이지",
  description: "같이 달램 마이 페이지 입니다.",
}

const MyPageLayout = ({ edit, addReview, children }: IMyPageLayoutProps) => {
  return (
    <main className="relative m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
      {children}
      {edit}
      {addReview}
    </main>
  )
}

export default MyPageLayout
