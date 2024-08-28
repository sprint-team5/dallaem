import getMeetingList from "@/actions/Gatherings/getMeetingList"
import getQueryClient from "@/components/app/queryClient"
import Banner from "@/components/pages/mainpage/Banner"
import MainReview from "@/components/pages/mainpage/MainReview"
import NewMeeting from "@/components/pages/mainpage/NewMeeting"
import LIMIT from "@/constants/limit"
import { allReviewOptions } from "@/hooks/Review/useAllReview"
import { HydrationBoundary, dehydrate, queryOptions } from "@tanstack/react-query"
import "swiper/css"

const Home = () => {
  const meetingOptions = queryOptions({
    queryKey: ["meetingList", {}],
    queryFn: () => {
      return getMeetingList({
        type: "DALLAEMFIT",
        sortBy: "registrationEnd",
        sortOrder: "desc",
        limit: LIMIT,
      })
    },
    staleTime: 1000,
    gcTime: 1000,
  })
  const meetingQueryClient = getQueryClient()
  const options = allReviewOptions({})
  const allReviewQueryClient = getQueryClient()

  const hasNotDefaultData = !meetingQueryClient.getQueryData(meetingOptions.queryKey)
  const hasNotAllReviewData = !allReviewQueryClient.getQueryData(options.queryKey)

  if (hasNotDefaultData) {
    meetingQueryClient.prefetchQuery(meetingOptions)
  }

  if (hasNotAllReviewData) {
    allReviewQueryClient.prefetchQuery(options)
  }

  return (
    <main>
      <Banner />
      <div className="mx-6 my-12 md:mx-12">
        <div className="rounded-[20px] bg-white px-6 py-12 md:px-10 lg:px-12">
          <HydrationBoundary state={dehydrate(meetingQueryClient)}>
            <NewMeeting />
          </HydrationBoundary>
        </div>
        <div className="mt-12 rounded-[20px] bg-white px-6 py-12 md:px-10 lg:px-12">
          <h1 className="text-xl font-bold md:text-2xl">모임 이용자들의 실제 후기</h1>
          <div className="mt-10">
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
