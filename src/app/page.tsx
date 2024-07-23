import ArrowRight from "@/components/public/icon/staticIcon/ArrowRight"
import Edit from "@/components/public/icon/staticIcon/Edit"
import Person from "@/components/public/icon/staticIcon/Person"
import VisibilityOff from "@/components/public/icon/staticIcon/VisibilityOff"
import VisibilityOn from "@/components/public/icon/staticIcon/VisibilityOn"
import Workation from "@/components/public/icon/staticIcon/Workation"
import X from "@/components/public/icon/staticIcon/X"
import Arrow from "@public/icon/dynamicIcon/Arrow"
import Checkbox from "@public/icon/dynamicIcon/Checkbox"
import Heart from "@public/icon/dynamicIcon/Heart"
import Save from "@public/icon/dynamicIcon/Save"
import Sort from "@public/icon/dynamicIcon/Sort"
import Alarm from "@public/icon/staticIcon/Alarm"
import Bye from "@public/icon/staticIcon/Bye"
import Check from "@public/icon/staticIcon/Check"
import Dalemfit from "@public/icon/staticIcon/Dalaemfit"

const Home = () => {
  return (
    <main className="bg-slate-500">
      메인 페이지 초기화
      <Alarm />
      <ArrowRight />
      <Bye />
      <Check />
      <Dalemfit />
      <Edit />
      <Person />
      <VisibilityOff />
      <VisibilityOn />
      <Workation />
      <X />
      <Save state="largeDiscard" />
      <Save state="largeActive" />
      <Save state="largeInactive" />
      <Save state="smallDiscard" />
      <Sort state="default" />
      <Heart state="default" />
      <Heart state="active" />
      <Checkbox state="default" />
      <Checkbox state="active" />
      <Arrow state="defaultUp" />
      <Arrow state="defaultRight" />
      <Arrow state="defaultLeft" />
      <Arrow state="defaultDown" />
      <Arrow state="inverseDown" />
    </main>
  )
}

export default Home
