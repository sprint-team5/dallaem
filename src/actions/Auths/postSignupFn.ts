"use server"

interface EmailExists {
  code: "EMAIL_EXISTS"
  message: string
}

interface ValidationError {
  code: "VALIDATION_ERROR"
  parameter: "email"
  message: string
}

interface SignupSuccess {
  message: string
}

interface ISignupData {
  name: string
  email: string
  companyName: string
  password: string
}

type SignupResponse = EmailExists | ValidationError | SignupSuccess

const PostSignupFn = async (signupData: ISignupData): Promise<SignupResponse> => {
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
  const data = await response.json()

  const result = {
    ...data,
    ok: response.ok,
    status: response.status,
  }

  if (result.status === 201 && result.ok) {
    return result as SignupSuccess
  }

  if (result.status !== 201 && result.code === "EMAIL_EXISTS") {
    return result as EmailExists
  }

  if (result.status !== 201 && result.code === "VALIDATION_ERROR") {
    return result as ValidationError
  }

  throw new Error(result.message)
}

export default PostSignupFn
