"use client"

import { KeyboardEvent, useEffect, useRef } from "react"

import CreateMeetingForm from "@/components/pages/findMeeting/CreateMeeting/CreateMeetingForm"
import X from "@/components/public/icon/staticIcon/X"
import { allowScroll, preventScroll } from "@/util/modal"
import useOutsideClick from "@/util/useOutsideClick"

import "./styles.scss"

const CreateMeetingModal = ({ changeState }: { changeState: () => void }) => {
  const modalSelectRef = useRef<HTMLSelectElement>(null)

  const closeBtnKeyboardHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === "Enter" || e.code === "Space") {
      changeState()
    }
  }

  // outsideClick hook 사용
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(modalRef, () => {
    return changeState()
  })

  useEffect(() => {
    const prevScrollY = preventScroll()
    modalSelectRef.current?.focus()

    return () => {
      allowScroll(prevScrollY)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black bg-opacity-55 py-[26px]">
      <div
        ref={modalRef}
        id="contentWrapper"
        className="flex h-full w-[95%] max-w-[520px] flex-col overflow-y-scroll rounded-xl bg-white p-6 shadow-md sm:w-full"
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">모임만들기</h3>
          <button
            type="button"
            onClick={changeState}
            onKeyDown={closeBtnKeyboardHandler}
            className="block"
            aria-label="Close"
          >
            <X />
          </button>
        </div>
        <CreateMeetingForm changeState={changeState} />
      </div>
    </div>
  )
}

export default CreateMeetingModal
