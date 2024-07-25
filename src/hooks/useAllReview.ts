import { IReviewProps } from "@/components/public/Review/Review"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

interface IgetReviewProps extends IReviewProps {
  teamId: number
  id: number
}

const getAllReviwe = async (): Promise<IgetReviewProps[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/1/reviews`)
  return response.json()
}

export const allReviewOptions = queryOptions({
  queryKey: ["allReview"],
  queryFn: getAllReviwe,
})

export const useAllReview = () => {
  const { data: reviews } = useSuspenseQuery(allReviewOptions)

  return { reviews }
}
