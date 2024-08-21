"use client"

import { KeyboardEvent, MouseEvent, useRef, useState } from "react"

import { sortType } from "@/constants/meeting"
import { IFilterTabProps } from "@/types/findMeeting/findMeeting"
import useOutsideClick from "@/util/useOutsideClick"

/**
 * @interface IFilterTabProps
 * @param {string} selVal - 현재 선택된 필터링 데이터
 * @param {Function} onSelect - 필터링 데이터 선택 시 실행할 함수(setState 함수 전달)
 */

const FilterSort = (props: IFilterTabProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { selVal, onSelect } = props

  const filterSortRef = useRef<HTMLDivElement>(null)
  useOutsideClick(filterSortRef, () => {
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

  const getSortType = (value: string) => {
    const sort = sortType.find((item) => {
      return item.value === value
    })
    return sort ? sort.label : ""
  }

  return (
    <div className="relative inline-flex flex-col max-sm:items-end">
      <div
        role="button"
        tabIndex={0}
        className="flex cursor-pointer gap-[3px] rounded-xl border-2 border-gray-100 bg-white px-3 py-[6px] text-sm text-gray-800 max-sm:inline-flex max-sm:w-auto max-sm:p-[6px]"
        onClick={onLabelClickHandler}
        onKeyDown={onLabelKeyDownHandler}
      >
        <span className="flex items-center whitespace-nowrap">{getSortType(selVal)}</span>
      </div>
      <div
        ref={filterSortRef}
        role="listbox"
        aria-expanded={isOpen}
        className={`absolute top-full z-50 mt-[2px] box-border flex flex-col overflow-hidden rounded-xl bg-white p-1 text-sm shadow-expand transition delay-100 ease-in-out ${isOpen ? "opacity-1 max-h-none" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        {sortType.map((item) => {
          return (
            <button
              key={item.value}
              className="whitespace-nowrap border border-white px-3 py-[4px] text-left text-gray-800 hover:rounded-xl hover:bg-orange-100"
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={onListClickHandler}
              onKeyDown={onListKeyDownHandler}
              value={item.value}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterSort
