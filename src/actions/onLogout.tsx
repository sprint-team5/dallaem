"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import ROUTE from "@/constants/route"

const onLogout = async () => {
  const cookieStore = cookies()
  cookieStore.delete("userToken")

  redirect(ROUTE.HOME)
}

export default onLogout
