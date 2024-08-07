import React from "react"

import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import ProfileComponent from "./ProfileComponent"

// 외부 의존성 모킹
jest.mock("next/navigation", () => {
  return {
    useRouter: () => {
      return {
        push: jest.fn(),
      }
    },
  }
})

describe("ProfileComponent", () => {
  it("로그인하지 않은 상태에서 로그인 링크를 렌더링합니다", () => {
    render(<ProfileComponent isLoggedIn={false} profileImg={null} />)
    expect(screen.getByText("로그인")).toBeInTheDocument()
  })

  it("로그인한 상태에서 프로필 이미지를 렌더링합니다", () => {
    render(<ProfileComponent isLoggedIn profileImg={null} />)
    expect(screen.getByLabelText("프로필 메뉴 열기")).toBeInTheDocument()
  })

  it("프로필 버튼 클릭 시 드롭다운 메뉴를 토글합니다", () => {
    render(<ProfileComponent isLoggedIn profileImg={null} />)
    const profileButton = screen.getByLabelText("프로필 메뉴 열기")

    fireEvent.click(profileButton)
    expect(screen.getByText("마이 페이지")).toBeInTheDocument()
    expect(screen.getByText("로그아웃")).toBeInTheDocument()

    fireEvent.click(profileButton)
    expect(screen.queryByText("마이 페이지")).not.toBeInTheDocument()
    expect(screen.queryByText("로그아웃")).not.toBeInTheDocument()
  })
})
