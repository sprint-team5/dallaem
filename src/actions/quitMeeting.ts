"use server"

import { getCookie } from "@/util/cookies"

const quitMeeting = async (id: string) => {
  const token = await getCookie("userToken")
  try {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings/${id}/leave`,
      data,
    )

    const json = await response.json()
    return json.message
  } catch (error) {
    throw new Error(error as string)
  }
}

export default quitMeeting
