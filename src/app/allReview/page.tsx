import { Metadata } from "next"
import Image from "next/image"

import getQueryClient from "@/components/app/queryClient"
import List from "@/components/pages/allReview/List"
import Scores from "@/components/pages/allReview/Scores/Scores"
import { allReviewOptions } from "@/hooks/Review/useAllReview"
import HeadReviewIMG from "@public/img/head_review.png"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

export const metadata: Metadata = {
  title: "같이달램 | 모든 리뷰",
}

const AllReviewsPage = async () => {
  const options = allReviewOptions({})
  const queryClient = getQueryClient()

  const hasNotDefaultData = !queryClient.getQueryData(options.queryKey)

  if (hasNotDefaultData) {
    queryClient.prefetchQuery(options)
  }

  return (
    <main>
      <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
        <div className="flex-none">
          <div className="flex items-center gap-4 sm:gap-[13px]">
            <div className="size-[72px] flex-none">
              <Image width={72} height={72} src={HeadReviewIMG.src} alt="HeadReviewIMG" />
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

        <div className="flex flex-1 flex-col py-6">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  )
}

export default AllReviewsPage
