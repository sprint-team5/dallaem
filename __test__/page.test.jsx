import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import Page from "../src/app/page"

// react-spring의 애니메이션을 모킹합니다.
jest.mock("@react-spring/web", () => ({
  useSpring: () => ({}),
  animated: {
    h1: "h1",
    h2: "h2",
    div: "div",
  },
}))

// react-intersection-observer를 모킹합니다.
jest.mock("react-intersection-observer", () => ({
  useInView: () => [null, true],
}))

describe("Home 페이지 테스트", () => {
  beforeEach(() => {
    render(<Page />)
  })

  test("메인 제목이 올바르게 렌더링되는지 확인", () => {
    const mainTitle = screen.getByText(/당신의 관심사/i)
    expect(mainTitle).toBeInTheDocument()
    expect(screen.getByText(/5분만에 모임으로 만들어보세요!/i)).toBeInTheDocument()
  })

  test("부제목이 올바르게 렌더링되는지 확인", () => {
    const subTitle = screen.getByText(
      /취미부터 스터디까지, 원하는 모든 모임을 손쉽게 만들 수 있는 곳/i,
    )
    expect(subTitle).toBeInTheDocument()
  })

  test("로그인 버튼이 존재하는지 확인", () => {
    const loginButton = screen.getByText(/로그인 하러가기/i)
    expect(loginButton).toBeInTheDocument()
  })

  test("모임 둘러보기 버튼이 존재하는지 확인", () => {
    const browseButton = screen.getByText(/모임 둘러보기/i)
    expect(browseButton).toBeInTheDocument()
  })
})
