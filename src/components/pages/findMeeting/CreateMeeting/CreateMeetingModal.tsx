"use client"

import { KeyboardEvent, useEffect, useRef } from "react"

import X from "@/components/public/icon/staticIcon/X"
import { allowScroll, preventScroll } from "@/util/modal"

import CreateMeetingForm from "./CreateMeetingForm"
import "./styles.scss"

const CreateMeetingModal = ({ changeState }: { changeState: () => void }) => {
  const modalSelectRef = useRef<HTMLSelectElement>(null)

  const closeBtnKeyboardHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === "Enter" || e.code === "Space") {
      changeState()
    }
  }

  useEffect(() => {
    const prevScrollY = preventScroll()
    modalSelectRef.current?.focus()

    return () => {
      allowScroll(prevScrollY)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black bg-opacity-55">
      <div
        id="contentWrapper"
        className="flex max-h-screen w-modal-lg flex-col overflow-y-scroll rounded-xl bg-white p-6 shadow-md max-sm:w-full"
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
