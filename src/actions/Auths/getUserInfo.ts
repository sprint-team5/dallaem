"use server"

import { cookies } from "next/headers"

import { IUserInfo } from "@/types/mypage/mypage"

const getUserInfo = async (): Promise<IUserInfo> => {
  const userToken = cookies().get("userToken")?.value
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
  const userInfo = await response.json()

  return userInfo
}

export default getUserInfo
