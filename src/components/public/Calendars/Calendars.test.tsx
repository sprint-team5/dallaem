import SvgrMock from "@mocks/svgrMock"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import Calendars from "./Calendars"

jest.mock("@/public/icon/dynamicIcon/arrow.svg", () => {
  return SvgrMock
})

describe("캘린더 컴포넌트 테스트", () => {
  test("캘린더 원하는 날짜 클릭시 값 잘 가져오는지", () => {
    const onDateChange = jest.fn()

    render(<Calendars onChange={onDateChange} />)
    fireEvent.click(screen.getByText("15"))
    expect(onDateChange).toHaveBeenCalled()
  })

  test("연도가 화면에 잘 나오는지 테스트", () => {
    render(<Calendars value={new Date(2024, 6, 23)} />)
    expect(screen.getByText("July 2024")).toBeInTheDocument()
  })
})
