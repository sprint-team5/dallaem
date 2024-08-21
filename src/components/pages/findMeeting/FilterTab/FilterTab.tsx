"use client"

import { KeyboardEvent, MouseEvent, useEffect, useRef } from "react"

import Dalaemfit from "@/components/public/icon/staticIcon/Dalaemfit"
import Workation from "@/components/public/icon/staticIcon/Workation"
import { IFilterTabProps } from "@/types/findMeeting/findMeeting"

/**
 * 모임 찾기에서 달램핏, 워케이션 구분 부분
 * @interface IFilterTabProps
 * @param {string} selVal - 현재 선택된 탭 데이터(optional)
 * @param {Function} onSelect - 필터링 데이터 선택 시 실행할 함수(setState 함수 전달)
 */
const FilterTab = (props: IFilterTabProps) => {
  const { selVal, onSelect } = props
  const upperTabWrapperRef = useRef<HTMLDivElement>(null)
  const tabBorderRef = useRef<HTMLDivElement>(null)

  const subTab = [
    {
      label: "전체",
      value: "DALLAEMFIT",
    },
    {
      label: "오피스 스트레칭",
      value: "OFFICE_STRETCHING",
    },
    {
      label: "마인드풀니스",
      value: "MINDFULNESS",
    },
  ]

  const isDallemfit = ["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS"].includes(selVal)

  useEffect(() => {
    const upperTabWrapper = upperTabWrapperRef.current
    const tabBorder = tabBorderRef.current
    if (!tabBorder || !upperTabWrapper) return
    const upperTabButtons = upperTabWrapper.querySelectorAll("button")

    if (upperTabButtons) {
      const selectedButton = Array.from(upperTabButtons).find((button) => {
        const buttonEl = button as HTMLButtonElement
        return buttonEl.classList.contains("active")
      })
      if (selectedButton) {
        const selectedButtonWidth = (selectedButton as HTMLButtonElement).offsetWidth
        tabBorder.style.width = `${selectedButtonWidth}px`
        tabBorder.style.left = `${(selectedButton as HTMLButtonElement).offsetLeft}px`
      }
    }
  }, [selVal])

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onSelect(e)
  }

  const onKeyHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onSelect(e)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div id="upperTabWrapper" className="relative inline-flex gap-3" ref={upperTabWrapperRef}>
          <button
            type="button"
            value="DALLAEMFIT"
            className={`flex items-center font-semibold ${isDallemfit ? "active text-gray-900" : "text-gray-200"}`}
            onClick={onClickHandler}
            onKeyDown={onKeyHandler}
            tabIndex={0}
          >
            달램핏
            <Dalaemfit
              className={`${isDallemfit ? "text-gray-900" : "text-gray-400"} pointer-events-none`}
            />
          </button>
          <button
            type="button"
            value="WORKATION"
            className={`flex items-center font-semibold ${!isDallemfit ? "active text-gray-900" : "text-gray-200"}`}
            onClick={onClickHandler}
            onKeyDown={onKeyHandler}
            tabIndex={0}
          >
            워케이션
            <Workation
              className={`${!isDallemfit ? "text-gray-900" : "text-gray-400"} pointer-events-none`}
            />
          </button>
        </div>
        <div
          className="absolute -bottom-1 h-[2px] rounded-full bg-black transition-all delay-75"
          ref={tabBorderRef}
        />
      </div>
      <div className="mt-4 flex justify-start gap-2">
        {isDallemfit &&
          subTab.map((tab) => {
            return (
              <button
                key={tab.value}
                tabIndex={0}
                type="button"
                value={tab.value}
                className={`flex gap-1 whitespace-nowrap rounded-xl bg-gray-200 px-[16px] py-[10px] text-sm text-gray-900 ${selVal === tab.value && "bg-gray-900 text-white"}`}
                onClick={onClickHandler}
                onKeyDown={onKeyHandler}
              >
                {tab.label}
              </button>
            )
          })}
      </div>
    </div>
  )
}
export default FilterTab
