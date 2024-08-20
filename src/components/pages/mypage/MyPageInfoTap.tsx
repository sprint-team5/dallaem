"use client"

import { useReducer } from "react"

import { IAction, IInitialState } from "@/app/(MyPage)/mypage/mypage"

import MyPageInfoTapButton from "./MyPageInfoTapButton"
import MyPageInfoWrapper from "./MyPageInfoWrapper"

const initialState = {
  myMeeting: true,
  myReview: false,
  myOwnMeeting: false,
}

const reducer = (state: IInitialState, action: IAction) => {
  switch (action.type) {
    case "myMeeting":
      return {
        ...state,
        myMeeting: true,
        myReview: false,
        myOwnMeeting: false,
      }
    case "myReview":
      if (action.isReviewed) {
        return {
          ...state,
          myMeeting: false,
          myReview: true,
          myOwnMeeting: false,
          isReviewed: action.isReviewed,
        }
      }
      return {
        ...state,
        myMeeting: false,
        myReview: true,
        myOwnMeeting: false,
      }
    case "myOwnMeeting":
      return {
        ...state,
        myMeeting: false,
        myReview: false,
        myOwnMeeting: true,
      }
    default:
      return state
  }
}

const animatedBottomClassName = (state: string) => {
  switch (state) {
    case "myMeeting":
      return "w-[66px] -translate-x-[1px] md:w-[74px]"
    case "myReview":
      return "w-[54px] translate-x-[76px] md:w-[62px] md:translate-x-[85px]"
    case "myOwnMeeting":
      return "w-[82px] translate-x-[140px] md:w-[94px] md:translate-x-[155px]"
    default:
      return "w-[66px] -translate-x-[1px] md:w-[74px]"
  }
}

const MyPageInfoTap = () => {
  const [tapState, dispatch] = useReducer(reducer, initialState)
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
