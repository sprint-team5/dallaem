/// <reference types="cypress" />

describe("wishlist page access test", () => {
  before(() => {
    cy.clock()
  })

  it("should be unable to visit wishlist page without login", () => {
    cy.visit("/wishlist")
    cy.tick(1000)
    cy.contains("로그인 후 이용이 가능합니다.").should("be.visible")
    cy.tick(4000)
    cy.contains("로그인 후 이용이 가능합니다.").should("not.be.visible")
    cy.location("pathname").should("include", "/auth")
  })
})

describe("add wish button test", () => {
  beforeEach(() => {
    cy.visit("/wishlist")
    cy.get("#email").type("test@test.com")
    cy.get("#password").type("testtest")
    cy.get(".group").click()
    cy.visit("/findMeeting").then((win) => {
      cy.spy(win.localStorage, "setItem").as("storeGathering")
      cy.spy(win.localStorage, "getItem").as("getWishList")
    })
    cy.get(".group").click()
  })
  it("should be able to add gathering to wishlist", () => {
    cy.get("button[aria-label=wishAdd]").first().click()
    cy.get("@storeGathering").should("be.called")
    cy.get("@getWishList").should("be.called")
    cy.get('[href="/wishlist"] > .relative').should("have.text", "1")
  })

  it("should be able to cancel wishlist", () => {
    cy.get("button[aria-label=wishAdd]").first().click()
    cy.get("@storeGathering").should("be.called")
    cy.get("@getWishList").should("be.called")
    cy.get('[href="/wishlist"] > .relative').should("have.text", "1")
    cy.get("button[aria-label=wishAdd]").first().click()
    cy.get("@storeGathering").should("be.called")
    cy.get("@getWishList").should("be.called")
    cy.get('[href="/wishlist"] > .relative').should("not.exist")
  })
})
