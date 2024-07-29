import { ReactNode } from "react"

interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
}

const MyPageLayout = ({ edit, children }: IMyPageLayoutProps) => {
  return (
    <div className="relative">
      {children}
      {edit}
    </div>
  )
}

export default MyPageLayout
