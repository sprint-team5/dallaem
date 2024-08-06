"use client"

import PostSigninFn from "@/actions/postSigninFn"
import setCookie from "@/actions/setCookies"
import { useMutation } from "@tanstack/react-query"

// 사용자 로그인
const usePostSignin = () => {
  return useMutation({
    mutationFn: PostSigninFn,
    onSuccess: (data) => {
      if (!data.ok) {
        throw new Error(data.message)
      }
      // 로그인 성공 시, token 저장
      setCookie(data.token)
    },
  })
}

export default usePostSignin
