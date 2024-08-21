"use server"

import SigninForm from "@/components/pages/auth/@signin/SigninForm"
import { HydrationBoundary } from "@tanstack/react-query"

const SigninPage = () => {
  return (
    <HydrationBoundary>
      <SigninForm />
    </HydrationBoundary>
  )
}

export default SigninPage
