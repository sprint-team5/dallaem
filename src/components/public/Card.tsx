const ButtonStyle =
  "rounded-3xl h-8 px-3 flex items-center justify-center text-sm font-medium leading-5";

const Card = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-[280px] h-[156px] relative bg-gray-500 rounded-3xl flex-none">
        {/* <Image src={} fill alt="이미지 이름" /> */}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className={`bg-orange-100 text-orange-600 ${ButtonStyle}`}>
            이용 예정
          </div>
          <div className={` bg-gray-200 text-gray-500 ${ButtonStyle}`}>
            이용 완료
          </div>
          <div
            className={`border border-orange-100 text-orange-500 ${ButtonStyle}`}
          >
            (체크 아이콘) 개설확정
          </div>
          <div
            className={`border border-gray-200 text-gray-500 ${ButtonStyle}`}
          >
            개설대기
          </div>
        </div>
        <h3 className="mt-3 text-lg leading-7  font-semibold text-gray-900 flex items-center">
          달램핏 오피스 스트레칭
          <span className=" text-gray-700 fonst-medium text-sm leading-5 pl-2 ml-2 border-l-2 border-gray-900">
            을지로 3가
          </span>
        </h3>
        <div className="flex gap-3 text-gray-700 text-sm font-medium leading-5">
          <p>1월 7일 · 17:30</p>
          <div className="flex">
            (사람 이모티콘)
            <p className="test-sm font-medium leading-5">20/20</p>
          </div>
        </div>
        <button
          className="mt-[18px] w-[120px] h-10 border border-orange-600 rounded-xl text-orange-600 text-sm leading-5 font-semibold"
          type="button"
        >
          예약 취소하기
        </button>
        <button
          className="mt-[18px] w-[120px] h-10 border border-orange-600 rounded-xl text-orange-600 text-sm leading-5 font-semibold"
          type="button"
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  );
};

export default Card;
