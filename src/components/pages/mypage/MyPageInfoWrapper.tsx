"use client"

import { useRouter } from "next/navigation"

import { Fragment, MouseEvent, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { fetchMyPageInfo } from "@/actions/Gatherings/fetchMyPageInfo"
import CardBtn from "@/components/public/Card/Atom/CardBtn"
import Card from "@/components/public/Card/Card"
import MyCard from "@/components/public/Card/MyCard/MyCard"
import Review from "@/components/public/Review/Review"
import CardSkeleton from "@/components/public/Skeleton/CardSkeleton"
import ReviewSkeleton from "@/components/public/Skeleton/ReviewSkeleton"
import Spinner from "@/components/public/Spinner/Spinner"
import LIMIT from "@/constants/limit"
import ROUTE from "@/constants/route"
import { IDataSort, IGetMyPageRes, IMyPageInfoWrapperProps, IReview } from "@/types/mypage/mypage"
import { isCurrentDateAfter } from "@/util/days"
import { useInfiniteQuery } from "@tanstack/react-query"

import MyPageDefault from "./MyPageDefault"
import ReviewStateButton from "./ReviewStateButton"

const useInfiniteQueryHook = (keyData: IDataSort) => {
  const { data, isPending, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["mypage", keyData],
    queryFn: ({ queryKey, pageParam }) => {
      const querySort = queryKey[1] as IDataSort
      const fetchingKey = querySort.dataFetchingKey
      const isReviewed = querySort.isReviewed ?? null
      const offset = pageParam * LIMIT
      const limit = LIMIT
      return fetchMyPageInfo({ fetchingKey, offset, limit, isReviewed })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage?.hasMore ? lastPageParam + 1 : undefined
    },
    staleTime: 1000,
    gcTime: 1000,
  })

  return { data, isPending, fetchNextPage, isFetchingNextPage }
}

const MyPageInfoWrapper = ({ dataFetchingKey, onClick, isReviewed }: IMyPageInfoWrapperProps) => {
  const isMyOwnMeeting = dataFetchingKey === "myOwnMeeting"
  const isMyReview = dataFetchingKey === "myReview"
  const router = useRouter()
  const [hasReview, setHasReview] = useState(isReviewed)
  const { ref, inView } = useInView({
    threshold: 1,
  })

  let dataSort: IDataSort = { dataFetchingKey }

  if (hasReview) {
    dataSort = { ...dataSort, isReviewed: true }
  }

  const { data, isPending, fetchNextPage, isFetchingNextPage } = useInfiniteQueryHook(dataSort)

  const reviewButtonHandler = (value: boolean) => {
    setHasReview(value)
  }

  const clickViewReviewHandler = (e: MouseEvent) => {
    e.preventDefault()
    onClick({ type: "myReview", isReviewed: true })
    setHasReview(true)
  }

  const clickCreateReviewHandler = (e: MouseEvent, pathId: number) => {
    e.preventDefault()
    router.push(`${ROUTE.MY_PAGE}/addReview?gatheringId=${pathId}`)
  }

  useEffect(() => {
    fetchNextPage()
  }, [inView, fetchNextPage])

  const dataPages = data?.pages ?? []

  if (isPending) {
    if (dataFetchingKey === "myReview") {
      return (
        <div className="flex flex-col gap-4">
          {new Array(LIMIT)
            .fill(0)
            .map((_, i) => {
              return i + 1
            })
            .map((number) => {
              return <ReviewSkeleton key={number} />
            })}
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-4">
        {new Array(LIMIT)
          .fill(0)
          .map((_, i) => {
            return i + 1
          })
          .map((number) => {
            return <CardSkeleton key={number} />
          })}
      </div>
    )
  }

  if (!isPending && dataPages[0]?.data.length === 0) {
    return (
      <MyPageDefault
        dataFetchingKey={dataFetchingKey}
        onClick={reviewButtonHandler}
        hasReview={hasReview}
      />
    )
  }

  return (
    <>
      {isMyReview && <ReviewStateButton onClick={reviewButtonHandler} hasReview={hasReview} />}
      <div className="relative flex flex-col gap-6">
        {dataPages &&
          dataPages?.map((dataPage) => {
            return dataPage?.data.map((item: IGetMyPageRes & IReview) => {
              if (isMyReview && hasReview) {
                return (
                  <Review
                    key={item.id}
                    score={item.score}
                    createdAt={item.createdAt}
                    comment={item.comment}
                    gathering={item.Gathering}
                    isImage={item.Gathering?.image !== ""}
                  />
                )
              }
              return (
                <Fragment key={item.id}>
                  {isMyOwnMeeting ? (
                    <MyCard
                      teamId={item.teamId}
                      id={item.id}
                      name={item.name}
                      dateTime={item.dateTime}
                      location={item.location}
                      participantCount={item.participantCount}
                      image={item.image}
                      capacity={item.capacity}
                    />
                  ) : (
                    <Card
                      teamId={item.teamId}
                      id={item.id}
                      name={item.name}
                      dateTime={item.dateTime}
                      registrationEnd={item.registrationEnd}
                      location={item.location}
                      participantCount={item.participantCount}
                      image={item.image}
                      capacity={item.capacity}
                    >
                      {isCurrentDateAfter(item.registrationEnd) && !item.isReviewed && (
                        <CardBtn
                          type="active"
                          onClick={(e: MouseEvent) => {
                            clickCreateReviewHandler(e, item.id)
                          }}
                        >
                          리뷰 작성하기
                        </CardBtn>
                      )}
                      {isCurrentDateAfter(item.registrationEnd) && item.isReviewed && (
                        <CardBtn type="active" onClick={clickViewReviewHandler}>
                          내가 쓴 리뷰 보기
                        </CardBtn>
                      )}
                      {!isCurrentDateAfter(item.registrationEnd) && (
                        <CardBtn type="outline" onClick={() => {}}>
                          예약 취소하기
                        </CardBtn>
                      )}
                    </Card>
                  )}
                </Fragment>
              )
            })
          })}
        {isFetchingNextPage && <Spinner />}
      </div>
      <div ref={ref} className="h-1 w-full" />
    </>
  )
}

export default MyPageInfoWrapper
