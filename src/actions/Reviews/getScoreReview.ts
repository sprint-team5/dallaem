"use server"

import { ICustomError } from "@/types/mypage/mypage"
import { IScoreReview, TScoresType } from "@/types/review/review"
import { convertParamsToQueryString } from "@/util/fetchParameterParser"

const getScoreReview = async (params: TScoresType): Promise<IScoreReview[]> => {
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
  } catch (err) {
    const error = err as ICustomError
    throw new Error(error.message)
  }
}

export default getScoreReview
