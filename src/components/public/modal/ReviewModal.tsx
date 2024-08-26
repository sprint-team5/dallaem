"use client"

import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"

import { ChangeEvent, useEffect, useState } from "react"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

import addReview from "@/actions/Reviews/addReview"
import { IReviewModalProp, IUserData } from "@/types/mypage/mypage"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import CloseBtn from "../CloseBtn"
import ReviewHeartBtn from "../Review/ReviewHeartBtn/ReviewHeartBtn"

const initialValue = {
  score: 0,
  comment: "남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.",
}

const ANIMATION_DELAY = 100

const ReviewModal = ({ gatheringId }: IReviewModalProp) => {
  const { register, handleSubmit } = useForm<IUserData>()
  const [userInput, setUserInput] = useState(initialValue)
  const [errorMsg, setErrorMsg] = useState("")
  const [animationClassName, setAnimationClassName] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const addReviewMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] })
      revalidatePath("/mypage")
    },
  })

  const submitHandler: SubmitHandler<IUserData> = async (data) => {
    const userReview = {
      gatheringId,
      score: userInput.score,
      comment: data.comment,
    }

    addReviewMutation.mutate(userReview)
    router.back()
  }

  const errorHandler: SubmitErrorHandler<IUserData> = (error) => {
    if (error && error.comment) {
      const errorMessage = error.comment.message as string
      setErrorMsg(errorMessage)
    }
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

  useEffect(() => {
    const timer = setTimeout(() => {
      return setAnimationClassName(true)
    }, ANIMATION_DELAY)

    return () => {
      return clearTimeout(timer)
    }
  }, [])

  const disabled = addReviewMutation.isPending || errorMsg ? true : undefined

  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-gray-950/50">
      <form
        onSubmit={handleSubmit(submitHandler, errorHandler)}
        className={`absolute left-0 right-0 top-48 z-50 mx-auto w-modal-md rounded-md bg-white p-6 shadow-xl lg:w-modal-lg ${animationClassName ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="mb-2 flex justify-between">
          <h3 className="text-lg font-semibold">리뷰쓰기</h3>
          <CloseBtn />
        </div>
        <ReviewHeartBtn value={userInput.score} setter={heartChangeHandler} />
        <div className="relative pb-6">
          <p className="mb-1 mt-2 font-semibold">
            경험에 대해 남겨주세요.<span className="ml-1 text-xs text-blue-500">(5자 이상)</span>
          </p>
          <textarea
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("comment", {
              required: true,
              minLength: {
                value: 5,
                message: "5자 이상 입력하셔야 합니다.",
              },
              maxLength: {
                value: 200,
                message: "200자까지 입력하실 수 있습니다.",
              },
              onChange: inputChangeHandler,
            })}
            rows={5}
            className="w-full resize-none rounded-xl bg-gray-50 px-4 py-2.5"
            placeholder={userInput.comment}
          />
          {errorMsg && <p className="absolute bottom-1 text-red-500">{errorMsg}</p>}
        </div>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="w-1/2 rounded-xl border border-primary py-2.5 text-primary hover:border-primary/65 hover:text-primary/60 active:border-orange-700 active:text-orange-700"
            onClick={() => {
              return router.back()
            }}
          >
            취소
          </button>
          <button
            disabled={disabled}
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
