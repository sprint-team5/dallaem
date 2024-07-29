import getAllReview from "@/actions/allReviewActions"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const allReviewOptions = () => {
  return queryOptions({
    queryKey: ["allReview"],
    queryFn: getAllReview,
  })
}

export const useAllReview = () => {
  const { data: reviews, isLoading, isSuccess } = useSuspenseQuery(allReviewOptions())
  return { reviews, isLoading, isSuccess }
}
