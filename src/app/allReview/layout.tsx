import { ReactNode } from "react"

import GNB from "@/components/public/gnb/GNB"

const AllReviewLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GNB userToken="" />
      {children}
    </>
  )
}

export default AllReviewLayout
