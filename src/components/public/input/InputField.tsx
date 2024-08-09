"use client"

import { useCallback, useState } from "react"
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form"

import VisibilityOff from "@/components/public/icon/staticIcon/VisibilityOff"
import VisibilityOn from "@/components/public/icon/staticIcon/VisibilityOn"

import Dropdown from "./components/Dropdown"

// 테일윈드 스타일 선언
const baseStyles =
  "w-full rounded-xl bg-[#F9FAFB] px-4 py-[10px] font-medium placeholder-[#9CA3AF] appearance-none focus:outline-none"

const inputStyles = {
  label: "mb-3 block",
  input: {
    default: "border-2 border-[#F9FAFB]",
    hover: "hover:border-[#FDBA74]",
    focus: "focus:border-[#EA580C] focus:placeholder-[#1F2937]",
    valid: "border-[#1F2937] placeholder-[#1F2937]",
    error: "border-[#DC2626]",
  },
  dropdown: {
    default: "border-2 border-[#F9FAFB]",
    hover: "hover:border-[#FDBA74]",
    focus: "",
    valid: "border-[#1F2937] placeholder-[#1F2937]",
    error: "",
  },
  errorMessage: "font-semibold text-[#DC2626] mt-2 block",
}

const sizeStyles = {
  small: "h-10",
  large: "h-11",
}

const iconBaseStyles = "absolute right-4 top-1/2 -translate-y-1/2"

interface IInputFieldProps {
  className?: string
  label: string
  name: string
  type: string
  size: "small" | "large"
  placeholder: string
  register?: UseFormRegister<any>
  validation?: RegisterOptions
  error?: FieldError
  onBlur?: () => void
  onFocus?: () => void

  inputType: "input" | "dropdown"
  options?: string[]
}

/**
 * @interface IInputFieldProps
 * @param className - 추가적인 테일윈드 스타일을 작성할 때 사용합니다.
 * @param label - input 위에 나타날 라벨에 표시될 문자열
 * @param name - form에서 전달될 name을 정합니다.
 * @param type - "text" | "password"; input의 type 속성
 * @param size - InputFIeld 컴포넌트의 height 크기를 정합니다.
 * @param placeholder - InputField 안에 표시될 글씨입니다.
 * @param register - react-hook-form-register
 * @param validation - react-hook-form-validation
 * @param error - error 상태와 에러 메시지를 전달합니다
 * @param onBlur - onBlur 이벤트 객체입니다.
 * @param onFocus - onFocus 이벤트 객체입니다.
 *
 * @param inputType - Input | Dropdown
 * @param options - Dropdown으로 사용될 때 표시될 배열입니다.
 */

const InputField = ({
  className,
  label,
  name,
  type,
  size,
  placeholder,
  register,
  validation,
  error,
  onBlur,
  onFocus,
  inputType,
  options,
}: IInputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const inputClasses =
    `${baseStyles} ${inputStyles[inputType].default} ${inputStyles[inputType].hover} ${inputStyles[inputType].focus} ${isTouched && !error ? inputStyles[inputType].valid : ""} ${sizeStyles[size]} ${className} ${error && inputStyles[inputType].error}`.trim()

  const handleBlur = useCallback(async () => {
    setIsTouched(true)

    if (onBlur) {
      onBlur()
    }
  }, [onBlur])

  if (inputType === "dropdown" && options)
    return (
      <div>
        <label htmlFor={name} className={inputStyles.label}>
          {label}
        </label>
        <Dropdown
          name={name}
          baseStyles={inputClasses}
          iconBaseStyles={iconBaseStyles}
          options={options}
          register={register}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      </div>
    )

  const passwordShown = showPassword ? "text" : "password"

  return (
    <div>
      <label htmlFor={name} className={inputStyles.label}>
        {label}
      </label>
      <div className="relative">
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(register ? register(name, validation) : { name })}
          name={name}
          type={type === "password" ? passwordShown : "text"}
          id={name}
          placeholder={placeholder}
          className={inputClasses}
          onBlur={handleBlur}
          onFocus={onFocus}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              return setShowPassword((prev) => {
                return !prev
              })
            }}
            className={iconBaseStyles}
          >
            {showPassword ? <VisibilityOn /> : <VisibilityOff />}
          </button>
        )}
      </div>
      {error && <span className={inputStyles.errorMessage}>{error.message}</span>}
    </div>
  )
}

export default InputField
