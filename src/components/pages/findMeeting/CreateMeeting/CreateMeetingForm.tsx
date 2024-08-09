"use client"

import { KeyboardEvent, useRef, useState } from "react"
import { Value } from "react-calendar/dist/cjs/shared/types"

import Calendars from "@/components/public/Calendars/Calendars"
import Button from "@/components/public/button/Button"
import Arrow from "@/components/public/icon/dynamicIcon/Arrow"
import CompleteSignUpModal from "@/components/public/modal/CompleteSignUpModal"
import { location } from "@/constants/meeting"
import useCreateGathering from "@/hooks/Gatherings/useCreateGathering"
import useJoinGathering from "@/hooks/Gatherings/useJoinGathering"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

import SelectServiceRadioGroup from "./selectComponents/SelectServiceRadioGroup"
import SelectTimeButton from "./selectComponents/SelectTimeButton"

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

const CreateMeetingForm = ({ changeState }: { changeState: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const queryClient = useQueryClient()
  const { mutate: createGathering } = useCreateGathering()
  const { mutate: joinGathering } = useJoinGathering()

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

    createGathering(params, {
      onSuccess: async (gatheringData) => {
        queryClient.invalidateQueries({ queryKey: ["meetingList"] })

        if (gatheringData && gatheringData?.id) {
          await joinGathering(gatheringData.id)
        }
        setIsModalOpen(true)
      },
    })
    setIsModalOpen(true)
  }

  const onConfirmClick = () => {
    changeState()
  }

  return (
    <>
      {isModalOpen && (
        <CompleteSignUpModal isOneBtn onConfirmClick={onConfirmClick}>
          모임이 생성되었습니다.
        </CompleteSignUpModal>
      )}
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
        <Button borderStyle="solid" type="submit" onClick={onSubmitHandler} disabled={!isValidated}>
          확인
        </Button>
      </div>
    </>
  )
}

export default CreateMeetingForm
