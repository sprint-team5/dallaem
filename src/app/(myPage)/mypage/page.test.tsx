import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import MyPage from "./page"

test("myPage load test", () => {
  render(<MyPage />)

  const testText = screen.getByText(/마이페이지/i)
  expect(testText).toBeInTheDocument()
})
