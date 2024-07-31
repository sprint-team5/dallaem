"use server"

interface SignupData {
  name: string
  email: string
  companyName: string
  password: string
}

// 사용자 회원가입
const PostSignupFn = async (signupData: SignupData) => {
  const response = await fetch(`${process.env.BASE_URL}/auths/signup`, {
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

interface SigninData {
  email: string
  password: string
}

// 사용자 로그인
const PostSigninFn = async (signinData: SigninData) => {
  const response = await fetch(`${process.env.BASE_URL}/auths/signin`, {
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

// 회원 정보 확인
const GetUserDataFn = async (userToken?: string) => {
  const response = await fetch(`${process.env.BASE_URL}/auths/user`, {
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

// 사용자 로그아웃
const PostLogoutFn = async () => {
  const response = await fetch(`${process.env.BASE_URL}/auths/user`)

  const data = await response.json()

  return {
    ...data,
    ok: response.ok,
    status: response.status,
  }
}

export { PostSignupFn, PostSigninFn, GetUserDataFn, PostLogoutFn }
