"use server"

import { convertParamsToQueryString } from "@/util/fetchParameterParser"

interface IScoreReview {
  teamId: string
  gatheringId: number
  type: string
  oneStar: number
  twoStars: number
  threeStars: number
  fourStars: number
  fiveStars: number
}

const getScoreReview = async (params: any): Promise<IScoreReview[]> => {
  const query = convertParamsToQueryString(params)

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews/scores?${query}`,
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
    const data = await response.json()

    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export default getScoreReview
