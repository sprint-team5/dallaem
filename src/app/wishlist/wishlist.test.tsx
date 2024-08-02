import React, { act } from "react"

import SvgrMock from "@mocks/svgrMock"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import WishListPage from "./page"

jest.mock("@/public/icon/staticIcon/dalaemfit.svg", () => {
  return SvgrMock
})

jest.mock("@/components/public/Spinner/Spinner", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="mocked-spinner">Mocked Spinner</div>
    },
  }
})

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, "localStorage", { value: mockLocalStorage })

const list = [
  {
    teamId: "team555",
    id: 812,
    type: "OFFICE_STRETCHING",
    name: "7월 30일 마감 7월 29일 모집",
    dateTime: "2024-07-29T00:35:02.081Z",
    registrationEnd: "2024-07-30T00:34:06.748Z",
    location: "건대입구",
    participantCount: 1,
    capacity: 5,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299673565_company.jpg",
    createdBy: 488,
    canceledAt: null,
    wish: true,
  },
  {
    teamId: "team555",
    id: 815,
    type: "OFFICE_STRETCHING",
    name: "8월 4일 마감 7월 30일 모집",
    dateTime: "2024-07-30T00:35:02.081Z",
    registrationEnd: "2024-08-04T00:34:06.748Z",
    location: "을지로3가",
    participantCount: 4,
    capacity: 5,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299673565_company.jpg",
    createdBy: 488,
    canceledAt: null,
    wish: true,
  },
  {
    teamId: "team555",
    id: 817,
    type: "WORKATION",
    name: "8월 2일 마감 8월 1일 모집",
    dateTime: "2024-08-01T00:35:02.081Z",
    registrationEnd: "2024-08-02T00:34:06.748Z",
    location: "홍대입구",
    participantCount: 6,
    capacity: 5,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299673565_company.jpg",
    createdBy: 488,
    canceledAt: null,
    wish: true,
  },
]

describe("찜목록 UI 렌더링 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("페이지가 잘 불러와지는지 테스트", () => {
    render(<WishListPage />)
    expect(screen.getByText("찜한 모임")).toBeInTheDocument()
  })

  test("localStorage에서 리스트를 잘 불러오는지 테스트", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(list))

    await act(async () => {
      render(<WishListPage />)
    })
    expect(screen.getByText("7월 30일 마감 7월 29일 모집")).toBeInTheDocument()
    expect(screen.getByText("8월 4일 마감 7월 30일 모집")).toBeInTheDocument()
    expect(screen.getByText("8월 2일 마감 8월 1일 모집")).not.toBeInTheDocument()
  })

  /* 
  

  test("리스트가 아무것도 없을 경우", () => {
    ;(useWishList as jest.Mock).mockReturnValue({
      filter: { type: "DALLAEMFIT", sortBy: "registrationEnd" },
      setFilter: jest.fn(),
      isLoading: false,
      wishlist: [],
      onRefresh: jest.fn(),
    })

    render(<WishListPage />)

    expect(screen.getByText("아직 찜한 모임이 없어요")).toBeInTheDocument()
  })
     */
})

/* 
  test("리스트가 잘 가져와지는지 테스트", () => {
    render(<WishListPage />)
    const { wishlist } = useWishList()
    expect(wishlist).toEqual(list)
  })

  test("워케이션을 누르면 워케이션 리스트만 잘 가져오는지 테스트", () => {
    render(<WishListPage />)

    fireEvent.click(screen.getByRole("button", { name: /워케이션/ }))

    const { wishlist } = useWishList()
    expect(wishlist).toEqual([
      {
        teamId: "team555",
        id: 817,
        type: "WORKATION",
        name: "8월 2일 마감 8월 1일 모집",
        dateTime: "2024-08-01T00:35:02.081Z",
        registrationEnd: "2024-08-02T00:34:06.748Z",
        location: "홍대입구",
        participantCount: 6,
        capacity: 5,
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299673565_company.jpg",
        createdBy: 488,
        canceledAt: null,
        wish: true,
      },
    ])
  })

  
*/
