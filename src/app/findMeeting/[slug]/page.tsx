import getQueryClient from "@/components/app/queryClient"
import MeetingDetail from "@/components/pages/findMeeting/MeetingCard/MeetingDetail/MeetingDetail"
import { meetingDetailOptions } from "@/hooks/useMeetingDetail"

const FindMeetingDetail = async ({ params }: { params: { slug: string } }) => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(meetingDetailOptions(params.slug))
  return <MeetingDetail id={params.slug} />
}
export default FindMeetingDetail
