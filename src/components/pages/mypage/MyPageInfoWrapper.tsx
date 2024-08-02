import { IGetMyMeetingsRes, fetchMyPageInfo } from "@/actions/fetchMyPageInfo"
import Card from "@/components/public/Card/Card"
import { useSuspenseQuery } from "@tanstack/react-query"

interface IMyPageInfoWrapperProps {
  dataFetchingKey: string
}

const MyPageInfoWrapper = ({ dataFetchingKey }: IMyPageInfoWrapperProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["mypage", dataFetchingKey],
    queryFn: ({ queryKey }) => {
      const fetchingKey = queryKey[1]
      const offset = 0
      const limit = 5
      return fetchMyPageInfo({ fetchingKey, offset, limit })
    },
  })
  return (
    <div className="flex flex-col gap-6">
      {Array.isArray(data) &&
        data.map((meeting: IGetMyMeetingsRes) => {
          return (
            <Card
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