import getAllReview from "@/actions/allReviewActions"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const allReviewOptions = (location: any) => {
  return queryOptions({
    queryKey: ["allReview", location],
    queryFn: getAllReview,
  })
}

export const useAllReview = (location: any) => {
  const {
    data: reviews,
    isLoading,
    isSuccess,
    refetch,
  } = useSuspenseQuery(allReviewOptions(location))
  return { reviews, isLoading, isSuccess, refetch }
}
