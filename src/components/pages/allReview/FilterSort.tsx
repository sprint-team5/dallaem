"use client"

import { useState } from "react"

import Sort from "@/components/public/icon/dynamicIcon/Sort"
import { IFilterSortProps } from "@/types/review/review"

const sortOrder = [
  {
    label: "최신순",
    value: "desc",
  },
  {
    label: "오래된순",
    value: "asc",
  },
]

/**
 * @interface IFilterSortProps
 * @param {string} selVal - 현재 선택된 필터링 데이터
 * @param {Function} onSelect - 필터링 데이터 선택 시 실행할 함수(setState 함수 전달)
 */
const FilterSort = (props: IFilterSortProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { selVal, onSelect } = props

  const onLabelClickHandler = () => {
    setIsOpen(!isOpen)
  }

  const onLabelKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsOpen(!isOpen)
    }
  }

  const onListClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelect(e)
    setIsOpen(false)
  }

  const onListKeyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onSelect(e)
      setIsOpen(false)
    }
  }

  const getSortType = (value: string) => {
    const sort = sortOrder.find((item) => {
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
        <Sort state="default" />
        <span className="flex items-center whitespace-nowrap max-sm:hidden">
          {selVal && getSortType(selVal)}
        </span>
      </div>
      <div
        role="listbox"
        aria-expanded={isOpen}
        className={`absolute top-full z-[1] mt-[2px] box-border flex flex-col overflow-hidden rounded-xl bg-white p-1 text-sm shadow-expand transition delay-100 ease-in-out ${isOpen ? "opacity-1 max-h-none" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        {sortOrder.map((item) => {
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
