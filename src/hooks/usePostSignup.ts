"use client"

import PostSignupFn, { SignupResponse } from "@/actions/postSignupFn"
import { useMutation } from "@tanstack/react-query"

const usePostSignup = () => {
  return useMutation({
    mutationFn: PostSignupFn,
    onSuccess: (data) => {
      // 성공적인 응답 처리
      if ("code" in data) {
        // 에러 응답이 온 경우
        return Promise.reject(data)
      }
      return data
    },
    onError: (error: SignupResponse) => {
      if ("code" in error) {
        switch (error.code) {
          case "EMAIL_EXISTS":
            throw new Error(error.message)
          case "VALIDATION_ERROR":
            throw new Error(error.message)
          default:
        }
      }
    },
  })
}

export default usePostSignup
