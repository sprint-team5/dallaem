"use server"

// 다양한 response 타입 선언
import {
  IInvalidCredentials,
  ILoginSuccess,
  ISigninData,
  IValidationError,
  TSigninResponse,
} from "@/types/auth/auth"

const PostSigninFn = async (signinData: ISigninData): Promise<TSigninResponse> => {
  const response = await fetch(`${process.env.BASE_URL}/${process.env.TEAM_ID}/auths/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signinData),
  })
  const data = await response.json()

  const result = {
    ...data,
    ok: response.ok,
    status: response.status,
  }

  // 로그인 성공 시 LoginSuccess로 타입 단언
  if (result.status === 200 && result.ok) {
    return result as ILoginSuccess
  }

  // 이메일 유효성 검사 에러 발생 시 ValidationError로 타입 단언
  if (result.status !== 200 && result.code === "VALIDATION_ERROR") {
    return result as IValidationError
  }

  // 비밀번호 유효성 검사 에러 발생 시 InvalidCredentials로 타입 단언
  if (result.status !== 200 && result.code === "INVALID_CREDENTIALS") {
    return result as IInvalidCredentials
  }

  // 아무 조건에도 충족되지 않는 새로운 에러가 발생한 경우 새로운 에러로 에러 메시지를 전달한다.
  throw new Error(result.message)
}

export default PostSigninFn
