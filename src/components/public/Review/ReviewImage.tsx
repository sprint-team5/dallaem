import Image from "next/image"

import { useEffect, useState } from "react"

import getGenerateMeetImage from "@/actions/getGenerateMeetImage"
import { IGathering } from "@/types/review/filter"

const ReviewImage = ({ gathering }: { gathering: IGathering }) => {
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getGenerateMeetImage(gathering)
      setImgUrl(url)
    }
    fetchImageUrl()
  }, [gathering])

  return (
    <div className="relative h-[156px] w-full flex-none overflow-hidden rounded-3xl sm:w-[280px]">
      {imgUrl ? (
        <Image
          className="object-cover object-center"
          src={imgUrl}
          alt={`${gathering.name} 모임 이미지`}
          fill
        />
      ) : (
        <div className="absolute h-full w-full bg-black" />
      )}
    </div>
  )
}

export default ReviewImage
