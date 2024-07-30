import ProfileEditModal from "@/components/public/modal/ProfileEditModal"

import getUserInfo from "../../getUserInfo"

const ModalPage = async () => {
  const { image, companyName } = await getUserInfo()

  return (
    <div className="z-1 absolute left-0 top-0 mx-auto h-screen w-full bg-slate-950/50">
      <ProfileEditModal src={image} company={companyName} />
    </div>
  )
}

export default ModalPage
