"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { ChangeEvent, useEffect, useState } from "react"

import editProfileInfo from "@/actions/Auths/editProfileInfo"
import CancelButton from "@/components/pages/mypage/CancelButton"
import { IFile, IProfileEditModalProps } from "@/types/mypage/mypage"

import CloseBtn from "../CloseBtn"
import Profile from "../img/Profile"

const IMAGE_SIZE_LIMIT = 5242880

const errorMessage = {
  img: "5MB보다 큰 파일은 업로드할 수 없습니다.",
  noImg: "이미지를 업로드해주세요.",
  companyName: "회사 이름을 입력해주세요.",
}

const ANIMATION_DELAY = 100

const ProfileEditModal = ({ companyName, image = "" }: IProfileEditModalProps) => {
  const [animationClassName, setAnimationClassName] = useState(false)
  const [imgSrc, setImgSrc] = useState(image)
  const [error, setError] = useState({
    img: "",
    noImg: "",
    companyName: "",
  })
  const [userProfileInput, setUserProfileInput] = useState<IFile>({
    companyName: "",
    image: null,
  })
  const router = useRouter()

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const userImgInput = e.target.files[0]
    if (userImgInput.size > IMAGE_SIZE_LIMIT) {
      setError((prev) => {
        return {
          ...prev,
          img: errorMessage.img,
        }
      })
      return
    }
    const preview = URL.createObjectURL(userImgInput)
    setError((prev) => {
      return {
        ...prev,
        img: "",
        noImg: "",
      }
    })
    setImgSrc(preview)
    setUserProfileInput((prev) => {
      return {
        ...prev,
        image: userImgInput,
      }
    })
  }

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfileInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })

    if (e.target.value.length < 2) {
      setError((prev) => {
        return {
          ...prev,
          companyName: errorMessage.companyName,
        }
      })
      return
    }

    setError((prev) => {
      return {
        ...prev,
        companyName: "",
      }
    })
  }

  const submitHandler = async (formData: FormData) => {
    const uploadedImg = formData.get("image")

    if (uploadedImg instanceof File) {
      if (!uploadedImg.name) {
        setError((prev) => {
          return {
            ...prev,
            noImg: errorMessage.noImg,
          }
        })
        return
      }
    } else {
      setError((prev) => {
        return {
          ...prev,
          noImg: errorMessage.noImg,
        }
      })

      return
    }

    if (userProfileInput.companyName.length < 1) {
      setError((prev) => {
        return {
          ...prev,
          companyName: errorMessage.companyName,
        }
      })
      return
    }

    if (error.companyName || error.img || error.noImg) return

    await editProfileInfo(formData)
    router.back()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      return setAnimationClassName(true)
    }, ANIMATION_DELAY)

    return () => {
      return clearTimeout(timer)
    }
  }, [])

  const disabled = error.companyName || error.img || error.noImg ? true : undefined

  return (
    <form
      action={submitHandler}
      className={`mt-1/2 absolute left-0 right-0 top-1/3 mx-auto flex w-modal-md flex-col gap-4 rounded-xl border bg-white p-6 shadow-md transition-all lg:w-modal-lg ${animationClassName ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
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
        {error.noImg && <p className="absolute text-sm text-red-500">{error.noImg}</p>}
      </div>
      <div className="relative pb-3">
        <label htmlFor="companyName" className="font-semibold">
          회사
          <input
            name="companyName"
            className="mt-2 w-full rounded-xl bg-gray-50 px-3 py-2 font-medium placeholder-black"
            placeholder={companyName}
            onChange={changeTextHandler}
            value={userProfileInput.companyName}
          />
        </label>
        {error.companyName && <p className="absolute text-sm text-red-500">{error.companyName}</p>}
      </div>
      <div className="flex gap-3">
        <CancelButton />
        <button
          disabled={disabled}
          type="submit"
          className="w-1/2 rounded-lg bg-gray-400 py-2.5 text-white transition-all hover:bg-gray-500 active:bg-gray-700"
        >
          수정하기
        </button>
      </div>
      <div />
    </form>
  )
}

export default ProfileEditModal
