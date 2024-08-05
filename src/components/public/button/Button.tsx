"use client"

const baseStyles =
  "flex flex-col items-center justify-center whitespace-nowrap rounded-xl font-semibold py-[10px] px-[16px] w-full"

const buttonStyles = {
  solid: {
    default: "bg-[#EA580C] text-white",
    hover: "hover:bg-[#C2410C]",
    active: "active:bg-[#9A3412]",
    disabled: "bg-[#9CA3AF] text-white",
  },
  outlined: {
    default: "border-[#EA580C] border-[1px] text-[#EA580C]",
    hover: "hover:border-[#C2410C] hover:text-[#C2410C]",
    active: "active:border-[#9A3412] active:text-[#9A3412]",
    disabled: "border-[#9CA3AF] border-[1px] text-[#9CA3AF]",
  },
  hoveredText:
    "transition-all ease-in-out transform group-hover:scale-125 delay-[10ms] duration-150",
}

interface IButtonProps {
  className?: string
  borderStyle: "solid" | "outlined"
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

const getButtonClasses = ({
  borderStyle,
  disabled,
}: Omit<IButtonProps, "className" | "type" | "children" | "onClick">) => {
  const {
    default: defaultStyle,
    hover,
    active,
    disabled: disabledStyle,
  } = buttonStyles[borderStyle]
  const styleClasses = disabled ? disabledStyle : `${defaultStyle} ${hover} ${active}`

  return `${baseStyles} ${styleClasses}`.trim()
}

const Button = ({
  className,
  borderStyle,
  type = "button",
  disabled = false,
  children,
  onClick,
}: IButtonProps) => {
  const buttonClasses = getButtonClasses({ borderStyle, disabled })

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`group ${buttonClasses} ${className}`.trim()}
      disabled={disabled}
      onClick={() => {
        if (onClick) {
          return onClick()
        }
        return null
      }}
    >
      <span className={disabled ? "" : `${buttonStyles.hoveredText}`}>{children}</span>
    </button>
  )
}

export default Button
