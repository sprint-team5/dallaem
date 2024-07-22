import Image from "next/image"

import dayjs from "dayjs"

interface CardProps {
  /**
   * 이름
   */
  name: string
  /**
   * 날짜
   */
  dateTime: string
  /**
   * 뭐지
   */
  registrationEnd: string
  /**
   * 주소
   */
  location: string
  /**
   * 참여 인원
   */
  participantCount: number
  /**
   * 최대 인원
   */
  capacity: number
  /**
   * 이미지 주소
   */
  image: string
  /**
   * 생성일
   */
  createdBy: number
  /**
   * 취소날짜
   */
  canceledAt: string
  /**
   * 어떤거지
   */
  joinedAt: string
}

const ButtonStyle =
  "rounded-3xl h-8 px-3 flex items-center justify-center text-sm font-medium leading-5"

const Card = ({
  name,
  dateTime,
  registrationEnd,
  location,
  participantCount,
  capacity,
  image,
  createdBy,
  canceledAt,
  joinedAt,
}: CardProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative h-[156px] w-[280px] flex-none rounded-3xl bg-gray-500">
        <Image src={image} fill alt="이미지 이름" />
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
          {name}
          <span className="fonst-medium ml-2 border-l-2 border-gray-900 pl-2 text-sm leading-5 text-gray-700">
            {location}
          </span>
        </h3>
        <div className="flex gap-3 text-sm font-medium leading-5 text-gray-700">
          <p>{dayjs(dateTime).format("M월 D일 · HH:mm")}</p>
          <div className="flex">
            (사람 이모티콘)
            <p className="test-sm font-medium leading-5">
              {participantCount}/{capacity}
            </p>
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
