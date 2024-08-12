describe("home page test", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should visit home and the text", () => {
    cy.get("a[href*='/']").first().click()
    cy.location("pathname").should("eq", "/")
    cy.get("h1").contains("당신의 관심사")
  })
  it("should visit home and the text", () => {
    cy.get("a[href*='/']").first().click()
    cy.get("a").should("have.length", 7)
  })
  it("should show review after scroll", () => {
    cy.get("a[href*='/']").first().click()
    cy.scrollTo(0, 600)
    cy.get("h3").contains("실제 후기입니다.")
  })
})
