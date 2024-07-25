"use client"

import { useState } from "react"

import VisibilityOff from "@/components/public/icon/staticIcon/VisibilityOff"
import VisibilityOn from "@/components/public/icon/staticIcon/VisibilityOn"

import Dropdown from "./components/Dropdown"

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
    error: "border-[#DC2626]",
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
  inputType: "input" | "dropdown"
  isPassword?: boolean
  onChange?: (value: string) => void
  placeholder: string
  errorMessage?: string
  options?: string[]
  onSelect?: (index: number) => void
}

/**
 * @interface IInputFieldProps
 * @param {string} className - 추가적인 스타일을 작성할 때 사용
 * @param {"small" | "large"} size - 컴포넌트의 height 크기를 정함
 */

const InputField = ({
  className,
  inputType,
  isPassword,
  onChange,
  size,
  placeholder,
  errorMessage,
  options,
  onSelect,
}: IInputFieldProps) => {
  const [isDone, setIsDone] = useState(false)

  const inputClasses =
    `${baseStyles} ${inputStyles[inputType].default} ${inputStyles[inputType].hover} ${inputStyles[inputType].focus} ${isDone ? inputStyles[inputType].done : ""} ${sizeStyles[size]} ${className}`.trim()

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
      baseStyles={inputClasses}
      iconBaseStyles={iconBaseStyles}
      options={options}
      onSelect={onSelect}
    />
  ) : (
    <div>
      <div className="relative">
        <input
          type={isPasswordVisible}
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
