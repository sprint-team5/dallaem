"use server"

interface IAddReviews {
  gatheringId: string
  score: string
  comment: string
}

interface IErrorResponse {
  code: string
  message: string
}

const addReview = async (data: IAddReviews) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJ0ZWFtNTU1IiwidXNlcklkIjo0ODUsImlhdCI6MTcyMjU4MjkxMiwiZXhwIjoxNzIyNTg2NTEyfQ.nrjqFzBazLwy9zHR2XkI3U8BPYm3gys2yNJ2lE_UrJ8",
      },
    })

    if (!response.ok) {
      const errorResponse: IErrorResponse = await response.json()
      throw new Error(errorResponse.message)
    }

    return response.status
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default addReview
