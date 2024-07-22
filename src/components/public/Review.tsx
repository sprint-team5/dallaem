const Review = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-[280px] h-[156px] relative bg-gray-500 rounded-3xl flex-none">
        {/* <Image src={} alt="" width={} /> */}
      </div>
      <div>
        <div className="flex gap-1">
          (하트 아이콘) (하트 아이콘) (하트 아이콘) (하트 아이콘) (하트 아이콘)
        </div>
        <h3 className="text-sm font-medium leading-5 mt-[10px] break-keep">
          따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게
          같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면
          좋겠어요.
        </h3>
        <p className="text-gray-700 text-xs font-medium leading-4 mt-[10px]">
          달램핏 오피스 스트레칭 이용 · 을지로 3가
        </p>
        <div className="flex mt-2 items-center">
          <div>(유저 이미지)</div>
          <div className="flex text-xs font-medium leading-4 items-center ml-2">
            <p className="pr-2 mr-3 text-gray-700">럽윈즈올</p>
            <p className="text-gray-500">2024.01.25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
