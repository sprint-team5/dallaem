import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("적용 테스트2", () => {
  test("적용 테스트1", () => {
    render(<Page />)
    const docs = screen.getByText(/초기화/i)
    expect(docs).toBeInTheDocument()
  })
})
