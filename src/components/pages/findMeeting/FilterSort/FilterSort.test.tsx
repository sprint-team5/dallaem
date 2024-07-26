import { useState } from "react"

import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import FilterSort from "./FilterSort"

jest.mock("@/public/icon/dynamicIcon/sort.svg", () => {
  return SvgrMock
})

const { getByRole } = screen

describe("Filter Component Rendering Test", () => {
  beforeEach(() => {
    render(<FilterSort onSelect={() => {}} selVal="registrationEnd" />)
  })

  test("렌더링이 잘 되는지 테스트", () => {
    const buttonRoles = screen.getAllByRole("button")
    const labelBtn = buttonRoles.find((button) => {
      return button.tagName.toLowerCase() === "div"
    }) as HTMLDivElement
    expect(labelBtn).toBeInTheDocument()
  })

  test("클릭으로 옵션창이 열리고 닫히는지 테스트", () => {
    const buttonRoles = screen.getAllByRole("button")
    const labelBtn = buttonRoles.find((button) => {
      return button.tagName.toLowerCase() === "div"
    }) as HTMLDivElement

    const listbox = getByRole("listbox")
    expect(listbox).toHaveClass("max-h-0")
    fireEvent.click(labelBtn)
    expect(listbox).not.toHaveClass("max-h-0")
    fireEvent.click(labelBtn)
    expect(listbox).toHaveClass("max-h-0")
  })

  test("키보드로 옵션창이 열리고 닫히는지 테스트", () => {
    const buttonRoles = screen.getAllByRole("button")
    const labelBtn = buttonRoles.find((button) => {
      return button.tagName.toLowerCase() === "div"
    }) as HTMLDivElement

    const listbox = getByRole("listbox")
    expect(listbox).toHaveClass("max-h-0")
    fireEvent.keyDown(labelBtn, { key: "Enter", code: "Enter" })
    expect(listbox).not.toHaveClass("max-h-0")
    fireEvent.keyDown(labelBtn, { key: "Enter", code: "Enter" })
    expect(listbox).toHaveClass("max-h-0")
  })
})

describe("Filter Component Function Test", () => {
  const MyComponent = () => {
    const [sort, setSort] = useState("registrationEnd")
    const onSelectHandler = (
      e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      const target = e.target as HTMLButtonElement
      setSort(target.value)
    }
    return <FilterSort onSelect={onSelectHandler} selVal={sort} />
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
    expect(label.textContent).toBe("마감 임박 순")
    fireEvent.click(label)

    const options = buttonRoles.filter((button) => {
      return button.tagName.toLowerCase() === "button"
    })
    if (options.length === 0) throw new Error("options are not found")
    fireEvent.click(options[2])
    expect(label.textContent).not.toBe("마감 임박 순")
  })
})
