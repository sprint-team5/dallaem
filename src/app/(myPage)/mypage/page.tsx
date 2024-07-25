import ProfileBox from "@/components/public/ProfileBox"

interface IUserInfo {
  email: string
  name: string
  companyName: string
}

const MyPage = async () => {
  let userInfo: IUserInfo
  try {
    const response = await fetch(`${process.env.BASE_URL}/auths/user`)
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    userInfo = await response.json()
  } catch (e) {
    userInfo = {
      companyName: "코드잇",
      email: "codeit@codeit.com",
      name: "럽윈즈올",
    }
  }
  return (
    <main>
      <ProfileBox name={userInfo.name} companyName={userInfo.companyName} email={userInfo.email} />
    </main>
  )
}

export default MyPage
