import DalaemfitSVG from "@public/icon/staticIcon/dalaemfit.svg"

interface IDalaemfitProps {
  className?: string
}

const Dalaemfit = ({ className }: IDalaemfitProps) => {
  const newClassName = `${className} w-8 h-8 text-[#111827]`
  return (
    <div>
      <DalaemfitSVG className={newClassName} />
    </div>
  )
}

export default Dalaemfit
