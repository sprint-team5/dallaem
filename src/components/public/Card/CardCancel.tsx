"use client"

interface ICardCancelProps {
  hanlderCancel: () => void
}

const CardCancel = ({ hanlderCancel }: ICardCancelProps) => {
  return (
    <button
      className="mt-[18px] h-10 w-[120px] rounded-xl border border-orange-600 text-sm font-semibold leading-5 text-orange-600 transition-colors hover:bg-orange-600 hover:text-white"
      type="button"
      onClick={hanlderCancel}
    >
      예약 취소하기
    </button>
  )
}

export default CardCancel
