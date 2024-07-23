// 정적인 icons 기능 테스 테스트
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
import { render, screen } from "@testing-library/react"

const icons = [
  { Icon: Alarm, id: "first" },
  { Icon: ArrowRight, id: "second" },
  { Icon: Bye, id: "third" },
  { Icon: Check, id: "fourth" },
  { Icon: Dalaemfit, id: "fifth" },
  { Icon: Edit, id: "sixth" },
  { Icon: Person, id: "seventh" },
  { Icon: VisibilityOff, id: "eighth" },
  { Icon: VisibilityOn, id: "ninth" },
  { Icon: Workation, id: "tenth" },
  { Icon: X, id: "eleventh" },
]

describe("StaticIcons", () => {
  test.each(icons)("아이콘이 올바르게 렌더링 되는지 검증함", ({ Icon, id }) => {
    render(<Icon data-testid={id} className="test-class" />)
    const iconElement = screen.getByTestId(id)

    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass("test-class")
  })
})
