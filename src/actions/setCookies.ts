"use server"

import { cookies } from "next/headers"

const HOUR = 60 * 60

const setCookie = async (token: string) => {
  cookies().set("userToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: HOUR,
  })
}

export default setCookie
