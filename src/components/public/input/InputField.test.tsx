import React from "react"

import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import InputField from "./InputField"

// svg 컴포넌트 mock
jest.mock(
  "@public/icon/staticIcon/visibility_off.svg",
  () => {
    return {
      __esModule: true,
      default: ({ onClick }: { onClick: () => void }) => {
        return (
          <button onClick={onClick} data-testid="visibility-off-icon" type="button">
            VisibilityOff
          </button>
        )
      },
    }
  },
  { virtual: true },
)

jest.mock(
  "@public/icon/staticIcon/visibility_on.svg",
  () => {
    return {
      __esModule: true,
      default: ({ onClick }: { onClick: () => void }) => {
        return (
          <button onClick={onClick} data-testid="visibility-on-icon" type="button">
            VisibilityOn
          </button>
        )
      },
    }
  },
  { virtual: true },
)

describe("InputField 컴포넌트", () => {
  test("기본 렌더링 테스트", () => {
    render(<InputField size="small" inputType="input" placeholder="테스트 입력" />)

    const inputElement = screen.getByPlaceholderText("테스트 입력")
    expect(inputElement).toBeInTheDocument()
    // 기본값이 password인지 테스트
    expect(inputElement).toHaveAttribute("type", "password")
  })

  test("size 적용 테스트", () => {
    const { rerender } = render(<InputField size="small" inputType="input" placeholder="" />)
    const smallInput = screen.getByPlaceholderText("")
    expect(smallInput).toHaveClass("h-10")

    rerender(<InputField size="large" inputType="input" placeholder="" />)
    const largeInput = screen.getByPlaceholderText("")
    expect(largeInput).toHaveClass("h-11")
  })

  it("password visibility 테스트", () => {
    const mockOnChange = jest.fn()
    render(
      <InputField
        size="small"
        inputType="input"
        onChange={mockOnChange}
        placeholder=""
        isPassword
      />,
    )

    const inputElement = screen.getByPlaceholderText("") as HTMLInputElement

    // 초기 type이 password인지 확인
    expect(inputElement.type).toBe("password")

    // 입력값 변경
    fireEvent.change(inputElement, { target: { value: "testPassword" } })
    expect(mockOnChange).toHaveBeenCalledWith("testPassword")

    // visibility 토글 버튼 찾기
    const visibilityToggleButton = screen.getByRole("button")
    expect(visibilityToggleButton).toBeInTheDocument()

    // visibility 토글 (password -> text)
    fireEvent.click(visibilityToggleButton)
    expect(inputElement.type).toBe("text")

    // visibility 토글 (text -> password)
    const visibilityToggleButton2 = screen.getByRole("button")
    fireEvent.click(visibilityToggleButton2)
    expect(inputElement.type).toBe("password")
  })

  test("errorMessage 테스트", () => {
    const errorMessage = "This field is required"
    render(<InputField size="small" inputType="input" errorMessage={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test("onBlur 발생 시 done 상태가 추가되는지 테스트", () => {
    render(<InputField size="small" inputType="input" placeholder="" />)

    const inputElement = screen.getByPlaceholderText("") as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: "test" } })
    fireEvent.blur(inputElement)
    expect(inputElement).toHaveClass("border-[#1F2937]")
  })
})
