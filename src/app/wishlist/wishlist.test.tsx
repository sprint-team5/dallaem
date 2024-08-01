import React from "react"

import useWishList from "@/hooks/useWishList"
import SvgrMock from "@mocks/svgrMock"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import dayjs from "dayjs"

import WishListPage from "./page"

jest.mock("@/public/icon/staticIcon/dalaemfit.svg", () => {
  return SvgrMock
})

// Mock the useWishList hook
jest.mock("../../hooks/useWishList")

const mockUseWishList = useWishList

describe("찜목록 UI 렌더링 테스트", () => {
  beforeEach(() => {
    render(<WishListPage />)
  })

  test("페이지가 잘 불러오는지 테스트", () => {
    expect(screen.getByText("찜한 모임")).toBeInTheDocument()
  })

  test("리스트가 잘 가져와지는지 테스트", () => {
    const mockWishlist = [
      {
        id: 1,
        registrationEnd: dayjs().add(1, "day").toISOString(),
        // other properties
      },
      {
        id: 2,
        registrationEnd: dayjs().subtract(1, "day").toISOString(),
        // other properties
      },
    ]

    mockUseWishList.mockReturnValue({
      filter: {
        type: "DALLAEMFIT",
        sortBy: "registrationEnd",
      },
      setFilter: jest.fn(),
      isLoading: false,
      wishlist: mockWishlist,
      onRefresh: jest.fn(),
    })
  })
})
