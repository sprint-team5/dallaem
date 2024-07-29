const ParticipantGage = ({ now, max }: { now: number; max: number }) => {
  return (
    <div className="h-1 w-full bg-orange-50">
      <div className="h-full bg-orange-600" style={{ width: `${(now / max) * 100}%` }} />
    </div>
  )
}
export default ParticipantGage
