"use client"

import { notFound } from "next/navigation"

import { useEffect, useRef, useState } from "react"

import BottomFloatingBar from "@/components/public/bottomFloatingBar/BottomFloatingBar"
import useGetMeetingDetailData from "@/hooks/useGetMeetingDetailData"

import MeetingImage from "./components/MeetingImage"
import MeetingInformationCard from "./components/MeetingInformationCard"
import MeetingReviewList from "./components/MeetingReviewList"

const MeetingDetail = ({ id }: { id: string }) => {
  const ref = useRef<HTMLElement>(null)
  const [height, setHeight] = useState(0)

  const { meetingData, reviews, status, error, isHost, isJoined } = useGetMeetingDetailData(id)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.paddingBottom = `${height}px`
  }, [ref, height])

  if (!meetingData?.name) {
    notFound()
  }

  return (
    <>
      <title>{`같이달램 | ${meetingData.name}`}</title>
      <main ref={ref}>
        <div className="m-6 flex min-h-screen flex-col rounded-[20px] bg-gray-50 px-6 py-14 md:m-12 md:px-16">
          {status === "success" && (
            <div className="flex flex-col gap-6 max-sm:gap-4">
              <div className="flex gap-6 max-sm:flex-col">
                <MeetingImage data={meetingData} />
                <MeetingInformationCard data={meetingData} />
              </div>
              <MeetingReviewList reviews={reviews} />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center py-80 max-sm:py-40">
              모임을 찾을 수 없습니다.
            </div>
          )}
        </div>
      </main>
      <BottomFloatingBar
        setHeight={setHeight}
        id={meetingData.id}
        isHost={isHost}
        isJoined={isJoined}
        limit={meetingData.capacity}
        participant={meetingData.participantCount}
      />
    </>
  )
}

export default MeetingDetail
