"use server"

import { IEmailExists, IMessage, ISignupData, TSignupResponse } from "@/types/auth/auth"

const PostSignupFn = async (signupData: ISignupData): Promise<IMessage> => {
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
  const data = await response.json()

  const result = {
    ...data,
    ok: response.ok,
    status: response.status,
  }

  if (result.status === 201 && result.ok) {
    return result as IMessage
  }

  if (result.status !== 201 && result.code === "EMAIL_EXISTS") {
    return result as IEmailExists
  }

  if (result.status !== 201 && result.code === "VALIDATION_ERROR") {
    return result as TSignupResponse
  }

  throw new Error(result.message)
}

export default PostSignupFn
