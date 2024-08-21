"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import checkLogin from "@/actions/Auths/checkLogin"
import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import MeetingList from "@/components/pages/findMeeting/MeetingCard/MeetingList/MeetingList"
import Filter from "@/components/public/Filter/Filter"
import Spinner from "@/components/public/Spinner/Spinner"
import Sort from "@/components/public/icon/dynamicIcon/Sort"
import CreateMeetingModal from "@/components/public/modal/CreateMeetingModal"
import LIMIT from "@/constants/limit"
import { location } from "@/constants/meeting"
import ROUTE from "@/constants/route"
import useGetMeetingList from "@/hooks/useGetMeetingList"
import { IFilterOption } from "@/types/findMeeting/findMeeting"
import headClassIMG from "@public/img/head_class.png"

const FindMeeting = () => {
  const initialFilterOption: IFilterOption = {
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
    sortOrder: "asc",
    limit: LIMIT,
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
    else router.push(`${ROUTE.SIGNIN}&alert=로그인 후 이용이 가능합니다.`)
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-gray-50 px-6 py-14 md:m-12 md:px-16">
      <div className="flex-none">
        <div className="flex items-center gap-4">
          <div className="size-[72px] flex-none">
            <Image width={72} height={72} src={headClassIMG.src} alt="headClassIMG" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">함께 할 사람이 없나요?</p>
            <h4 className="mt-2 text-lg font-semibold leading-8 text-gray-900 sm:text-2xl">
              지금 모임에 참여해보세요
            </h4>
          </div>
        </div>
      </div>
      <div className="relative mt-12 flex justify-between">
        <FilterTab
          selVal={filterOption.type}
          onSelect={(e) => {
            onFilterChanged(e, "type")
          }}
        />
        <button
          type="button"
          className="absolute right-0 top-0 h-[34px] w-[85px] rounded-lg border border-primary bg-primary text-xs font-semibold leading-6 text-white transition-colors hover:bg-white hover:text-primary sm:text-sm md:h-[44px] md:w-[115px] md:rounded-xl md:text-base"
          onClick={onClickCreateMeeting}
        >
          모임 만들기
        </button>
      </div>
      <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-primary pt-4">
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
        <div className="ml-auto flex gap-2">
          <button
            aria-label="sortButton"
            type="button"
            className={`group flex size-9 cursor-pointer items-center justify-center rounded-xl border-2 transition-colors ${filterOption.sortOrder === "asc" ? "border-gray-100 bg-white" : "border-gray-100 bg-black"}`}
            onClick={() => {
              if (filterOption.sortOrder === "asc") {
                return updateFilterOption({
                  sortOrder: "desc",
                })
              }
              return updateFilterOption({
                sortOrder: "asc",
              })
            }}
          >
            <Sort
              state="default"
              className={`transition-colors ${filterOption.sortOrder === "desc" && "text-white"} `}
            />
          </button>
          <FilterSort
            onSelect={(e) => {
              onFilterChanged(e, "sortBy")
            }}
            selVal={filterOption.sortBy}
          />
        </div>
      </div>
      <MeetingList data={data ?? null} isLoading={isLoading} />
      {isFetchingNextPage ? (
        <div className="py-7">
          <Spinner />
        </div>
      ) : (
        <div ref={ref} />
      )}
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
