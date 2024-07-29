import List from "@/app/allReview/List"
import getQueryClient from "@/components/app/queryClient"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import Head from "@/components/public/img/Head"
import { allReviewOptions } from "@/hooks/useAllReview"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

const AllReviewsPage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(allReviewOptions())

  return (
    <main className="bg-slate-400">
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col bg-white px-4 pb-[51px] pt-6 sm:px-6 sm:pt-[40px] md:px-[102px]">
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

          <div className="mt-8">필터 부분</div>
        </div>

        <div className="mt-6 flex h-[180px] items-center justify-center gap-5 border-b border-t sm:gap-[120px] md:gap-[188px]">
          <div>
            <p className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl">
              0 <span className="text-gray-400">/5</span>
            </p>
            <div className="mt-2 flex gap-[2px]">
              {Array.from({ length: 5 }, (_, index) => {
                return <Heart key={index + 1} state="default" />
              })}
            </div>
          </div>
          <div>
            {Array.from({ length: 5 }, (_, index) => {
              return (
                <div
                  key={index + 1}
                  className="mt-1 flex items-center gap-3 text-sm font-medium leading-5 first:mt-0"
                >
                  <p className="w-[21px] flex-none">{5 - index}점</p>
                  <div className="relative h-1 w-[84px] rounded-full bg-gray-200 sm:w-[240px]">
                    <div className="absolute left-0 top-0" />
                  </div>
                  <p className="flex-none">0</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col border-t-2 border-gray-900 px-4 py-6 sm:px-6">
          <div>필터</div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  )
}

export default AllReviewsPage
