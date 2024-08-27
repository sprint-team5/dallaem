import MyPageInfoTap from "@/components/pages/mypage/MyPageInfoTap"
import ProfileBox from "@/components/public/ProfileBox"
import MyPagePrefetchOption from "@/hooks/mypage/myPageQuery"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const MyPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(MyPagePrefetchOption())

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
