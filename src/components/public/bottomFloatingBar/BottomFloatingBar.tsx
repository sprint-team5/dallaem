"use client"

import { useRouter } from "next/navigation"

import { useEffect, useRef } from "react"

import checkLogin from "@/actions/Auths/checkLogin"
import cancelMeeting from "@/actions/Gatherings/cancelMeeting"
import quitMeeting from "@/actions/Gatherings/quitMeeting"
import ROUTE from "@/constants/route"
import useJoinGathering from "@/hooks/Gatherings/useJoinGathering"
import { IBannerProps } from "@/types/findMeeting/findMeeting"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const BottomBanner = ({ id, isHost, isJoined, limit, participant, setHeight }: IBannerProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: joinGathering } = useJoinGathering()

  const quitMutation = useMutation({
    mutationFn: () => {
      return quitMeeting(id)
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["meetingDetail"] })
      await queryClient.invalidateQueries({ queryKey: ["participants"] })
      await queryClient.invalidateQueries({ queryKey: ["meetingList"] })
      await queryClient.invalidateQueries({
        queryKey: ["mypage"],
      })

      router.replace(`${ROUTE.GATHERINGS}/${id}?alert=${res}`)
    },
  })

  const cancelMutation = useMutation({
    mutationFn: () => {
      return cancelMeeting(id)
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["meetingList"] })
      await queryClient.invalidateQueries({
        queryKey: ["mypage"],
      })

      if (res) router.replace(`${ROUTE.GATHERINGS}?alert=${res}`)
      else router.replace(ROUTE.GATHERINGS)
    },
  })

  const renderFirstText = () => {
    if (participant === limit) return `모집이 마감됐어요, 다음 기회를 기대해주세요.`
    if (isJoined) return "모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요"
    return "지금 모임에 참여하세요."
  }

  const renderSecondaryText = () => {
    if (participant < 5) return `모임 개설확정까지 ${5 - participant}명 남았어요!`
    if (participant >= 5 && participant < limit)
      return `모집 정원 마감까지 ${limit - participant}명 남았어요!`
    if (participant === limit) return "모집 정원 마감!"
    return ""
  }

  const onClickCancel = async () => {
    cancelMutation.mutate()
  }
  const onClickJoin = async () => {
    if (await checkLogin()) {
      joinGathering(id, {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries({ queryKey: ["meetingDetail"] })
          await queryClient.invalidateQueries({ queryKey: ["participants"] })
          await queryClient.invalidateQueries({ queryKey: ["meetingList"] })
          await queryClient.invalidateQueries({
            queryKey: ["mypage"],
          })

          router.replace(`${ROUTE.GATHERINGS}/${id}?alert=${res}`)
        },
      })
    } else {
      router.replace(`${ROUTE.GATHERINGS}/${id}?alert=${"로그인이 필요합니다."}`)
    }
  }

  const onClickQuit = async () => {
    quitMutation.mutate()
  }

  const onClickShare = () => {
    navigator.clipboard.writeText(window.location.href)
    router.replace(`${ROUTE.GATHERINGS}/${id}?alert=클립보드에 복사됐습니다.&type=alert`, {
      scroll: false,
    })
  }

  useEffect(() => {
    const bottomResize = () => {
      if (!ref.current) return
      setHeight(ref.current.clientHeight)
    }
    bottomResize()
    window.addEventListener("resize", bottomResize)
    return () => {
      window.removeEventListener("resize", bottomResize)
    }
  }, [ref, setHeight])

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 w-full border-t-2 border-primary bg-white px-6 py-5 transition-all duration-300 lg:left-[220px] lg:w-[calc(100%-220px)]"
    >
      <div className="mx-auto flex items-center justify-between gap-2">
        <div className="break-keep">
          <p className="text-sm font-semibold text-gray-900 md:text-base">{renderFirstText()}</p>
          <p className="mt-1 text-xs font-medium text-gray-700">{renderSecondaryText()}</p>
        </div>
        <div className="grid flex-none grid-cols-2 gap-2 md:flex">
          {isHost && (
            <button
              type="button"
              onClick={onClickCancel}
              className="w-[80px] rounded-xl border border-red-500 bg-red-500 py-2 text-sm leading-6 text-white transition-colors hover:bg-red-600 md:w-[115px] md:py-[10px] md:text-base"
            >
              개설취소
            </button>
          )}
          {isJoined ? (
            <button
              type="button"
              onClick={onClickQuit}
              className="w-[80px] rounded-xl border border-primary bg-white py-2 text-sm leading-6 text-primary transition-colors hover:bg-gray-100 md:w-[115px] md:py-[10px] md:text-base"
            >
              취소하기
            </button>
          ) : (
            <button
              type="button"
              onClick={onClickJoin}
              className="w-[80px] rounded-xl border border-primary bg-primary py-2 text-sm leading-6 text-white transition-colors hover:bg-[#e68757] md:w-[115px] md:py-[10px] md:text-base"
            >
              참여하기
            </button>
          )}
          <button
            type="button"
            onClick={onClickShare}
            className="w-[80px] rounded-xl border border-[#60aaff] bg-[#60aaff] py-2 text-sm leading-6 text-white transition-colors hover:bg-[#5291d9] md:w-[115px] md:py-[10px] md:text-base"
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default BottomBanner
