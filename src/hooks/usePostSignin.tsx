"use client"

import PostSigninFn from "@/actions/postSigninFn"
import setCookie from "@/actions/setCookies"
import { useMutation } from "@tanstack/react-query"

// 사용자 로그인
const usePostSignin = () => {
  return useMutation({
    mutationFn: PostSigninFn,
    onSuccess: (data) => {
      if ("code" in data) {
        switch (data.code) {
          case "VALIDATION_ERROR":
            // 이메일 유효성 검사 에러
            throw new Error(data.message)
          case "INVALID_CREDENTIALS":
            // 비밀번호 유효성 검사 에러
            throw new Error(data.message)
          default:
        }
      }

      if ("token" in data) {
        // 로그인 성공 시 쿠키에 토큰값 저장
        setCookie(data.token)
        return data
      }

      return undefined
    },
  })
}

export default usePostSignin
