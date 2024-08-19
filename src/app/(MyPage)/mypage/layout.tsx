import { ReactNode } from "react"

interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
  addReview: ReactNode
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
