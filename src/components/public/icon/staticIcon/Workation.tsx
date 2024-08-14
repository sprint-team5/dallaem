import WorkationSVG from "@public/icon/staticIcon/workation.svg"

interface IWorkationProps {
  className?: string
}

const Workation = ({ className }: IWorkationProps) => {
  const newClassName = `${className} w-8 h-8 text-[#111827]`
  return (
    <div>
      <WorkationSVG className={newClassName} />
    </div>
  )
}

export default Workation
