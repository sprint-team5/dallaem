"use client"

import GetUserDataFn from "@/actions/Auths/getUserDataFn"
import { useQuery } from "@tanstack/react-query"

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
    queryKey: ["userData", userToken],
    queryFn: async () => {
      const data = await GetUserDataFn(userToken)
      if (!data.ok) {
        throw new Error(data.message || "사용자 정보를 가져오는데 실패했습니다.")
      }
      return data
    },
    // userToken이 업데이트되면 자동으로 재요청함
    enabled: !!userToken,
  })
}

export default useGetUserData
