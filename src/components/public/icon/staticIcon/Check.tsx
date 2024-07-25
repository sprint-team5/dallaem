import CheckSVG from "@public/icon/staticIcon/check.svg"

interface ICheckProps {
  className?: string
}

const Check = ({ className }: ICheckProps) => {
  const newClassName = `${className} w-4 h-4 text-[#F97316]`
  return (
    <div>
      <CheckSVG className={newClassName} />
    </div>
  )
}

export default Check
