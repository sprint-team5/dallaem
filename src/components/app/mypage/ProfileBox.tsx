import Image from "next/image";
import ProfileEditBtn from "./ProfileEditBtn";
import LogoutBtn from "./LogoutBtn";

interface Props {
  company: string;
  email: string;
  id: string;
  imgSrc: string;
}

const ProfileBox = ({
  company = "코드잇",
  email = "codeit@codeit.com",
  id = "럽윈즈올",
  imgSrc,
}: Props) => {
  const profileImgSrc = imgSrc || "/img/profile/defaultProfile.jpg";
  return (
    <div className="rounded-3xl h-44 mx-auto w-profile-sm md:w-profile-md lg:w-profile-lg border-2 border-gray-200">
      <div className="px-6 pt-3.5 pb-5 flex items-center justify-between bg-profile-sm md:bg-profile-md lg:bg-profile-lg bg-no-repeat">
        <h3 className="font-semibold text-lg">내 프로필</h3>
        <ProfileEditBtn />
      </div>
      <div className="relative">
        <div className="size-14 absolute -top-3 left-3 rounded-full">
          <Image
            fill
            src={profileImgSrc}
            alt="default profile"
            className="block rounded-full"
          />
        </div>
        <div className="absolute top-0 left-16 py-3 px-2">
          <div className="flex gap-3 items-center mb-1">
            <h3 className="font-semibold">{id}</h3>
            <LogoutBtn />
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-semibold">
              <p className="mb-1">company.</p>
              <p>E-mail.</p>
            </div>
            <div className="text-sm">
              <p className="mb-1">{company}</p>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
