import { ReactNode } from "react"

interface IHandler {
  teamId: string
  id: number
}

interface MyCardProps extends IHandler {
  name: string
  dateTime: string
  location: string
  participantCount: number
  capacity: number
  image: string
  children?: ReactNode
}

export default MyCardProps
