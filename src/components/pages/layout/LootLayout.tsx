"use client"

import { usePathname } from "next/navigation"

import GNB from "@/components/public/gnb/GNB"
import { ROUTE } from "@/constants/route"

interface ILootLayoutProps {
  children: React.ReactNode
}

const LootLayout = ({ children }: ILootLayoutProps) => {
  const pathname = usePathname()

  // 현재 경로가 showGNBPaths에 포함되어 있는지 확인
  function isValidRoute(path: string): path is keyof typeof ROUTE {
    return Object.values(ROUTE).includes(path as any)
  }

  const shouldShowGNB = isValidRoute(pathname)

  return (
    <div>
      {shouldShowGNB && <GNB />}
      <main className="min-h-[200vh] pt-[56px] md:pt-[60px]">{children}</main>
    </div>
  )
}

export default LootLayout
