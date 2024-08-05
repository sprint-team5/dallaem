import { ReactNode } from "react"

interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
  addReview: ReactNode
}

const MyPageLayout = ({ edit, addReview, children }: IMyPageLayoutProps) => {
  return (
    <div className="relative">
      <h2 className="mx-auto mb-6 w-profile-sm pl-1 pt-8 text-2xl font-semibold md:w-profile-md lg:w-profile-lg">
        마이페이지
      </h2>
      {children}
      {edit}
      {addReview}
    </div>
  )
}

export default MyPageLayout
