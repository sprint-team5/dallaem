"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

interface ICountProviderProp {
  children: ReactNode
}

interface IContext {
  wishCount: number
  setWishCount: Dispatch<SetStateAction<number>>
}

const WishCountContext = createContext<IContext | null>(null)

export const CountProvider = ({ children }: ICountProviderProp) => {
  const [wishCount, setWishCount] = useState(0)

  useEffect(() => {
    const newWishCount = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishCount(newWishCount.length)
  }, [])

  const cachedValue = useMemo(() => {
    return { wishCount, setWishCount }
  }, [wishCount])

  return <WishCountContext.Provider value={cachedValue}>{children}</WishCountContext.Provider>
}

export const useWishCount = () => {
  const { wishCount, setWishCount } = useContext(WishCountContext) as IContext

  return { wishCount, setWishCount }
}
