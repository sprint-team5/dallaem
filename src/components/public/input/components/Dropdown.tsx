"use client"

import { useRef, useState } from "react"

import Arrow from "@/components/public/icon/dynamicIcon/Arrow"
import useOutsideClick from "@/utill/useOutsideClick"

// 테일윈드 클래스 선언
const dropdownBaseStyles = "text-[#9CA3AF] font-medium text-left"

const optionMenuStyles = "absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg"

const optionStyles = "cursor-pointer px-4 py-2 hover:bg-[#FFEDD5] hover:rounded-xl font-medium"

const selectedOptionStyles = "bg-[#FFEDD5] rounded-xl"

interface IDropdownProps {
  baseStyles?: string
  iconBaseStyles: string
  options: string[]
  onSelect: (index: number) => void
}

const Dropdown = ({ baseStyles, iconBaseStyles, options, onSelect }: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  // outsideClick hook 사용
  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdownRef, () => {
    return setIsOpen(false)
  })

  const toggleDropdown = () => {
    return setIsOpen(!isOpen)
  }

  const optionClickHandler = (index: number) => {
    setSelectedOption(options[index])
    setIsOpen(false)
    onSelect(index)
  }

  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDropdown()
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`${baseStyles} ${dropdownBaseStyles}`.trim()}
        onClick={toggleDropdown}
        onKeyDown={keyDownHandler}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption}
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
    </div>
  )
}

export default Dropdown
