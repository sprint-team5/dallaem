import React from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Checkbox from "./Checkbox"

jest.mock("@/public/icon/dynamicIcon/checkbox.svg", () => {
  return SvgrMock
})

describe("Alarm 컴포넌트", () => {
  it("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Checkbox state="active" className="test-class" />)).not.toBeNull()
    expect(render(<Checkbox state="default" className="test-class" />)).not.toBeNull()
  })

  it("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: activeContainer } = render(
      <Checkbox state="active" className="test-class" />,
    )
    const { container: defaultContainer } = render(
      <Checkbox state="default" className="test-class" />,
    )

    expect(activeContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
  })
})