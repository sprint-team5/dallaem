import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Arrow from "./Arrow"

jest.mock("@/public/icon/staticIcon/alarm.svg", () => {
  return "SvgrMock"
})

describe("Alarm 컴포넌트", () => {
  test("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Arrow state="defaultDown" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="defaultLeft" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="defaultRight" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="defaultUp" className="test-class" />)).not.toBeNull()
    expect(render(<Arrow state="inverseDown" className="test-class" />)).not.toBeNull()
  })

  test("SVG 요소가 존재하는지 검증합니다", () => {
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

    expect(defaultDownContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(defaultLeftContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(defaultRightContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(defaultUpContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(inverseDownContainer.querySelector("svgrmock")).toBeInTheDocument()
  })
})
