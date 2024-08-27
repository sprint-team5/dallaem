import React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"

import ReviewPreview from "./ReviewPreview"

// getAllReview 모킹
jest.mock("@/actions/Reviews/getAllReviews", () => {
  return {
    __esModule: true,
    default: jest.fn().mockResolvedValue([
      {
        User: { name: "Test User", image: null },
        Gathering: { location: "Test Location" },
        score: 4,
        comment: "Test comment",
      },
    ]),
  }
})

// useInView 모킹
jest.mock("react-intersection-observer", () => {
  return {
    useInView: () => {
      return [null, true]
    },
  }
})

// useSpring 모킹
jest.mock("@react-spring/web", () => {
  return {
    animated: {
      div: "div",
    },
    useSpring: () => {
      return {}
    },
  }
})

// heart 컴포넌트 모킹
jest.mock("@/components/public/icon/dynamicIcon/Heart", () => {
  return function MockHeart() {
    return <div data-testid="heart-icon" />
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe("ReviewPreview", () => {
  beforeEach(() => {
    queryClient.clear()
  })

  it("메인 헤더 렌더링 테스트", async () => {
    renderWithQueryClient(<ReviewPreview />)
    expect(screen.getByText("다음은 모임 이용자들의 실제 후기입니다.")).toBeInTheDocument()
  })

  it("유저 정보 렌더링 테스트", async () => {
    renderWithQueryClient(<ReviewPreview />)
    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument()
      expect(screen.getByText("Test Location")).toBeInTheDocument()
    })
  })

  it("comment 렌더링 테스트", async () => {
    renderWithQueryClient(<ReviewPreview />)
    await waitFor(() => {
      expect(screen.getByText("Test comment")).toBeInTheDocument()
    })
  })

  it("score 렌더링 테스트", async () => {
    renderWithQueryClient(<ReviewPreview />)
    await waitFor(() => {
      const heartIcons = screen.getAllByTestId("scoreHeart")
      expect(heartIcons).toHaveLength(5)
    })
  })
})
