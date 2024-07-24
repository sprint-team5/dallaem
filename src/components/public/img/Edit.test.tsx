import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Edit from "./Edit"

describe("Edit 컴포넌트", () => {
  it("IMG가 렌더링되는지 검증합니다", () => {
    expect(render(<Edit state="small" className="test-class" />)).not.toBeNull()
    expect(render(<Edit state="large" className="test-class" />)).not.toBeNull()
  })

  it("IMG 요소가 존재하는지 검증합니다", () => {
    const { container: smallContainer } = render(<Edit state="small" className="test-class" />)
    const { container: largeContainer } = render(<Edit state="large" className="test-class" />)

    expect(smallContainer.querySelector("img")).toBeInTheDocument()
    expect(largeContainer.querySelector("img")).toBeInTheDocument()
  })
})
