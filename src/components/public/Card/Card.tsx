import Image from "next/image"

import dayjs from "dayjs"

interface IHandler {
  teamId: string
  id: number
}

interface ICardProps extends IHandler {
  name: string
  dateTime: string
  location: string
  participantCount: number
  capacity: number
  image: string
  registrationEnd: string
}

const ButtonStyle =
  "rounded-3xl h-8 px-3 flex items-center justify-center text-sm font-medium leading-5"

/**
 * @interface ICardProps
 * @param {string} teamId - 팀 ID
 * @param {number} id - 모임 ID
 * @param {string} name - 모임 타이틀 문구
 * @param {string} dateTime - 모임 날짜 및 시간
 * @param {string} location - 모임 장소
 * @param {number} participantCount - 참여 인원
 * @param {number} capacity - 모집 정원 (최소 5인 이상)
 * @param {string} image - 모임 이미지
 * @param {string} registrationEnd - 모임 모집 마감 날짜 및 시간
 */
const Card = ({
  teamId,
  id,
  name,
  dateTime,
  location,
  participantCount,
  capacity,
  image,
  registrationEnd,
}: ICardProps) => {
  return (
    <div className="flex flex-col gap-4 border-b-2 border-dashed border-gray-200 pb-6 sm:flex-row">
      <div className="relative h-[156px] w-full flex-none rounded-3xl bg-gray-500 sm:w-[280px]">
        <Image
          className="object-cover object-center"
          src={image || "/img/profile/defaultProfile.png"}
          fill
          alt={`이미지 이름 ${teamId} ${id}`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          {dayjs().isAfter(dayjs(registrationEnd)) ? (
            <div className={`bg-gray-200 text-gray-500 ${ButtonStyle}`}>이용 완료</div>
          ) : (
            <div className={`bg-orange-100 text-orange-600 ${ButtonStyle}`}>이용 예정</div>
          )}
          {participantCount >= 5 ? (
            <div className={`border border-orange-100 text-orange-500 ${ButtonStyle}`}>
              (체크 아이콘) 개설확정
            </div>
          ) : (
            <div className={`border border-gray-200 text-gray-500 ${ButtonStyle}`}>개설대기</div>
          )}
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
        {dayjs().isAfter(dayjs(registrationEnd)) ? (
          <button
            className="mt-[18px] h-10 w-[120px] rounded-xl border border-orange-600 bg-orange-600 text-sm font-semibold leading-5 text-white transition-colors hover:bg-white hover:text-orange-600"
            type="button"
          >
            리뷰 작성하기
          </button>
        ) : (
          <button
            className="mt-[18px] h-10 w-[120px] rounded-xl border border-orange-600 text-sm font-semibold leading-5 text-orange-600 transition-colors hover:bg-orange-600 hover:text-white"
            type="button"
          >
            예약 취소하기
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
