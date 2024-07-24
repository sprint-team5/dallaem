import Calendars from "@/components/public/Calendars/Calendars"
import Card from "@/components/public/Card"
import Review from "@/components/public/Review"

const Page = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <Card
          teamId="1"
          id={4}
          name="모임 2"
          dateTime="2024-07-22T07:34:00.350Z"
          location="서울"
          participantCount={0}
          capacity={20}
          image=""
          registrationEnd="2024-07-25T09:06:16.184Z"
        />
        <Card
          teamId="1"
          id={4}
          name="모임 2"
          dateTime="2024-07-22T07:34:00.350Z"
          location="서울"
          participantCount={5}
          capacity={20}
          image=""
          registrationEnd="2024-07-25T09:06:16.184Z"
        />
        <Card
          teamId="1"
          id={4}
          name="모임 1"
          dateTime="2024-07-22T07:34:00.350Z"
          location="인천"
          participantCount={5}
          capacity={20}
          image=""
          registrationEnd="2024-07-21T09:06:16.184Z"
        />
        <Card
          teamId="1"
          id={4}
          name="모임 1"
          dateTime="2024-07-22T07:34:00.350Z"
          location="인천"
          participantCount={0}
          capacity={20}
          image=""
          registrationEnd="2024-07-21T09:06:16.184Z"
        />
      </div>

      <p className="mt-5">상세페이지 리뷰</p>
      <div className="flex flex-col gap-6">
        <Review
          score={5}
          comment="따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요."
          createdAt="2024-07-23T01:49:11.413Z"
          Gathering={{
            teamId: 0,
            id: 0,
            name: "달램핏 오피스 스트레칭 이용",
            dateTime: "2024-07-23T01:49:11.413Z",
            location: "을지로 3가",
          }}
          User={{
            teamId: 0,
            id: 0,
            email: "string",
            name: "string",
          }}
        />
        <Review
          score={3}
          comment="따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요."
          createdAt="2024-07-23T01:49:11.413Z"
          Gathering={{
            teamId: 0,
            id: 0,
            name: "달램핏 오피스 스트레칭 이용",
            dateTime: "2024-07-23T01:49:11.413Z",
            location: "을지로 3가",
          }}
          User={{
            teamId: 0,
            id: 0,
            email: "string",
            name: "string",
          }}
        />
      </div>

      <p className="mt-5">나의 리뷰</p>
      <div className="flex flex-col gap-6">
        <Review
          score={5}
          comment="따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요."
          createdAt="2024-07-23T01:49:11.413Z"
          Gathering={{
            teamId: 0,
            id: 0,
            name: "달램핏 오피스 스트레칭 이용",
            dateTime: "2024-07-23T01:49:11.413Z",
            location: "을지로 3가",
          }}
          image
        />
        <Review
          score={3}
          comment="따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요."
          createdAt="2024-07-23T01:49:11.413Z"
          Gathering={{
            teamId: 0,
            id: 0,
            name: "달램핏 오피스 스트레칭 이용",
            dateTime: "2024-07-23T01:49:11.413Z",
            location: "을지로 3가",
          }}
          image
        />
      </div>
      <Calendars />
    </div>
  )
}

export default Page