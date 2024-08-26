"use client"

import useTapHook from "@/hooks/mypage/useTapHook"

import MyPageInfoTapButton from "./MyPageInfoTapButton"
import MyPageInfoWrapper from "./MyPageInfoWrapper"

const animatedBottomClassName = (state: string) => {
  const myMeetingClass = "w-[66px] -translate-x-[1px] md:w-[74px]"
  const myReviewClass = "w-[54px] translate-x-[76px] md:w-[62px] md:translate-x-[85px]"
  const myOwnMeetingClass = "w-[82px] translate-x-[140px] md:w-[94px] md:translate-x-[155px]"

  switch (state) {
    case "myMeeting":
      return myMeetingClass
    case "myReview":
      return myReviewClass
    case "myOwnMeeting":
      return myOwnMeetingClass
    default:
      return myMeetingClass
  }
}

const MyPageInfoTap = () => {
  const { tapState, dispatch } = useTapHook()
  const [[dataFetchingKey]] = Object.entries(tapState).filter((state) => {
    return state[1] === true && state[0] !== "isReviewed"
  })

  return (
    <section className="mx-auto mt-6 w-full grow border-t-2 border-primary bg-white p-6">
      <div className="relative mb-6 flex gap-3">
        <MyPageInfoTapButton onClick={dispatch} state="myMeeting" isActive={tapState.myMeeting} />
        <MyPageInfoTapButton onClick={dispatch} state="myReview" isActive={tapState.myReview} />
        <MyPageInfoTapButton
          onClick={dispatch}
          state="myOwnMeeting"
          isActive={tapState.myOwnMeeting}
        />
        <div
          className={`absolute bottom-0 h-[1.5px] bg-gray-900 transition-transform ${animatedBottomClassName(dataFetchingKey)}`}
        />
      </div>
      <MyPageInfoWrapper
        onClick={dispatch}
        dataFetchingKey={dataFetchingKey}
        isReviewed={tapState.isReviewed ?? undefined}
      />
    </section>
  )
}

export default MyPageInfoTap
