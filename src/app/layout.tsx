import type { Metadata } from "next"
import localFont from "next/font/local"
import { cookies } from "next/headers"

import QueryProviders from "@/components/app/provider"
import GNB from "@/components/public/gnb/GNB"
import { CountProvider } from "@/provider/CountProvider"
import ToastProvider from "@/provider/ToastProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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

const tmoneyRoundWind = localFont({
  src: [
    {
      path: "./font/TmoneyRoundWind/TmoneyRoundWind-ExtraBold.woff2",
      weight: "900",
    },
  ],
  variable: "--font-tmoneyRoundWind",
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
  const cookieStore = cookies()
  const userToken = cookieStore.get("userToken")?.value
  return (
    <html lang="ko" className={`${pretendard.className} ${tmoneyRoundWind.variable}`}>
      <body className="bg-gray-100 pt-[56px] md:pt-[60px]">
        <CountProvider>
          <ToastProvider>
            <QueryProviders>
              <GNB userToken={userToken}>{children}</GNB>
              {process.env.NODE_ENV !== "production" && <ReactQueryDevtools position="bottom" />}
            </QueryProviders>
          </ToastProvider>
        </CountProvider>
      </body>
    </html>
  )
}

export default RootLayout
