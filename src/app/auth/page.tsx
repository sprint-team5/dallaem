"use server"

import { notFound } from "next/navigation"

import AuthArticle from "@/components/pages/auth/AuthArticle"

import SigninPage from "./@signin/page"
import SignupPage from "./@signup/page"

interface AuthPageProps {
  searchParams: { mode?: string }
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
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
