"use client"

import { MouseEventHandler } from "react"

import Heart from "@/components/public/icon/dynamicIcon/Heart"

import styles from "./ReviewHeartBtn.module.scss"

interface IReviewHeartBtnProps {
  value: number
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const ReviewHeartBtn = ({ value, onClick }: IReviewHeartBtnProps) => {
  const getHeartClass = (index: number) => {
    return `absolute left-0 top-0 transition-all duration-[800ms] ${styles.heart} ${value > index ? `${styles.active}` : ""}`
  }

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <button
            className={`relative ${styles.heartBtn}`}
            key={`Heart ${index + 1}`}
            type="button"
            onClick={onClick}
            aria-label={`Heart ${index + 1}`}
          >
            <Heart state="default" />
            <Heart
              state="active"
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`${getHeartClass(index)}`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default ReviewHeartBtn
