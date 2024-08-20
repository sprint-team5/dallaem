"use server"

import { cookies } from "next/headers"

import {
  ICustomError,
  IFetchMyPageInfo,
  IGetMyMeetings,
  IGetMyPageRes,
} from "@/types/mypage/mypage"

export const getMyMeetings = async (
  options: IFetchMyPageInfo,
): Promise<IGetMyPageRes[] | string> => {
  const userToken = cookies().get("userToken")?.value
  const { limit, offset, reviewMeeting } = options
  const reviewed = reviewMeeting ? "&completed=true&reviewed=false" : ""

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings/joined?limit=${limit}&offset=${offset}${reviewed}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
    if (response.status === 401) throw new Error("Authorization 헤더가 없습니다")
    if (response.status === 400) throw new Error("limit는 최소 1이어야 합니다")
    return await response.json()
  } catch (err) {
    const error = err as ICustomError

    return error.message
  }
}

export const getMyReview = async ({ offset, limit }: IGetMyMeetings) => {
  const userToken = cookies().get("userToken")?.value
  try {
    const userResponse = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    const { id } = await userResponse.json()
    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews?userId=${id}&limit=${limit}&offset=${offset}`,
    )
    if (response.status === 400) {
      throw new Error("로그인 정보를 확인해주세요")
    }
    return await response.json()
  } catch (err) {
    const error = err as ICustomError

    return error.message
  }
}

export const getMyOwnMeeting = async ({
  offset,
  limit,
}: IGetMyMeetings): Promise<IGetMyPageRes[] | string> => {
  const userToken = cookies().get("userToken")?.value
  try {
    const userRes = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${userToken}` },
    })

    const { id } = await userRes.json()
    const response = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings?createdBy=${id}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
    if (response.status === 400) {
      throw new Error("로그인 정보를 확인해주세요")
    }
    return await response.json()
  } catch (err) {
    const error = err as ICustomError

    return error.message
  }
}

export const fetchMyPageInfo = async (options: IFetchMyPageInfo) => {
  const { fetchingKey = "myMeeting", offset, limit, isReviewed, ...args } = options
  switch (fetchingKey) {
    case "myMeeting": {
      const data = await getMyMeetings({ offset, limit, ...args })
      const hasMore = data.length > 0
      return {
        data,
        hasMore,
      }
    }
    case "myReview": {
      if (isReviewed) {
        const data = await getMyReview({ offset, limit })
        const hasMore = data.length > 0
        return {
          data,
          hasMore,
        }
      }
      const reviewMeeting = true
      const data = await getMyMeetings({ offset, limit, reviewMeeting })
      const hasMore = data.length > 0
      return {
        data,
        hasMore,
      }
    }
    case "myOwnMeeting": {
      const data = await getMyOwnMeeting({ offset, limit })
      const hasMore = data.length > 0
      return {
        data,
        hasMore,
      }
    }
    default:
      return {
        data: "잘못된 요청 종류입니다.",
        hasMore: false,
      }
  }
}
