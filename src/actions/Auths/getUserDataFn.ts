"use server"

const GetUserDataFn = async (userToken?: string) => {
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
  const data = await response.json()

  return {
    ...data,
    ok: response.ok,
    status: response.status,
  }
}

export default GetUserDataFn
