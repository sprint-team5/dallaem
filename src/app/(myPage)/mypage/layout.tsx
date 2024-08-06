import { ReactNode } from "react"

interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
  addReview: ReactNode
}

const MyPageLayout = ({ edit, addReview, children }: IMyPageLayoutProps) => {
  return (
    <div className="mx-auto h-screen max-w-[1200px] bg-gray-50 px-[16px] md:px-[24px] lg:px-[97px]">
      <h2 className="mx-auto mb-6 w-full pl-1 pt-8 text-2xl font-semibold">마이페이지</h2>
      {children}
      {edit}
      {addReview}
    </div>
  )
}

export default MyPageLayout
