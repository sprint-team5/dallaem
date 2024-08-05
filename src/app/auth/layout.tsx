"use client"

import { useSearchParams } from "next/navigation"

import AuthLayoutComponent from "./AuthLayout"

const AuthLayout = ({ signin, signup }: { signin: React.ReactNode; signup: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  return (
    <div>
      <AuthLayoutComponent>{mode === "signin" ? signin : signup}</AuthLayoutComponent>
    </div>
  )
}

export default AuthLayout
