import { useMemo } from "react"

import { IScoreReview } from "@/actions/getScoreReview"

const useScoreCalculation = (scoreData: IScoreReview[] | undefined) => {
  return useMemo(() => {
    if (!scoreData || scoreData.length === 0) {
      return { allScore: 0, maxScore: 0, ratings: [] }
    }
    const score = scoreData[0]
    const { oneStar, twoStars, threeStars, fourStars, fiveStars } = score

    const allReviewLength = oneStar + twoStars + threeStars + fourStars + fiveStars

    const totalScore = 5 * fiveStars + 4 * fourStars + 3 * threeStars + 2 * twoStars + 1 * oneStar

    const allScore = Number((totalScore / allReviewLength).toFixed(1))
    const maxScore = Math.max(oneStar, twoStars, threeStars, fourStars, fiveStars) + 5
    const ratings = [
      { rating: 5, count: fiveStars },
      { rating: 4, count: fourStars },
      { rating: 3, count: threeStars },
      { rating: 2, count: twoStars },
      { rating: 1, count: oneStar },
    ]

    return { allScore, maxScore, ratings }
  }, [scoreData])
}

export default useScoreCalculation
