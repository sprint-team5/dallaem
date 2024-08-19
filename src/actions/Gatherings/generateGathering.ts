"use server"

import { getCookie } from "@/util/cookies"

interface ICustomResponse {
  code: string
  message: string
  parameter?: string
}

interface IMeetingData {
  id: string
  location: string
  type: string
  name: string
  date: string
  time: string
  capacity: number
  image: {
    file: File | null
    name: string
  }
  registrationEnd: string
}

const generateGathering = async (formData: FormData): Promise<IMeetingData> => {
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

    const responseData: IMeetingData = await response.json()
    return responseData
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("An unknown error occurred")
  }
}

export default generateGathering
