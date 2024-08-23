import { ReactNode } from "react"

import { IGathering } from "@/types/review/filter"

type TSize = "smallDefault" | "largeDefault" | "largeEdit"
type TSort = "dateTime" | "registrationEnd" | "joinedAt"
type TSortOrder = "asc" | "desc"

export interface IMyPageLayoutProps {
  children: ReactNode
  edit: ReactNode
  addReview: ReactNode
}

export interface IReviewStateButtonProp {
  onClick: (value: boolean) => void
  hasReview?: boolean
}

export interface IAddReviewPageProp {
  searchParams: {
    [key: string]: string
  }
}

export interface IReviewModalProp {
  gatheringId: string
}

export interface IUserData extends IReviewModalProp {
  score: number
  comment: string
}

export interface ICustomError {
  [key: string]: string
}

export interface IProfileEditModalProps {
  companyName: string
  image?: string
}

export interface IFile extends IProfileEditModalProps {
  image: null | File
}

export interface IUserInfo extends IProfileEditModalProps {
  email: string
  name: string
  id: string
}

interface IHandlerArg {
  type: string
}

export interface IAction extends IHandlerArg {
  isReviewed?: boolean
}

export interface IInitialState {
  myMeeting: boolean
  myReview: boolean
  myOwnMeeting: boolean
  isReviewed?: boolean
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

export interface IDataSort {
  dataFetchingKey: string
  isReviewed?: boolean
}

export interface IMyPageInfoWrapperProps extends IDataSort {
  onClick: ({ type, isReviewed }: IAction) => void
}

export interface IGetMyMeetings {
  limit: number
  offset: number
  sortBy?: TSort
  sortOrder?: TSortOrder
}

export interface IFetchMyPageInfo extends IGetMyMeetings {
  fetchingKey?: string
  reviewMeeting?: boolean | null
  isReviewed?: boolean | null
}

export interface IGetMyPageRes {
  id: number
  participantCount: number
  createdBy: number
  capacity: number
  teamId: string
  type: string
  name: string
  dateTime: string
  registrationEnd: string
  location: string
  image: string
  canceledAt: string
  joinedAt: string
  isReviewed: boolean
  isCompleted: boolean
}

export interface IReview {
  id: number
  userId: number
  gatheringId: number
  score: number
  teamId: string
  comment: string
  createdAt: string
  Gathering: IGathering
}

export interface IAddReviews {
  gatheringId: string
  score: string
  comment: string
}

export interface IErrorResponse {
  code: string
  message: string
}
