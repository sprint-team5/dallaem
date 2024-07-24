import Calendar from "react-calendar"
import { LooseValue, Value } from "react-calendar/dist/cjs/shared/types"

import "./Calendars.scss"

interface ICalendars {
  value?: LooseValue
  onChange?: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * @interface ICalendars
 * @param {number} value - getter 타입은 react-calender에서 지원하는 방식을 넣어야합니다.
 * @param {Function} onChange - setter 날짜 클릭시 value값을 변동합니다.
 */
const Calendars = ({ onChange, value }: ICalendars) => {
  return (
    <div className="w-[337px] rounded-xl border px-[43px] pb-4 pt-[10px]">
      <Calendar
        value={value}
        onChange={onChange}
        next2Label={null}
        prev2Label={null}
        locale="en"
        calendarType="gregory"
      />
    </div>
  )
}

export default Calendars
