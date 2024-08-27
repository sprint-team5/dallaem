"use server"

import { cookies } from "next/headers"

import { IErrorResponse, IUserData } from "@/types/mypage/mypage"

const addReview = async (data: IUserData) => {
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
  } catch (error) {
    const customError = error as IErrorResponse
    throw new Error(customError.message)
  }
}

export default addReview
