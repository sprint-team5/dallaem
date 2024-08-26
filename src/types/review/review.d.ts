import { IFilterOption, TCustomOnSelect } from "@/types/findMeeting/findMeeting"

export type TScoresType = Pick<IFilterOption, "type">

export type TReviewFilterOptions = Pick<
  IFilterOption,
  "sortOrder" | "location" | "date" | "createdBy"
>

type TteamID = {
  teamId: string
}

export interface IGathering extends TteamID {
  id: number
  type: string
  name: string
  dateTime: string
  registrationEnd: string
  location: string
  participantCount: number
  capacity: number
  image: string
  createdBy: number
  canceledAt: any
}

export interface IScoreReview extends TteamID {
  gatheringId: number
  type: string
  oneStar: number
  twoStars: number
  threeStars: number
  fourStars: number
  fiveStars: number
}

export type TuseScoreCalculation = IScoreReview[] | undefined

export interface IRatingBar {
  rating: number
  count: number
  maxScore: number
}

interface IUser extends TteamID {
  id: number
  email: string
  name: string
  image?: string
}

export interface IReviewProps {
  score: number
  comment: string
  createdAt: string
  gathering: IGathering
  user?: IUser
  isImage?: boolean
}

interface IFilterSortProps {
  selVal?: string
  onSelect: TCustomOnSelect
}

export interface IAllReview extends TteamID {
  id: number
  score: number
  comment: string
  createdAt: string
  Gathering: IGathering
  User: IUser
  image: string
}