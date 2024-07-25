import Image from "next/image"

import ProfileBGIMG from "@public/img/profile_bg.png"

interface IProfileBG {
  className?: string
}

const ProfileBG = ({ className }: IProfileBG) => {
  const newClassName = `${className} w-[158px] h-[47px]`
  return <Image src={ProfileBGIMG} alt="ProfileBGIMG" className={newClassName} />
}

export default ProfileBG
