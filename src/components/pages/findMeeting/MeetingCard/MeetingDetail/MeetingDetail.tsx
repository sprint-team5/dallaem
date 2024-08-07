"use client"

import Image from "next/image"

import getAllReview, { IAllReview } from "@/actions/allReviewActions"
import getParticipants from "@/actions/api-hooks/getParticipants"
import getUserInfo from "@/actions/getUserInfo"
import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import ParticipantGage from "@/components/pages/findMeeting/MeetingCard/Atoms/ParticipantGage"
import WishBtn from "@/components/pages/wishlist/WishBtn"
import Review from "@/components/public/Review/Review"
import { useMeetingDetail } from "@/hooks/useMeetingDetail"
import { IMeetingData } from "@/types/meeting/meeting"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

import BottomBanner from "./BottomBanner"

export const MeetingDetailImage = ({ data }: { data: IMeetingData }) => {
  return (
    <div className="relative aspect-[19/10] h-[270px] w-1/2 overflow-hidden rounded-3xl border-2 border-gray-200 max-sm:h-auto max-sm:w-full">
      <Image
        src={data.image}
        alt={data.name}
        width={486}
        height={270}
        className="!h-full w-full object-cover"
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
    <div className="border-t-2 border-gray-200 p-6">
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
  )
}

const MeetingDetail = ({ id }: { id: string }) => {
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
      <main className="flex w-full justify-center">
        <div className="flex w-full max-w-[996px] justify-center bg-gray-50 px-[102px] py-[40px] max-md:px-[24px] max-md:py-[24px] max-sm:flex-col max-sm:px-[16px]">
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
