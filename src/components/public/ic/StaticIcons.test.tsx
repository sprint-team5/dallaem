import Alarm from "@public/ic/Alarm"
import ArrowRight from "@public/ic/ArrowRight"
import Bye from "@public/ic/Bye"
import Check from "@public/ic/Check"
import Dalaemfit from "@public/ic/Dalaemfit"
import Edit from "@public/ic/Edit"
import Person from "@public/ic/Person"
import VisibilityOff from "@public/ic/VisibilityOff"
import VisibilityOn from "@public/ic/VisibilityOn"
import Workation from "@public/ic/Workation"
import X from "@public/ic/X"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

jest.mock("@/public/icon/alarm.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/arrow_right.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/bye.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/check.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/dalaemfit.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/edit.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/person.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/visibility_off.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/visibility_on.svg", () => {
  return "SvgrMock"
})
jest.mock("@public/icon/workation.svg", () => {
  return "SvgrMock"
})

const icons = [
  { Icon: Alarm, testid: "Alarm" },
  { Icon: ArrowRight, testid: "ArrowRight" },
  { Icon: Bye, testid: "Bye" },
  { Icon: Check, testid: "Check" },
  { Icon: Dalaemfit, testid: "Dalaemfit" },
  { Icon: Edit, testid: "Edit" },
  { Icon: Person, testid: "Person" },
  { Icon: VisibilityOff, testid: "VisibilityOff" },
  { Icon: VisibilityOn, testid: "VisibilityOn" },
  { Icon: Workation, testid: "Workation" },
  { Icon: X, testid: "X" },
]

describe("아이콘 컴포넌트 테스트", () => {
  test.each(icons)("SVG가 렌더링되는지 검증합니다", ({ Icon }) => {
    expect(render(<Icon className="test-class" />)).not.toBeNull()
  })

  test.each(icons)("SVG 요소가 존재하는지 검증합니다", ({ Icon }) => {
    const { container } = render(<Icon className="test-class" />)
    const svgElement = container.querySelector("svgrmock")
    expect(svgElement).toBeInTheDocument()
  })

  // test.each(icons)("$name SVG mock 파일이 뒤바뀌지 않았는지 검증합니다", ({ Icon, testid }) => {
  //   render(<Icon data-testid={testid} className="test-class" />)
  //   const svgElement = screen.getByTestId(testid)

  //   // 각 아이콘의 고유한 특성을 검증
  //   expect(svgElement).toHaveAttribute("data-testid", testid)
  // })
})
