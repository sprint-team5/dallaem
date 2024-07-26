import VisibilityOffSVG from "@public/icon/staticIcon/visibility_off.svg"

interface IVisibilityOffProps {
  className?: string
  onClick: () => void
}

const VisibilityOff = ({ className, onClick }: IVisibilityOffProps) => {
  const newClassName = `${className} w-6 h-6 text-[#111827]`
  return (
    <div>
      <VisibilityOffSVG className={newClassName} onClick={onClick} />
    </div>
  )
}

export default VisibilityOff
