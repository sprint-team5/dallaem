"use client"

import { useState } from "react"

import getAllReview from "@/actions/allReviewActions"
import FilterSort from "@/components/pages/allReview/FilterSort"
import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import Filter from "@/components/public/Filter/Filter"
import Review from "@/components/public/Review/Review"
import Spinner from "@/components/public/Spinner/Spinner"
import { location } from "@/constants/meeting"
import { IFilter } from "@/types/review/filter"
import { useQuery } from "@tanstack/react-query"

const List = () => {
  const [filter, setFilter] = useState<IFilter>({
    sortOrder: "asc",
  })
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["allReview", filter],
    queryFn: () => {
      return getAllReview(filter)
    },
  })

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
        className={`mt-6 flex flex-1 flex-col gap-6 text-sm font-medium leading-5 text-gray-500 ${reviews?.length === 0 && "items-center justify-center"}`}
      >
        {isLoading && (
          <div className="h-full w-full items-center justify-center p-80">
            <Spinner />
          </div>
        )}

        {reviews && reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <Review
                key={review.id}
                score={review.score}
                comment={review.comment}
                gathering={review.Gathering}
                createdAt={review.createdAt}
                user={review.User}
                image
              />
            )
          })
        ) : (
          <p>아직 리뷰가 없어요</p>
        )}
      </div>
    </>
  )
}

export default List
