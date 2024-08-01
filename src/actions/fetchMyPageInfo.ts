"use server"

interface IGetMyMeetings {
  limit: number
  offset: number
  reviewed?: boolean
  sortBy?: "dateTime" | "registrationEnd" | "joinedAt"
  sortOrder?: "asc" | "desc"
}

interface IFetchMyPageInfo extends IGetMyMeetings {
  fetchingKey?: string
}

interface CustomErr {
  [key: string]: string
}

export interface IGetMyMeetingsRes {
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
  canceledAt: string
  joinedAt: string
}

export const getMyMeetings = async (
  options: IGetMyMeetings,
): Promise<IGetMyMeetingsRes[] | string> => {
  const { limit = 5, offset } = options
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/gatherings/joined?completed=false&reviewed=false&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJ0ZWFtNTU1IiwidXNlcklkIjo0ODUsImlhdCI6MTcyMjQ4ODUxMiwiZXhwIjoxNzIyNDkyMTEyfQ.BTF8ZH0CenRJOUsoMDaD1fo-1Ie3YKh9YMpOCFYWUuQ",
        },
      },
    )
    if (response.status === 401) throw new Error("Authorization 헤더가 없습니다")
    if (response.status === 400) throw new Error("limit는 최소 1이어야 합니다")

    return await response.json()
  } catch (err) {
    const error = err as CustomErr

    return error.message
  }
}

export const getMyReview = async (offset: number, limit: number, reviewed = false) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/gatherings/joined?limit=${limit}&offset=${offset}&completed=true&reviewed=${reviewed}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJ0ZWFtNTU1IiwidXNlcklkIjo0ODUsImlhdCI6MTcyMjQ4ODUxMiwiZXhwIjoxNzIyNDkyMTEyfQ.BTF8ZH0CenRJOUsoMDaD1fo-1Ie3YKh9YMpOCFYWUuQ",
        },
      },
    )
    if (response.status === 400) {
      throw new Error("로그인 정보를 확인해주세요")
    }
    return await response.json()
  } catch (err) {
    const error = err as CustomErr

    return error.message
  }
}

export const getMyOwnMeeting = async (
  offset: number,
  limit: number,
): Promise<IGetMyMeetingsRes[] | string> => {
  try {
    const userRes = await fetch(`${process.env.BASE_URL}/auths/user`)

    const { id } = await userRes.json()
    const response = await fetch(
      `${process.env.BASE_URL}/gatherings?createdBy=${id}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJ0ZWFtNTU1IiwidXNlcklkIjo0ODUsImlhdCI6MTcyMjQ4ODUxMiwiZXhwIjoxNzIyNDkyMTEyfQ.BTF8ZH0CenRJOUsoMDaD1fo-1Ie3YKh9YMpOCFYWUuQ",
        },
      },
    )
    if (response.status === 400) {
      throw new Error("로그인 정보를 확인해주세요")
    }
    return await response.json()
  } catch (err) {
    const error = err as CustomErr

    return error.message
  }
}

export const fetchMyPageInfo = async (options: IFetchMyPageInfo) => {
  const { fetchingKey = "myMeeting", offset, limit, reviewed, ...args } = options
  switch (fetchingKey) {
    case "myMeeting":
      return getMyMeetings({ offset, limit, ...args })
    case "myReview":
      return getMyReview(offset, limit, reviewed)
    case "myOwnMeeting":
      return getMyOwnMeeting(offset, limit)
    default:
      return "잘못된 요청 종류입니다."
  }
}
