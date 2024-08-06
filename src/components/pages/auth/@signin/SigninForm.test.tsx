import { useRouter } from "next/navigation"

import React from "react"

import usePostSignin from "@/hooks/usePostSignin"
import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import SigninForm from "./SigninForm"

// 모킹
jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  }
})

jest.mock("@/hooks/usePostSignin")

jest.mock("@/components/public/icon/staticIcon/VisibilityOff", () => {
  return {
    __esModule: true,
    default: () => {
      return <svg data-testid="visibility-off-icon" />
    },
  }
})

jest.mock("@/components/public/icon/staticIcon/VisibilityOn", () => {
  return {
    __esModule: true,
    default: () => {
      return <svg data-testid="visibility-on-icon" />
    },
  }
})

jest.mock("@/components/public/input/InputField", () => {
  return jest.fn(({ label, name, type, placeholder, register }) => {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          data-testid={`mocked-input-${name}`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(register && register(name))}
        />
      </div>
    )
  })
})

jest.mock("@/components/public/button/Button", () => {
  return jest.fn(({ children, disabled }) => {
    return (
      <button type="submit" disabled={disabled}>
        {children}
      </button>
    )
  })
})

describe("SigninForm", () => {
  const mockRouter = {
    replace: jest.fn(),
  }
  const mockSignin = jest.fn()
  const mockUsePostSignin = usePostSignin as jest.MockedFunction<typeof usePostSignin>

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    mockUsePostSignin.mockReturnValue({
      mutate: mockSignin,
      error: null,
    } as any)
  })

  it("기본 렌더링 테스트", () => {
    render(<SigninForm />)

    expect(screen.getByText("로그인")).toBeInTheDocument()
    expect(screen.getByText("아이디")).toBeInTheDocument()
    expect(screen.getByText("비밀번호")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument()
    expect(screen.getByText("회원가입")).toBeInTheDocument()
  })

  it("폼이 비어있을 때 버튼 비활성화 유무 테스트", () => {
    render(<SigninForm />)

    const submitButton = screen.getByRole("button", { name: "확인" })
    expect(submitButton).toBeDisabled()
  })

  it("폼이 채워지면 버튼 활성화 유무 테스트", async () => {
    render(<SigninForm />)

    const emailInput = screen.getByTestId("mocked-input-email")
    const passwordInput = screen.getByTestId("mocked-input-password")
    const submitButton = screen.getByRole("button", { name: "확인" })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it("signin 함수 호출 및 응답 성공 테스트", async () => {
    render(<SigninForm />)

    const emailInput = screen.getByTestId("mocked-input-email")
    const passwordInput = screen.getByTestId("mocked-input-password")
    const submitButton = screen.getByRole("button", { name: "확인" })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalledWith(
        { email: "test@example.com", password: "password123" },
        expect.any(Object),
      )
    })
  })

  it("실패 에러 메시지 표시 유무 테스트", () => {
    const errorMessage = "로그인에 실패했습니다."
    mockUsePostSignin.mockReturnValue({
      mutate: mockSignin,
      error: { message: errorMessage },
    } as any)

    render(<SigninForm />)

    expect(screen.getByText(`※ ${errorMessage}`)).toBeInTheDocument()
  })
})
