const Review = () => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="relative h-[156px] w-[280px] flex-none rounded-3xl bg-gray-500">
        {/* <Image src={} alt="" width={} /> */}
      </div>
      <div>
        <div className="flex gap-1">
          (하트 아이콘) (하트 아이콘) (하트 아이콘) (하트 아이콘) (하트 아이콘)
        </div>
        <h3 className="mt-[10px] break-keep text-sm font-medium leading-5">
          따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까
          너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.
        </h3>
        <p className="mt-[10px] text-xs font-medium leading-4 text-gray-700">
          달램핏 오피스 스트레칭 이용 · 을지로 3가
        </p>
        <div className="mt-2 flex items-center">
          <div>(유저 이미지)</div>
          <div className="ml-2 flex items-center text-xs font-medium leading-4">
            <p className="mr-3 pr-2 text-gray-700">럽윈즈올</p>
            <p className="text-gray-500">2024.01.25</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
