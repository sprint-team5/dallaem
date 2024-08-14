"use client"

import { notFound, useSearchParams } from "next/navigation"

import AuthLayoutComponent from "./AuthLayout"

const AuthLayout = ({ signin, signup }: { signin: React.ReactNode; signup: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  // mode 쿼리스트링이 로그인, 회원가입 페이지 모두와 일치하지 않을 경우 에러 페이지로 이동
  if (!mode || (mode !== "signin" && mode !== "signup")) {
    notFound()
  }

  // mode 쿼리스트링에 따라 로그인, 회원가입 페이지의 내용을 결정
  const content = mode === "signup" ? signup : signin

  return (
    <div>
      <AuthLayoutComponent>{content}</AuthLayoutComponent>
    </div>
  )
}

export default AuthLayout
