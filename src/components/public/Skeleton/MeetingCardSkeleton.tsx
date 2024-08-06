import TYPE from "@/constants/skeleton"

const MeetingCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 md:flex">
      <div className={`h-[156px] w-full flex-none md:w-[280px] ${TYPE.normal}`} />
      <div className="flex flex-1 flex-col justify-between px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className={`h-3 w-40 lg:w-60 ${TYPE.full}`} />
            <div className={`mt-2 h-3 w-20 lg:w-28 ${TYPE.full}`} />
          </div>
          <div className={`size-12 ${TYPE.full}`} />
        </div>
        <div className={`mt-7 h-3 w-full md:mt-0 ${TYPE.full}`} />
      </div>
    </div>
  )
}

export default MeetingCardSkeleton
