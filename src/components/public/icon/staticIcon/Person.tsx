import PersonSVG from "@public/icon/staticIcon/person.svg"

interface IPersonProps {
  className?: string
}

const Person = ({ className }: IPersonProps) => {
  const newClassName = `${className} w-4 h-4 text-[#111827]`
  return (
    <div>
      <PersonSVG className={newClassName} />
    </div>
  )
}

export default Person
