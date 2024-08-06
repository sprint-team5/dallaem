"use server"

import { getCookie } from "@/util/cookies"

interface ICustomResponse {
  code: string
  message: string
  parameter?: string
}

const generateMeetUp = async (formData: FormData) => {
  try {
    const token = await getCookie("userToken")
    const data: {
      method: string
      body: FormData
      headers: {
        Authorization?: string
      }
    } = {
      method: "POST",
      body: formData,
      headers: {
        // accept: "application/json",
        // "Content-Type": "multipart/form-data",
      },
    }
    if (token) data.headers.Authorization = `Bearer ${token}`

    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings`, data)

    if (!response.ok) {
      const json: ICustomResponse = await response.json()
      throw new Error(json.message)
    }
  } catch (error) {
    throw new Error(error as string)
  }
}

export default generateMeetUp
