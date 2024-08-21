import getQueryClient from "@/components/app/queryClient"
import Banner from "@/components/pages/mainpage/Banner"
import MainReview from "@/components/pages/mainpage/MainReview"
import NewMeeting from "@/components/pages/mainpage/NewMeeting"
import { allReviewOptions } from "@/hooks/Review/useAllReview"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import "swiper/css"

const Home = () => {
  const allReviewQueryClient = getQueryClient()

  allReviewQueryClient.prefetchQuery(allReviewOptions({}))

  return (
    <main>
      <Banner />
      <div className="mx-6 my-12 md:mx-12">
        <div className="rounded-[20px] bg-white px-6 py-12 md:px-10 lg:px-12">
          <NewMeeting />
        </div>
        <div className="mt-12 rounded-[20px] bg-white px-6 py-12 md:px-10 lg:px-12">
          <h1 className="text-xl font-bold md:text-2xl">모임 이용자들의 실제 후기</h1>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:gap-x-12">
            <HydrationBoundary state={dehydrate(allReviewQueryClient)}>
              <MainReview />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
