"use client"

import Review from "@/components/public/Review/Review"
import { useAllReview } from "@/hooks/useAllReview"

const List = () => {
  const { reviews } = useAllReview()
  return (
    <div
      className={`mt-6 flex flex-1 flex-col gap-6 text-sm font-medium leading-5 text-gray-500 ${reviews.length === 0 && "items-center justify-center"}`}
    >
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <Review
              key={review.id}
              score={review.score}
              comment={review.comment}
              gathering={review.Gathering}
              createdAt={review.createdAt}
            />
          )
        })
      ) : (
        <p>아직 리뷰가 없어요</p>
      )}
    </div>
  )
}

export default List
