"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { ChangeEvent, useState } from "react"

import editProfileInfo from "@/actions/editProfileInfo"
import CancelButton from "@/components/pages/mypage/CancelButton"

import CloseBtn from "../CloseBtn"
import Profile from "../img/Profile"

interface IProfileEditModalProps {
  company: string
  src?: string
}

const IMAGE_SIZE_LIMIT = 5242880

const errorMessage = {
  img: "5MB보다 큰 파일은 업로드할 수 없습니다.",
  companyName: "회사 이름을 입력해주세요.",
}

const ProfileEditModal = ({ company, src = "" }: IProfileEditModalProps) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState({
    img: "",
    companyName: "",
  })
  const [userProfileInput, setUserProfileInput] = useState<{
    companyName: string
    image: null | File
  }>({
    companyName: "",
    image: null,
  })
  const router = useRouter()

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const userImgInput = e.target.files[0]
    if (userImgInput.size > IMAGE_SIZE_LIMIT) {
      setError((prev) => ({
        ...prev,
        img: errorMessage.img,
      }))
      return
    }
    const preview = URL.createObjectURL(userImgInput)
    setError((prev) => ({
      ...prev,
      img: "",
    }))
    setImgSrc(preview)
    setUserProfileInput((prev) => {
      return {
        ...prev,
        image: userImgInput,
      }
    })
  }

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) {
      setError((prev) => ({
        ...prev,
        companyName: errorMessage.companyName,
      }))
      return
    }
    setError((prev) => ({
      ...prev,
      companyName: "",
    }))
  }

  const submitHandler = async (formData: FormData) => {
    if (error.companyName || error.img) return
    await editProfileInfo(formData)
    router.back()
  }

  return (
    <form
      action={submitHandler}
      className="mt-1/2 absolute left-0 right-0 top-1/3 mx-auto flex w-modal-md flex-col gap-4 rounded-xl border bg-white p-6 shadow-md lg:w-modal-lg"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">프로필 수정하기</h3>
        <CloseBtn />
      </div>
      <div className="relative pb-3">
        <label htmlFor="image" className="relative block h-[56px] w-[56px] cursor-pointer pb-3">
          {imgSrc ? (
            <Image src={imgSrc} alt="profile image" className="rounded-full" fill />
          ) : (
            <Profile state="largeEdit" />
          )}
          <input hidden id="image" name="image" type="file" onChange={changeFileHandler} />
        </label>
        {error.img && <p className="absolute text-sm text-red-500">{error.img}</p>}
      </div>
      <div className="relative pb-3">
        <label htmlFor="companyName" className="font-semibold">
          회사
          <input
            name="companyName"
            className="mt-2 w-full rounded-xl bg-gray-50 px-3 py-2 font-medium placeholder-black"
            placeholder={company}
            onChange={changeTextHandler}
          />
        </label>
        {error.companyName && <p className="absolute text-sm text-red-500">{error.companyName}</p>}
      </div>
      <div className="flex gap-3">
        <CancelButton />
        <button
          disabled={error.companyName || error.img ? true : false}
          type="submit"
          className={`w-1/2 rounded-lg bg-gray-400 py-2.5 text-white hover:bg-gray-500 active:bg-gray-700`}
        >
          수정하기
        </button>
      </div>
      <div />
    </form>
  )
}

export default ProfileEditModal
