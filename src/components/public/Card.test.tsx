import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import dayjs from "dayjs"

import Card from "./Card"

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

  describe("UI 테스트", () => {
    test("모집 마감 날짜가 지나지 않았다면 이용 예정이 화면에 그려줍니다.", () => {
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

    test("모집 마감 날짜가 지났다면 이용 완료가 화면에 그려집니다.", () => {
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
      expect(getByText("(체크 아이콘) 개설확정")).toBeInTheDocument()
    })
  })

  describe("예약 취소 버튼 API 연결 X", () => {
    test("예약 취소에 실패하였을경우", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        registrationEnd: dayjs().add(1, "days").toISOString(),
      }

      const { getByRole } = render(
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

      // when - 모집 마감 날짜가 지나지 않았다면 예약 취소하기 버튼이 화면에 그려짐
      expect(getByRole("button", { name: /예약 취소하기/ })).toBeInTheDocument()

      // then - 오류가 발생했을때
    })

    test("성공 했을 경우", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        registrationEnd: dayjs().add(1, "days").toISOString(),
      }

      const { getByRole } = render(
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

      // when - 모집 마감 날짜가 지나지 않았다면 예약 취소하기 버튼이 화면에 그려짐
      expect(getByRole("button", { name: /예약 취소하기/ })).toBeInTheDocument()

      // then - 성공 했을때
    })
  })

  describe("리뷰 작성 버튼 테스트 API 연결 X", () => {
    test("실패 했을 경우", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        registrationEnd: dayjs().subtract(1, "days").toISOString(),
      }

      const { getByRole } = render(
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

      // when - 모집 마감 날짜가 지났다면 리뷰 작성하기 버튼이 화면에 그려짐
      expect(getByRole("button", { name: /리뷰 작성하기/ })).toBeInTheDocument()

      // then - 오류가 발생했을때
    })
    test("성공 했을 경우", () => {
      // given - Card 컴포넌트를 화면에 그려줌
      const props = {
        ...defaultProps,
        registrationEnd: dayjs().subtract(1, "days").toISOString(),
      }

      const { getByRole } = render(
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

      // when - 모집 마감 날짜가 지났다면 리뷰 작성하기 버튼이 화면에 그려짐
      expect(getByRole("button", { name: /리뷰 작성하기/ })).toBeInTheDocument()

      // then - 오류가 발생했을때
    })
  })
})
