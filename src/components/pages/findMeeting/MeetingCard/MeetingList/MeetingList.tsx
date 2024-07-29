import Image from "next/image"
import Link from "next/link"

import Spinner from "@/components/public/Spinner/Spinner"
import { IMeetingData } from "@/types/meeting/meeting"
import dayjs from "dayjs"

import DateTag from "../Atoms/DateTag"
import ParticipantGage from "../Atoms/ParticipantGage"

interface IMeetingListProps {
  data: Array<IMeetingData> | null
  status: string
  error: Error | null
}

const MeetingCard = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="flex w-full overflow-hidden rounded-3xl border-2 border-gray-100 bg-white max-sm:flex-col">
      {data.image && (
        <div className="relative h-[156px]">
          <Image
            src={data.image}
            alt={data.name}
            width={280}
            height={156}
            className="!h-full object-cover max-sm:w-full"
          />
          {dayjs(data.registrationEnd).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") && (
            <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-orange-600 px-[10px] py-[4px]">
              <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
              <span className="text-xs text-white">
                오늘 {dayjs(data.registrationEnd).format("H")}시 마감
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex grow flex-col justify-between px-6 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold">{data.name}</div>
              <div className="h-3 w-[2px] bg-gray-900" />
              <div className="text-sm font-medium text-gray-700">{data.location}</div>
            </div>
            <DateTag date={data.dateTime} />
          </div>
          {/* TODO: 찜하기 버튼 추가 필요 */}
          <Image
            src="/icon/dynamicIcon/heart.svg"
            alt="찜하기"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image
              src="/icon/staticIcon/person.svg"
              alt="참가인원"
              width={16}
              height={16}
              className="mr-[2px]"
            />
            <span className="text-sm">{`${data.participantCount}/${data.capacity}`}</span>
            {Number(data.participantCount) <= 5 && (
              <>
                <Image
                  src="/icon/staticIcon/confirmed.svg"
                  alt="개설확정"
                  width={24}
                  height={24}
                  className="ml-[11px] mr-[6px]"
                />
                <div className="text-sm text-orange-500">개설확정</div>
              </>
            )}
          </div>
          <div className="mt-2 flex">
            <ParticipantGage now={data.participantCount} max={data.capacity} />
          </div>
        </div>
      </div>
    </div>
  )
}

const MeetingList = ({ data, status, error }: IMeetingListProps) => {
  return (
    <>
      {status === "pending" && (
        <div className="h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {status === "success" && (
        <>
          {data?.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              모임 정보가 없습니다.
            </div>
          )}
          <div className="flex flex-col gap-6">
            {data?.map((meeting) => {
              return (
                <Link href={`/findMeeting/${meeting.id}`} key={meeting.id}>
                  <MeetingCard key={meeting.id} data={meeting} />
                </Link>
              )
            })}
          </div>
        </>
      )}
      {error && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image src="/icon/staticIcon/X.svg" alt="Error" width={48} height={48} />
          에러가 발생했습니다.
        </div>
      )}
    </>
  )
}
export default MeetingList
