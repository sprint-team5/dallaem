"use Server"

import {
  GetUserDataFn,
  PostLogoutFn,
  PostSigninFn,
  PostSignupFn,
} from "@/actions/api-actions/Auths"
import setCookie from "@/actions/setCookies"
import { useMutation, useQuery } from "@tanstack/react-query"

// 사용자 회원가입
const usePostSignup = () => {
  return useMutation({
    mutationFn: PostSignupFn,
    onSuccess: (data) => {
      if (!data.ok) {
        throw new Error(data.message)
      }
    },
  })
}

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

// 회원 정보 확인
interface UserDataResponse {
  teamId: string
  id: number
  email: string
  name: string
  companyName: string
  image: string
  createdAt: string
  updatedAt: string
}

const useGetUserData = (userToken: string | undefined) => {
  return useQuery<UserDataResponse>({
    queryKey: ["profile", userToken],
    queryFn: async () => {
      const data = await GetUserDataFn(userToken)
      if (!data.ok) {
        throw new Error(data.message || "사용자 정보를 가져오는데 실패했습니다.")
      }
      return data
    },
    enabled: !!userToken,
  })
}

// 사용자 로그아웃
const usePostLogout = () => {
  return useMutation({
    mutationFn: PostLogoutFn,
    onSuccess: (data) => {
      if (!data.ok) {
        throw new Error(data.message)
      }
    },
  })
}

export { usePostSignup, usePostSignin, useGetUserData, usePostLogout }
