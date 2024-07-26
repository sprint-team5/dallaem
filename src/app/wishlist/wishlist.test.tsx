import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import WishListPage from "./page"

describe("찜목록 UI 렌더링 테스트", () => {
  test("페이지가 잘 불러오는지 테스트", () => {
    render(<WishListPage />)

    expect(screen.getByText("찜한 모임")).toBeInTheDocument()
  })
})
