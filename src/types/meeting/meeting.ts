export interface IFilterOption {
  type: string
  sortBy: string
  location?: string
  date?: string
  createdBy?: string
  sortOrder?: string
}

export interface IMeetingData {
  teamId: string
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
}
