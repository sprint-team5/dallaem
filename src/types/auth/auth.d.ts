import { ReactNode } from "react"

export interface IAuthPageProps {
  searchParams: { mode?: string }
}

export interface IAuthLayoutProps {
  children: ReactNode
}

export interface ISigninData {
  email: string
  password: string
}

export interface ISignupData extends ISigninData {
  name: string
  companyName: string
}

export interface IButtonProps extends IAuthLayoutProps {
  className?: string
  borderStyle: "solid" | "outlined"
  type?: "submit" | "reset" | "button"
  disabled?: boolean
  onClick?: () => void
}

export interface IGetClassesProps extends Pick<IButtonProps, "disabled" | "borderStyle"> {}

export interface IMessage {
  message: string
}

export interface IValidationError extends IMessage {
  code: "VALIDATION_ERROR"
  parameter: "email"
}

export interface IInvalidCredentials extends IMessage {
  code: "INVALID_CREDENTIALS"
}

export interface ILoginSuccess {
  token: string
}

export type TSigninResponse = IValidationError | IInvalidCredentials | ILoginSuccess

export interface IEmailExists extends IMessage {
  code: "EMAIL_EXISTS"
}

export type TSignupResponse = IEmailExists | IValidationError | IMessage
