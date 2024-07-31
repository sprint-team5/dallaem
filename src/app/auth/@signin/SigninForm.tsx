"use client"

import Link from "next/link"

import { usePostSignin } from "@/actions/api-hooks/Auths"
import Button from "@/components/public/button/Button"
import InputField from "@/components/public/input/InputField"
import ROUTE from "@/constants/route"

const formStyles = {
  container: {
    default: "rounded-3xl bg-white",
    mobile: "min-h-[406px] w-[343px] px-4 py-8",
    tablet: "md:min-h-[422px] md:w-[608px] md:px-16 md:py-8",
    desktop: "2xl:w-[510px] 2xl:px-[54px]",
  },
  form: "flex w-full flex-col items-stretch justify-between gap-6 font-semibold text-gray-900",
  inputText: "mb-2 block",
}

const containerStyles = `${formStyles.container.default} ${formStyles.container.mobile} ${formStyles.container.tablet} ${formStyles.container.desktop}`

interface SigninData {
  email: string
  password: string
}

const SigninForm = () => {
  const { mutate: signin } = usePostSignin()

  const inputFieldValue = [
    { label: "아이디", name: "email", isPassword: false },
    { label: "비밀번호", name: "password", isPassword: true },
  ]

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>

    const signinData: SigninData = {
      email: userData.email,
      password: userData.password,
    }

    signin(signinData)
  }

  return (
    <div className={containerStyles}>
      <form className={formStyles.form} onSubmit={submitHandler}>
        <span className="text-center text-gray-800">로그인</span>
        {inputFieldValue.map((value) => {
          return (
            <div key={value.label}>
              <span>{value.label}</span>
              <InputField
                name={value.name}
                inputType="input"
                size="small"
                errorMessage=""
                isPassword={value.isPassword}
              />
            </div>
          )
        })}
        <Button type="submit" className="mt-4" borderStyle="solid" disabled={false}>
          확인
        </Button>
      </form>
      <div className="mt-6 text-center font-medium text-gray-800">
        같이 달램이 처음이신가요?{" "}
        <Link className="text-orange-600 underline" href={ROUTE.SIGNUP}>
          회원가입
        </Link>
      </div>
    </div>
  )
}

export default SigninForm
