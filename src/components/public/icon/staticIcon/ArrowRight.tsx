import ArrowRightSVG from "@public/icon/staticIcon/arrow_right.svg"

interface IArrowRightProps {
  className?: string
}

const ArrowRight = ({ className }: IArrowRightProps) => {
  const newClassName = `${className} w-6 h-6 text-[#EA580C]`
  return (
    <div>
      <ArrowRightSVG className={newClassName} />
    </div>
  )
}

export default ArrowRight
