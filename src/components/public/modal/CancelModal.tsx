import { ReactNode } from "react"

import CloseBtn from "../CloseBtn"

interface ICancelModalProps {
  children: ReactNode
  isOneBtn: boolean
}

const CancelModal = ({ children, isOneBtn = true }: ICancelModalProps) => {
  return (
    <div className="mx-auto flex w-cancel flex-col items-center justify-around rounded-lg p-6 shadow-md">
      <div className="self-end">
        <CloseBtn />
      </div>
      <div className="mb-10 mt-6">
        <p>{children}</p>
      </div>
      <div className={`flex gap-3 self-stretch ${isOneBtn ? "justify-end" : "justify-center"}`}>
        {!isOneBtn && (
          <button
            type="button"
            className="border-primary text-primary hover:border-primary/60 hover:text-primary/60 w-1/3 rounded-xl border-2 py-2.5"
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
