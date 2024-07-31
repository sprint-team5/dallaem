"use client"

import generateMeetUp from "@/actions/generateMeetUp"

import CloseBtn from "../CloseBtn"

const GenerateMeetUpModal = () => {
  return (
    <form action={generateMeetUp} className="mx-auto w-modal-lg rounded-xl p-6 shadow-md">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">모임만들기</h3>
        <CloseBtn />
      </div>
      {/* fixme 내용 추가 부탁드립니다. */}
      <div className="mt-10">
        <button
          className="w-full rounded-xl bg-gray-400 py-2.5 text-white hover:bg-gray-600 active:bg-gray-800"
          type="submit"
        >
          확인
        </button>
      </div>
    </form>
  )
}

export default GenerateMeetUpModal
