import { Dispatch, SetStateAction } from "react"

import SelectServiceButton from "./SelectServiceButton"

interface IMeetingData {
  location: string
  type: string
  name: string
  date: string
  time: string
  capacity: number
  image: {
    file: File | null
    name: string
  }
  registrationEnd: string
}

const SelectServiceRadioGroup = ({
  meetingData,
  setMeetingData,
}: {
  meetingData: IMeetingData
  setMeetingData: Dispatch<SetStateAction<IMeetingData>>
}) => {
  const ButtonList = [
    { category: "달램핏", detail: "오피스 스트레칭", type: "OFFICE_STRETCHING" },
    { category: "달램핏", detail: "마인드풀니스", type: "MINDFULNESS" },
    { category: "워케이션", detail: "", type: "WORKATION" },
  ]

  const changeServiceType = (val: string) => {
    setMeetingData({ ...meetingData, type: val })
  }
  return (
    <div className="flex gap-3">
      {ButtonList.map((button) => {
        return (
          <SelectServiceButton
            onClick={changeServiceType}
            key={button.type}
            category={button.category}
            detail={button.detail}
            state={meetingData.type === button.type}
            type={button.type}
          />
        )
      })}
    </div>
  )
}

export default SelectServiceRadioGroup
