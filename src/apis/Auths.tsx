"use Server"

import { GetUserDataFn, PostLogoutFn } from "@/actions/apis/Auths"
import { useMutation, useQuery } from "@tanstack/react-query"

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
    queryFn: () => {
      return GetUserDataFn(userToken)
    },
    enabled: !!userToken,
  })
}

// 사용자 로그아웃
const usePostLogout = () => {
  return useMutation({
    mutationFn: PostLogoutFn,
  })
}

export { useGetUserData, usePostLogout }
