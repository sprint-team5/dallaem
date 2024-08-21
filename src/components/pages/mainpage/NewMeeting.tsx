"use client"

import Image from "next/image"
import Link from "next/link"

import { useEffect, useRef, useState } from "react"

import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import useGetMeetingList from "@/hooks/useGetMeetingList"
import { IFilterOption } from "@/types/meeting/meeting"
import SwiperCore from "swiper"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"

const NewMeeting = () => {
  const dotUl = useRef<HTMLUListElement>(null)
  const [realIndex, setRealIndex] = useState(1)
  const [swiperSetting, setSwiperSetting] = useState<SwiperProps | null>(null)

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        speed: 600,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1025: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        },
        pagination: {
          el: dotUl.current,
          clickable: true,
          renderBullet: (_, className: string) => {
            return `<li class="${className}"/>`
          },
        },
        modules: [Pagination],
        onSlideChange: (swiper: SwiperCore) => {
          setRealIndex(swiper.realIndex / 3 + 1)
        },
      })
    }
  }, [swiperSetting])

  const initialFilterOption: IFilterOption = {
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
    sortOrder: "desc",
    limit: 9,
  }

  const { data } = useGetMeetingList(initialFilterOption)

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold md:text-2xl">NEW 모임 ⭐</h1>
        <div className="flex items-center gap-2">
          <ul ref={dotUl} className="hidden gap-1 lg:flex" />
          <div className="rounded-full border border-gray-300 px-2 py-[1px] text-[10px] font-semibold">
            {realIndex} / 3
          </div>
        </div>
      </div>
      {swiperSetting && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Swiper {...swiperSetting} className="mt-10">
          {data?.pages.map((pages) => {
            return pages.map((meeting) => {
              return (
                <SwiperSlide key={meeting.id}>
                  <Link href={`/findMeeting/${meeting.id}`}>
                    <div className="overflow-hidden rounded-2xl border">
                      <div className="relative w-full after:block after:pb-[calc(265/463*100%)]">
                        <Image
                          src={meeting.image}
                          alt={`${meeting.name} 이미지`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 px-5">
                        <div className="flex items-center">
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
      )}
    </>
  )
}

export default NewMeeting
