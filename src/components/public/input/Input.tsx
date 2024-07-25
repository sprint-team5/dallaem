"use client"

import { useState } from "react"

import VisibilityOff from "@/components/public/icon/staticIcon/VisibilityOff"
import VisibilityOn from "@/components/public/icon/staticIcon/VisibilityOn"

import Dropdown from "./components/Dropdown"

const baseStyles =
  "w-[460px] rounded-xl bg-[#F9FAFB] px-4 py-[10px] font-medium placeholder-[#9CA3AF] appearance-none focus:outline-none"

const InputStyles = {
  default: "",
  toggle: "",
  hover: "border-2 border-[#FDBA74]",
  typing: "border-2 border-[#EA580C] placeholder-[#1F2937]",
  done: "border-2 border-[#1F2937] placeholder-[#1F2937]",
  error: "border-2 border-[#DC2626]",
}

const erroeMessageClass = "font-semibold text-[#DC2626]"

const sizeStyles = {
  small: "h-10",
  large: "h-11",
}

const iconBaseStyles = "absolute right-4 top-1/2 -translate-y-1/2"

interface IInputProps {
  className?: string
  size: "small" | "large"
  state: "default" | "toggle" | "hover" | "typing" | "done" | "error"
  isPassword?: boolean
  onChange: (value: string) => void
  placeholder: string
  errorMessage?: string
  options?: string[]
  onSelect?: (index: number) => void
}

const getInputClasses = ({
  size,
  state,
}: Omit<
  IInputProps,
  "className" | "onChange" | "placeholder" | "isPassword" | "errorMessage" | "options" | "onSelect"
>) => {
  return ` ${baseStyles} ${InputStyles[state]} ${sizeStyles[size]}`
}

/**
 * @interface IInputProps
 * @param {string} className - 추가적인 스타일을 작성할 때 사용
 * @param {"small" | "large"} size - 컴포넌트의 height 크기를 정함
 */

const Input = ({
  className,
  size,
  state,
  isPassword,
  onChange,
  placeholder,
  errorMessage,
  options,
  onSelect,
}: IInputProps) => {
  const inputClasses = getInputClasses({ size, state })

  const [isPasswordVisible, setIsPasswordVisible] = useState<"text" | "password">("text")

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return state === "toggle" && options && onSelect ? (
    <Dropdown
      baseStyles={`${inputClasses} ${className}`.trim()}
      iconBaseStyles={iconBaseStyles}
      options={options}
      onSelect={onSelect}
    />
  ) : (
    <div>
      <div className="relative h-fit w-fit">
        <input
          type={isPasswordVisible}
          className={`${inputClasses} ${className}`.trim()}
          onChange={onChangeHandler}
          placeholder={placeholder}
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
      <span className={erroeMessageClass}>{errorMessage}</span>
    </div>
  )
}

export default Input
