// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import { fetchMyPageInfo } from "@/actions/fetchMyPageInfo"
import MyPageInfoTap from "@/components/pages/mypage/MyPageInfoTap"
import ProfileBox from "@/components/public/ProfileBox"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

// fixme: userToken 생성 후 middleware로 이동 예정
// if (!cookies().get("userToken")) {
//   redirect("/")
// }

const MyPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["mypage", {}],
    queryFn: () => {
      return fetchMyPageInfo({ offset: 5, limit: 5 })
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
