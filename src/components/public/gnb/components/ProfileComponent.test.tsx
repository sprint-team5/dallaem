import React from "react"

import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import ProfileComponent from "./ProfileComponent"

describe("ProfileComponent", () => {
  it('로그인하지 않은 상태에서는 "로그인" 링크를 렌더링합니다', () => {
    render(<ProfileComponent isLoggedIn={false} profileImg={null} />)
    expect(screen.getByText("로그인")).toBeInTheDocument()
  })

  it("로그인한 상태에서는 프로필 버튼을 렌더링합니다", () => {
    render(<ProfileComponent isLoggedIn profileImg={null} />)
    expect(screen.getByRole("button", { name: "프로필 메뉴 열기" })).toBeInTheDocument()
  })

  it("프로필 버튼을 클릭하면 드롭다운 메뉴가 열립니다", () => {
    render(<ProfileComponent isLoggedIn profileImg={null} />)
    fireEvent.click(screen.getByRole("button", { name: "프로필 메뉴 열기" }))
    expect(screen.getByText("마이 페이지")).toBeInTheDocument()
    expect(screen.getByText("로그아웃")).toBeInTheDocument()
  })

  it("마이 페이지 버튼이 존재합니다", () => {
    render(<ProfileComponent isLoggedIn profileImg={null} />)
    fireEvent.click(screen.getByRole("button", { name: "프로필 메뉴 열기" }))
    expect(screen.getByText("마이 페이지")).toBeInTheDocument()
  })

  it.only("로그아웃 버튼이 존재합니다", () => {
    render(<ProfileComponent isLoggedIn profileImg={null} />)
    fireEvent.click(screen.getByRole("button", { name: "프로필 메뉴 열기" }))
    expect(screen.getByText("로그아웃")).toBeInTheDocument()
  })
})
