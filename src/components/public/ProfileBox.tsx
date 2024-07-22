import Image from "next/image"

import LogoutBtn from "./LogoutBtn"
import ProfileEditBtn from "./ProfileEditBtn"

interface IProfileBoxProps {
  company: string
  email: string
  id: string
  imgSrc: string
}

const ProfileBox = ({
  company = "코드잇",
  email = "codeit@codeit.com",
  id = "럽윈즈올",
  imgSrc,
}: IProfileBoxProps) => {
  const profileImgSrc = imgSrc || "/img/profile/defaultProfile.jpg"
  return (
    <div className="w-profile-sm md:w-profile-md lg:w-profile-lg mx-auto h-44 rounded-3xl border-2 border-gray-200">
      <div className="bg-profile-sm md:bg-profile-md lg:bg-profile-lg flex items-center justify-between bg-no-repeat px-6 pb-5 pt-3.5">
        <h3 className="text-lg font-semibold">내 프로필</h3>
        <ProfileEditBtn />
      </div>
      <div className="relative">
        <div className="absolute -top-3 left-3 size-14 rounded-full">
          <Image fill src={profileImgSrc} alt="default profile" className="block rounded-full" />
        </div>
        <div className="absolute left-16 top-0 px-2 py-3">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-semibold">{id}</h3>
            <LogoutBtn />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-semibold">
              <p className="mb-1">company.</p>
              <p>E-mail.</p>
            </div>
            <div className="text-sm">
              <p className="mb-1">{company}</p>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBox
