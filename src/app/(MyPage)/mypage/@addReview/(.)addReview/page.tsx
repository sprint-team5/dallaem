import ReviewModal from "@/components/public/modal/ReviewModal"
import { IAddReviewPageProp } from "@/types/mypage/mypage"
import { HydrationBoundary } from "@tanstack/react-query"

const AddReviewPage = ({ searchParams }: IAddReviewPageProp) => {
  return (
    <HydrationBoundary>
      <ReviewModal gatheringId={searchParams.gatheringId} />
    </HydrationBoundary>
  )
}

export default AddReviewPage
