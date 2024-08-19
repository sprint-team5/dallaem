interface IReviewStateButtonProp {
  onClick: (value: boolean) => void
  hasReview: boolean | undefined
}

const ReviewStateButton = ({ onClick, hasReview }: IReviewStateButtonProp) => {
  return (
    <div className="mb-6 flex gap-3">
      <button
        type="button"
        onClick={() => {
          return onClick(false)
        }}
        className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-light md:text-base ${hasReview ? "bg-gray-200" : "bg-gray-900 text-white"}`}
      >
        작성 가능한 리뷰
      </button>
      <button
        type="button"
        onClick={() => {
          return onClick(true)
        }}
        className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm md:text-base ${hasReview ? "bg-gray-900 text-white" : "bg-gray-200"}`}
      >
        작성한 리뷰
      </button>
    </div>
  )
}

export default ReviewStateButton
