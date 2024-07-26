import { CSSProperties } from "react"

import HeartSVG from "@public/icon/dynamicIcon/heart.svg"

interface IHeartProps {
  style?: CSSProperties
  className?: string
  state: "active" | "default"
}

const Heart = ({ style, className, state }: IHeartProps) => {
  switch (state) {
    case "active": {
      const newClassName = `${className} w-6 h-6 text-[#EA580C]`
      return <HeartSVG style={style} className={newClassName} />
    }
    case "default": {
      const newClassName = `${className} w-6 h-6 text-[#E5E7EB]`
      return <HeartSVG style={style} className={newClassName} />
    }
    default:
      return null
  }
}

export default Heart
