"use server"

interface IAddReviews {
  gatheringId: number
  score: number
  comment: string
}

interface IErrorResponse {
  code: string
  message: string
}

const addReview = async (data: IAddReviews) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJ0ZWFtNTU1IiwidXNlcklkIjo0ODUsImlhdCI6MTcyMjU3MTQxMiwiZXhwIjoxNzIyNTc1MDEyfQ.ty2kuW_hQRLbh5PiCpNYC860SerI1EzRGOJxXyQCWME",
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
