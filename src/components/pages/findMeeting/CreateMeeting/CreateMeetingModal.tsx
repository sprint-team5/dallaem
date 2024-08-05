"use client"

import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { Value } from "react-calendar/dist/cjs/shared/types"

import generateMeetUp from "@/actions/generateMeetUp"
import Calendars from "@/components/public/Calendars/Calendars"
import Arrow from "@/components/public/icon/dynamicIcon/Arrow"
import Checkbox from "@/components/public/icon/dynamicIcon/Checkbox"
import X from "@/components/public/icon/staticIcon/X"
import { location } from "@/constants/meeting"
import { allowScroll, preventScroll } from "@/util/modal"
import dayjs from "dayjs"

import "./styles.scss"

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

const Label = ({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="mb-3 mt-6 font-semibold text-gray-800">
        {label}
      </label>
      {children}
    </>
  )
}

const SelectServiceButton = ({
  category,
  detail,
  state,
  type,
  onClick,
}: {
  category: string
  detail: string
  state: boolean
  type: string
  onClick: (type: string) => void
}) => {
  return (
    <button
      type="button"
      className={`grow rounded-lg p-3 ${state ? "bg-gray-900" : "bg-gray-50"}`}
      onClick={() => {
        onClick(type)
      }}
    >
      <div className="flex h-full items-start gap-[3px]">
        <Checkbox state={state ? "active" : "default"} />
        <div className={`flex flex-col items-start ${state ? "text-white" : "text-gray-900"}`}>
          <span className="font-semibold">{category}</span>
          <div className={`text-xs ${state ? "text-white" : "text-gray-700"}`}>{detail}</div>
        </div>
      </div>
    </button>
  )
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

const SelectTimeButton = ({
  meetingData,
  setMeetingData,
  timeList,
}: {
  meetingData: IMeetingData
  setMeetingData: Dispatch<SetStateAction<IMeetingData>>
  timeList: string[]
}) => {
  const checkDisabled = (time: string) => {
    if (meetingData.date === "") return true
    const now = dayjs().format("YYYY-MM-DDTHH")
    const compare = dayjs(meetingData.date + time).format("YYYY-MM-DDTHH")

    return dayjs(compare).isBefore(now) || dayjs(compare).isSame(now)
  }

  const changeDateTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if (target.disabled || !target.textContent) return
    setMeetingData({ ...meetingData, time: target.textContent })
  }

  return (
    <div className="flex gap-2">
      {timeList.map((time) => {
        const isDisabled = checkDisabled(time)
        const isSelected = meetingData.time === time

        return (
          <button
            disabled={isDisabled}
            key={time}
            type="button"
            className={`rounded-lg border-[1px] border-gray-200 px-3 py-[6px] ${isSelected ? "bg-gray-900" : "bg-gray-50"} ${isDisabled && "!bg-gray-200"}`}
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

const CreateMeetingModal = ({ changeState }: { changeState: () => void }) => {
  const [meetingData, setMeetingData] = useState<IMeetingData>({
    location: "",
    type: "",
    name: "",
    date: "",
    time: "",
    capacity: 0,
    image: { file: null, name: "" },
    registrationEnd: "",
  })

  const modalSelectRef = useRef<HTMLSelectElement>(null)
  const fileLabelRef = useRef<HTMLInputElement>(null)

  const onChangeData = (e: React.ChangeEvent) => {
    let target
    switch (e.target.nodeName) {
      case "SELECT":
        // eslint-disable-next-line no-case-declarations
        target = e.target as HTMLSelectElement
        setMeetingData({ ...meetingData, [target.id]: target.value })
        break
      case "INPUT":
        // eslint-disable-next-line no-case-declarations
        target = e.target as HTMLInputElement
        setMeetingData({ ...meetingData, [target.id]: target.value })
        break
      default:
        break
    }
  }

  const closeBtnKeyboardHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === "Enter" || e.code === "Space") {
      changeState()
    }
  }

  const openFileHandler = (e: KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "Space") document.getElementById("thumbnail")?.click()
  }

  /** 이미지 등록, 라벨 상태 변경 */
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) {
      if (fileLabelRef.current) fileLabelRef.current.textContent = "이미지를 첨부해주세요."
    } else {
      if (fileLabelRef.current) fileLabelRef.current.textContent = file.name
      const image = e.target.files[0]
      setMeetingData({ ...meetingData, image: { file: image, name: file.name } })
    }
  }

  const onCalendarChangeHandler = (e: Value) => {
    const formatDate = dayjs(String(e)).format("YYYY-MM-DD")
    setMeetingData({ ...meetingData, date: formatDate, time: "" })
  }

  const isValidated = !Array.from(Object.keys(meetingData)).some((key) => {
    switch (key) {
      case "location":
        return meetingData.location === ""
      case "type":
        return meetingData.type === ""
      case "name":
        return meetingData.name === ""
      case "date":
        return meetingData.date === ""
      case "time":
        return meetingData.time === ""
      case "capacity":
        return meetingData.capacity < 5
      case "image":
        return !meetingData.image.file
      default:
        return false
    }
  })

  const onSubmitHandler = async () => {
    const params = new FormData()
    params.append("location", meetingData.location)
    params.append("type", meetingData.type)
    params.append("name", meetingData.name)
    params.append(
      "dateTime",
      dayjs(meetingData.date + meetingData.time).format("YYYY-MM-DDTHH:mm:ss"),
    )
    params.append("capacity", String(meetingData.capacity))
    if (meetingData.image.file)
      params.append("image", meetingData.image.file, meetingData.image.name)
    params.append(
      "registrationEnd",
      dayjs(meetingData.date + meetingData.time)
        .subtract(1, "second")
        .format("YYYY-MM-DDTHH:mm:ss"),
    )

    await generateMeetUp(params)
    changeState()
  }

  useEffect(() => {
    const prevScrollY = preventScroll()
    modalSelectRef.current?.focus()

    return () => {
      allowScroll(prevScrollY)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black bg-opacity-55">
      <div
        id="contentWrapper"
        className="flex max-h-screen w-modal-lg flex-col overflow-y-scroll rounded-xl bg-white p-6 shadow-md max-sm:w-full"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">모임만들기</h3>

          <button
            type="button"
            onClick={changeState}
            onKeyDown={closeBtnKeyboardHandler}
            className="block"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <Label label="모임명" htmlFor="name">
          <input
            id="name"
            type="text"
            onChange={onChangeData}
            placeholder="모임명을 입력해주세요."
            className="box-border rounded-xl bg-gray-50 px-[16px] py-[10px]"
          />
        </Label>

        <Label label="장소" htmlFor="location">
          <div className="relative box-border rounded-xl bg-gray-50 px-[16px] py-[10px] focus-within:border-[2px] focus-within:border-blue-700">
            <select
              className="focus: h-full w-full appearance-none bg-gray-50 focus:outline-none"
              name="select location"
              id="location"
              aria-label="장소를 선택해주세요."
              ref={modalSelectRef}
              value={meetingData.location}
              onChange={onChangeData}
            >
              <option value="" disabled hidden>
                장소를 선택해주세요
              </option>
              {location.map((loc) => {
                return (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                )
              })}
            </select>
            <Arrow state="defaultDown" className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </Label>

        <Label label="이미지" htmlFor="selectImage">
          <div className="flex items-center gap-3" id="selectImage">
            <div
              tabIndex={-1}
              ref={fileLabelRef}
              className="relative grow rounded-xl bg-gray-50 px-[16px] py-[10px]"
            >
              이미지를 첨부해 주세요
            </div>
            <button
              tabIndex={-1}
              type="button"
              className="rounded-xl border-[1px] border-orange-600 focus-within:border-[2px] focus-within:border-blue-700"
            >
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <label
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                htmlFor="thumbnail"
                className="block px-[20px] py-[10px] font-semibold text-orange-600 outline-none"
                onKeyDown={openFileHandler}
              >
                파일 찾기
              </label>
              <input
                type="file"
                accept="image/*"
                name="upload image"
                id="thumbnail"
                className="hidden"
                onChange={onChangeImage}
              />
            </button>
          </div>
        </Label>

        <Label label="선택 서비스" htmlFor="service">
          <SelectServiceRadioGroup meetingData={meetingData} setMeetingData={setMeetingData} />
        </Label>

        <Label label="날짜" htmlFor="dateTime">
          <Calendars
            className="mx-auto"
            value={meetingData.date}
            onChange={onCalendarChangeHandler}
          />
        </Label>

        <Label label="오전" htmlFor="time">
          <SelectTimeButton
            timeList={["09:00", "10:00", "11:00"]}
            meetingData={meetingData}
            setMeetingData={setMeetingData}
          />
        </Label>

        <Label label="오후" htmlFor="time">
          <SelectTimeButton
            timeList={["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]}
            meetingData={meetingData}
            setMeetingData={setMeetingData}
          />
        </Label>

        <Label label="모집정원" htmlFor="capacity">
          <input
            type="number"
            id="capacity"
            onChange={onChangeData}
            placeholder="최소 5인 이상 입력해주세요."
            className="box-border rounded-xl bg-gray-50 px-[16px] py-[10px]"
          />
        </Label>

        <div className="mt-10">
          <button
            className={`w-full rounded-xl bg-gray-400 py-2.5 text-white ${isValidated ? "cursor-pointer bg-orange-500" : "cursor-not-allowed bg-gray-400"}`}
            type="submit"
            onClick={onSubmitHandler}
            disabled={!isValidated}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateMeetingModal
