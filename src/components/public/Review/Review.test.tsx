import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"

import Reivew from "./Review"

jest.mock("@/public/icon/dynamicIcon/heart.svg", () => {
  return SvgrMock
})

interface IReviewProps {
  score: number
  comment: string
  createdAt: string
  Gathering: {
    teamId: number
    id: number
    name: string
    dateTime: string
    location: string
  }
  User?: {
    teamId: number
    id: number
    email: string
    name: string
  }
  image?: boolean
}

describe("리뷰 컴포넌트를 테스트 합니다.", () => {
  const defaultProps: IReviewProps = {
    score: 0,
    comment:
      "따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.",
    createdAt: "2024-07-23T01:49:11.413Z",
    Gathering: {
      teamId: 0,
      id: 0,
      name: "달램핏 오피스 스트레칭 이용",
      dateTime: "2024-07-23T01:49:11.413Z",
      location: "을지로 3가",
    },
  }

  const renderReview = (props: Partial<IReviewProps>) => {
    const { score, comment, createdAt, Gathering, User, image } = { ...defaultProps, ...props }
    render(
      <Reivew
        score={score}
        comment={comment}
        createdAt={createdAt}
        Gathering={Gathering}
        User={User}
        image={image}
      />,
    )
  }

  test.each([1, 2, 3, 4, 5])("score가 %i개 일때 하트가 n개", (score) => {
    renderReview({ score })

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

  test("유저 props가 존재하면 UI가 변합니다.", () => {
    renderReview({
      User: {
        teamId: 0,
        id: 0,
        email: "string",
        name: "string",
      },
    })

    expect(screen.getByAltText(/유저 이미지/)).toBeInTheDocument()
  })

  test("image props가 존재하면 상세정보를 통해 image 주소를 가져와서 그려줍니다.", () => {
    renderReview({ image: true })

    expect(screen.getByAltText(/모임 이미지/)).toBeInTheDocument()
  })
})
