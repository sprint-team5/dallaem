import Image from "next/image"

import Heart from "@/components/public/icon/dynamicIcon/Heart"
import { IReviewProps } from "@/types/review/review"
import dayjs from "dayjs"

/**
 * @interface IReviewProps
 * @param {number} score - 리뷰 점수 0 ~ 5
 * @param {boolean} isImage - true일 경우 상세정보 API에서 이미지를 추출해서 사용합니다.
 * @param {string} comment - 댓글 문구
 * @param {string} createdAt - 생성일 YYYY-MM-DDTHH:MM:SS
 * @param {{teamId: number, id: number, name: string, dateTime: string, location: string}} gathering 모임 객체
 * @param {{teamId: number,id: number,email: string,name: string}} IUser 유저 객체
 */
const Review = ({ score, comment, createdAt, gathering, user, isImage }: IReviewProps) => {
  return (
    <div className="flex flex-col gap-6 border-b-2 border-dashed border-gray-200 pb-6 sm:flex-row">
      {isImage && (
        <div className="relative h-[156px] w-full flex-none overflow-hidden rounded-3xl sm:w-[280px]">
          <Image
            className="object-cover object-center"
            src={gathering?.image}
            alt={`${gathering?.name} 모임 이미지`}
            fill
            sizes="(min-width : 640px) 280px"
            priority
          />
        </div>
      )}
      <div>
        <div className="flex gap-1">
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <div data-testid="scoreHeart" key={`score-${index + 1}`}>
                  <Heart state={index < score ? "active" : "default"} />
                </div>
              )
            })}
        </div>
        <h3 className="mt-[10px] break-keep text-sm font-medium leading-5">{comment}</h3>
        {gathering && (
          <p className="mt-[10px] text-xs font-medium leading-4 text-gray-700">
            {gathering.name} · {gathering.location}
          </p>
        )}

        <div className="mt-2 flex items-center text-xs font-medium leading-4">
          {user && (
            <div className="flex items-center gap-2">
              <Image
                src="/img/profile_small_default.png"
                width={24}
                height={24}
                alt="유저 이미지"
              />
              <p className="text-gray-700 after:ml-2 after:pr-3 after:content-['|']">{user.name}</p>
            </div>
          )}
          <p className="text-gray-500">{dayjs(createdAt).format("YYYY.MM.DD")}</p>
        </div>
      </div>
    </div>
  )
}

export default Review
