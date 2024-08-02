import { useRouter } from "next/navigation"

import React from "react"

import { usePostSignup } from "@/actions/api-hooks/Auths"
import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import SignupForm from "./SignupForm"

// useRouter와 usePostSignup 훅 모킹
jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  }
})

jest.mock("@/actions/api-hooks/Auths", () => {
  return {
    usePostSignup: jest.fn(() => {
      jest.fn((data, options) => {
        if (options && options.onSuccess) {
          options.onSuccess()
        }
      })
    }),
    error: null,
  }
})

// svg 모킹
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

// InputField 모킹
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

// Button 모킹
jest.mock("@/components/public/button/Button", () => {
  return jest.fn(({ children, disabled }) => {
    return (
      <button type="submit" disabled={disabled}>
        {children}
      </button>
    )
  })
})

describe("SignupForm", () => {
  const mockRouter = {
    replace: jest.fn(),
  }
  const mockSignup = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(usePostSignup as jest.Mock).mockReturnValue({
      mutate: mockSignup,
      error: null,
    })
  })

  it("기본 렌더링 테스트", () => {
    render(<SignupForm />)

    expect(screen.getByText("회원가입")).toBeInTheDocument()
    expect(screen.getByText("이름")).toBeInTheDocument()
    expect(screen.getByText("아이디")).toBeInTheDocument()
    expect(screen.getByText("회사명")).toBeInTheDocument()
    expect(screen.getByText("비밀번호")).toBeInTheDocument()
    expect(screen.getByText("비밀번호 확인")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument()
    expect(screen.getByText("로그인")).toBeInTheDocument()
  })

  it("폼이 비어있을 때 버튼 비활성화 유무 테스트", () => {
    render(<SignupForm />)

    const submitButton = screen.getByRole("button", { name: "확인" })
    expect(submitButton).toBeDisabled()
  })

  it("폼이 채워지면 버튼 활성화 유무 테스트", async () => {
    render(<SignupForm />)

    const nameInput = screen.getByTestId("mocked-input-name")
    const emailInput = screen.getByTestId("mocked-input-email")
    const companyNameInput = screen.getByTestId("mocked-input-companyName")
    const passwordInput = screen.getByTestId("mocked-input-password")
    const passwordConfirmInput = screen.getByTestId("mocked-input-passwordConfirm")
    const submitButton = screen.getByRole("button", { name: "확인" })

    fireEvent.change(nameInput, { target: { value: "김창민" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(companyNameInput, { target: { value: "CODEIT" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(passwordConfirmInput, { target: { value: "password123" } })

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it("signin 함수 호출 및 응답 성공 테스트", async () => {
    render(<SignupForm />)

    const nameInput = screen.getByTestId("mocked-input-name")
    const emailInput = screen.getByTestId("mocked-input-email")
    const companyNameInput = screen.getByTestId("mocked-input-companyName")
    const passwordInput = screen.getByTestId("mocked-input-password")
    const passwordConfirmInput = screen.getByTestId("mocked-input-passwordConfirm")
    const submitButton = screen.getByRole("button", { name: "확인" })

    fireEvent.change(nameInput, { target: { value: "김창민" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(companyNameInput, { target: { value: "CODEIT" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(passwordConfirmInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          password: "password123",
          name: "김창민",
          companyName: "CODEIT",
        },
        expect.any(Object),
      )
    })
  })

  it("실패 에러 메시지 표시 유무 테스트", async () => {
    const errorMessage = "로그인에 실패했습니다."
    ;(usePostSignup as jest.Mock).mockReturnValue({
      mutate: mockSignup,
      error: { message: errorMessage },
    })

    render(<SignupForm />)

    expect(screen.getByText(`※ ${errorMessage}`)).toBeInTheDocument()
  })
})
