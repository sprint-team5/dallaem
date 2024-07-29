import { useState } from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import FilterCalendar from "./FilterCalendar"

jest.mock("@/public/icon/dynamicIcon/arrow.svg", () => {
  return SvgrMock
})

const { getByText, getByRole } = screen

describe("Filter Component Rendering Test", () => {
  beforeEach(() => {
    render(<FilterCalendar placeholder="날짜 선택" onChange={() => {}} selVal="" />)
  })

  test("렌더링이 잘 되는지 테스트", () => {
    expect(getByText("날짜 선택")).toBeInTheDocument()
  })

  test("클릭으로 옵션창이 열리고 닫히는지 테스트", () => {
    const listbox = getByRole("listbox")
    expect(listbox).toHaveClass("max-h-0")
    fireEvent.click(getByText("날짜 선택"))
    expect(listbox).not.toHaveClass("max-h-0")
    fireEvent.click(getByText("날짜 선택"))
    expect(listbox).toHaveClass("max-h-0")
  })

  test("키보드로 옵션창이 열리고 닫히는지 테스트", () => {
    const listbox = getByRole("listbox")
    expect(listbox).toHaveClass("max-h-0")
    fireEvent.keyDown(getByText("날짜 선택"), { key: "Enter", code: "Enter" })
    expect(listbox).not.toHaveClass("max-h-0")
    fireEvent.keyDown(getByText("날짜 선택"), { key: "Enter", code: "Enter" })
    expect(listbox).toHaveClass("max-h-0")
  })
})

describe("Filter Component Function Test", () => {
  const MyComponent = () => {
    const [loc, setLoc] = useState("")
    const onSelectHandler = (e: string) => {
      setLoc(e)
    }
    return <FilterCalendar placeholder="날짜 선택" onChange={onSelectHandler} selVal={loc} />
  }

  beforeEach(() => {
    render(<MyComponent />)
  })

  test("옵션 선택 시 부모요소의 값과 label 값이 변경되는지 테스트", () => {
    const buttonRoles = screen.getAllByRole("button")
    const label = buttonRoles.find((button) => {
      return button.tagName.toLowerCase() === "div"
    })
    if (!label) throw new Error("label is not found")
    expect(label.textContent).toBe("날짜 선택")
    fireEvent.click(getByText("날짜 선택"))

    const calendarButton = screen.getByText("15").closest("button")
    fireEvent.click(calendarButton as Element)
    expect(label.textContent).not.toBe("날짜 선택")
  })
})