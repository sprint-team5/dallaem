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
    <main>
      <ProfileBox />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageInfoTap />
      </HydrationBoundary>
    </main>
  )
}

export default MyPage
