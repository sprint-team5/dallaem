import dayjs from "dayjs"

const DateTag = ({ date }: { date: string }) => {
  const dateArr = dayjs(date).format("MM월DD일-HH:ss").split("-")
  return (
    <div className="flex gap-2">
      <span className="whitespace-nowrap rounded bg-gray-900 px-2 py-[2px] text-sm text-white">
        {dateArr[0]}
      </span>
      <span className="whitespace-nowrap rounded bg-gray-900 px-2 py-[2px] text-sm text-orange-600">
        {dateArr[1]}
      </span>
    </div>
  )
}
export default DateTag