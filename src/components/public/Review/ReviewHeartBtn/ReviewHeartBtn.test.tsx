import React, { useState } from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import ReviewHeartBtn from "./ReviewHeartBtn"
import styles from "./ReviewHeartBtn.module.scss"

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

describe("리뷰 하트 컴포넌트 테스트", () => {
  describe("렌더링 테스트", () => {
    const mockOnClick = jest.fn()

    beforeEach(() => {
      render(<ReviewHeartBtn value={0} setter={mockOnClick} />)
    })

    test("버튼이 렌더링이 잘 되는지 테스트", () => {
      for (let i = 1; i <= 5; i += 1) {
        expect(screen.queryByLabelText(`Heart ${i}`)).toBeInTheDocument()
      }
    })
  })

  describe("동작 테스트", () => {
    const TestComponent = () => {
      const [value, setValue] = useState(0)
      return (
        <>
          <div>{value}</div>
          <ReviewHeartBtn value={value} setter={setValue} />
        </>
      )
    }

    beforeEach(() => {
      render(<TestComponent />)
    })

    test.each([1, 2, 3, 4, 5])("%i번째 버튼을 클릭하면 value가 %i으로 변동 테스트", (value) => {
      const heartButtons = screen.getAllByRole("button", { name: /Heart/i })

      fireEvent.click(heartButtons[value - 1])

      expect(screen.getByText(value)).toBeInTheDocument()
    })

    test("클릭으로 애니메이션이 잘 동작하는지 테스트", () => {
      const heartButtons = screen.getAllByRole("button", { name: /Heart/i })

      fireEvent.click(heartButtons[1])

      // 두 번째 하트 버튼이 active 클래스를 가지고 있는지 확인합니다.
      const activeHeart = screen.getByLabelText("Heart 2").querySelector(`.${styles.active}`)

      // 두 번째 하트가 활성화되었는지 확인합니다.
      waitFor(() => {
        expect(activeHeart).toBeInTheDocument()
      })
    })
  })
})
