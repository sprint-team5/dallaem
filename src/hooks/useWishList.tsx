import { useCallback, useEffect, useState } from "react"

import { IFilterOption } from "@/types/meeting/meeting"
import { IWishListData } from "@/types/wishlist/wishlist"
import dayjs from "dayjs"

const useWishList = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [filter, setFilter] = useState<IFilterOption>({
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
  })

  const [wishlist, setWishlist] = useState<IWishListData[]>([])

  /* 데이터 refetch */
  const onRefresh = useCallback(() => {
    const wish = localStorage.getItem("wishlist")
    if (!wish) return
    const parse: IWishListData[] = JSON.parse(wish)

    const filteredList = parse.filter((item) => {
      const filterTypeMappings: { [key: string]: boolean } = {
        DALLAEMFIT: item.type !== "WORKATION",
        OFFICE_STRETCHING: item.type === "OFFICE_STRETCHING",
        MINDFULNESS: item.type === "MINDFULNESS",
        WORKATION: item.type === "WORKATION",
      }

      const matchesType = filterTypeMappings[filter.type]
      const matchesLocation = !filter.location || item.location === filter.location
      const matchesDateTime =
        !filter.date || dayjs(item.dateTime).format("YYYY-MM-DD") === filter.date
      return matchesType && matchesLocation && matchesDateTime
    })

    const sortedList = filteredList.sort((a, b) => {
      if (filter.sortBy === "registrationEnd") {
        return dayjs(a.registrationEnd).unix() - dayjs(b.registrationEnd).unix()
      }
      if (filter.sortBy === "dateTime") {
        return dayjs(a.dateTime).unix() - dayjs(b.dateTime).unix()
      }
      if (filter.sortBy === "participantCount") {
        return b.participantCount - a.participantCount
      }
      return 0
    })

    setWishlist(sortedList)
  }, [filter])

  useEffect(() => {
    setIsLoading(false)
    onRefresh()
  }, [filter, onRefresh])

  return { isLoading, filter, setFilter, wishlist, onRefresh }
}

export default useWishList
