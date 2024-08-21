import { MouseEvent } from "react"

import { ISelectTimeButton } from "@/types/findMeeting/findMeeting"
import dayjs from "dayjs"

const SelectTimeButton = ({ meetingData, setMeetingData, timeList }: ISelectTimeButton) => {
  const checkDisabled = (time: string) => {
    if (meetingData.date === "") return true
    const now = dayjs().format("YYYY-MM-DDTHH")
    const compare = dayjs(meetingData.date + time).format("YYYY-MM-DDTHH")

    return dayjs(compare).isBefore(now) || dayjs(compare).isSame(now)
  }

  const changeDateTime = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if (target.disabled || !target.textContent) return
    setMeetingData({ ...meetingData, time: target.textContent })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {timeList.map((time) => {
        const isDisabled = checkDisabled(time)
        const isSelected = meetingData.time === time

        return (
          <button
            disabled={isDisabled}
            key={time}
            type="button"
            className={`rounded-lg border-[1px] border-gray-200 px-3 py-[6px] leading-5 ${isSelected ? "bg-gray-900" : "bg-gray-50"} ${isDisabled && "!bg-gray-200"}`}
            onClick={changeDateTime}
          >
            <span
              className={`text-sm ${isSelected ? "text-white" : "text-gray-900"} ${isDisabled && "!text-gray-400"}`}
            >
              {time}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default SelectTimeButton
