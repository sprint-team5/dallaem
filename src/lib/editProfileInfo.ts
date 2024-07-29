"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const editProfileInfo = async (formData: FormData) => {
  await fetch(`${process.env.BASE_URL}/auths/user`, {
    method: "PUT",
    body: formData,
  })
  revalidatePath("/mypage")
  redirect("/mypage")
}

export default editProfileInfo
