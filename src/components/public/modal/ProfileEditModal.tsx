"use client"

import Image from "next/image"

import editProfileInfo from "@/actions/editProfileInfo"
import CancelButton from "@/components/app/mypage/CancelButton"

import CloseBtn from "../CloseBtn"
import Profile from "../img/Profile"

interface IProfileEditModalProps {
  company: string
  src?: string
}

const ProfileEditModal = ({ company = "코드잇", src }: IProfileEditModalProps) => {
  const imgSrc = src ?? "/img/profile_large_default.png"
  return (
    <form
      action={editProfileInfo}
      className="mt-1/2 absolute left-0 right-0 top-1/4 mx-auto flex w-modal-md flex-col gap-4 rounded-xl border bg-white p-6 shadow-md lg:w-modal-lg"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">프로필 수정하기</h3>
        <CloseBtn />
      </div>
      <label htmlFor="userImg">
        {src ? (
          <Image src={imgSrc} alt="profile image" width={56} height={56} />
        ) : (
          <Profile state="largeEdit" />
        )}
        <input hidden id="userImg" name="userImg" type="file" />
      </label>
      <div>
        <label htmlFor="company" className="font-semibold">
          회사
          <input
            id="company"
            name="company"
            type="text"
            className="my-3 block w-full rounded-xl bg-gray-100 px-2.5 py-3.5 font-medium placeholder:text-black"
            placeholder={company}
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
