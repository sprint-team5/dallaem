import getUserInfo from "@/actions/Auths/getUserInfo"

import LogoutBtn from "./LogoutBtn"
import ProfileEditBtn from "./ProfileEditBtn"
import Profile from "./img/Profile"
import ProfileBG from "./img/ProfileBG"

const ProfileBox = async () => {
  const userInfo = await getUserInfo()

  return (
    <div className="relative mx-auto h-[180px] w-full flex-none rounded-3xl border-2 border-gray-200 bg-white">
      <div className="flex items-center justify-between rounded-t-3xl bg-primary px-6 py-3.5 pt-5">
        <h3 className="z-10 text-lg font-semibold text-gray-900">내 프로필</h3>
        <ProfileEditBtn />
      </div>
      <ProfileBG className="absolute right-20 top-5" />
      <div className="relative">
        <div className="absolute -top-3 left-3 size-14 rounded-full">
          <Profile profileImg={userInfo.image} state="largeDefault" />
        </div>
        <div className="absolute left-16 top-0 px-2 py-3">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-medium">{userInfo?.name}</h3>
            <LogoutBtn />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-medium text-gray-800">
              <p className="mb-1">company.</p>
              <p>E-mail.</p>
            </div>
            <div className="text-sm text-gray-800">
              <p className="mb-1">{userInfo?.companyName}</p>
              <p>{userInfo?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBox
