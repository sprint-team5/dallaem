import Checkbox from "@/components/public/icon/dynamicIcon/Checkbox"

const SelectServiceButton = ({
  category,
  detail,
  state,
  type,
  onClick,
}: {
  category: string
  detail: string
  state: boolean
  type: string
  onClick: (type: string) => void
}) => {
  return (
    <button
      type="button"
      className={`rounded-lg p-3 ${state ? "bg-gray-900" : "bg-gray-50"}`}
      onClick={() => {
        onClick(type)
      }}
    >
      <div className="flex h-full items-start gap-[3px]">
        <Checkbox state={state ? "active" : "default"} />
        <div className={`flex flex-col items-start ${state ? "text-white" : "text-gray-900"}`}>
          <span className="font-semibold">{category}</span>
          <div className={`text-xs ${state ? "text-white" : "text-gray-700"}`}>{detail}</div>
        </div>
      </div>
    </button>
  )
}

export default SelectServiceButton
