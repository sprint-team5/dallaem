"use server"

import { ICustomResponse, IMeetingDataState } from "@/types/findMeeting/findMeeting"
import { getCookie } from "@/util/cookies"

const generateGathering = async (formData: FormData): Promise<IMeetingDataState> => {
  try {
    const token = await getCookie("userToken")
    const data: RequestInit = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }

    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings`, data)

    if (!response.ok) {
      const json: ICustomResponse = await response.json()
      throw new Error(json.message)
    }

    const responseData: IMeetingDataState = await response.json()
    return responseData
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("An unknown error occurred")
  }
}

export default generateGathering
