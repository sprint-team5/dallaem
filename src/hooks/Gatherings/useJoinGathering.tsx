import joinGathering from "@/actions/Gatherings/joinGathering"
import { useMutation } from "@tanstack/react-query"

const useJoinGathering = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return joinGathering(id)
    },
    onSuccess: (data) => {
      if (!data) {
        throw new Error("모임 가입에 실패했습니다.")
      }
      return data
    },
  })
}

export default useJoinGathering
