import TYPE from "@/constants/skeleton"

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className={`h-[156px] w-full flex-none rounded-3xl sm:w-[280px] ${TYPE.normal}`} />
      <div className="flex-1">
        <div className={`h-6 w-32 ${TYPE.full}`} />
        <div className={`mt-3 h-3 w-60 ${TYPE.full}`} />
        <div className={`mt-[6px] h-3 w-40 ${TYPE.full}`} />
        <div className={`mt-[18px] h-6 w-[120px] ${TYPE.full}`} />
      </div>
    </div>
  )
}

export default CardSkeleton
