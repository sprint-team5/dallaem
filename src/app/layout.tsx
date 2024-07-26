import type { Metadata } from "next"
import localFont from "next/font/local"

import Providers from "@/components/app/provider"
import LootLayout from "@/components/pages/layout/LootLayout"

import "./globals.css"

const pretendard = localFont({
  src: [
    {
      path: "./font/Pretendard-Thin.subset.woff2",
      weight: "100",
      style: "thin",
    },
    {
      path: "./font/Pretendard-Light.subset.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "./font/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "./font/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./font/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "semiBold",
    },
    {
      path: "./font/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "bold",
    },
  ],
})

export const metadata: Metadata = {
  title: "같이 달램",
  description:
    "유저가 바쁜 일상 속 휴식을 위한 다양한 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 생성할 수 있는 서비스입니다.",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <Providers>
          <LootLayout>{children}</LootLayout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
