"use client"

import Image from "next/image"
import Link from "next/link"

import { useEffect, useRef, useState } from "react"

import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import MainCardSkeleton from "@/components/public/Skeleton/MainCardSkeleton"
import useGetMeetingList from "@/hooks/useGetMeetingList"
import { IFilterOption } from "@/types/findMeeting/findMeeting"
import SwiperCore from "swiper"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"

const NewMeeting = () => {
  const dotUl = useRef<HTMLUListElement>(null)
  const [realIndex, setRealIndex] = useState(1)
  const [snapLength, setSnapLength] = useState(1)
  const [swiperSetting, setSwiperSetting] = useState<SwiperProps | null>(null)

  const initialFilterOption: IFilterOption = {
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
    sortOrder: "desc",
    limit: 12,
  }

  const { data, isLoading } = useGetMeetingList(initialFilterOption)

  useEffect(() => {
    if (!swiperSetting && data) {
      setSwiperSetting({
        speed: 800,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        },
        autoplay: {
          delay: 8000,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: dotUl.current,
          clickable: true,
          renderBullet: (_, className: string) => {
            return `<li class="${className}"/>`
          },
        },
        modules: [Pagination, Autoplay],
        onSlideChange: (swiper: SwiperCore) => {
          const slidesPerGroup = swiper.params.slidesPerGroup || 0
          const snapL = swiper.snapGrid.length
          setRealIndex(swiper.realIndex / slidesPerGroup + 1)
          setSnapLength(snapL)
        },
      })
    }
  }, [swiperSetting, data])

  const render = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          <div>
            <MainCardSkeleton />
          </div>
          <div className="hidden md:block">
            <MainCardSkeleton />
          </div>
          <div className="hidden xl:block">
            <MainCardSkeleton />
          </div>
        </div>
      )
    }

    if (!data || data.pages[0].length === 0) {
      return (
        <p className="w-full py-10 text-center text-sm text-gray-500">첫 모임을 등록해주세요! 🖐️</p>
      )
    }

    return (
      swiperSetting && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Swiper {...swiperSetting}>
          {data?.pages.map((pages) => {
            return pages.map((meeting) => {
              return (
                <SwiperSlide key={meeting.id} className="!h-auto">
                  <Link href={`/findMeeting/${meeting.id}`} className="block h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border">
                      <div className="relative w-full after:block after:pb-[calc(265/463*100%)]">
                        <Image
                          src={meeting.image}
                          alt={`${meeting.name} 이미지`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 px-5">
                        <div className="flex flex-wrap items-center">
                          <h2 className="text-lg font-semibold text-gray-800 after:px-2 after:content-['|']">
                            {meeting.name}
                          </h2>{" "}
                          <span className="text-sm font-medium text-gray-700">
                            {meeting.location}
                          </span>
                        </div>
                        <div className="mt-4">
                          <DateTag date={meeting.dateTime} />
                        </div>
                        <div className="mt-5 flex gap-[11px]">
                          <div className="flex items-center gap-[2px]">
                            <Image
                              src="/icon/staticIcon/person.svg"
                              alt="참가인원"
                              width={16}
                              height={16}
                              className="mr-[2px]"
                            />{" "}
                            {meeting.participantCount}/{meeting.capacity}
                          </div>
                          {Number(meeting.participantCount) >= 5 && (
                            <div className="flex items-center gap-1">
                              <Image
                                src="/icon/staticIcon/confirmed.svg"
                                alt="개설확정"
                                width={24}
                                height={24}
                              />{" "}
                              <span className="text-sm text-primary">개설확정</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })
          })}
        </Swiper>
      )
    )
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold md:text-2xl">NEW 모임 ⭐</h1>
        <div className="flex items-center gap-2">
          <ul ref={dotUl} className="hidden gap-1 lg:flex" />
          <div className="rounded-full border border-gray-300 px-2 py-[1px] text-[10px] font-semibold">
            {realIndex} / {snapLength}
          </div>
        </div>
      </div>
      <div className="mt-10">{render()}</div>
    </>
  )
}

export default NewMeeting
