"use client"

import PostSigninFn from "@/actions/Auths/postSigninFn"
import useUserToken from "@/hooks/useUserToken"
import { setCookie } from "@/util/cookies"
import { useMutation } from "@tanstack/react-query"

// 사용자 로그인
const usePostSignin = () => {
  const { updateUserToken } = useUserToken()

  return useMutation({
    mutationFn: PostSigninFn,
    onSuccess: async (data) => {
      if ("token" in data) {
        // LoginSuccess 케이스
        await setCookie(data.token)
        updateUserToken()
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
