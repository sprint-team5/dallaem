"use client"

import { useCallback, useRef, useState } from "react"
import { UseFormRegister } from "react-hook-form"

import Arrow from "@/components/public/icon/dynamicIcon/Arrow"
import useOutsideClick from "@/util/useOutsideClick"

// 테일윈드 클래스 선언
const dropdownBaseStyles = "font-medium text-left"

const optionMenuStyles = "absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg"

const optionStyles = "cursor-pointer px-4 py-2 hover:bg-[#FFEDD5] hover:rounded-xl font-medium"

const selectedOptionStyles = "bg-[#FFEDD5] rounded-xl"

interface IDropdownProps {
  name: string
  baseStyles?: string
  iconBaseStyles: string
  options: string[]
  register?: UseFormRegister<any>
  placeholder?: string
  onBlur?: () => void
}

const Dropdown = ({
  name,
  baseStyles,
  iconBaseStyles,
  options,
  register,
  placeholder,
  onBlur,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const buttonTextColor = isOptionSelected ? "text-[#1F2937]" : "text-[#9CA3AF]"

  // outsideClick hook 사용
  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdownRef, () => {
    return setIsOpen(false)
  })

  const handleBlur = useCallback(async () => {
    setIsTouched(true)

    if (onBlur) {
      onBlur()
    }
  }, [onBlur])

  const toggleDropdown = () => {
    return setIsOpen(!isOpen)
  }

  const optionClickHandler = (index: number) => {
    setSelectedOption(options[index])
    setIsOpen(false)
    setIsOptionSelected(true)

    if (register) {
      const event = {
        target: { name, value: options[index] },
      }
      register(name).onChange(event)
    }
  }

  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDropdown()
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        name={name}
        type="button"
        className={`${baseStyles} ${dropdownBaseStyles} ${buttonTextColor}`.trim()}
        onClick={toggleDropdown}
        onKeyDown={keyDownHandler}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onBlur={handleBlur}
      >
        {isTouched ? selectedOption : placeholder}
        <Arrow state={isOpen ? "defaultUp" : "defaultDown"} className={iconBaseStyles} />
      </button>
      {isOpen && (
        <ul className={optionMenuStyles} role="listbox">
          {options.map((option, index) => {
            const isSelected = selectedOption === option
            return (
              <li
                key={option}
                className={`${optionStyles} ${isSelected ? selectedOptionStyles : ""}`}
                onClick={() => {
                  return optionClickHandler(index)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    optionClickHandler(index)
                  }
                }}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
              >
                {option}
              </li>
            )
          })}
        </ul>
      )}
      <input
        type="hidden"
        value={selectedOption}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(register ? register(name) : { name })}
        onChange={(e) => {
          setSelectedOption(e.target.value)
          setIsOptionSelected(true)
        }}
      />
    </div>
  )
}

export default Dropdown
