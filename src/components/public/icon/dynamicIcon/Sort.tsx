import SortSVG from "@public/icon/dynamicIcon/sort.svg"

interface ISortProps {
  className?: string
  state: "inverse" | "default"
}

const Sort = ({ className, state }: ISortProps) => {
  switch (state) {
    case "inverse": {
      const newClassName = `${className} w-6 h-6 text-[#F9FAFB]`
      return <SortSVG className={newClassName} />
    }
    case "default": {
      const newClassName = `${className} w-6 h-6 text-[#111827]`
      return <SortSVG className={newClassName} />
    }
    default:
      return null
  }
}

export default Sort
