import React from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Save from "./Save"

jest.mock("@/public/icon/dynamicIcon/save_size=large_state=active.svg", () => {
  return SvgrMock
})
jest.mock("@/public/icon/dynamicIcon/save_size=large_state=discard.svg", () => {
  return SvgrMock
})
jest.mock("@/public/icon/dynamicIcon/save_size=large_state=inactive.svg", () => {
  return SvgrMock
})
jest.mock("@/public/icon/dynamicIcon/save_size=small_state=discard.svg", () => {
  return SvgrMock
})

describe("Save 컴포넌트", () => {
  test("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Save state="largeActive" className="test-class" />)).not.toBeNull()
    expect(render(<Save state="largeDiscard" className="test-class" />)).not.toBeNull()
    expect(render(<Save state="largeInactive" className="test-class" />)).not.toBeNull()
    expect(render(<Save state="smallDiscard" className="test-class" />)).not.toBeNull()
  })

  test("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: largeActiveContainer } = render(
      <Save state="largeActive" className="test-class" />,
    )
    const { container: largeDiscardContainer } = render(
      <Save state="largeDiscard" className="test-class" />,
    )
    const { container: largeInactiveContainer } = render(
      <Save state="largeInactive" className="test-class" />,
    )
    const { container: smallDiscardContainer } = render(
      <Save state="smallDiscard" className="test-class" />,
    )

    expect(largeActiveContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(largeDiscardContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(largeInactiveContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(smallDiscardContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
  })
})
