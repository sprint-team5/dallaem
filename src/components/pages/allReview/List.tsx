"use client"

import Link from "next/link"

import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import FilterSort from "@/components/pages/allReview/FilterSort"
import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import Filter from "@/components/public/Filter/Filter"
import ResetFilter from "@/components/public/ResetFilter"
import Review from "@/components/public/Review/Review"
import ReviewSkeleton from "@/components/public/Skeleton/ReviewSkeleton"
import Spinner from "@/components/public/Spinner/Spinner"
import LIMIT from "@/constants/limit"
import { location } from "@/constants/meeting"
import ROUTE from "@/constants/route"
import { useAllReview } from "@/hooks/Review/useAllReview"
import { IFilter } from "@/types/review/filter"

const List = () => {
  const filterOptions = {
    sortOrder: "desc",
  }

  const [filter, setFilter] = useState<IFilter>(filterOptions)
  const { ref, inView } = useInView({ threshold: 1 })

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

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllReview(filter)

  const resetFilterHandler = () => {
    setFilter(filterOptions)
  }

  const render = () => {
    if (isLoading) {
      return new Array(LIMIT).fill(0).map((_, index) => {
        return <ReviewSkeleton key={`${index + 1}`} />
      })
    }

    if (!data || data[0].length === 0) {
      return <p className="flex w-full flex-1 items-center justify-center">아직 리뷰가 없어요</p>
    }

    return data.map((reviews) => {
      return reviews.map((review) => {
        return (
          <Link key={review.id} href={`${ROUTE.GATHERINGS}/${review.Gathering.id}`}>
            <Review
              score={review.score}
              comment={review.comment}
              gathering={review.Gathering}
              createdAt={review.createdAt}
              user={review.User}
              isImage
            />
          </Link>
        )
      })
    })
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Filter
            data={location}
            placeholder="지역 선택"
            onSelect={(e) => {
              onFilterChanged(e, "location")
            }}
            selVal={filter.location}
          />
          <FilterCalendar
            placeholder="날짜 선택"
            selVal={filter.date}
            onChange={(e) => {
              onFilterChanged(e, "date")
            }}
          />
        </div>

        <FilterSort
          onSelect={(e) => {
            onFilterChanged(e, "sortOrder")
          }}
          selVal={filter.sortOrder}
        />
      </div>

      <div
        className={`mt-6 flex flex-1 flex-col gap-6 text-sm font-medium leading-5 text-gray-500 ${!isLoading && data.length === 0 && "items-center justify-center"}`}
      >
        {render()}
      </div>

      {hasNextPage && isFetchingNextPage && (
        <div className="flex w-full items-center justify-center py-7">
          <Spinner />
        </div>
      )}

      <div ref={ref} className="h-1 w-full" />

      <ResetFilter
        isVisible={Object.entries(filterOptions).toString() !== Object.entries(filter).toString()}
        onClick={resetFilterHandler}
      />
    </>
  )
}

export default List
