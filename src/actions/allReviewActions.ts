"use server"

export interface Root2 {
  teamId: number
  id: number
  score: number
  comment: string
  createdAt: string
  Gathering: Gathering
  User: User
}

export interface Gathering {
  teamId: number
  id: number
  name: string
  dateTime: string
  location: string
}

export interface User {
  teamId: number
  id: number
  email: string
  name: string
}

const getAllReview = async (): Promise<Root2[]> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/reviews`)
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    const data = await response.json()
    return data
  } catch (err) {
    return []
  }
}

export default getAllReview
