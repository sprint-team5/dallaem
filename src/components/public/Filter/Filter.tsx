"use client"

import { useState } from "react"

interface IFilterProps {
  data: Array<string>
  placeholder: string
  selVal?: string
  onSelect: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => void
}

/**
 * @interface IFilterProps
 * @param {Array<string>} data - 필터링할 데이터 배열
 * @param {string} placeholder - 필터링할 데이터가 없을 때 보여줄 문구
 * @param {string} selVal - 현재 선택된 필터링 데이터(optional)
 * @param {Function} onSelect - 필터링 데이터 선택 시 실행할 함수(setState 함수 전달)
 */
const Filter = (props: IFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, placeholder, selVal, onSelect } = props

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelect(e)
    setIsOpen(false)
  }

  const onKeyHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onSelect(e)
      setIsOpen(false)
    }
  }

  return (
    <div className="inline-flex flex-col">
      <div
        role="button"
        tabIndex={0}
        className={`cursor-pointer rounded-xl px-3 py-[6px] ${selVal !== "" ? "bg-gray-900 text-gray-50" : "border-2 border-gray-100 bg-white text-gray-800"}`}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsOpen(!isOpen)
          }
        }}
      >
        {selVal !== "" ? selVal : placeholder}
      </div>
      <div
        role="listbox"
        aria-expanded={isOpen}
        className={`mt-2 box-border flex flex-col rounded-xl shadow-expand transition delay-100 ease-in-out ${isOpen ? "opacity-1 max-h-none" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        {data.map((item, idx) => {
          return (
            <button
              key={`${idx + item}`}
              className="border border-white px-3 py-[4px] text-left hover:rounded-xl hover:bg-orange-100"
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={onClickHandler}
              onKeyDown={onKeyHandler}
              value={item}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Filter
