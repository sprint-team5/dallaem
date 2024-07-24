import React from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Logo from "./Logo"

jest.mock("@/public/img/logo_small.svg", () => {
  return SvgrMock
})

describe("Logo 컴포넌트", () => {
  it("SVG가 렌더링되는지 검증합니다", () => {
    expect(render(<Logo state="small" className="test-class" />)).not.toBeNull()
    expect(render(<Logo state="large" className="test-class" />)).not.toBeNull()
  })

  it("SVG 요소가 존재하는지 검증합니다", () => {
    const { container: defaultDownContainer } = render(
      <Logo state="small" className="test-class" />,
    )
    const { container: defaultLeftContainer } = render(
      <Logo state="large" className="test-class" />,
    )

    expect(defaultDownContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
    expect(defaultLeftContainer.querySelector('[data-testid="mocked-svg"]')).toBeInTheDocument()
  })
})
