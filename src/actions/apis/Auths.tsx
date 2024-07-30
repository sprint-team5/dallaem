"use server"

const GetUserDataFn = async (userToken: string | undefined) => {
  const response = await fetch(`${process.env.BASE_URL}/auths/user`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
  return response.json()
}

const PostLogoutFn = async () => {
  const response = await fetch(`${process.env.BASE_URL}/auths/user`)

  return response.json()
}

export { GetUserDataFn, PostLogoutFn }
