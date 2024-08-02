"use server"

import { cookies } from "next/headers"

const setCookie = async (token: string) => {
  cookies().set("userToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // 만료 시간을 설정
    // maxAge: 60 * 60,
  })
}

export default setCookie
