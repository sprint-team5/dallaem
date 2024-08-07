import getAllReview from "@/actions/allReviewActions"
import LIMIT from "@/constants/limit"
import { IFilter } from "@/types/review/filter"
import { queryOptions, useInfiniteQuery } from "@tanstack/react-query"

export const allReviewOptions = (filter: IFilter | {}) => {
  return queryOptions({
    queryKey: ["allReview", filter],
    queryFn: () => {
      return getAllReview(filter)
    },
  })
}

export const useAllReview = (filter: IFilter | {}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["allReview", filter],
    queryFn: ({ pageParam = 0 }) => {
      return getAllReview(filter, pageParam)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < LIMIT) {
        return undefined
      }
      return pages.length
    },
  })

  const dataPage = data?.pages ?? []

  return { data: dataPage, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }
}
