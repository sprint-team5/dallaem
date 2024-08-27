describe("gnb test", () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit("/")
  })

  it("should be able to visit findMeeting", () => {
    cy.get("a[href*='/findMeeting']").first().click()
    cy.location("pathname").should("eq", "/findMeeting")
  })

  it("should not be able to visit wishlist", () => {
    cy.get("a[href*='/wishlist'").first().click()
    cy.location("pathname").should("eq", "/auth")
    cy.location("search").should("contain", "?mode=signin")
    cy.contains("로그인 후 이용이 가능합니다.").should("be.visible")
  })

  it("should not be able to visit wishlist", () => {
    cy.get("a[href*='/wishlist'").first().click()
    cy.location("pathname").should("eq", "/auth")
    cy.location("search").should("contain", "?mode=signin")
    cy.contains("로그인 후 이용이 가능합니다.").should("be.visible")
  })

  it("should not be able to visit wishlist", () => {
    cy.get("a[href*='/allReview'").first().click()
    cy.location("pathname").should("eq", "/allReview")
    cy.contains("모든 리뷰").should("be.visible")
    cy.contains("같이달램을 이용한").should("be.visible")
  })

  it("should be able to visit login page", () => {
    cy.contains("로그인").click()
    cy.location("pathname").should("eq", "/auth")
    cy.location("search").should("eq", "?mode=signin")
    cy.contains("로그인").should("be.visible")
    cy.contains("아이디").should("be.visible")
    cy.contains("비밀번호").should("be.visible")
  })
})
