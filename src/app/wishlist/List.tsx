"use client"

import React, { useState } from "react"

interface ICard {
  teamId: string
  id: number
  type: string
  name: string
  dateTime: string
  registrationEnd: string
  location: string
  participantCount: number
  capacity: number
  image: string
  createdBy: number
  canceledAt: any
}

const List = () => {
  const [wishlist] = useState<ICard[]>([])

  return (
    <div
      className={`mt-6 flex-1 text-sm font-medium leading-5 text-gray-500 ${wishlist.length === 0 && "flex items-center justify-center"}`}
    >
      {wishlist.length > 0 ? (
        wishlist.map((list) => {
          return (
            <div key={list.id}>
              <p>{list.name}</p>
            </div>
          )
        })
      ) : (
        <p>아직 찜한 모임이 없어요</p>
      )}
    </div>
  )
}

export default List
