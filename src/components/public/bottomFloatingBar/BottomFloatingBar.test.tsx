import React from "react"

import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import BottomFloatingBar from "./BottomFloatingBar"

describe("BottomFloatingBar", () => {
  it("호스트가 아닐 때 올바르게 렌더링됩니다", () => {
    render(<BottomFloatingBar isHost={false} />)

    expect(screen.getByText("더 건강한 나와 팀을 위한 프로그램 🏃‍️️")).toBeInTheDocument()
    expect(
      screen.getByText("국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요"),
    ).toBeInTheDocument()
    expect(screen.getByText("참여하기")).toBeInTheDocument()
    expect(screen.queryByText("취소하기")).not.toBeInTheDocument()
  })

  it("호스트일 때 올바르게 렌더링됩니다", () => {
    render(<BottomFloatingBar isHost />)

    expect(screen.getByText("더 건강한 나와 팀을 위한 프로그램 🏃‍️️")).toBeInTheDocument()
    expect(
      screen.getByText("모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요"),
    ).toBeInTheDocument()
    expect(screen.getByText("공유하기")).toBeInTheDocument()
    expect(screen.getByText("취소하기")).toBeInTheDocument()
  })

  it("참여하기 버튼이 클릭 가능합니다", () => {
    const mockOnClickParticipate = jest.fn()
    jest.spyOn(React, "useState").mockImplementation(() => {
      return [false, jest.fn()]
    })
    jest.spyOn(React, "useRef").mockReturnValue({ current: null })

    render(<BottomFloatingBar isHost={false} />)

    const participateButton = screen.getByText("참여하기")
    fireEvent.click(participateButton)

    expect(mockOnClickParticipate).toHaveBeenCalledTimes(0)
  })

  it("공유하기와 취소하기 버튼이 클릭 가능합니다", () => {
    const mockOnClickShare = jest.fn()
    const mockOnClickCancel = jest.fn()
    jest.spyOn(React, "useState").mockImplementation(() => {
      return [false, jest.fn()]
    })
    jest.spyOn(React, "useRef").mockReturnValue({ current: null })

    render(<BottomFloatingBar isHost />)

    const shareButton = screen.getByText("공유하기")
    const cancelButton = screen.getByText("취소하기")

    fireEvent.click(shareButton)
    fireEvent.click(cancelButton)

    expect(mockOnClickShare).toHaveBeenCalledTimes(0)
    expect(mockOnClickCancel).toHaveBeenCalledTimes(0)
  })
})
