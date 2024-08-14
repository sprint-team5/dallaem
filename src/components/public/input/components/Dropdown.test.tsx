import React from "react"

import "@testing-library/jest-dom"
import { fireEvent, render, screen, within } from "@testing-library/react"

import Dropdown from "./Dropdown"

// Arrow 컴포넌트 모킹
jest.mock("@public/icon/dynamicIcon/arrow.svg", () => {
  return {
    __esModule: true,
    default: ({ className }: { className: string }) => {
      return <div data-testid="arrow-icon" className={className} />
    },
  }
})

describe("Dropdown 컴포넌트", () => {
  const mockOptions = ["옵션1", "옵션2", "옵션3"]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("기본 렌더링 테스트", () => {
    render(
      <Dropdown options={mockOptions} name="test" iconBaseStyles="" placeholder="testMessage" />,
    )
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument()
    expect(screen.getByText("testMessage")).toBeInTheDocument()
  })

  it("baseStyle 적용 테스트", () => {
    const baseStyles = "test-base-style"
    render(<Dropdown options={mockOptions} name="test" iconBaseStyles="" baseStyles={baseStyles} />)
    expect(screen.getByRole("button")).toHaveClass(baseStyles)
  })

  it("iconBaseStyles 적용 테스트", () => {
    const iconBaseStyles = "test-icon-style"
    render(<Dropdown options={mockOptions} name="test" iconBaseStyles={iconBaseStyles} />)
    expect(screen.getByTestId("arrow-icon")).toHaveClass(iconBaseStyles)
  })

  it("options 적용 테스트", () => {
    render(<Dropdown options={mockOptions} name="test" iconBaseStyles="" />)
    fireEvent.click(screen.getByRole("button"))
    const listbox = screen.getByRole("listbox")
    mockOptions.forEach((option) => {
      expect(within(listbox).getByText(option)).toBeInTheDocument()
    })
  })

  it("드롭다운 메뉴 option 클릭 테스트", () => {
    render(<Dropdown options={mockOptions} name="test" iconBaseStyles="" />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    fireEvent.click(screen.getByText("옵션3"))
    fireEvent.blur(button)

    expect(screen.getByRole("button")).toHaveTextContent("옵션3")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("useOutsideClick 동작 테스트", () => {
    render(<Dropdown options={mockOptions} name="test" iconBaseStyles="" />)
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
