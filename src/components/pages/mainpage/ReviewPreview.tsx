"use client"

import { useInView } from "react-intersection-observer"

import getAllReviews from "@/actions/Reviews/getAllReviews"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import Profile from "@/components/public/img/Profile"
import { animated, useSpring } from "@react-spring/web"
import { useQuery } from "@tanstack/react-query"

// 테일윈드 스타일
const h3Styles = {
  default: "font-extrabold text-orange-800",
  mobile: "text-2xl",
  tablet: "md:text-4xl",
  desktop: "",
}

const cardStyles = {
  default: "flex flex-col gap-6 whitespace-nowrap rounded-3xl border-2 border-gray-200 p-6 pb-6",
  mobile: "w-full",
  tablet: "md:w-[calc(50%-12px)]",
  desktop: "",
}

const reviewStyles = {
  container:
    "relative flex h-[900px] w-full flex-col items-center justify-center gap-24 bg-white p-6",
  h3: `${h3Styles.default} ${h3Styles.mobile} ${h3Styles.tablet} ${h3Styles.desktop}`,
  blur: "absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-white to-transparent md:h-[350px]",
}

const reviewCardStyles = {
  wrapper:
    "flex h-full w-full flex-col items-center justify-start gap-6 overflow-hidden md:flex-wrap",
  card: `${cardStyles.default} ${cardStyles.mobile} ${cardStyles.tablet} ${cardStyles.desktop}`,
}

const ReviewPreview = () => {
  const filter = {
    sortOrder: "asc",
  }
  const { data: reviewData } = useQuery({
    queryKey: ["allReviews", filter],
    queryFn: () => {
      return getAllReviews(filter)
    },
  })

  // 스크롤 트리거
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // 애니메이션
  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
    config: { mass: 1, tension: 60, friction: 26, duration: 500 },
    delay: 200,
  })

  return (
    <animated.div ref={ref} style={animationProps} className={reviewStyles.container}>
      <h3 className={reviewStyles.h3}>다음은 모임 이용자들의 실제 후기입니다.</h3>
      <div className={reviewStyles.blur} />
      <div className={reviewCardStyles.wrapper}>
        {reviewData?.map((review) => {
          return (
            <div key={review.User.name} className={reviewCardStyles.card}>
              <div className="flex items-center gap-2">
                <Profile state="largeDefault" profileImg={review.User?.image} />
                <div className="flex flex-col">
                  <p className="font-bold text-black">{review.User.name}</p>
                  <p className="font-semibold text-gray-600">{review.Gathering.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <div data-testid="scoreHeart" key={`score-${index + 1}`}>
                        <Heart state={index < review.score ? "active" : "default"} />
                      </div>
                    )
                  })}
              </div>
              <p className="text-wrap">{review.comment}</p>
            </div>
          )
        })}
      </div>
    </animated.div>
  )
}

export default ReviewPreview
