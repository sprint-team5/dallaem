"use server"

import { cookies } from "next/headers"

async function getUserTokenFromCookieFn() {
  const cookieStore = cookies()
  return cookieStore.get("userToken")?.value
}

export default getUserTokenFromCookieFn
