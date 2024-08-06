import TYPE from "@/constants/skeleton"

const ReviewSkeleton = ({ imageHidden }: { imageHidden?: boolean }) => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {!imageHidden && (
        <div className={`h-[156px] w-full rounded-3xl sm:w-[280px] ${TYPE.normal}`} />
      )}
      <div className="flex-1 border-b border-dotted pb-6">
        <div className={`h-3 w-32 ${TYPE.full}`} />
        <div className={`mt-[10px] h-3 w-full ${TYPE.full}`} />
        <div className={`mt-[10px] h-3 w-52 ${TYPE.full}`} />
      </div>
    </div>
  )
}

export default ReviewSkeleton
