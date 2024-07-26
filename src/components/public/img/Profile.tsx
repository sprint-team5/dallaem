import Image from "next/image"

import ProfiLargeDefaultIMG from "@public/img/profile_large_default.png"
import ProfileLargeEditIMG from "@public/img/profile_large_edit.png"
import ProfileSmallDefaultIMG from "@public/img/profile_small_default.png"

interface IProfileProps {
  className?: string
  state: "smallDefault" | "largeDefault" | "largeEdit"
  profileImg?: string | undefined
}

const Profile = ({ className, state, profileImg }: IProfileProps) => {
  if (profileImg !== undefined && profileImg !== "") {
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
            src={ProfiLargeDefaultIMG}
            width={56}
            height={56}
            alt="ProfiLargeDefaultIMG"
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
