import { ReactNode } from "react"

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

export interface IMeetingData extends Omit<MyCardProps, "children"> {
  type: string
  registrationEnd: string
  createdBy: number
}
