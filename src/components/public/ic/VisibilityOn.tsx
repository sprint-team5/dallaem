import VisibilityOnSVG from "@/public/icon/visibility_on.svg"

interface IVisibilityOnProps {
  className: string
}

const VisibilityOn = ({ className }: IVisibilityOnProps) => {
  const newClassName = `${className} w-6 h-6 text-[#111827]`
  return (
    <div>
      <VisibilityOnSVG className={newClassName} />
    </div>
  )
}

export default VisibilityOn
