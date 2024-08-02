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

  const clickHandler = (pathId: number) => {
    router.push(`/mypage/addReview?gatheringId=${pathId}`)
  }

  if (isPending) return <Spinner />

  return (
    <div className="flex flex-col gap-6">
      {Array.isArray(data) &&
        data.map((meeting: IGetMyMeetingsRes) => {
          return (
            <Card
              handlerReview={() => {
                clickHandler(meeting.id)
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
            />
          )
        })}
    </div>
  )
}

export default MyPageInfoWrapper
