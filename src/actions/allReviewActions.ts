"use server"

import LIMIT from "@/constants/limit"
import { IGathering } from "@/types/review/filter"
import { convertParamsToQueryString } from "@/util/fetchParameterParser"

export interface IAllReview {
  teamId: string
  id: number
  score: number
  comment: string
  createdAt: string
  Gathering: IGathering
  User: IUser
  image: string
}

export interface IUser {
  teamId: string
  id: number
  email: string
  name: string
  image: string
}

const getAllReview = async (params: any, pageParam: number = 0): Promise<IAllReview[]> => {
  const query = convertParamsToQueryString(params)
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews?${query}&limit=${LIMIT}&offset=${pageParam * LIMIT}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    const json = await response.json()
    return json
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export default getAllReview
