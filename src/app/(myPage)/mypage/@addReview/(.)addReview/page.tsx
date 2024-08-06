import ReviewModal from "@/components/public/modal/ReviewModal"
import { HydrationBoundary } from "@tanstack/react-query"

interface IAddReviewPageProp {
  [key: string]: string
}

const AddReviewPage = ({ searchParams }: { searchParams: IAddReviewPageProp }) => {
  return (
    <HydrationBoundary>
      <ReviewModal gatheringId={searchParams.gatheringId} />
    </HydrationBoundary>
  )
}

export default AddReviewPage
