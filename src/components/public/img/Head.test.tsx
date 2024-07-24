import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Head from "./Head"

describe("Head 컴포넌트", () => {
  it("IMG가 렌더링되는지 검증합니다", () => {
    expect(render(<Head state="class" className="test-class" />)).not.toBeNull()
    expect(render(<Head state="review" className="test-class" />)).not.toBeNull()
    expect(render(<Head state="saved" className="test-class" />)).not.toBeNull()
  })

  it("IMG 요소가 존재하는지 검증합니다", () => {
    const { container: classContainer } = render(<Head state="class" className="test-class" />)
    const { container: reviewContainer } = render(<Head state="review" className="test-class" />)
    const { container: savedContainer } = render(<Head state="saved" className="test-class" />)

    expect(classContainer.querySelector("img")).toBeInTheDocument()
    expect(reviewContainer.querySelector("img")).toBeInTheDocument()
    expect(savedContainer.querySelector("img")).toBeInTheDocument()
  })
})
