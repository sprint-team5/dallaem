import { MouseEventHandler, useEffect, useState } from "react"

import { IWishListData } from "@/types/wishlist/wishlist"
import Heart from "@public/icon/dynamicIcon/heart.svg"

/**
 * @param {IWishListData} list - 카드 리스트
 */
const WishBtn = ({ list }: { list: IWishListData }) => {
  const [isWish, setIsWish] = useState(false)

  const HanlderWish: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const wish = localStorage.getItem("wishlist")

    if (wish) {
      const parse: IWishListData[] = JSON.parse(wish)

      const index = parse.findIndex((item) => {
        return item.id === list.id
      })

      if (index > -1) {
        parse.splice(index, 1)
      } else {
        parse.push({ ...list, wish: true })
      }

      localStorage.setItem("wishlist", JSON.stringify([...parse]))
    } else {
      localStorage.setItem("wishlist", JSON.stringify([{ ...list, wish: true }]))
    }

    setIsWish(!isWish)
  }

  useEffect(() => {
    const wish = localStorage.getItem("wishlist")
    if (!wish) return
    const findWish = JSON.parse(wish).find((item: IWishListData) => {
      return item.id === list.id
    })
    setIsWish(findWish?.wish || false)
  }, [list])

  return (
    <button
      aria-label="wishAdd"
      type="button"
      onClick={HanlderWish}
      className={`relative flex size-12 cursor-pointer items-center justify-center rounded-full ${!isWish ? "border-2 border-gray-200 bg-white" : "bg-orange-50"}`}
    >
      <Heart className="w-[22px] stroke-gray-400 stroke-2 text-white" />
      <Heart
        className={`absolute w-[22px] origin-center stroke-orange-600 stroke-2 text-orange-600 transition-all duration-300 ${!isWish && "scale-0 opacity-0"}`}
      />
    </button>
  )
}

export default WishBtn
