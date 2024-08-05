import { HydrationBoundary } from "@tanstack/react-query"

import SignupForm from "./SignupForm"

const SignupPage = () => {
  return (
    <HydrationBoundary>
      <SignupForm />
    </HydrationBoundary>
  )
}

export default SignupPage
