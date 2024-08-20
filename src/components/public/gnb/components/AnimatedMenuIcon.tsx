"use client"

import MenuIcon from "@/components/public/icon/staticIcon/MenuIcon"
import XIcon from "@/components/public/icon/staticIcon/X"
import { animated, useSpring } from "@react-spring/web"

interface IAnimatedMenuIconProps {
  onClick: () => void
  isOpen: boolean
}

const AnimatedMenuIcon = ({ onClick, isOpen }: IAnimatedMenuIconProps) => {
  const springProps = useSpring({
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 150, friction: 15 },
  })

  return (
    <animated.div style={springProps} className="cursor-pointer" onClick={onClick}>
      {isOpen ? (
        <XIcon className="h-5 w-5 md:h-7 md:w-7" />
      ) : (
        <MenuIcon className="h-5 w-5 text-primary md:h-7 md:w-7" />
      )}
    </animated.div>
  )
}

export default AnimatedMenuIcon
