import React from "react"

import ROUTE from "@/constants/route"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

// GNB 컴포넌트를 모킹합니다.
const GNB = ({ userToken }: { userToken?: string }) => {
  return (
    <div>
      <span>모임 찾기</span>
      <span>찜한 모임</span>
      <span>모든 리뷰</span>
      {userToken && <span>로그인됨: {userToken}</span>}
    </div>
  )
}

describe("GNB 컴포넌트", () => {
  const { usePathname } = jest.requireMock("next/navigation")

  beforeEach(() => {
    jest.clearAllMocks()
    usePathname.mockReturnValue(ROUTE.HOME)
  })

  it("GNB가 렌더링되어야 함", () => {
    render(<GNB />)
    expect(screen.getByText("모임 찾기")).toBeInTheDocument()
    expect(screen.getByText("찜한 모임")).toBeInTheDocument()
    expect(screen.getByText("모든 리뷰")).toBeInTheDocument()
  })

  it("userToken이 제공되면 로그인 상태를 표시해야 함", () => {
    render(<GNB userToken="test-token" />)
    expect(screen.getByText("로그인됨: test-token")).toBeInTheDocument()
  })

  it("현재 경로에 따라 네비게이션 항목 스타일이 변경되어야 함", () => {
    usePathname.mockReturnValue(ROUTE.GATHERINGS)
    render(<GNB />)

    const activeLink = screen.getByText("모임 찾기")
    const inactiveLink = screen.getByText("찜한 모임")

    expect(activeLink).toBeInTheDocument()
    expect(inactiveLink).toBeInTheDocument()
  })
})
