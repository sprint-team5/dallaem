import getUserInfo from "@/actions/getUserInfo"
import ProfileEditModal from "@/components/public/modal/ProfileEditModal"

const ModalPage = async () => {
  const userInfo = await getUserInfo()
  return (
    <div className="z-1 absolute left-0 top-0 h-screen w-screen bg-slate-950/50">
      <ProfileEditModal src={userInfo.image} company={userInfo.companyName} />
    </div>
  )
}

export default ModalPage
