import dayjs from "dayjs"

export const isCurrentDateAfter = (date: string) => {
  return dayjs().isAfter(dayjs(date))
}

export const formatToDate = ({ date, format }: { date?: string; format: string }) => {
  return dayjs(date).format(format)
}

export const msTransform = (date: string) => {
  return dayjs(date).unix()
}
