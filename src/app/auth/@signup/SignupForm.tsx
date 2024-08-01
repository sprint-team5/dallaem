"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { usePostSignup } from "@/actions/api-hooks/Auths"
import Button from "@/components/public/button/Button"
import InputField from "@/components/public/input/InputField"
import ROUTE from "@/constants/route"

import validations from "./Validations"

// 테일윈드 스타일
const formStyles = {
  container: {
    default: "rounded-3xl bg-white",
    mobile: "min-h-[682px] w-[343px] px-4 py-8",
    tablet: "md:min-h-[710px] md:w-[608px] md:px-16 md:py-8",
    desktop: "2xl:w-[510px] 2xl:px-[54px]",
  },
  form: "flex w-full flex-col items-stretch justify-between gap-6 font-semibold text-gray-900",
}

const containerStyles = `${formStyles.container.default} ${formStyles.container.mobile} ${formStyles.container.tablet} ${formStyles.container.desktop}`

const signupFormValue = [
  {
    label: "이름",
    name: "name",
    type: "text",
    placeholder: "이름을 입력해주세요",
    validation: validations.name,
  },
  {
    label: "아이디",
    name: "email",
    type: "text",
    placeholder: "아이디를 입력해주세요",
    validation: validations.email,
  },
  {
    label: "회사명",
    name: "companyName",
    type: "text",
    placeholder: "회사명을 입력해주세요",
    validation: validations.companyName,
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    validation: validations.password,
  },
  {
    label: "비밀번호 확인",
    name: "passwordConfirm",
    type: "password",
    placeholder: "비밀번호를 다시 한번 입력해주세요",
    validation: validations.passwordConfirm,
  },
]
interface SignupData {
  email: string
  password: string
  name: string
  companyName: string
}

const SignupForm = () => {
  const router = useRouter()

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { mutate: signup, error: signupError } = usePostSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<SignupData>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldUseNativeValidation: false,
  })

  const watchFields = watch()

  useEffect(() => {
    const isFormFilled = signupFormValue.every((field) => {
      return watchFields[field.name as keyof SignupData]
    })
    setButtonDisabled(!isFormFilled)
  }, [watchFields])

  const onSubmit: SubmitHandler<SignupData> = (formData) => {
    const signupData: SignupData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      companyName: formData.companyName,
    }

    signup(signupData, {
      onSuccess: () => {
        router.replace(ROUTE.SIGNIN)
      },
    })
  }

  return (
    <div className={containerStyles}>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <span className="text-center text-gray-800">회원가입</span>
        {signupFormValue.map((value) => {
          return (
            <div key={value.label}>
              <InputField
                label={value.label}
                name={value.name}
                type={value.type}
                placeholder={value.placeholder}
                register={register}
                validation={value.validation}
                error={errors[value.name as keyof SignupData]}
                onBlur={() => {
                  return trigger(value.name as keyof SignupData)
                }}
                inputType="input"
                size="large"
              />
            </div>
          )
        })}
        {signupError && <span>※ {signupError.message}</span>}
        <Button type="submit" className="mt-4" borderStyle="solid" disabled={buttonDisabled}>
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
