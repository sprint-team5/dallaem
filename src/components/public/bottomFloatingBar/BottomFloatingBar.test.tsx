import { useRouter } from "next/navigation"

import React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import BottomFloatingBar from "./BottomFloatingBar"

// Next.js의 useRouter를 모킹합니다.
jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(),
  }
})

// checkLogin 함수를 모킹합니다.
jest.mock("@/actions/Auths/checkLogin", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return Promise.resolve(true)
    }),
  }
})

// navigator.clipboard를 모킹합니다.
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
})

describe("BottomFloatingBar", () => {
  const mockSetHeight = jest.fn()
  const mockRouter = { push: jest.fn(), replace: jest.fn() }
  const queryClient = new QueryClient()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it("호스트가 아니고 참여하지 않았을 때 올바르게 렌더링됩니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BottomFloatingBar
          id="1"
          isHost={false}
          isJoined={false}
          limit={10}
          participant={3}
          setHeight={mockSetHeight}
        />
      </QueryClientProvider>,
    )

    expect(screen.getByText("지금 모임에 참여하세요.")).toBeInTheDocument()
    expect(screen.getByText("모임 개설확정까지 2명 남았어요!")).toBeInTheDocument()
    expect(screen.getByText("참여하기")).toBeInTheDocument()
    expect(screen.getByText("공유하기")).toBeInTheDocument()
    expect(screen.queryByText("개설취소")).not.toBeInTheDocument()
  })

  it("호스트일 때 올바르게 렌더링됩니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BottomFloatingBar
          id="1"
          isHost
          isJoined
          limit={10}
          participant={6}
          setHeight={mockSetHeight}
        />
      </QueryClientProvider>,
    )

    expect(
      screen.getByText("모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요"),
    ).toBeInTheDocument()
    expect(screen.getByText("모집 정원 마감까지 4명 남았어요!")).toBeInTheDocument()
    expect(screen.getByText("개설취소")).toBeInTheDocument()
    expect(screen.getByText("취소하기")).toBeInTheDocument()
    expect(screen.getByText("공유하기")).toBeInTheDocument()
  })

  it("참여하기 버튼이 클릭 가능합니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BottomFloatingBar
          id="1"
          isHost={false}
          isJoined={false}
          limit={10}
          participant={3}
          setHeight={mockSetHeight}
        />
      </QueryClientProvider>,
    )

    const participateButton = screen.getByText("참여하기")
    fireEvent.click(participateButton)

    expect(participateButton).toBeInTheDocument()
  })

  it("공유하기 버튼이 클릭 가능합니다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BottomFloatingBar
          id="1"
          isHost={false}
          isJoined={false}
          limit={10}
          participant={3}
          setHeight={mockSetHeight}
        />
      </QueryClientProvider>,
    )

    const shareButton = screen.getByText("공유하기")
    fireEvent.click(shareButton)

    expect(shareButton).toBeInTheDocument()
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })
})
