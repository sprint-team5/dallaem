"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { MouseEvent, useState } from "react"

import { IGetMyPageRes, IReview, fetchMyPageInfo } from "@/actions/fetchMyPageInfo"
import Card from "@/components/public/Card/Card"
import Review from "@/components/public/Review/Review"
import Spinner from "@/components/public/Spinner/Spinner"
import { useQuery } from "@tanstack/react-query"

import ReviewStateButton from "./ReviewStateButton"

interface IMyPageInfoWrapperProps {
  dataFetchingKey: string
  onClick: ({ type, reviewed }: { type: string; reviewed: boolean }) => void
  reviewed?: boolean
}

interface IDataSort {
  dataFetchingKey: string
  isReviewed?: boolean
}

const MyPageInfoWrapper = ({ dataFetchingKey, onClick, reviewed }: IMyPageInfoWrapperProps) => {
  const isMyOwnMeeting = dataFetchingKey === "myOwnMeeting"
  const isMyReview = dataFetchingKey === "myReview"
  const initialState = reviewed && true
  const router = useRouter()
  const [hasReview, setHasReview] = useState(initialState)

  let dataSort: IDataSort = { dataFetchingKey }

  if (hasReview) {
    dataSort = { ...dataSort, isReviewed: true }
  }

  const { data, isPending } = useQuery({
    queryKey: ["mypage", dataSort],
    queryFn: ({ queryKey }) => {
      const querySort = queryKey[1] as IDataSort
      const fetchingKey = querySort.dataFetchingKey
      const isReviewed = querySort.isReviewed ?? null
      const offset = 0
      const limit = 5
      return fetchMyPageInfo({ fetchingKey, offset, limit, isReviewed })
    },
  })

  const reviewButtonHandler = () => {
    setHasReview(!hasReview)
  }

  const clickViewReviewHandler = (e: MouseEvent) => {
    e.preventDefault()
    onClick({ type: "myReview", reviewed: true })
    setHasReview(true)
  }
  const clickCreateReviewHandler = (e: MouseEvent, pathId: number) => {
    e.preventDefault()
    router.push(`/mypage/addReview?gatheringId=${pathId}`)
  }

  if (isPending) return <Spinner />

  return (
    <>
      {isMyReview && <ReviewStateButton onClick={reviewButtonHandler} hasReview={hasReview} />}
      <div className="flex flex-col gap-6">
        {data &&
          data.map((item: IGetMyPageRes & IReview) => {
            if (isMyReview && hasReview) {
              return (
                <Review
                  key={item.id}
                  score={item.score}
                  createdAt={item.createdAt}
                  comment={item.comment}
                  gathering={item.Gathering}
                  isImage={item.Gathering.image !== ""}
                />
              )
            }
            return (
              <Link key={item.name} href={`/findMeeting/${item.id}`}>
                <Card
                  handlerReview={(e: MouseEvent) => {
                    clickCreateReviewHandler(e, item.id)
                  }}
                  handlerView={clickViewReviewHandler}
                  teamId={item.teamId}
                  id={item.id}
                  name={item.name}
                  dateTime={item.dateTime}
                  registrationEnd={item.registrationEnd}
                  location={item.location}
                  participantCount={item.participantCount}
                  image={item.image}
                  capacity={item.capacity}
                  isBtnHide={isMyOwnMeeting}
                  isMy={isMyOwnMeeting || !hasReview}
                  isReview={item.isReviewed}
                />
              </Link>
            )
          })}
      </div>
    </>
  )
}

export default MyPageInfoWrapper
