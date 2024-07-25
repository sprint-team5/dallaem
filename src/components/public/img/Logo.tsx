import LogoLargeSvg from "@public/img/logo_large.svg"
import LogoSmallSVG from "@public/img/logo_small.svg"

interface ILogoProps {
  className?: string
  state: "small" | "large"
}

const Logo = ({ className, state }: ILogoProps) => {
  switch (state) {
    case "small": {
      const newClassName = `${className} w-[56px] h-[27px]`
      return <LogoSmallSVG className={newClassName} />
    }
    case "large": {
      const newClassName = `${className} w-[73px] h-[35px]`
      return <LogoLargeSvg className={newClassName} />
    }
    default:
      return null
  }
}

export default Logo
