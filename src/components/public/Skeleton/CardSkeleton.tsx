const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="skeleton-normal h-[156px] w-full flex-none rounded-3xl sm:w-[280px]" />
      <div className="flex-1">
        <div className="skeleton-full h-6 w-32" />
        <div className="skeleton-full mt-3 h-3 w-60" />
        <div className="skeleton-full mt-[6px] h-3 w-40" />
        <div className="skeleton-full mt-[18px] h-6 w-[120px]" />
      </div>
    </div>
  )
}

export default CardSkeleton
