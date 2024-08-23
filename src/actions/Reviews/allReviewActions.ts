"use server"

import LIMIT from "@/constants/limit"
import { ICustomError } from "@/types/mypage/mypage"
import { IAllReview, TReviewFilterOptions } from "@/types/review/review"
import { convertParamsToQueryString } from "@/util/fetchParameterParser"

const getAllReview = async (
  params: TReviewFilterOptions | {},
  pageParam: number = 0,
): Promise<IAllReview[]> => {
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
  } catch (err) {
    const error = err as ICustomError
    throw new Error(error.message)
  }
}

export default getAllReview
