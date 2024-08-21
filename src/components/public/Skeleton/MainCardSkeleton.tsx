import React from "react"

const MainCardSkeleton = () => {
  return (
    <div className="flex-1 overflow-hidden rounded-2xl border">
      <div className="skeleton-normal relative w-full after:block after:pb-[calc(265/463*100%)]" />
      <div className="p-4 px-5">
        <div className="flex items-center gap-2">
          <div className="skeleton-full h-3 w-10" />
          <span className="skeleton-full h-3 w-10" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="skeleton-full h-3 w-20" />
          <div className="skeleton-full h-3 w-20" />
        </div>
        <div className="mt-5 flex gap-[11px]">
          <div className="flex items-center">
            <div className="skeleton-full size-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCardSkeleton
