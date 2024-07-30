import Image from "next/image"

import HeadClassIMG from "@public/img/head_class.png"
import HeadReviewIMG from "@public/img/head_review.png"
import HeadSavedIMG from "@public/img/head_saved.png"

interface IHeadProps {
  className?: string
  state: "class" | "review" | "saved"
}

const Head = ({ className, state }: IHeadProps) => {
  switch (state) {
    case "class": {
      return (
        <div className={className}>
          <Image width={72} height={72} src={HeadClassIMG} alt="HeadClassIMG" layout="cover" />
        </div>
      )
    }
    case "review": {
      return (
        <div className={className}>
          <Image width={72} height={72} src={HeadReviewIMG} alt="HeadReviewIMG" layout="cover" />
        </div>
      )
    }
    case "saved": {
      return (
        <div className={className}>
          <Image width={72} height={72} src={HeadSavedIMG} alt="HeadSavedIMG" layout="cover" />
        </div>
      )
    }
    default:
      return null
  }
}

export default Head
