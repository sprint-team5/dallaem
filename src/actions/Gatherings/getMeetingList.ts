"use server"

import { IFilterOption } from "@/types/findMeeting/findMeeting"
import { convertParamsToQueryString } from "@/util/fetchParameterParser"

const getMeetingList = async (params: IFilterOption) => {
  try {
    const query = convertParamsToQueryString(params)
    const res = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) throw new Error("HTTP ERROR OCCURED")
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error as string)
  }
}

export default getMeetingList
