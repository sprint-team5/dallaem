import Image from "next/image"

import EditLargeIMG from "@public/img/edit_large.png"
import EditSmallIMG from "@public/img/edit_small.png"

interface IEditProps {
  className?: string
  state: "small" | "large"
}

const Edit = ({ className, state }: IEditProps) => {
  switch (state) {
    case "small": {
      return (
        <div className={className}>
          <Image width={18} height={18} src={EditSmallIMG} alt="EditSmallIMG" layout="cover" />
        </div>
      )
    }
    case "large": {
      return (
        <div className={className}>
          <Image width={32} height={32} src={EditLargeIMG} alt="EditLargeIMG" layout="cover" />
        </div>
      )
    }
    default:
      return null
  }
}

export default Edit
