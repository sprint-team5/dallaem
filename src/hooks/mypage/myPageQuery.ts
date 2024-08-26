import { fetchMyPageInfo } from "@/actions/Gatherings/fetchMyPageInfo"
import LIMIT from "@/constants/limit"
import { queryOptions } from "@tanstack/react-query"

const MyPagePrefetchOption = () => {
  return queryOptions({
    queryKey: ["mypage", {}],
    queryFn: () => {
      return fetchMyPageInfo({ offset: 0, limit: LIMIT })
    },
    staleTime: 1000,
    gcTime: 1000,
  })
}

export default MyPagePrefetchOption
