const ButtonStyle =
  "rounded-3xl h-8 px-3 flex items-center justify-center text-sm font-medium leading-5"

const Card = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative h-[156px] w-[280px] flex-none rounded-3xl bg-gray-500">
        {/* <Image src={} fill alt="이미지 이름" /> */}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className={`bg-orange-100 text-orange-600 ${ButtonStyle}`}>이용 예정</div>
          <div className={`bg-gray-200 text-gray-500 ${ButtonStyle}`}>이용 완료</div>
          <div className={`border border-orange-100 text-orange-500 ${ButtonStyle}`}>
            (체크 아이콘) 개설확정
          </div>
          <div className={`border border-gray-200 text-gray-500 ${ButtonStyle}`}>개설대기</div>
        </div>
        <h3 className="mt-3 flex items-center text-lg font-semibold leading-7 text-gray-900">
          달램핏 오피스 스트레칭
          <span className="fonst-medium ml-2 border-l-2 border-gray-900 pl-2 text-sm leading-5 text-gray-700">
            을지로 3가
          </span>
        </h3>
        <div className="flex gap-3 text-sm font-medium leading-5 text-gray-700">
          <p>1월 7일 · 17:30</p>
          <div className="flex">
            (사람 이모티콘)
            <p className="test-sm font-medium leading-5">20/20</p>
          </div>
        </div>
        <button
          className="mt-[18px] h-10 w-[120px] rounded-xl border border-orange-600 text-sm font-semibold leading-5 text-orange-600"
          type="button"
        >
          예약 취소하기
        </button>
        <button
          className="mt-[18px] h-10 w-[120px] rounded-xl border border-orange-600 text-sm font-semibold leading-5 text-orange-600"
          type="button"
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  )
}

export default Card
