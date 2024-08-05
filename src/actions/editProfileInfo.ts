"use server"

import { revalidatePath } from "next/cache"

const editProfileInfo = async (formData: FormData) => {
  const img = formData.get("image")

  if (img instanceof File && img.size === 0) {
    formData.set("image", "")
  }

  await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    method: "PUT",
    body: formData,
    headers: {
      "content-header": "multipart/form-data",
    },
  })

  revalidatePath("/mypage")
}

export default editProfileInfo
