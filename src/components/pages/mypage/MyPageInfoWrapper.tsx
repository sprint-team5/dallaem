"use client"

import { useRouter } from "next/navigation"

import { IGetMyMeetingsRes, fetchMyPageInfo } from "@/actions/fetchMyPageInfo"
import Card from "@/components/public/Card/Card"
import Spinner from "@/components/public/Spinner/Spinner"
import { useQuery } from "@tanstack/react-query"

interface IMyPageInfoWrapperProps {
  dataFetchingKey: string
}

const MyPageInfoWrapper = ({ dataFetchingKey }: IMyPageInfoWrapperProps) => {
  const isMyOwnMeeting = dataFetchingKey === "myOwnMeeting"
  console.log(isMyOwnMeeting)
  const router = useRouter()
  const { data, isPending } = useQuery({
    queryKey: ["mypage", dataFetchingKey],
    queryFn: ({ queryKey }) => {
      const fetchingKey = queryKey[1]
      const offset = 0
      const limit = 5
      return fetchMyPageInfo({ fetchingKey, offset, limit })
    },
  })
  const clickViewReviewHandler = (pathId: number) => {
    router.push(`/findMeeting/${pathId}`)
  }
  const clickCreateReviewHandler = (pathId: number) => {
    if (data.isReviewed) router.push(`/mypage/addReview?gatheringId=${pathId}`)
  }
  if (isPending) return <Spinner />
  return (
    <div className="flex flex-col gap-6">
      {Array.isArray(data) &&
        data.map((meeting: IGetMyMeetingsRes) => {
          return (
            <Card
              handlerReview={() => {
                clickCreateReviewHandler(meeting.id)
              }}
              handlerView={() => {
                clickViewReviewHandler(meeting.id)
              }}
              teamId={meeting.teamId}
              id={meeting.id}
              name={meeting.name}
              dateTime={meeting.dateTime}
              registrationEnd={meeting.registrationEnd}
              location={meeting.location}
              participantCount={meeting.participantCount}
              image={meeting.image}
              capacity={meeting.capacity}
              key={meeting.name}
              isBtnHide={isMyOwnMeeting}
              isMy={isMyOwnMeeting}
              isReview={meeting.isReviewed}
            />
          )
        })}
    </div>
  )
}

export default MyPageInfoWrapper
