"use client"

import Image from "next/image"

import { useEffect, useRef, useState } from "react"

import getUserInfo from "@/actions/Auths/getUserInfo"
import getParticipants from "@/actions/Gatherings/getParticipants"
import getAllReview, { IAllReview } from "@/actions/Reviews/allReviewActions"
import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import ParticipantGage from "@/components/pages/findMeeting/MeetingCard/Atoms/ParticipantGage"
import WishBtn from "@/components/pages/wishlist/WishBtn"
import Review from "@/components/public/Review/Review"
import { useMeetingDetail } from "@/hooks/useMeetingDetail"
import { IMeetingData } from "@/types/findMeeting/findMeeting"
import { msTransform } from "@/util/days"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

import BottomBanner from "./BottomBanner"

export const MeetingDetailImage = ({ data }: { data: IMeetingData }) => {
  const dayRender = (registrationEnd: string) => {
    if (dayjs(registrationEnd).diff(dayjs(), "day") === 7) {
      return <>다음주 마감</>
    }

    if (dayjs(registrationEnd).diff(dayjs(), "day") > 0) {
      return <>{dayjs(registrationEnd).diff(dayjs(), "day")}일 후 마감</>
    }

    if (dayjs(registrationEnd).diff(dayjs(), "hour") <= 24) {
      return <>오늘 {dayjs(registrationEnd).diff(dayjs(), "hour")}시 마감</>
    }

    return null
  }

  return (
    <div className="relative aspect-[19/10] h-[270px] w-1/2 overflow-hidden rounded-3xl border-2 border-gray-200 max-sm:h-auto max-sm:w-full">
      <Image
        src={data.image}
        alt={data.name}
        width={486}
        height={270}
        className="!h-full w-full object-cover"
      />
      {msTransform(data.registrationEnd) > dayjs().unix() && (
        <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-primary px-[10px] py-[4px]">
          <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
          <span className="text-xs text-white">{dayRender(data.registrationEnd)}</span>
        </div>
      )}
    </div>
  )
}

export const MeetingDetailCard = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="flex w-1/2 overflow-hidden rounded-3xl border-2 border-gray-100 bg-white max-sm:w-full max-sm:flex-col">
      <div className="flex grow flex-col justify-between px-6 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{data.name}</div>
            <div className="mb-3 text-sm font-medium text-gray-700">{data.location}</div>
            <DateTag date={data.dateTime} />
          </div>
          <WishBtn list={data} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">{`모집정원 ${data.participantCount}명`}</span>
            {Number(data.participantCount) >= 5 && (
              <div className="flex">
                <Image
                  src="/icon/staticIcon/confirmed.svg"
                  alt="개설확정"
                  width={24}
                  height={24}
                  className="ml-[11px] mr-[6px]"
                />
                <div className="text-sm text-orange-500">개설확정</div>
              </div>
            )}
          </div>
          <ParticipantGage now={data.participantCount} max={data.capacity} />
          <div className="flex justify-between">
            <span className="text-xs text-gray-700">최소인원 5명</span>
            <span className="text-xs text-gray-700">{`최대인원 ${data.capacity}명`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MeetingDetailReview = ({ reviews }: { reviews: Array<IAllReview> | undefined }) => {
  return (
    <div className="border-t-2 border-primary py-6">
      <p className="text-base font-semibold leading-7 text-[#11827] sm:text-lg">
        이용자들은 이 프로그램을 이렇게 느꼈어요!
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <Review
                key={review.id}
                score={review.score}
                comment={review.comment}
                gathering={review.Gathering}
                createdAt={review.createdAt}
                user={review.User}
              />
            )
          })
        ) : (
          <div className="flex items-center justify-center whitespace-nowrap py-80 max-sm:p-40">
            아직 리뷰가 없어요
          </div>
        )}
      </div>
    </div>
  )
}

const MeetingDetail = ({ id }: { id: string }) => {
  const ref = useRef<HTMLElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.paddingBottom = `${height}px`
  }, [ref, height])

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => {
      return getAllReview({ gatheringId: id })
    },
  })

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return getUserInfo()
    },
  })

  const { data: participants } = useQuery({
    queryKey: ["participants", id],
    queryFn: () => {
      return getParticipants(id)
    },
  })

  const { data, status, error } = useMeetingDetail(id)

  const checkIsHost = userInfo ? userInfo.id === data.createdBy : false
  const checkIsJoined =
    userInfo && participants
      ? participants.find((item: any) => {
          return item.userId === userInfo.id
        })
      : false

  return (
    <>
      <main ref={ref}>
        <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-gray-50 px-6 py-14 md:m-12 md:px-16">
          {status === "success" && (
            <div className="flex flex-col gap-6 max-sm:gap-4">
              <div className="flex gap-6 max-sm:flex-col">
                <MeetingDetailImage data={data} />
                <MeetingDetailCard data={data} />
              </div>
              <MeetingDetailReview reviews={reviews} />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center py-80 max-sm:py-40">
              모임을 찾을 수 없습니다.
            </div>
          )}
        </div>
      </main>
      <BottomBanner
        setHeight={setHeight}
        id={data.id}
        isHost={checkIsHost}
        isJoined={checkIsJoined}
        limit={data.capacity}
        participant={data.participantCount}
      />
    </>
  )
}
export default MeetingDetail
