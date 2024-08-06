import { cookies } from "next/headers"

import HeadContent from "@/components/pages/mainpage/HeadContent"
import ReviewPreview from "@/components/pages/mainpage/ReviewPreview"

const Home = () => {
  const cookieStore = cookies()
  const userToken = cookieStore.get("userToken")?.value
  return (
    <div className="flex flex-col gap-20 bg-white md:gap-80">
      <HeadContent userToken={userToken} />
      <ReviewPreview />
    </div>
  )
}

export default Home
