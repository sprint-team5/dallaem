"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Fragment, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "@/components/public/button/Button"
import InputField from "@/components/public/input/InputField"
import CompleteSignUpModal from "@/components/public/modal/CompleteSignUpModal"
import ROUTE from "@/constants/route"
import usePostSignup from "@/hooks/usePostSignup"
import { ISignupData } from "@/types/auth/auth"

import validations from "./Validations"

// 테일윈드 스타일
const containerStyles = {
  default: "rounded-3xl bg-white",
  mobile: "min-h-[682px] w-[343px] px-4 py-8",
  tablet: "md:min-h-[710px] md:w-[608px] md:px-16 md:py-8",
  desktop: "2xl:w-[510px] 2xl:px-[54px]",
}

const formStyles = {
  container: `${containerStyles.default} ${containerStyles.mobile} ${containerStyles.tablet} ${containerStyles.desktop}`,
  form: "flex w-full flex-col items-stretch justify-between gap-6 font-semibold text-gray-900",
}

// input에 표시될 요소를 객체로 정의
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

const SignupForm = () => {
  const router = useRouter()

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: signup, error: signupError } = usePostSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    clearErrors,
    watch,
  } = useForm<ISignupData>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldUseNativeValidation: false,
  })

  const watchFields = watch()

  useEffect(() => {
    const isFormFilled = signupFormValue.every((field) => {
      return watchFields[field.name as keyof ISignupData]
    })
    setButtonDisabled(!isFormFilled)
  }, [watchFields])

  const onSubmit: SubmitHandler<ISignupData> = (data) => {
    const signupData: ISignupData = {
      email: data.email,
      password: data.password,
      name: data.name,
      companyName: data.companyName,
    }

    signup(signupData, {
      onSuccess: () => {
        setIsModalOpen(true)
      },
    })
  }

  const handleBlur = (name: keyof ISignupData) => {
    clearErrors(name)
    trigger(name)
  }

  const handleFocus = (name: keyof ISignupData) => {
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

  const onConfirmClick = () => {
    setIsModalOpen(false)
    router.replace(ROUTE.SIGNIN)
  }

  return (
    <div className={formStyles.container}>
      {isModalOpen && (
        <CompleteSignUpModal isOneBtn onConfirmClick={onConfirmClick}>
          회원가입이 완료되었습니다.
        </CompleteSignUpModal>
      )}
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <span className="text-center text-gray-800">회원가입</span>
        {signupFormValue.map((value) => {
          return (
            <Fragment key={value.label}>
              <InputField
                label={value.label}
                name={value.name}
                type={value.type}
                placeholder={value.placeholder}
                register={register}
                validation={value.validation}
                error={errors[value.name as keyof ISignupData]}
                onBlur={() => {
                  return handleBlur(value.name as keyof ISignupData)
                }}
                inputType="input"
                size="large"
                onFocus={() => {
                  return handleFocus(value.name as keyof ISignupData)
                }}
              />
            </Fragment>
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
