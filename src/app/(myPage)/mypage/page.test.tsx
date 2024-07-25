import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import MyPage from "./page"

jest.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        prefetch: () => {
          return null
        },
      }
    },
  }
})

describe("My Page Test", () => {
  test("MyPage default load test", async () => {
    const myPage = await MyPage()
    render(myPage)

    const testText = screen.getByRole("main")
    expect(testText).toBeInTheDocument()
  })

  test("Profile load and has default value", async () => {
    const myPage = await MyPage()
    render(myPage)

    const profileImg = screen.getByAltText(/profile/i)
    expect(profileImg).toBeInTheDocument()

    const companyName = screen.getByText(/코드잇/i)
    const email = screen.getByText(/codeit/i)
    const name = screen.getByText(/럽윈즈올/i)

    const elements = [companyName, email, name]
    const expectedTexts = ["코드잇", "codeit@codeit.com", "럽윈즈올"]

    elements.forEach((element, index) => {
      expect(element).toHaveTextContent(expectedTexts[index])
    })
  })
})
