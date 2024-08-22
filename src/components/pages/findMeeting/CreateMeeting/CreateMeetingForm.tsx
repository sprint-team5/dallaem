"use client"

import Image from "next/image"

import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Value } from "react-calendar/dist/cjs/shared/types"

import Calendars from "@/components/public/Calendars/Calendars"
import Button from "@/components/public/button/Button"
import Arrow from "@/components/public/icon/dynamicIcon/Arrow"
import CompleteSignUpModal from "@/components/public/modal/CompleteSignUpModal"
import { location } from "@/constants/meeting"
import useCreateGathering from "@/hooks/Gatherings/useCreateGathering"
import useJoinGathering from "@/hooks/Gatherings/useJoinGathering"
import { ILabelProps, IMeetingDataState } from "@/types/findMeeting/findMeeting"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

import SelectServiceRadioGroup from "./selectComponents/SelectServiceRadioGroup"
import SelectTimeButton from "./selectComponents/SelectTimeButton"

const Label = ({ label, htmlFor, children }: ILabelProps) => {
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
  const [imagePreview, setImagePreview] = useState("")

  const [meetingData, setMeetingData] = useState<IMeetingDataState>({
    location: "",
    type: "OFFICE_STRETCHING",
    name: "",
    date: "",
    time: "",
    capacity: 5,
    image: { file: null, name: "" },
    registrationEnd: "",
  })

  const queryClient = useQueryClient()
  const { mutate: createGathering } = useCreateGathering()
  const { mutate: joinGathering } = useJoinGathering()

  const [fileName, setFileName] = useState("")

  const onChangeData = (e: ChangeEvent) => {
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

  const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value === "") {
      return setMeetingData({ ...meetingData, capacity: 5 })
    }

    if (!/^\d+$/.test(value)) {
      return ""
    }

    const numValue = parseInt(value, 10)

    if (numValue >= 1) {
      return setMeetingData({ ...meetingData, capacity: numValue })
    }

    return ""
  }

  const onBlurNumber = () => {
    if (meetingData.capacity < 5) {
      // eslint-disable-next-line no-alert
      alert("5 미만의 숫자는 허용되지 않습니다.")
      setMeetingData({ ...meetingData, capacity: 5 })
    }
  }

  const openFileHandler = (e: KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "Space") document.getElementById("thumbnail")?.click()
  }

  /** 이미지 등록, 라벨 상태 변경 */
  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) {
      setFileName("")
    } else {
      setImagePreview(URL.createObjectURL(file))
      setFileName(file.name)
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
        await queryClient.invalidateQueries({ queryKey: ["meetingList"] })
        await queryClient.invalidateQueries({
          queryKey: ["mypage"],
        })

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
          className="box-border rounded-xl bg-gray-50 px-[16px] py-[10px] text-sm font-medium leading-5 outline-none placeholder:text-gray-400 sm:text-base sm:leading-6"
        />
      </Label>

      <Label label="장소" htmlFor="location">
        <div className="relative z-50 w-full">
          <Listbox
            value={meetingData.location}
            onChange={(e) => {
              setMeetingData({ ...meetingData, location: e })
            }}
          >
            <ListboxButton
              className={`relative box-border w-full rounded-xl bg-gray-50 px-[16px] py-[10px] text-left text-sm font-medium leading-5 sm:text-base sm:leading-6 ${meetingData.location ? "text-gray-900" : "text-gray-400"}`}
            >
              {meetingData.location ? meetingData.location : "장소를 선택해주세요"}
              <Arrow state="defaultDown" className="absolute right-4 top-1/2 -translate-y-1/2" />
            </ListboxButton>
            <ListboxOptions
              transition
              className="absolute top-full z-50 w-full rounded-xl border bg-white p-2 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            >
              {location.map((loc) => {
                return (
                  <ListboxOption
                    key={loc}
                    value={loc}
                    className="cursor-pointer rounded-full px-4 py-2 text-sm data-[focus]:bg-gray-200"
                  >
                    {loc}
                  </ListboxOption>
                )
              })}
            </ListboxOptions>
          </Listbox>
        </div>
      </Label>

      <Label label="이미지" htmlFor="selectImage">
        <div className="flex gap-3" id="selectImage">
          <div
            tabIndex={-1}
            className={`relative grow rounded-xl bg-gray-50 px-[16px] py-[10px] text-sm font-medium leading-5 sm:text-base sm:leading-6 ${fileName ? "text-black" : "text-gray-400"} `}
          >
            {!fileName ? "이미지를 첨부해주세요." : fileName}
          </div>
          <button tabIndex={-1} type="button" className="rounded-xl border-[1px] border-orange-600">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <label
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              htmlFor="thumbnail"
              className="block w-20 cursor-pointer text-sm font-semibold text-orange-600 outline-0 sm:w-[100px] sm:text-base"
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

      {imagePreview && (
        <div className="mt-5">
          <p className="mb-2 text-sm text-gray-500">미리보기</p>
          <div className="relative w-full">
            <Image
              src={imagePreview}
              alt="이미지 미리보기"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-auto border"
            />
          </div>
        </div>
      )}

      <Label label="선택 서비스" htmlFor="service">
        <SelectServiceRadioGroup meetingData={meetingData} setMeetingData={setMeetingData} />
      </Label>

      <Label label="날짜" htmlFor="dateTime">
        <div className="rounded-xl border border-gray-200 px-4 py-[10px]">
          <Calendars
            className="mx-auto w-full max-w-[250px] border-0 !p-0"
            value={meetingData.date}
            onChange={onCalendarChangeHandler}
          />
        </div>
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
          onChange={onChangeNumber}
          onBlur={onBlurNumber}
          placeholder="최소 5인 이상 입력해주세요."
          className="box-border rounded-xl bg-gray-50 px-[16px] py-[10px] outline-none"
          min={5}
          value={meetingData.capacity}
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
