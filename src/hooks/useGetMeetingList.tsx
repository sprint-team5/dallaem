import { useState } from "react"

import getMeetingList from "@/actions/getMeetingList"
import { IFilterOption, IMeetingData } from "@/types/meeting/meeting"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"

const useGetMeetingList = (initialFilterOption: IFilterOption) => {
  const [filterOption, setFilterOption] = useState<IFilterOption>(initialFilterOption)

  const query = useInfiniteQuery<
    Array<IMeetingData>,
    Error,
    InfiniteData<Array<IMeetingData>>,
    [string, IFilterOption],
    number
  >({
    queryKey: ["meetingList", filterOption],
    queryFn: ({ pageParam = 0 }) => {
      const queryOption = { ...filterOption }
      if (pageParam !== 0 && filterOption.limit) {
        queryOption.offset = pageParam * filterOption.limit
      }
      return getMeetingList(queryOption)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = allPages.length
      return total < lastPage.length ? total : undefined
    },
  })

  const updateFilterOption = (newOption: Partial<IFilterOption>) => {
    setFilterOption((prevOption) => {
      return { ...prevOption, ...newOption }
    })
  }

  return {
    ...query,
    filterOption,
    updateFilterOption,
  }
}

export default useGetMeetingList