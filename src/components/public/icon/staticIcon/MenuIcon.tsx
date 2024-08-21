import MenuSVG from "@public/icon/staticIcon/menuIcon.svg"

interface IMenuIconProps {
  className?: string
}

const MenuIcon = ({ className }: IMenuIconProps) => {
  const newClassName = `${className} w-6 h-6 text-[#111827]`
  return (
    <div>
      <MenuSVG className={newClassName} />
    </div>
  )
}

export default MenuIcon
