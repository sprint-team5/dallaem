"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import ROUTE from "@/constants/route"

const onLogout = async () => {
  await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
  const cookieStore = cookies()
  cookieStore.delete("userToken")

  redirect(ROUTE.HOME)
}

export default onLogout
