"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Fragment, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "@/components/public/button/Button"
import InputField from "@/components/public/input/InputField"
import ROUTE from "@/constants/route"
import usePostSignin from "@/hooks/usePostSignin"
import { ISigninData } from "@/types/auth/auth"

import validations from "./Validations"

// 테일윈드 스타일
const containerStyles = {
  default: "rounded-3xl bg-white",
  mobile: "min-h-[406px] w-[343px] px-4 py-8",
  tablet: "md:min-h-[422px] md:w-[608px] md:px-16 md:py-8",
  desktop: "2xl:w-[510px] 2xl:px-[54px]",
}

const formStyles = {
  container: `${containerStyles.default} ${containerStyles.mobile} ${containerStyles.tablet} ${containerStyles.desktop}`,
  form: "flex w-full flex-col items-stretch justify-between gap-6 font-semibold text-gray-900",
}

// input에 표시될 요소를 객체로 정의
const signinFormValue = [
  {
    label: "아이디",
    name: "email",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    validation: validations.email,
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    validation: validations.password,
  },
]

const SigninForm = () => {
  const router = useRouter()

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { mutate: signin, error: signinError } = usePostSignin()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setError,
    clearErrors,
  } = useForm<ISigninData>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldUseNativeValidation: false,
  })

  const watchFields = watch()

  useEffect(() => {
    const isFormFilled = signinFormValue.every((field) => {
      return watchFields[field.name as keyof ISigninData]
    })
    setButtonDisabled(!isFormFilled)
  }, [watchFields])

  const onSubmit: SubmitHandler<ISigninData> = (data) => {
    signin(data, {
      onSuccess: () => {
        router.replace(ROUTE.HOME)
      },
    })
  }

  const handleBlur = (name: keyof ISigninData) => {
    clearErrors(name)
    trigger(name)
  }

  const handleFocus = (name: keyof ISigninData) => {
    const timer = setTimeout(() => {
      if (!watchFields[name]) {
        setError(name, {
          type: "required",
          message: validations[name].required,
        })
      }
    }, 1000)

    return () => {
      return clearTimeout(timer)
    }
  }

  return (
    <div className={formStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <span className="text-center text-gray-800">로그인</span>
        {signinFormValue.map((value) => {
          return (
            <Fragment key={value.label}>
              <InputField
                label={value.label}
                name={value.name}
                type={value.type}
                placeholder={value.placeholder}
                register={register}
                validation={value.validation}
                error={errors[value.name as keyof ISigninData]}
                onBlur={() => {
                  return handleBlur(value.name as keyof ISigninData)
                }}
                onFocus={() => {
                  return handleFocus(value.name as keyof ISigninData)
                }}
                inputType="input"
                size="large"
              />
            </Fragment>
          )
        })}
        {signinError && <span>※ {signinError.message}</span>}
        <Button type="submit" className="mt-4" borderStyle="outlined" disabled={buttonDisabled}>
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
