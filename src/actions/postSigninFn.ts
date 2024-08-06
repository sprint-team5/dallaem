"use server"

interface ISigninData {
  email: string
  password: string
}

const PostSigninFn = async (signinData: ISigninData) => {
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signinData),
  })
  const data = await response.json()

  return {
    ...data,
    ok: response.ok,
    status: response.status,
  }
}

export default PostSigninFn
