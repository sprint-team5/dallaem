import Image from "next/image"

import CloseBtn from "../CloseBtn"

interface IProfileEditModalProps {
  company: string
  src: string
}

const ProfileEditModal = ({ company = "코드잇", src }: IProfileEditModalProps) => {
  const profileImgSrc = src || "/img/profile/defaultProfile.jpg"
  return (
    <form className="w-modal-md lg:w-modal-lg mx-auto flex flex-col gap-4 rounded-xl border p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">프로필 수정하기</h3>
        <CloseBtn />
      </div>
      <div>
        <label htmlFor="profileImg" className="relative">
          <Image src={profileImgSrc} alt="profile image" width={56} height={56} />
          <Image
            className="absolute bottom-1 left-9 rounded-full border-2 border-white"
            src="/img/profile/editBtn.jpg"
            alt="edit icon"
            width={18}
            height={18}
          />
          <input hidden id="profileImg" name="profileImg" type="file" />
        </label>
      </div>
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
        <button
          type="button"
          className="w-1/2 rounded-lg border border-orange-600 py-2.5 text-orange-600"
        >
          취소
        </button>
        <button type="submit" className="w-1/2 rounded-lg bg-gray-400 py-2.5 text-white">
          수정하기
        </button>
      </div>
      <div />
    </form>
  )
}

export default ProfileEditModal
