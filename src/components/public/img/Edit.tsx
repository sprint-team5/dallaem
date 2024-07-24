import Image from "next/image"

import EditLargeIMG from "@/public/img/edit_large.png"
import EditSmallIMG from "@/public/img/edit_small.png"

interface IEditProps {
  className?: string
  state: "small" | "large"
}

const Edit = ({ className, state }: IEditProps) => {
  switch (state) {
    case "small": {
      const newClassName = `${className} w-[18px] h-[18px]`
      return <Image src={EditSmallIMG} alt="EditSmallIMG" className={newClassName} />
    }
    case "large": {
      const newClassName = `${className} w-8 h-8`
      return <Image src={EditLargeIMG} alt="EditLargeIMG" className={newClassName} />
    }
    default:
      return null
  }
}

export default Edit
