import SvgrMock from "@mocks/svgrMock.jsx"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import dayjs from "dayjs"

import Card from "./Card"

jest.mock("@/public/icon/dynamicIcon/checkbox.svg", () => {
  return SvgrMock
})

jest.mock("@/public/icon/dynamicIcon/person.svg", () => {
  return SvgrMock
})

describe("Card 컴포넌트 테스트", () => {
  // 임의적으로 넣은 props
  const defaultProps = {
    teamId: "1",
    id: 4,
    name: "string",
    dateTime: "2024-07-22T07:34:00.350Z",
    location: "string",
    participantCount: 0,
    capacity: 0,
    image: "",
    registrationEnd: "2024-07-25T09:06:16.184Z",
  }

  describe("렌더링 테스트", () => {
    test("이미지 전달이 잘되었을 경우 테스트", () => {
      // given - image props 전달

      const props = {
        ...defaultProps,
        image: "/img/profile_small_default.png",
      }

      const { getByAltText } = render(
        <Card
          teamId={props.teamId}
          id={props.id}
          name={props.name}
          dateTime={props.dateTime}
          location={props.location}
          participantCount={props.participantCount}
          capacity={props.capacity}
          image={props.image}
          registrationEnd={props.registrationEnd}
        />,
      )

      expect(getByAltText("모임 이미지 1 4")).toBeInTheDocument()
    })

    test("모집 마감 날짜가 지나지 않았다면 이용 예정과 예약 취소하기가 나오는지 테스트", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        registrationEnd: dayjs().add(1, "days").toISOString(),
      }

      const { getByText } = render(
        <Card
          teamId={props.teamId}
          id={props.id}
          name={props.name}
          dateTime={props.dateTime}
          location={props.location}
          participantCount={props.participantCount}
          capacity={props.capacity}
          image={props.image}
          registrationEnd={props.registrationEnd}
        />,
      )

      // then - 이용 예정가 화면에 그려짐
      expect(getByText("이용 예정")).toBeInTheDocument()
    })

    test("모집 마감 날짜가 지났다면 이용 완료와 리뷰 작성하기가 나오는지 테스트", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        registrationEnd: dayjs().subtract(1, "days").toISOString(),
      }

      const { getByText } = render(
        <Card
          teamId={props.teamId}
          id={props.id}
          name={props.name}
          dateTime={props.dateTime}
          location={props.location}
          participantCount={props.participantCount}
          capacity={props.capacity}
          image={props.image}
          registrationEnd={props.registrationEnd}
        />,
      )

      // then - 이용 완료가 화면에 그려짐
      expect(getByText("이용 완료")).toBeInTheDocument()
    })

    test("참여 인원이 5명 미만일 경우 개설 대기가 화면에 보입니다.", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        participantCount: 0,
        registrationEnd: dayjs().add(1, "days").toISOString(),
      }

      const { getByText } = render(
        <Card
          teamId={props.teamId}
          id={props.id}
          name={props.name}
          dateTime={props.dateTime}
          location={props.location}
          participantCount={props.participantCount}
          capacity={props.capacity}
          image={props.image}
          registrationEnd={props.registrationEnd}
        />,
      )

      // then - 이용 완료가 화면에 그려짐
      expect(getByText("개설대기")).toBeInTheDocument()
    })

    test("참여 인원이 5명 이상일 경우 개설 완료가 화면에 보입니다.", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        participantCount: 6,
        registrationEnd: dayjs().add(1, "days").toISOString(),
      }

      const { getByText } = render(
        <Card
          teamId={props.teamId}
          id={props.id}
          name={props.name}
          dateTime={props.dateTime}
          location={props.location}
          participantCount={props.participantCount}
          capacity={props.capacity}
          image={props.image}
          registrationEnd={props.registrationEnd}
        />,
      )

      // then - 이용 완료가 화면에 그려짐
      expect(getByText(/개설확정/)).toBeInTheDocument()
    })
  })
})
