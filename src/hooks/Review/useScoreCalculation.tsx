import { useMemo } from "react"

import {
  IReviewScoreReturn,
  TReviewScoreRatings,
  TuseScoreCalculation,
} from "@/types/review/review"

const reviewSum = (score: number[]) => {
  return score.reduce((ac, cur) => {
    return ac + cur
  }, 0)
}

const totalScore = (score: number[]) => {
  return score.reduce((ac, cur, index) => {
    return ac + cur * (index + 1)
  }, 0)
}

// 진행바가 끝까지 안차게끔 5를 더 대입
const maxScore = (score: number[]) => {
  return Math.max(...score) + 5
}

const ratings = (score: number[]) => {
  return score
    .reduce((ac: TReviewScoreRatings[], cur, index): TReviewScoreRatings[] => {
      return [...ac, { rating: index + 1, count: cur }]
    }, [])
    .sort((a, b) => {
      return b.rating - a.rating
    })
}

const calculation = (score: number[]): IReviewScoreReturn => {
  return {
    allScore: (totalScore(score) / reviewSum(score)).toFixed(1),
    maxScore: maxScore(score),
    ratings: ratings(score),
  }
}

const useScoreCalculation = (scoreData: TuseScoreCalculation) => {
  return useMemo(() => {
    if (!scoreData || scoreData.length === 0) {
      return { allScore: 0, maxScore: 0, ratings: [] }
    }
    const { oneStar, twoStars, threeStars, fourStars, fiveStars } = scoreData[0]
    const score = [oneStar, twoStars, threeStars, fourStars, fiveStars]
    return calculation(score)
  }, [scoreData])
}

export default useScoreCalculation
