"use client"

import { useState } from "react"

import Calendars from "@/components/public/Calendars/Calendars"
import Review from "@/components/public/Review"
import dayjs from "dayjs"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const Page = () => {
  const [change, setChange] = useState<Value>(new Date())

  return (
    <div>
      <Review />
      <p>{dayjs(change as Date).format("YYYY-MM-DD")}</p>
      <Calendars value={change} onChange={setChange} />
    </div>
  )
}

export default Page
