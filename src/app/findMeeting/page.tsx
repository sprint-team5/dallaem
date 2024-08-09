"use client"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import checkLogin from "@/actions/checkLogin"
import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import MeetingList from "@/components/pages/findMeeting/MeetingCard/MeetingList/MeetingList"
import Filter from "@/components/public/Filter/Filter"
import Spinner from "@/components/public/Spinner/Spinner"
import Button from "@/components/public/button/Button"
import CreateMeetingModal from "@/components/public/modal/CreateMeetingModal"
import { location } from "@/constants/meeting"
import ROUTE from "@/constants/route"
import useGetMeetingList from "@/hooks/useGetMeetingList"
import { IFilterOption } from "@/types/meeting/meeting"

const FindMeeting = () => {
  const initialFilterOption: IFilterOption = {
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
    limit: 10,
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    filterOption,
    updateFilterOption,
  } = useGetMeetingList(initialFilterOption)

  const [isMeetingModal, setIsMeetingModal] = useState(false)

  const { ref, inView } = useInView()

  const router = useRouter()

  const onFilterChanged = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | string,
    key: string,
  ) => {
    if (key) {
      if (typeof e === "string") {
        if (e === "") {
          const newFilterOption = { ...filterOption }
          // @ts-ignore
          delete newFilterOption[key]
          updateFilterOption(newFilterOption)
        } else {
          updateFilterOption({ [key]: e })
        }
      } else {
        const target = e.target as HTMLButtonElement
        if (target.value) updateFilterOption({ [key]: target.value })
        else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
          const targetParent = target.parentElement as HTMLButtonElement
          if (targetParent.value) updateFilterOption({ [key]: targetParent.value })
        }
      }
    }
  }

  const onClickCreateMeeting = async () => {
    if (await checkLogin()) setIsMeetingModal(!isMeetingModal)
    else router.push(ROUTE.SIGNIN)
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView])

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
        <MeetingList data={data ?? null} isLoading={isLoading} />
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
          aria-haspopup="true"
          aria-pressed={isMeetingModal}
        />
      )}
    </div>
  )
}

export default FindMeeting
