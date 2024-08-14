"use server"

import { cookies } from "next/headers"

import ROUTE from "@/constants/route"

const HOUR = 60 * 60

const setCookie = async (token: string) => {
  cookies().set("userToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: ROUTE.HOME,
    maxAge: HOUR,
  })
}

export default setCookie
