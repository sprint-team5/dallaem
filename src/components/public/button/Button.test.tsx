import React from "react"

import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import Button from "./Button"

describe("Button 컴포넌트", () => {
  test("기본 렌더링 테스트", () => {
    render(
      <Button borderStyle="solid" size="small" state="default" onClick={() => {}}>
        테스트 버튼
      </Button>,
    )
    const buttonElement = screen.getByText("테스트 버튼")
    expect(buttonElement).toBeInTheDocument()
  })

  test("클릭 이벤트 테스트", () => {
    const mockOnClick = jest.fn()
    render(
      <Button borderStyle="solid" size="small" state="default" onClick={mockOnClick}>
        클릭 테스트
      </Button>,
    )
    const buttonElement = screen.getByText("클릭 테스트")
    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test("disabled 상태 테스트", () => {
    render(
      <Button borderStyle="solid" size="small" state="default" disabled onClick={() => {}}>
        비활성화 버튼
      </Button>,
    )
    const buttonElement = screen.getByText("비활성화 버튼")
    expect(buttonElement).toBeDisabled()
  })

  test("커스텀 클래스 적용 테스트", () => {
    render(
      <Button
        borderStyle="solid"
        size="small"
        state="default"
        onClick={() => {}}
        className="custom-class"
      >
        커스텀 클래스
      </Button>,
    )
    const buttonElement = screen.getByText("커스텀 클래스")
    expect(buttonElement).toHaveClass("custom-class")
  })
})
