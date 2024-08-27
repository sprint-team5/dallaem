/// <reference types="cypress" />

describe("mypage test", () => {
  beforeEach(() => {
    cy.intercept("/").as("home")
    cy.viewport(1024, 768)
    cy.login()
    cy.wait("@home")
    cy.contains("마이페이지").click()
  })
  it("should be able to visit mypage", () => {
    cy.getCookie("userToken").should("exist")
    cy.contains("내 프로필").should("be.visible")
    cy.contains("참여한 모임").should("be.visible")
    cy.contains("나의 리뷰").should("be.visible")
    cy.contains("내가 만든 모임").should("be.visible")
  })
  it("should be able to access and use profile edit modal", () => {
    cy.get(".size-8 > div > img").click()
    cy.location("pathname").should("include", "edit")
    cy.contains("프로필 수정하기").should("be.visible")
    cy.get(".bg-gray-400").as("editButton").click()
    cy.contains("이미지를 업로드해주세요.").should("be.visible")
    cy.get("input.mt-2").as("inputCompany").type("a")
    cy.contains("회사 이름을 입력해주세요.").should("be.visible")
    cy.get("button[aria-label=Close]").as("cancelButton").click()
    cy.location("pathname").should("eq", "/mypage")
  })
  it("should be able to logout", () => {
    cy.intercept("/").as("home")
    cy.contains("로그아웃").click()
    cy.location("pathname").should("eq", "/")
    cy.getCookie("userToken").should("be.null")
  })
})
