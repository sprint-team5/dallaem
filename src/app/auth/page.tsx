"use server"

import { notFound } from "next/navigation"

import AuthArticle from "@/components/pages/auth/AuthArticle"
import { IAuthPageProps } from "@/types/auth/auth"

import SigninPage from "./@signin/page"
import SignupPage from "./@signup/page"

export default async function AuthPage({ searchParams }: IAuthPageProps) {
  const { mode } = searchParams

  if (mode === "signin") {
    return (
      <AuthArticle>
        <SigninPage />
      </AuthArticle>
    )
  }

  if (mode === "signup") {
    return (
      <AuthArticle>
        <SignupPage />
      </AuthArticle>
    )
  }

  notFound()
}
