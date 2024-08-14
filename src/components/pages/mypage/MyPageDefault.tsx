import ReviewStateButton from "./ReviewStateButton"

interface IMyPageDefaultProp {
  dataFetchingKey: string
  hasReview: boolean | undefined
  onClick: (value: boolean) => void
}

const getDefaultText = (key: string, review: boolean | undefined): string => {
  if (key === "myMeeting") return "신청한 모임이"
  if (key === "myOwnMeeting") return "만든 모임이"
  if (key === "myReview" && !!review) return "작성한 리뷰가"
  return "작성 가능한 리뷰가"
}

const MyPageDefault = ({ dataFetchingKey, hasReview, onClick }: IMyPageDefaultProp) => {
  const isMyReview = dataFetchingKey === "myReview"
  return (
    <>
      {isMyReview && <ReviewStateButton onClick={onClick} hasReview={hasReview} />}
      <p className="mb-72 mt-48 text-center text-sm font-medium leading-5 text-gray-500">
        {`아직  ${getDefaultText(dataFetchingKey, hasReview)} 없어요`}
      </p>
    </>
  )
}

export default MyPageDefault
