"use client"

import { KeyboardEvent, MouseEvent, useRef, useState } from "react"

import { IFilterProps } from "@/types/findMeeting/findMeeting"
import useOutsideClick from "@/util/useOutsideClick"

import Arrow from "../icon/dynamicIcon/Arrow"

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

  const filterRef = useRef<HTMLDivElement>(null)
  useOutsideClick(filterRef, () => {
    return setIsOpen(false)
  })

  const onLabelClickHandler = () => {
    setIsOpen(!isOpen)
  }

  const onLabelKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsOpen(!isOpen)
    }
  }

  const onListClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onSelect(e)
    setIsOpen(false)
  }

  const onListKeyDownHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onSelect(e)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative inline-flex flex-col">
      <div
        role="button"
        tabIndex={0}
        className={`flex cursor-pointer gap-[3px] rounded-xl px-3 py-[6px] text-sm ${selVal ? "bg-gray-900 text-gray-50" : "border-2 border-gray-100 bg-white text-gray-800"}`}
        onClick={onLabelClickHandler}
        onKeyDown={onLabelKeyDownHandler}
      >
        <span className="flex items-center whitespace-nowrap">{selVal || placeholder}</span>
        <Arrow className="w-[15px]" state={selVal ? "inverseDown" : "defaultDown"} />
      </div>
      <div
        ref={filterRef}
        role="listbox"
        aria-expanded={isOpen}
        className={`absolute top-full z-50 mt-[2px] box-border flex w-full flex-col overflow-hidden rounded-xl bg-white p-1 text-sm shadow-expand transition delay-100 ease-in-out ${isOpen ? "opacity-1 max-h-none" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        {data.map((item, idx) => {
          return (
            <button
              key={`${idx + item}`}
              className="border border-white px-3 py-[4px] text-left hover:rounded-xl hover:bg-orange-100"
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={onListClickHandler}
              onKeyDown={onListKeyDownHandler}
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
