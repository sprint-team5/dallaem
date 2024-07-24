import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Profile from "./Profile"

describe("Profile 컴포넌트", () => {
  it("IMG가 렌더링되는지 검증합니다", () => {
    expect(render(<Profile state="smallDefault" className="test-class" />)).not.toBeNull()
    expect(render(<Profile state="largeDefault" className="test-class" />)).not.toBeNull()
    expect(render(<Profile state="largeEdit" className="test-class" />)).not.toBeNull()
  })

  it("IMG 요소가 존재하는지 검증합니다", () => {
    const { container: smallDefaultContainer } = render(
      <Profile state="smallDefault" className="test-class" />,
    )
    const { container: largeDefaultContainer } = render(
      <Profile state="largeDefault" className="test-class" />,
    )
    const { container: largeEditContainer } = render(
      <Profile state="largeEdit" className="test-class" />,
    )

    expect(smallDefaultContainer.querySelector("img")).toBeInTheDocument()
    expect(largeDefaultContainer.querySelector("img")).toBeInTheDocument()
    expect(largeEditContainer.querySelector("img")).toBeInTheDocument()
  })
})
