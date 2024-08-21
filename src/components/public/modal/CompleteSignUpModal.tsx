import { ICompleteSignUpModalProps } from "@/types/findMeeting/findMeeting"

import CloseBtn from "../CloseBtn"

const CompleteSignUpModal = ({ children, isOneBtn, onConfirmClick }: ICompleteSignUpModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-gray-950/50">
      <div className="mx-auto flex w-signUp flex-col items-center justify-around rounded-lg bg-white p-6 shadow-md">
        <div className="self-end">
          <CloseBtn />
        </div>
        <div className="mb-10 mt-6">
          <p>{children}</p>
        </div>
        <div className="flex justify-center gap-3 self-stretch">
          {!isOneBtn && (
            <button
              type="button"
              className="w-1/2 rounded-xl border-2 border-orange-600 py-2.5 text-orange-600 hover:border-orange-500 hover:text-orange-500"
            >
              취소
            </button>
          )}
          <button
            type="button"
            className="w-1/2 rounded-xl bg-orange-600 py-2.5 text-white hover:bg-orange-700"
            onClick={onConfirmClick}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompleteSignUpModal
