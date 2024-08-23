"use server"

import { IAllReview } from "@/types/review/review"
import { convertParamsToQueryString } from "@/util/fetchParameterParser"

const getAllReviews = async (params: any): Promise<IAllReview[]> => {
  const query = convertParamsToQueryString(params)
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews?${query}`,
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

export default getAllReviews
