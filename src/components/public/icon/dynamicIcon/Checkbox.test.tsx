import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Checkbox from "./Checkbox"

jest.mock("@/public/icon/staticIcon/alarm.svg", () => {
  return "SvgrMock"
})

describe("Alarm 컴포넌트", () => {
  test("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Checkbox state="active" className="test-class" />)).not.toBeNull()
    expect(render(<Checkbox state="default" className="test-class" />)).not.toBeNull()
  })

  test("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: activeContainer } = render(
      <Checkbox state="active" className="test-class" />,
    )
    const { container: defaultContainer } = render(
      <Checkbox state="default" className="test-class" />,
    )

    expect(activeContainer.querySelector("svgrmock")).toBeInTheDocument()
    expect(defaultContainer.querySelector("svgrmock")).toBeInTheDocument()
  })
})
