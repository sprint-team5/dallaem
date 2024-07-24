import ReviewHeartBtn from "@/components/public/Review/ReviewHeartBtn"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"

jest.mock("@/public/icon/dynamicIcon/Heart", () => {
  return "SvgrMock"
})

describe("리뷰 하트 컴포넌트 테스트", () => {
  test("클릭시 리뷰의 n가 변동 됩니다. ", () => {
    const mockOnClick = jest.fn()
    const { getByLabelText } = render(<ReviewHeartBtn value={0} onClick={mockOnClick} />)

    for (let i = 1; i <= 5; i += 1) {
      const button = getByLabelText(`Heart ${i}`)
      fireEvent.click(button)
      expect(mockOnClick).toHaveBeenCalledTimes(i)
    }
  })
})
