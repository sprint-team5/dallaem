"use client"

import { useRouter } from "next/navigation"

const CancelButton = () => {
  const router = useRouter()

  const cancelHandler = () => {
    router.back()
  }

  return (
    <button
      className="border-primary text-primary w-1/2 rounded-lg border py-2.5 transition-all hover:border-[2px] hover:border-[#C2410C] hover:text-[#C2410C] active:border-[1px] active:border-[#9A3412] active:text-[#9A3412]"
      onClick={cancelHandler}
      type="button"
    >
      취소
    </button>
  )
}

export default CancelButton
