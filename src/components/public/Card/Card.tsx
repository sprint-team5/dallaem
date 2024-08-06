import Image from "next/image"

import { MouseEvent } from "react"

import Checkbox from "@/components/public/icon/dynamicIcon/Checkbox"
import Person from "@/components/public/icon/staticIcon/Person"
import dayjs from "dayjs"

import CardCancel from "./CardCancel"
import CardReview from "./CardReview"

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
  handlerCancel?: () => void
  handlerReview?: () => void
  handlerView?: (e: MouseEvent) => void
  isMy?: boolean
  isBtnHide?: boolean
  isReview?: boolean
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
 * @param {boolean} isMy - 마이페이지에서의 UI를 수정해줍니다
 * @param {boolean} isBtnHide - 버튼을 숨겨줍니다. ( 예약취소, 리뷰등록 등 )
 * @param {boolean} isReview - 내가 쓴 리뷰 보기
 * @param {function} handlerCancel - 예약취소 onClick
 * @param {function} handlerReview - 리뷰등록 onClick
 * @param {function} handlerView - 내가쓴 리뷰 onClick
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
  handlerCancel,
  handlerReview,
  handlerView,
  isMy,
  isBtnHide,
  isReview,
}: ICardProps) => {
  const renderButton = () => {
    if (isReview) {
      return <CardReview onClick={handlerView}>내가 쓴 리뷰 보기</CardReview>
    }

    if (dayjs().isAfter(dayjs(registrationEnd))) {
      return <CardReview onClick={handlerReview}>리뷰 작성하기</CardReview>
    }

    return <CardCancel handlerCancel={handlerCancel} />
  }

  return (
    <div className="flex flex-col gap-4 border-b-2 border-dashed border-gray-200 pb-6 sm:flex-row">
      <div className="relative h-[156px] w-full flex-none overflow-hidden rounded-3xl sm:w-[280px]">
        {image ? (
          <Image
            className="object-cover object-center"
            src={image}
            alt={`모임 이미지 ${teamId} ${id}`}
            fill
          />
        ) : (
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-500" />
        )}
      </div>
      <div className="flex flex-col">
        {!isMy && (
          <div className="mb-3 flex gap-2">
            {dayjs().isAfter(dayjs(registrationEnd)) ? (
              <div className={`bg-gray-200 text-gray-500 ${ButtonStyle}`}>이용 완료</div>
            ) : (
              <>
                <div className={`bg-orange-100 text-orange-600 ${ButtonStyle}`}>이용 예정</div>

                {participantCount >= 5 ? (
                  <div className={`border border-orange-100 text-orange-500 ${ButtonStyle}`}>
                    <Checkbox state="active" /> 개설확정
                  </div>
                ) : (
                  <div className={`border border-gray-200 text-gray-500 ${ButtonStyle}`}>
                    개설대기
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!isMy ? (
          <h3 className="flex items-center text-lg font-semibold leading-7 text-gray-900">
            {name}
            <span className="ml-2 border-l-2 border-gray-900 pl-2 text-sm font-medium leading-5 text-gray-700">
              {location}
            </span>
          </h3>
        ) : (
          <div>
            <h3 className="text-lg font-semibold leading-7 text-gray-900">{name}</h3>
            <p className="mt-2 text-sm font-medium leading-5 text-gray-700">{location}</p>
          </div>
        )}

        <div className="flex gap-3 text-sm font-medium leading-5 text-gray-700">
          <p>{dayjs(dateTime).format("M월 D일 · HH:mm")}</p>
          <div className="flex items-center">
            <Person />
            <p className="test-sm font-medium leading-5">
              {participantCount}/{capacity}
            </p>
          </div>
        </div>

        {!isBtnHide && <div className="mt-[18px]">{renderButton()}</div>}
      </div>
    </div>
  )
}

export default Card
