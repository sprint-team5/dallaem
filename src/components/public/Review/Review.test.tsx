import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"

import Review from "./Review"

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

describe("리뷰 컴포넌트를 테스트 합니다.", () => {
  const server = setupServer(
    rest.get(`${process.env.BASE_URL}/:teamId/gatherings/:teamId`, (req, res, ctx) => {
      return res(
        ctx.json({
          teamId: "1",
          id: 807,
          type: "OFFICE_STRETCHING",
          name: "모임1",
          dateTime: "2024-07-31T09:06:16.184Z",
          registrationEnd: "2024-07-25T09:06:16.184Z",
          location: "건대입구",
          participantCount: 0,
          capacity: 20,
          image:
            "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1721639349302_test.jpg",
          createdBy: 482,
          canceledAt: null,
        }),
      )
    }),
  )

  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  test.each([1, 2, 3, 4, 5])("score가 %i개 일때 하트가 n개", async (score) => {
    const props = {
      score: 0,
      comment: "커맨드",
      createdAt: "2024-07-31T09:06:16.184Z",
      gathering: {
        teamId: 0,
        id: 0,
        name: "모입1",
        dateTime: "2024-07-31T09:06:16.184Z",
        location: "서울",
      },
    }
    render(await Review(props))

    const hearts = screen.getAllByTestId("scoreHeart")

    expect(hearts).toHaveLength(5)

    hearts.forEach((heart, index) => {
      const heartState = index < score ? "text-[#EA580C]" : "text-[#E5E7EB]"

      waitFor(() => {
        const svg = heart.querySelector("svg")
        expect(svg).toHaveClass(heartState)
      })
    })
  })

  test("유저 props가 존재하면 UI가 변합니다.", async () => {
    const props = {
      score: 0,
      comment: "커맨드",
      createdAt: "2024-07-31T09:06:16.184Z",
      gathering: {
        teamId: 0,
        id: 0,
        name: "모입1",
        dateTime: "2024-07-31T09:06:16.184Z",
        location: "서울",
      },
      user: {
        teamId: 0,
        id: 0,
        email: "string",
        name: "string",
      },
    }
    render(await Review(props))

    expect(screen.getByAltText(/유저 이미지/)).toBeInTheDocument()
  })

  test("image props가 존재하면 상세정보를 통해 image 주소를 가져와서 그려줍니다.", async () => {
    const props = {
      score: 0,
      comment: "커맨드",
      createdAt: "2024-07-31T09:06:16.184Z",
      gathering: {
        teamId: 0,
        id: 0,
        name: "모입1",
        dateTime: "2024-07-31T09:06:16.184Z",
        location: "서울",
      },
      image: true,
    }
    render(await Review(props))

    expect(await screen.findByAltText(/모임 이미지/)).toBeInTheDocument()
  })
})
