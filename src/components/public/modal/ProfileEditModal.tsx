"use client"

import Image from "next/image"

import { ChangeEvent, useEffect, useState } from "react"

import editProfileInfo from "@/actions/editProfileInfo"
import CancelButton from "@/components/app/mypage/CancelButton"

import CloseBtn from "../CloseBtn"
import Profile from "../img/Profile"
import InputField from "../input/InputField"

interface IProfileEditModalProps {
  company: string
  src?: string
}

const errorMessage: string = "회사명을 입력해주세요"

const ProfileEditModal = ({ company, src = "" }: IProfileEditModalProps) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const userImgInput = e.target.files[0]
      const preview = URL.createObjectURL(userImgInput)
      setImgSrc(preview)
    }
  }

  const changeTextHandler = (value: string) => {
    if (!value) {
      setHasError(true)
      return
    }
    setHasError(false)
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imgSrc)
      setImgSrc("")
    }
  })
  return (
    <form
      action={editProfileInfo}
      className="mt-1/2 absolute left-0 right-0 top-1/4 mx-auto flex w-modal-md flex-col gap-4 rounded-xl border bg-white p-6 shadow-md lg:w-modal-lg"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">프로필 수정하기</h3>
        <CloseBtn />
      </div>
      <label htmlFor="userImg" className="relative block h-[56px] w-[56px]">
        {imgSrc ? (
          <Image src={imgSrc} alt="profile image" className="rounded-full" fill />
        ) : (
          <Profile state="largeEdit" />
        )}
        <input hidden id="userImg" name="userImg" type="file" onChange={changeFileHandler} />
      </label>
      <div>
        <label htmlFor="company" className="font-semibold">
          회사
          <InputField
            size="large"
            inputType="input"
            placeholder={company}
            onChange={changeTextHandler}
            errorMessage={hasError ? errorMessage : undefined}
          />
        </label>
      </div>
      <div className="flex gap-3">
        <CancelButton />
        <button
          type="submit"
          className="w-1/2 rounded-lg bg-gray-400 py-2.5 text-white hover:bg-gray-500 active:bg-gray-700"
        >
          수정하기
        </button>
      </div>
      <div />
    </form>
  )
}

export default ProfileEditModal
