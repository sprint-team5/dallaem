import React from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Heart from "./Heart"

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

describe("Heart 컴포넌트", () => {
  test("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Heart state="active" className="test-class" />)).not.toBeNull()
    expect(render(<Heart state="default" className="test-class" />)).not.toBeNull()
  })

  test("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: activeContainer } = render(<Heart state="active" className="test-class" />)
    const { container: defaultContainer } = render(<Heart state="default" className="test-class" />)

    expect(activeContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
  })
})
