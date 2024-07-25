import EditSVG from "@public/icon/staticIcon/edit.svg"

interface IEditProps {
  className?: string
}

const Edit = ({ className }: IEditProps) => {
  const newClassName = `${className} w-8 h-8 text-[#9CA3AF]`
  return (
    <div>
      <EditSVG className={newClassName} />
    </div>
  )
}

export default Edit
