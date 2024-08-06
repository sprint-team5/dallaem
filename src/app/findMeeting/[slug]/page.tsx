import getQueryClient from "@/components/app/queryClient"
import MeetingDetail from "@/components/pages/findMeeting/MeetingCard/MeetingDetail/MeetingDetail"
import BottomFloatingBar from "@/components/public/bottomFloatingBar/BottomFloatingBar"
import { meetingDetailOptions } from "@/hooks/useMeetingDetail"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

const FindMeetingDetail = async ({ params }: { params: { slug: string } }) => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(meetingDetailOptions(params.slug))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeetingDetail id={params.slug} />
      <BottomFloatingBar />
    </HydrationBoundary>
  )
}
export default FindMeetingDetail
