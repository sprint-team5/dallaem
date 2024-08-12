"use client"

import { useRouter } from "next/navigation"

import cancelMeeting from "@/actions/cancelMeeting"
import checkLogin from "@/actions/checkLogin"
import quitMeeting from "@/actions/quitMeeting"
import Button from "@/components/public/button/Button"
import ROUTE from "@/constants/route"
import useJoinGathering from "@/hooks/Gatherings/useJoinGathering"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const floatingBarStyles = {
  container: {
    default:
      "fixed bottom-0 flex items-center justify-center w-full border-t-2 border-[#111827] bg-white",
    mobile: "h-[136px] px-4 py-5",
    tablet: "md:h-[86px] md:px-6",
    desktop: "2xl:px-[380px]",
  },
  wrapper: {
    default: {
      true: "flex h-full w-full flex-col items-center justify-between gap-[10px]",
      false: "flex h-full w-full flex-row items-center justify-between gap-[10px]",
    },
    mobile: "",
    tablet: "md:flex-row md:gap-[164px]",
    desktop: "",
  },
}

const containerStyles = `${floatingBarStyles.container.default} ${floatingBarStyles.container.mobile} ${floatingBarStyles.container.tablet} ${floatingBarStyles.container.desktop}`

interface IBannerProps {
  id: string
  isHost: boolean
  isJoined: boolean
  limit: number
  participant: number
}

const BottomBanner = ({ id, isHost, isJoined, limit, participant }: IBannerProps) => {
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

  const wrapperStyles = `${isHost ? floatingBarStyles.wrapper.default.true : floatingBarStyles.wrapper.default.false} ${floatingBarStyles.wrapper.mobile} ${floatingBarStyles.wrapper.tablet} ${floatingBarStyles.wrapper.desktop}`

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
    if (await checkLogin())
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
  }

  const onClickQuit = async () => {
    quitMutation.mutate()
  }
  const onClickShare = () => {
    navigator.clipboard.writeText(window.location.href)
    router.push(`${ROUTE.GATHERINGS}/${id}?alert=클립보드에 복사됐습니다.`)
  }

  return (
    <>
      <div className="w-full border-t-2 border-[#111827]" />
      <div className={containerStyles}>
        <div className={wrapperStyles}>
          <div className="h-11 w-full whitespace-nowrap">
            <span className="font-semibold text-[#111827]">{renderFirstText()}</span>
            <br />
            <span className="text-xs font-medium text-[#374151]">{renderSecondaryText()}</span>
          </div>
          <div className="flex gap-2">
            {isHost && (
              <Button className="bg-red-500" borderStyle="solid" onClick={onClickCancel}>
                개설취소
              </Button>
            )}
            {isJoined ? (
              <>
                <Button className="" borderStyle="outlined" onClick={onClickQuit}>
                  취소하기
                </Button>
                <Button className="" borderStyle="solid" onClick={onClickShare}>
                  공유하기
                </Button>
              </>
            ) : (
              <Button className="" borderStyle="solid" onClick={onClickJoin}>
                참여하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomBanner
