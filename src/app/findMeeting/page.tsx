"use client"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import getMeetingList from "@/actions/api-hooks/getMeetingList"
import checkLogin from "@/actions/checkLogin"
import CreateMeetingModal from "@/components/pages/findMeeting/CreateMeeting/CreateMeetingModal"
import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import MeetingList from "@/components/pages/findMeeting/MeetingCard/MeetingList/MeetingList"
import Filter from "@/components/public/Filter/Filter"
import Spinner from "@/components/public/Spinner/Spinner"
import Button from "@/components/public/button/Button"
import { location } from "@/constants/meeting"
import { IFilterOption, IMeetingData } from "@/types/meeting/meeting"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"

const FindMeeting = () => {
  const [filterOption, setFilterOption] = useState<IFilterOption>({
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
    limit: 10,
  })
  const [isMeetingModal, setIsMeetingModal] = useState(false)

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["meetingList", filterOption],
    queryFn: ({ pageParam = 0 }) => {
      const queryOption = { ...filterOption }
      if (pageParam !== 0 && filterOption.limit) queryOption.offset = pageParam * filterOption.limit
      return getMeetingList(queryOption)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = allPages.length
      return total < lastPage.length ? total : undefined
    },
  })

  const { ref, inView } = useInView()

  const router = useRouter()

  // TODO: 이벤트를 넘기지 않고 수정할 값만 파싱해서 넘기도록 수정 필요(역할, 책임 등의 문제)
  const onFilterChanged = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | string,
    key: string,
  ) => {
    if (key) {
      // 1. date 등 문자열 값을 넘기는 경우
      if (typeof e === "string") {
        // 1-1. 빈 문자열을 받는 경우 초기화
        if (e === "") {
          if (key in filterOption) {
            const newFilterOption = { ...filterOption }
            // @ts-ignore
            delete newFilterOption[key]
            setFilterOption(newFilterOption)
          }
        } else {
          setFilterOption({ ...filterOption, [key]: e })
        }
      }
      // 2. 이벤트 객체를 넘기는 경우
      else {
        const target = e.target as HTMLButtonElement
        if (target.value) setFilterOption({ ...filterOption, [key]: target.value })
        // 3. 버튼 내의 svg 클릭 하는 경우 (value가 존재하지 않는 문제 때문에 추가, 부모요소의 value를 가져오도록)
        else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
          const targetParent = target.parentElement as HTMLButtonElement
          if (targetParent.value) setFilterOption({ ...filterOption, [key]: targetParent.value })
        }
      }
    }
  }

  const onClickCreateMeeting = async () => {
    if (await checkLogin()) setIsMeetingModal(!isMeetingModal)
    else router.push("/auth?mode=signin")
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="flex flex-col items-center max-md:px-[24px] max-md:py-[24px] max-sm:px-[16px]">
      <div className="h-full w-full max-w-[1200px] bg-gray-50 px-[102px] py-[40px]">
        <div className="relative flex justify-between">
          <FilterTab
            selVal={filterOption.type}
            onSelect={(e) => {
              onFilterChanged(e, "type")
            }}
          />
          <div className="absolute right-0 top-0 w-[115px] max-sm:w-[100px]">
            <Button borderStyle="solid" onClick={onClickCreateMeeting}>
              모임 만들기
            </Button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-6 flex justify-between">
          <div className="flex gap-2">
            <Filter
              data={location}
              placeholder="지역 선택"
              onSelect={(e) => {
                onFilterChanged(e, "location")
              }}
              selVal={filterOption.location}
            />
            <FilterCalendar
              placeholder="날짜 선택"
              selVal={filterOption.date}
              onChange={(e) => {
                onFilterChanged(e, "date")
              }}
            />
          </div>
          <FilterSort
            onSelect={(e) => {
              onFilterChanged(e, "sortBy")
            }}
            selVal={filterOption.sortBy}
          />
        </div>
        <MeetingList
          data={data as InfiniteData<Array<IMeetingData>> | null}
          isLoading={isLoading}
        />
        {isFetchingNextPage ? (
          <div className="py-7">
            <Spinner />
          </div>
        ) : (
          <div ref={ref} />
        )}
      </div>
      {isMeetingModal && (
        <CreateMeetingModal
          changeState={() => {
            setIsMeetingModal(!isMeetingModal)
          }}
          // 스크린 리더에서 해당 요소가 하위메뉴를 포함하고 있음을 알려주기 위한 속성
          aria-haspopup="true"
          // 스크린 리더에서 모달이 열려있는지 상태를 알려주기 위한 속성
          aria-pressed={isMeetingModal}
        />
      )}
    </div>
  )
}
export default FindMeeting
