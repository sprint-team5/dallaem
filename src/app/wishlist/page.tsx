import Image from "next/image"

import List from "@/components/pages/wishlist/List"
import HeadSavedIMG from "@public/img/head_saved.png"

const WishListPage = () => {
  return (
    <main>
      <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-white px-6 py-14 md:m-12 md:px-16">
        <div className="flex-none">
          <div className="flex items-center gap-4 sm:gap-[13px]">
            <div className="size-[72px] flex-none">
              <Image width={72} height={72} src={HeadSavedIMG.src} alt="HeadSavedIMG" />
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
