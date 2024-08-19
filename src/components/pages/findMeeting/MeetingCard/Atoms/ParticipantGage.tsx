"use client"

import { useEffect, useState } from "react"

const ParticipantGage = ({ now, max }: { now: number; max: number }) => {
  const [width, setWidth] = useState("0%")
  useEffect(() => {
    setWidth(`${(now / max) * 100}%`)
  }, [max, now])
  return (
    <div className="h-1 w-full rounded-full bg-orange-50">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width, transition: "all 1s ease-in-out" }}
      />
    </div>
  )
}
export default ParticipantGage
