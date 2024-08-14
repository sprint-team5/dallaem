import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"

import Review from "./Review"

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

describe("리뷰 컴포넌트를 테스트 합니다.", () => {
  test.each([1, 2, 3, 4, 5])("score가 %i개 일때 하트가 n개", async (score) => {
    const props = {
      teamId: "team555",
      id: 304,
      userId: 488,
      gatheringId: 814,
      score: 5,
      comment: "재밌네요",
      createdAt: "2024-07-30T00:42:12.233Z",
      gathering: {
        teamId: "team555",
        id: 814,
        type: "OFFICE_STRETCHING",
        name: "모임2",
        dateTime: "2024-07-30T00:39:32.296Z",
        registrationEnd: "2024-07-30T00:37:23.034Z",
        location: "건대입구",
        participantCount: 1,
        capacity: 5,
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299746603_company.jpg",
        createdBy: 488,
        canceledAt: null,
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
      teamId: "team555",
      id: 304,
      userId: 488,
      gatheringId: 814,
      score: 5,
      comment: "재밌네요",
      createdAt: "2024-07-30T00:42:12.233Z",
      gathering: {
        teamId: "team555",
        id: 814,
        type: "OFFICE_STRETCHING",
        name: "모임2",
        dateTime: "2024-07-30T00:39:32.296Z",
        registrationEnd: "2024-07-30T00:37:23.034Z",
        location: "건대입구",
        participantCount: 1,
        capacity: 5,
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299746603_company.jpg",
        createdBy: 488,
        canceledAt: null,
      },
      user: {
        teamId: "team555",
        id: 488,
        email: "test2@test.com",
        password: "$2a$10$oS77Ad4qyJdt.TRGtEBVmebXvt0J7z7VcL/KEfOcWPYtbQn/kbAZi",
        name: "테스트",
        companyName: "테스트회사",
        image: null,
        createdAt: "2024-07-30T00:25:43.947Z",
        updatedAt: "2024-07-30T00:25:43.947Z",
        deletedAt: null,
      },
    }
    render(await Review(props))

    expect(screen.getByAltText(/유저 이미지/)).toBeInTheDocument()
  })

  test("isImage가 true면 UI가 변합니다.", async () => {
    const props = {
      teamId: "team555",
      id: 304,
      userId: 488,
      gatheringId: 814,
      score: 5,
      comment: "재밌네요",
      createdAt: "2024-07-30T00:42:12.233Z",
      gathering: {
        teamId: "team555",
        id: 814,
        type: "OFFICE_STRETCHING",
        name: "모임2",
        dateTime: "2024-07-30T00:39:32.296Z",
        registrationEnd: "2024-07-30T00:37:23.034Z",
        location: "건대입구",
        participantCount: 1,
        capacity: 5,
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1722299746603_company.jpg",
        createdBy: 488,
        canceledAt: null,
      },
      user: {
        teamId: "team555",
        id: 488,
        email: "test2@test.com",
        password: "$2a$10$oS77Ad4qyJdt.TRGtEBVmebXvt0J7z7VcL/KEfOcWPYtbQn/kbAZi",
        name: "테스트",
        companyName: "테스트회사",
        image: null,
        createdAt: "2024-07-30T00:25:43.947Z",
        updatedAt: "2024-07-30T00:25:43.947Z",
        deletedAt: null,
      },
      isImage: true,
    }
    render(await Review(props))

    expect(screen.getByAltText(/모임 이미지/)).toBeInTheDocument()
  })
})
