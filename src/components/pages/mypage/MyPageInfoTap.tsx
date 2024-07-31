"use client"

import { useReducer } from "react"

import MyPageInfoTapButton from "./MyPageInfoTapButton"

interface IInitialState {
  myMeeting: boolean
  myReview: boolean
  myOwnMeeting: boolean
}

interface IAction {
  type: string
}

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

const MyPageInfoTap = () => {
  const [tapState, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="mx-auto mt-[29px] w-profile-sm border-t-2 border-gray-900 bg-white p-6 md:w-profile-md lg:w-profile-lg">
      <div className="flex gap-3">
        <MyPageInfoTapButton onClick={dispatch} state="myMeeting" isActive={tapState.myMeeting} />
        <MyPageInfoTapButton onClick={dispatch} state="myReview" isActive={tapState.myReview} />
        <MyPageInfoTapButton
          onClick={dispatch}
          state="myOwnMeeting"
          isActive={tapState.myOwnMeeting}
        />
      </div>
    </div>
  )
}

export default MyPageInfoTap
