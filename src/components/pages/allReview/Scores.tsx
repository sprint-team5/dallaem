"use client"

import { useEffect, useState } from "react"

import getScoreReview from "@/actions/getScoreReview"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import { useQuery } from "@tanstack/react-query"

const RatingBar = ({
  rating,
  count,
  maxScore,
}: {
  rating: number
  count: number
  maxScore: number
}) => {
  return (
    <div className="mt-1 flex items-center gap-3 text-sm font-medium leading-5 first:mt-0">
      <p className="w-[21px] flex-none">{rating}점</p>
      <div className="relative h-1 w-[84px] overflow-hidden rounded-full bg-gray-200 sm:w-[240px]">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#111827] transition-all delay-100"
          style={{ width: `${(count / maxScore) * 100}%` }}
        />
      </div>
      <p className="flex-none text-gray-400">{count}</p>
    </div>
  )
}

const Scores = () => {
  const [allScore, setAllScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const [filter, setFilter] = useState({
    type: "DALLAEMFIT",
  })

  const { data: score } = useQuery({
    queryKey: ["scores", filter],
    queryFn: () => {
      return getScoreReview(filter)
    },
  })

  useEffect(() => {
    if (!score || score.length < 1) return
    const { oneStar, twoStars, threeStars, fourStars, fiveStars } = score[0]
    const allReviewLength = oneStar + twoStars + threeStars + fourStars + fiveStars
    const totalScore = 5 * fiveStars + 4 * fourStars + 3 * threeStars + 2 * twoStars + 1 * oneStar
    setAllScore(totalScore / allReviewLength)
    setMaxScore(Math.max(oneStar, twoStars, threeStars, fourStars, fiveStars) + 5)
  }, [score])

  // TODO: 이벤트를 넘기지 않고 수정할 값만 파싱해서 넘기도록 수정 필요(역할, 책임 등의 문제)
  const onFilterChanged = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | string,
    key: string,
  ) => {
    if (key) {
      // 1. date 등 문자열 값을 넘기는 경우
      if (typeof e === "string") {
        // 1-1. 빈 문자열을 받는 경우 초기화
        if (e === "") {
          if (key in filter) {
            const newFilterOption = { ...filter }
            // @ts-ignore
            delete newFilterOption[key]
            setFilter(newFilterOption)
          }
        } else {
          setFilter({ ...filter, [key]: e })
        }
      }
      // 2. 이벤트 객체를 넘기는 경우
      else {
        const target = e.target as HTMLButtonElement
        if (target.value) setFilter({ ...filter, [key]: target.value })
        // 3. 버튼 내의 svg 클릭 하는 경우 (value가 존재하지 않는 문제 때문에 추가, 부모요소의 value를 가져오도록)
        else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
          const targetParent = target.parentElement as HTMLButtonElement
          if (targetParent.value) setFilter({ ...filter, [key]: targetParent.value })
        }
      }
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <FilterTab
          selVal={filter.type}
          onSelect={(e) => {
            onFilterChanged(e, "type")
          }}
        />
      </div>
      <div className="mt-6 flex h-[180px] items-center justify-center gap-5 border-b border-t sm:gap-[120px] md:gap-[188px]">
        {score && score.length > 0 ? (
          <>
            <div>
              <p className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl">
                {allScore} <span className="text-gray-400">/5</span>
              </p>
              <div className="relative mt-2 flex gap-[2px]">
                {Array.from({ length: 5 }, (_, index) => {
                  return <Heart key={index + 1} state="default" />
                })}
                <div
                  style={{ clipPath: `inset(0 ${100 - (allScore / 5) * 100}% 0 0)` }}
                  className="absolute left-0 top-0 z-10 flex gap-[2px]"
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    return <Heart key={index + 1} state="active" />
                  })}
                </div>
              </div>
            </div>
            <div>
              {[
                { rating: 5, count: score[0].fiveStars },
                { rating: 4, count: score[0].fourStars },
                { rating: 3, count: score[0].threeStars },
                { rating: 2, count: score[0].twoStars },
                { rating: 1, count: score[0].oneStar },
              ].map((rating) => {
                return (
                  <RatingBar
                    key={rating.count}
                    rating={rating.rating}
                    count={rating.count}
                    maxScore={maxScore}
                  />
                )
              })}
            </div>
          </>
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default Scores
