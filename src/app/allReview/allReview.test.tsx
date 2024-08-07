import { ReactNode } from "react"

import getQueryClient from "@/components/app/queryClient"
import SvgrMock from "@mocks/svgrMock"
import { QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import allReviewPage from "./page"

const queryClient = getQueryClient()

const intersectionObserverMock = () => {
  return {
    observe() {
      return null
    },
    disconnect() {
      return null
    },
    unobserve() {
      return null
    },
  }
}
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock)

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe("전체 리뷰 UI 테스트", () => {
  test("화면 렌더링이 잘 되고 있는지 테스트", async () => {
    render(await allReviewPage(), { wrapper })

    expect(screen.getByText(/모든 리뷰/)).toBeInTheDocument()
  })
})
