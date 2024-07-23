import LargeDiscardSVG from "@/public/icon/dynamicIcon/save_size=large, state=_discard.svg"
import LargeActiveSVG from "@/public/icon/dynamicIcon/save_size=large, state=active.svg"
import LargeInactiveSVG from "@/public/icon/dynamicIcon/save_size=large, state=inactive.svg"
import SmallDiscardSVG from "@/public/icon/dynamicIcon/save_size=small, state=discard.svg"

interface ISaveProps {
  className?: string
  state: "largeDiscard" | "largeActive" | "largeInactive" | "smallDiscard"
}

const Save = ({ className, state }: ISaveProps) => {
  switch (state) {
    case "largeDiscard": {
      const newClassName = `${className} w-12 h-12 text-[#EA580C]`
      return <LargeDiscardSVG className={newClassName} />
    }
    case "largeActive": {
      const newClassName = `${className} w-12 h-12 text-[#EA580C]`
      return <LargeActiveSVG className={newClassName} />
    }
    case "largeInactive": {
      const newClassName = `${className} w-12 h-12]`
      return <LargeInactiveSVG className={newClassName} />
    }
    case "smallDiscard": {
      const newClassName = `${className} w-[116px] h-9 text-[#EA580C]`
      return <SmallDiscardSVG className={newClassName} />
    }
    default:
      return null
  }
}

export default Save
