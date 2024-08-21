import Image from "next/image"
import Link from "next/link"

import Person from "@/components/public/icon/staticIcon/Person"
import { MyCardProps } from "@/types/findMeeting/findMeeting"
import { formatToDate } from "@/util/days"

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
 */
const MyCard = ({
  teamId,
  id,
  name,
  dateTime,
  location,
  participantCount,
  capacity,
  image,
  children,
}: MyCardProps) => {
  return (
    <Link href={`/findMeeting/${id}`}>
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
          <div>
            <h3 className="text-lg font-semibold leading-7 text-gray-900">{name}</h3>
            <p className="mt-2 text-sm font-medium leading-5 text-gray-700">{location}</p>
          </div>

          <div className="flex gap-3 text-sm font-medium leading-5 text-gray-700">
            <p>{formatToDate({ date: dateTime, format: "M월 D일 · HH:mm" })}</p>
            <div className="flex items-center">
              <Person />
              <p className="test-sm font-medium leading-5">
                {participantCount}/{capacity}
              </p>
            </div>
          </div>

          <div className="mt-[18px]">{children}</div>
        </div>
      </div>
    </Link>
  )
}

export default MyCard
