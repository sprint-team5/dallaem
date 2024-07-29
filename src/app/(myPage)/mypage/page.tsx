// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import ProfileBox from "@/components/public/ProfileBox"

const MyPage = async () => {
  // fixme: userToken 생성 후 활성화
  // if (!cookies().get("userToken")) {
  //   redirect("/")
  // }

  return (
    <main>
      <ProfileBox />
    </main>
  )
}

export default MyPage
