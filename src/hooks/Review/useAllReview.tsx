import getAllReview from "@/actions/allReviewActions"
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
      // api에서 cursor 혹은 total을 지원안해줘서 일단 간단하게 작업해둔 상태
      if (lastPage.length < 10) return undefined
      return pages.length * 10
    },
  })
  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }
}
