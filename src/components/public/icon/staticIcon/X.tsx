import XSVG from "@public/icon/staticIcon/X.svg"

interface IXProps {
  className?: string
}

const X = ({ className }: IXProps) => {
  const newClassName = `${className} w-6 h-6 text-[#111827]`
  return (
    <div>
      <XSVG className={newClassName} />
    </div>
  )
}

export default X
