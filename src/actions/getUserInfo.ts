"use server"

export interface IUserInfo {
  email: string
  name: string
  companyName: string
  image?: string
}

const getUserInfo = async () => {
  let userInfo: IUserInfo
  try {
    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // fixme: 회원가입 및 로그인 기능 생성 쿠키에서 추가
      },
    })
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    userInfo = await response.json()
  } catch (e) {
    userInfo = {
      companyName: "코드잇-test",
      email: "codeit@codeit.com-test",
      name: "럽윈즈올-test",
    }
  }
  return userInfo
}

export default getUserInfo
