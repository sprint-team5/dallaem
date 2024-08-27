import getUserInfo from "@/actions/Auths/getUserInfo"
import getParticipants from "@/actions/Gatherings/getParticipants"
import getAllReview from "@/actions/Reviews/allReviewActions"
import { useMeetingDetail } from "@/hooks/useMeetingDetail"
import { useQuery } from "@tanstack/react-query"

const useGetMeetingDetailData = (id: string) => {
  const { data: meetingData, status, error } = useMeetingDetail(id)

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => {
      return getAllReview({ gatheringId: id })
    },
  })

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return getUserInfo()
    },
  })

  const { data: participants } = useQuery({
    queryKey: ["participants", id],
    queryFn: () => {
      return getParticipants(id)
    },
  })

  const checkIsHost = userInfo ? userInfo.id === meetingData?.createdBy : false
  const checkIsJoined =
    userInfo && participants
      ? participants.find((item: any) => {
          return item.userId === userInfo.id
        })
      : false

  return {
    meetingData,
    reviews,
    userInfo,
    participants,
    status,
    error,
    isHost: checkIsHost,
    isJoined: checkIsJoined,
  }
}

export default useGetMeetingDetailData
