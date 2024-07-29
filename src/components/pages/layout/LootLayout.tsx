import { cookies } from "next/headers"

import BottomFloatingBar from "@/components/public/bottomFloatingBar/BottomFloatingBar"
import GNB from "@/components/public/gnb/GNB"

interface ILootLayoutProps {
  children: React.ReactNode
}

const LootLayout = ({ children }: ILootLayoutProps) => {
  const cookieStore = cookies()
  const userToken = cookieStore.get("userToken")?.value

  return (
    <div>
      <GNB userToken={userToken} />
      <main className="min-h-[200vh] pt-[56px] md:pt-[60px]">{children}</main>
      <BottomFloatingBar isHost />
    </div>
  )
}

export default LootLayout
