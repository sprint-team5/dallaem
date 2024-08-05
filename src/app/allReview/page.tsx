import getQueryClient from "@/components/app/queryClient"
import List from "@/components/pages/allReview/List"
import Scores from "@/components/pages/allReview/Scores/Scores"
import Head from "@/components/public/img/Head"
import { allReviewOptions } from "@/hooks/Review/useAllReview"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

const AllReviewsPage = async () => {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(allReviewOptions({}))

  return (
    <main>
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col bg-gray-50 px-4 pb-[51px] pt-6 sm:px-6 sm:pt-[40px] md:px-[102px]">
        <div className="flex-none">
          <div className="flex items-center gap-4 sm:gap-[13px]">
            <div className="size-[72px] flex-none">
              <Head state="review" />
            </div>
            <div>
              <h4 className="text-lg font-semibold leading-8 text-gray-900 sm:text-2xl">
                모든 리뷰
              </h4>
              <p className="left-5 mt-2 text-sm font-medium text-gray-700">
                같이달램을 이용한 분들은 이렇게 느꼈어요 🫶
              </p>
            </div>
          </div>
        </div>

        <Scores />

        <div className="flex flex-1 flex-col border-t-2 border-gray-900 px-4 py-6 sm:px-6">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  )
}

export default AllReviewsPage
