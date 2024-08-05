import getAllReview from "@/actions/allReviewActions"
import { IFilter } from "@/types/review/filter"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const allReviewOptions = (filter: IFilter | {}) => {
  return queryOptions({
    queryKey: ["allReview", filter],
    queryFn: () => {
      return getAllReview(filter)
    },
  })
}

export const useAllReview = () => {
  const { data: reviews, isLoading } = useQuery(allReviewOptions({}))
  return { reviews, isLoading }
}
