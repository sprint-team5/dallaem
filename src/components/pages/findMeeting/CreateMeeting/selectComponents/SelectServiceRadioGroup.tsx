import { ISelectServiceRadioGroupProps } from "@/types/findMeeting/findMeeting"

import SelectServiceButton from "./SelectServiceButton"

const SelectServiceRadioGroup = ({
  meetingData,
  setMeetingData,
}: ISelectServiceRadioGroupProps) => {
  const ButtonList = [
    { category: "달램핏", detail: "오피스 스트레칭", type: "OFFICE_STRETCHING" },
    { category: "달램핏", detail: "마인드풀니스", type: "MINDFULNESS" },
    { category: "워케이션", detail: "", type: "WORKATION" },
  ]

  const changeServiceType = (val: string) => {
    setMeetingData({ ...meetingData, type: val })
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
