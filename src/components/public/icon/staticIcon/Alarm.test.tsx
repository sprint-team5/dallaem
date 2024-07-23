import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Alarm from "./Alarm"

jest.mock("@/public/icon/staticIcon/alarm.svg", () => {
  return "SvgrMock"
})

describe("Alarm 컴포넌트", () => {
  test("Alarm SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Alarm className="test-class" />)).not.toBeNull()
  })

  test("SVG 요소가 존재하는지 검증합니다", () => {
    const { container } = render(<Alarm className="test-class" />)
    const svgElement = container.querySelector("svgrmock")
    expect(svgElement).toBeInTheDocument()
  })

  test("올바른 클래스 이름으로 렌더링 되는지 확인합니다", () => {
    const { container } = render(<Alarm className="test-class" />)
    const svgElement = container.querySelector("svgrmock")
    expect(svgElement).toHaveClass("test-class w-6 h-6 text-[#FFFFFF]")
  })

  test("SVG 요소가 div 안에 있는지 검증합니다", () => {
    const { container } = render(<Alarm className="test-class" />)
    const svgElement = container.querySelector("svgrmock")
    expect(svgElement?.parentElement?.tagName).toBe("DIV")
  })
})
