import { fetchMyPageInfo } from "@/actions/fetchMyPageInfo"
import MyPageInfoTap from "@/components/pages/mypage/MyPageInfoTap"
import ProfileBox from "@/components/public/ProfileBox"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const MyPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["mypage", {}],
    queryFn: () => {
      return fetchMyPageInfo({ offset: 0, limit: 5 })
    },
  })

  return (
    <main className="flex h-full flex-col items-stretch gap-3 pt-28">
      <ProfileBox />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageInfoTap />
      </HydrationBoundary>
    </main>
  )
}

export default MyPage
