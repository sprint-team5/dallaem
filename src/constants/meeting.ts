/** 모임 장소 */
const location = ["건대입구", "을지로3가", "홍대입구"]
/** 모임 타입(조회) */
const meetingTypeInquiry = ["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]
/** 모임 타입(등록) */
const meetingTypeRegister = ["OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]
/** 정렬 방식 */
const sortType = [
  {
    label: "마감 임박 순",
    value: "registrationEnd",
  },
  {
    label: "등록순",
    value: "dateTime",
  },
  {
    label: "참여 인원 순",
    value: "participantCount",
  },
]

export { location, meetingTypeInquiry, meetingTypeRegister, sortType }
