import React from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Arrow from "./Arrow"

jest.mock("@/public/icon/dynamicIcon/arrow.svg", () => {
  return SvgrMock
})

describe("Arrow 컴포넌트", () => {
  it("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Arrow state="defaultDown" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="defaultLeft" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="defaultRight" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="defaultUp" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="inverseDown" className="test-class" />)).not.toBeNull()
  })

  it("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: defaultDownContainer } = render(
      <Arrow state="defaultDown" className="test-class" />,
    )
    const { container: defaultLeftContainer } = render(
      <Arrow state="defaultLeft" className="test-class" />,
    )
    const { container: defaultRightContainer } = render(
      <Arrow state="defaultRight" className="test-class" />,
    )
    const { container: defaultUpContainer } = render(
      <Arrow state="defaultUp" className="test-class" />,
    )
    const { container: inverseDownContainer } = render(
      <Arrow state="inverseDown" className="test-class" />,
    )

    expect(defaultDownContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultLeftContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultRightContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultUpContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(inverseDownContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
  })
})
