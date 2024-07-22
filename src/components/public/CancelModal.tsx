import { ReactNode } from "react"

import CloseIcon from "@/public/icon/closeIcon.svg"

interface ICancelModalProps {
  children: ReactNode
  isOneBtn: boolean
}

const CancelModal = ({ children, isOneBtn = true }: ICancelModalProps) => {
  return (
    <div className="w-cancel mx-auto flex flex-col items-center justify-around rounded-lg p-6 shadow-md">
      <CloseIcon fill="true" className="self-end" />
      <div className="mb-10 mt-6">
        <p>{children}</p>
      </div>
      <div className={`flex gap-3 self-stretch ${isOneBtn ? "justify-end" : "justify-center"}`}>
        {!isOneBtn && (
          <button
            type="button"
            className="w-1/3 rounded-xl border-2 border-orange-600 py-2.5 text-orange-600 hover:border-orange-500 hover:text-orange-500"
          >
            취소
          </button>
        )}
        <button
          type="button"
          className="w-1/3 rounded-xl bg-orange-600 py-2.5 text-white hover:bg-orange-700"
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default CancelModal
