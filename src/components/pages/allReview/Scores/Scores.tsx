"use client"

import { useEffect, useState } from "react"

import getScoreReview from "@/actions/Reviews/getScoreReview"
import RatingBar from "@/components/pages/allReview/Scores/Atoms/RatingBar"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import Heart from "@/components/public/icon/dynamicIcon/Heart"
import useScoreCalculation from "@/hooks/Review/useScoreCalculation"
import { TCustomFilterEvent } from "@/types/findMeeting/findMeeting"
import { TScoresType } from "@/types/review/review"
import { useQuery } from "@tanstack/react-query"

const Scores = () => {
  const [filter, setFilter] = useState<TScoresType>({
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
      setClipPath(`inset(0 ${100 - (Number(allScore) / 5) * 100}% 0 0)`)
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [allScore])

  const onFilterChanged = (e: TCustomFilterEvent, key: string) => {
    if (key) {
      if (typeof e === "string") {
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
      } else {
        const target = e.target as HTMLButtonElement
        if (target.value) setFilter({ ...filter, [key]: target.value })
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
      <div className="mt-6 flex h-[180px] items-center justify-center gap-5 border-2 border-l-0 border-r-0 border-primary md:gap-[138px] xl:gap-[188px]">
        {Number(allScore) > 0 ? (
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
          <p className="text-sm text-gray-500">아직 리뷰가 없어요</p>
        )}
      </div>
    </div>
  )
}

export default Scores
