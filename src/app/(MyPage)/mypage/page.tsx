import { fetchMyPageInfo } from "@/actions/Gatherings/fetchMyPageInfo"
import MyPageInfoTap from "@/components/pages/mypage/MyPageInfoTap"
import ProfileBox from "@/components/public/ProfileBox"
import LIMIT from "@/constants/limit"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const MyPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["mypage", {}],
    queryFn: () => {
      return fetchMyPageInfo({ offset: 0, limit: LIMIT })
    },
    staleTime: 1000,
    gcTime: 1000,
  })

  return (
    <div className="flex h-full flex-col items-stretch gap-3">
      <ProfileBox />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageInfoTap />
      </HydrationBoundary>
    </div>
  )
}

export default MyPage
