import getAllReview, { IAllReviewProps } from "@/actions/allReviewActions"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const allReviewOptions = ({
  gatheringId = "",
  userId = "",
  location = "",
  date = "",
  registrationEnd = "",
  sortBy = "",
  sortOrder = "",
  limit = 1,
  offset = 0,
}: IAllReviewProps) => {
  return queryOptions({
    queryKey: [
      "allReview",
      gatheringId,
      userId,
      location,
      date,
      registrationEnd,
      sortBy,
      sortOrder,
      limit,
      offset,
    ],
    queryFn: getAllReview,
  })
}

export const useAllReview = (props: IAllReviewProps) => {
  const { data: reviews, isLoading, isError } = useSuspenseQuery(allReviewOptions(props))
  return { reviews, isLoading, isError }
}
