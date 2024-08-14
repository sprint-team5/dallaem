import Image from "next/image"

import ImgLoginIMG from "@public/img/img_login.png"

interface ImgLoginProps {
  className?: string
}

const ImgLogin = ({ className }: ImgLoginProps) => {
  return (
    <div className={className}>
      <Image width={620} height={513} src={ImgLoginIMG} alt="ImgLoginIMG" layout="cover" />
    </div>
  )
}

export default ImgLogin
