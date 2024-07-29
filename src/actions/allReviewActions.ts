"use server"

import { convertParamsToQueryString } from "@/utill/fetchParameterParser"

export interface Root2 {
  teamId: string
  id: number
  score: number
  comment: string
  createdAt: string
  Gathering: Gathering
  User: User
}

export interface Gathering {
  teamId: string
  id: number
  name: string
  dateTime: string
  location: string
}

export interface User {
  teamId: string
  id: number
  email: string
  name: string
}

const getAllReview = async (params: any): Promise<Root2[]> => {
  const query = convertParamsToQueryString(params)
  try {
    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews?${query}`)
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    // const data = await response.json()
    return [
      {
        teamId: "team555",
        id: 0,
        score: 3,
        comment: "string",
        createdAt: "2024-07-29T00:40:01.313Z",
        Gathering: {
          teamId: "team555",
          id: 812,
          name: "string",
          dateTime: "2024-07-29T00:40:01.313Z",
          location: "string",
        },
        User: {
          teamId: "1",
          id: 482,
          email: "string",
          name: "string",
        },
      },
      {
        teamId: "team555",
        id: 1,
        score: 5,
        comment: "string",
        createdAt: "2024-07-29T00:40:01.313Z",
        Gathering: {
          teamId: "team555",
          id: 810,
          name: "string",
          dateTime: "2024-07-29T00:40:01.313Z",
          location: "string",
        },
        User: {
          teamId: "1",
          id: 482,
          email: "string",
          name: "string",
        },
      },
    ]
  } catch (err) {
    console.log(err)
    return []
  }
}

export default getAllReview
