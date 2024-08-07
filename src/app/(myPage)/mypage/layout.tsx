import { ReactNode } from "react"

interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
  addReview: ReactNode
}

const MyPageLayout = ({ edit, addReview, children }: IMyPageLayoutProps) => {
  return (
    <div className="relative mx-auto h-screen max-w-[1200px] bg-gray-50 px-[16px] md:px-[24px] lg:px-[97px]">
      <h2 className="z-1 absolute left-0 right-0 top-4 mx-auto w-full pl-24 pt-8 text-2xl font-semibold">
        마이페이지
      </h2>
      {children}
      {edit}
      {addReview}
    </div>
  )
}

export default MyPageLayout
