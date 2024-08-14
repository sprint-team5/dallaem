import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import Button from "./Button"

describe("Button 컴포넌트", () => {
  test("기본 렌더링 테스트", () => {
    render(
      <Button borderStyle="solid" onClick={() => {}}>
        테스트 버튼
      </Button>,
    )
    const buttonElement = screen.getByText("테스트 버튼")
    expect(buttonElement).toBeInTheDocument()
  })

  test("클릭 이벤트 테스트", () => {
    const mockOnClick = jest.fn()
    render(
      <Button borderStyle="solid" onClick={mockOnClick}>
        클릭 테스트
      </Button>,
    )
    const buttonElement = screen.getByText("클릭 테스트")
    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test("onClick 이벤트로 전달된 특정 동작 테스트", () => {
    let testValue = 0
    const specificAction = () => {
      testValue += 1
    }

    render(
      <Button borderStyle="solid" onClick={specificAction}>
        특정 동작 테스트
      </Button>,
    )

    const buttonElement = screen.getByText("특정 동작 테스트")

    expect(testValue).toBe(0) // 클릭 전 초기값 확인

    fireEvent.click(buttonElement)

    expect(testValue).toBe(1) // 클릭 후 값 변경 확인

    fireEvent.click(buttonElement)

    expect(testValue).toBe(2) // 두 번째 클릭 후 값 변경 확인
  })

  test("disabled 상태 테스트", () => {
    render(
      <Button borderStyle="solid" disabled onClick={() => {}}>
        비활성화 버튼
      </Button>,
    )
    const buttonElement = screen.getByRole("button", { name: "비활성화 버튼" })
    expect(buttonElement).toBeDisabled()
  })

  test("커스텀 클래스 적용 테스트", () => {
    render(
      <Button borderStyle="solid" onClick={() => {}} className="custom-class">
        커스텀 클래스
      </Button>,
    )
    const buttonElement = screen.getByRole("button", { name: "커스텀 클래스" })
    expect(buttonElement).toHaveClass("custom-class")
  })
})
