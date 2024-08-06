"use server"

const getParticipants = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/${process.env.TEAM_ID}/gatherings/${id}/participants`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    if (!res.ok) throw new Error("HTTP ERROR OCCURED")
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error as string)
  }
}

export default getParticipants
