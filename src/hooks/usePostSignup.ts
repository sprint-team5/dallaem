"use client"

import PostSignupFn from "@/actions/Auths/postSignupFn"
import { useMutation } from "@tanstack/react-query"

const usePostSignup = () => {
  return useMutation({
    mutationFn: PostSignupFn,
    onSuccess: (data) => {
      // 성공적인 응답 처리
      if (data && "code" in data) {
        // 에러 응답이 온 경우
        return Promise.reject(data)
      }
      return data
    },
    onError: (error) => {
      if (error && "code" in error) {
        throw new Error(error.message)
      }
      throw error
    },
  })
}

export default usePostSignup
