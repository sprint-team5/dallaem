import React from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Sort from "./Sort"

jest.mock("@/public/icon/staticIcon/alarm.svg", () => {
  return SvgrMock
})

describe("Sort 컴포넌트", () => {
  test("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Sort state="default" className="test-class" />)).not.toBeNull()
    expect(render(<Sort state="inverse" className="test-class" />)).not.toBeNull()
  })

  test("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: inverseContainer } = render(<Sort state="inverse" className="test-class" />)
    const { container: defaultContainer } = render(<Sort state="default" className="test-class" />)

    expect(inverseContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
  })
})
