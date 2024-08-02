import ReviewModal from "@/components/public/modal/ReviewModal"

interface IAddReviewPageProp {
  [key: string]: string
}

const AddReviewPage = ({ searchParams }: { searchParams: IAddReviewPageProp }) => {
  return <ReviewModal gatheringId={searchParams.gatheringId} />
}

export default AddReviewPage
