import { HydrationBoundary } from "@tanstack/react-query"

import SigninForm from "./SigninForm"

const SigninPage = () => {
  return (
    <HydrationBoundary>
      <SigninForm />
    </HydrationBoundary>
  )
}

export default SigninPage
