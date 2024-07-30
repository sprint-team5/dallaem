"use server"

import { convertParamsToQueryString } from "@/utill/fetchParameterParser"

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
    )
    if (!response.ok) {
      throw new Error("서버 에러가 발생했습니다.")
    }
    const data = await response.json()

    return data
  } catch (err) {
    throw new Error(err as string)
  }
}

export default getScoreReview
