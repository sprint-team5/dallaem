"use server"

interface ISignupData {
  name: string
  email: string
  companyName: string
  password: string
}

const PostSignupFn = async (signupData: ISignupData) => {
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
  const data = await response.json()

  return {
    ...data,
    ok: response.ok,
    status: response.status,
  }
}

export default PostSignupFn
