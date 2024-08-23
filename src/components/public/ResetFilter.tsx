"use client"

import { IResetFilterProps } from "@/types/wishlist/wishlist"
import { animated, useTransition } from "@react-spring/web"

const ResetFilter = ({ onClick, isVisible }: IResetFilterProps) => {
  const transitions = useTransition(isVisible, {
    from: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 30 },
    config: { tension: 300, friction: 30 },
  })

  return transitions((style, item) => {
    return item ? (
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 lg:left-[calc(50%+110px)]">
        <animated.button
          style={style}
          type="button"
          className="rounded-full bg-[#3e3bf6] px-8 py-2 text-sm text-white transition-colors hover:bg-[#4543bb] lg:text-base"
          onClick={onClick}
        >
          필터 초기화
        </animated.button>
      </div>
    ) : null
  })
}

export default ResetFilter
