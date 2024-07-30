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
    const response = await fetch(`${process.env.BASE_URL}/auths/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // fixme: 회원가입 및 로그인 기능 생성후 삭제할 것.
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJ0ZWFtNTU1IiwidXNlcklkIjo0ODUsImlhdCI6MTcyMjMyMDQyNywiZXhwIjoxNzIyMzI0MDI3fQ.8rk4CdIs7jCUxmNq69bcIPJiaeUxQmKlP0l9ZxMrsNc",
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
