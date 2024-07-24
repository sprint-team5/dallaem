"use client"

const baseStyles =
  "flex flex-col items-center justify-center whitespace-nowrap rounded-xl font-semibold"

const buttonStyles = {
  solid: {
    default: "bg-[#EA580C] text-white",
    hover: "bg-[#C2410C] text-white",
    click: "bg-[#9A3412] text-white",
    disabled: "bg-[#9CA3AF] text-white",
  },
  outlined: {
    default: "border-[#EA580C] border-[1px] text-[#EA580C]",
    hover: "border-[#C2410C] border-[1px] text-[#C2410C]",
    click: "border-[#9A3412] border-[1px] text-[#9A3412]",
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
  state: "default" | "hover" | "click"
  disabled?: boolean
  children: React.ReactNode
  onClick: () => void
}

const getButtonClasses = ({
  borderStyle,
  size,
  state,
  disabled,
}: Omit<IButtonProps, "className" | "children" | "onClick">) => {
  const style = disabled ? "disabled" : state

  return ` ${baseStyles} ${buttonStyles[borderStyle][style]} ${sizeStyles[size]}`
}

const Button = ({
  className,
  borderStyle,
  size,
  state,
  disabled = false,
  children,
  onClick,
}: IButtonProps) => {
  const buttonClasses = getButtonClasses({ borderStyle, size, state, disabled })

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
