/// <reference types="cypress" />

describe("allReview page test", () => {
  beforeEach(() => {
    cy.visit("/allReview")
  })

  it("should allReview page", () => {
    cy.contains("모든 리뷰").should("be.visible")
    cy.contains("같이달램을 이용한 분들은 이렇게 느꼈어요 🫶").should("be.visible")
  })

  describe("change score test", () => {
    it("should change score", () => {
      cy.contains("달램핏").click()
      cy.contains("오피스 스트레칭").click()
      cy.contains("달램핏").should("have.class", "active")
      cy.contains("오피스 스트레칭").should("have.class", "text-white")
      cy.get("[data-cy=ratingbar]").should("have.length", 5)
    })
  })

  describe("change filter test", () => {
    it("should change score", () => {
      cy.contains("지역 선택").click()
      cy.contains("건대입구").first().click()
      cy.contains("건대입구").should("be.visible")

      cy.contains("날짜 선택").click()
      cy.get(".react-calendar__tile.react-calendar__month-view__days__day").first().click()

      cy.contains("최신순").click()
      cy.contains("오래된순").first().click()
    })
  })
})
