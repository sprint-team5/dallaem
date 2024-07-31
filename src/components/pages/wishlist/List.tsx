"use client"

import Image from "next/image"

import React from "react"

import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import ParticipantGage from "@/components/pages/findMeeting/MeetingCard/Atoms/ParticipantGage"
import ByeBtn from "@/components/pages/wishlist/ByeBtn"
import WishBtn from "@/components/pages/wishlist/WishBtn"
import Filter from "@/components/public/Filter/Filter"
import Spinner from "@/components/public/Spinner/Spinner"
import ArrowRight from "@/components/public/icon/staticIcon/ArrowRight"
import { location } from "@/constants/meeting"
import useWishList from "@/hooks/useWishList"
import { IMeetingData } from "@/types/meeting/meeting"
import dayjs from "dayjs"

const MeetingCard = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="flex w-full overflow-hidden rounded-3xl border-2 border-gray-100 bg-white max-sm:flex-col">
      {data.image && (
        <div className="relative h-[156px]">
          <Image
            src={data.image}
            alt={data.name}
            width={280}
            height={156}
            className="!h-full object-cover max-sm:w-full"
          />
          {dayjs(data.registrationEnd).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") && (
            <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-orange-600 px-[10px] py-[4px]">
              <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
              <span className="text-xs text-white">
                오늘 {dayjs(data.registrationEnd).format("H")}시 마감
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex grow flex-col justify-between px-6 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold">{data.name}</div>
              <div className="h-3 w-[2px] bg-gray-900" />
              <div className="text-sm font-medium text-gray-700">{data.location}</div>
            </div>
            <DateTag date={data.dateTime} />
          </div>
          {/* TODO: 찜하기 버튼 추가 필요 */}
          <WishBtn list={data} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image
              src="/icon/staticIcon/person.svg"
              alt="참가인원"
              width={16}
              height={16}
              className="mr-[2px]"
            />
            <span className="text-sm">{`${data.participantCount}/${data.capacity}`}</span>
            {Number(data.participantCount) <= 5 && (
              <>
                <Image
                  src="/icon/staticIcon/confirmed.svg"
                  alt="개설확정"
                  width={24}
                  height={24}
                  className="ml-[11px] mr-[6px]"
                />
                <div className="text-sm text-orange-500">개설확정</div>
              </>
            )}
          </div>
          <div className="mt-2 flex items-end gap-6">
            <ParticipantGage now={data.participantCount} max={data.capacity} />
            <div className="flex">
              <span className="whitespace-nowrap font-semibold text-orange-600">join now</span>
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const List = () => {
  const { filter, setFilter, isLoading, wishlist, onRefresh } = useWishList()

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
          if (key in filter) {
            const newFilterOption = { ...filter }
            // @ts-ignore
            delete newFilterOption[key]
            setFilter(newFilterOption)
          }
        } else {
          setFilter({ ...filter, [key]: e })
        }
      }
      // 2. 이벤트 객체를 넘기는 경우
      else {
        const target = e.target as HTMLButtonElement
        if (target.value) setFilter({ ...filter, [key]: target.value })
        // 3. 버튼 내의 svg 클릭 하는 경우 (value가 존재하지 않는 문제 때문에 추가, 부모요소의 value를 가져오도록)
        else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
          const targetParent = target.parentElement as HTMLButtonElement
          if (targetParent.value) setFilter({ ...filter, [key]: targetParent.value })
        }
      }
    }
  }

  return (
    <div className="mt-8 flex flex-1 flex-col">
      <div className="flex justify-between">
        <FilterTab
          selVal={filter.type}
          onSelect={(e) => {
            onFilterChanged(e, "type")
          }}
        />
      </div>

      <div className="relative z-30 mt-6 flex justify-between border-t pt-6 sm:mt-4 sm:pt-4">
        <div className="flex gap-2">
          <Filter
            data={location}
            placeholder="지역 선택"
            onSelect={(e) => {
              onFilterChanged(e, "location")
            }}
            selVal={filter.location}
          />
          <FilterCalendar
            placeholder="날짜 선택"
            selVal={filter.date}
            onChange={(e) => {
              onFilterChanged(e, "date")
            }}
          />
        </div>
        <FilterSort
          onSelect={(e) => {
            onFilterChanged(e, "sortBy")
          }}
          selVal={filter.sortBy}
        />
      </div>

      {isLoading ? (
        <div className="h-full w-full items-center justify-center p-80">
          <Spinner />
        </div>
      ) : (
        <div
          className={`mt-6 flex-1 ${wishlist.length === 0 && "flex items-center justify-center"}`}
        >
          {wishlist.length > 0 ? (
            wishlist.map((list) => {
              return (
                <div key={list.id} className="relative mt-6 first:mt-0">
                  {dayjs().isAfter(dayjs(list.registrationEnd)) && (
                    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 rounded-3xl bg-black/80 text-center text-sm font-medium leading-5 text-white sm:flex-row">
                      마감된 챌린지에요, <br />
                      다음 기회에 만나요 🙏
                      <ByeBtn list={list} onRefresh={onRefresh} />
                    </div>
                  )}
                  <MeetingCard data={list} />
                </div>
              )
            })
          ) : (
            <p className="text-sm font-medium leading-5 text-gray-500">아직 찜한 모임이 없어요</p>
          )}
        </div>
      )}
    </div>
  )
}

export default List
