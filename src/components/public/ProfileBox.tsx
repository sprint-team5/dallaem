import getUserInfo from "@/actions/getUserInfo"

import LogoutBtn from "./LogoutBtn"
import ProfileEditBtn from "./ProfileEditBtn"
import Profile from "./img/Profile"

const ProfileBox = async () => {
  const userInfo = await getUserInfo()

  return (
    <div className="mx-auto h-44 w-profile-sm rounded-3xl border-2 border-gray-200 bg-white md:w-profile-md lg:w-profile-lg">
      <div className="flex items-center justify-between bg-profile-sm bg-no-repeat px-6 pb-5 pt-3.5 md:bg-profile-md lg:bg-profile-lg">
        <h3 className="text-lg font-semibold">내 프로필</h3>
        <ProfileEditBtn />
      </div>
      <div className="relative">
        <div className="absolute -top-3 left-3 size-14 rounded-full">
          <Profile profileImg={userInfo.image} state="largeDefault" />
        </div>
        <div className="absolute left-16 top-0 px-2 py-3">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-semibold">{userInfo?.name}</h3>
            <LogoutBtn />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-semibold">
              <p className="mb-1">company.</p>
              <p>E-mail.</p>
            </div>
            <div className="text-sm">
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
