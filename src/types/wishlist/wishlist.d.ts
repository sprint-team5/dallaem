import { IMeetingData } from "@/types/findMeeting/findMeeting"

export interface IByeBtnProps {
  list: IWishListData
  removeHandler: (id: number) => void
}

export interface IWishListData extends IMeetingData {
  wish?: boolean
}

export interface IResetFilterProps {
  onClick: () => void
  isVisible: boolean
}
