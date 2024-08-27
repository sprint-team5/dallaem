import { useEffect, useState } from "react"

import { IRatingBar } from "@/types/review/review"

const RatingBar = ({ rating, count, maxScore }: IRatingBar) => {
  const [width, setWidth] = useState("0%")

  useEffect(() => {
    setWidth(`${(count / maxScore) * 100}%`)
  }, [count, maxScore])

  return (
    <div
      data-cy="ratingbar"
      className="mt-1 flex items-center gap-3 text-sm font-medium leading-5 first:mt-0"
    >
      <p className="w-[21px] flex-none">{rating}점</p>
      <div className="relative h-1 w-[84px] overflow-hidden rounded-full bg-gray-200 sm:w-[240px]">
        <div
          style={{ width }}
          className="absolute left-0 top-0 h-full rounded-full bg-[#111827] transition-all delay-100 duration-500"
        />
      </div>
      <p className="flex-none text-gray-400">{count}</p>
    </div>
  )
}

export default RatingBar
