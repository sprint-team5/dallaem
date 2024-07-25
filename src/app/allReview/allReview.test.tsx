import SvgrMock from "@mocks/svgrMock"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import AllReviewsPage from "./page"

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

describe("모든 리뷰 렌더링 테스트", () => {
  test("모든 리뷰 페이지가 렌더링 되는지 테스트 합니다.", async () => {
    const { getByText } = render(<AllReviewsPage />)

    expect(getByText(/모든 리뷰/)).toBeInTheDocument()
  })
})
