"use server"

import { cookies } from "next/headers"

interface IAddReviews {
  gatheringId: string
  score: string
  comment: string
}

interface IErrorResponse {
  code: string
  message: string
}

const addReview = async (data: IAddReviews) => {
  const userToken = cookies().get("userToken")?.value
  try {
    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })

    if (!response.ok) {
      const errorResponse: IErrorResponse = await response.json()
      throw new Error(errorResponse.message)
    }

    return response.status
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default addReview
