describe("log-in page test", () => {
  beforeEach(() => {
    cy.visit("/auth?mode=signin")
  })

  it("should be have login page text", () => {
    cy.contains("Welcome to 같이 달램!").should("be.visible")
    cy.contains("로그인").should("be.visible")
    cy.contains("아이디").should("be.visible")
    cy.contains("비밀번호").should("be.visible")
  })

  it("should type email in id input", () => {
    cy.get("#email").click()
    cy.get("#email").blur()
    cy.contains("이메일을 입력해주세요.").should("be.visible")
    cy.get(".group").should("be.disabled")
    cy.get("#email").type("12")
    cy.contains("이메일을 입력해주세요.").should("be.visible")
    cy.get(".group").should("be.disabled")
    cy.get("#email").type("testId")
    cy.get("#email").blur()
    cy.contains("올바른 이메일 형식이 아닙니다.").should("be.visible")
    cy.get(".group").should("be.disabled")
  })

  it("should input password in password input", () => {
    cy.get("#password").click()
    cy.get("#password").blur()
    cy.contains("비밀번호를 입력해주세요.").should("be.visible")
    cy.get(".group").should("be.disabled")
    cy.get("#password").type("123")
    cy.get("#password").blur()
    cy.contains("비밀번호는 최소 8자 이상이어야 합니다.").should("be.visible")
    cy.get(".group").should("be.disabled")
  })

  it("should be able to click confirm button when all goes well", () => {
    const testId = Cypress.env("TEST_ID")
    const testPassword = Cypress.env("TEST_PASSWORD")
    cy.get("#email").type(testId)
    cy.get("#password").type(testPassword)
    cy.get(".group").should("be.enabled")
    cy.get(".group").click()
    cy.location("pathname").should("eq", "/")
    cy.getCookie("userToken").should("exist")
  })

  it("should be able to visit sign-up page", () => {
    cy.contains("회원가입").click()
    cy.location("pathname").should("contains", "/auth")
    cy.contains("회원가입").should("be.visible")
    cy.contains("이름").should("be.visible")
  })
})
