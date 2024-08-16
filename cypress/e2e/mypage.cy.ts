/// <reference types="cypress" />

describe("mypage test", () => {
  beforeEach(() => {
    cy.login()
    cy.contains("내 모임 보러가기").click()
  })
  it("should be able to visit mypage", () => {
    cy.getCookie("userToken").should("exist")
    cy.contains("마이페이지").should("be.visible")
    cy.contains("내 프로필").should("be.visible")
    cy.contains("참여한 모임").should("be.visible")
    cy.contains("나의 리뷰").should("be.visible")
    cy.contains("내가 만든 모임").should("be.visible")
  })
  it("should change user profile edit modal", () => {
    cy.get(".size-8 > div > img").click()
    cy.location("pathname").should("include", "edit")
    cy.contains("프로필 수정하기").should("be.visible")
  })
})
