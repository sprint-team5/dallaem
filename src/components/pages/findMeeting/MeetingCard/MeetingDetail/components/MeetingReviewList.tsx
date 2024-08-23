import Review from "@/components/public/Review/Review"
import { IAllReview } from "@/types/review/review"

const MeetingReviewList = ({ reviews }: { reviews: Array<IAllReview> | undefined }) => {
  return (
    <div className="border-t-2 border-primary py-6">
      <p className="text-base font-semibold leading-7 text-[#11827] sm:text-lg">
        이용자들은 이 프로그램을 이렇게 느꼈어요!
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <Review
                key={review.id}
                score={review.score}
                comment={review.comment}
                gathering={review.Gathering}
                createdAt={review.createdAt}
                user={review.User}
              />
            )
          })
        ) : (
          <div className="flex items-center justify-center whitespace-nowrap py-60 text-sm text-gray-500 max-sm:p-40">
            아직 리뷰가 없어요
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingReviewList
