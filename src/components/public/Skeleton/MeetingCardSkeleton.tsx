const MeetingCardSkeleton = () => {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-gray-200 first:mt-0 md:flex">
      <div className="skeleton-normal h-[156px] w-full flex-none md:w-[280px]" />
      <div className="flex flex-1 flex-col justify-between px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="skeleton-full h-3 w-40 lg:w-60" />
            <div className="skeleton-full mt-2 h-3 w-20 lg:w-28" />
          </div>
          <div className="skeleton-full size-12" />
        </div>
        <div className="skeleton-full mt-7 h-3 w-full md:mt-0" />
      </div>
    </div>
  )
}

export default MeetingCardSkeleton
