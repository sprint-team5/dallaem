const baseStyles =
  "h-30 w-full resize-none overflow-y-auto rounded-xl bg-[#F9FAFB] px-4 py-[10px] font-medium text-[#1F2937] placeholder-[#9CA3AF]"

interface ITextareaProps {
  className?: string
  placeholder: string
}

const Textarea = ({ className, placeholder }: ITextareaProps) => {
  return <textarea className={`${baseStyles} ${className}`} rows={4} placeholder={placeholder} />
}

export default Textarea
