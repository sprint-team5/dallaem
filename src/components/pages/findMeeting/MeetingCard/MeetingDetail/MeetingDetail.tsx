"use client"

import Image from "next/image"

import { useMeetingDetail } from "@/hooks/useMeetingDetail"
import { IMeetingData } from "@/types/meeting/meeting"
import dayjs from "dayjs"

import DateTag from "../Atoms/DateTag"
import ParticipantGage from "../Atoms/ParticipantGage"

const MeetingDetailImage = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="relative aspect-[19/10] h-[270px] w-1/2 overflow-hidden rounded-3xl border-2 border-gray-200 max-sm:h-auto max-sm:w-full">
      <Image
        src={data.image}
        alt={data.name}
        width={486}
        height={270}
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
  )
}

const MeetingDetailCard = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="flex w-1/2 overflow-hidden rounded-3xl border-2 border-gray-100 bg-white max-sm:w-full max-sm:flex-col">
      <div className="flex grow flex-col justify-between px-6 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{data.name}</div>
            <div className="mb-3 text-sm font-medium text-gray-700">{data.location}</div>
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
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">{`모집정원 ${data.participantCount}명`}</span>
            {Number(data.participantCount) <= 5 && (
              <div className="flex">
                <Image
                  src="/icon/staticIcon/confirmed.svg"
                  alt="개설확정"
                  width={24}
                  height={24}
                  className="ml-[11px] mr-[6px]"
                />
                <div className="text-sm text-orange-500">개설확정</div>
              </div>
            )}
          </div>
          <ParticipantGage now={data.participantCount} max={data.capacity} />
          <div className="flex justify-between">
            <span className="text-xs text-gray-700">최소인원 5명</span>
            <span className="text-xs text-gray-700">{`최대인원 ${data.capacity}명`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const MeetingDetail = ({ id }: { id: string }) => {
  const { data, status, error } = useMeetingDetail(id)
  return (
    <>
      {status === "success" && (
        <div className="flex gap-6 max-sm:flex-col">
          <MeetingDetailImage data={data} />
          <MeetingDetailCard data={data} />
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center p-80">모임을 찾을 수 없습니다.</div>
      )}
    </>
  )
}
export default MeetingDetail
