"use client"

import getUserTokenFromCookieFn from "@/actions/Auths/getUserTokenFromCookieFn"
import { useQuery, useQueryClient } from "@tanstack/react-query"

function useUserToken(initialToken?: string) {
  const queryClient = useQueryClient()

  const { data: userToken } = useQuery({
    queryKey: ["userToken"],
    queryFn: getUserTokenFromCookieFn,
    initialData: initialToken,
  })

  const updateUserToken = () => {
    queryClient.invalidateQueries({ queryKey: ["userToken"] })
  }

  return { userToken, updateUserToken }
}

export default useUserToken
