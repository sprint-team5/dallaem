import Image from "next/image"

import ProfiLargeDefaultIMG from "@public/img/profile_large_default.png"
import ProfileLargeEditIMG from "@public/img/profile_large_edit.png"
import ProfileSmallDefaultIMG from "@public/img/profile_small_default.png"

interface IProfileProps {
  className?: string
  state: "smallDefault" | "largeDefault" | "largeEdit"
}

const Profile = ({ className, state }: IProfileProps) => {
  switch (state) {
    case "smallDefault": {
      const newClassName = `${className} w-6 h-6`
      return (
        <Image src={ProfileSmallDefaultIMG} alt="ProfileSmallDefaultIMG" className={newClassName} />
      )
    }
    case "largeDefault": {
      const newClassName = `${className} w-[56px] h-[56px]`
      return (
        <Image src={ProfiLargeDefaultIMG} alt="ProfiLargeDefaultIMG" className={newClassName} />
      )
    }
    case "largeEdit": {
      const newClassName = `${className} w-[56px] h-[56px]`
      return <Image src={ProfileLargeEditIMG} alt="ProfileLargeEditIMG" className={newClassName} />
    }

    default:
      return null
  }
}

export default Profile
