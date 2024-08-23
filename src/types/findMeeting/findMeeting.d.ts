import { Dispatch, KeyboardEvent, MouseEvent, ReactNode, SetStateAction } from "react"

import { InfiniteData } from "@tanstack/react-query"

export type TCustomFilterEvent =
  | MouseEvent<HTMLButtonElement>
  | KeyboardEvent<HTMLButtonElement>
  | string

export interface IFilterOption {
  type: string
  sortBy: string
  location?: string
  date?: string
  createdBy?: string
  sortOrder?: string
  limit?: number
  offset?: number
}

export interface MyCardProps {
  teamId: string
  name: string
  dateTime: string
  location: string
  image: string
  id: number
  participantCount: number
  capacity: number
  children?: ReactNode
}

export interface IMeetingData
  extends Pick<
    MyCardProps,
    "teamId" | "name" | "dateTime" | "location" | "image" | "id" | "participantCount" | "capacity"
  > {
  type: string
  registrationEnd: string
  createdBy: number
}

type TCustomImage = {
  file: File | null
  name: string
}

export interface ICustomResponse {
  code: string
  message: string
  parameter?: string
}

export interface ILabelProps {
  label: string
  htmlFor: string
  children: React.ReactNode
}

export interface IMeetingDataState
  extends Pick<IMeetingData, "type" | "location" | "name" | "capacity" | "registrationEnd"> {
  date: string
  time: string
  image: TCustomImage
}

export interface IGatheringData
  extends Pick<IMeetingData, "type" | "location" | "name" | "capacity" | "registrationEnd"> {
  id?: string
  date: string
  time: string
  image: TCustomImage
}

type TCustomOnSelect = (
  event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
) => void

export interface IFilterTabProps {
  selVal: string
  onSelect: TCustomOnSelect
}

export interface IFilterProps extends Pick<IFilterTabProps, "onSelect"> {
  data: Array<string>
  placeholder: string
  selVal?: string
}

export interface IFilterCalendarProps extends Pick<IFilterProps, "placeholder" | "selVal"> {
  onChange: (e: string) => void
}

export interface IMeetingListProps {
  data: InfiniteData<IMeetingData[]> | null
  isLoading: boolean
}

export interface ICompleteSignUpModalProps {
  children: ReactNode
  isOneBtn: boolean
  onConfirmClick: () => void
}

export interface ISelectServiceRadioGroupProps {
  meetingData: IMeetingDataState
  setMeetingData: Dispatch<SetStateAction<IMeetingDataState>>
}

export interface IParams {
  params: { slug: string }
}

export interface ISelectTimeButton extends ISelectServiceRadioGroupProps {
  timeList: string[]
}

export interface ISelectServiceButton {
  category: string
  detail: string
  state: boolean
  type: string
  onClick: (type: string) => void
}

export interface IBannerProps {
  id: string
  isHost: boolean
  isJoined: boolean
  limit: number
  participant: number
  setHeight: Dispatch<SetStateAction<number>>
}
