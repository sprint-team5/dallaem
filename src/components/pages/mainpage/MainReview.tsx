"use client"

import Image from "next/image"

import Heart from "@/components/public/icon/dynamicIcon/Heart"
import { useAllReview } from "@/hooks/Review/useAllReview"
import dayjs from "dayjs"

const MainReview = () => {
  const { data } = useAllReview({
    sortOrder: "asc",
  })

  return (
    <>
      {data.map((reviews) => {
        return reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="rounded-[20px] border border-primary/60 px-6 py-7 lg:py-9"
            >
              <div className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden rounded-full border">
                  <Image
                    src={review.User.image || "/img/profile_small_default.png"}
                    alt="유저 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700 after:ml-2">{review.User.name}</p>
              </div>
              <div className="mt-2 flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <div data-testid="scoreHeart" key={`score-${index + 1}`}>
                        <Heart state={index < review.score ? "active" : "default"} />
                      </div>
                    )
                  })}
              </div>
              <h3 className="mt-[10px] break-keep text-sm font-medium leading-5">
                {review.comment}
              </h3>
              <p className="mt-[10px] text-xs font-medium leading-4 text-gray-700">
                {review.Gathering.name} · {review.Gathering.location}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                {dayjs(review.createdAt).format("YYYY.MM.DD")}
              </p>
            </div>
          )
        })
      })}
    </>
  )
}

export default MainReview
