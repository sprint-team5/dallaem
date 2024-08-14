const ReviewSkeleton = ({ imageHidden }: { imageHidden?: boolean }) => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {!imageHidden && (
        <div className="skeleton-normal h-[156px] w-full rounded-3xl sm:w-[280px]" />
      )}
      <div className="flex-1 border-b border-dotted pb-6">
        <div className="skeleton-full h-3 w-32" />
        <div className="skeleton-full mt-[10px] h-3 w-full" />
        <div className="skeleton-full mt-[10px] h-3 w-52" />
      </div>
    </div>
  )
}

export default ReviewSkeleton
