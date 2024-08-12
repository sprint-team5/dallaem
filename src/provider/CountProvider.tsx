"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
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
    const wishCount = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishCount(wishCount.length)
  }, [])

  return (
    <WishCountContext.Provider value={{ wishCount, setWishCount }}>
      {children}
    </WishCountContext.Provider>
  )
}

export const useWishCount = () => {
  const { wishCount, setWishCount } = useContext(WishCountContext) as IContext

  return { wishCount, setWishCount }
}
