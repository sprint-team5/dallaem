export interface IFilter {
  sortOrder: string
  location?: string
  date?: string
  createdBy?: string
}

export interface IGathering {
  teamId: string
  id: number
  name: string
  dateTime: string
  location: string
}
