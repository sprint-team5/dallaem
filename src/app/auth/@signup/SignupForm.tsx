"use client"

import Link from "next/link"

import { usePostSignup } from "@/actions/api-hooks/Auths"
import Button from "@/components/public/button/Button"
import InputField from "@/components/public/input/InputField"
import ROUTE from "@/constants/route"

const formStyles = {
  container: {
    default: "rounded-3xl bg-white",
    mobile: "min-h-[682px] w-[343px] px-4 py-8",
    tablet: "md:min-h-[710px] md:w-[608px] md:px-16 md:py-8",
    desktop: "2xl:w-[510px] 2xl:px-[54px]",
  },
  form: "flex w-full flex-col items-stretch justify-between gap-6 font-semibold text-gray-900",
  inputText: "mb-2 block",
}

const containerStyles = `${formStyles.container.default} ${formStyles.container.mobile} ${formStyles.container.tablet} ${formStyles.container.desktop}`

interface SignupData {
  name: string
  email: string
  companyName: string
  password: string
}

const SignupForm = () => {
  const { mutate: signup } = usePostSignup()

  const inputFieldValue = [
    { label: "이름", name: "name", isPassword: false },
    { label: "아이디", name: "email", isPassword: false },
    { label: "회사명", name: "companyName", isPassword: false },
    { label: "비밀번호", name: "password", isPassword: true },
    { label: "비밀번호 확인", name: "passwordConfirm", isPassword: true },
  ]

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>

    // password_confirm 필드 제거 및 SignupData 타입으로 변환
    const signupData: SignupData = {
      name: userData.name,
      email: userData.email,
      companyName: userData.companyName,
      password: userData.password,
    }

    signup(signupData)
  }

  return (
    <div className={containerStyles}>
      <form className={formStyles.form} onSubmit={submitHandler}>
        <span className="text-center text-gray-800">회원가입</span>
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
        이미 회원이신가요?{" "}
        <Link className="text-orange-600 underline" href={ROUTE.SIGNIN}>
          로그인
        </Link>
      </div>
    </div>
  )
}

export default SignupForm
