import Image from "next/image";
import CloseIcon from "@/public/icon/closeIcon.svg";

interface IProfileEditModalProps {
  company: string;
  src: string;
}

const ProfileEditModal = ({
  company = "코드잇",
  src,
}: IProfileEditModalProps) => {
  const profileImgSrc = src || "/img/profile/defaultProfile.jpg";
  return (
    <form className="flex flex-col gap-4 border mx-auto rounded-xl p-6 w-profileEdit-md lg:w-profileEdit-lg">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">프로필 수정하기</h3>
        <button
          aria-label="close button"
          type="button"
          className="size-3.5 block"
        >
          <CloseIcon fill="true" />
        </button>
      </div>
      <div>
        <label htmlFor="profileImg" className="relative">
          <Image
            src={profileImgSrc}
            alt="profile image"
            width={56}
            height={56}
          />
          <Image
            className="absolute bottom-1 left-9 rounded-full border-2 border-white"
            src="/img/profile/editBtn.jpg"
            alt="edit icon"
            width={18}
            height={18}
          />
          <input hidden id="profileImg" name="profileImg" type="file" />
        </label>
      </div>
      <div>
        <label htmlFor="company" className="font-semibold">
          회사
          <input
            id="company"
            name="company"
            type="text"
            className="font-medium my-3 block rounded-xl px-2.5 py-3.5 bg-gray-100 w-full placeholder:text-black"
            placeholder={company}
          />
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="py-2.5 text-orange-600 w-1/2 border border-orange-600 rounded-lg"
        >
          취소
        </button>
        <button
          type="submit"
          className="text-white bg-gray-400 w-1/2 rounded-lg py-2.5"
        >
          수정하기
        </button>
      </div>
      <div />
    </form>
  );
};

export default ProfileEditModal;
