"use server"

import { IReviewProps } from "@/components/public/Review/Review"

export interface IAllReviewProps {
  gatheringId?: string
  userId?: string
  location?: string
  date?: string
  registrationEnd?: string
  sortBy?: string
  sortOrder?: string
  limit?: number
  offset?: number
}

interface IgetReviewProps extends IReviewProps {
  teamId: number
  id: number
}

const getAllReview = async ({ queryKey }: any): Promise<IgetReviewProps[]> => {
  const [, gatheringId, userId, location, date, registrationEnd, sortBy, sortOrder, limit, offset] =
    queryKey
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/reviews?gatheringId=${gatheringId}&userId=${userId}&location=${location}&date=${date}&registrationEnd=${registrationEnd}&sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&offset=${offset}`,
    )
    if (!response.ok) {
      throw new Error("서버 에러")
    }
    const data = await response.json()
    return data
  } catch (err) {
    return []
  }
}

export default getAllReview
