// 페이지 라우트 상수
const ROUTE = {
  HOME: "/", // 랜딩 페이지
  SIGNIN: "/auth?mode=signin", // 로그인 페이지
  SIGNUP: "/auth?mode=signup", // 회원가입 페이지
  GATHERINGS: "/findMeeting", // 모임 찾기 페이지
  SAVE_GATHERINGS: "/wishlist", // 찜한 모임 페이지
  MY_PAGE: "/mypage", // 내 정보 페이지
  ALL_REVIEW: "/allReview", // 모든 리뷰 페이지
} as const

export default ROUTE
