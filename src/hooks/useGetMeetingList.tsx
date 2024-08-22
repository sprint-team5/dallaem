import { useState } from "react"

import getMeetingList from "@/actions/Gatherings/getMeetingList"
import { IFilterOption, IMeetingData } from "@/types/findMeeting/findMeeting"
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

  const resetFilterOption = () => {
    setFilterOption(initialFilterOption)
  }

  return {
    ...query,
    filterOption,
    updateFilterOption,
    resetFilterOption,
  }
}

export default useGetMeetingList
