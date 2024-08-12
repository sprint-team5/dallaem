import dayjs from "dayjs"

export const isCurrentDateAfter = (date: string) => {
  return dayjs().isAfter(dayjs(date))
}

export const formatToDate = (date: string, format: string) => {
  return dayjs(date).format(format)
}
