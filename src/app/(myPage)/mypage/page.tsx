// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import MyPageInfoTap from "@/components/pages/mypage/MyPageInfoTap"
import ProfileBox from "@/components/public/ProfileBox"

const MyPage = async () => {
  // fixme: userToken 생성 후 middleware로 이동 예정
  // if (!cookies().get("userToken")) {
  //   redirect("/")
  // }

  return (
    <main>
      <ProfileBox />
      <MyPageInfoTap />
    </main>
  )
}

export default MyPage
