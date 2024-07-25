import VisibilityOffSVG from "@public/icon/staticIcon/visibility_off.svg"

interface IVisibilityOffProps {
  className?: string
}

const VisibilityOff = ({ className }: IVisibilityOffProps) => {
  const newClassName = `${className} w-6 h-6 text-[#111827]`
  return (
    <div>
      <VisibilityOffSVG className={newClassName} />
    </div>
  )
}

export default VisibilityOff
