import List from "@/components/pages/wishlist/List"
import Head from "@/components/public/img/Head"

const WishListPage = () => {
  return (
    <main>
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col bg-white px-4 pb-[51px] pt-6 sm:px-6 sm:pt-[40px] md:px-[102px]">
        <div className="flex-none">
          <div className="flex items-center gap-4 sm:gap-[13px]">
            <div className="size-[72px] flex-none">
              <Head state="saved" />
            </div>
            <div>
              <h4 className="text-lg font-semibold leading-8 text-gray-900 sm:text-2xl">
                찜한 모임
              </h4>
              <p className="left-5 mt-2 text-sm font-medium text-gray-700">
                마감되기 전에 지금 바로 참여해보세요 👀
              </p>
            </div>
          </div>
        </div>
        <List />
      </div>
    </main>
  )
}

export default WishListPage
