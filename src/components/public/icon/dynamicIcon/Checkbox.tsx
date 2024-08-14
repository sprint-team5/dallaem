import CheckboxSVG from "@public/icon/dynamicIcon/checkbox.svg"

interface ICheckboxProps {
  className?: string
  state: "active" | "default"
}

const Checkbox = ({ className, state }: ICheckboxProps) => {
  switch (state) {
    case "active": {
      const newClassName = `${className} w-6 h-6 text-[#EA580C]`
      return <CheckboxSVG className={newClassName} />
    }
    case "default": {
      const newClassName = `${className} w-6 h-6 text-[#FFFFFF]`
      return <CheckboxSVG className={newClassName} />
    }
    default:
      return null
  }
}

export default Checkbox
