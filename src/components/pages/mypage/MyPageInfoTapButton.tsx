interface IHandlerArg {
  type: string
}

interface IMyPageInfoTapButton {
  isActive: boolean
  state: "myMeeting" | "myReview" | "myOwnMeeting"
  onClick: ({ type }: IHandlerArg) => void
}

const text = {
  myMeeting: "나의 모임",
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
      className={`text-lg font-semibold text-gray-400 ${isActive ? "text-gray-900" : "text-gray-400"}`}
    >
      {text[state]}
    </button>
  )
}

export default MyPageInfoTapButton