"use server"

import { redirect } from "next/navigation"

interface ICustomResponse {
  code: string
  message: string
  parameter?: string
}

const generateMeetUp = async (formData: FormData) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/gatherings`, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })

    if (!response.ok) {
      const json: ICustomResponse = await response.json()
      throw new Error(json.message)
    }

    redirect("/")
  } catch (error) {
    throw new Error(error as string)
  }
}

export default generateMeetUp
