"use client"

import generateMeetUp from "@/actions/generateMeetUp"
import { useMutation } from "@tanstack/react-query"

interface IMeetingData {
  id: string
  location: string
  type: string
  name: string
  date: string
  time: string
  capacity: number
  image: {
    file: File | null
    name: string
  }
  registrationEnd: string
}

const useCreateGathering = () => {
  return useMutation<IMeetingData, Error, FormData>({
    mutationFn: (formData: FormData) => {
      return generateMeetUp(formData)
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
