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
    render(
      <InputField
        label="test"
        name="test"
        type="text"
        size="small"
        inputType="input"
        placeholder="테스트 입력"
      />,
    )

    const inputElement = screen.getByPlaceholderText("테스트 입력")
    expect(inputElement).toBeInTheDocument()
  })

  test("size 적용 테스트", () => {
    const { rerender } = render(
      <InputField
        label="test"
        name="test"
        type="text"
        size="small"
        inputType="input"
        placeholder=""
      />,
    )
    const smallInput = screen.getByPlaceholderText("")
    expect(smallInput).toHaveClass("h-10")

    rerender(
      <InputField
        label="test"
        name="test"
        type="text"
        size="large"
        inputType="input"
        placeholder=""
      />,
    )
    const largeInput = screen.getByPlaceholderText("")
    expect(largeInput).toHaveClass("h-11")
  })

  it("password visibility 테스트", () => {
    render(
      <InputField
        label="test"
        name="test"
        type="password"
        size="small"
        inputType="input"
        placeholder=""
      />,
    )

    const inputElement = screen.getByPlaceholderText("") as HTMLInputElement

    // 초기 type이 password인지 확인
    expect(inputElement.type).toBe("password")

    // visibility 토글 버튼 찾기
    const visibilityToggleButton = screen.getByText("VisibilityOn")
    expect(visibilityToggleButton).toBeInTheDocument()

    // visibility 토글 (password -> text)
    fireEvent.click(visibilityToggleButton)
    expect(inputElement.type).toBe("text")

    // visibility 토글 (text -> password)
    const visibilityToggleButton2 = screen.getByText("VisibilityOn")
    fireEvent.click(visibilityToggleButton2)
    expect(inputElement.type).toBe("password")
  })

  test("errorMessage 테스트", () => {
    const errorSample = {
      type: "error",
      message: "This field is required",
    }

    render(
      <InputField
        label="test"
        name="test"
        type="text"
        size="small"
        inputType="input"
        error={errorSample}
        placeholder=""
      />,
    )
    expect(screen.getByText("This field is required")).toBeInTheDocument()
  })
})
