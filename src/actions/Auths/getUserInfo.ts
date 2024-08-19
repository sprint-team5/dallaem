"use server"

import { cookies } from "next/headers"

export interface IUserInfo {
  email: string
  name: string
  companyName: string
  id: string
  image?: string
}

const getUserInfo = async () => {
  const userToken = cookies().get("userToken")?.value
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
  const userInfo: IUserInfo = await response.json()

  return userInfo
}

export default getUserInfo
