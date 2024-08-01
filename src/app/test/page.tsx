"use client"

import Card from "@/components/public/Card/Card"
import Review from "@/components/public/Review/Review"

const page = () => {
  return (
    <div>
      <p>모임마감 전 | 개설대기</p>
      <Card
        teamId="0"
        id={0}
        name="이름"
        dateTime="2024-08-01T07:43:12.385Z"
        location="검"
        participantCount={0}
        capacity={5}
        image=""
        registrationEnd=""
      />
      <p>모임마감 전 | 개설확정</p>
      <Card
        teamId="0"
        id={0}
        name="이름"
        dateTime="2024-08-01T07:43:12.385Z"
        location="검"
        participantCount={10}
        capacity={5}
        image=""
        registrationEnd=""
      />
      <p>모임마감 후</p>
      <Card
        teamId="0"
        id={0}
        name="이름"
        dateTime=""
        location="검"
        participantCount={5}
        capacity={5}
        image=""
        registrationEnd="2024-08-01T07:43:12.385Z"
      />

      <p>UI 변동 - 리뷰가 등록 되었을때 (isReview가 true일 경우)</p>
      <Card
        teamId="0"
        id={0}
        name="이름"
        dateTime=""
        location="검"
        participantCount={0}
        capacity={5}
        image=""
        registrationEnd="2024-08-01T07:43:12.385Z"
        isReview
      />

      <p>UI 변동 (isMy가 true일 경우)</p>
      <Card
        teamId="0"
        id={0}
        name="이름"
        dateTime=""
        location="검"
        participantCount={0}
        capacity={5}
        image=""
        registrationEnd="2024-08-01T07:43:12.385Z"
        isMy
      />

      <p>UI 변동 (isMy가 true일 경우 , isBtnHide가 true일경우)</p>
      <Card
        teamId="0"
        id={0}
        name="이름"
        dateTime=""
        location="검"
        participantCount={0}
        capacity={5}
        image=""
        registrationEnd="2024-08-01T07:43:12.385Z"
        isMy
        isBtnHide
      />

      <p>리뷰</p>
      <Review
        score={0}
        comment="따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요."
        createdAt="2024-08-01T07:43:12.385Z"
        gathering={{
          teamId: "0",
          id: 0,
          type: "타입1",
          name: "이름",
          dateTime: "",
          registrationEnd: "",
          location: "검",
          participantCount: 0,
          capacity: 10,
          image: "",
          createdBy: 0,
          canceledAt: "",
        }}
        isImage
      />
    </div>
  )
}

export default page
