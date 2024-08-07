"use client"

import Link from "next/link"

import { useInView } from "react-intersection-observer"

import Button from "@/components/public/button/Button"
import ROUTE from "@/constants/route"
import useGetUserData from "@/hooks/useGetUserData"
import { animated, useSpring } from "@react-spring/web"

// 테일윈스 스타일

const wrapperStyles = {
  default: "flex flex-col items-center justify-between pb-16 pt-[108px] text-center",
  mobile: "h-[503px] w-[344px] px-5",
  tablet: "md:h-[603px] md:w-[800px] md:px-0",
  desktop: "2xl:w-full",
}

const h1Styles = {
  default: "w-full font-extrabold text-orange-600",
  mobile: "text-4xl leading-snug ",
  tablet: "md:text-5xl md:leading-loose",
  desktop: "xl:text-6xl xl:leading-loose",
}

const h2Styles = {
  default: "w-full font-semibold text-gray-500",
  mobile: "text-xl",
  tablet: "md:text-2xl",
  desktop: "",
}

const mainPageStyles = {
  container: "flex flex-col items-center justify-center bg-white",
  wrapper: `${wrapperStyles.default} ${wrapperStyles.mobile} ${wrapperStyles.tablet} ${wrapperStyles.desktop}`,
}

const headTextStyles = {
  h1: `${h1Styles.default} ${h1Styles.mobile} ${h1Styles.tablet} ${h1Styles.desktop}`,
  h2: `${h2Styles.default} ${h2Styles.mobile} ${h2Styles.tablet} ${h2Styles.desktop}`,
}

const HeadContent = ({ userToken }: { userToken: string | undefined }) => {
  const { data } = useGetUserData(userToken)
  const isLoggedIn = Boolean(data?.name)

  // 스크롤 트리거
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // 글자에 적용되는 애니메이션
  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: { duration: 300 },
  })

  const fadeInDelayed = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: { duration: 300 },
    delay: 300,
  })

  const fadeInButtons = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: { duration: 300 },
    delay: 600,
  })

  return (
    <main className={mainPageStyles.container}>
      <div ref={ref} className={mainPageStyles.wrapper}>
        <animated.h1 style={fadeIn} className={headTextStyles.h1}>
          당신의 관심사,
          <br />
          5분 만에 모임으로 만들어보세요!
        </animated.h1>
        <animated.h2 style={fadeInDelayed} className={headTextStyles.h2}>
          취미부터 스터디까지, 원하는 모든 모임을 손쉽게 만들 수 있는 곳
        </animated.h2>
        <animated.div
          style={fadeInButtons}
          className="flex items-center justify-between gap-4 md:gap-16"
        >
          {isLoggedIn ? (
            <Link href={ROUTE.MY_PAGE}>
              <Button className="text-lg" borderStyle="solid">
                내 모임 보러가기
              </Button>
            </Link>
          ) : (
            <Link href={ROUTE.SIGNIN}>
              <Button className="text-lg" borderStyle="solid">
                로그인 하러가기
              </Button>
            </Link>
          )}
          <Link href={ROUTE.GATHERINGS}>
            <Button className="text-lg" borderStyle="outlined">
              모임 둘러보기
            </Button>
          </Link>
        </animated.div>
      </div>
    </main>
  )
}

export default HeadContent
