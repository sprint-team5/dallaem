"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import ROUTE from "@/constants/route"

const editProfileInfo = async (formData: FormData) => {
  const userToken = cookies().get("userToken")?.value
  const img = formData.get("image")

  if (img instanceof File && img.size === 0) {
    formData.set("image", "")
  }

  await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    method: "PUT",
    body: formData,
    headers: {
      "content-header": "multipart/form-data",
      Authorization: `Bearer ${userToken}`,
    },
  })

  revalidatePath(ROUTE.MY_PAGE)
}

export default editProfileInfo
