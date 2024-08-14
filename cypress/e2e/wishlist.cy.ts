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

describe("wishlist page test", () => {
  beforeEach(() => {
    cy.visit("/auth?mode=signin")
    cy.get("#email").type("test@test.com")
    cy.get("#password").type("testtest")
    cy.get(".group").click()
    cy.wait(1000)
    cy.get('[href="/wishlist"]').click()
  })
  it("should access wishlist page", () => {
    cy.get(".text-lg").should("have.text", "찜한 모임")
    cy.contains("마감되기 전에 지금 바로 참여해보세요").should("be.visible")
    cy.contains("아직 찜한 모임이 없어요").should("be.visible")
  })
  it("should change active state", () => {
    cy.contains("워케이션").click()
    cy.contains("워케이션").should("have.attr", "class").and("contain", "active")
    cy.contains("지역 선택").click()
    cy.get(":nth-child(1) > .relative.inline-flex > .absolute")
      .should("have.attr", "aria-expanded")
      .and("eq", "true")
    cy.contains("건대입구").click()
    cy.get(":nth-child(1) > .relative.inline-flex > .cursor-pointer > .flex").should(
      "have.text",
      "건대입구",
    )
    cy.contains("날짜 선택").click()
    cy.get("[role=listbox]").should("be.visible")
    cy.contains("마감 임박 순").click()
    cy.get(".ml-auto > .relative > .absolute")
      .should("have.attr", "aria-expanded")
      .and("eq", "true")
    cy.get('[value="dateTime"]').click()
    cy.contains("등록순").should("be.visible")
  })
})
