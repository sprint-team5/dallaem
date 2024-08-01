"use client"

interface ICardCancelProps {
  handlerCancel?: () => void
}

const CardCancel = ({ handlerCancel }: ICardCancelProps) => {
  return (
    <button
      className="h-10 w-[120px] rounded-xl border border-orange-600 text-sm font-semibold leading-5 text-orange-600 transition-colors hover:bg-orange-600 hover:text-white"
      type="button"
      onClick={handlerCancel}
    >
      예약 취소하기
    </button>
  )
}

export default CardCancel
