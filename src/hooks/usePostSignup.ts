"use client"

import PostSignupFn from "@/actions/postSignupFn"
import { useMutation } from "@tanstack/react-query"

const usePostSignup = () => {
  return useMutation({
    mutationFn: PostSignupFn,
    onSuccess: (data) => {
      if ("code" in data) {
        switch (data.code) {
          case "EMAIL_EXISTS":
            // 이메일 중복 에러
            throw new Error(data.message)
          case "VALIDATION_ERROR":
            // 비밀번호 중복 에러
            throw new Error(data.message)
          default:
        }
      }
    },
  })
}

export default usePostSignup
