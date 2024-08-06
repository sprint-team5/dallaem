import React from "react"

import useGetUserData from "@/hooks/useGetUserData"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import HeadContent from "./HeadContent"

// useGetUserData 모킹
jest.mock("@/hooks/useGetUserData")
jest.mock("react-intersection-observer", () => {
  return {
    useInView: () => {
      return [null, true]
    },
  }
})

// 모킹된 useGetUserData의 타입 정의
const mockedUseGetUserData = useGetUserData as jest.MockedFunction<typeof useGetUserData>

// QueryClient 설정
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

describe("HeadContent", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("헤드 텍스트 렌더링 테스트", () => {
    mockedUseGetUserData.mockReturnValue({ data: null } as any)
    renderWithQueryClient(<HeadContent userToken={undefined} />)

    expect(screen.getByText(/당신의 관심사/)).toBeInTheDocument()
    expect(screen.getByText(/5분 만에 모임으로 만들어보세요!/)).toBeInTheDocument()
    expect(
      screen.getByText(/취미부터 스터디까지, 원하는 모든 모임을 손쉽게 만들 수 있는 곳/),
    ).toBeInTheDocument()
  })

  it('비로그인 시 "로그인 하러가기" 버튼 렌더링 테스트', () => {
    mockedUseGetUserData.mockReturnValue({ data: null } as any)
    renderWithQueryClient(<HeadContent userToken={undefined} />)

    expect(screen.getByText("로그인 하러가기")).toBeInTheDocument()
  })

  it('로그인 시 "내 모임 보러가기" 버튼 렌더링 테스트', () => {
    mockedUseGetUserData.mockReturnValue({ data: { name: "Test User" } } as any)
    renderWithQueryClient(<HeadContent userToken="test-token" />)

    expect(screen.getByText("내 모임 보러가기")).toBeInTheDocument()
  })

  it('"모임 둘러보기" 버튼 렌더링 테스트', () => {
    mockedUseGetUserData.mockReturnValue({ data: null } as any)
    renderWithQueryClient(<HeadContent userToken={undefined} />)

    expect(screen.getByText("모임 둘러보기")).toBeInTheDocument()
  })
})
