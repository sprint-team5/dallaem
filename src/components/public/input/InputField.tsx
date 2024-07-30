"use client"

import { useState } from "react"

import VisibilityOff from "@/components/public/icon/staticIcon/VisibilityOff"
import VisibilityOn from "@/components/public/icon/staticIcon/VisibilityOn"

import Dropdown from "./components/Dropdown"

// 테일윈드 스타일 선언
const baseStyles =
  "w-full rounded-xl bg-[#F9FAFB] px-4 py-[10px] font-medium placeholder-[#9CA3AF] appearance-none focus:outline-none"

const inputStyles = {
  input: {
    default: "border-2",
    hover: "hover:border-[#FDBA74]",
    focus: "focus:border-[#EA580C] focus:placeholder-[#1F2937]",
    done: "border-[#1F2937] placeholder-[#1F2937]",
    error: "border-[#DC2626]",
  },
  dropdown: {
    default: "border-2",
    hover: "hover:border-[#FDBA74]",
    focus: "",
    done: "border-[#1F2937] placeholder-[#1F2937]",
    error: "",
  },
}

const errorMessageStyles = "font-semibold text-[#DC2626]"

const sizeStyles = {
  small: "h-10",
  large: "h-11",
}

const iconBaseStyles = "absolute right-4 top-1/2 -translate-y-1/2"

interface IInputFieldProps {
  className?: string
  size: "small" | "large"
  name?: string
  errorMessage?: string
  inputType: "input" | "dropdown"

  placeholder?: string
  isPassword?: boolean
  onChange?: (value: string) => void

  options?: string[]
  onSelect?: (index: number) => void
}

/**
 * @interface IInputFieldProps
 * @param className - 추가적인 스타일을 작성할 때 사용합니다.
 * @param size - InputFIeld 컴포넌트의 height 크기를 정합니다.
 * @param name - form에서 전달될 name을 정합니다.
 * @param errorMessage - InputField에 표시될 에러 메시지입니다.
 * @param inputType - InputField를 Input으로 사용할지 Dropdown으로 사용할지를 정합니다.
 *
 * Input일 때 사용되는 props
 * @param placeholder - InputField 안에 표시될 글씨입니다.
 * @param isPassword - 패스워드 input인지를 정합니다.
 * @param onChange - input의 onChange 이벤트가 발생할 때 실행됩니다.
 *
 * Dropdown일 때 사용되는 props
 * @param options - Dropdown으로 사용될 때 표시될 배열입니다.
 * @param onSelect - Dropdown의 onSelect 이벤트가 발생할 때 실행됩니다.
 *
 */

const InputField = ({
  className,
  size,
  name,
  errorMessage,
  inputType,
  placeholder,
  isPassword,
  onChange,
  options,
  onSelect,
}: IInputFieldProps) => {
  const [isDone, setIsDone] = useState(false)

  const inputClasses =
    `${baseStyles} ${inputStyles[inputType].default} ${inputStyles[inputType].hover} ${inputStyles[inputType].focus} ${isDone ? inputStyles[inputType].done : ""} ${sizeStyles[size]} ${className} ${errorMessage !== "" && inputStyles[inputType].error}`.trim()

  const [isPasswordVisible, setIsPasswordVisible] = useState<"text" | "password">("password")

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setIsDone(true)
    } else {
      setIsDone(false)
    }
  }

  return inputType === "dropdown" && options && onSelect ? (
    <Dropdown
      name={name}
      baseStyles={inputClasses}
      iconBaseStyles={iconBaseStyles}
      options={options}
      onSelect={onSelect}
    />
  ) : (
    <div>
      <div className="relative">
        <input
          name={name}
          type={isPassword ? isPasswordVisible : "text"}
          className={inputClasses}
          onChange={onChangeHandler}
          placeholder={placeholder}
          onBlur={blurHandler}
        />
        {isPasswordVisible === "password" ? (
          <VisibilityOff
            className={`${iconBaseStyles} ${isPassword || "hidden"}`.trim()}
            onClick={() => {
              return setIsPasswordVisible("text")
            }}
          />
        ) : (
          <VisibilityOn
            className={`${iconBaseStyles} ${isPassword || "hidden"}`.trim()}
            onClick={() => {
              return setIsPasswordVisible("password")
            }}
          />
        )}
      </div>
      <span className={errorMessageStyles}>{errorMessage}</span>
    </div>
  )
}

export default InputField
