import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { MouseEvent } from "react"

import checkLogin from "@/actions/Auths/checkLogin"
import joinGathering from "@/actions/Gatherings/joinGathering"
import DateTag from "@/components/pages/findMeeting/MeetingCard/Atoms/DateTag"
import ParticipantGage from "@/components/pages/findMeeting/MeetingCard/Atoms/ParticipantGage"
import WishBtn from "@/components/pages/wishlist/WishBtn"
import Spinner from "@/components/public/Spinner/Spinner"
import { IMeetingData, IMeetingListProps } from "@/types/findMeeting/findMeeting"
import { isCurrentDateAfter, msTransform } from "@/util/days"
import ArrowRightSVG from "@public/icon/staticIcon/arrow_right.svg"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

export const MeetingCard = ({ data }: { data: IMeetingData }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const mutation = useMutation({
    mutationFn: () => {
      return joinGathering(String(data.id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingList"] })
    },
  })

  const joinNow = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (await checkLogin()) {
      const res = await mutation.mutateAsync()
      router.replace(`${pathname}?alert=${res}&type=alert`, { scroll: false })
    } else {
      router.replace(`${pathname}?alert=${"로그인이 필요합니다."}`, { scroll: false })
    }
  }

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

          {msTransform(data.registrationEnd) > dayjs().unix() && (
            <div className="absolute right-0 top-0 inline-flex items-center rounded-bl-xl bg-primary px-[10px] py-[4px]">
              <Image src="/icon/staticIcon/clock.svg" alt="마감 임박" width={24} height={24} />
              <span className="text-xs text-white">{dayRender(data.registrationEnd)}</span>
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
          <WishBtn list={data} />
        </div>

        <div className="mt-7 flex items-end gap-6 md:mt-0">
          <div className="flex-1">
            <div className="flex items-center">
              <Image
                src="/icon/staticIcon/person.svg"
                alt="참가인원"
                width={16}
                height={16}
                className="mr-[2px]"
              />
              <span className="text-sm">{`${data.participantCount}/${data.capacity}`}</span>
              {Number(data.participantCount) >= 5 && (
                <>
                  <Image
                    src="/icon/staticIcon/confirmed.svg"
                    alt="개설확정"
                    width={24}
                    height={24}
                    className="ml-[11px] mr-[6px]"
                  />
                  <div className="text-sm text-primary">개설확정</div>
                </>
              )}
            </div>
            <div className="mt-2">
              <ParticipantGage now={data.participantCount} max={data.capacity} />
            </div>
          </div>
          <button type="button" onClick={joinNow} className="flex items-center gap-2">
            <span className="whitespace-nowrap font-semibold text-primary">join now</span>
            <ArrowRightSVG width={18} height={18} className="text-primary" />
          </button>
        </div>
      </div>
    </div>
  )
}

const MeetingList = ({ data, isLoading }: IMeetingListProps) => {
  return (
    <>
      {isLoading && (
        <div className="h-full w-full py-80">
          <Spinner />
        </div>
      )}
      {!isLoading &&
        (data?.pages.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center py-80">
            <span className="whitespace-nowrap text-sm text-gray-500">아직 모임이 없어요,</span>
            <span className="whitespace-nowrap text-sm text-gray-500">
              지금 바로 모임을 만들어보세요
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.pages.map((pages) => {
              return pages.map((meeting) => {
                return (
                  <Link className="relative" href={`/findMeeting/${meeting.id}`} key={meeting.id}>
                    {isCurrentDateAfter(meeting.registrationEnd) && (
                      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 rounded-3xl bg-black/80 text-center text-sm font-medium leading-5 text-white sm:flex-row">
                        마감된 챌린지에요, <br />
                        다음 기회에 만나요 🙏
                      </div>
                    )}
                    <MeetingCard key={meeting.id} data={meeting} />
                  </Link>
                )
              })
            })}
          </div>
        ))}
    </>
  )
}

export default MeetingList
