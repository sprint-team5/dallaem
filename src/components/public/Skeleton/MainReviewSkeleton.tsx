import React from "react"

const MainReviewSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-300 px-6 py-7 lg:py-9">
      <div className="flex items-center gap-2">
        <div className="skeleton-normal relative size-8 overflow-hidden" />
        <div className="skeleton-normal h-3 w-10" />
      </div>
      <div className="skeleton-full mt-2 flex gap-1" />
      <div className="skeleton-full mt-[10px] h-3" />
      <div className="skeleton-full mt-[10px] h-3" />
      <div className="skeleton-full mt-2 h-3" />
    </div>
  )
}

export default MainReviewSkeleton
