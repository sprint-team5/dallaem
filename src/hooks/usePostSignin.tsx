"use client"

import PostSigninFn from "@/actions/postSigninFn"
import setCookie from "@/actions/setCookies"
import { useMutation } from "@tanstack/react-query"

// 사용자 로그인
const usePostSignin = () => {
  return useMutation({
    mutationFn: PostSigninFn,
    onSuccess: (data) => {
      if ("token" in data) {
        // LoginSuccess 케이스
        setCookie(data.token)
        return data
      }
      // response에 토큰이 없는 경우, 에러로 처리
      return Promise.reject(new Error(data.message || "로그인 실패"))
    },
    onError: (error) => {
      if ("code" in error) {
        throw new Error(error.message)
      }
      throw error
    },
  })
}

export default usePostSignin
