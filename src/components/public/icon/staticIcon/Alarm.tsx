import AlarmSVG from "@public/icon/staticIcon/alarm.svg"

interface IAlarmProps {
  className?: string
}

const Alarm = ({ className }: IAlarmProps) => {
  const newClassName = `${className} w-6 h-6 text-[#FFFFFF]`
  return (
    <div>
      <AlarmSVG className={newClassName} />
    </div>
  )
}

export default Alarm
