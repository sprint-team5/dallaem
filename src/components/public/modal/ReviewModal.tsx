"use client"

import { useRouter } from "next/navigation"

import { ChangeEvent, useState } from "react"

import addReview from "@/actions/addReview"
import Scores from "@/components/pages/allReview/Scores"

import CloseBtn from "../CloseBtn"
import ReviewHeartBtn from "../Review/ReviewHeartBtn/ReviewHeartBtn"

interface IReviewModalProp {
  gatheringId: string
}

const initialValue = {
  score: 0,
  comment: "남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.",
}

const ReviewModal = ({ gatheringId }: IReviewModalProp) => {
  const [userInput, setUserInput] = useState(initialValue)
  const router = useRouter()
  const handleSubmit = async (data) => {
    console.log(data)
    // const res = await addReview()
    // if (res === 200) {
    //   router.back()
    // }
  }

  const heartChangeHandler = (userClick: number) => {
    setUserInput((prev) => {
      return {
        ...prev,
        score: userClick,
      }
    })
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const userComment = e.target.value
    setUserInput((prev) => {
      return {
        ...prev,
        comment: userComment,
      }
    })
  }

  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-gray-950/50">
      <form
        action={handleSubmit}
        className="absolute left-0 right-0 top-36 z-50 mx-auto w-modal-md rounded-md bg-white p-6 shadow-xl lg:w-modal-lg"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">리뷰쓰기</h3>
          <CloseBtn />
        </div>
        <ReviewHeartBtn value={userInput.score} setter={heartChangeHandler} />
        <div>
          <p className="mb-3 font-semibold">경험에 대해 남겨주세요.</p>
          <textarea
            name="review"
            rows={5}
            className="w-full resize-none rounded-xl bg-gray-50 px-4 py-2.5"
            placeholder={userInput.comment}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="active: w-1/2 rounded-xl border border-orange-600 py-2.5 text-orange-600 hover:border-orange-500 hover:text-orange-500 active:border-orange-700 active:text-orange-700"
          >
            취소
          </button>
          <button
            type="submit"
            className="w-1/2 rounded-xl bg-gray-400 py-2.5 text-white hover:bg-gray-500 active:bg-gray-600"
          >
            리뷰 등록
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewModal
