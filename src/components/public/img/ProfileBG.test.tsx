import React from "react"

import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import ProfileBG from "./ProfileBG"

describe("ProfileBG 컴포넌트", () => {
  it("IMG가 렌더링되는지 검증합니다", () => {
    expect(render(<ProfileBG className="test-class" />)).not.toBeNull()
  })

  it("IMG 요소가 존재하는지 검증합니다", () => {
    const { container } = render(<ProfileBG className="test-class" />)

    expect(container.querySelector("img")).toBeInTheDocument()
  })
})
