"use client"

const baseStyles =
  "flex flex-col items-center justify-center whitespace-nowrap rounded-xl font-semibold"

const buttonStyles = {
  solid: {
    default: "bg-[#EA580C] text-white",
    hover: "hover:bg-[#C2410C]",
    active: "active:bg-[#9A3412]",
    disabled: "bg-[#9CA3AF] text-white",
  },
  outlined: {
    default: "border-[#EA580C] border-[1px] text-[#EA580C]",
    hover: "hover:border-[#C2410C] hover:border-[1px] hover:text-[#C2410C]",
    active: "active:border-[#9A3412] active:border-[1px] active:text-[#9A3412]",
    disabled: "border-[#9CA3AF] border-[1px] text-[#9CA3AF]",
  },
}

const sizeStyles = {
  small: "h-10 w-[120px] py-[6px]",
  large: "h-12 w-[332px] py-[10px]",
}

interface IButtonProps {
  className?: string
  borderStyle: "solid" | "outlined"
  size: "small" | "large"
  disabled?: boolean
  children: React.ReactNode
  onClick: () => void
}

const getButtonClasses = ({
  borderStyle,
  size,
  disabled,
}: Omit<IButtonProps, "className" | "children" | "onClick">) => {
  const {
    default: defaultStyle,
    hover,
    active,
    disabled: disabledStyle,
  } = buttonStyles[borderStyle]
  const styleClasses = disabled ? disabledStyle : `${defaultStyle} ${hover} ${active}`

  return `${baseStyles} ${styleClasses} ${sizeStyles[size]}`.trim()
}

const Button = ({
  className,
  borderStyle,
  size,
  disabled = false,
  children,
  onClick,
}: IButtonProps) => {
  const buttonClasses = getButtonClasses({ borderStyle, size, disabled })

  return (
    <button
      type="button"
      className={`${buttonClasses} ${className}`.trim()}
      disabled={disabled}
      onClick={() => {
        return onClick()
      }}
    >
      {children}
    </button>
  )
}

export default Button
