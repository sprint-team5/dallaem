"use client"

import { useEffect, useState } from "react"

import getScoreReview from "@/actions/Reviews/getScoreReview"
import RatingBar from "@/components/pages/allReview/Scores/Atoms/RatingBar"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import useScoreCalculation from "@/hooks/Review/useScoreCalculation"
import { useQuery } from "@tanstack/react-query"

const Scores = () => {
  const [filter, setFilter] = useState({
    type: "DALLAEMFIT",
  })

  const [clipPath, setClipPath] = useState(`inset(0 100% 0 0)`)

  const { data: scoreData } = useQuery({
    queryKey: ["scores", filter],
    queryFn: () => {
      return getScoreReview(filter)
    },
  })

  const { allScore, maxScore, ratings } = useScoreCalculation(scoreData)

  useEffect(() => {
    const timer = setTimeout(() => {
      setClipPath(`inset(0 ${100 - (allScore / 5) * 100}% 0 0)`)
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [allScore])

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
      <div className="mt-6 flex h-[180px] items-center justify-center gap-5 border-2 border-l-0 border-r-0 border-primary md:gap-[138px] lg:gap-[188px]">
        {allScore > 0 ? (
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
                  style={{ clipPath }}
                  className="absolute left-0 top-0 z-10 flex gap-[2px] transition-all delay-100 duration-500"
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    return <Heart key={index + 1} state="active" />
                  })}
                </div>
              </div>
            </div>
            <div>
              {ratings.map((rating) => {
                return (
                  <RatingBar
                    key={rating.rating}
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
