import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Save from "./Save"

jest.mock("@/public/icon/staticIcon/alarm.svg", () => {
  return "SvgrMock"
})

describe("Alarm 컴포넌트", () => {
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

    expect(largeActiveContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(largeDiscardContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(largeInactiveContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(smallDiscardContainer.querySelector("svgrmock")).toBeInTheDocument()
  })
})
