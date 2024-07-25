import Image from "next/image"

import ImgLoginIMG from "@public/img/img_login.png"

interface ImgLoginProps {
  className?: string
}

const ImgLogin = ({ className }: ImgLoginProps) => {
  const newClassName = `${className} w-[620px] h-[513px]`
  return <Image src={ImgLoginIMG} alt="ImgLoginIMG" className={newClassName} />
}

export default ImgLogin
