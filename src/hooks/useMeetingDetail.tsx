import getMeetingDetail from "@/actions/apis/getMeetingDetail"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const meetingDetailOptions = (id: string) => {
  return queryOptions({
    queryKey: ["allReview", id],
    queryFn: () => {
      return getMeetingDetail(id)
    },
  })
}

export const useMeetingDetail = (id: string) => {
  const { data, status, error } = useQuery(meetingDetailOptions(id))
  return { data, status, error }
}
