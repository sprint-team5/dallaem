import React from "react"

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import Textarea from "./Textarea"

describe("Textarea 컴포넌트", () => {
  it("placeholder가 올바르게 렌더링되는지 확인", () => {
    render(<Textarea placeholder="입력 테스트" />)
    const textareaElement = screen.getByPlaceholderText("입력 테스트")
    expect(textareaElement).toBeInTheDocument()
  })

  it("추가 className이 적용되는지 확인", () => {
    const additionalClass = "custom-class"
    render(<Textarea placeholder="클래스 테스트" className={additionalClass} />)
    const textareaElement = screen.getByPlaceholderText("클래스 테스트")
    expect(textareaElement).toHaveClass(additionalClass)
  })
})
