export interface IFilter {
  sortOrder: string
  location?: string
  date?: string
  createdBy?: string
}

export interface IGathering {
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
  canceledAt: any
}
