import Image from "next/image"

import { IMeetingData } from "@/types/findMeeting/findMeeting"
import dayjs from "dayjs"

const MeetingImage = ({ data }: { data: IMeetingData }) => {
  const dayRender = (registrationEnd: string) => {
    // 오늘
    const now = dayjs()
    // 마감일
    const end = dayjs(registrationEnd)
    // 마감일까지의 날짜
    const diffDays = end.diff(now, "day")
    // 마감일까지의 시간
    const diffHours = end.diff(now, "hour")
    // 마감일까지의 분
    const diffMinutes = end.diff(now, "minute")

    // 마감일까지의 날짜 시간 차이가 0보다 작은 경우
    if (diffDays < 0 || diffHours < 0) {
      return <>마감되었습니다</>
    }

    // 마감일까지의 날짜 차이가 7일인 경우
    if (diffDays === 7) {
      return <>다음주 마감</>
    }

    // 마감일까지의 날짜 차이가 7일보다 큰 경우
    if (diffDays > 0) {
      return <>{diffDays}일 후 마감</>
    }

    // 마감일까지의 시간 차이가 0보다 크고 24시간보다 큰 경우
    if (diffHours <= 24 && diffHours > 0) {
      return <>오늘 {diffHours}시간 후 마감</>
    }

    // 마감일까지의 시간 차이 1시간 이하인 경우
    const hoursRemaining = Math.floor(diffMinutes / 60)
    const minutesRemaining = diffMinutes % 60
    return (
      <>
        남은 시간: {hoursRemaining}시간 {minutesRemaining}분
      </>
    )
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
      <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-primary px-[10px] py-[4px]">
        <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
        <span className="text-xs text-white">{dayRender(data.registrationEnd)}</span>
      </div>
    </div>
  )
}

export default MeetingImage
