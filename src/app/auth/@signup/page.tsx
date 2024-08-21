"use server"

import SignupForm from "@/components/pages/auth/@signup/SignupForm"
import { HydrationBoundary } from "@tanstack/react-query"

const SignupPage = () => {
  return (
    <HydrationBoundary>
      <SignupForm />
    </HydrationBoundary>
  )
}

export default SignupPage
