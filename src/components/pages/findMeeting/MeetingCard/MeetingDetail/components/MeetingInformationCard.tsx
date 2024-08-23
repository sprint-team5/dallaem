import Image from "next/image"

import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import ParticipantGage from "@/components/pages/findMeeting/MeetingCard/Atoms/ParticipantGage"
import WishBtn from "@/components/pages/wishlist/WishBtn"
import { IMeetingData } from "@/types/findMeeting/findMeeting"

const MeetingInformationCard = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="flex w-1/2 overflow-hidden rounded-3xl border-2 border-gray-100 bg-white max-sm:w-full max-sm:flex-col">
      <div className="flex grow flex-col justify-between px-6 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{data.name}</div>
            <div className="mb-3 text-sm font-medium text-gray-700">{data.location}</div>
            <DateTag date={data.dateTime} />
          </div>
          <WishBtn list={data} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">{`모집정원 ${data.participantCount}명`}</span>
            {Number(data.participantCount) >= 5 && (
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

export default MeetingInformationCard
