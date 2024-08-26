import { ReactNode } from "react"

import { IGathering } from "@/types/review/filter"

type TSize = "smallDefault" | "largeDefault" | "largeEdit"
type TSort = "dateTime" | "registrationEnd" | "joinedAt"
type TSortOrder = "asc" | "desc"
type TBoolAndNull = boolean | null
type TDispatch = ({ type, isReviewed }: IAction) => void

interface IHandlerArg {
  type: string
}

export interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
  addReview: ReactNode
}

export interface IReviewStateButtonProp {
  hasReview?: boolean
  onClick: (value: boolean) => void
}

export interface IObjectType {
  [key: string]: string
}

export interface ICustomError extends IObjectType {}

export interface IAddReviewPageProp {
  searchParams: IObjectType
}

export interface IReviewModalProp {
  gatheringId: string
}

export interface IUserData extends IReviewModalProp {
  score: number
  comment: string
}

export interface IProfileEditModalProps {
  companyName: string
  image?: string
}

export interface IFile extends IProfileEditModalProps {
  image: null | File
}

export interface IUserInfo extends IProfileEditModalProps {
  id: string
  name: string
  email: string
}

export interface IAction extends IHandlerArg {
  isReviewed?: boolean
}

export interface IInitialState extends Pick<IAction, "isReviewed"> {
  myMeeting: boolean
  myReview: boolean
  myOwnMeeting: boolean
}

export interface IProfileProps {
  className?: string
  state: TSize
  profileImg?: string | null
}

export interface IMyPageInfoTapButton {
  isActive: boolean
  state: keyof Omit<IInitialState, "isReviewed">
  onClick: ({ type }: IHandlerArg) => void
}

export interface IDataSort extends Pick<IAction, "isReviewed"> {
  dataFetchingKey: string
}

export interface IMyPageInfoWrapperProps extends IDataSort {
  onClick: TDispatch
}

export interface IGetMyMeetings {
  limit: number
  offset: number
  sortBy?: TSort
  sortOrder?: TSortOrder
}

export interface IFetchMyPageInfo extends IGetMyMeetings {
  fetchingKey?: string
  reviewMeeting?: TBoolAndNull
  isReviewed?: TBoolAndNull
}

interface IIds {
  id: number
  teamId: string
}

export interface IGetMyPageRes extends IIds, IHandlerArg {
  capacity: number
  createdBy: number
  participantCount: number
  name: string
  image: string
  dateTime: string
  location: string
  joinedAt: string
  canceledAt: string
  registrationEnd: string
  isReviewed: boolean
  isCompleted: boolean
}

export interface IReview extends IIds, IUserData {
  userId: number
  createdAt: string
  Gathering: IGathering
}

export interface IErrorResponse {
  code: string
  message: string
}
