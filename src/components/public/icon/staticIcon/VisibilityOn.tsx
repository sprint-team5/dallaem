import VisibilityOnSVG from "@public/icon/staticIcon/visibility_on.svg"

interface IVisibilityOnProps {
  className?: string
  onClick: () => void
}

const VisibilityOn = ({ className, onClick }: IVisibilityOnProps) => {
  const newClassName = `${className} w-6 h-6 text-[#111827]`
  return (
    <div>
      <VisibilityOnSVG className={newClassName} onClick={onClick} />
    </div>
  )
}

export default VisibilityOn
