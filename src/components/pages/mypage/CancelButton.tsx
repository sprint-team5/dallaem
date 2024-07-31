"use client"

import { useRouter } from "next/navigation"

const CancelButton = () => {
  const router = useRouter()

  const cancelHandler = () => {
    router.back()
  }

  return (
    <button
      className="w-1/2 rounded-lg border border-orange-600 py-2.5 text-orange-600 hover:border-[1px] hover:border-[#C2410C] hover:text-[#C2410C] active:border-[1px] active:border-[#9A3412] active:text-[#9A3412]"
      onClick={cancelHandler}
      type="button"
    >
      취소
    </button>
  )
}

export default CancelButton
