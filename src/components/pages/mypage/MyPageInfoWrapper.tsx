import { IGetMyMeetingsRes, fetchMyPageInfo } from "@/actions/fetchMyPageInfo"
import Card from "@/components/public/Card/Card"
import { useQuery } from "@tanstack/react-query"

interface IMyPageInfoWrapperProps {
  dataFetchingKey: string
}

const MyPageInfoWrapper = ({ dataFetchingKey }: IMyPageInfoWrapperProps) => {
  const { data } = useQuery({
    queryKey: ["mypage", dataFetchingKey],
    queryFn: ({ queryKey }) => {
      const fetchingKey = queryKey[1]
      const offset = 5
      const limit = 5
      return fetchMyPageInfo({ fetchingKey, offset, limit })
    },
  })
  return (
    <div>
      {Array.isArray(data) &&
        data.map((meeting: IGetMyMeetingsRes) => {
          return (
            <Card
              registrationEnd={meeting.registrationEnd}
              image={meeting.image}
              capacity={meeting.capacity}
              id={meeting.id}
              teamId={meeting.teamId}
              key={meeting.name}
              name={meeting.name}
              dateTime={meeting.dateTime}
              location={meeting.location}
              participantCount={meeting.participantCount}
            />
          )
        })}
    </div>
  )
}

export default MyPageInfoWrapper
