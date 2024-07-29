interface IGathering {
  teamId: number
  id: number
  name: string
  dateTime: string
  location: string
}

interface IGatheringResponseError {
  code: string
  parameter: string
  message: string
}

interface IGatheringResponse {
  teamId: number
  id: number
  location: string
  type: string
  name: string
  dateTime: string
  registrationEnd: string
  participantCount: number
  capacity: number
  image: string
  createdBy: number
  canceledAt: string
}

const getGenerateMeetImage = async (gathering: IGathering) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/gatherings/${gathering.id}`)

    if (!response.ok) {
      const json: IGatheringResponseError = await response.json()
      throw new Error(json.message)
    }

    const json: IGatheringResponse = await response.json()
    return json.image
  } catch (err) {
    throw new Error(err as string)
  }
}

export default getGenerateMeetImage
