import ByeSVG from "@public/icon/staticIcon/bye.svg"

interface IByeProps {
  className?: string
}

const Bye = ({ className }: IByeProps) => {
  const newClassName = `${className} w-6 h-6 text-[#EA580C]`
  return (
    <div>
      <ByeSVG className={newClassName} />
    </div>
  )
}

export default Bye
