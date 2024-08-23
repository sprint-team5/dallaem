"use client"

import generateGathering from "@/actions/Gatherings/generateGathering"
import { IGatheringData } from "@/types/findMeeting/findMeeting"
import { useMutation } from "@tanstack/react-query"

const useCreateGathering = () => {
  return useMutation<IGatheringData, Error, FormData>({
    mutationFn: (formData: FormData) => {
      return generateGathering(formData)
    },
    onSuccess: (data) => {
      if (!data) {
        throw new Error("모임 생성에 실패했습니다.")
      }
      return data
    },
  })
}

export default useCreateGathering
