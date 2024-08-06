"use server"

import { getCookie } from "@/util/cookies"

const checkLogin = async () => {
  const token = await getCookie("userToken")
  return token !== undefined
}
export default checkLogin
