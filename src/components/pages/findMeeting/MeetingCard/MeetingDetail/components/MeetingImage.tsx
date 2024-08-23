import Image from "next/image"

import { IMeetingData } from "@/types/findMeeting/findMeeting"
import { msTransform } from "@/util/days"
import dayjs from "dayjs"

const MeetingImage = ({ data }: { data: IMeetingData }) => {
  const dayRender = (registrationEnd: string) => {
    if (dayjs(registrationEnd).diff(dayjs(), "day") === 7) {
      return <>다음주 마감</>
    }

    if (dayjs(registrationEnd).diff(dayjs(), "day") > 0) {
      return <>{dayjs(registrationEnd).diff(dayjs(), "day")}일 후 마감</>
    }

    if (dayjs(registrationEnd).diff(dayjs(), "hour") <= 24) {
      return <>오늘 {dayjs(registrationEnd).diff(dayjs(), "hour")}시 마감</>
    }

    return null
  }

  return (
    <div className="relative aspect-[19/10] h-[270px] w-1/2 overflow-hidden rounded-3xl border-2 border-gray-200 max-sm:h-auto max-sm:w-full">
      <Image
        src={data.image}
        alt={data.name}
        width={486}
        height={270}
        className="!h-full w-full object-cover"
      />
      {msTransform(data.registrationEnd) > dayjs().unix() && (
        <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-primary px-[10px] py-[4px]">
          <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
          <span className="text-xs text-white">{dayRender(data.registrationEnd)}</span>
        </div>
      )}
    </div>
  )
}

export default MeetingImage
