describe("home page test", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should visit home and the text", () => {
    cy.get("a[href*='/']").first().click()
    cy.location("pathname").should("eq", "/")
    cy.get(".justify-between > .text-xl").should("contain", "NEW 모임")
  })
  it("should visit login page", () => {
    cy.contains("로그인").click()
    cy.location("pathname").should("contain", "/auth")
  })
  it("should slide image with button", () => {
    cy.get(".right-5 > .flex > :nth-child(1)").click()
    cy.contains("새로운 모임을").should("be.visible")
    cy.get(".right-5 > .rounded-full").should("contain", "1")
    cy.get(".right-5 > .flex > :nth-child(2)").click()
    cy.contains("모두의 이야기가").should("be.visible")
    cy.get(".right-5 > .rounded-full").should("contain", "2")
    cy.get(".right-5 > .flex > :nth-child(3)").click()
    cy.contains("소중한 사람들과").should("be.visible")
    cy.get(".right-5 > .rounded-full").should("contain", "3")
  })
  it("should be able to go detail page", () => {
    cy.get(".swiper-slide-active > .block > .h-full > .flex-1").click()
    cy.location("pathname").should("contain", "/findMeeting")
  })
})
