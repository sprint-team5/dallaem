"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const logOut = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/auths/signout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
    if (!response.ok) throw new Error("문제가 발생했습니다.")
    cookies().delete("userToken")
  } catch (err) {
    redirect("/mypage")
  }
  redirect("/")
}

export default logOut
