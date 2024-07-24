import Image from "next/image"

import HeadClassIMG from "@/public/img/head_class.png"
import HeadReviewIMG from "@/public/img/head_review.png"
import HeadSavedIMG from "@/public/img/head_saved.png"

interface IHeadProps {
  className?: string
  state: "class" | "review" | "saved"
}

const Head = ({ className, state }: IHeadProps) => {
  switch (state) {
    case "class": {
      const newClassName = `${className} w-[72px] h-[72px]`
      return <Image src={HeadClassIMG} alt="HeadClassIMG" className={newClassName} />
    }
    case "review": {
      const newClassName = `${className} w-[72px] h-[72px]`
      return <Image src={HeadReviewIMG} alt="HeadReviewIMG" className={newClassName} />
    }
    case "saved": {
      const newClassName = `${className} w-[72px] h-[72px]`
      return <Image src={HeadSavedIMG} alt="HeadSavedIMG" className={newClassName} />
    }
    default:
      return null
  }
}

export default Head
