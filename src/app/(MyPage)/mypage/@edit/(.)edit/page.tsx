import getUserInfo from "@/actions/Auths/getUserInfo"
import ProfileEditModal from "@/components/public/modal/ProfileEditModal"

const ModalPage = async () => {
  const userInfo = await getUserInfo()
  return (
    <div className="z-1 fixed left-0 top-0 h-screen w-screen bg-slate-950/50">
      <ProfileEditModal image={userInfo.image} companyName={userInfo.companyName} />
    </div>
  )
}

export default ModalPage
