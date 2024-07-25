"use client"

interface ICardReviewProps {
  handlerReview?: () => void
}

const CardReview = ({ handlerReview }: ICardReviewProps) => {
  return (
    <button
      className="mt-[18px] h-10 w-[120px] rounded-xl border border-orange-600 bg-orange-600 text-sm font-semibold leading-5 text-white transition-colors hover:bg-white hover:text-orange-600"
      type="button"
      onClick={handlerReview}
    >
      리뷰 작성하기
    </button>
  )
}

export default CardReview
