import ArrowSVG from "@public/icon/dynamicIcon/arrow.svg"

interface IArrowProps {
  className?: string
  state: "defaultUp" | "defaultRight" | "defaultLeft" | "defaultDown" | "inverseDown"
}

const Arrow = ({ className, state }: IArrowProps) => {
  switch (state) {
    case "defaultUp": {
      const newClassName = `${className} w-6 h-6 text-[#1F2937] rotate-180`
      return <ArrowSVG className={newClassName} />
    }
    case "defaultRight": {
      const newClassName = `${className} w-6 h-6 text-[#1F2937] -rotate-90`
      return <ArrowSVG className={newClassName} />
    }
    case "defaultLeft": {
      const newClassName = `${className} w-6 h-6 text-[#1F2937] rotate-90`
      return <ArrowSVG className={newClassName} />
    }
    case "defaultDown": {
      const newClassName = `${className} w-6 h-6 text-[#1F2937]`
      return <ArrowSVG className={newClassName} />
    }
    case "inverseDown": {
      const newClassName = `${className} w-6 h-6 text-[#F9FAFB]`
      return <ArrowSVG className={newClassName} />
    }
    default:
      return null
  }
}

export default Arrow
