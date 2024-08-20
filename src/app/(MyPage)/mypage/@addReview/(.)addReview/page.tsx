import ReviewModal from "@/components/public/modal/ReviewModal"
import { HydrationBoundary } from "@tanstack/react-query"

import { IAddReviewPageProp } from "../../mypage"

const AddReviewPage = ({ searchParams }: IAddReviewPageProp) => {
  return (
    <HydrationBoundary>
      <ReviewModal gatheringId={searchParams.gatheringId} />
    </HydrationBoundary>
  )
}

export default AddReviewPage
