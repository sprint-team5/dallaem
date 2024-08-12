describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should visit home and the text", () => {
    cy.get("a[href*='/']").first().click()
    cy.get("h1").should("have.text", "당신의 관심사,5분 만에 모임으로 만들어보세요!")
  })
  it("should visit login page", () => {
    cy.get("a[href*='/auth?mode=signin'").first().click()
    cy.get("form > span:first-child").should("have.text", "로그인")
  })
})
