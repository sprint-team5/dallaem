"use client"

import PostSignupFn from "@/actions/postSignupFn"
import { useMutation } from "@tanstack/react-query"

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

export default usePostSignup
