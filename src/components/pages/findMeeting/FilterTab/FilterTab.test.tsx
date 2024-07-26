import { useState } from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import FilterTab from "./FilterTab"

jest.mock("@/public/icon/staticIcon/Dalaemfit.svg", () => {
  return SvgrMock
})
jest.mock("@/public/icon/staticIcon/Workation.svg", () => {
  return SvgrMock
})

const { getByText } = screen

describe("FilterTab Component Rendering Test", () => {
  beforeEach(() => {
    render(<FilterTab selVal="DALLAEMFIT" onSelect={() => {}} />)
  })

  test("렌더링이 잘 되는지 테스트", () => {
    expect(getByText("달램핏")).toBeInTheDocument()
    expect(getByText("워케이션")).toBeInTheDocument()
    expect(getByText("전체")).toBeInTheDocument()
    expect(getByText("오피스 스트레칭")).toBeInTheDocument()
    expect(getByText("마인드풀니스")).toBeInTheDocument()
  })
})

describe("FilterTab Component Function Test", () => {
  const MyComponent = () => {
    const [tab, setTab] = useState("DALLAEMFIT")
    const onSelectHandler = (
      e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      const target = e.target as HTMLButtonElement
      setTab(target.value)
    }
    return <FilterTab selVal={tab} onSelect={onSelectHandler} />
  }

  beforeEach(() => {
    render(<MyComponent />)
  })

  test("옵션 선택 시 부모요소와 버튼의 상태가 변경되는지 테스트", () => {
    const buttons = screen.getAllByRole("button")
    if (buttons.length !== 5) throw new Error("buttons are not rendered correctly")

    // 순서대로 달램핏 -> 전체 -> 오피스 스트레칭 -> 마인드풀니스 -> 워케이션 버튼 클릭
    fireEvent.click(buttons[0])
    expect(buttons[0]).toHaveClass("active")
    expect(buttons[2]).toHaveClass("bg-gray-900")
    fireEvent.click(buttons[2])
    expect(buttons[0]).toHaveClass("active")
    expect(buttons[2]).toHaveClass("bg-gray-900")
    fireEvent.click(buttons[3])
    expect(buttons[0]).toHaveClass("active")
    expect(buttons[2]).not.toHaveClass("bg-gray-900")
    expect(buttons[3]).toHaveClass("bg-gray-900")
    fireEvent.click(buttons[1])
    expect(buttons[1]).toHaveClass("active")
  })
})
