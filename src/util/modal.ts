/**
 * 스크롤을 막고, currentScrollY를 반환
 * @returns {number} 현재 스크롤 위치
 */
export const preventScroll = () => {
  const currentScrollY = window.scrollY
  document.body.style.position = "fixed"
  document.body.style.width = "100%"
  document.body.style.top = `-${currentScrollY}px` // 현재 스크롤 위치
  document.body.style.overflowY = "scroll"
  return currentScrollY
}

/**
 * 스크롤을 허용하고, 이전 스크롤 위치로 이동
 * @param prevScrollY {number} 이전 스크롤 위치
 */
export const allowScroll = (prevScrollY: number) => {
  document.body.style.position = "unset"
  document.body.style.width = "unset"
  document.body.style.top = "unset"
  document.body.style.overflowY = "unset"
  window.scrollTo(0, prevScrollY)
}
