"use client"

import { IMyPageInfoTapButton } from "@/types/mypage/mypage"

const text = {
  myMeeting: "참여한 모임",
  myReview: "나의 리뷰",
  myOwnMeeting: "내가 만든 모임",
}

const MyPageInfoTapButton = ({ isActive, state, onClick }: IMyPageInfoTapButton) => {
  const clickHandler = () => {
    onClick({ type: state })
  }

  return (
    <button
      onClick={clickHandler}
      type="button"
      className={`pb-2 text-sm font-semibold text-gray-400 transition-all md:text-base ${isActive ? "text-gray-900" : "text-gray-400"} whitespace-nowrap`}
    >
      {text[state]}
    </button>
  )
}

export default MyPageInfoTapButton
