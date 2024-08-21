import Image from "next/image"

import { IProfileProps } from "@/types/mypage/mypage"
import ProfileLargeDefaultIMG from "@public/img/profile_large_default.png"
import ProfileLargeEditIMG from "@public/img/profile_large_edit.png"
import ProfileSmallDefaultIMG from "@public/img/profile_small_default.png"

const Profile = ({ className, state, profileImg }: IProfileProps) => {
  if (profileImg !== undefined && profileImg !== "" && profileImg !== null) {
    const newClassName = `${className} w-[40px] h-[40px] relative`
    return (
      <div className={newClassName}>
        <Image src={profileImg} alt="ProfileImg" fill className="rounded-full" />
      </div>
    )
  }
  switch (state) {
    case "smallDefault": {
      return (
        <div className={className}>
          <Image
            width={24}
            height={24}
            src={ProfileSmallDefaultIMG}
            alt="ProfileSmallDefaultIMG"
            layout="cover"
          />
        </div>
      )
    }
    case "largeDefault": {
      return (
        <div className={className}>
          <Image
            src={ProfileLargeDefaultIMG}
            width={56}
            height={56}
            alt="ProfileLargeDefaultIMG"
            layout="cover"
          />
        </div>
      )
    }
    case "largeEdit": {
      return (
        <div className={className}>
          <Image
            src={ProfileLargeEditIMG}
            width={56}
            height={56}
            alt="ProfileLargeEditIMG"
            layout="cover"
          />
        </div>
      )
    }

    default:
      return null
  }
}

export default Profile
