import { ReactNode } from "react"

import Toast from "@/components/public/Toast"

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  )
}

export default ToastProvider
