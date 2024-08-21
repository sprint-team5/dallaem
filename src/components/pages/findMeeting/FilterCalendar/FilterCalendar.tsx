"use client"

import { KeyboardEvent, useRef, useState } from "react"
import { Value } from "react-calendar/dist/cjs/shared/types"

import Calendars from "@/components/public/Calendars/Calendars"
import Arrow from "@/components/public/icon/dynamicIcon/Arrow"
import { IFilterCalendarProps } from "@/types/findMeeting/findMeeting"
import useOutsideClick from "@/util/useOutsideClick"
import dayjs from "dayjs"

/**
 * @interface IFilterCalendarProps
 * @param {string} placeholder - 필터링할 데이터가 없을 때 보여줄 문구
 * @param {string} selVal - 현재 선택된 필터링 데이터(optional)
 * @param {Function} onChange - 필터링 데이터 선택 시 실행할 함수(setState 함수 전달)
 */
const FilterCalendar = (props: IFilterCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { placeholder, selVal, onChange } = props

  const filterCalendarRef = useRef<HTMLDivElement>(null)
  useOutsideClick(filterCalendarRef, () => {
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

  const onChangeHandler = (e: Value) => {
    const formatDate = dayjs(String(e)).format("YYYY-MM-DD")
    if (dayjs(selVal).format("YYYY-MM-DD") === formatDate) onChange("")
    else onChange(formatDate)
    setIsOpen(false)
  }

  const displayDateValue = !selVal ? placeholder : dayjs(selVal).format("YY/MM/DD")

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        className={`inline-flex w-auto cursor-pointer gap-[3px] rounded-xl px-3 py-[6px] text-sm ${selVal ? "bg-gray-900 text-gray-50" : "border-2 border-gray-100 bg-white text-gray-800"}`}
        onClick={onLabelClickHandler}
        onKeyDown={onLabelKeyDownHandler}
      >
        <span className="flex items-center whitespace-nowrap">{displayDateValue}</span>
        <Arrow className="w-[15px]" state={selVal ? "inverseDown" : "defaultDown"} />
      </div>
      <div
        ref={filterCalendarRef}
        role="listbox"
        aria-expanded={isOpen}
        className={`absolute top-full z-50 mt-[2px] box-border overflow-hidden rounded-xl bg-white shadow-expand transition delay-100 ease-in-out ${isOpen ? "opacity-1 max-h-none" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <Calendars value={selVal} onChange={onChangeHandler} />
      </div>
    </div>
  )
}

export default FilterCalendar
