import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { IFilterOption } from "@/types/meeting/meeting"
import { IWishListData } from "@/types/wishlist/wishlist"
import dayjs from "dayjs"

const useWishList = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  })
  const [wishlist, setWishlist] = useState<IWishListData[]>([])
  const [allData, setAllData] = useState<IWishListData[]>([])
  const [hasNext, setHasNext] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<IFilterOption>({
    type: "DALLAEMFIT",
    sortBy: "registrationEnd",
  })

  const loadItem = useCallback(() => {
    setWishlist((prev) => {
      const getItem = allData.slice(prev.length, prev.length + 5)

      if (prev.length + getItem.length >= allData.length) {
        setHasNext(false)
      }

      return [...prev, ...getItem]
    })
  }, [allData])

  /* 데이터 refetch */
  const onSetup = useCallback(() => {
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

    setAllData(sortedList)
    setWishlist([])
  }, [filter])

  useEffect(() => {
    setIsLoading(false)
    onSetup()
    setHasNext(true)
  }, [filter, onSetup])

  useEffect(() => {
    if (!isLoading) {
      loadItem()
    }
  }, [isLoading, loadItem])

  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      loadItem()
    }
  }, [inView, hasNext, loadItem, isLoading])

  return { isLoading, filter, setFilter, wishlist, onSetup, ref, hasNext }
}

export default useWishList
