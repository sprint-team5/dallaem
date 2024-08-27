import { ReactNode, act } from "react"

import { CountProvider } from "@/provider/CountProvider"
import SvgrMock from "@mocks/svgrMock"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import WishListPage from "./page"

const queryClient = new QueryClient()

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

jest.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        prefetch: () => {
          return null
        },
      }
    },
    usePathname: () => {
      return jest.fn()
    },
  }
})

const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

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
    type: "MINDFULNESS",
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
    render(
      <CountProvider>
        <WishListPage />
      </CountProvider>,
      { wrapper },
    )
    expect(screen.getByText("찜한 모임")).toBeInTheDocument()
  })

  test("localStorage에서 리스트를 잘 불러오는지 테스트", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(list))

    await act(async () => {
      render(
        <CountProvider>
          <WishListPage />
        </CountProvider>,
        { wrapper },
      )
    })

    expect(screen.getByText(/7월 30일 마감 7월 29일 모집/)).toBeInTheDocument()
    expect(screen.getByText(/8월 4일 마감 7월 30일 모집/)).toBeInTheDocument()
    expect(screen.queryByText(/8월 2일 마감 8월 1일 모집/)).not.toBeInTheDocument()
  })

  test("오피스 스트레칭을 클릭하고 데이터 refetch가 잘 되는지 테스트", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(list))

    await act(async () => {
      render(
        <CountProvider>
          <WishListPage />
        </CountProvider>,
        { wrapper },
      )
    })

    fireEvent.click(screen.getByRole("button", { name: /달램핏/ }))
    fireEvent.click(screen.getByRole("button", { name: /오피스 스트레칭/ }))

    expect(screen.queryByText(/7월 30일 마감 7월 29일 모집/)).not.toBeInTheDocument()
    expect(screen.getByText(/8월 4일 마감 7월 30일 모집/)).toBeInTheDocument()
    expect(screen.queryByText(/8월 2일 마감 8월 1일 모집/)).not.toBeInTheDocument()
  })

  test("마인드풀니스를 클릭하고 데이터 refetch가 잘 되는지 테스트", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(list))

    await act(async () => {
      render(
        <CountProvider>
          <WishListPage />
        </CountProvider>,
        { wrapper },
      )
    })

    fireEvent.click(screen.getByRole("button", { name: /달램핏/ }))
    fireEvent.click(screen.getByRole("button", { name: /마인드풀니스/ }))

    expect(screen.getByText(/7월 30일 마감 7월 29일 모집/)).toBeInTheDocument()
    expect(screen.queryByText(/8월 4일 마감 7월 30일 모집/)).not.toBeInTheDocument()
    expect(screen.queryByText(/8월 2일 마감 8월 1일 모집/)).not.toBeInTheDocument()
  })

  test("워케이션을 클릭하고 데이터 refetch가 잘 되는지 테스트", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(list))

    await act(async () => {
      render(
        <CountProvider>
          <WishListPage />
        </CountProvider>,
        { wrapper },
      )
    })

    fireEvent.click(screen.getByRole("button", { name: /워케이션/ }))

    expect(screen.queryByText(/7월 30일 마감 7월 29일 모집/)).not.toBeInTheDocument()
    expect(screen.queryByText(/8월 4일 마감 7월 30일 모집/)).not.toBeInTheDocument()
    expect(screen.getByText(/8월 2일 마감 8월 1일 모집/)).toBeInTheDocument()
  })

  test("리스트에 아무것도 없을 경우", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([]))

    await act(async () => {
      render(
        <CountProvider>
          <WishListPage />
        </CountProvider>,
        { wrapper },
      )
    })

    expect(screen.getByText("아직 찜한 모임이 없어요")).toBeInTheDocument()
  })
})
